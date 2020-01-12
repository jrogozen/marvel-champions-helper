const appRootDir = require('app-root-dir');
const path = require('path');

const Canvas = require('../../utils/canvas');
const MarvelBaseTemplate = require('./marvelBaseTemplate');

class MarvelHeroTemplate extends MarvelBaseTemplate {
  constructor(args) {
    super({
      ...args,
      templateImages: {
        bottom: {
          height: 415,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/hero_template_bottom.png'),
          width: 750,
        },
        splash: {
          height: 233,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/hero_template_splash.png'),
          width: 230,
        },
        top: {
          height: 635,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/hero_template_top.png'),
          width: 750,
        },
      },
      width: 750,
      height: 1050,
    });
  }

  drawBottomOverlay() {
    const { canvas, card } = this;

    canvas.fillRect({
      fillStyle: card.colors.secondary,
      height: 250,
      rotationDegree: -28,
      width: 775,
      x: 130,
      y: 958,
    });

    canvas.fillRect({
      fillStyle: card.colors.secondary,
      height: 50,
      width: 300,
      x: 175,
      y: 1000,
    });

    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 200,
      rotationDegree: 24,
      width: 225,
      x: -52,
      y: 867,
    });

    canvas.fillRect({
      fillStyle: card.colors.tertiary,
      height: 200,
      rotationDegree: 24,
      width: 22,
      x: 185,
      y: 867,
    });
  }

  async drawTitle() {
    const {
      card,
      canvas,
      templateImages,
    } = this;
    const { ctx } = canvas;

    const formattedTitle = card.title.toUpperCase();

    ctx.font = '60px "Iron & Brine"';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(formattedTitle, 375, 89);

    const titleTextDimensions = ctx.measureText(formattedTitle);

    const leftPositionOfTitle = 375 - (titleTextDimensions.width / 2);
    const symbolUniqueWidth = 30;
    const leftPositionOfSymbolUnique = leftPositionOfTitle - symbolUniqueWidth - 17;

    await canvas.insertImage({
      height: 37,
      path: templateImages.symbols.unique.path,
      width: 29,
      x: leftPositionOfSymbolUnique,
      y: 50,
    });
  }

  drawHeaderBoxBorders() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.lineWidth = 4;

    // write left
    // top left corner to top divider
    ctx.strokeStyle = card.colors.primary;
    ctx.beginPath();

    ctx.moveTo(30, 33);
    ctx.lineTo(523, 33);
    ctx.stroke();

    // top left corner to bottom left corner
    ctx.moveTo(30, 33);
    ctx.lineTo(40, 107);
    ctx.stroke();

    // bottom left corner to bottom divider
    ctx.moveTo(40, 105);
    ctx.lineTo(495, 104);
    ctx.stroke();
    ctx.closePath();

    // write divider
    ctx.strokeStyle = card.colors.tertiary;
    ctx.beginPath();

    // top divider
    ctx.moveTo(523, 33);
    ctx.lineTo(550, 34);
    ctx.stroke();

    // bottom divider
    ctx.moveTo(495, 104);
    ctx.lineTo(522, 104);
    ctx.stroke();
    ctx.closePath();

    // write right
    ctx.strokeStyle = card.colors.secondary;
    ctx.beginPath();

    // top divider to top right
    ctx.moveTo(550, 34);
    ctx.lineTo(719, 34);
    ctx.stroke();

    // top right corner to bottom right corner
    ctx.moveTo(718, 34);
    ctx.lineTo(709, 105);
    ctx.stroke();

    // bottom right corner to bottom divider
    ctx.moveTo(709, 105);
    ctx.lineTo(522, 104);
    ctx.stroke();

    ctx.closePath();
  }

  async drawHeroImage() {
    const {
      canvas,
      card,
    } = this;

    if (card.media.heroImagePath) {
      await canvas.insertImage({
        height: this.height,
        path: card.media.heroImagePath,
        width: this.width,
        x: 0,
        y: 0,
      });
    }
  }

  drawStats() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.font = '68px "Comic Book"';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;

    const shadowXDiff = 6;
    const shadowYDiff = 5;

    const thw = MarvelBaseTemplate.formatStatValue(card.stats.thw);
    const atk = MarvelBaseTemplate.formatStatValue(card.stats.atk);
    const def = MarvelBaseTemplate.formatStatValue(card.stats.def);

    const thwDimensions = {
      x: 75,
      y: 238,
    };
    const atkDimensions = {
      x: 75,
      y: 405,
    };
    const defDimensions = {
      x: 75,
      y: 570,
    };

    // draw shadows
    ctx.fillStyle = 'black';
    ctx.fillText(thw, thwDimensions.x + shadowXDiff, thwDimensions.y + shadowYDiff);
    ctx.fillText(atk, atkDimensions.x + shadowXDiff, atkDimensions.y + shadowYDiff);
    ctx.fillText(def, defDimensions.x + shadowXDiff, defDimensions.y + shadowYDiff);


    // draw text
    ctx.fillStyle = 'white';
    ctx.strokeText(thw, thwDimensions.x, thwDimensions.y);
    ctx.fillText(thw, thwDimensions.x, thwDimensions.y);
    ctx.strokeText(atk, atkDimensions.x, atkDimensions.y);
    ctx.fillText(atk, atkDimensions.x, atkDimensions.y);
    ctx.strokeText(def, defDimensions.x, defDimensions.y);
    ctx.fillText(def, defDimensions.x, defDimensions.y);
  }

  drawAttributes() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    if (!card.text.attributes) {
      return;
    }

    const formattedAttributes = card.text.attributes.split(',').map((attr) => {
      const str = [];

      let prev = '';

      for (let i = 0; i < attr.length; i++) {
        if (prev === '' || prev === ' ') {
          str.push(attr[i].toUpperCase());
        } else {
          str.push(attr[i]);
        }

        prev = attr[i];
      }

      return str.join('');
    });
    const attributesString = `${formattedAttributes.join('. ')}.`;

    ctx.font = '33px "Comic Book"';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(attributesString, 372, 733);
  }

  drawHeroBoxBorders() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.lineWidth = 6;

    // write left
    ctx.strokeStyle = card.colors.primary;
    ctx.beginPath();

    // [line] top left -> center divider
    ctx.moveTo(23, 692);
    ctx.lineTo(279, 692);
    ctx.stroke();

    // [corner] top left -> top of bottom
    ctx.moveTo(24, 692);
    ctx.lineTo(20, 698);
    ctx.stroke();

    // [line] top left -> bottom left
    ctx.moveTo(20, 698);
    ctx.lineTo(51, 988);
    ctx.stroke();

    // [corner] bottom left side -> bottom of left
    ctx.moveTo(51, 987);
    ctx.lineTo(57, 992);
    ctx.stroke();

    // [line] bottom left to center divider
    ctx.moveTo(56, 991);
    ctx.lineTo(158, 991);
    ctx.stroke();
    ctx.closePath();

    // write dividers
    ctx.strokeStyle = card.colors.tertiary;
    ctx.beginPath();

    // [line] divide bottom left and bottom right
    ctx.moveTo(157, 991);
    ctx.lineTo(184, 991);
    ctx.stroke();

    // [line] divider to right
    ctx.moveTo(279, 692);
    ctx.lineTo(304, 692);
    ctx.stroke();
    ctx.closePath();

    // write right
    ctx.strokeStyle = card.colors.secondary;
    ctx.beginPath();

    // [line] divider to right
    ctx.moveTo(304, 692);
    ctx.lineTo(724, 692);
    ctx.stroke();

    // [corner] top right to right
    ctx.moveTo(723, 692);
    ctx.lineTo(728, 695);
    ctx.stroke();

    // [line] top right to bottom right
    ctx.moveTo(728, 694);
    ctx.lineTo(697, 989);
    ctx.stroke();

    // [line] bottom left of bottom right to bottom right of right
    ctx.moveTo(185, 991);
    ctx.lineTo(692, 991);
    ctx.stroke();

    // [corner] bottom right corner
    ctx.moveTo(691, 991);
    ctx.lineTo(697, 988);
    ctx.stroke();
    ctx.closePath();
  }

  drawHandSizeAndHitpoints() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.font = '26.3px "Big Noodle Titling"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';

    ctx.fillText(`HAND SIZE ${card.stats.handSize} / HIT POINTS ${card.stats.hitPoints}`, 34, 1023);
  }

  drawAuthor() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.font = '18.75px "Bravo SC"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';

    ctx.fillText(card.meta.author, 225, 1045);
  }

  drawFlavorText(heightOfEffectText) {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.font = '23px "SF Wonder Comic Italic"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';

    ctx.fillText(`"${card.text.flavorText}"`, 100, heightOfEffectText + 792);
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
    ctx.moveTo(657, 1050);
    ctx.lineTo(648, 1040);
    ctx.lineTo(630, 1026);
    ctx.lineTo(650, 1010);
    ctx.lineTo(652, 1000);
    ctx.lineTo(638, 965);
    ctx.lineTo(666, 965);
    ctx.lineTo(677, 952);
    ctx.lineTo(676, 924);
    ctx.lineTo(696, 939);
    ctx.lineTo(708, 939);
    ctx.lineTo(729, 920);
    ctx.lineTo(750, 938);
    ctx.lineTo(750, 1050);
    ctx.lineTo(657, 1050);
    ctx.fill();
    ctx.closePath();

    // outline
    await canvas.insertImage({
      height: 233,
      path: this.templateImages.splash.path,
      width: 230,
      x: 624,
      y: 912,
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

  async draw() {
    await this.drawBackgroundImage();
    this.drawBottomOverlay();
    await this.drawTemplateTop();
    this.drawHeaderBoxBorders();
    await this.drawHeroImage();
    await this.drawTemplateBottom();
    this.drawStats();
    this.drawAttributes();
    await this.drawTitle();

    const heightOfEffectText = this.canvas.fillMultiLineText({
      fillStyle: 'black',
      font: '33px "Blue Highway"',
      maxWidth: 775,
      startX: 100,
      startY: 800,
      text: this.card.text.effect.split(' '),
    });

    this.drawHeroBoxBorders();
    this.drawHandSizeAndHitpoints();
    this.drawAuthor();
    this.drawFlavorText(heightOfEffectText);
    await this.drawSplash();
  }
}

module.exports = MarvelHeroTemplate;
