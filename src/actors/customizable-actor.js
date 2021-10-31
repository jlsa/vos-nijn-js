const Actor = require('../actor')
const Position = require('../position')
const Color = require('../helpers/color')
const RabbitActor = require('../actors/rabbit-actor')
const GrassActor = require('../actors/grass-actor')

const actorNames = ['rabbit', 'fox', 'bear', 'cat', 'dog', 'eagle', 'pigeon', 'chicken', 'rat']

const defaultActorOptions = {
  active: true,
  position: new Position(0, 0),
  age: 1,
  maxAge: 25,
  name: actorNames[Math.floor(Math.random() * actorNames.length)],
  color: new Color(214, 62, 75),
  foodValue: 15,
  foodLevel: 20,
  huntFoodLevel: 18, // hunger threshold for need to feed
  maxFoodLevel: 20,
  breedingAge: 10,
  maxLitterSize: 2,
  breedingProbability: 0.05,
  breedingFoodLevel: 2,
  stepEnergy: 1,
  baseEscapeChance: 75, // 0.75,
  prey: []
}

class CustomizableActor extends Actor {
  constructor (board, options = {}) {
    super()
    this.board = board
    const actorOptions = {
      ...defaultActorOptions,
      ...options
    }
    this.options = actorOptions
    this.init(actorOptions)
  }

  init (options) {
    this.name = options.name
    this.active = options.active
    this.position = options.position
    this.age = options.age
    this.maxAge = options.maxAge
    this.colorDetails = options.color
    this.color = options.color.hsl()
    this.foodValue = options.foodValue
    this.foodLevel = options.foodLevel
    this.huntFoodLevel = options.huntFoodLevel
    this.maxFoodLevel = options.maxFoodLevel
    this.breedingAge = options.breedingAge
    this.maxLitterSize = options.maxLitterSize
    this.breedingProbability = options.breedingProbability
    this.breedFoodLevel = options.breedFoodLevel
    this.stepEnergy = options.stepEnergy
    this.prey = options.prey
  }

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

      if (this.prey.includes('rabbit')) {
        if (actor && actor instanceof RabbitActor) {
          if (actor.Active) {
            if (!actor.tryToEscape()) {
              actor.setInActive()// kill
              this.feed(actor.foodValue)
              return position
            }
          }
        }
      }
      if (this.prey.includes('fox')) {
        // if (actor && actor instanceof FoxActor) {
        if (actor && actor instanceof CustomizableActor) {
          if (actor.Active) {
            if (!actor.tryToEscape()) {
              actor.setInActive()// kill
              this.feed(actor.foodValue)
              return position
            }
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
            this.incrementHunger()
            let cub
            if (this.isHungry()) {
              const cubOptions = {
                ...this.options,
                maxAge: Math.floor(this.options.maxAge / 2),
                foodLevel: Math.floor(this.options.foodLevel / 2),
                stepEnergy: this.options.stepEnergy + 1,
                breedingProbability: this.options.breedingProbability / 2 > 0.001 ? this.options.breedingProbability / 2 : 0
              }
              cub = new CustomizableActor(this.board, cubOptions)
              // cub = new CustomizableActor(this.board, this.maxAge / 2)
              // cub.foodLevel = Math.floor(Math.random(this.foodLevel / 2))
              // cub.stepEnergy = this.stepEnergy + 1
              // cub.breedingProbability = this.breedingProbability / 2 > 0.001 ? this.breedingProbability / 2 : 0
              // cub.colorDetails = {
              // ...this.colorDetails,
              // l: (this.colorDetails.l - 1 > 0 ? this.colorDetails.l - 1 : 0)
              // }
              // cub.color = `hsl(${cub.colorDetails.h}, ${cub.colorDetails.s}%, ${cub.colorDetails.l}%)`
            } else {
              cub = new CustomizableActor(this.board, {
                ...this.options,
                position: position
              })
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
}

module.exports = CustomizableActor
