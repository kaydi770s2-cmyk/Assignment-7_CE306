const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const app = express();
app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myproductdb')
  .then(() => console.log('MongoDB Connected successfully!'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// 1. POST /products - เพิ่มสินค้าใหม่
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. GET /products - ดึงรายการสินค้าทั้งหมด
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET /products/available - แสดงสินค้าที่มี stock > 0
app.get('/products/available', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. GET /products/search/:keyword - ค้นหาสินค้าตาม keyword
app.get('/products/search/:keyword', async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET /products/category/:category - กรองสินค้าตามหมวดหมู่
app.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. GET /products/:id - ดึงข้อมูลสินค้าชิ้นเดียวตาม ID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. PATCH /products/:id/add-stock - เพิ่มจำนวน stock
app.patch('/products/:id/add-stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'จำนวน amount ต้องมากกว่า 0' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'ไม่พบสินค้าตาม id ที่ระบุ' });
    }

    product.stock += amount;
    await product.save();
    res.json({ message: 'เพิ่ม stock สำเร็จ', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. DELETE /products/:id - ลบสินค้า
app.delete('/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));