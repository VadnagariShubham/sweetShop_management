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

    searchSweets({ name, category, minPrice, maxPrice }) {
    return Object.values(this.sweets).filter(s => {
      return (
        (!name || s.name.toLowerCase().includes(name.toLowerCase())) &&
        (!category || s.category.toLowerCase() === category.toLowerCase()) &&
        (!minPrice || s.price >= minPrice) &&
        (!maxPrice || s.price <= maxPrice)
      );
    });
  }

   sortSweets(property = 'name', order = 'asc') {
    const validProperties = ['name', 'category', 'price', 'quantity'];
    if (!validProperties.includes(property)) {
      throw new Error(`Invalid property to sort by. Valid properties: ${validProperties.join(', ')}`);
    }
    const sorted = Object.values(this.sweets).slice().sort((a, b) => {
      if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
      if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  restockSweet(id, quantity) {
    const sweet = this.sweets[id];
    if (!sweet) throw new Error("Sweet not found");
    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) throw new Error("Quantity must be positive");
    sweet.quantity += quantity;
  }





}

module.exports = sweetshop;