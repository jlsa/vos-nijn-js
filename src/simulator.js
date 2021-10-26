const Component = require('./component')

class Simulator extends Component {
  constructor () {
    super()
    this.board = undefined
    this.actors = []

    this.numOfSteps = 100
    this.run = false
    this.runInfinite = false
    this.stoppedRun = false
    this.stoppedRunInfinite = false

    this.step = 0
  };

  addBoard (board) {
    this.board = board
    board.init()
    board.populate()
  };

  get Board () {
    return this.board
  };

  render (context, deltaTime) {
    this.board.render(context, deltaTime)
  };

  update (deltaTime) {
    if (this.run) {
      this.simulateOneStep()
    }
    this.board.update(deltaTime)
  };

  simulate (steps) {
    if (steps <= 0) { return }
    if (this.run) { return }

    this.numOfSteps = steps
    this.run = true
  }

  simulateInfinite () {
    if (this.run) { return }
    this.run = true
    this.runInfinite = true
  }

  simulateOneStep () {
    this.step++

    if (this.needToStop()) {
      this.stop()
      return
    }
    this.numOfSteps--
    console.log(this.step, this.numOfSteps, {
      run: this.run,
      runInfinite: this.runInfinite,
      stoppedRun: this.stoppedRun,
      stoppedRunInfinite: this.stoppedRunInfinite
    })
    this.board.grid.forEach(actor => {
      if (actor) {
        const newActors = []
        actor.act(newActors)
      }
    })
  }

  needToStop () {
    if (this.runInfinite) { return false }
    return this.run && this.numOfSteps < 1
  }

  resume () {
    if (this.stoppedRun) {
      this.run = true
      this.stoppedRun = false
    }
    if (this.stoppedRunInfinite) {
      this.run = true
      this.stoppedRunInfinite = false
    }
  }

  pause () {
    if (this.run) {
      this.stoppedRun = true
      this.run = false
    }
    if (this.runInfinite) {
      this.stoppedRunInfinite = true
      this.runInfinite = false
    }
  }

  stop () {
    this.run = false
    this.runInfinite = false
    this.stoppedRunInfinite = false
    this.stoppedRun = false
  }

  reset () {
    this.stop()
    this.step = 0
    this.numOfSteps = 1
    this.board.reset()
    this.board.populate()
  }
};

module.exports = Simulator
