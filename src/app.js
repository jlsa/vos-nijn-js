const Simulator = require('./simulator');
const Board = require('./board');
const Layer = require('./layer');
const Gui = require('./gui');
const entities = require('./entities');
const TextElement = require('./ui-elements/text-element');

class App {
  constructor () {
    this.lastUpdate = Date.now();
    this.fixedStep = 100;
    this.elapsedTimeBeforeNextStep = 0;

    this.loop = this.loop.bind(this);
    this.settings = {
      bounds: { w: 1000, h: 1000 },
      fieldSize: { w: 2, h: 2 },
      boardSize: { rows: 500, cols: 500 }
    };
    this.layers = [];
    this.simulator;
    this.gui;
  };

  init() {

    const parentNode = document.getElementById('layers');
    parentNode.style.width = this.settings.bounds.w;
    parentNode.style.height = this.settings.bounds.h;
    let layerNames = ['bg-layer', 'game-layer', 'ui-layer'];
    layerNames.forEach(layerName => {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width', this.settings.bounds.w);
        canvas.setAttribute('height', this.settings.bounds.h);
        canvas.classList.add('layer');
        parentNode.appendChild(canvas);
        canvas.offscreenCanvas = document.createElement('canvas');
        canvas.offscreenCanvas.width = canvas.getAttribute('width');
        canvas.offscreenCanvas.height = canvas.getAttribute('height');
        let context = canvas.getContext('2d');

        this.layers[this.layers.length] = new Layer(canvas, context);;
    });

    this.simulator = new Simulator();
    this.layers[1].addChild(this.simulator);
    this.simulator.addBoard(new Board(this.settings.boardSize.rows, this.settings.boardSize.cols, this.fieldSize));

    this.gui = new Gui();
    this.layers[2].addChild(this.gui);

    // entities.forEach((entity, index) => {
    //   // const newElement = new TextElement();
    //   const textElement = new TextElement(
    //     `${entity.name}: 0`,
    //     10,
    //     10 + index * 26
    //   );
    //   this.gui.add(textElement);
    // });
  };

  start () {
    requestAnimationFrame(this.loop);
  };

  set LastUpdate (lastUpdate) {
    this.lastUpdate = lastUpdate;
  };

  get LastUpdate () {
    return this.lastUpdate;
  };

  loop () {
    const now = Date.now();
    const deltaTime = now - this.lastUpdate;
    this.LastUpdate = now;
    this.elapsedTimeBeforeNextStep += deltaTime;
    if (this.elapsedTimeBeforeNextStep > this.fixedStep) {
      this.elapsedTimeBeforeNextStep = 0;
      this.update(deltaTime);
      this.render(deltaTime);

    }

    requestAnimationFrame(this.loop);
  };

  update (deltaTime) {
    this.layers.forEach(layer => {
      layer.update(deltaTime);
    });
  };

  render (deltaTime) {
    this.layers.forEach(layer => {
      layer.context.clearRect(0, 0, this.settings.bounds.w, this.settings.bounds.h);
      layer.render(deltaTime);
    });
  };
};

module.exports = App
