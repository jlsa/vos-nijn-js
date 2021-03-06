const Component = require('../src/component')

test('new Component() should throw TypeError', () => {
  const t = () => {
    // eslint-disable-next-line no-unused-vars
    const component = new Component()
  }

  expect(t).toThrow(TypeError)
})

test('new Component() TypeError Message should match', () => {
  const t = () => {
    // eslint-disable-next-line no-unused-vars
    const component = new Component()
  }

  expect(t).toThrow('Unable to constuct Component instances directly')
})
