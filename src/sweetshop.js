const Sweet = require('./sweet');

class SweetShop {
  constructor() {
    this.sweets = {};
  }

  // Add a new sweet
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

    this.sweets[id] = new Sweet(id, name, category, price, quantity);
  }

  // Delete a sweet by ID
  deleteSweet(id) {
    if (!this.sweets[id]) {
      throw new Error(`Sweet with ID ${id} not found`);
    }
    delete this.sweets[id];
  }

  // Purchase a sweet (reduce quantity)
  purchaseSweet(id, quantity) {
    const sweet = this.sweets[id];
    if (!sweet) {
      throw new Error("Sweet not found");
    }
    if (quantity < 0 || sweet.quantity < quantity) {
      throw new Error("Insufficient stock");
    }
    sweet.quantity -= quantity;
  }

  // Restock a sweet (increase quantity)
  restockSweet(id, quantity) {
    const sweet = this.sweets[id];
    if (!sweet) {
      throw new Error("Sweet not found");
    }
    if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
      throw new Error("Quantity must be a positive number");
    }
    sweet.quantity += quantity;
  }

  // Search sweets by optional filters
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

  // Sort sweets by property and order
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

  // View all sweets
  viewSweets() {
    return Object.values(this.sweets);
  }
}

module.exports = SweetShop;
