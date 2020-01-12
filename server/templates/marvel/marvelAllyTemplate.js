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


  drawTopOverlay() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.strokeStyle = card.colors.primary;
    ctx.lineWidth = 4;

    // draw cost background
    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 140,
      width: 140,
      x: 0,
      y: 0,
    });
    if (card.belongsToHero) {
      // left
      canvas.fillRect({
        fillStyle: card.colors.primary,
        height: 74,
        width: 372,
        x: 140,
        y: 0,
      });

      // left diagnal
      canvas.fillRect({
        fillStyle: card.colors.primary,
        height: 125,
        rotationDegree: 20,
        width: 20,
        x: 490,
        y: -10,
      });

      // divider
      canvas.fillRect({
        fillStyle: card.colors.tertiary,
        height: 125,
        rotationDegree: 20,
        width: 20,
        x: 510,
        y: -10,
      });

      // right
      canvas.fillRect({
        fillStyle: card.colors.secondary,
        height: 125,
        rotationDegree: 20,
        width: 20,
        x: 527,
        y: 0,
      });

      canvas.fillRect({
        fillStyle: card.colors.secondary,
        height: 74,
        width: 400,
        x: 550,
        y: 0,
      });
    } else {
      // left corner
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.moveTo(136, 30);
      ctx.lineTo(142, 0);
      ctx.stroke();
      ctx.lineTo(138, 30);
      ctx.stroke();
      ctx.closePath();

      // main rect
      canvas.fillRect({
        fillStyle: card.colors.primary,
        height: 74,
        width: 650,
        x: 140,
        y: 0,
      });
    }
  }

  drawHeaderBoxBorders() {
    const { canvas, card } = this;
    const { ctx } = canvas;
    const topLineY = 34;
    const topLeftCornerX = 142;
    const topRightCornerX = 718;
    const bottomLeftCornerX = 122;
    const bottomLeftCornerY = 129;

    ctx.lineWidth = 4;

    // write left
    ctx.beginPath();
    ctx.strokeStyle = card.colors.primary;

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
    ctx.beginPath();
    ctx.strokeStyle = card.colors.tertiary;

    // // top divider
    ctx.moveTo(504, topLineY);
    ctx.lineTo(528, topLineY);
    ctx.stroke();

    // // bottom divider
    ctx.moveTo(466, bottomLeftCornerY - 1);
    ctx.lineTo(490, bottomLeftCornerY - 1);
    ctx.stroke();
    ctx.closePath();

    // // write right
    ctx.beginPath();
    ctx.strokeStyle = card.colors.secondary;

    // // top divider to top right
    ctx.moveTo(528, topLineY);
    ctx.lineTo(topRightCornerX, topLineY);
    ctx.stroke();

    // // top right corner to bottom right corner
    ctx.moveTo(topRightCornerX - 1, topLineY);
    ctx.lineTo(706, bottomLeftCornerY - 1);
    ctx.stroke();

    // // bottom right corner to bottom divider
    ctx.moveTo(706, bottomLeftCornerY - 1);
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
    ctx.fillText(attributesString, 372, 700);
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
    const middlePoint = 122 + ((718 - 122) / 2);
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

  drawFlavorText(heightOfEffectText) {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;

    ctx.font = '23px "SF Wonder Comic Italic"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';

    canvas.fillMultiLineText({
      fillStyle: 'black',
      font: '23px "SF Wonder Comic Italic"',
      maxWidth: 600,
      startX: 100,
      startY: heightOfEffectText + 760,
      text: card.text.flavorText.split(' '),
    });
  }

  drawHeroBoxBorders() {
    const {
      canvas,
      card,
    } = this;
    const { ctx } = canvas;
    const topLeftCornerX = 20;
    const topLeftCornerY = 663;
    const bottomLeftCornerY = 988;

    ctx.lineWidth = 6;

    // write left
    ctx.beginPath();
    ctx.strokeStyle = card.colors.primary;

    // top left corner to top divider
    ctx.moveTo(topLeftCornerX + 4, topLeftCornerY - 2);
    ctx.lineTo(280, topLeftCornerY - 2);
    ctx.stroke();

    // top left corner
    ctx.moveTo(topLeftCornerX - 1, topLeftCornerY + 1);
    ctx.lineTo(topLeftCornerX + 2, topLeftCornerY - 2);
    ctx.stroke();
    ctx.moveTo(topLeftCornerX + 2, topLeftCornerY - 2);
    ctx.lineTo(topLeftCornerX + 3, topLeftCornerY - 3);
    ctx.stroke();
    ctx.moveTo(topLeftCornerX + 3, topLeftCornerY - 3);
    ctx.lineTo(topLeftCornerX + 4, topLeftCornerY - 2);
    ctx.stroke();

    // top left corner to bottom left corner
    ctx.moveTo(topLeftCornerX, topLeftCornerY);
    ctx.lineTo(topLeftCornerX, bottomLeftCornerY);
    ctx.stroke();

    // bottom left corner
    ctx.moveTo(topLeftCornerX - 1, bottomLeftCornerY - 1);
    ctx.lineTo(topLeftCornerX + 2, bottomLeftCornerY + 2);
    ctx.stroke();

    ctx.moveTo(topLeftCornerX - 1, bottomLeftCornerY);
    ctx.lineTo(topLeftCornerX + 4, bottomLeftCornerY + 4);
    ctx.stroke();

    // bottom left corner to bottom divider
    ctx.moveTo(topLeftCornerX + 3, bottomLeftCornerY + 4);
    ctx.lineTo(157, bottomLeftCornerY + 4);
    ctx.stroke();
    ctx.closePath();

    // write divider
    ctx.beginPath();
    ctx.strokeStyle = card.colors.tertiary;

    // bottom
    ctx.moveTo(157, bottomLeftCornerY + 4);
    ctx.lineTo(184, bottomLeftCornerY + 4);
    ctx.stroke();

    // top
    ctx.moveTo(280, topLeftCornerY - 2);
    ctx.lineTo(306, topLeftCornerY - 2);
    ctx.stroke();
    ctx.closePath();

    // write right
    ctx.beginPath();
    ctx.strokeStyle = card.colors.secondary;

    // bottom divider to right corner
    ctx.moveTo(184, bottomLeftCornerY + 4);
    ctx.lineTo(727, bottomLeftCornerY + 4);
    ctx.stroke();
    ctx.closePath();

    // bottom right corner to top right corner
    ctx.moveTo(730, bottomLeftCornerY - 2);
    ctx.lineTo(730, topLeftCornerY + 4);
    ctx.stroke();

    // bottom right corner
    ctx.moveTo(731, bottomLeftCornerY - 4);
    ctx.lineTo(729, bottomLeftCornerY);
    ctx.stroke();
    ctx.lineTo(728, bottomLeftCornerY + 2);
    ctx.stroke();
    ctx.lineTo(726, bottomLeftCornerY + 4);
    ctx.stroke();

    // top right corner
    ctx.moveTo(731, topLeftCornerY + 5);
    ctx.lineTo(726, topLeftCornerY - 2);
    ctx.lineTo(727, topLeftCornerY - 2);

    // top right corner to right side of health
    ctx.lineTo(685, topLeftCornerY - 2);
    ctx.stroke();

    // left side of health to top divider
    ctx.moveTo(306, topLeftCornerY - 2);
    ctx.lineTo(579, topLeftCornerY - 2);
    ctx.stroke();
    ctx.closePath();
  }

  drawHealth() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.font = '92px "Comic Book"';
    ctx.textAlign = 'center';

    canvas.fillShadowText({
      text: MarvelAllyTemplate.formatStatValue(card.stats.health),
      x: 630,
      y: 692,
      shadowXDiff: 6,
      shadowYDiff: 5,
    });
  }

  drawCost() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.font = '92px "Comic Book"';
    ctx.textAlign = 'center';

    canvas.fillShadowText({
      text: MarvelAllyTemplate.formatStatValue(card.stats.cost),
      x: 64,
      y: 100,
      shadowXDiff: 6,
      shadowYDiff: 5,
    });
  }

  async drawAllyImage() {
    const {
      canvas,
      card,
    } = this;

    if (card.media.allyImagePath) {
      await canvas.insertImage({
        height: this.height,
        path: card.media.allyImagePath,
        width: this.width,
        x: 0,
        y: 0,
      });
    }
  }

  drawSetNamePosition() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.font = '26.3px "Big Noodle Titling"';
    ctx.textAlign = 'left';
    ctx.fillStyle = 'white';

    if (card.belongsToHero) {
      ctx.fillText(`${card.setName}  ( ${card.setPosition} )`, 346, 1023);
    } else {
      ctx.textAlign = 'right';
      ctx.fillText(card.setName, 732, 1023);
    }
  }

  /**
  todo: consequential damage, cost
   */

  async draw() {
    await this.drawBackgroundImage();

    this.drawTopOverlay();
    await this.drawTemplateTop();
    this.drawHeaderBoxBorders();

    // ally overlaps top but under bottom
    await this.drawAllyImage();
    this.drawBottomOverlay();
    await this.drawTemplateBottom();
    this.drawCost();
    this.drawHealth();
    this.drawStats();
    this.drawAttributes();
    await this.drawTitle();

    const heightOfEffectText = this.canvas.fillMultiLineText({
      fillStyle: 'black',
      font: '33px "Blue Highway"',
      maxWidth: 765,
      startX: 100,
      startY: 760,
      text: this.card.text.effect.split(' '),
    });

    this.drawHeroBoxBorders();
    // this.drawHandSizeAndHitpoints();
    // this.drawAuthor();
    this.drawFlavorText(heightOfEffectText);
    this.drawSetNamePosition();
    await this.drawSplash();
  }
}

module.exports = MarvelAllyTemplate;
