const Actor = require('../actor')
const Position = require('../position')

class EmptyActor extends Actor {
  constructor (field, startPosition, maxAge = 10) {
    super()
    this.active = true
    this.field = field
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'empty'
    this.color = '#094173'
  };

  act (newActors) {
    console.log('Rabbit, hopping to a new patch of green grass.')
  };

  isActive () {
    return this.active
  };
};

module.exports = EmptyActor
