const Component = require('./component');

class Gui extends Component {
  constructor() {
    super();
    this.children = [];
  };

  add(element) {
    const index = this.children.length;
    this.children[index] = element;
  };

  removeAt(index) {
    this.children.removeAt(index);
  }

  update(deltaTime) {
    this.children.forEach(child => {
      child.update(deltaTime);
    });
  };

  render(context, deltaTime) {
    this.children.forEach(child => {
      child.render(context, deltaTime);
    });
  };
};

module.exports = Gui;