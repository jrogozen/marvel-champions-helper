const BaseCard = require('../baseCard');

class MarvelHeroCard extends BaseCard {
  constructor(args) {
    super(args);

    const {
      atk,
      attributes,
      backgroundImagePath,
      def,
      effect,
      flavorText,
      handSize,
      heroImagePath,
      hitPoints,
      primaryColor,
      secondaryColor,
      setName,
      splashColor,
      splashIconPath,
      tertiaryColor,
      thw,
      title,
    } = args;

    this.setName = String(setName);
    this.title = String(title);
    this.media = {
      backgroundImagePath: String(backgroundImagePath),
      heroImagePath: String(heroImagePath),
      splashIconPath: String(splashIconPath),
    };
    this.colors = {
      primary: String(primaryColor),
      secondary: String(secondaryColor),
      splashColor: String(splashColor),
      tertiaryColor: String(tertiaryColor),
    };
    this.stats = {
      atk: Number(atk),
      def: Number(def),
      handSize: Number(handSize),
      hitPoints: Number(hitPoints),
      thw: Number(thw),
    };
    this.text = {
      attributes: String(attributes),
      effect: String(effect),
      flavorText: String(flavorText),
    };
  }
}

module.exports = MarvelHeroCard;
