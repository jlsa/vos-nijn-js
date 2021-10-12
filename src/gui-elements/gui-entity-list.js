const Component = require("../component");
const TextElement = require("../ui-elements/text-element");

class GuiEntityList extends Component {
  constructor(gui, board) {
    super();
    this.gui = gui;
    this.board = board;
    this.entities = [];
    board.SortedElements.forEach((elements, index) => {
      if (elements.length > 0) {
        const textElement = new TextElement(
          `${elements[0].name}: ${elements.length}`,
          10,
          10 + index * 26
        );
        this.entities[this.entities.length] = {
          name: elements[0].name,
          count: elements.length,
          uiElement: textElement
        };
        this.gui.add(textElement);
      }
    });
  };

  update(deltaTime) {
    this.board.SortedElements.forEach((elements, index) => {
      if (elements.length > 0) {
        this.entities.forEach(entity => {
          if (entity.name === elements[0].name) {
            entity.count = elements.length;
            entity.uiElement.Text = `${entity.name}: ${entity.count}`
          }
        });
      }
    });

  }
};

module.exports = GuiEntityList;