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

  async drawSplash() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    if (!card.media.splashIconPath) {
      return;
    }

    ctx.fillStyle = card.colors.splash || card.colors.primary;

    // background
    ctx.beginPath();
    ctx.moveTo(657 + 15, 1050 + 15);
    ctx.lineTo(648 + 15, 1040 + 15);
    ctx.lineTo(630 + 15, 1026 + 15);
    ctx.lineTo(650 + 15, 1010 + 15);
    ctx.lineTo(652 + 15, 1000 + 15);
    ctx.lineTo(638 + 15, 965 + 15);
    ctx.lineTo(666 + 15, 965 + 15);
    ctx.lineTo(677 + 15, 952 + 15);
    ctx.lineTo(676 + 15, 924 + 15);
    ctx.lineTo(696 + 15, 939 + 15);
    ctx.lineTo(708 + 15, 939 + 15);
    ctx.lineTo(729 + 15, 920 + 15);
    ctx.lineTo(750 + 15, 938 + 15);
    ctx.lineTo(750 + 15, 1050 + 15);
    ctx.lineTo(657 + 15, 1050 + 15);
    ctx.fill();
    ctx.closePath();

    // outline
    await canvas.insertImage({
      height: 233,
      path: this.templateImages.splash.path,
      width: 230,
      x: 624 + 15,
      y: 912 + 15,
    });

    // icon
    const { image, dimensions } = await Canvas.getImageWithDimensions(card.media.splashIconPath);
    const modifiedDimensions = Canvas.getModifiedDimensions({
      dimensions,
      maxWidth: 90,
      maxHeight: 100,
    });

    const middleXofSplashBg = 704;
    const middleYofSplashBg = 1000;
    const leftX = middleXofSplashBg - (modifiedDimensions.width / 2);
    const leftY = middleYofSplashBg - (modifiedDimensions.height / 2);

    await canvas.drawBuffer({
      buffer: image,
      height: modifiedDimensions.height,
      width: modifiedDimensions.width,
      x: leftX,
      y: leftY,
    });
  }
}

module.exports = MarvelBaseTemplate;
