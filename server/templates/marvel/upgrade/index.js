const appRootDir = require('app-root-dir');
const path = require('path');
const fs = require('fs');
const window = require('svgdom');
const {
  SVG, find, registerWindow,
} = require('@svgdotjs/svg.js');
const Canvg = require('canvg');
const { DOMParser } = require('xmldom');
const canvas = require('canvas');
const fetch = require('node-fetch');

const preset = Canvg.presets.node({
  DOMParser,
  canvas,
  fetch,
});

class MarvelUpgradeTemplate {
  constructor() {
    const { document } = window;
    registerWindow(window, document);

    this.canvas = SVG(document.documentElement);
  }

  async loadSvg() {
    const filename = require.resolve(path.resolve(appRootDir.get(), 'server/templates/marvel/upgrade/render.svg'));

    return new Promise((resolve) => {
      fs.readFile(filename, 'utf8', (err, image) => {
        const rendered = this.canvas.svg(image);

        rendered.size(750, 1050);
        resolve();
      });
    });
  }

  async render() {
    // set intial svg size so we can place things with x,y coordinates
    this.canvas.size(750, 1050);

    // add background image
    const i = this.canvas.image('https://i.imgur.com/eDt1JFF.jpg');
    i.size(750, 1050).move(0, -100);

    // load the svg template
    await this.loadSvg();

    // set colors
    find('.primary').fill('green');
    find('.secondary').fill('green');
    find('.tertiary').fill('green');

    // add text
    this.canvas.text('x-man').move(372, 700);
  }

  async renderPng() {
    const c = preset.createCanvas(750, 1050);
    const ctx = c.getContext('2d');
    const svg = this.canvas.svg();
    const v = Canvg.default.fromString(ctx, svg, preset);

    await v.render();

    return c.toBuffer();
  }
}

module.exports = MarvelUpgradeTemplate;
