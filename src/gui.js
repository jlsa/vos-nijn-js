const Component = require('./component')

class Gui extends Component {
  constructor () {
    super()
    this.children = []
  };

  add (element) {
    if (this.canAdd(element)) {
      const index = this.children.length
      this.children[index] = element
    }
  };

  canAdd (element) {
    this.children.filter(child => {
      if (child.uuid) {
        if (child.uuid === element.uuid) {
          return false
        }
      }
      return false
    })
    return true
  };

  removeAt (index) {
    this.children.removeAt(index)
  }

  update (deltaTime) {
    this.children.forEach(child => {
      child.update(deltaTime)
    })
  };

  render (context, deltaTime) {
    this.children.forEach(child => {
      child.render(context, deltaTime)
    })
  };
};

module.exports = Gui
