/**
 * @swagger
 *  components:
 *    schemas:
 *      MarvelChampionsHeroCard:
 *        type: object
 *        required:
 *          - title
 *          - attributes
 *          - thw
 *          - atk
 *          - def
 *          - effect
 *          - handSize
 *          - hitPoints
 *        properties:
 *          title:
 *            type: string
 *            description: title of the card
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
 *          atk:
 *            type: number
 *            description: hero atk value
 *          def:
 *            type: number
 *            description: hero def value
 *          effect:
 *            type: string
 *            description: unique card effect
 *          handSize:
 *            type: number
 *            description: maximum hand size for hero
 *          hitPoints:
 *            type: number
 *            description: maximum hit points for hero
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
 *          heroImagePath:
 *            type: string
 *            description: main hero image
 *          backgroundImagePath:
 *            type: string
 *            description: background image for card
 *          splashColor:
 *            type: string
 *            description: background color for splash icon
 *        example:
 *          title: colossus
 *          flavorText: The White Wolf.
 *          attributes: x-man,human
 *          atk: 2
 *          thw: 1
 *          def: 3
 *          effect: Organic Steel - **Response:** After you change to this form, give Colossus a tough status card.
 *          handSize: 4
 *          hitPoints: 14
 *          primaryColor: red
 *          secondaryColor: gray
 *          tertiaryColor: yellow
 *          splashColor: green
 *          heroImagePath: http://i.imgur.com/C2tVZbv.png
 *          splashIconPath: http://i.imgur.com/4t5Sr9H.png
 *          backgroundImagePath: http://i.imgur.com/Oz71mT4.png
 */
