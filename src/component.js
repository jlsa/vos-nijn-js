class Component {
  constructor() {
    if (new.target === Component) {
      throw new TypeError('Unable to constuct Component instances directly');
    }
  };

  render(context, deltaTime) {};
  update(deltaTime) {};
};