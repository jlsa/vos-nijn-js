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
  })

  test('After init the grid has right length', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.grid).toHaveLength(4)
  })

  test('Reset empties the grid', () => {
    const board = new Board(2, 2)
    board.init()
    expect(board.grid).toHaveLength(4)
    board.reset()
    expect(board.grid).toHaveLength(0)
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

  test('Calling getActorAt at x=0 and y=0 on an properly initialized and filled board should return actor', () => {
    const board = new Board(1, 1)
    board.init()
    expect(board.getActorAt(new Position(0, 0))).not.toBeUndefined()
  })

  test('The getIndex method converts position to the right index', () => {
    const board = new Board(10, 10)
    board.init()
    expect(board.getIndex(new Position(5, 5))).toBe(55)
    expect(board.getIndex(new Position(8, 3))).toBe(38)
    expect(board.getIndex(new Position(2, 9))).toBe(92)
  })
})
