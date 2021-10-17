const Actor = require('../actor')
const Position = require('../position')

class FoxActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 10) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'fox'
    this.color = '#ED960B'
  };

  act (newActors) {
    console.log('Fox, doing their fox thing. Looking for rabbits to eat.')
  };

  isActive () {
    return this.active
  };
};

module.exports = FoxActor
