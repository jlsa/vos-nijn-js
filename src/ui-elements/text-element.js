const Component = require('../component');

class TextElement extends Component
{
  constructor(text, x, y, style = {
    fillStyle: 'white',
    font: '16px courier',
    baseline: 'top',
    align: 'left'
  }) {
    super();
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = style;
    this.uuid = crypto.randomUUID();
  };

  set Text(text) {
    this.text = text;
  };

  update(deltaTime) {

  };

  render(context, deltaTime) {
    context.save();

    context.font = this.style.font;
    context.textBaseline = this.style.baseline;
    context.textAlign = this.style.align;

    // the background
    let width = context.measureText(this.text).width;
    // console.log(width);
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillRect(this.x, this.y, width + 10, parseInt(this.style.font, 10) + 10);

    // the text itself
    context.fillStyle = this.style.fillStyle;

    context.fillText(this.text, this.x + 5, this.y + 5);

    context.restore();
  };

};

module.exports = TextElement;