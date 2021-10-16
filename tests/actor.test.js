const Actor = require("../src/actor")

test("new Actor() should throw TypeError", () => {
  const t = () => {
    const actor = new Actor()
  }

  expect(t).toThrow(TypeError)
})

test("new Actor() TypeError Message should match", () => {
  const t = () => {
    const actor = new Actor()
  }

  expect(t).toThrow('Unable to constuct Actor Component instances directly')
})