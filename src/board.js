const Component = require('./component');
const entities = require('./entities');

const GrassActor = require('./actors/grass-actor');

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
    for (let x = 0; x < this.rows; x++) {
      // this.grid[x] = [];
      for (let y = 0; y < this.cols; y++) {
        const rand = Math.floor(Math.random() * entities.length);
        const entity = entities[rand];
        // const entity = new GrassActor(null, { x: x, y: y });
        // this.grid[x][y] = {
        this.grid[this.grid.length] = {
          ...entity,
          x: x,
          y: y
        };
      }
    }
    // first get all different entities.
    // console.log(this.grid);
    entities.forEach(entity => {
      this.sortedElements[this.sortedElements.length] = this.grid.filter(el => el.name === entity.name);
    });
    // console.log(this.sortedElements);
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
    // this.grid.forEach(el => {
      // context.fillStyle = el.color;
      // context.fillRect(0.5 + el.x * this.tileSize.w, 0.5 + el.y * this.tileSize.h, this.tileSize.w, this.tileSize.h);
    // });
    // for (let x = 0; x < this.grid.length; x++) {
    //   for (let y = 0; y < this.grid[x].length; y++) {
    //     context.fillStyle = this.grid[x][y].color;
    //     context.fillRect(0.5 + x * this.tileSize.w, 0.5 + y * this.tileSize.h, this.tileSize.w, this.tileSize.h);
    //   }
    // }
  };

  update(deltaTime) {
    this.init();
  };

};

module.exports = Board;