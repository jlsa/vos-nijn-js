const Actor = require('../actor')
const Position = require('../position')

class GrassActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 10) {
    super()
    this.active = true
    this.board = board
    this.Position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 0
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'grass'
    this.color = '#567D46'
    this.foodValue = 1
  };

  act (newActors) {
    // console.log('grass leaf blowing in the wind.')
    // const rand = Math.floor(Math.random() * this.actorTypes.length)
    // const newPosition = this.board.randomAdjacentPosition(this.position)
    const newPosition = this.board.free
    const actor = this.board.getActorAt(newPosition)
    if (!actor) {
      this.growTo(newPosition)
      // if (actor instanceof RabbitActor) {
      //   this.board.emptyAt(newPosition)
      //   this.board.swap(this.position, newPosition)
      // }
    }
  };

  growTo (position) {
    this.board.placeAt(position, new GrassActor(this.board))
  }

  incrementAge () {
    this.age++
    if (this.age >= this.maxAge) {
      this.setInActive()
    }
  }

  setInActive () {
    this.alive = false
    if (this.position !== null) {
      this.board.emptyAt(this.position)
      this.position = null
    }
  }
};

module.exports = GrassActor
