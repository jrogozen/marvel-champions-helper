const Card = require('./card');

class Hero extends Card {
  constructor(args) {
    super(args);

    const {
      atk,
      thw,
      def,
      effect,
      handSize,
      hitPoints,
    } = args;

    this.atk = atk;
    this.thw = thw;
    this.def = def;
    this.effect = effect;
    this.handSize = handSize;
    this.hitPoints = hitPoints;
  }
}

module.exports = Hero;
