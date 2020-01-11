const appRootDir = require('app-root-dir');
const path = require('path');
const {
  registerFont,
} = require('canvas');

function register() {
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
}

module.exports = {
  register,
};
