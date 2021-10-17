const Component = require('./component')

const GrassActor = require('./actors/grass-actor')
const FoxActor = require('./actors/fox-actor')
const RabbitActor = require('./actors/rabbit-actor')
const Position = require('./position')
const shuffle = require('./helpers/shuffle')

class Board extends Component {
  constructor (rows = 10, cols = 10, tileSize = { w: 10, h: 10 }) {
    super()
    this.rows = rows
    this.cols = cols
    this.tileSize = tileSize
    this.grid = []
    this.sortedElements = []
    this.actorTypes = [
      'grass', 'rabbit', 'fox', 'empty'
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
    // this.sortedElements.splice(0, this.sortedElements.length)
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
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        // const rrand = Math.random()
        // let actorType = 'empty'
        // if (rrand <= 0.001) {
        //   actorType = 'fox'
        // } else if (rrand > 0.001 && rrand <= 0.125) {
        //   actorType = 'rabbit'
        // } else if (rrand > 0.125 && rrand < 1.000) {
        //   actorType = 'grass'
        // }

        // const entity = null
        // switch (actorType) {
        //   case 'fox':
        //     entity = new FoxActor(null, { x, y })
        //     break
        //   case 'rabbit':
        //     entity = new RabbitActor(null, { x, y })
        //     break
        //   case 'grass':
        //     entity = new GrassActor(null, { x, y })
        //     break
        // }

        this.grid[this.grid.length] = new GrassActor(this, new Position(x, y))
      }
    }
    // let position = new Position(0, 0)
    // this.placeAt(position, new RabbitActor(this, position))
    // position = new Position(20, 20)
    // this.placeAt(position, new FoxActor(this, position))
    // // this.emptyAt(new Position(10, 10))

    // this.swap(new Position(10, 10), new Position(14, 13))
    // this.swap(new Position(0, 0), new Position(10, 10))
    // this.emptyAt(new Position(10, 9))
    // this.emptyAt(new Position(10, 11))
    // this.swap(new Position(20, 20), new Position(20, 10))
    // position = new Position(2, 2)
    // this.placeAt(position, new RabbitActor(this, position))

    // position = new Position(3, 0)
    // this.placeAt(position, new RabbitActor(this, position))
    // position = new Position(3, 1)
    // this.placeAt(position, new RabbitActor(this, position))

    // position = new Position(4, 0)
    // this.placeAt(position, new RabbitActor(this, position))

    // position = new Position(2, 1)
    // this.emptyAt(position)

    // this.organizeSorted()
    // const rand = Math.floor(Math.random() * this.grid.length)
    // const selectedActor = this.grid[rand]
    // console.log(0, this.adjacentPositions(new Position(0, 0)))
    // if (selectedActor) {
    // console.log(rand, this.adjacentPositions(selectedActor.Position))
    // console.log(rand, this.getFreeAdjacentPositions(selectedActor.Position))
    // } else {
    // console.log(rand, 'is null')
    // }
    // this.grid[rand].color = '#f60'
    // let position = new Position(0, 0)
    // this.emptyAt(position)
    // position = new Position(1, 0)
    // this.emptyAt(position)
    // position = new Position(0, 1)
    // this.emptyAt(position)
    // position = new Position(3, 0)
    // this.emptyAt(position)
    // position = new Position(4, 0)
    // this.emptyAt(position)
    // position = new Position(5, 0)
    // this.emptyAt(position)
    // position = new Position(6, 0)
    // this.emptyAt(position)
    // position = new Position(7, 0)
    // this.emptyAt(position)
  }

  get SortedElements () {
    return this.sortedElements
  };

  render (context, deltaTime) {
    const padding = 0.5
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const actor = this.grid[x + this.rows * y]
        if (actor) {
          context.fillStyle = actor.color
        } else {
          context.fillStyle = '#a2a2a2'
        }
        const xx = padding + x * this.tileSize.w
        const yy = padding + y * this.tileSize.h
        context.fillRect(xx, yy, this.tileSize.w, this.tileSize.h)
      }
    }

    this.adjacentPositions(new Position(this.xx, this.yy)).forEach(position => {
      context.fillStyle = 'purple'
      const x = padding + position.x * this.tileSize.w
      const y = padding + position.y * this.tileSize.h
      context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
    })

    this.getFreeAdjacentPositions(new Position(this.xx, this.yy)).forEach(position => {
      context.fillStyle = 'pink'
      const x = padding + position.x * this.tileSize.w
      const y = padding + position.y * this.tileSize.h
      context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
    })
    // this.sortedElements.forEach(elements => {
    //   if (elements.length > 0) {
    //     context.fillStyle = elements[0].color
    //     elements.forEach(el => {
    //       // const x = 0.5 + el.position.x * this.tileSize.w
    //       // const y = 0.5 + el.position.y * this.tileSize.h
    //       const x = 0.5 + el.position.x * this.tileSize.w
    //       const y = 0.5 + el.position.y * this.tileSize.h
    //       context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
    //     })
    //   }
    // })
  };

  randomEmptyGridSpot () {
    const x = Math.floor(Math.random() * this.rows)
    const y = Math.floor(Math.random() * this.cols)
    // const x = Math.floor(Math.random() * 20)
    // const y = Math.floor(Math.random() * 20)
    const position = new Position(x, y)
    // const index = this.getIndex(position)

    if (this.getActorAt(position)) {
      this.emptyAt(position)
    } else {
      this.randomEmptyGridSpot()
    }
  }

  update (deltaTime) {
    this.xx += this.dirX
    if (this.xx >= this.rows || this.xx <= 0) {
      this.dirX = -1 * this.dirX
    }
    this.yy += this.dirY
    if (this.yy >= this.cols || this.yy <= 0) {
      this.dirY = -1 * this.dirY
    }

    // this.randomEmptyGridSpot()
    // const x = Math.floor(Math.random() * this.cols)
    // const y = Math.floor(Math.random() * this.rows)
    // const position = new Position(x, y)
    // const positions = this.adjacentPositions(position)
    // console.log(position, positions)

    // const rand = Math.floor(Math.random() * this.grid.length)
    // if (this.getActorAt(this.grid[rand])) {
    //   //
    // }
    // this.grid.forEach(actor => {
    //   actor.act([]);
    // });
  };

  /**
   * Return a shuffled list of positions adjacent to the given one.
   * The array will not include the position itself.
   * All positions will lie within the grid
   *
   * @param {array} position
   * @returns {array} A list of positions adjacent to that given
   */
  adjacentPositions (position) {
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
      positions = shuffle(positions)
    }
    return positions
  };

  getFreeAdjacentPositions (position) {
    const free = []
    const adjacent = this.adjacentPositions(position)
    adjacent.forEach(next => {
      if (!this.getActorAt(next)) {
      // if (nextActor instanceof EmptyActor) {
        free[free.length] = next
      }
    })
    return free
  };

  getActorAt (position) {
    const index = this.getIndex(position)
    return this.grid[index]
  }

  getIndex (position) {
    return position.x + this.rows * position.y
    // return position.y + this.cols * position.x
  }

  emptyAt (position) {
    // const index = this.getIndex(position)
    // this.grid[index] = null
    this.grid[position.x + this.rows * position.y] = null
    // this.organizeSorted()
  }

  placeAt (position, actor) {
    const index = this.getIndex(position)
    this.grid[index] = actor
    // this.organizeSorted()
  }

  swap (from, to) {
    // const fromIndex = this.getIndex(from)
    // const toIndex = this.getIndex(to)
    const tmpFrom = this.getActorAt(from)
    const tmpTo = this.getActorAt(to)
    this.placeAt(from, tmpTo)
    this.placeAt(to, tmpFrom)
  }

  organizeSorted () {
    this.sortedElements.splice(0, this.sortedElements.length)
    this.actorTypes.forEach(entity => {
      this.sortedElements[this.sortedElements.length] = this.grid.filter(el => {
        if (el) {
          return el.name === entity
        } else {
          return false
        }
      })
    })
  }
};

module.exports = Board
