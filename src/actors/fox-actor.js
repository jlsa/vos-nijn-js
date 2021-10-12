const Actor = require('../actor')

class FoxActor extends Actor {
  constructor (field, startPosition, maxAge = 10) {
    super()
    this.active = true
    this.field = field
    this.position = startPosition
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'fox'
    this.color = '#FFF447'
  };

  act (newActors) {
    console.log('Fox, doing their fox thing. Looking for rabbits to eat.')
  };

  isActive () {
    return this.active
  };
};

module.exports = FoxActor
