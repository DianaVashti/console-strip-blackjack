const col = require('colors')

const printHand = (arr, player) => {
  let output = ""
    if (player == "p") {
      output += "Your Hand \n "
      for ( let i = 0; i < arr.length; i++ ) {
        output += arr[i].print() + " \n "
      }
      output = col.green(output)
    } else if (player == "d") {
        output += "Dealer's Hand \n "
        for ( let i = 0; i < arr.length; i++ ) {
          output += arr[i].print() + " \n "
        }
        output = col.magenta(output)
    } else  {
      output += "Dealer's Hand \n "
      output += " 🂾 \n "
      for ( let i = 1; i < arr.length; i++ ) {
        output += arr[i].print() + " \n "
      }
      output = col.magenta(output)
    }
  return output
}

module.exports = {printHand}
