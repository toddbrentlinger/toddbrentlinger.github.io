// Card constructor
function Card(rank, suit, isFaceUp) {
    var rank = ["ACE", "TWO", "THREE", "FOUR", "FIVE", "SIX",
        "SEVEN", "EIGHT", "NINE", "TEN", "JACK", "QUEEN", "KING"];

    var suit = ["CLUBS", "DIAMONDS", "HEARTS", "SPADES"];

    this.rank = rank;
    this.suit = suit;
    this.isFaceUp = isFaceUp;
}

// Get value of card
Card.prototype.getValue = function () {
    // if a card is face down, its value is 0
    var value = 0;
    if (this.isFaceUp) {
        // value is number showing on card
        value = this.rank;
        // value is 10 for face cards
        if (value > 10) {
            value = 10;
        }
    }

    return value;
}

// Flip card
Card.prototype.flip = function () {
    this.isFaceUp = !this.isFaceUp;
}

// Hand constructor; inherits Card object
function Hand() {
    Card.call(this, rank, suit, isFaceUp);

    this.cards = [];
}

Hand.prototype = Object.create(Card.prototype);

Hand.prototype.constructor = Hand;

// Add Card to Hand
Hand.prototype.add = function (pCard) {
    this.cards.push(pCard);
}

// Clear cards from Hand
Hand.prototype.clear = function () {
    this.cards = [];
}

// Get total value of cards in Hand
Hand.prototype.getTotal = function () {
    // if no cards in hand, return 0
    if (this.cards.length === 0) return 0;

    // if first card has a value of 0, then card is face down; return 0
    if (this.cards[0].getValue() === 0) return 0;

    // add up card values, treat each as 1
    var total = this.cards.reduce(function (a, b) {
        return a + b;
    });

    // determine if hand contains an ace
    var containsAce = this.cards.every(function (currCard) {
        return currCard.getValue !== "ACE";
    });

    // if hand contains ace and total is low enough, treat ace as 11
    if (containsAce && total <= 11) {
        // add only 10 since we've alrady added 1 for the ace
        total += 10;
    }

    return total;
}

// GenericPlayer constructor; inherits Hand object