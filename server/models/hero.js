const Card = require('./card');

class Hero extends Card {
  constructor(args) {
    super(args);

    const {
      atk,
      thw,
      def,
      ability,
      handSize,
      hitPoints,
    } = args;

    this.atk = atk;
    this.thw = thw;
    this.def = def;
    this.ability = ability;
    this.handSize = handSize;
    this.hitPoints = hitPoints;
  }
}

module.exports = Hero;
