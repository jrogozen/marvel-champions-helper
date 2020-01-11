const http = require('http');
const https = require('https');
const isUndefined = require('lodash/isUndefined');
const url = require('url');
const sizeOf = require('image-size');
const {
  createCanvas,
  loadImage,
  Image,
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

    logger.debug({ startX, startY, text });

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
    let lastUsedWordIndex = 0;

    if (text.length <= 0) {
      return heightSpacing;
    }

    for (let i = 0; i < text.length; i++) {
      const word = text[i];

      // todo: improve
      const wordWidth = word.replace(/\*/g, '').length * guessSingleCharacterDimensions.width;

      if (currentLineWidth + wordWidth > maxWidth) {
        logger.debug({ text, word, maxWidth }, 'word=%s would push line over maxWidth. breaking loop', word);
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
      text: text.slice(lastUsedWordIndex),
      startX,
      startY: y + heightSpacing,
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

  static async getImageWithDimensions(path) {
    return new Promise((resolve) => {
      if (path.substring(0, 10).toLowerCase() === 'data:image') {
        const buff = Buffer.from(
          path.replace(/^data:image\/(png|gif|jpeg);base64,/, ''),
          'base64',
        );
        const dimensions = sizeOf(buff);

        resolve({
          dimensions,
          image: buff,
        });
      } else if (path.substring(0, 4).toLowerCase() === 'http') {
        const u = url.parse(path);
        const protocol = (u.protocol === 'https:' ? https : http);

        protocol.get(u, (response) => {
          const chunks = [];

          response
            .on('data', (chunk) => chunks.push(chunk))
            .on('end', async () => {
              const buff = Buffer.concat(chunks);
              const dimensions = sizeOf(buff);

              resolve({
                dimensions,
                image: buff,
              });
            });
        });
      } else {
        loadImage(path)
          .then((image) => {
            const dimensions = sizeOf(path);

            resolve({
              dimensions,
              image,
            });
          });
      }
    });
  }

  static getModifiedDimensions({
    dimensions,
    height,
    maxHeight,
    maxWidth,
    width,
  }) {
    if (!width || !height) {
      height = dimensions.height;
      width = dimensions.width;
    }

    if (
      (maxWidth && (dimensions.width > maxWidth))
      || (maxHeight && (dimensions.height > maxHeight))
    ) {
      const ratio = Math.min(maxWidth / dimensions.width);
      width = dimensions.width * ratio;
      height = dimensions.height * ratio;
    }

    return {
      height,
      width,
    };
  }

  async drawBuffer({
    buffer,
    height,
    width,
    x,
    y,
  }) {
    const { ctx } = this;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
        resolve();
      };
      img.onerror = (err) => reject(err);
      img.src = buffer;
    });
  }

  // x and y refer to top left corner of image
  async insertImage({
    path,
    x,
    y,
    width,
    height,
    maxHeight,
    maxWidth,
  }) {
    const { ctx } = this;

    const { image, dimensions } = await Canvas.getImageWithDimensions(path);

    const modifiedDimensions = Canvas.getModifiedDimensions({
      dimensions,
      maxWidth,
      maxHeight,
      width,
      height,
    });

    if (Buffer.isBuffer(image)) {
      await this.drawBuffer({
        buffer: image,
        height: modifiedDimensions.height,
        width: modifiedDimensions.width,
        x,
        y,
      });
    } else {
      ctx.drawImage(image, x, y, modifiedDimensions.width, modifiedDimensions.height);
    }
  }
}

module.exports = Canvas;
