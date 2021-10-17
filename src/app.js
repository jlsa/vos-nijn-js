// const fs = require('./config.json')
const Simulator = require('./simulator')
const Board = require('./board')
const Layer = require('./layer')
const Gui = require('./gui')
const GuiEntityList = require('./gui-elements/gui-entity-list')
const appSettings = require('./data/app-settings.json')

class App {
  constructor () {
    this.initialized = false
    this.lastUpdate = Date.now()
    this.fixedStep = 100
    this.elapsedTimeBeforeNextStep = 0

    this.loop = this.loop.bind(this)
    this.settings = {
      bounds: appSettings.bounds ? appSettings.bounds : { w: 1000, h: 1000 },
      fieldSize: appSettings.fieldSize ? appSettings.fieldSize : { w: 10, h: 10 },
      boardSize: appSettings.boardSize ? appSettings.boardSize : { rows: 100, cols: 100 }
    }
    this.layers = []
    this.simulator = new Simulator()
    this.gui = new Gui()
  };

  init () {
    const parentNode = document.getElementById('layers')
    parentNode.style.width = this.settings.bounds.w
    parentNode.style.height = this.settings.bounds.h
    // let layerNames = ['bg-layer', 'game-layer', 'ui-layer'];
    const layerNames = ['game-layer', 'ui-layer']
    layerNames.forEach(layerName => {
      const canvas = document.createElement('canvas')
      canvas.setAttribute('width', this.settings.bounds.w)
      canvas.setAttribute('height', this.settings.bounds.h)
      canvas.classList.add('layer')
      parentNode.appendChild(canvas)
      canvas.offscreenCanvas = document.createElement('canvas')
      canvas.offscreenCanvas.width = canvas.getAttribute('width')
      canvas.offscreenCanvas.height = canvas.getAttribute('height')
      const context = canvas.getContext('2d')

      this.layers[this.layers.length] = new Layer(canvas, context)
    })

    this.layers[0].addChild(this.simulator)
    this.simulator.addBoard(new Board(this.settings.boardSize.rows, this.settings.boardSize.cols, this.settings.fieldSize))

    this.layers[1].addChild(this.gui)
    // const entityList = new GuiEntityList(this.gui, this.simulator.Board)
    // this.gui.add(entityList)
  };

  start () {
    requestAnimationFrame(this.loop)
  };

  set LastUpdate (lastUpdate) {
    this.lastUpdate = lastUpdate
  };

  get LastUpdate () {
    return this.lastUpdate
  };

  loop () {
    const now = Date.now()
    const deltaTime = now - this.lastUpdate
    this.LastUpdate = now
    this.elapsedTimeBeforeNextStep += deltaTime
    if (this.elapsedTimeBeforeNextStep > this.fixedStep) {
      this.elapsedTimeBeforeNextStep = 0
      this.render(deltaTime)
      this.update(deltaTime)
    }

    requestAnimationFrame(this.loop)
  };

  update (deltaTime) {
    this.layers.forEach(layer => {
      layer.update(deltaTime)
    })
  };

  render (deltaTime) {
    this.layers.forEach(layer => {
      layer.context.clearRect(0, 0, this.settings.bounds.w, this.settings.bounds.h)
      layer.render(deltaTime)
    })
  };
};

module.exports = App
