const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const compression = require('compression');
const { db, initDatabase } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. High-Performance Gzip & Brotli Compression (Reduces payload size by ~75%)
app.use(compression({
  threshold: 1024,
  level: 6
}));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. High-Performance Static Asset Caching (7 days for images, 2 hours for scripts/css)
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '7d',
  etag: true,
  lastModified: true
}));
app.use('/admin', express.static(path.join(__dirname, 'admin'), {
  maxAge: '2h',
  etag: true,
  lastModified: true
}));
app.use(express.static(path.join(__dirname), {
  maxAge: '2h',
  etag: true,
  lastModified: true
}));

// ==================== REST API ROUTES ====================

// 1. Health check & DB Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    mysql_connected: db.isMySqlConnected(),
    store_name: process.env.STORE_NAME || 'Shahid Clothes',
    timestamp: new Date().toISOString()
  });
});

// 2. Products API
app.get('/api/products', async (req, res) => {
  try {
    const filters = {
      category: req.query.category || 'all',
      search: req.query.search || ''
    };
    const products = await db.getAllProducts(filters);
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { title, price, category } = req.body;
    if (!title || !price) {
      return res.status(400).json({ success: false, message: 'Title and price are required.' });
    }
    const product = await db.createProduct(req.body);
    res.status(201).json({ success: true, message: 'Product created successfully in MySQL', data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleted = await db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found to delete' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Orders API
app.post('/api/orders', async (req, res) => {
  try {
    const { name, phone, city, address, items, total } = req.body;
    if (!name || !phone || !city || !address || !items || !items.length) {
      return res.status(400).json({ success: false, message: 'Missing required order fields.' });
    }
    const order = await db.createOrder(req.body);
    res.status(201).json({
      success: true,
      message: 'Order placed successfully in MySQL database!',
      data: order
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const filters = {
      status: req.query.status || 'ALL'
    };
    const orders = await db.getAllOrders(filters);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status, tracking_id } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = await db.updateOrderStatus(req.params.id, status, tracking_id);
    res.json({ success: true, message: `Order status updated to ${status}`, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Analytics API
app.get('/api/analytics', async (req, res) => {
  try {
    const stats = await db.getDashboardAnalytics();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Admin Authentication API
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const loginIdentifier = email || username;

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your administrator Gmail / username and password.'
      });
    }

    const admin = await db.authenticateAdmin(loginIdentifier, password);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login credentials! Please check your administrator Gmail and password.'
      });
    }

    const token = 'shahid_adm_' + Buffer.from(`${admin.username}:${Date.now()}`).toString('base64');
    res.json({
      success: true,
      message: 'Access granted! Welcome to Shahid Clothes Management Portal.',
      token,
      admin: {
        username: admin.username,
        full_name: admin.full_name || 'Store Manager',
        role: admin.role || 'Super Admin'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin Route Direct Landing
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Fallback to Storefront index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Initialize database & start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`🚀 [Server]: E-Commerce Server & API running at http://localhost:${PORT}`);
    console.log(`🛍️ [Storefront]: http://localhost:${PORT}`);
    console.log(`👑 [Admin Portal]: http://localhost:${PORT}/admin`);
    console.log(`🗄️ [MySQL Status]: ${db.isMySqlConnected() ? 'CONNECTED TO DATABASE' : 'IN-MEMORY RESILIENT MODE'}`);
    console.log(`================================================================`);
  });
}).catch(err => {
  console.error('Fatal initialization error:', err);
});
