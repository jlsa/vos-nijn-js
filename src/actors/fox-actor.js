const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')
const RabbitActor = require('./rabbit-actor')

class FoxActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 40) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = 1
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 4
    this.name = 'fox'
    this.color = '#ED960B'
    this.foodValue = 1
    this.foodLevel = 100
    this.maxFoodLevel = 100
    this.breedingAge = 5
    this.maxLitterSize = 4
  };

  act (newActors) {
    this.incrementAge()
    this.incrementHunger()

    if (this.isActive) {
      let newPosition = this.findFood()
      if (newPosition === null) {
        // No food found - try to move to a free position
        newPosition = this.board.getFreeAdjacentPositions(this.position)
      }
      // See if it was possible to move
      if (newPosition) {
        const prevPosition = this.position
        this.board.placeAt(newPosition)
        this.board.emptyAt(prevPosition)
      } else {
        // Overcrowding
        this.setInActive()
      }
    }

    if (this.age > 6) {
      const rand = Math.random()
      if (rand < 0.7) {
        const freePositions = this.board.getFreeAdjacentPositions(this.position)
        const i = 0
        freePositions.forEach(freePosition => {
          if (i < 1) {
            this.board.placeAt(freePosition, new FoxActor(this.board))
          }
        })
      }
    }
  }

  findFood () {
    const adjacent = this.board.adjacentPositions(this.position)
    if (adjacent.length > 0) {
      adjacent.forEach(position => {
        const actor = this.board.getActorAt(position)
        if (actor && actor instanceof RabbitActor) {
          if (actor.Active) {
            if (!actor.tryToEscape()) {
              actor.setInActive()// kill rabbit
              this.foodLevel += actor.foodValue
            }
            return position
          }
        }
        if (actor && actor instanceof GrassActor) {
          if (actor.Active) {
            actor.setInActive()
            return position
          }
        }
      })
    } else {
      return null
    }
  }

  breed () {
    let births = 0
    if (this.canBreed() && Math.random() * 100 <= this.breedingProbability) {
      births = Math.floor(Math.random() * this.maxLitterSize) + 1
    }
    return births
  }

  canBreed () {
    return this.age >= this.breedingAge
  }

  incrementHunger () {
    this.foodLevel--
    if (this.foodLevel <= 0) {
      this.setInActive()
    }
  }

  incrementAge () {
    this.age++
    if (this.age >= this.maxAge) {
      this.setInActive()
    }
  }

  eat () {
    const newPosition = this.board.randomAdjacentPosition(this.position)
    const actor = this.board.getActorAt(newPosition)
    if (actor) {
      if (actor instanceof RabbitActor) {
        this.board.emptyAt(newPosition) // eat
        this.board.swap(this.position, newPosition)
        if (this.foodLevel < 100) {
          this.foodLevel++
        }
      }
    }
  }

  feed (foodValue) {
    let newFoodLevel = foodValue + this.foodLevel
    if (newFoodLevel > this.maxFoodLevel) {
      newFoodLevel = this.maxFoodLevel
    }
    this.foodLevel = newFoodLevel
  }

  setInActive () {
    this.active = false
    if (this.position !== null) {
      this.board.emptyAt(this.position)
      this.position = null
    }
  }
}

module.exports = FoxActor
