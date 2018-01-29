const Card = require('./card')
const _ = require('lodash')
const col = require('colors')

const heart = col.bgWhite('♥️ ')
const spade = col.bgWhite('♠️ ')
const diamond = col.bgWhite('♦️ ')
const club = col.bgWhite('♣️ ')

const ace = ['A',11]
const king = ['K',10]
const queen = ['Q',10]
const jack = ['J',10]

const suits = [heart,spade,diamond,club]
const ranks = [ace,2,3,4,5,6,7,8,9,10,jack,queen,king]

const createDeck = () => {
  let deck = []
  for (let i = 0; i < 4; i++) {
    let tempDeck = []
    suits.forEach(suit => {
      ranks.forEach(rank => {
          tempDeck.push(new Card(suit, rank))
          tempDeck = _.shuffle(tempDeck)
      })
    })
    deck = deck.concat(tempDeck)
  }

  return deck
}

module.exports = createDeck
