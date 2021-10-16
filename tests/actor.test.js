const Actor = require('../src/actor')

test('new Actor() should throw TypeError', () => {
  const t = () => {
    // eslint-disable-next-line no-unused-vars
    const actor = new Actor()
  }

  expect(t).toThrow(TypeError)
})

test('new Actor() TypeError Message should match', () => {
  const t = () => {
    // eslint-disable-next-line no-unused-vars
    const actor = new Actor()
  }

  expect(t).toThrow('Unable to constuct Actor Component instances directly')
})
