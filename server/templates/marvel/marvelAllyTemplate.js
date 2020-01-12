const appRootDir = require('app-root-dir');
const path = require('path');

const Canvas = require('../../utils/canvas');
const MarvelBaseTemplate = require('./marvelBaseTemplate');

class MarvelAllyTemplate extends MarvelBaseTemplate {
  constructor(args) {
    super({
      ...args,
      templateImages: {
        bottom: {
          height: 442,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/ally_template_bottom.png'),
          width: 750,
        },
        splash: {
          height: 233,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/hero_template_splash.png'),
          width: 230,
        },
        top: {
          height: 608,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/ally_template_top.png'),
          width: 750,
        },
      },
      width: 750,
      height: 1050,
    });
  }

  drawBottomOverlay() {
    const {
      canvas,
      card,
      width,
    } = this;

    // fancier overlay
    if (card.belongsToHero) {
      canvas.fillRect({
        fillStyle: card.colors.secondary,
        height: 297,
        width: 600,
        x: 170,
        y: 753,
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
        fillStyle: card.colors.primary,
        height: 150,
        width: 200,
        x: 0,
        y: 750,
      });

      canvas.fillRect({
        fillStyle: card.colors.tertiary,
        height: 200,
        rotationDegree: 24,
        width: 22,
        x: 185,
        y: 867,
      });
    } else {
      // is just single color
      canvas.fillRect({
        fillStyle: card.colors.primary,
        height: 297,
        width,
        x: 0,
        y: 753,
      });
    }
  }

  drawHeaderBoxBorders() {
    const { canvas, card } = this;
    const { ctx } = canvas;
    const topLineY = 34;
    const topLeftCornerX = 142;
    const topRightCornerX = 745;
    const bottomLeftCornerX = 122;
    const bottomLeftCornerY = 129;

    ctx.lineWidth = 4;

    // write left
    ctx.strokeStyle = card.colors.primary;
    ctx.beginPath();

    // top left corner to top divider
    ctx.moveTo(topLeftCornerX, topLineY);
    ctx.lineTo(504, topLineY);
    ctx.stroke();

    // // top left corner to bottom left corner
    ctx.moveTo(topLeftCornerX, topLineY);
    ctx.lineTo(bottomLeftCornerX, bottomLeftCornerY);
    ctx.stroke();

    // // bottom left corner to bottom divider
    ctx.moveTo(bottomLeftCornerX - 1, bottomLeftCornerY - 1);
    ctx.lineTo(466, bottomLeftCornerY - 1);
    ctx.stroke();
    ctx.closePath();

    // // write divider
    ctx.strokeStyle = card.colors.tertiary;
    ctx.beginPath();

    // // top divider
    ctx.moveTo(505, topLineY);
    ctx.lineTo(527, topLineY);
    ctx.stroke();

    // // bottom divider
    ctx.moveTo(467, bottomLeftCornerY - 1);
    ctx.lineTo(489, bottomLeftCornerY - 1);
    ctx.stroke();
    ctx.closePath();

    // // write right
    ctx.strokeStyle = card.colors.secondary;
    ctx.beginPath();

    // // top divider to top right
    ctx.moveTo(528, topLineY);
    ctx.lineTo(topRightCornerX, topLineY);
    ctx.stroke();

    // // top right corner to bottom right corner
    ctx.moveTo(topRightCornerX - 1, topLineY);
    ctx.lineTo(730, bottomLeftCornerY - 1);
    ctx.stroke();

    // // bottom right corner to bottom divider
    ctx.moveTo(730, bottomLeftCornerY - 1);
    ctx.lineTo(489, bottomLeftCornerY - 1);
    ctx.stroke();
    ctx.closePath();
  }

  async drawHeroImage() {
    const {
      canvas,
      card,
      height,
      width,
    } = this;

    if (card.media.heroImagePath) {
      await canvas.insertImage({
        height,
        path: card.media.allyImagePath,
        width,
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

    const thwDimensions = {
      x: 90,
      y: 285,
    };
    const atkDimensions = {
      x: 90,
      y: 490,
    };

    // draw shadows
    ctx.fillStyle = 'black';
    ctx.fillText(thw, thwDimensions.x + shadowXDiff, thwDimensions.y + shadowYDiff);
    ctx.fillText(atk, atkDimensions.x + shadowXDiff, atkDimensions.y + shadowYDiff);


    // draw text
    ctx.fillStyle = 'white';
    ctx.strokeText(thw, thwDimensions.x, thwDimensions.y);
    ctx.fillText(thw, thwDimensions.x, thwDimensions.y);
    ctx.strokeText(atk, atkDimensions.x, atkDimensions.y);
    ctx.fillText(atk, atkDimensions.x, atkDimensions.y);
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

    const attributesString = `${card.text.attributes.split(',').join('. ')}.`;

    ctx.font = '33px "Comic Book"';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(attributesString, 372, 733);
  }

  async drawTitle() {
    const {
      card,
      canvas,
      templateImages,
    } = this;
    const { ctx } = canvas;

    const firstLetterFont = '60px "Iron & Brine"';
    const remainingLettersFont = '44px "Iron & Brine"';
    const subtitleFont = '22px "Iron & Brine"';
    const formattedTitle = card.title.toUpperCase();
    const distanceBetweenSymbolAndFirstLetter = 5;

    ctx.font = firstLetterFont;
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';

    const firstLetterDimensions = ctx.measureText(formattedTitle.substring(0, 1));

    ctx.font = remainingLettersFont;

    const restOfTitleDimensions = ctx.measureText(formattedTitle.substring(1));
    const totalWidth = firstLetterDimensions.width
      + restOfTitleDimensions.width
      + templateImages.symbols.unique.width
      + distanceBetweenSymbolAndFirstLetter;

    // middle point of headerbox
    // bottom left corner and top right corner X of headerBox
    const middlePoint = 122 + ((745 - 122) / 2);
    const leftX = middlePoint - (totalWidth / 2);
    const leftXforLetters = leftX
      + templateImages.symbols.unique.width
      + distanceBetweenSymbolAndFirstLetter;

    // draw first char
    ctx.font = firstLetterFont;
    ctx.fillText(
      formattedTitle.substring(0, 1),
      leftXforLetters,
      89,
    );

    // draw rest
    ctx.font = remainingLettersFont;
    ctx.fillText(
      formattedTitle.substring(1),
      leftXforLetters + firstLetterDimensions.width - 2,
      89,
    );

    // draw subtitle
    if (card.subtitle) {
      ctx.font = subtitleFont;
      ctx.textAlign = 'center';
      const subtitleY = 89 + 26;
      ctx.fillText(
        card.subtitle,
        middlePoint,
        subtitleY,
      );
    }

    await canvas.insertImage({
      height: 37,
      path: templateImages.symbols.unique.path,
      width: templateImages.symbols.unique.width,
      x: leftX,
      y: 50,
    });
  }

  /**
  todo: consequential damage
   */

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

    // const heightOfEffectText = this.canvas.fillMultiLineText({
    //   fillStyle: 'black',
    //   font: '33px "Blue Highway"',
    //   maxWidth: 775,
    //   startX: 100,
    //   startY: 800,
    //   text: this.card.text.effect.split(' '),
    // });

    // this.drawHeroBoxBorders();
    // this.drawHandSizeAndHitpoints();
    // this.drawAuthor();
    // this.drawFlavorText(heightOfEffectText);
    // await this.drawSplash();
  }
}

module.exports = MarvelAllyTemplate;