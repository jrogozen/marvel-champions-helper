const appRootDir = require('app-root-dir');
const merge = require('lodash/merge');
const path = require('path');

const Canvas = require('../../utils/canvas');

class MarvelBaseTemplate {
  constructor(args) {
    const {
      card,
      height,
      templateImages,
      width,
    } = args;

    this.card = card;
    this.width = width;
    this.height = height;
    this.canvas = new Canvas({ width: this.width, height: this.height });
    this.templateImages = merge(templateImages, {
      symbols: {
        unique: {
          height: 37,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images', 'symbol_unique.png'),
          width: 29,
        },
      },
    });
  }

  static formatStatValue(num) {
    const str = String(num);

    return str.replace(/0/g, 'o');
  }

  async drawBackgroundImage() {
    const {
      card,
      canvas,
    } = this;

    if (card.media.backgroundImagePath) {
      await canvas.insertImage({
        path: card.media.backgroundImagePath,
        x: 0,
        y: 0,
      });
    }
  }

  async drawTemplateTop() {
    const {
      canvas,
      templateImages,
    } = this;

    await canvas.insertImage({
      height: templateImages.top.height,
      path: templateImages.top.path,
      width: templateImages.top.width,
      x: 0,
      y: 0,
    });
  }

  async drawTemplateBottom() {
    const {
      canvas,
      templateImages,
    } = this;

    await canvas.insertImage({
      height: templateImages.bottom.height,
      path: templateImages.bottom.path,
      width: templateImages.bottom.width,
      x: 0,
      y: templateImages.top.height,
    });
  }
}

module.exports = MarvelBaseTemplate;
