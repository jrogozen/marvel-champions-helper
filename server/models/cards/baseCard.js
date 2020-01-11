const CardMetaData = require('./cardMetaData');
const Model = require('..');

class BaseCard extends Model {
  constructor(args) {
    super(args);

    const {
      title,
      author = 'decktool.app',
      illustrator,
      deckUrl,
    } = args;

    this.title = Model.string(title);
    this.meta = new CardMetaData({
      author,
      illustrator,
      deckUrl,
    });
  }
}

module.exports = BaseCard;
