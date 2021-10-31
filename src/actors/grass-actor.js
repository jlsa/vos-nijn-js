const Actor = require('../actor')
const Position = require('../position')

class GrassActor extends Actor {
  constructor (board, startPosition = { x: 0, y: 0 }, maxAge = 10) {
    super('grass')
    this.active = true
    this.board = board
    this.Position = new Position(startPosition.x, startPosition.y)
    this.growthProbability = 0.95
    this.age = Math.floor(Math.random() * maxAge)
    this.maxAge = maxAge
    this.growAge = 0
    this.growthSize = 7
    this.name = 'grass'
    this.color = '#567D46'
    this.foodValue = 2.5
    this.baseEscapeChance = 10
  };

  act (newActors) {
    this.incrementAge()

    if (this.active) {
      this.grow()

      const newPosition = this.board.freeAdjacentPosition(this.position)

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
  };

  grow () {
    const freePositions = this.board.getFreeAdjacentPositions(this.position)
    const growth = this.getGrowth()

    const b = 0
    freePositions.forEach(position => {
      if (b < growth) {
        this.board.placeAt(position, new GrassActor(this.board))
      }
    })
  }

  getGrowth () {
    let growths = 0
    const growthChance = Math.random() <= this.growthProbability
    if (this.canGrow() && growthChance) {
      growths = Math.floor(Math.random() * this.growthSize) + 1
    }
    return growths
  }

  canGrow () {
    return this.age >= this.growAge
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
};

module.exports = GrassActor
