const Position = require('../src/position')

test('On Position construct without parameters x and y are both zero', () => {
  const position = new Position()
  expect(position.X).toBe(0)
  expect(position.Y).toBe(0)
})

test('On Position construct with parameters x and y both zero', () => {
  const position = new Position(0, 0)
  expect(position.X).toBe(0)
  expect(position.Y).toBe(0)
})

test('On Position construct with parameters x = 1 and y -1', () => {
  const position = new Position(1, -1)
  expect(position.X).toBe(1)
  expect(position.Y).toBe(-1)
})

test('Setting x and y to other position', () => {
  const position = new Position()
  position.X = 10
  expect(position.X).toBe(10)

  position.Y = 100
  expect(position.Y).toBe(100)
})



