class Card {
  constructor(args) {
    const {
      // "colossus"
      title,

      // "by the white wolf."
      description,

      // <url>
      backgroundImage,

      // ["x-man"]
      attributes,

      // "hero"
      type,

      // <url>
      icon,

      // "colossus"
      setName,

      // "1"
      setPosition,
    } = args;

    this.title = title;
    this.description = description;
    this.backgroundImage = backgroundImage;
    this.attributes = attributes;
    this.type = type;
    this.icon = icon;
    this.setName = setName;
    this.setPosition = setPosition;
  }
}

module.exports = Card;
