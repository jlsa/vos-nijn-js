const Component = require('./component')

class Actor extends Component {
  constructor () {
    super()
    if (new.target === Actor) {
      throw new TypeError('Unable to constuct Actor Component instances directly')
    }
    this.position = { x: 0, y: 0 }
    this.active = false
    this.field = undefined
  };

  get Field () {
    return this.field
  }

  set Field (field) {
    this.field = field
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
