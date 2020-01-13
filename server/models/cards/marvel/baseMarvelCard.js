const BaseCard = require('../baseCard');

class BaseMarvelCard extends BaseCard {
  constructor(args) {
    super(args);

    const {
      primaryColor,
      secondaryColor,
      setName,
      setPosition,
      splashColor,
      tertiaryColor,
      title,
    } = args;

    this.title = BaseMarvelCard.string(title);
    this.setName = BaseMarvelCard.string(setName);
    this.setPosition = BaseMarvelCard.string(setPosition);
    this.belongsToHero = this.shouldBelongToHero();
    this.colors = {
      primary: BaseMarvelCard.string(primaryColor),
      secondary: BaseMarvelCard.string(secondaryColor),
      splash: BaseMarvelCard.string(splashColor),
      tertiary: BaseMarvelCard.string(tertiaryColor),
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

module.exports = BaseMarvelCard;
