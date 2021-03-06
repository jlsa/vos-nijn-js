// Inspired by: https://bost.ocks.org/mike/shuffle/
const shuffle = (array) => {
  let m = array.length
  let t
  let i

  // While there remains elements to shuffle
  while (m) {
    // Pick a remaining element.
    i = Math.floor(Math.random() * m--)
    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

module.exports = shuffle
