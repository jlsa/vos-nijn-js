const Component = require('../component')

class UiComponent extends Component {
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
    this.uuid = crypto.randomUUID()
  };

  set X (x) {
    this.x = x
  };

  get X () {
    return this.x
  };

  set Y (y) {
    this.y = y
  };

  get Y () {
    return this.y
  };
};

module.exports = UiComponent
