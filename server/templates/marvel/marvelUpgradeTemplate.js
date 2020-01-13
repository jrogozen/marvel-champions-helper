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

  drawTopOverlay() {
    const { canvas, card } = this;
    const { ctx } = canvas;

    ctx.strokeStyle = card.colors.primary;
    ctx.lineWidth = 4;

    // draw cost background
    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 145,
      width: 140,
      rotationDegree: 11,
      x: -14,
      y: -15,
    });

    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 40,
      width: 100,
      x: 0,
      y: 120,
    });

    // draw left stripe
    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 875,
      width: 50,
      x: 0,
      y: 175,
    });

    canvas.fillRect({
      fillStyle: card.colors.primary,
      height: 25,
      width: 45,
      x: 42,
      rotationDegree: -40,
      y: 170,
    });

    if (card.belongsToHero) {
      // // left
      // canvas.fillRect({
      //   fillStyle: card.colors.primary,
      //   height: 74,
      //   width: 372,
      //   x: 140,
      //   y: 0,
      // });

      // // left diagnal
      // canvas.fillRect({
      //   fillStyle: card.colors.primary,
      //   height: 125,
      //   rotationDegree: 20,
      //   width: 20,
      //   x: 490,
      //   y: -10,
      // });

      // // divider
      // canvas.fillRect({
      //   fillStyle: card.colors.tertiary,
      //   height: 125,
      //   rotationDegree: 20,
      //   width: 20,
      //   x: 510,
      //   y: -10,
      // });

      // // right
      // canvas.fillRect({
      //   fillStyle: card.colors.secondary,
      //   height: 125,
      //   rotationDegree: 20,
      //   width: 20,
      //   x: 527,
      //   y: 0,
      // });

      // canvas.fillRect({
      //   fillStyle: card.colors.secondary,
      //   height: 74,
      //   width: 400,
      //   x: 550,
      //   y: 0,
      // });
    } else {
      // left corner
      // ctx.beginPath();
      // ctx.lineWidth = 4;
      // ctx.moveTo(136, 30);
      // ctx.lineTo(142, 0);
      // ctx.stroke();
      // ctx.lineTo(138, 30);
      // ctx.stroke();
      // ctx.closePath();

      // // main rect
      // canvas.fillRect({
      //   fillStyle: card.colors.primary,
      //   height: 74,
      //   width: 650,
      //   x: 140,
      //   y: 0,
      // });
    }
  }

  async draw() {
    await this.drawBackgroundImage();

    this.drawTopOverlay();
    await this.drawTemplateTop();
  }
}

module.exports = MarvelUpgradeTemplate;
