const entities = [
  {
    name: 'grass',
    color: '#3EB595',
    render: (context, deltaTime) => { },
    update: (deltaTime) => { }
  },
  {
    name: 'rabbit',
    color: '#696969',
    render: (context, deltaTime) => { },
    update: (deltaTime) => { }
  },
  {
    name: 'fox',
    color: '#FFF447',
    render: (context, deltaTime) => { },
    update: (deltaTime) => { }
  },
  {
    name: 'water',
    color: '#09C3DB',
    render: (context, deltaTime) => { },
    update: (deltaTime) => { }
  },
  {
    name: 'null',
    color: '#C9C9C9',
    render: (context, deltaTime) => { },
    update: (deltaTime) => { }
  }
];

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
// const entities = [
//   {
//     name: 'grass',
//     color: 'green'
//   },
//   {
//     name: 'rabbit',
//     color: 'gray'
//   },
//   {
//     name: 'fox',
//     color: 'orange'
//   }
// ];

// const board = {
//   rows: 0,
//   cols: 0,
//   dimensions: {
//     height: 10,
//     width: 10
//   },
//   grid: [],

//   init: () => {
//     for (let x = 0; x < board.rows; x++) {
//       board.grid[x] = [];
//       for (let y = 0; y < board.cols; y++) {
//         const rand = Math.floor(Math.random() * entities.length);
//         const entity = entities[rand];
//         board.grid[x][y] = entity;
//       }
//     }
//   },
//   render: (context, deltaTime) => {
//     let p = 0;
//     let rowW = board.dimensions.width;
//     let rowH = board.dimensions.height;
//     for (let x = 0; x < board.grid.length; x++) {
//       for (let y = 0; y < board.grid[x].length; y++) {
//         context.fillStyle = board.grid[x][y].color;
//         context.fillRect(0.5 + p + x * rowW, 0.5 + p + y * rowH, rowW, rowH);
//       }
//     }
//   },

//   update: (deltaTime) => {
//     // board.init();
//   }
// };
