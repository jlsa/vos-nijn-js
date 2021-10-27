const UiComponent = require('./ui-component')

class TextElement extends UiComponent {
  constructor (text, x, y, style = {
    fillStyle: 'white',
    font: '16px courier',
    baseline: 'top',
    align: 'left'
  }) {
    super(x, y)
    this.text = text
    this.x = x
    this.y = y
    this.style = style
  };

  set Text (text) {
    this.text = text
  };

  get Text () {
    return this.text
  };

  update (deltaTime) {

  };

  render (context, deltaTime) {
    if (this.active) {
      context.save()

      context.font = this.style.font
      context.textBaseline = this.style.baseline
      context.textAlign = this.style.align

      // the background
      const width = context.measureText(this.text).width
      // console.log(width);
      context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      context.fillRect(this.x, this.y, width + 10, parseInt(this.style.font, 10) + 10)

      // the text itself
      context.fillStyle = this.style.fillStyle

      context.fillText(this.text, this.x + 5, this.y + 5)

      context.restore()
    }
  };
};

module.exports = TextElement
