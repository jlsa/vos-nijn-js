const Component = require('./component')

class Simulator extends Component {
  constructor () {
    super()
    this.board
    this.actors = []
  };

  addBoard (board) {
    this.board = board
    board.init()
  };

  get Board () {
    return this.board
  };

  render (context, deltaTime) {
    this.board.render(context, deltaTime)
  };

  update (deltaTime) {
    this.actors.forEach(actor => {
      const newActors = []
      actor.act(newActors)
    })

    this.board.update(deltaTime)
  };
};

module.exports = Simulator
