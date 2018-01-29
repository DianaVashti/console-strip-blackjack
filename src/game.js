const diag = require('readline-sync')
const col = require('colors')
const round = require('./round')

//Gamestart text w/ rules
console.log(col.green("Welcome to strip blackjack 🤘 😜 🤘\n"))
console.log ("You start with $20, a shirt(👕 ), pants(👖 ) and shoes(👞 )\nwhile ($ == true) {\'You cannot bet clothes\'} \nif ($ == false) {\'Bet your clothes\'} \nNaked & broke = YOU LOSE!\n")

setTimeout(function(){
  diag.question(col.bgWhite.black(" Hit return to start game!"))
  round.spacer()
  playGame()
}, 2500)

const playGame = () => {
  while( !round.roundCycle() ) {
    round.spacer()
    console.log(col.bgWhite.black(" Next round:"))
    round.spacer()
  }
    console.log( col.red('Game over\n') )
}
