const SweetShop = require('../src/sweetshop');

describe('SweetShop', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });
   //this test cases are for addSweets
   test('throws error on duplicate sweet ID', () => {
    shop.addSweet('1001', 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(() => shop.addSweet('1001', 'gajar halva', 'Vegetable-Based', 30, 15)).toThrow();
  });
   test('adds a sweet', () => {
    shop.addSweet('1001', 'Kaju Katli', 'Nut-Based', 50, 20);
    expect(shop.sweets['1001'].name).toBe('Kaju Katli');
  });


  //this test cases are for deleteSweet
    test('deletes a sweet', () => {
    shop.addSweet('1001', 'Kaju Katli', 'Nut-Based', 50, 20);
    shop.deleteSweet('1001');
    expect(shop.sweets['1001']).toBeUndefined();
  });

 
});