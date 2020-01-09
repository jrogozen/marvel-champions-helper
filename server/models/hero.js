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
      heroImagePath,
    } = args;

    // todo: apply sanitization on strings
    this.atk = Number(atk);
    this.thw = Number(thw);
    this.def = Number(def);
    this.effect = String(effect);
    this.handSize = Number(handSize);
    this.hitPoints = Number(hitPoints);
    this.heroImagePath = String(heroImagePath);
  }
}

module.exports = Hero;
