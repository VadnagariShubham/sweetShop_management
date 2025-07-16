const sweet = require('../src/sweet');

class sweetshop {
  constructor() {
    this.sweets = {}
  }
  addSweet(id, name, category, price, quantity) {

    if (this.sweets[id]) {
      throw new Error("Sweet already exists");
    }
    // Validate price is numeric
    if (typeof price !== 'number' || isNaN(price)) {
      throw new Error('Price must be a valid number');
    }

    // Validate quantity is not negative
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    this.sweets[id] = new sweet(id,name,category,price,quantity);
  }



}

module.exports = sweetshop;