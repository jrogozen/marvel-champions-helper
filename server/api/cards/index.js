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

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'big_noodle_titling.ttf',
  ), {
    family: 'Big Noodle Titling',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'bravo_sc.otf',
  ), {
    family: 'Bravo SC',
  },
);

registerFont(
  path.resolve(
    appRootDir.get(),
    'fonts',
    'sf_wonder_comic_italic.ttf',
  ), {
    family: 'SF Wonder Comic Italic',
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
  ctx.fillStyle = 'black';
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


  const attributesString = `${formattedAttributes.join('. ')}.`;

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
  ctx.font = fontOptions.font;
  ctx.textAlign = 'left';
  ctx.fillStyle = fontOptions.fillStyle;

  const guessedCharacterWidth = ctx.measureText('M').width;
  const wordSpacing = guessedCharacterWidth * 0.58;
  const heightSpacing = guessedCharacterWidth * 1.5;
  const y = startingY;

  let x = startingX;

  if (!wordsArray.length) {
    return heightSpacing;
  }

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

  for (let i = 0; i < lastWordIndex; i++) {
    const word = wordsArray[i];

    drawStyledText(ctx, ctx.font, word, x, y);

    x += (wordSpacing + ctx.measureText(word.replace(/\*/g, '')).width);
  }

  return drawMultiLineText(
    ctx,
    fontOptions,
    wordsArray.slice(lastWordIndex),
    startingX,
    y + heightSpacing,
    maxWidth,
  ) + heightSpacing;
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

// todo: edges should be tilted
function drawHeaderBox(ctx, { left, divider, right }) {
  // todo: store widths as vars
  ctx.lineWidth = 4;

  // write left
  // top left corner to top divider
  ctx.strokeStyle = left;
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
  ctx.strokeStyle = divider;
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
  ctx.strokeStyle = right;
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

// todo: edges should be tilted
function drawHeroBox(ctx, { left, divider, right }) {
  // todo: store widths as vars
  ctx.lineWidth = 6;

  // write left
  ctx.strokeStyle = left;
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
  ctx.strokeStyle = divider;
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
  ctx.strokeStyle = right;
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

function drawRotatedRect(ctx, x, y, width, height, degrees, color) {
  ctx.fillStyle = color;

  ctx.save();
  ctx.beginPath();

  // move center point to middle of rect
  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.rect(-width / 2, -height / 2, width, height);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawHandSizeAndHitpoints(ctx, { handSize, hitPoints }) {
  ctx.font = '26.3px "Big Noodle Titling"';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'white';

  ctx.fillText(`HAND SIZE ${handSize} / HIT POINTS ${hitPoints}`, 34, 1023);
}

function drawAuthor(ctx, author) {
  ctx.font = '18.75px "Bravo SC"';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'white';

  ctx.fillText(author, 225, 1045);
}

function drawBottomOverlay(ctx, { left, divider, right }) {
  // draw right
  drawRotatedRect(ctx, 130, 958, 775, 250, -28, right);

  // draw bottom
  drawRotatedRect(ctx, 175, 1000, 300, 50, 0, right);

  // draw left
  drawRotatedRect(ctx, -52, 867, 225, 200, 24, left);

  // draw divider
  drawRotatedRect(ctx, 185, 867, 22, 200, 24, divider);
}

async function drawSplashOutline(ctx) {
  const splashOutlinePath = path.resolve(appRootDir.get(), 'images', 'cards', 'hero_template_splash.png');
  const splashOutline = await loadImage(splashOutlinePath);

  ctx.drawImage(splashOutline, 624, 912, 230, 233);
}

function drawSplashBackground(ctx, color) {
  ctx.fillStyle = color;

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
}

async function drawSplashIcon(ctx, iconPath) {
  const dimensions = sizeOf(iconPath);
  const splashImage = await loadImage(iconPath);

  const maxWidth = 90;
  const maxHeight = 100;

  ctx.textAlign = 'center';

  let { width, height } = dimensions;

  if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
    const ratio = Math.min(maxWidth / dimensions.width);
    width = dimensions.width * ratio;
    height = dimensions.height * ratio;
  }

  const middleXofSplashBg = 704;
  const middleYofSplashBg = 1000;
  const leftX = middleXofSplashBg - (width / 2);
  const leftY = middleYofSplashBg - (height / 2);

  ctx.drawImage(splashImage, leftX, leftY, width, height);
}

function drawFlavorText(ctx, text, x, y) {
  ctx.font = '23px "SF Wonder Comic Italic"';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'black';

  ctx.fillText(`"${text}"`, x, y);
}

async function generate(req, res, next) {
  const {
    author = 'decktool.app',
    title = 'colossus',
    flavorText = 'wakanda forever',
    attributes = 'x-man',
    thw = 0,
    atk = 3,
    def = 4,
    backgroundImagePath = path.resolve(appRootDir.get(), 'images/cards/colossus_bg.png'),
    heroImagePath = path.resolve(appRootDir.get(), 'images/cards/colossus_hero.png'),
    effect = 'Organic Steel - **Response:** After you change to this form, give Colossus a tough status card.',
    handSize = 4,
    hitPoints = 14,
    primaryColor = 'blue',
    secondaryColor = 'red',
    tertiaryColor = 'yellow',
    splashColor,
    setName,
    setPosition,
    splashIconPath,
  } = req.body;

  const hero = new Hero({
    author,
    title,
    flavorText,
    backgroundImagePath,
    heroImagePath,
    attributes,
    type: 'hero',
    splashIconPath,
    setName,
    setPosition,
    thw,
    atk,
    def,
    effect,
    handSize,
    hitPoints,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    splashColor: splashColor || primaryColor,
  });

  const canvas = createCanvas(750, 1050);
  const ctx = canvas.getContext('2d');

  const colors = {
    left: hero.primaryColor,
    right: hero.secondaryColor,
    divider: hero.tertiaryColor,
  };

  try {
    // bg first (lowest prio)
    await drawBackground(ctx, path.resolve(appRootDir.get(), 'images/cards/colossus_bg.png'));
    drawBottomOverlay(ctx, colors);
    await drawTemplateTop(ctx);
    await drawTitle(ctx, hero.title);
    drawHeaderBox(ctx, colors);
    await drawHero(ctx, path.resolve(appRootDir.get(), 'images/cards/colossus_hero.png'));
    await drawTemplateBottom(ctx);

    writeStats(ctx, {
      atk: formatStatValue(hero.atk),
      def: formatStatValue(hero.def),
      thw: formatStatValue(hero.thw),
      // rec: hero.rc,
    });

    drawAttributes(ctx, hero.attributes);

    const heightOfEffect = drawMultiLineText(ctx, {
      font: '33px "Blue Highway"',
      fillStyle: 'black',
      // max is obviously broken if it is bigger than canvas
    }, hero.effect.split(' '), 100, 800, 775);

    drawHeroBox(ctx, colors);

    drawHandSizeAndHitpoints(ctx, {
      handSize: hero.handSize,
      hitPoints: hero.hitPoints,
    });

    drawAuthor(ctx, hero.author);

    drawFlavorText(ctx, hero.flavorText, 100, heightOfEffect + 792);

    drawSplashBackground(ctx, hero.splashColor);
    await drawSplashOutline(ctx);
    await drawSplashIcon(ctx, path.resolve(appRootDir.get(), 'images/cards/colossus_splash.png'));


    canvas.toBuffer((err, buf) => {
      if (err) throw err; // encoding failed

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': buf.length,
      });

      res.end(buf);
    });

    // const targetPath = path.resolve(appRootDir.get(), 'cards', 'test.png');

    // await writePng(canvas, targetPath);

    // res.send('ok');
  } catch (error) {
    next(error);
  }
}

// drawing lines info https://stackoverflow.com/questions/36211616/how-can-i-draw-a-diagonal-line-in-canvas-that-looks-the-same-in-safari-chrome

router.post('/generate', generate);

module.exports = router;
