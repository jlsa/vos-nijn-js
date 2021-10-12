const Component = require('./component');
const entities = require('./entities');

const GrassActor = require('./actors/grass-actor');
const FoxActor = require('./actors/fox-actor');
const RabbitActor = require('./actors/rabbit-actor');

class Board extends Component {
  constructor(rows = 10, cols = 10, tileSize = { w: 10, h: 10 }) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;
    this.grid = [];
    this.sortedElements = [];
  };

  reset() {
    this.grid = [];
    this.sortedElements = [];
  };

  init() {
    this.reset();
    const actorTypes = [
      'grass', 'rabbit', 'fox'
    ];

    for (let x = 0; x < this.rows; x++) {
      // this.grid[x] = [];
      for (let y = 0; y < this.cols; y++) {
        // const rand = Math.floor(Math.random() * entities.length);
        // const entity = entities[rand];
        const rand = Math.floor(Math.random() * actorTypes.length);
        const actorType = actorTypes[rand];
        // const entity = new GrassActor(null, { x: x, y: y });
        let entity;
        switch(actorType) {
          case 'fox':
            entity = new FoxActor(null, { x, y });
            break;
          case 'rabbit':
            entity = new RabbitActor(null, { x, y });
            break;
          case 'grass':
          default:
            entity = new GrassActor(null, { x, y });
            break;
        }

        this.grid[this.grid.length] = {
          ...entity,
          x: x,
          y: y
        };
      }
    }
    entities.forEach(entity => {
      this.sortedElements[this.sortedElements.length] = this.grid.filter(el => el.name === entity.name);
    });
  };

  get SortedElements () {
    return this.sortedElements;
  };

  render (context, deltaTime) {
    this.sortedElements.forEach(elements => {
      if (elements.length > 0) {
        context.fillStyle = elements[0].color;
        elements.forEach(el => {
          context.fillRect(0.5 + el.x * this.tileSize.w, 0.5 + el.y * this.tileSize.h, this.tileSize.w, this.tileSize.h);
        });
      }
    });
  };

  update(deltaTime) {
    // this.init();
  };

};

module.exports = Board;