const appRootDir = require('app-root-dir');
const path = require('path');
const express = require('express');
const fs = require('fs');
const sizeOf = require('image-size');
const {
  registerFont,
  createCanvas,
  loadImage,
} = require('canvas');

const Hero = require('../../models/hero');


// fonts
registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'iron_and_brine.ttf',
  ), {
    family: 'Iron & Brine',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'comic_book_bold.otf',
  ), {
    family: 'Comic Book',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'blue_highway.ttf',
  ), {
    family: 'Blue Highway',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'blue_highway_bold.ttf',
  ), {
    family: 'Blue Highway Bold',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'blue_highway_italic.ttf',
  ), {
    family: 'Blue Highway Italic',
  },
);

const router = express.Router();

async function drawTemplateTop(ctx) {
  const heroTemplateTopPath = path.resolve(appRootDir.get(), 'images/cards/hero_template_top.png');
  const heroTemplateTop = await loadImage(heroTemplateTopPath);

  ctx.drawImage(heroTemplateTop, 0, 0, 750, 635);
}

async function drawTemplateBottom(ctx) {
  const heroTemplateBottomPath = path.resolve(appRootDir.get(), 'images/cards/hero_template_bottom.png');
  const heroTemplateBottom = await loadImage(heroTemplateBottomPath);

  ctx.drawImage(heroTemplateBottom, 0, 635, 750, 415);
}

async function drawTitle(ctx, title = '') {
  const formattedTitle = title.toUpperCase();
  const symbolUniquePath = path.resolve(appRootDir.get(), 'images/cards/symbol_unique.png');
  const symbolUnique = await loadImage(symbolUniquePath);

  ctx.font = '60px "Iron & Brine"';
  ctx.textAlign = 'center';
  ctx.fillText(formattedTitle, 375, 89);

  const titleText = ctx.measureText(formattedTitle);

  const leftPositionOfTitle = 375 - (titleText.width / 2);
  const symbolUniqueWidth = 30;
  const leftPositionOfSymbolUnique = leftPositionOfTitle - symbolUniqueWidth - 17; // 10 is padding

  ctx.drawImage(symbolUnique, leftPositionOfSymbolUnique, 50, 29, 37);
}

async function drawAttributes(ctx, attributes = []) {
  const formattedAttributes = attributes.map((attr) => {
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


  const attributesString = `${formattedAttributes.join('. ')}${formattedAttributes.length > 1 ? '.' : ''}`;

  ctx.font = '33px "Comic Book"';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(attributesString, 372, 733);
}

async function writePng(canvas, targetPath) {
  return new Promise((resolve) => {
    const out = fs.createWriteStream(targetPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => {
      resolve();
    });
  });
}

async function drawHero(ctx, imagePath) {
  const heroImagePath = imagePath;
  const heroImage = await loadImage(heroImagePath);

  ctx.drawImage(heroImage, 0, 0, 750, 1050);
}

function drawStyledText(ctx, font, word, x, y) {
  const wordToWrite = word.replace(/\*/g, '');

  let wrote = false;

  // really shallow markdown matching
  // only supports ** for now
  // BUG: *(s) must be the last chars of the word for this parsing to work
  if (word[0] === '*' && word[1] === '*') {
    ctx.font = `${font.substring(0, font.length - 1)} Bold"`;
    ctx.fillText(wordToWrite, x, y);
    wrote = true;
  }
  // else if (word[0] === '*') {
  //   ctx.font = `${font.substring(0, font.length - 1)} Italic"`;
  //   ctx.fillText(wordToWrite, x, y);
  //   wrote = true;
  // }

  if (word[word.length - 1] === '*' && word[word.length - 2] === '*') {
    if (!wrote) {
      ctx.fillText(wordToWrite, x, y);
      wrote = true;
    }
    ctx.font = font.replace(/ Bold/, '');
  }
  // else if (word[word.length - 1] === '*') {
  //   if (!wrote) {
  //     ctx.fillText(wordToWrite, x, y);
  //     wrote = true;
  //   }
  //   ctx.font = font.replace(/ Italic/, '');
  // }

  if (!wrote) {
    ctx.fillText(wordToWrite, x, y);
  }
}

function drawMultiLineText(ctx, fontOptions, wordsArray, startingX, startingY, maxWidth) {
  if (!wordsArray.length) {
    return;
  }

  ctx.font = fontOptions.font;
  ctx.textAlign = 'left';
  ctx.fillStyle = fontOptions.fillStyle;

  const guessedCharacterWidth = ctx.measureText('M').width;

  let summedWidth = 0;
  let lastWordIndex = 0;

  for (let i = 0; i < wordsArray.length; i++) {
    const word = wordsArray[i];

    if (summedWidth + (word.length * guessedCharacterWidth) > maxWidth) {
      // not enough space to add this word
      break;
    } else {
      summedWidth += (word.length * guessedCharacterWidth);
      lastWordIndex += 1;
    }
  }

  let x = startingX;
  const y = startingY;
  const wordSpacing = guessedCharacterWidth * 0.58;
  const heightSpacing = guessedCharacterWidth * 1.5;

  for (let i = 0; i < lastWordIndex; i++) {
    const word = wordsArray[i];

    drawStyledText(ctx, ctx.font, word, x, y);

    x += (wordSpacing + ctx.measureText(word.replace(/\*/g, '')).width);
  }

  drawMultiLineText(
    ctx,
    fontOptions,
    wordsArray.slice(lastWordIndex),
    startingX,
    y + heightSpacing,
    maxWidth,
  );
}

async function drawBackground(ctx, imagePath) {
  const dimensions = sizeOf(imagePath);
  const backgroundImagePath = imagePath;
  const backgroundImage = await loadImage(backgroundImagePath);

  ctx.drawImage(backgroundImage, 0, 0, dimensions.width, dimensions.height);
}

function formatStatValue(num) {
  const str = String(num);

  return str.replace(/0/g, 'o');
}

function writeStats(ctx, {
  thw,
  atk,
  def,
  rec,
}) {
  ctx.font = '68px "Comic Book"';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;

  const shadowXDiff = 6;
  const shadowYDiff = 5;

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
  // thw
  ctx.fillStyle = 'black';
  ctx.fillText(thw, thwDimensions.x + shadowXDiff, thwDimensions.y + shadowYDiff);
  ctx.fillText(atk, atkDimensions.x + shadowXDiff, atkDimensions.y + shadowYDiff);
  ctx.fillText(def, defDimensions.x + shadowXDiff, defDimensions.y + shadowYDiff);


  ctx.fillStyle = 'white';

  // draw text
  // thw
  ctx.strokeText(thw, thwDimensions.x, thwDimensions.y);
  ctx.fillText(thw, thwDimensions.x, thwDimensions.y);

  // atk
  ctx.strokeText(atk, atkDimensions.x, atkDimensions.y);
  ctx.fillText(atk, atkDimensions.x, atkDimensions.y);

  // def
  ctx.strokeText(def, defDimensions.x, defDimensions.y);
  ctx.fillText(def, defDimensions.x, defDimensions.y);
}

async function generate(req, res, next) {
  const hero = new Hero({
    title: 'el gato',
    description: 'wakanda forever, dos',
    backgroundImage: '',
    attributes: ['spanish', 'programmer'],
    type: 'hero',
    icon: '',
    setName: 'colossus',
    setPosition: 0,
    thw: 0,
    atk: 1,
    def: 6,
    effect: 'Organic Steel — **Response:** After you change to this form, give Colossus a tough status card.',
    handSize: 4,
    hitPoints: 13,
  });

  const canvas = createCanvas(750, 1050);
  const ctx = canvas.getContext('2d');

  try {
    // bg first (lowest prio)
    await drawBackground(ctx, path.resolve(appRootDir.get(), 'images/cards/colossus_bg.png'));

    await drawTemplateTop(ctx);
    await drawTitle(ctx, hero.title);
    await drawHero(ctx, path.resolve(appRootDir.get(), 'images/cards/colossus_hero.png'));
    await drawTemplateBottom(ctx);

    writeStats(ctx, {
      atk: formatStatValue(hero.atk),
      def: formatStatValue(hero.def),
      thw: formatStatValue(hero.thw),
      // rec: hero.rc,
    });

    drawAttributes(ctx, hero.attributes);
    drawMultiLineText(ctx, {
      font: '33px "Blue Highway"',
      fillStyle: 'black',
    }, hero.effect.split(' '), 100, 800, 825);

    const targetPath = path.resolve(appRootDir.get(), 'cards', 'test.png');

    await writePng(canvas, targetPath);

    res.send('ok');
  } catch (error) {
    next(error);
  }
}

router.get('/generate', generate);

module.exports = router;
