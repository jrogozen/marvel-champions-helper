const express = require('express');

const MarvelHeroCard = require('../../../models/cards/marvel/marvelHeroCard');
const MarvelHeroTemplate = require('../../../templates/marvel/marvelHeroTemplate');

const router = express.Router();

async function generate(req, res, next) {
  try {
    const card = new MarvelHeroCard(req.body);
    const template = new MarvelHeroTemplate({
      card,
    });

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
}

/**
 * @swagger
 * path:
 *  /api/v1/marvel-champions/cards:
 *    post:
 *      summary: create a new marvel champions card
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
router.post('/', generate);

module.exports = router;
