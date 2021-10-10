class Gui extends Component {
  constructor(layer) {
    super();
    this.layer = layer;
    this.layer.addChild(this);
    this.uiElements = [];
    // debugger;
    entities.forEach(entity => {
      const index = this.uiElements.length;
      const newElement = new TextElement(
        this.layer.context,
        `${entity.name}: #`,
        0,
        index * 20
      );
      this.uiElements[index] = newElement;
      // this.layer.addChild(newElement);
    });
  };

  update(deltaTime) {};

  render(context, deltaTime) {
    this.uiElements.forEach(uiElement => {
      uiElement.render(context, deltaTime);
    });
  };
};