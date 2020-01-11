const appRootDir = require('app-root-dir');
const path = require('path');

const Canvas = require('../../utils/canvas');

class MarvelHeroTemplate {
  constructor(args) {
    const {
      hero,
    } = args;

    this.hero = hero;
    this.width = 750;
    this.height = 1050;
    this.canvas = new Canvas(this.width, this.height);
    this.templateImages = {
      bottom: path.resolve(appRootDir.get(), 'templates/marvel/images/hero_template_bottom.png'),
      splash: path.resolve(appRootDir.get(), 'templates/marvel/images/hero_template_splash.png'),
      top: path.resolve(appRootDir.get(), 'templates/marvel/images/hero_template_top.png'),
      symbols: {
        unique: path.resolve(appRootDir.get(), 'templates/marvel/images', 'symbol_unique.png'),
      },
    };
  }

  async drawBackgroundImage() {
    if (this.hero.media.backgroundImagePath) {
      await this.canvas.insertImage({
        path: this.hero.media.backgroundImagePath,
        x: 0,
        y: 0,
      });
    }
  }

  drawBottomOverlay() {
    const { canvas, hero } = this;

    canvas.fillRect({
      fillStyle: hero.colors.secondary,
      height: 250,
      rotationDegree: -28,
      width: 775,
      x: 130,
      y: 958,
    });

    canvas.fillRect({
      fillStyle: hero.colors.secondary,
      height: 50,
      width: 300,
      x: 175,
      y: 1000,
    });

    canvas.fillRect({
      fillStyle: hero.colors.primary,
      height: 200,
      rotationDegree: 24,
      width: 225,
      x: -52,
      y: 867,
    });

    canvas.fillRect({
      fillStyle: hero.colors.tertiary,
      height: 200,
      rotationDegree: 24,
      width: 22,
      x: 185,
      y: 867,
    });
  }

  async drawTemplateTop() {
    this.canvas.insertImage({
      height: 635,
      path: path.resolve(appRootDir.get()),
      width: this.width,
      x: 0,
      y: 0,
    });
  }

  async drawTitle() {

  }

  async draw() {
    await this.drawBackgroundImage();

    this.drawBottomOverlay();

    await this.drawTemplateTop();
  }
}

module.exports = MarvelHeroTemplate;
