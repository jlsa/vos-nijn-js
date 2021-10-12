const Component = require('./component')

const GrassActor = require('./actors/grass-actor')
const FoxActor = require('./actors/fox-actor')
const RabbitActor = require('./actors/rabbit-actor')

class Board extends Component {
  constructor (rows = 10, cols = 10, tileSize = { w: 10, h: 10 }) {
    super()
    this.rows = rows
    this.cols = cols
    this.tileSize = tileSize
    this.grid = []
    this.sortedElements = []
    this.actorTypes = [
      'grass', 'rabbit', 'fox'
    ]
  };

  reset () {
    this.grid = []
    this.sortedElements = []
  };

  init () {
    this.reset()
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const rrand = Math.random()
        let actorType = 'grass'
        if (rrand <= 0.001) {
          actorType = 'fox'
        } else if (rrand > 0.001 && rrand <= 0.125) {
          actorType = 'rabbit'
        }

        let entity
        switch (actorType) {
          case 'fox':
            entity = new FoxActor(null, { x, y })
            break
          case 'rabbit':
            entity = new RabbitActor(null, { x, y })
            break
          case 'grass':
          default:
            entity = new GrassActor(null, { x, y })
            break
        }

        this.grid[this.grid.length] = entity
      }
    }
    this.actorTypes.forEach(entity => {
      this.sortedElements[this.sortedElements.length] = this.grid.filter(el => el.name === entity)
    })
  };

  get SortedElements () {
    return this.sortedElements
  };

  render (context, deltaTime) {
    this.sortedElements.forEach(elements => {
      if (elements.length > 0) {
        context.fillStyle = elements[0].color
        elements.forEach(el => {
          const x = 0.5 + el.position.x * this.tileSize.w
          const y = 0.5 + el.position.y * this.tileSize.h
          context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
        })
      }
    })
  };

  update (deltaTime) {
    // this.init();
    // this.grid.forEach(actor => {
    //   actor.act([]);
    // });
  };
};

module.exports = Board
