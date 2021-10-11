class TextElement extends Component
{
  constructor(context, text, x, y, style = {
    fillStyle: 'black',
    font: '16px courier',
    textBaseline: 'top',
    textAlign: 'left'
  }) {
    super();
    this.context = context;
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = style;
  };

  update(deltaTime) {

  };

  render(context, deltaTime) {
    context.fillStyle = this.style.fillStyle;
    context.font = this.style.font;
    context.textBaseline = this.style.textBaseline;
    context.textAlign = this.style.textAlign;
    context.fillText(this.text, this.x, this.y);
  };

};