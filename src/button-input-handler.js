const Simulator = require('./simulator')

const controlsList = [
  {
    label: 'Simulate Infinite',
    icon: 'infinity',
    onClick: (simulator) => { simulator.simulateInfinite() }
  },
  {
    label: 'Simulate 1 step',
    numOfSteps: 1,
    onClick: (simulator) => { simulator.simulate(1) }
  },
  {
    label: 'Simulate 10 steps',
    numOfSteps: 10,
    onClick: (simulator) => { simulator.simulate(10) }
  },
  {
    label: 'Simulate 100 steps',
    numOfSteps: 100,
    onClick: (simulator) => { simulator.simulate(100) }
  },
  {
    label: 'Simulate 1000 steps',
    numOfSteps: 1000,
    onClick: (simulator) => { simulator.simulate(1000) }
  },
  {
    label: 'Pause',
    icon: 'pause',
    onClick: (simulator) => { simulator.pause() }
  },
  {
    label: 'Stop',
    icon: 'stop',
    onClick: (simulator) => { simulator.stop() }
  },
  {
    label: 'Continue',
    icon: 'play',
    onClick: (simulator) => { simulator.resume() }
  },
  {
    label: 'Reset',
    icon: 'redo',
    onClick: (simulator) => { simulator.reset() }
  }
]

class ButtonInputHandler {
  constructor (simulator) {
    if (!(simulator instanceof Simulator)) { throw new TypeError('Simulator not provided.') }
    this.simulator = simulator

    this.controls = []
    const parentNode = document.getElementById('controls')
    controlsList.forEach(control => {
      const button = this.addButton(control)
      parentNode.appendChild(button)
      this.controls[this.controls.length] = button
    })
  }

  textButton (control) {
    const button = document.createElement('button')
    button.type = 'button'
    button.innerText = control.label
    button.addEventListener('click', () => control.onClick(this.simulator))
    return button
  }

  addButton (control) {
    const button = document.createElement('button')
    button.type = 'button'
    if (control.icon) {
      const spanEl = document.createElement('span')
      const iEl = document.createElement('i')
      iEl.classList.add('fas', `fa-${control.icon}`)
      spanEl.appendChild(iEl)
      button.appendChild(spanEl)
    } else {
      button.innerText = control.numOfSteps
    }
    button.classList.add('icon', 'infinite')
    button.addEventListener('click', () => control.onClick(this.simulator))

    const tooltip = document.createElement('div')
    tooltip.innerText = control.label
    tooltip.classList.add('tooltip')
    button.appendChild(tooltip)
    return button
  }
}

module.exports = ButtonInputHandler
