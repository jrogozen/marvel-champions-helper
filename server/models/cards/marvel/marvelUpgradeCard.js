const BaseMarvelCard = require('./baseMarvelCard');

class MarvelUpgradeCard extends BaseMarvelCard {
  constructor(args) {
    super(args);

    const {
      attributes,
      backgroundImagePath,
      cost,
      effect,
      flavorText,
      primaryColor,
      resources = '',
      secondaryColor,
      splashColor,
      splashIconPath,
      tertiaryColor,
      title,
    } = args;

    this.type = MarvelUpgradeCard.TYPE;
    this.title = MarvelUpgradeCard.string(title);
    this.media = {
      backgroundImagePath: MarvelUpgradeCard.string(backgroundImagePath),
      splashIconPath: MarvelUpgradeCard.string(splashIconPath),
    };
    this.colors = {
      primary: MarvelUpgradeCard.string(primaryColor),
      secondary: MarvelUpgradeCard.string(secondaryColor),
      splash: MarvelUpgradeCard.string(splashColor),
      tertiary: MarvelUpgradeCard.string(tertiaryColor),
    };
    this.stats = {
      cost: MarvelUpgradeCard.number(cost),
      resources: resources.split(',').map((resource) => {
        const resourceAndType = resource.split('=');
        return {
          type: resourceAndType[0],
          count: resourceAndType[1],
        };
      }),
    };
    this.text = {
      attributes: MarvelUpgradeCard.string(attributes),
      effect: MarvelUpgradeCard.string(effect),
      flavorText: MarvelUpgradeCard.string(flavorText),
    };
    this.setColors();
  }
}

MarvelUpgradeCard.TYPE = 'MARVEL_UPGGRADE_CARD';

module.exports = MarvelUpgradeCard;
