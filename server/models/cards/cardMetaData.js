const Model = require('..');

class CardMetaData extends Model {
  constructor(args) {
    super(args);

    const {
      author,
      illustrator,
      deckUrl,
    } = args;

    this.author = String(author);
    this.illustrator = String(illustrator);
    this.deckUrl = String(deckUrl);
  }
}

module.exports = CardMetaData;
