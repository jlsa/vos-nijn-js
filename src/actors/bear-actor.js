const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')
const RabbitActor = require('./rabbit-actor')
const FoxActor = require('./fox-actor')

class BearActor extends Actor {
  constructor (board, maxAge = 100, startPosition = { x: 0, y: 0 }) {
    super('bear')
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.age = Math.floor(Math.random() * maxAge) + 1
    this.maxAge = maxAge
    this.name = 'bear'
    this.colorDetails = {
      h: 214,
      s: 62,
      l: 75
    }
    this.color = 'hsl(214, 62%, 75%)'// '#497CBF'
    this.foodValue = 15
    this.foodLevel = 20
    this.huntFoodLevel = 18
    this.maxFoodLevel = 20
    this.breedingAge = 10
    this.maxLitterSize = 1
    this.breedingProbability = 0.05
    this.breedFoodLevel = 2
    this.stepEnergy = 1
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

      if (actor && actor instanceof FoxActor) {
        if (actor.Active) {
          if (!actor.tryToEscape()) {
            actor.setInActive()// kill fox
            this.feed(actor.foodValue)
            return position
          }
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
            this.incrementHunger()
            let cub
            if (this.isHungry()) {
              cub = new BearActor(this.board, this.maxAge / 2)
              cub.foodLevel = Math.floor(Math.random(this.foodLevel / 2))
              cub.stepEnergy = this.stepEnergy + 1
              cub.breedingProbability = this.breedingProbability / 2 > 0.001 ? this.breedingProbability / 2 : 0
              cub.colorDetails = {
                ...this.colorDetails,
                l: (this.colorDetails.l - 1 > 0 ? this.colorDetails.l - 1 : 0)
              }
              cub.color = `hsl(${cub.colorDetails.h}, ${cub.colorDetails.s}%, ${cub.colorDetails.l}%)`
            } else {
              cub = new BearActor(this.board)
            }

            this.board.placeAt(position, cub)
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
    this.foodLevel -= this.stepEnergy
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

module.exports = BearActor
