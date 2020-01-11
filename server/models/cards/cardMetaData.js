const Model = require('..');

class CardMetaData extends Model {
  constructor(args) {
    super(args);

    const {
      author,
      illustrator,
      deckUrl,
    } = args;

    this.author = Model.string(author);
    this.illustrator = Model.string(illustrator);
    this.deckUrl = Model.string(deckUrl);
  }
}

module.exports = CardMetaData;
