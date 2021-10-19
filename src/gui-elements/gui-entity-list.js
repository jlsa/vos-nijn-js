const Component = require('../component')
const TextElement = require('../ui-elements/text-element')

class GuiEntityList extends Component {
  constructor (gui, board) {
    super()
    this.gui = gui
    this.board = board
    this.actors = []
    this.sortedActors = []
    this.getBoardStats()

    this.sortedActors.forEach((actors, index) => {
      if (actors.length > 0) {
        const textElement = new TextElement(
          `${actors[0].name}: ${actors.length}`,
          10,
          10 + index * 26
        )
        this.actors[this.actors.length] = {
          name: actors[0].name,
          count: actors.length,
          uiElement: textElement
        }
        this.gui.add(textElement)
      }
    })
  };

  update (deltaTime) {
    this.getBoardStats()
    this.sortedActors.forEach((actors, index) => {
      if (actors.length > 0) {
        this.actors.forEach(actor => {
          if (actor.name === actors[0].name) {
            actor.count = actors.length
            actor.uiElement.Text = `${actor.name}: ${actor.count}`
          }
        })
      }
    })
  }

  getBoardStats () {
    this.sortedActors.splice(0, this.sortedActors.length)
    this.board.actorTypes.forEach(actorType => {
      this.sortedActors[this.sortedActors.length] = this.board.grid.filter(actor => {
        if (actor) {
          return actor.name === actorType
        } else {
          return false
        }
      })
    })
  }
};

module.exports = GuiEntityList
