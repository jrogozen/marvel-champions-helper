const BaseCard = require('../baseCard');

class MarvelAllyCard extends BaseCard {
  constructor(args) {
    super(args);

    const {
      allyImagePath,
      atk,
      atkConsequence,
      attributes,
      backgroundImagePath,
      cost,
      effect,
      flavorText,
      health,
      primaryColor,
      resources,
      secondaryColor,

      // can be leadership/protection/aggression/justice/basic OR belong to a hero
      setName,
      setPosition,
      splashColor,
      splashIconPath,
      subtitle,
      tertiaryColor,
      thw,
      thwConsequence,
      title,
    } = args;

    this.type = MarvelAllyCard.TYPE;
    this.setName = BaseCard.string(setName);
    this.setPosition = BaseCard.string(setPosition);
    this.title = BaseCard.string(title);
    this.subtitle = BaseCard.string(subtitle);
    this.belongsToHero = this.shouldBelongToHero();
    this.media = {
      backgroundImagePath: BaseCard.string(backgroundImagePath),
      allyImagePath: BaseCard.string(allyImagePath),
      splashIconPath: BaseCard.string(splashIconPath),
    };
    this.colors = {
      primary: BaseCard.string(primaryColor),
      secondary: BaseCard.string(secondaryColor),
      splash: BaseCard.string(splashColor),
      tertiary: BaseCard.string(tertiaryColor),
    };
    this.stats = {
      atk: BaseCard.number(atk),
      atkConsequence: BaseCard.number(atkConsequence),
      cost: BaseCard.number(cost),
      health: BaseCard.number(health),
      thw: BaseCard.number(thw),

      // mental, energy, strength, wild
      // e.g. mental=2,energy=1
      resources: resources.split(',').map((resource) => {
        const resourceAndType = resource.split('=');
        return {
          type: resourceAndType[0],
          count: resourceAndType[1],
        };
      }),
      thwConsequence: BaseCard.number(thwConsequence),
    };
    this.text = {
      attributes: BaseCard.string(attributes),
      effect: BaseCard.string(effect),
      flavorText: BaseCard.string(flavorText),
    };
    this.setColors();
  }

  shouldBelongToHero() {
    const { setName } = this;

    if (
      setName === 'justice'
      || setName === 'protection'
      || setName === 'basic'
      || setName === 'aggression'
      || setName === 'leadership') {
      return false;
    }

    return true;
  }

  setColors() {
    const {
      belongsToHero,
      setName,
    } = this;

    if (belongsToHero) {
      return;
    }

    if (setName === 'leadership') {
      this.colors.primary = '#69b6ca';
      this.colors.secondary = '#69b6ca';
      this.colors.tertiary = '#69b6ca';
    } else if (setName === 'justice') {
      this.colors.primary = '#a89b40';
      this.colors.secondary = '#a89b40';
      this.colors.tertiary = '#a89b40';
    } else if (setName === 'protection') {
      this.colors.primary = '#7db455';
      this.colors.secondary = '#7db455';
      this.colors.tertiary = '#7db455';
    } else if (setName === 'aggression') {
      this.colors.primary = '#923130';
      this.colors.secondary = '#923130';
      this.colors.tertiary = '#923130';
    } else {
      this.colors.primary = '#a0a0a0';
      this.colors.secondary = '#a0a0a0';
      this.colors.tertiary = '#a0a0a0';
    }
  }
}

MarvelAllyCard.TYPE = 'MARVEL_ALLY_CARD';

/**
 * @swagger
 *  components:
 *    schemas:
 *      MarvelChampionsAllyCard:
 *        type: object
 *        required:
 *          - title
 *          - attributes
 *          - thw
 *          - atk
 *          - health
 *          - effect
 *          - cost
 *          - setName
 *          - resources
 *        properties:
 *          title:
 *            type: string
 *            description: title of the card
 *          subtitle:
 *            type: string
 *            description: subtitle of the card
 *          setName:
 *            type: string
 *            description: name of the set card belongs to. can be one of the main sets (aggression, justice, leadership, protection, basic) or a custom hero
 *          setPosition:
 *            type: string
 *            description: string describing position of card in a non main set (e.g. 3/15)
 *          author:
 *            type: string
 *            description: creator of the card
 *            default: decktool.app
 *          flavorText:
 *            type: string
 *            description: hero quote, or message to add as flavor text
 *          attributes:
 *            type: string
 *            description: comma separated list of hero attributes
 *          thw:
 *            type: number
 *            description: hero thw value
 *          thwConsequence:
 *            type: number
 *            description: amount of consequential damage to take when using thw
 *          atk:
 *            type: number
 *            description: hero atk value
 *          atkConsequence:
 *            type: number
 *            description: amount of consequential damage to take when using atk
 *          effect:
 *            type: string
 *            description: unique card effect
 *          health:
 *            type: number
 *            description: maximum health for ally card
 *          cost:
 *            type: number
 *            description: cost to play ally card
 *          resources:
 *            type: string
 *            description: comma separated list of resources and their count for discarding this card. (e.g. mental=1,energy=2)
 *          primaryColor:
 *            type: string
 *            description: primary color of card. supports rgba, hex, or web color
 *          secondaryColor:
 *            type: string
 *            description: secondary color of card. supports rgba, hex, or web color
 *          tertiaryColor:
 *            type: string
 *            description: tertiary color of card. supports rgba, hex, or web color
 *          splashIconPath:
 *            type: string
 *            description: splash icon located in bottom right of the card
 *          allyImagePath:
 *            type: string
 *            description: main ally image
 *          backgroundImagePath:
 *            type: string
 *            description: background image for card
 *          splashColor:
 *            type: string
 *            description: background color for splash icon
 *        example:
 *          title: heimdall
 *          flavorText: The son of Odin, you must wake up! You must save us!
 *          attributes: asgardian
 *          atk: 1
 *          atkConsequence: 1
 *          cost: 3
 *          thw: 2
 *          thwConsequence: 2
 *          health: 5
 *          effect: "Response: After Heimdall enters play, ready your hero."
 *          setName: justice
 *          resources: strength=1,mental=1
 *          allyImagePath: https://i.imgur.com/810C9Qr.png
 *          backgroundImagePath: https://i.imgur.com/eDt1JFF.jpg
 */

module.exports = MarvelAllyCard;
