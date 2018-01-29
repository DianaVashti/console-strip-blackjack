const createDeck = require('./deck')
const diag = require('readline-sync')
const col = require('colors')
const hand = require('./hand')
const _ = require('lodash')

let playerHand = []
let dealerHand = []
let playerBank = [20,["👕","👖","👞"]]
let dealerBank = []
let globalDeck = createDeck()
let contPlaying = true
let playerWin = ''
let bet = 0
let endGame = false
let isTie = false
let hitStay = ''

//Each round is executed in the roundCycle function:
const roundCycle = () => {
  playerHand = []
  dealerHand = []
  isTie = false
  contPlaying = true
  endGame = false
  bet = 0
  displayBank()
  placeBet()
  dealInit()
  console.log(hand.printHand(dealerHand))
  console.log(hand.printHand(playerHand, "p"))
  checkBJ( handTotal(playerHand) )
  hitOrStay()
  if(isTie) return endGame
  bettingOutcome()
  promptToContinue()
  return endGame
}

//RoundCycle functions in order of operation:
const displayBank = () => {
  let output = "You have $"
  const printBank = (item) => {
    if (typeof item == "number") {
      output += item + ", "
    } else {
      for (let i = 0; i < item.length; i++) {
        output += item[i] + "  "
      }
    }
  }
  playerBank.forEach(printBank)
  output += "\n"
  return console.log(output)
}

const placeBet = () => {
  if (playerBank[0] > 0) {
    bet = diag.question("Place your bet: \n$")
    spacer()
    while (bet == 0) {
      bet = diag.question("\nYou cannot bet $0.\nPlace your bet again: \n$")
    }
    while (isNaN(bet)) {
      bet = diag.question("Invalid input, please enter a number.\nPlace your bet again: \n$")
    }
    if (bet > playerBank[0]) {
      bet = diag.question("\nYou don't have enough money to make that bet.\nHow foolish you are.\nPlace your bet again: \n$")
    }
    bet = parseInt(bet)
  } else if (playerBank[0] == 0) {
    console.log("You are out of money, you bet your " + playerBank[1][0] + "\n")
    bet = playerBank[1].shift()
  }
}

const dealInit = () => {
  checkDeckLength()
  addCard(playerHand)
  addCard(playerHand)
  addCard(dealerHand)
  addCard(dealerHand)
}

const checkBJ = (handTotal) => {
  if (handTotal == 21) {
    console.log(col.bgWhite.black(" 🎉 🕸 🎯 🎱 💛  BLACKJACK! You win 🎉 💥 👍 🐓 ⚡️  "))
    determineWinner()
    playerWin = true
  }
}

const hitOrStay = () => {
  while (contPlaying == true) {
    hitStay = diag.question("Hit or Stay? (h/s): ")
    spacer()
    if (hitStay !== 'h' && hitStay !== 's') {
      console.log("Invalid input, try again")
      continue
    } else if (hitStay == 'h') {
      addCard(playerHand)
      console.log(hand.printHand(dealerHand))
      console.log(hand.printHand(playerHand, "p"))
      if (handTotal(playerHand) > 21) {
        console.log('Bust! Sorry, you lose')
        determineWinner()
        playerWin = false
      }
    } else if (hitStay == 's') {
      console.log("Dealer's turn:\n")
      dealerLogic(playerHand, dealerHand)
      console.log(hand.printHand(dealerHand, "d"))
      determineWinner()
    }
  }
}

const bettingOutcome = () => {
  if (playerWin == true) {
    if (isNaN(bet)) {
      playerBank[1].unshift(bet)
      if (dealerBank.length > 0) {
        playerBank[1].unshift(dealerBank.shift())
      } else {
        playerBank[0] = _.add(playerBank[0], 10)
      }
    } else {
      playerBank[0] = _.add(playerBank[0], bet)
    }
  } else if (playerWin == false) {
    if (playerBank[1].length == 0) {
      console.log(col.bgYellow.black("\n     You ain't got no money take your broke ass home!\n\n                 Game over"))
      process.exit()
    }
    if (isNaN(bet)) {
      dealerBank.unshift(bet)
    } else {
      playerBank[0] = _.subtract(playerBank[0], bet)
    }
  }
}

const promptToContinue = () => {
  let end = diag.question("\nHit return to continue to next round\nBored? Type 'y' to end game: ")
  spacer()
  endGame = ( end === 'y' )
}

//Additional Functions
const spacer = () => {
    console.log(" ")
}

const dealerLogic = (playerHand, dealerHand) => {
  while (handTotal(playerHand) > handTotal(dealerHand)) {
    addCard(dealerHand)
  }
}

const determineWinner = () => {
  if (handTotal(playerHand) < handTotal(dealerHand) && handTotal(dealerHand) <= 21) {
    console.log("House wins ☹️ ")
    playerWin = false
  }
  else if ((handTotal(playerHand) > handTotal(dealerHand) && (handTotal(dealerHand) < 21 && handTotal(playerHand) < 21)) ||  handTotal(playerHand) <= 21 && handTotal(dealerHand) > 21) {
    console.log("You win!")
    playerWin = true
  } else if (handTotal(playerHand) == handTotal(dealerHand)) {
    console.log(col.bgBlue.white(" Tie, try again "))
    if (isNaN(bet)) {
      playerBank[1].unshift(bet)
    }
    isTie = true
  }
  contPlaying = false
}

const checkDeckLength = () => {
  if (globalDeck.length < 10) {
    globalDeck = createDeck()
  }
}

const addCard = (hand) => {
  hand.push(globalDeck.shift())
}

const handTotal = (hand) => {
    let total = 0
    for (let card of hand) {
      if (isNaN(card.rank)) {
        total += card.rank[1]
      } else {
        total += card.rank
      }
    }
    for (let aceSearch of hand) {
      if (total > 21) {
        if (aceSearch.rank[0] == "A") {
          total -= 10
        }
      }
    }
  return total
}

//Tests
const theDeckLength = () => {
  return globalDeck.length
}

module.exports = {
  theDeckLength,
  dealInit,
  playerHand,
  roundCycle,
  addCard,
  spacer
}
