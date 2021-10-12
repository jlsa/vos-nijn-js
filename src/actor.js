const Component = require('./component');

class Actor extends Component {
  constructor() {
    if (new.target === Actor) {
      throw new TypeError('Unable to constuct Actor Component instances directly');
    }
  };

  act(newActors) {};
  isActive() { };
};

module.exports = Actor;