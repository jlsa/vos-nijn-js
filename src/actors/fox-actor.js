const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')
const RabbitActor = require('./rabbit-actor')

class FoxActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 50) {
    super('fox')
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = Math.floor(Math.random() * maxAge) + 1
    this.maxAge = maxAge
    this.name = 'fox'
    this.color = '#ED960B'
    this.foodValue = 6
    this.foodLevel = 10
    this.maxFoodLevel = 10
    this.breedingAge = 9
    this.breedFoodLevel = 4
    this.maxLitterSize = 2
    this.breedingProbability = 0.15
    this.baseEscapeChance = 75
  };

  act (newActors) {
    this.incrementAge()
    this.incrementHunger()

    if (this.active) {
      this.giveBirth()
    }

    if (this.active) {
      let newPosition = this.findFood()
      if (!newPosition) {
        // No food found - try to move to a free position
        newPosition = this.board.freeAdjacentPosition(newPosition)
      }

      // See if it was possible to move
      if (newPosition) {
        const oldPosition = this.position
        this.board.placeAt(newPosition, this)
        this.board.emptyAt(oldPosition)
      } else {
        // Overcrowded
        this.setInActive()
      }
    }
  }

  findFood () {
    const adjacent = this.board.adjacentPositions(this.position)
    for (let i = 0; i < adjacent.length; i++) {
      const position = adjacent[i]
      const actor = this.board.getActorAt(position)
      if (actor && actor instanceof RabbitActor) {
        if (actor.Active) {
          if (!actor.tryToEscape()) {
            actor.setInActive()// kill rabbit
            this.feed(actor.foodValue)
            return position
          }
        }
      }
      if (actor && actor instanceof GrassActor) {
        if (actor.Active) {
          actor.setInActive()
          return position
        }
      }
    }
    return null
  }

  giveBirth () {
    const freePositions = this.board.getFreeAdjacentPositions(this.position)
    const growth = this.breed()
    if (growth > 0) {
      let b = 0
      freePositions.forEach(position => {
        if (b < growth) {
          if (this.active && !this.isHungry()) {
            this.board.placeAt(position, new FoxActor(this.board))
            this.incrementHunger()
          }
          b++
        }
      })
    }
  }

  breed () {
    let births = 0
    const breedingChance = Math.random() <= this.breedingProbability
    if (this.canBreed() && breedingChance) {
      births = Math.floor(Math.random() * this.maxLitterSize) + 1
    }
    return births
  }

  isHungry () {
    return this.foodLevel < this.breedFoodLevel
  }

  canBreed () {
    const properAge = this.age >= this.breedingAge
    return properAge
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

  tryToEscape () {
    // if there are free adjacent positions then the
    // math for this method is basic % run away change
    // + % for every one free adjacent location
    const freePositions = this.board.getFreeAdjacentPositions(this.position)
    if (freePositions.length > 0) {
      const escapeChance = this.baseEscapeChance + freePositions.length
      const tryChance = Math.random() * 100 + 1
      if (escapeChance >= tryChance) {
        this.board.swap(this.position, freePositions[0])
        return true
      }
    }
    return false
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
