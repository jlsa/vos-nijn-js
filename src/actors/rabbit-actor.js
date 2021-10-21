const Actor = require('../actor')
const Position = require('../position')
const GrassActor = require('./grass-actor')

class RabbitActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 20) {
    super()
    this.active = true
    this.board = board
    this.position = new Position(startPosition.x, startPosition.y)
    this.age = Math.floor(Math.random() * maxAge)
    this.maxAge = maxAge
    this.name = 'rabbit'
    this.color = '#7B5749'
    this.foodLevel = 20
    this.maxFoodLevel = 20
    this.foodValue = 4
    this.breedingAge = 5
    this.breedFoodLevel = 2
    this.maxLitterSize = Math.floor(Math.random() * 6)
    this.breedingProbability = 0.15
    this.baseEscapeChance = 10
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
    const births = this.breed()
    if (births > 0) {
      let b = 0
      freePositions.forEach(position => {
        if (b < births) {
          if (this.active && !this.isHungry()) {
            this.board.placeAt(position, new RabbitActor(this.board))
            if (Math.random() <= 0.02) {
              this.incrementHunger()
            }
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
    // return false
    return this.foodLevel < this.breedFoodLevel
  }

  canBreed () {
    return this.age >= this.breedingAge
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

    for (let i = 0; i < adjacent.length; i++) {
      const position = adjacent[i]
      const actor = this.board.getActorAt(position)
      if (actor && actor instanceof GrassActor) {
        if (actor.Active) {
          this.feed(actor.foodValue)
          actor.setInActive()
          return position
        }
      }
    }
    return false
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

  setInActive () {
    this.active = false
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
