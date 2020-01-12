const BaseCard = require('../baseCard');

class MarvelAllyCard extends BaseCard {
  constructor(args) {
    super(args);

    const {
      allyImagePath,
      atk,
      atkConsequence,
      attributes,
      backgroundImagePath,
      cost,
      effect,
      flavorText,
      health,
      primaryColor,
      resourceCount,
      resourceType,
      secondaryColor,

      // can be leadership/protection/aggression/justice/core OR belong to a hero
      setName,
      setPosition,
      splashColor,
      splashIconPath,
      subtitle,
      tertiaryColor,
      thw,
      thwConsequence,
      title,
    } = args;

    this.type = MarvelAllyCard.TYPE;
    this.setName = BaseCard.string(setName);
    this.setPosition = BaseCard.string(setPosition);
    this.title = BaseCard.string(title);
    this.subtitle = BaseCard.string(subtitle);
    this.belongsToHero = this.shouldBelongToHero();
    this.media = {
      backgroundImagePath: BaseCard.string(backgroundImagePath),
      allyImagePath: BaseCard.string(allyImagePath),
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
      atkConsequence: BaseCard.number(atkConsequence),
      cost: BaseCard.number(cost),
      health: BaseCard.number(health),
      resourceCount: BaseCard.number(resourceCount),
      resourceType: BaseCard.string(resourceType),
      thw: BaseCard.number(thw),
      thwConsequence: BaseCard.number(thwConsequence),
    };
    this.text = {
      attributes: BaseCard.string(attributes),
      effect: BaseCard.string(effect),
      flavorText: BaseCard.string(flavorText),
    };
    this.setColors();
  }

  shouldBelongToHero() {
    const { setName } = this;

    if (
      setName === 'justice'
      || setName === 'protection'
      || setName === 'basic'
      || setName === 'aggression'
      || setName === 'leadership') {
      return false;
    }

    return true;
  }

  setColors() {
    const {
      belongsToHero,
      setName,
    } = this;

    if (belongsToHero) {
      return;
    }

    if (setName === 'leadership') {
      this.colors.primary = '#69b6ca';
      this.colors.secondary = '#69b6ca';
      this.colors.tertiary = '#69b6ca';
    } else if (setName === 'justice') {
      this.colors.primary = '#a89b40';
      this.colors.secondary = '#a89b40';
      this.colors.tertiary = '#a89b40';
    } else if (setName === 'protection') {
      this.colors.primary = '#7db455';
      this.colors.secondary = '#7db455';
      this.colors.tertiary = '#7db455';
    } else if (setName === 'aggression') {
      this.colors.primary = '#923130';
      this.colors.secondary = '#923130';
      this.colors.tertiary = '#923130';
    } else {
      this.colors.primary = '#a0a0a0';
      this.colors.secondary = '#a0a0a0';
      this.colors.tertiary = '#a0a0a0';
    }
  }
}

MarvelAllyCard.TYPE = 'MARVEL_ALLY_CARD';

module.exports = MarvelAllyCard;
