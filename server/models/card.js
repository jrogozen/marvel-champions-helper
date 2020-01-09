class Card {
  constructor(args) {
    const {
      // "colossus"
      title,

      // "by the white wolf."
      description,

      // <url>
      backgroundImagePath,

      // ["x-man"]
      attributes = '',

      // "hero"
      type,

      // <url>
      iconPath,

      // "colossus"
      setName,

      // "1"
      setPosition,

      primaryColor,
      secondaryColor,
      tertiaryColor,
    } = args;

    // todo: apply sanitization on strings
    this.title = String(title);
    this.description = String(description);
    this.backgroundImagePath = String(backgroundImagePath);
    this.attributes = String(attributes).split(',');
    this.type = String(type);
    this.iconPath = String(iconPath);
    this.setName = String(setName);
    this.setPosition = String(setPosition);
    this.primaryColor = String(primaryColor);
    this.secondaryColor = String(secondaryColor);
    this.tertiaryColor = String(tertiaryColor);
  }
}

module.exports = Card;
