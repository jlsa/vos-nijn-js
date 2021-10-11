class GrassActor extends Actor {
  constructor(field, startPosition, maxAge = 10) {
    super();
    this.active = true;
    this.field = field;
    this.position = startPosition;
    this.growthProbability = 1.0;
    this.age = 0;
    this.maxAge = maxAge;
    this.growAge = 0;
    this.growthSize = 4;
  };

  act(newActors) {
    console.log('grass leaf blowing in the wind.');
  };

  isActive() {
    return this.active;
  };
};