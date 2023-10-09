import express from 'express';
const app = express();
const port = process.env.PORT || 3000; // Corrected the case of "PORT"

const productsList = [
  {
    "product_id": "12345",
    "product_name": "Widget",
    "description": "A high-quality widget with multiple features.",
    "price": 19.99,
    "category": "Widgets",
    "in_stock": true
  },
  {
    "product_id": "67890",
    "product_name": "Gadget",
    "description": "An advanced gadget for tech enthusiasts.",
    "price": 49.99,
    "category": "Gadgets",
    "in_stock": false
  },
  {
    "product_id": "54321",
    "product_name": "Tool",
    "description": "A versatile tool for DIY projects.",
    "price": 29.99,
    "category": "Tools",
    "in_stock": true
  }
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/products', (req, res) => {
  if (req.query.search) {
    setTimeout(() => {
      const searchedProduct = req.query.search;
      const result = productsList.filter((product) => product.product_name.includes(searchedProduct)); 
      res.status(200).send(result);
      return;
    }, 2000);
  } else {
    setTimeout(() => {
      res.status(200).send(productsList);
    }, 3000);
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
