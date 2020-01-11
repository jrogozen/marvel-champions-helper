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

    this.type = MarvelHeroCard.TYPE;
    this.setName = BaseCard.string(setName);
    this.title = BaseCard.string(title);
    this.media = {
      backgroundImagePath: BaseCard.string(backgroundImagePath),
      heroImagePath: BaseCard.string(heroImagePath),
      splashIconPath: BaseCard.string(splashIconPath),
    };
    this.colors = {
      primary: BaseCard.string(primaryColor),
      secondary: BaseCard.string(secondaryColor),
      splash: BaseCard.string(splashColor),
      tertiary: BaseCard.string(tertiaryColor),
    };
    this.stats = {
      atk: BaseCard.number(atk),
      def: BaseCard.number(def),
      handSize: BaseCard.number(handSize),
      hitPoints: BaseCard.number(hitPoints),
      thw: BaseCard.number(thw),
    };
    this.text = {
      attributes: BaseCard.string(attributes),
      effect: BaseCard.string(effect),
      flavorText: BaseCard.string(flavorText),
    };
  }
}

MarvelHeroCard.TYPE = 'MARVEL_HERO_CARD';

module.exports = MarvelHeroCard;
