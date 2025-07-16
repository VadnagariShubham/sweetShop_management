const SweetShop = require('../src/sweetshop');

describe('SweetShop', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

   test('throws error on duplicate sweet ID', () => {
    shop.addSweet('1001', 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(() => shop.addSweet('1001', 'gajar halva', 'Vegetable-Based', 30, 15)).toThrow();
  });


 
});