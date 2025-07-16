const sweet = require('../src/sweet');

class sweetshop {
  constructor() {
    this.sweets = {}
  }
  addSweet(id, name, category, price, quantity) {

    if (this.sweets[id]) {
      throw new Error("Sweet already exists");
    }
   
    if (typeof price !== 'number' || isNaN(price)) {
      throw new Error('Price must be a valid number');
    }

   
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    this.sweets[id] = new sweet(id,name,category,price,quantity);
  }

   deleteSweet(id) {
  if (!this.sweets[id]) throw new Error(`Sweet with ID ${id} not found`);
  delete this.sweets[id];
}

  purchaseSweet(id, quantity) {
    const sweet = this.sweets[id];
    if (!sweet) throw new Error("Sweet not found");
    if (sweet.quantity < quantity || quantity < 0) throw new Error("Insufficient stock");
    sweet.quantity -= quantity;
  }



}

module.exports = sweetshop;