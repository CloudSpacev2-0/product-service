const express = require('express');
const cors = require('cors');

const products = [
  { id: 1, name: 'Azure Mug', price: 12.5, stock: 40 },
  { id: 2, name: 'Cloud Hoodie', price: 45.0, stock: 15 },
  { id: 3, name: 'Container Sticker Pack', price: 4.99, stock: 200 },
  { id: 4, name: 'Terraform Notebook', price: 9.75, stock: 60 },
];

const app = express();
app.use(cors());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'product-service' }));

app.get('/api/products', (_req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`product-service listening on ${port}`));
}

module.exports = app;
