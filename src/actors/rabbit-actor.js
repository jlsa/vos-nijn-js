const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')

class RabbitActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 40) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = Math.floor(Math.random() * maxAge)
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'rabbit'
    this.color = '#7B5749'
    this.foodLevel = 4
    this.maxFoodLevel = 20
    this.foodValue = 4
    this.breedingAge = 5
  };

  act (newActors) {
    this.age++
    this.foodLevel--

    if (this.age >= this.maxAge) {
      this.setInActive()
      return
    }

    if (this.Active) {
      // giveBirth()
    }
  };

  eat () {
    const newPosition = this.board.randomAdjacentPosition(this.position)
    const actor = this.board.getActorAt(newPosition)
    if (actor) {
      if (actor instanceof GrassActor) {
        this.board.emptyAt(newPosition) // eat
        if (this.foodLevel < 100) {
          this.foodLevel++
        }
      }
    }
  }

  tryToEscape () {
    // if there are free adjacent positions then the
    // math for this method is basic % run away change
    // + % for every one free adjacent location
    const freePositions = this.board.getFreeAdjacentPositions(this.position)
    if (freePositions.length > 0) {
      const escapeChance = 10 + freePositions.length
      const tryChance = Math.random() * 100 + 1
      if (escapeChance >= tryChance) {
        this.board.swap(this.position, freePositions[0])
        return true
      }
    }
    return false
  }

  setInActive () {
    this.alive = false
    if (this.position !== null) {
      this.board.emptyAt(this.position)
      this.position = null
    }
  }

  isActive () {
    return this.active
  };
};

module.exports = RabbitActor
