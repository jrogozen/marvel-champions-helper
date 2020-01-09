const express = require('express');

const Hero = require('../models/hero');

const router = express.Router();

function generate(req, res) {
  const hero = new Hero({
    title: 'colossus',
    description: 'by the white wolf',
    backgroundImage: '',
    attributes: ['x-man'],
    type: 'hero',
    icon: '',
    setName: 'colossus',
    setPosition: 0,
    thw: 1,
    atk: 3,
    def: 2,
    ability: '*Organic Steel* - **Response**: After you change to this form, give Colossus a tough status card.',
    handSize: 4,
    hitPoints: 13,
  });
}

router.get('/generate', generate);

module.exports = router;
