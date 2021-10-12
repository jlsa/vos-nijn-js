class Layer {
  constructor(canvas, context) {
    this.children = [];
    this.canvas = canvas;
    this.context = context;
  };

  addChild(child) {
    this.children[this.children.length] = child;
  };

  render(deltaTime) {
    this.children.forEach(child => {
      child.render(this.context, deltaTime);
    });
  };

  update(deltaTime) {
    this.children.forEach(child => {
      child.update(deltaTime);
    });
  };
};

module.exports = Layer;