const Component = require('./component')
const Position = require('./position')

class Actor extends Component {
  constructor () {
    super()
    if (new.target === Actor) {
      throw new TypeError('Unable to constuct Actor Component instances directly')
    }
    this.position = new Position()
    this.active = false
    this.board = null
  }

  get Board () {
    return this.board
  }

  set Board (board) {
    this.board = board
  }

  get Position () {
    return this.position
  }

  set Position (position) {
    this.position = position
  }

  get Active () {
    return this.active
  }

  set Active (active) {
    this.active = active
  }

  act (newActors) {};
};

module.exports = Actor
