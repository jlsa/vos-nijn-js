const Actor = require('../actor')
const Position = require('../position')

class EmptyActor extends Actor {
  constructor (board, startPosition, maxAge = 10) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'empty'
    // this.color = '#094173'
    this.color = '#fff'
  };

  act (newActors) {
    console.log('Empty Spot')
  };

  isActive () {
    return this.active
  };
};

module.exports = EmptyActor
