const Component = require('./component')

const GrassActor = require('./actors/grass-actor')
const FoxActor = require('./actors/fox-actor')
const RabbitActor = require('./actors/rabbit-actor')
const EmptyActor = require('./actors/empty-actor')
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
        } else if (rrand > 0.125 && rrand < 0.500) {
          actorType = 'grass'
        }

        let entity = new GrassActor(null, { x, y })
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
          default:
            entity = new EmptyActor(null, { x, y })
            break
        }

        this.grid[this.grid.length] = entity
      }
    }

    this.actorTypes.forEach(entity => {
      this.sortedElements[this.sortedElements.length] = this.grid.filter(el => el.name === entity)
    })
    const rand = Math.floor(Math.random() * this.grid.length)
    // console.log(rand, this.getFreeAdjacentPositions(this.grid[rand].Position))
    this.grid[rand].color = '#f60'
  }

  get SortedElements () {
    return this.sortedElements
  };

  render (context, deltaTime) {
    this.sortedElements.forEach(elements => {
      if (elements.length > 0) {
        context.fillStyle = elements[0].color
        elements.forEach(el => {
          // const x = 0.5 + el.position.x * this.tileSize.w
          // const y = 0.5 + el.position.y * this.tileSize.h
          const x = 0.5 + el.position.x * this.tileSize.w
          const y = 0.5 + el.position.y * this.tileSize.h
          context.fillRect(x, y, this.tileSize.w, this.tileSize.h)
        })
      }
    })
  };

  update (deltaTime) {
    // this.init();
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
      const nextActor = this.getActorAt(next)
      if (nextActor instanceof EmptyActor) {
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
};

module.exports = Board
