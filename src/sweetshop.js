const sweet = require('../data/sweet');

class sweetshop {
  constructor() {
    this.sweets = {}
  }
addSweet(id, name, category, price, quantity) {
    const newSweet = new sweet(id, name, category, price, quantity);
    this.sweets[id] = newSweet;
  }

}

module.exports = sweetshop;