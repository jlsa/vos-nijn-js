const { expect } = require('@jest/globals')
const shuffle = require('../src/helpers/shuffle')

test('Shuffle a sorted list', () => {
  expect(shuffle([1, 2, 3])).not.toBe([1, 2, 3])
  expect(shuffle([1, 2, 3])).not.toBe([1, 2, 3])
})
