const http = require('http');
const isUndefined = require('lodash/isUndefined');
const url = require('url');
const sizeOf = require('image-size');
const {
  createCanvas,
  loadImage,
} = require('canvas');

const fonts = require('./fonts');

const logger = log.child({ name: 'canvas' });

class Canvas {
  constructor({ width, height }) {
    fonts.register();

    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
  }

  toggleFontStyle(style) {
    const { ctx } = this;
    const { font } = ctx;

    if (font.includes(style) > -1) {
      ctx.font = font.replace(` ${style}`, '');
    } else {
      ctx.font = `${font.substring(0, font.length - 1)} ${style}"`;
    }
  }

  fillStyledText(word, x, y) {
    const { ctx } = this;
    const wordToWrite = word.replace(/\*/g, '');
    const starCount = word.split('').reduce((sum, c) => (c === '*' ? sum + 1 : sum), 0);

    if (starCount === 4) {
      this.toggleFontStyle('Bold');
      ctx.fillText(wordToWrite, x, y);
      this.toggleFontStyle('Bold');
    } else if (starCount > 2 && word[0] === '*') {
      this.toggleFontStyle('Bold');
      ctx.fillText(wordToWrite, x, y);
    } else if (starCount > 2) {
      ctx.fillText(wordToWrite, x, y);
      this.toggleFontStyle('Bold');
    } else {
      ctx.fillText(wordToWrite, x, y);
    }
  }

  fillMultiLineText({
    font,
    fillStyle,
    text,
    startX,
    startY,
    maxWidth,
  }) {
    const { ctx } = this;

    if (!Array.isArray(text)) {
      throw new Error('text must be an array');
    }

    ctx.font = font;
    ctx.textAlign = 'left';
    ctx.fillStyle = fillStyle;

    const guessSingleCharacterDimensions = ctx.measureText('M');
    const wordSpacing = guessSingleCharacterDimensions.width * 0.58;
    const heightSpacing = guessSingleCharacterDimensions.width * 1.5;

    const y = startY;

    let x = startX;
    let currentLineWidth = 0;
    let lastUsedWordIndex = -1;

    if (text.length <= 0) {
      return heightSpacing;
    }

    for (let i = 0; i < text.length; i++) {
      const word = text[i];

      // todo: improve
      const wordWidth = word.replace(/\*/g, '').length * guessSingleCharacterDimensions.width;

      if (currentLineWidth + wordWidth > maxWidth) {
        logger.debug({ text, word, maxWidth }, 'word=%s would push line over maxWidth. breaking loop');
        break;
      } else {
        currentLineWidth += (word.length * guessSingleCharacterDimensions.width);
        lastUsedWordIndex += 1;
      }
    }

    for (let j = 0; j < lastUsedWordIndex; j++) {
      const word = text[j];

      this.fillStyledText(word, x, y);

      // todo: improve
      const wordLengthWithoutMarkdown = ctx.measureText(word.replace(/\*/g, '')).width;
      x += (wordSpacing + wordLengthWithoutMarkdown);
    }

    // recursively return cumulative height of multilines
    return this.fillMultiLineText({
      font,
      fillStyle,
      text: text.slice(lastUsedWordIndex - 1),
      x,
      y,
      maxWidth,
    }) + heightSpacing;
  }

  fillRect({
    x,
    y,
    width,
    height,
    rotationDegree,
    fillStyle,
  }) {
    const { ctx } = this;

    ctx.fillStyle = fillStyle;

    // save context so we can restore after potential rotation
    ctx.save();
    ctx.beginPath();

    // move center point of ctx to middle of rect
    ctx.translate(x + width / 2, y + height / 2);

    if (!isUndefined(rotationDegree)) {
      ctx.rotate((rotationDegree * Math.PI) / 180);
    }

    ctx.rect(
      -width / 2,
      -height / 2,
      width,
      height,
    );
    ctx.fill();
    ctx.closePath();

    // restore saved ctx
    ctx.restore();
  }

  // x and y refer to top left corner of image
  async insertImage({
    path,
    x,
    y,
    width,
    height,
  }) {
    const { ctx } = this;

    // if the path is a bas64 string, we can just insert it
    if (path.substring(0, 10).toLowerCase() === 'data:image') {
      const image = new Image();

      image.onload = () => {
        const dimensions = sizeOf(image);

        ctx.drawImage(image, x, y, dimensions.width, dimensions.height);
      };

      image.src = path;
    } else if (path.substring(0, 4).toLowerCase() === 'http') {
      http.get(url.parse(path), (response) => {
        const chunks = [];

        response
          .on('data', (chunk) => chunks.push(chunk))
          .on('end', async () => {
            const b = Buffer.concat(chunks);
            const dimensions = sizeOf(b);

            const image = await loadImage(path);

            // todo: prob can just draw the buffer here
            ctx.drawImage(image, x, y, dimensions.width, dimensions.height);
          });
      });
    } else if (!width || !height) {
      const image = await loadImage(path);
      const dimensions = sizeOf(path);

      ctx.drawImage(image, x, y, dimensions, width, dimensions.height);
    } else {
      const image = await loadImage(path);

      ctx.drawImage(image, x, y, width, height);
    }
  }
}

module.exports = Canvas;
