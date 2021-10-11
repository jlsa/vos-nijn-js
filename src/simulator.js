class Simulator extends Component {
  constructor() {
    super();
    this.board;
    this.actors = [];
  };

  addBoard(board) {
    this.board = board;
    board.init();
  };

  render(context, deltaTime) {
    this.board.render(context, deltaTime);
  };

  update(deltaTime) {
    this.actors.forEach(actor => {
      let newActors = [];
      actor.act(newActors);
    });

    this.board.update(deltaTime);
  };
};