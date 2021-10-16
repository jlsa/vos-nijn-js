class Component {
  constructor () {
    if (new.target === Component) {
      throw new TypeError('Unable to constuct Component instances directly')
    }
    this.children = []
  };

  add (element) {
    if (this.canAdd(element)) {
      const index = this.children.length
      this.children[index] = element
      return true
    }
    return false
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
  };

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

module.exports = Component
