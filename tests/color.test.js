const { expect } = require('@jest/globals')
const Color = require('../src/helpers/color')

test('hsl', () => {
  expect((new Color()).hsl()).toBe('hsl(0, 0%, 0%)')
})

test('hsl with values', () => {
  expect((new Color(0, 100, 50)).hsl()).toBe('hsl(0, 100%, 50%)')
})

test('hsl to rgb', () => {
  expect((new Color()).rgb()).toBe('rgb(0, 0, 0)')
})

test('hsl to rgb with values', () => {
  expect((new Color(0, 100, 50)).rgb()).toBe('rgb(255, 255, 0)')
})
