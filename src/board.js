const Component = require('./component')

const GrassActor = require('./actors/grass-actor')
const CustomizableActor = require('./actors/customizable-actor')
const Position = require('./position')
const shuffle = require('./helpers/shuffle')
const Color = require('./helpers/color')

class Board extends Component {
  constructor (rows = 10, cols = 10, tileSize = { w: 10, h: 10 }) {
    super()
    this.rows = rows
    this.cols = cols
    this.tileSize = tileSize
    this.grid = []
    this.actorTypes = [
      'grass', 'rabbit', 'chicken', 'fox', 'bear'
    ]
    this.initialized = false
    this.xx = 10
    this.yy = 10
    this.dirX = 0
    this.dirY = 0
  };

  reset () {
    this.grid.splice(0, this.grid.length)
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this.grid[this.grid.length] = null
      }
    }
    this.initialized = false
  };

  init () {
    if (this.initialized) {
      return false
    }
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        this.grid[this.grid.length] = null
      }
    }
    this.initialized = true
    return true
  };

  populate () {
    const breeding = {
      bear: { start: 0, end: 0.0015 },
      fox: { start: 0.0015, end: 0.0030 },
      chicken: { start: 0.0030, end: 0.0045 },
      rabbit: { start: 0.0045, end: 0.01 },
      grass: { start: 0.01, end: 0.9 }
    }
    // const breeding = {
    //   bear: { start: 0, end: 0.0015 },
    //   fox: { start: 0.0015, end: 0.015 },
    //   chicken: { start: 0.015, end: 0.0115 },
    //   rabbit: { start: 0.0115, end: 0.0215 },
    //   // rabbit: { start: 0.115, end: 0.5 },
    //   grass: { start: 0.9, end: 1.0 }
    // }

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const position = new Position(x, y)
        const rrand = Math.random()
        let actorType
        if (rrand > breeding.bear.start && rrand <= breeding.bear.end) {
          actorType = 'bear'
        } else if (rrand > breeding.fox.start && rrand <= breeding.fox.end) {
          actorType = 'fox'
        } else if (rrand > breeding.chicken.start && rrand <= breeding.chicken.end) {
          actorType = 'chicken'
        } else if (rrand > breeding.rabbit.start && rrand <= breeding.rabbit.end) {
          actorType = 'rabbit'
        } else if (rrand > breeding.grass.start && rrand < breeding.grass.end) {
          actorType = 'grass'
        }

        let entity = null
        switch (actorType) {
          case 'bear':
            entity = new CustomizableActor(this, {
              name: 'bear',
              position: position,
              prey: ['rabbit', 'chicken', 'fox', 'bear']
            })
            break
          case 'fox':
            entity = new CustomizableActor(this, {
              name: 'fox',
              position: position,
              color: new Color(36, 91, 48),
              foodValue: 6,
              foodLevel: 10,
              maxFoodLevel: 10,
              breedingAge: 9,
              breedingProbability: 0.15,
              age: 1,
              maxAge: 50,
              maxLitterSize: 2,
              baseEscapeChance: 75,
              prey: ['rabbit', 'chicken']
            })
            break
          case 'chicken':
            entity = new CustomizableActor(this, {
              name: 'chicken',
              position: position,
              color: new Color(319, 100, 75),
              foodValue: 2,
              foodLevel: 20,
              maxFoodLevel: 20,
              breedingAge: 5,
              breedingFoodLevel: 2,
              breedingProbability: 0.15,
              age: 1,
              maxAge: 60,
              maxLitterSize: 2,
              baseEscapeChance: 15,
              prey: ['grass']
            })
            break
          case 'rabbit':
            // entity = new RabbitActor(this)
            entity = new CustomizableActor(this, {
              name: 'rabbit',
              position: position,
              color: new Color(17, 26, 38),
              foodValue: 2,
              foodLevel: 20,
              maxFoodLevel: 20,
              breedingFoodLevel: 1,
              breedingAge: 2,
              maxLitterSize: 4, // Math.floor(Math.random() * 2),
              breedingProbability: 0.15,
              age: 1, // Math.floor(Math.random() * 50),
              maxAge: 20,
              baseEscapeChance: 15, // 10
              prey: ['grass']
            })
            break
          case 'grass':
            entity = new GrassActor(this)
            break
        }

        this.placeAt(position, entity)
      }
    }
  }

  setSelected (position) {
    this.xx = position.x
    this.yy = position.y
  }

  render (context, deltaTime) {
    const padding = 0.5
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const actor = this.grid[x + this.rows * y]
        if (actor) {
          if (context.fillStyle !== actor.color) {
            context.fillStyle = actor.color
          }
        } else {
          if (context.fillStyle !== '#d9dad8') {
            context.fillStyle = '#d9dad8'
          }
        }
        const xx = padding + x * this.tileSize.w
        const yy = padding + y * this.tileSize.h
        context.fillRect(xx, yy, this.tileSize.w, this.tileSize.h)
      }
    }

    // this.adjacentPositions(new Position(this.xx, this.yy)).forEach(position => {
    //   context.fillStyle = 'rgba(255, 255, 255, 0.3)'
    //   const x = padding + position.x * this.tileSize.w
    //   const y = padding + position.y * this.tileSize.h
    //   context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
    // })

    // this.getFreeAdjacentPositions(new Position(this.xx, this.yy)).forEach(position => {
    //   context.fillStyle = 'red'
    //   const x = padding + position.x * this.tileSize.w
    //   const y = padding + position.y * this.tileSize.h
    //   context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
    // })
  };

  randomEmptyGridSpot () {
    const x = Math.floor(Math.random() * this.rows)
    const y = Math.floor(Math.random() * this.cols)
    const position = new Position(x, y)

    if (this.getActorAt(position)) {
      this.emptyAt(position)
    } else {
      this.randomEmptyGridSpot()
    }
  }

  update (deltaTime) {
    // const position = new Position()
    // for (let x = 0; x < this.rows; x++) {
    //   for (let y = 0; y < this.cols; y++) {
    //     position.X = y
    //     position.Y = x
    //     const actor = this.getActorAt(position)// this.grid[x + this.rows * y]
    //     if (actor) {
    //       actor.act([])
    //     }
    //   }
    // }
    // this.grid.forEach(actor => {
    //   if (actor) {
    //     actor.act([])
    //   }
    // })
  }

  randomAdjacentPosition (position) {
    const adjacent = this.adjacentPositions(position)
    return adjacent[0]
  }

  /**
   * Return a shuffled list of positions adjacent to the given one.
   * The array will not include the position itself.
   * All positions will lie within the grid
   *
   * @param {array} position
   * @returns {array} A list of positions adjacent to that given
   */
  adjacentPositions (position, random = true) {
    let positions = []
    if (position) {
      const row = position.X
      const col = position.Y
      for (let roffset = -1; roffset <= 1; roffset++) {
        const nextRow = row + roffset
        if (nextRow >= 0 && nextRow < this.rows) {
          for (let coffset = -1; coffset <= 1; coffset++) {
            const nextCol = col + coffset
            // Exclude invalid locations and the original location.
            if (nextCol >= 0 && nextCol < this.cols && (roffset !== 0 || coffset !== 0)) {
              positions[positions.length] = new Position(nextRow, nextCol)
            }
          }
        }
      }
      // Shuffle the list. Several other methods rely on the list
      // being in a random order.
      if (random) {
        positions = shuffle(positions)
      }
    }
    return positions
  }

  freeAdjacentPosition (position) {
    const positions = this.getFreeAdjacentPositions(position)
    if (positions.length > 0) {
      return positions[0]
    }
    return null
  }

  getFreeAdjacentPositions (position) {
    const free = []
    const adjacent = this.adjacentPositions(position)
    adjacent.forEach(next => {
      if (!this.getActorAt(next)) {
        free[free.length] = next
      }
    })
    return free
  }

  getActorAt (position) {
    const index = this.getIndex(position)
    return this.grid[index]
  }

  getIndex (position) {
    if (position) {
      return position.x + this.rows * position.y
    }
    return 0
  }

  emptyAt (position) {
    if (position) {
      this.grid[position.x + this.rows * position.y] = null
    }
  }

  placeAt (position, actor) {
    const index = this.getIndex(position)
    this.grid[index] = actor
    if (actor) {
      actor.Position = position
    }
  }

  swap (from, to) {
    const tmpFrom = this.getActorAt(from)
    const tmpTo = this.getActorAt(to)
    this.placeAt(from, tmpTo)
    this.placeAt(to, tmpFrom)
  }
}

module.exports = Board
