const Component = require('./component');
const entities = require('./entities');

class Board extends Component {
  constructor(rows = 10, cols = 10, tileSize = { w: 10, h: 10 }) {
    super();
    this.rows = rows;
    this.cols = cols;
    this.tileSize = tileSize;
    this.grid = [];
  };

  init() {
    for (let x = 0; x < this.rows; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.cols; y++) {
        const rand = Math.floor(Math.random() * entities.length);
        const entity = entities[rand];
        this.grid[x][y] = entity;
      }
    }
  };

  render (context, deltaTime) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        context.fillStyle = this.grid[x][y].color;
        context.fillRect(0.5 + x * this.tileSize.w, 0.5 + y * this.tileSize.h, this.tileSize.w, this.tileSize.h);
      }
    }
  };

  update(deltaTime) {
    // this.init();
  };

};

module.exports = Board;