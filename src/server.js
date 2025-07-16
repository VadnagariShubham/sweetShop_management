const express  = require("express");
const app = express();
const path = require("path");

const sweetshop = require("./sweetshop");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(express.urlencoded({ extended: true }));
const shop = new sweetshop();
app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/sweets', (req, res) => {
    const sweets = shop.viewSweets();
    res.render('sweets', { sweets });
  });
  
  app.get('/add', (req, res) => {
    res.render('add');
  });
  
  app.post('/add-sweet', (req, res) => {
    const { id, name, category, price, quantity } = req.body;
    try {
      shop.addSweet(id, name, category, Number(price), Number(quantity));
      res.redirect('/sweets');
    } catch (e) {
      res.send(`Error: ${e.message}`);
    }
  });
  app.post('/delete-sweet/:id', (req, res) => {
    const { id } = req.params;
    try {
      shop.deleteSweet(id);
      res.redirect('/sweets');
    } catch (e) {
      res.send(`Error deleting sweet: ${e.message}`);
    }
  });
  app.post('/purchase-sweet/:id', (req, res) => {
    const { id } = req.params;
    const quantity = parseInt(req.body.quantity, 10);
  
    try {
      shop.purchaseSweet(id, quantity);
      res.redirect('/sweets');
    } catch (e) {
      res.send(`Error purchasing sweet: ${e.message}`);
    }
  });
  app.post('/restock-sweet/:id', (req, res) => {
    const { id } = req.params;
    const quantity = parseInt(req.body.quantity, 10);
  
    try {
      shop.restockSweet(id, quantity);
      res.redirect('/sweets');
    } catch (e) {
      res.send(`Error restocking sweet: ${e.message}`);
    }
  });

  app.get('/search', (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;
    const sweets = shop.searchSweets({
      name,
      category,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined
    });
    res.render('sweets', { sweets });
  });
  
  
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  
  