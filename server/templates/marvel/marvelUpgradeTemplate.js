const appRootDir = require('app-root-dir');
const path = require('path');

const MarvelBaseTemplate = require('./marvelBaseTemplate');

class MarvelUpgradeTemplate extends MarvelBaseTemplate {
  constructor(args) {
    super({
      ...args,
      templateImages: {
        splash: {
          height: 233,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/hero_template_splash.png'),
          width: 230,
        },
        top: {
          height: 1050,
          path: path.resolve(appRootDir.get(), 'server/templates/marvel/images/upgrade_template_top.png'),
          width: 750,
        },
      },
      width: 750,
      height: 1050,
    });
  }

  drawOverlay() {
    const { canvas, card } = this;

    // left side
    canvas.fillCoordPath({
      coords: '0,0,524,0,524,2,520,12,504,48,495,65,451,72,380,86,353,90,272,111,251,115,213,128,202,130,102,173,83,182,40,215,21,234,20,279,20,397,20,712,20,812,21,865,119,865,149,871,218,879,218,884,216,884,215,883,215,885,198,927,162,1012,151,1039,147,1050,0,1050',
      fillStyle: card.colors.primary,
    });

    // top right
    canvas.fillCoordPath({
      coords: '750,0,750,47,680,49,629,52,588,54,521,62,521,60,545,13,550,0',
      fillStyle: card.belongsToHero ? card.colors.secondary : card.colors.primary,
    });

    // bottom divider
    canvas.fillCoordPath({
      coords: '214,883,239,889,173,1050,147,1050,147,1048,154,1030,172,986,201,915',
      fillStyle: card.belongsToHero ? card.colors.tertiary : card.colors.primary,
    });

    // top divider
    canvas.fillCoordPath({
      coords: '523,0,550,0,550,1,542,21,531,45,524,59,498,64,503,52,514,22',
      fillStyle: card.belongsToHero ? card.colors.tertiary : card.colors.primary,
    });

    // bottom right
    canvas.fillCoordPath({
      coords: '489,753,750,753,750,1050,173,1050,173,1048,189,1008,225,923,236,896,239,884,246,884,310,888,359,889,387,889,488,884',
      fillStyle: card.belongsToHero ? card.colors.secondary : card.colors.primary,
    });
  }

  drawBorders() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    // bottom box, top left
    canvas.fillCoordPath({
      coords: '87,668,282,668,281,673,87,673',
      fillStyle: card.colors.primary,
    });

    ctx.beginPath();
    ctx.fillStyle = card.belongsToHero ? card.colors.tertiary : card.colors.primary;
    ctx.moveTo(280, 673);
    ctx.lineTo(305, 673);
    ctx.lineTo(306, 668);
    ctx.lineTo(282, 668);
    ctx.moveTo(280, 673);
    ctx.fill();
    ctx.closePath();

    canvas.fillCoordPath({
      coords: '306,668,585,668,673,668,722,669,723,673,724,673,724,718,724,797,724,991,722,992,722,995,721,994,720,996,186,996,186,995,187,995,188,990,714,990,717,986,718,986,718,958,718,900,718,678,714,672,714,673,601,673,304,673,304,673',
      fillStyle: card.colors.primary,
    });

    canvas.fillCoordPath({
      coords: '188,996,159,996,159,995,161,994,162,990,191,990,191,991',
      fillStyle: card.belongsToHero ? card.colors.tertiary : card.colors.primary,
    });

    canvas.fillCoordPath({
      coords: '26,877,32,877,32,986,36,989,36,990,74,990,165,990,163,996,30,996,30,994,28,995,26,967',
      fillStyle: card.colors.primary,
    });

    ctx.beginPath();
    ctx.strokeStyle = card.colors.primary;
    ctx.lineWidth = 4;
    ctx.moveTo(12, 199);
    ctx.lineTo(81, 207);
    ctx.lineTo(84, 885);
    ctx.lineTo(12, 869);
    ctx.lineTo(12, 198);
    ctx.stroke();
    ctx.closePath();
  }

  async drawTitle() {
    const {
      card,
      canvas,
      templateImages,
    } = this;
    const { ctx } = canvas;
    const { unique } = card.stats;

    const font = 'small-caps 30px "Arial"';
    // const distanceBetweenSymbolAndFirstLetter = 5;

    ctx.font = font;
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';

    // draw first char
    ctx.fillText(
      'WEB-SHOOTER',
      10,
      100,
    );

    if (unique) {
      // await canvas.insertImage({
      //   height: 37,
      //   path: templateImages.symbols.unique.path,
      //   width: templateImages.symbols.unique.width,
      //   x: leftX,
      //   y: 50,
      // });
    }
  }

  async draw() {
    await this.drawBackgroundImage();

    this.drawOverlay();
    await this.drawTemplateTop();
    this.drawBorders();
    this.drawCost();
    this.drawTitle();
  }
}

module.exports = MarvelUpgradeTemplate;
