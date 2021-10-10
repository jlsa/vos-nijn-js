const entities = [
  {
    name: 'grass',
    color: 'green'
  },
  {
    name: 'rabbit',
    color: 'gray'
  },
  {
    name: 'fox',
    color: 'orange'
  }
];

const board = {
  rows: 0,
  cols: 0,
  dimensions: {
    height: 10,
    width: 10
  },
  grid: [],

  init: () => {
    for (let x = 0; x < board.rows; x++) {
      board.grid[x] = [];
      for (let y = 0; y < board.cols; y++) {
        const rand = Math.floor(Math.random() * entities.length);
        const entity = entities[rand];
        board.grid[x][y] = entity;
      }
    }
  },
  render: (context, deltaTime) => {
    let p = 0;
    let rowW = board.dimensions.width;
    let rowH = board.dimensions.height;
    for (let x = 0; x < board.grid.length; x++) {
      for (let y = 0; y < board.grid[x].length; y++) {
        context.fillStyle = board.grid[x][y].color;
        context.fillRect(0.5 + p + x * rowW, 0.5 + p + y * rowH, rowW, rowH);
      }
    }
  },

  update: (deltaTime) => {
    // board.init();
  }
};
