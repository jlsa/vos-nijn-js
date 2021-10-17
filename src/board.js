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
    this.xx = 0
    this.yy = 0
  };

  reset () {
    this.grid.splice(0, this.grid.length)
    this.sortedElements.splice(0, this.sortedElements.length)
    this.initialized = false
  };

  init () {
    if (this.initialized) {
      return false
    }
    this.populate()
    this.initialized = true
    return true
  };

  populate () {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const rrand = Math.random()
        let actorType = 'empty'
        if (rrand <= 0.001) {
          actorType = 'fox'
        } else if (rrand > 0.001 && rrand <= 0.125) {
          actorType = 'rabbit'
        } else if (rrand > 0.125 && rrand < 0.700) {
          actorType = 'grass'
        }

        let entity
        switch (actorType) {
          case 'fox':
            entity = new FoxActor(null, { x, y })
            break
          case 'rabbit':
            entity = new RabbitActor(null, { x, y })
            break
          case 'grass':
            entity = new GrassActor(null, { x, y })
            break
        }

        this.grid[this.grid.length] = entity
      }
    }

    this.organizeSorted()
    const rand = Math.floor(Math.random() * this.grid.length)
    const selectedActor = this.grid[rand]
    console.log()
    if (selectedActor) {
      console.log(rand, this.getFreeAdjacentPositions(selectedActor.Position))
    } else {
      console.log(rand, 'is null')
    }
    // this.grid[rand].color = '#f60'
  }

  get SortedElements () {
    return this.sortedElements
  };

  render (context, deltaTime) {
    this.grid.forEach(actor => {
      if (actor) {
        // actor.render(context, deltaTime)
        context.fillStyle = actor.color
        // const x = 0.5 + actor.position.x * this.tileSize.w
        // const y = 0.5 + actor.position.y * this.tileSize.h
        const x = 0.5 + actor.position.x * this.tileSize.w
        const y = 0.5 + actor.position.y * this.tileSize.h
        context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
      }
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

  update (deltaTime) {
    // this.init();
    const x = Math.floor(Math.random() * this.cols)
    const y = Math.floor(Math.random() * this.rows)
    // const index = this.getIndex(position)
    // this.grid[x + this.rows * y] = null

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
  }

  emptyAt (position) {
    const index = this.getIndex(position)
    this.grid[index] = null
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
