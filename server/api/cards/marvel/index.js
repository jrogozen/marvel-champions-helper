/* eslint-disable new-cap */
const express = require('express');

const MarvelAllyCard = require('../../../models/cards/marvel/marvelAllyCard');
const MarvelAllyTemplate = require('../../../templates/marvel/marvelAllyTemplate');
const MarvelHeroCard = require('../../../models/cards/marvel/marvelHeroCard');
const MarvelHeroTemplate = require('../../../templates/marvel/marvelHeroTemplate');
const MarvelUpgradeCard = require('../../../models/cards/marvel/marvelUpgradeCard');
const MarvelUpgradeTemplate = require('../../../templates/marvel/marvelUpgradeTemplate');

const router = express.Router();

const templateMap = {
  ally: {
    card: MarvelAllyCard,
    template: MarvelAllyTemplate,
  },
  hero: {
    card: MarvelHeroCard,
    template: MarvelHeroTemplate,
  },
  upgrade: {
    card: MarvelUpgradeCard,
    template: MarvelUpgradeTemplate,
  },
};

function generate(type) {
  return async (req, res, next) => {
    try {
      const card = new templateMap[type].card(req.body);
      const template = new templateMap[type].template({ card });

      await template.draw();

      template.canvas.canvas.toBuffer((err, buf) => {
        if (err) throw err;

        res.writeHead(200, {
          'Content-Type': 'image/png',
          'Content-Length': buf.length,
        });

        res.end(buf);
      });
    } catch (error) {
      next(error);
    }
  };
}

/**
 * @swagger
 * path:
 *  /api/v1/marvel-champions/cards/hero:
 *    post:
 *      summary: create a new marvel champions hero card
 *      tags: [marvel-champions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/MarvelChampionsHeroCard'
 *      responses:
 *        200:
 *          description: ok
 *          content:
 *            image/*:
 *              schema:
 *                type: string
 *                format: binary
 *        500:
 *          description: not ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/ServerError'
 */
router.post('/hero', generate('hero'));

/**
 * @swagger
 * path:
 *  /api/v1/marvel-champions/cards/ally:
 *    post:
 *      summary: create a new marvel champions ally card
 *      tags: [marvel-champions]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/MarvelChampionsAllyCard'
 *      responses:
 *        200:
 *          description: ok
 *          content:
 *            image/*:
 *              schema:
 *                type: string
 *                format: binary
 *        500:
 *          description: not ok
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/ServerError'
 */
router.post('/ally', generate('ally'));

router.post('/upgrade', generate('upgrade'));

module.exports = router;
