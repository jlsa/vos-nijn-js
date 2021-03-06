const Simulator = require('./simulator')

const controlsList = [
  {
    label: 'Simulate Infinite',
    icon: 'infinity',
    onClick: (simulator) => { simulator.simulateInfinite() },
    cssClass: 'infinite-control'
  },
  {
    label: 'Simulate 1 step',
    numOfSteps: 1,
    onClick: (simulator) => { simulator.simulate(1) },
    cssClass: 'step-control'
  },
  {
    label: 'Simulate 10 steps',
    numOfSteps: 10,
    onClick: (simulator) => { simulator.simulate(10) },
    cssClass: 'step-control'
  },
  {
    label: 'Simulate 100 steps',
    numOfSteps: 100,
    onClick: (simulator) => { simulator.simulate(100) },
    cssClass: 'step-control'
  },
  {
    label: 'Simulate 1000 steps',
    numOfSteps: 1000,
    onClick: (simulator) => { simulator.simulate(1000) },
    cssClass: 'step-control'
  },
  {
    label: 'Pause',
    icon: 'pause',
    onClick: (simulator) => { simulator.pause() },
    cssClass: 'action-control'
  },
  {
    label: 'Stop',
    icon: 'stop',
    onClick: (simulator) => { simulator.stop() },
    cssClass: 'action-control'
  },
  {
    label: 'Continue',
    icon: 'play',
    onClick: (simulator) => { simulator.resume() },
    cssClass: 'action-control'
  },
  {
    label: 'Reset',
    icon: 'redo',
    onClick: (simulator) => { simulator.reset() },
    cssClass: 'action-control'
  }
]

const speedControlsList = [
  {
    label: 'Very slow',
    speed: 'x0.1',
    onClick: (simulator) => { simulator.FixedStepSpeed = 1000 },
    cssClass: 'speed-control'
  },
  {
    label: 'Default',
    speed: 'x1',
    onClick: (simulator) => { simulator.FixedStepSpeed = 100 },
    cssClass: 'speed-control'
  },
  {
    label: 'Fastest',
    speed: 'x3',
    onClick: (simulator) => { simulator.FixedStepSpeed = 10 },
    cssClass: 'speed-control'
  }
]

class ButtonInputHandler {
  constructor (simulator) {
    if (!(simulator instanceof Simulator)) { throw new TypeError('Simulator not provided.') }
    this.simulator = simulator

    this.controls = []
    this.speedControls = []

    this.setupSimulatorControls()
    this.setupSpeedControls()
  }

  setupSimulatorControls () {
    const parentNode = document.getElementById('controls')
    controlsList.forEach(control => {
      const button = this.addButton(control)
      parentNode.appendChild(button)
      this.controls[this.controls.length] = button
    })
  }

  setupSpeedControls () {
    const parentNode = document.getElementById('speed-controls')
    speedControlsList.forEach(control => {
      const button = this.addButton(control)
      parentNode.appendChild(button)
      this.speedControls[this.speedControls.length] = button
    })
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
    } else if (control.numOfSteps) {
      button.innerText = control.numOfSteps
    } else if (control.speed) {
      button.innerText = control.speed
    } else {
      button.innerText = '?!'
    }
    const cssClass = control.cssClass ? control.cssClass : 'default-control'
    button.classList.add('icon', cssClass)
    button.addEventListener('click', () => control.onClick(this.simulator))

    const tooltip = document.createElement('div')
    tooltip.innerText = control.label
    tooltip.classList.add('tooltip')
    button.appendChild(tooltip)
    return button
  }
}

module.exports = ButtonInputHandler
