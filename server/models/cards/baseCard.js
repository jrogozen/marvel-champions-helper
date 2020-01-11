const CardMetaData = require('./cardMetaData');
const Model = require('..');

class BaseCard extends Model {
  constructor(args) {
    super(args);

    const {
      title,
      type,
      author,
      illustrator,
      deckUrl,
    } = args;

    this.title = String(title);
    this.type = String(type);
    this.meta = new CardMetaData({
      author,
      illustrator,
      deckUrl,
    });
  }
}

module.exports = BaseCard;
