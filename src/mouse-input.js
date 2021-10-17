const getMousePos = (canvas, event) => {
  const bounds = canvas.getBoundingClientRect()
  const output = {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  }
  return output
}

module.exports = getMousePos
