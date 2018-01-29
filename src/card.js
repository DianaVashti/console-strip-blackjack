class Card {
  constructor (suit, rank) {
    this.suit = suit
    this.rank = rank
  }
  print () {
    let rankReturn = ""
    if (isNaN(this.rank)) {
      rankReturn = this.rank[0]
      return rankReturn + ' of ' + this.suit
    } else {
      return this.rank + ' of ' + this.suit
    }
	}
}

module.exports = Card
