const Component = require('./component')

class Simulator extends Component {
  constructor (app) {
    super()
    this.board = undefined
    this.actors = []

    this.numOfSteps = 1
    this.run = false
    this.runInfinite = false

    this.step = 0
    this.fixedStepSpeed = 100
    this.app = app

    this.paused = true

    this.history = []
  };

  addBoard (board) {
    this.board = board
    board.init()
    board.populate()
  };

  get FixedStepSpeed () {
    return this.fixedStepSpeed
  }

  set FixedStepSpeed (speed) {
    this.app.fixedStepSpeed = this.app.setSpeed(speed)
    this.fixedStepSpeed = speed
  }

  get Board () {
    return this.board
  };

  render (context, deltaTime) {
    this.board.render(context, deltaTime)
  };

  isRunning () {
    if (this.paused) {
      return false
    }
    if (this.run) {
      return true
    }

    return false
  }

  update (deltaTime) {
    if (this.isRunning()) {
      this.simulateOneStep()
      this.saveNumbers()
      this.board.update(deltaTime)
    }
  };

  simulate (steps) {
    if (steps <= 0) { return }
    if (this.run) { return }

    this.numOfSteps = steps
    this.run = true
    this.paused = false
    // console.log('started', new Date(), this)
  }

  simulateInfinite () {
    if (this.run) { return }
    this.run = true
    this.runInfinite = true
    this.paused = false
  }

  simulateOneStep () {
    this.step++

    if (this.needToStop()) {
      this.stop()
      return
    }
    if (!this.runInfinite) {
      this.numOfSteps--
    }
    this.board.grid.forEach(actor => {
      if (actor) {
        const newActors = []
        actor.act(newActors)
      }
    })
  }

  needToStop () {
    if (this.runInfinite) { return false }
    return this.run && this.numOfSteps <= 1
  }

  resume () {
    if (this.paused) {
      this.paused = false
    }
    if (!this.run) {
      this.run = true
    }
  }

  pause () {
    const tmp = { ...this }
    console.log(tmp)
    this.paused = true
  }

  stop () {
    const tmp = { ...this }
    console.log(tmp)
    this.run = false
    this.runInfinite = false

    this.writeHistory()
    // this.stoppedRunInfinite = false
    // this.stoppedRun = false
  }

  reset () {
    const tmp = { ...this }
    console.log(tmp)
    this.stop()
    this.step = 0
    this.numOfSteps = 1
    this.board.reset()
    this.board.populate()
    this.history.splice(0, this.history.length)
    this.history = []
    this.paused = false
  }

  saveNumbers () {
    const sortedActors = []
    this.board.actorTypes.forEach(actorType => {
      sortedActors[sortedActors.length] = this.board.grid.filter(actor => {
        if (actor) {
          return actor.name === actorType
        } else {
          return false
        }
      }).length
    })

    this.history[this.history.length] = sortedActors
  }

  writeHistory () {
    console.log(this.history)
    let output = ''
    for (let i = 0; i < this.history.length; i++) {
      const line = this.history[i].join(',') + ',\n'
      // console.log(line)
      output = output + line
    }
    console.log(output)
  }
}

module.exports = Simulator
