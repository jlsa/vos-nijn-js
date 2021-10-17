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
    // this.incrementAge()
    // this.incrementHunger()

    if (this.active) {
      // this.giveBirth()

      let newPosition = this.findFood()
      if (!newPosition) {
        // No food found - try to move to a free position
        newPosition = this.board.freeAdjacentPosition(newPosition)
      }

      if (newPosition) {
        // const oldPosition = this.position
        this.board.swap(this.position, newPosition)
        // this.board.placeAt(newPosition, this)
        // this.board.emptyAt(oldPosition)
      } else {
        // this.setInActive()
      }
    }
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

  giveBirth () {
    const freePositions = this.board.getFreeAdjacentPositions(this.position)
    if (freePositions.length > 0) {
      // console.log(freePositions)
      const births = this.breed()
      const b = 0
      freePositions.forEach(position => {
        if (b < births) {
          this.board.placeAt(position, new RabbitActor(this.board))
        }
      })
    }
    // for (let b = 0; b < births && freePositions.length > 0; b++) {
    //   const position = freePositions.pop()
    //   console.log(position, freePositions.length)
    //   this.board.placeAt(position, new RabbitActor(this.board))
    // }
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

  feed (foodValue) {
    let newFoodLevel = foodValue + this.foodLevel
    if (newFoodLevel > this.maxFoodLevel) {
      newFoodLevel = this.maxFoodLevel
    }
    this.foodLevel = newFoodLevel
  }

  findFood () {
    const adjacent = this.board.adjacentPositions(this.position)
    if (adjacent.length > 0) {
      adjacent.forEach(position => {
        const actor = this.board.getActorAt(position)
        if (actor && actor instanceof GrassActor) {
          if (actor.Active) {
            this.feed(actor.foodValue)
            actor.setInActive()
            return position
          }
        }
      })
    } else {
      return null
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
