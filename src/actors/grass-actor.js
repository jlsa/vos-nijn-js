const Actor = require('../actor')
const Position = require('../position')

class GrassActor extends Actor {
  constructor (field, startPosition = { x: 0, y: 0 }, maxAge = 10) {
    super()
    this.Active = true
    this.Field = field
    this.Position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'grass'
    this.color = '#3EB595'
  };

  act (newActors) {
    console.log('grass leaf blowing in the wind.')
    // const rand = Math.floor(Math.random() * this.actorTypes.length)
  };

  incrementAge () {
    this.age++
    if (this.age >= this.maxAge) {
      this.die()
    }
  }

  die () {
    this.Active = false
    // if (this.Location !== null) {
    //   this.field.clear(this.Location)
    //   this.Location = null
    //   this.field = null
    // }
  }
};

module.exports = GrassActor
