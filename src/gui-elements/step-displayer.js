const Component = require('../component')
const TextElement = require('../ui-elements/text-element')

class StepDisplayer extends Component {
  constructor (gui, simulator) {
    super()
    this.gui = gui
    this.simulator = simulator

    this.numOfStepsObj = {
      value: 0,
      uiElement: new TextElement('Steps to go: 0', 10, this.gui.bounds.h - 52 - 10)
    }
    this.totalStepsObj = {
      value: 0,
      uiElement: new TextElement('Total steps: 0', 10, this.gui.bounds.h - 26 - 10)
    }

    this.gui.add(this.numOfStepsObj.uiElement)
    this.gui.add(this.totalStepsObj.uiElement)
  };

  update (deltaTime) {
    this.getSimulatorStats()

    this.numOfStepsObj.uiElement.Text = `Steps to go: ${this.numOfStepsObj.value}`
    this.totalStepsObj.uiElement.Text = `Total steps: ${this.totalStepsObj.value}`
  }

  getSimulatorStats () {
    this.totalStepsObj.value = this.simulator.step
    this.numOfStepsObj.value = this.simulator.numOfSteps
    this.numOfStepsObj.uiElement.Active = !this.simulator.runInfinite
  }
};

module.exports = StepDisplayer
