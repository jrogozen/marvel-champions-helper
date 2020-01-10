class Card {
  constructor(args) {
    const {
      title,

      // "by the white wolf."
      flavorText,

      // <url>
      backgroundImagePath,

      // ["x-man"]
      attributes = '',

      // "hero"
      type,

      // "colossus"
      setName,

      // "1"
      setPosition,

      primaryColor,
      secondaryColor,
      tertiaryColor,
      author,
    } = args;

    // todo: apply sanitization on strings
    this.title = String(title);
    this.flavorText = String(flavorText);
    this.backgroundImagePath = String(backgroundImagePath);
    this.attributes = String(attributes).split(',');
    this.type = String(type);
    this.setName = String(setName);
    this.setPosition = String(setPosition);
    this.primaryColor = String(primaryColor);
    this.secondaryColor = String(secondaryColor);
    this.tertiaryColor = String(tertiaryColor);
    this.author = String(author);
  }
}

module.exports = Card;
