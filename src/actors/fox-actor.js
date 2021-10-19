const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')
const RabbitActor = require('./rabbit-actor')

class FoxActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 150) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 1.0
    this.age = Math.floor(Math.random() * maxAge) + 1
    this.maxAge = maxAge
    this.name = 'fox'
    this.color = '#ED960B'
    this.foodValue = 6
    this.foodLevel = 9
    this.maxFoodLevel = 9
    this.breedingAge = 10
    this.maxLitterSize = 2
    this.breedingProbability = 0.15
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
    // const foodPosition = null
    for (let i = 0; i < adjacent.length; i++) {
      const position = adjacent[i]
      const actor = this.board.getActorAt(position)
      if (actor && actor instanceof RabbitActor) {
        if (actor.Active) {
          if (!actor.tryToEscape()) {
            actor.setInActive()// kill rabbit
            this.feed(actor.foodValue)
            // foodPosition = position
            return position
          }
        }
      }
      if (actor && actor instanceof GrassActor) {
        if (actor.Active) {
          actor.setInActive()
          // foodPosition = position
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
    return this.foodLevel <= Math.floor(this.maxFoodLevel / 4)
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

  // eat () {
  //   const newPosition = this.board.randomAdjacentPosition(this.position)
  //   const actor = this.board.getActorAt(newPosition)
  //   if (actor) {
  //     if (actor instanceof RabbitActor) {
  //       this.board.emptyAt(newPosition) // eat
  //       this.board.swap(this.position, newPosition)
  //       if (this.foodLevel < 100) {
  //         this.foodLevel++
  //       }
  //     }
  //   }
  // }

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
