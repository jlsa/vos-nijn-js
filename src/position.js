class Position {
  constructor (x = 0, y = 0) {
    this.x = x
    this.y = y
  };

  get X () {
    return this.x
  };

  set X (x) {
    this.x = x
  };

  get Y () {
    return this.y
  };

  set Y (y) {
    this.y = y
  };
};

module.exports = Position
