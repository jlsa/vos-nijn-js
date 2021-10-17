const FoxActor = require('../src/actors/fox-actor')
const RabbitActor = require('../src/actors/rabbit-actor')
const GrassActor = require('../src/actors/grass-actor')
const Board = require('../src/board')
const Position = require('../src/position')

describe('Tests encompassing the Board Component', () => {
  test('New Board() should not throw TypeError', () => {
    const t = () => {
      // eslint-disable-next-line no-unused-vars
      const board = new Board()
    }

    expect(t).not.toThrow(TypeError)
  })

  test('After constructing the board it is empty', () => {
    const board = new Board()
    expect(board.grid).toHaveLength(0)
    const expected = []
    expect(board.grid).toEqual(expect.arrayContaining(expected))
  })

  test('After init the grid has right length', () => {
    const board = new Board(6, 4)
    board.init()
    expect(board.grid).toHaveLength(24)
  })

  test('Reset empties the grid', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.grid).toHaveLength(4)
    board.reset()
    const expected = [null, null, null, null]
    expect(board.grid).toEqual(expect.arrayContaining(expected))
  })

  test('After init initialized is true', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.initialized).toBeTruthy()
  })

  test('Reset sets initialized to false', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.initialized).toBeTruthy()
    board.reset()
    expect(board.initialized).toBeFalsy()
  })

  test('Calling init on uninitialized board will return true', () => {
    const board = new Board(2, 2)
    expect(board.init()).toBeTruthy()
  })

  test('Calling init on initialized board will return false', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.init()).toBeFalsy()
  })

  test('Calling getActorAt at an empty or not existing position should return undefined', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.getActorAt(new Position(2, 3))).toBeUndefined()
  })

  test('Calling getActorAt at position on an properly initialized and filled board should return actor', () => {
    const board = new Board(10, 10)
    board.init()
    expect(board.getActorAt(new Position(0, 0))).not.toBeUndefined()
    expect(board.getActorAt(new Position(4, 3))).not.toBeUndefined()
    expect(board.getActorAt(new Position(7, 7))).not.toBeUndefined()
  })

  test('The getIndex method converts position to the right index', () => {
    const board = new Board(10, 10)
    board.init()
    expect(board.getIndex(new Position(5, 5))).toBe(55)
    expect(board.getIndex(new Position(8, 3))).toBe(38)
    expect(board.getIndex(new Position(2, 9))).toBe(92)
  })

  test('Calling EmptyAt empties a specific position on grid', () => {
    const board = new Board(10, 10)
    board.init()
    const position = new Position(5, 5)
    const actor = new GrassActor(null, { x: position.x, y: position.y })
    board.placeAt(position, actor)
    board.emptyAt(position)
    expect(board.getActorAt(position)).toBeNull()
  })

  test('Calling PlaceAt adds Actor on grid at position', () => {
    const board = new Board(10, 10)
    board.init()
    const position = new Position(5, 5)
    const actor = new FoxActor(board, { x: position.x, y: position.y })
    board.placeAt(position, actor)
    expect(board.getActorAt(position)).toMatchObject(actor)
  })

  test('Organize sorted test', () => {
    // const board = new Board(10, 10)
    // board.init()
    // const position = new Position(5, 5)
  })

  test('Free Adjacent Positions', () => {
    const board = new Board(10, 10)
    board.init()
    // board.placeAt(new Position(0, 0), new EmptyActor(null, ))
    // board.getFreeAdjacentPositions(new Position(0, 0))
  })

  test('no name yet', () => {
    const board = new Board(1, 1)
    board.init()

    const position1 = new Position(0, 0)
    const actor1 = new GrassActor(board, position1)
    board.placeAt(position1, actor1)

    const position2 = new Position(1, 1)
    const actor2 = new RabbitActor(board, position2)
    board.placeAt(position2, actor2)

    // const expected = [actor1, null, null, actor2]
    // expect(board.grid).not.toEqual(expect.arrayContaining(expected))

    //   // position = new Position(0, 2)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(0, 3)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(0, 4)
    //   // this.placeAt(position, new RabbitActor(this, position))

    //   // position = new Position(1, 0)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(1, 1)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(1, 2)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(1, 3)
    //   // this.placeAt(position, new RabbitActor(this, position))

    //   // position = new Position(2, 0)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   position = new Position(20, 20)
    //   this.placeAt(position, new FoxActor(this, position))
    //   // this.emptyAt(new Position(10, 10))

    //   // this.swap(new Position(10, 10), new Position(14, 13))
    //   this.swap(new Position(0, 0), new Position(10, 10))
    //   this.emptyAt(new Position(10, 9))
    //   this.emptyAt(new Position(10, 11))
    //   this.swap(new Position(20, 20), new Position(20, 10))
    //   // position = new Position(2, 2)
    //   // this.placeAt(position, new RabbitActor(this, position))

    //   // position = new Position(3, 0)
    //   // this.placeAt(position, new RabbitActor(this, position))
    //   // position = new Position(3, 1)
    //   // this.placeAt(position, new RabbitActor(this, position))

    //   // position = new Position(4, 0)
    //   // this.placeAt(position, new RabbitActor(this, position))

    //   // position = new Position(2, 1)
    //   // this.emptyAt(position)

  //   // this.organizeSorted()
  //   // const rand = Math.floor(Math.random() * this.grid.length)
  //   // const selectedActor = this.grid[rand]
  //   // console.log(0, this.adjacentPositions(new Position(0, 0)))
  //   // if (selectedActor) {
  //   // console.log(rand, this.adjacentPositions(selectedActor.Position))
  //   // console.log(rand, this.getFreeAdjacentPositions(selectedActor.Position))
  //   // } else {
  //   // console.log(rand, 'is null')
  //   // }
  //   // this.grid[rand].color = '#f60'
  //   // let position = new Position(0, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(1, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(0, 1)
  //   // this.emptyAt(position)
  //   // position = new Position(3, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(4, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(5, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(6, 0)
  //   // this.emptyAt(position)
  //   // position = new Position(7, 0)
  //   // this.emptyAt(position)
  // }
  })
})
