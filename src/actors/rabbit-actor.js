const Actor = require('../actor')
const Position = require('../position')

class RabbitActor extends Actor {
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
    this.name = 'rabbit'
    this.color = '#696969'
  };

  act (newActors) {
    console.log('Rabbit, hopping to a new patch of green grass.')
  };

  isActive () {
    return this.active
  };
};

module.exports = RabbitActor
