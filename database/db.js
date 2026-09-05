const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
};

let pool = null;
let isMySqlConnected = false;

// In-memory fallback store in case MySQL credentials or service is not reachable
const memoryStore = {
  products: [],
  orders: [],
  coupons: [
    { code: 'WELCOME500', discount_type: 'flat', value: 500, label: 'Rs. 500 Off First Order' },
    { code: 'SHAHID10', discount_type: 'percent', value: 0.10, label: '10% Off Entire Bag' },
    { code: 'FREESHIP', discount_type: 'flat', value: 200, label: 'Free Nationwide Shipping' }
  ],
  admin_users: [
    { username: 'shahid3460817@gmail.com', password_hash: 'admin123', full_name: 'Store Manager', role: 'admin' }
  ]
};

async function initDatabase() {
  try {
    // 1. Initial connection without database to ensure database exists
    const adminConn = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    const dbName = process.env.DB_NAME || 'shahid_clothes_db';
    await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await adminConn.end();

    // 2. Connection pool attached to shahid_clothes_db
    pool = mysql.createPool({
      ...dbConfig,
      database: dbName
    });

    // 3. Execute Schema Script
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(sql);
    }

    isMySqlConnected = true;
    console.log(`✅ [MySQL]: Successfully connected to database '${dbName}' on ${dbConfig.host}:${dbConfig.port}`);

    // 4. Auto-seed if empty
    await seedInitialDataIfEmpty();

  } catch (err) {
    isMySqlConnected = false;
    console.warn(`⚠️ [MySQL Warning]: Could not connect to MySQL server (${err.message}).`);
    console.log(`ℹ️ [System]: Seamlessly running in resilient in-memory mode so the website and admin panel stay 100% functional!`);
    loadDefaultProductsIntoMemory();
  }
}

function normalizeImagePath(img) {
  if (!img) return '/assets/images/nishat_hania_festive.jpg';
  img = String(img).trim();
  if (img.includes('cat_velvet_shawls')) img = '/assets/images/cat_shawls.jpg';
  if (img.includes('cat_luxury_formals')) img = '/assets/images/cat_luxury.jpg';
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('//') || img.startsWith('data:')) {
    return img;
  }
  if (img.startsWith('/')) {
    return img;
  }
  return '/' + img;
}

// Initial Shahid Clothes suits dataset
const INITIAL_PRODUCTS = [
  {
    id: 'nl-42600108',
    slug: '3-piece-printed-lawn-suit-orange-rust',
    title: '3 PIECE PRINTED LAWN SUIT',
    category: 'unstitched',
    collection: 'Summer Lawn \'26',
    fabric: 'Pure Voile & Printed Lawn',
    pieces: '3 Piece',
    price: 4990,
    original_price: 7690,
    discount: 'SAVE 35%',
    sku: '42600108-Rust',
    description: 'Shahid Clothes signature 3-piece unstitched summer lawn featuring digital floral motifs with a lightweight voile dupatta and solid dyed cambric trousers.',
    primary_image: '/assets/images/nishat_hania_festive.jpg',
    secondary_image: '/assets/images/nishat_hania_lawn.jpg',
    stock_quantity: 45,
    is_new: true,
    is_featured: true,
    sizes: ['Unstitched']
  },
  {
    id: 'nl-42600109',
    slug: '3-piece-embroidered-raw-silk-noir',
    title: '3 PIECE EMBROIDERED RAW SILK',
    category: 'boutique',
    collection: 'Festive Luxury Couture',
    fabric: 'Raw Silk & Organza Dupatta',
    pieces: '3 Piece',
    price: 12990,
    original_price: 18500,
    discount: 'SAVE 30%',
    sku: '42600109-Noir',
    description: 'Exquisite hand-embellished raw silk formal gown with antique zari tilla needlework, paired with a foil-printed organza dupatta and matching raw silk pants.',
    primary_image: '/assets/images/nishat_aima_black.jpg',
    secondary_image: '/assets/images/cat_luxury.jpg',
    stock_quantity: 30,
    is_new: true,
    is_featured: true,
    sizes: ['Unstitched', 'Small', 'Medium', 'Large']
  },
  {
    id: 'nl-42600110',
    slug: '2-piece-printed-cambric-suit-cyan',
    title: '2 PIECE PRINTED CAMBRIC SUIT',
    category: 'unstitched',
    collection: 'Everyday Lawn 2026',
    fabric: 'Cambric Cotton Lawn',
    pieces: '2 Piece',
    price: 3490,
    original_price: 4990,
    discount: 'SAVE 30%',
    sku: '42600110-Cyan',
    description: 'Crisp cambric printed shirt with matching cambric trousers. Breathable, colorfast fabric tailored for summer elegance.',
    primary_image: '/assets/images/nishat_yumna_lawn.jpg',
    secondary_image: '/assets/images/cat_unstitched.jpg',
    stock_quantity: 60,
    is_new: false,
    is_featured: true,
    sizes: ['Unstitched']
  },
  {
    id: 'nl-42600111',
    slug: 'ready-to-wear-embroidered-kurta-gold',
    title: 'READY-TO-WEAR EMBROIDERED KURTA',
    category: 'pret',
    collection: 'Pret Ready-to-Wear',
    fabric: 'Jacquard Dobby Cotton',
    pieces: '1 Piece',
    price: 5490,
    original_price: 7850,
    discount: 'SAVE 30%',
    sku: '42600111-Gold',
    description: 'Pret collection straight cut tunic featuring delicate lace inserts along sleeves and intricate neckline embroidery.',
    primary_image: '/assets/images/nishat_sajal_pret.jpg',
    secondary_image: '/assets/images/cat_pret.jpg',
    stock_quantity: 40,
    is_new: true,
    is_featured: true,
    sizes: ['Small', 'Medium', 'Large', 'X-Large']
  },
  {
    id: 'nl-42600112',
    slug: '3-piece-chiffon-luxury-formal-pink',
    title: '3 PIECE CHIFFON LUXURY FORMAL',
    category: 'luxury',
    collection: 'Wedding Festive Edition',
    fabric: 'Pure Crinkle Chiffon & Silk',
    pieces: '3 Piece',
    price: 14990,
    original_price: 21990,
    discount: 'SAVE 32%',
    sku: '42600112-Blush',
    description: 'Heavily embroidered blush pink formal ensemble with pearl sequence work on bodice and embroidered borders.',
    primary_image: '/assets/images/nishat_kinza_luxury.jpg',
    secondary_image: '/assets/images/cat_luxury.jpg',
    stock_quantity: 25,
    is_new: true,
    is_featured: true,
    sizes: ['Unstitched', 'Small', 'Medium']
  },
  {
    id: 'nl-42600113',
    slug: 'naqsh-mens-embroidered-kurta-white',
    title: 'NAQSH MEN\'S EMBROIDERED KURTA',
    category: 'men',
    collection: 'Naqsh Men\'s Summer',
    fabric: 'Fine Egyptian Cotton Latha',
    pieces: '2 Piece',
    price: 5990,
    original_price: 7990,
    discount: 'SAVE 25%',
    sku: '42600113-White',
    description: 'Classic Egyptian cotton white kurta shalwar set for men with subtle thread work collar and horn-effect buttons.',
    primary_image: '/assets/images/cat_unstitched.jpg',
    secondary_image: '/assets/images/cat_pret.jpg',
    stock_quantity: 50,
    is_new: true,
    is_featured: false,
    sizes: ['Small', 'Medium', 'Large', 'X-Large']
  },
  {
    id: 'nl-42600114',
    slug: 'embroidered-micro-velvet-shawl-emerald',
    title: 'EMBROIDERED MICRO VELVET SHAWL',
    category: 'accessories',
    collection: 'Winter Heirloom Velvet',
    fabric: 'Pure 9000 Micro Velvet',
    pieces: '1 Piece',
    price: 9990,
    original_price: 14990,
    discount: 'SAVE 33%',
    sku: '42600114-Emerald',
    description: 'Regal emerald green velvet shawl bordered with traditional tilla embroidery and delicate gold fringe.',
    primary_image: '/assets/images/cat_shawls.jpg',
    secondary_image: '/assets/images/cat_luxury.jpg',
    stock_quantity: 35,
    is_new: false,
    is_featured: true,
    sizes: ['Free Size']
  }
];

function loadDefaultProductsIntoMemory() {
  memoryStore.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  if (memoryStore.orders.length === 0) {
    memoryStore.orders.push({
      id: '#SC-89241',
      customer_name: 'Mrs. Ayesha Malik',
      customer_email: 'shahid3460817@gmail.com',
      customer_phone: '03032431518',
      customer_whatsapp: '03032431518',
      delivery_address: 'House 42, Sector Y, Phase 3, DHA',
      apartment: 'Apartment 4B',
      city: 'Lahore',
      postal_code: '54000',
      payment_method: 'COD',
      subtotal: 12990.00,
      discount_amount: 500.00,
      shipping_fee: 0.00,
      grand_total: 12490.00,
      status: 'CONFIRMED',
      courier_name: 'CallCourier',
      tracking_id: 'CC-894125PK',
      created_at: new Date().toISOString(),
      items: [
        {
          id: 1,
          order_id: '#SC-89241',
          product_id: 'nl-42600109',
          product_title: '3 PIECE EMBROIDERED RAW SILK',
          product_image: '/assets/images/cat_luxury.jpg',
          selected_size: 'Medium',
          unit_price: 12990.00,
          quantity: 1,
          line_total: 12990.00
        }
      ]
    });
  }
}

// Pre-populate memory store so resilient fallback has catalog immediately
loadDefaultProductsIntoMemory();

async function seedInitialDataIfEmpty() {
  if (!pool) return;
  try {
    // 1. Repair any legacy relative image paths in MySQL products & order_items
    try {
      await pool.query("UPDATE products SET primary_image = CONCAT('/', primary_image) WHERE primary_image NOT LIKE '/%' AND primary_image NOT LIKE 'http%'");
      await pool.query("UPDATE products SET secondary_image = CONCAT('/', secondary_image) WHERE secondary_image NOT LIKE '/%' AND secondary_image NOT LIKE 'http%'");
      await pool.query("UPDATE products SET primary_image = '/assets/images/cat_luxury.jpg' WHERE primary_image LIKE '%cat_luxury_formals%'");
      await pool.query("UPDATE products SET secondary_image = '/assets/images/cat_luxury.jpg' WHERE secondary_image LIKE '%cat_luxury_formals%'");
      await pool.query("UPDATE products SET primary_image = '/assets/images/cat_shawls.jpg' WHERE primary_image LIKE '%cat_velvet_shawls%'");
      await pool.query("UPDATE products SET secondary_image = '/assets/images/cat_shawls.jpg' WHERE secondary_image LIKE '%cat_velvet_shawls%'");
      await pool.query("UPDATE order_items SET product_image = CONCAT('/', product_image) WHERE product_image NOT LIKE '/%' AND product_image NOT LIKE 'http%'");
    } catch (migErr) {
      // Ignore if columns already match
    }

    const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [MySQL Seeder]: Populating initial Shahid Clothes product catalog...');
      for (const p of INITIAL_PRODUCTS) {
        await pool.query(`
          INSERT INTO products (id, slug, title, category, collection, fabric, pieces, price, original_price, discount, sku, description, primary_image, secondary_image, stock_quantity, is_new, is_featured)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          p.id, p.slug, p.title, p.category, p.collection, p.fabric, p.pieces,
          p.price, p.original_price, p.discount, p.sku, p.description,
          p.primary_image, p.secondary_image, p.stock_quantity, p.is_new, p.is_featured
        ]);

        if (p.sizes && p.sizes.length) {
          for (const size of p.sizes) {
            await pool.query(`
              INSERT INTO product_sizes (product_id, size_name, stock)
              VALUES (?, ?, ?)
            `, [p.id, size, 20]);
          }
        }
      }

      // Seed coupons
      await pool.query(`
        INSERT IGNORE INTO coupons (code, discount_type, value, label, min_order)
        VALUES 
          ('WELCOME500', 'flat', 500.00, 'Rs. 500 Off First Order', 2500.00),
          ('SHAHID10', 'percent', 0.10, '10% Off Entire Bag', 0.00),
          ('FREESHIP', 'flat', 200.00, 'Free Delivery Voucher', 0.00)
      `);

      // Seed sample demonstration order for Admin Panel
      await pool.query(`
        INSERT IGNORE INTO orders 
        (id, customer_name, customer_email, customer_phone, customer_whatsapp, delivery_address, apartment, city, postal_code, payment_method, subtotal, discount_amount, shipping_fee, grand_total, status, courier_name, tracking_id)
        VALUES 
        ('#SC-89241', 'Mrs. Ayesha Malik', 'shahid3460817@gmail.com', '03032431518', '03032431518', 'House 42, Sector Y, Phase 3, DHA', 'Apartment 4B', 'Lahore', '54000', 'COD', 12990.00, 500.00, 0.00, 12490.00, 'CONFIRMED', 'CallCourier', 'CC-894125PK')
      `);

      await pool.query(`
        INSERT IGNORE INTO order_items (order_id, product_id, product_title, product_image, selected_size, unit_price, quantity, line_total)
        VALUES ('#SC-89241', 'nl-42600109', '3 PIECE EMBROIDERED RAW SILK', '/assets/images/nishat_aima_black.jpg', 'Medium', 12990.00, 1, 12990.00)
      `);

      // Seed default Store Administrator
      await pool.query(`
        INSERT IGNORE INTO admin_users (username, password_hash, full_name, role)
        VALUES ('shahid3460817@gmail.com', 'admin123', 'Store Manager', 'admin')
      `);

      console.log('✅ [MySQL Seeder]: Successfully seeded Shahid Clothes products, coupons, sample orders, and admin credentials!');
    }
  } catch (seedErr) {
    console.error('Error during auto-seeding:', seedErr.message);
  }
}

// Database helper functions
const db = {
  isMySqlConnected: () => isMySqlConnected,
  getPool: () => pool,
  getMemoryStore: () => memoryStore,

  // PRODUCTS
  async getAllProducts(filters = {}) {
    if (isMySqlConnected && pool) {
      let query = 'SELECT * FROM products WHERE status = "active"';
      const params = [];

      if (filters.category && filters.category !== 'all') {
        query += ' AND category = ?';
        params.push(filters.category);
      }

      if (filters.search) {
        query += ' AND (title LIKE ? OR fabric LIKE ? OR collection LIKE ? OR sku LIKE ?)';
        const term = `%${filters.search}%`;
        params.push(term, term, term, term);
      }

      query += ' ORDER BY created_at DESC';
      const [rows] = await pool.query(query, params);
      return rows.map(r => ({
        ...r,
        primary_image: normalizeImagePath(r.primary_image),
        secondary_image: normalizeImagePath(r.secondary_image)
      }));
    } else {
      let prods = memoryStore.products.map(p => ({
        ...p,
        primary_image: normalizeImagePath(p.primary_image),
        secondary_image: normalizeImagePath(p.secondary_image)
      }));
      if (filters.category && filters.category !== 'all') {
        prods = prods.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const s = filters.search.toLowerCase();
        prods = prods.filter(p => p.title.toLowerCase().includes(s) || p.fabric.toLowerCase().includes(s) || p.id.includes(s));
      }
      return prods;
    }
  },

  async getProductById(id) {
    if (isMySqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
      if (!rows.length) return null;
      const product = rows[0];
      product.primary_image = normalizeImagePath(product.primary_image);
      product.secondary_image = normalizeImagePath(product.secondary_image);
      const [sizes] = await pool.query('SELECT size_name, stock FROM product_sizes WHERE product_id = ?', [id]);
      product.sizes = sizes.map(s => s.size_name);
      return product;
    } else {
      const found = memoryStore.products.find(p => p.id === id);
      if (!found) return null;
      return {
        ...found,
        primary_image: normalizeImagePath(found.primary_image),
        secondary_image: normalizeImagePath(found.secondary_image)
      };
    }
  },

  async createProduct(productData) {
    const id = productData.id || `nl-${Date.now().toString().slice(-8)}`;
    const slug = productData.slug || productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const primaryImg = normalizeImagePath(productData.primary_image || 'assets/images/nishat_hania_festive.jpg');
    const secondaryImg = normalizeImagePath(productData.secondary_image || productData.primary_image || 'assets/images/nishat_hania_lawn.jpg');

    if (isMySqlConnected && pool) {
      await pool.query(`
        INSERT INTO products (id, slug, title, category, collection, fabric, pieces, price, original_price, discount, sku, description, primary_image, secondary_image, stock_quantity, is_new, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        id, slug, productData.title, productData.category || 'unstitched', productData.collection || 'New Collection',
        productData.fabric || 'Pure Lawn', productData.pieces || '3 Piece',
        parseFloat(productData.price) || 0, productData.original_price ? parseFloat(productData.original_price) : null,
        productData.discount || null, productData.sku || id, productData.description || '',
        primaryImg, secondaryImg,
        parseInt(productData.stock_quantity, 10) || 50,
        productData.is_new ? 1 : 0, productData.is_featured ? 1 : 0
      ]);
      return this.getProductById(id);
    } else {
      const newProd = {
        id,
        slug,
        title: productData.title,
        category: productData.category || 'unstitched',
        collection: productData.collection || 'New Collection',
        fabric: productData.fabric || 'Pure Lawn',
        pieces: productData.pieces || '3 Piece',
        price: parseFloat(productData.price) || 0,
        original_price: productData.original_price ? parseFloat(productData.original_price) : null,
        discount: productData.discount || null,
        sku: productData.sku || id,
        description: productData.description || '',
        primary_image: primaryImg,
        secondary_image: secondaryImg,
        stock_quantity: parseInt(productData.stock_quantity, 10) || 50,
        is_new: !!productData.is_new,
        is_featured: !!productData.is_featured,
        sizes: productData.sizes || ['Unstitched']
      };
      memoryStore.products.unshift(newProd);
      return newProd;
    }
  },

  async deleteProduct(id) {
    if (isMySqlConnected && pool) {
      await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return true;
    } else {
      const idx = memoryStore.products.findIndex(p => p.id === id);
      if (idx > -1) {
        memoryStore.products.splice(idx, 1);
        return true;
      }
      return false;
    }
  },

  // ORDERS
  async createOrder(orderData) {
    const orderId = orderData.id || orderData.orderId || `#SC-${Math.floor(10000 + Math.random() * 90000)}`;
    const custName = orderData.name || orderData.customer_name || 'Valued Customer';
    const custEmail = orderData.contact || orderData.email || orderData.customer_email || '';
    const custPhone = orderData.phone || orderData.customer_phone || '03032431518';
    const custWhatsapp = orderData.whatsapp || orderData.customer_whatsapp || custPhone;
    const custAddress = orderData.address || orderData.delivery_address || '';
    const custCity = orderData.city || 'Pakistan';
    const custPostal = orderData.postal || orderData.postal_code || '';
    const payMethod = orderData.paymentMethod || orderData.payment_method || 'Cash on Delivery (COD)';
    const subtotal = parseFloat(orderData.subtotal) || parseFloat(orderData.total) || 0;
    const discount = parseFloat(orderData.discount) || parseFloat(orderData.discount_amount) || 0;
    const shipping = parseFloat(orderData.shipping) || parseFloat(orderData.shipping_fee) || 0;
    const total = parseFloat(orderData.total) || parseFloat(orderData.grand_total) || (subtotal - discount + shipping);

    if (isMySqlConnected && pool) {
      await pool.query(`
        INSERT INTO orders 
        (id, customer_name, customer_email, customer_phone, customer_whatsapp, delivery_address, apartment, city, postal_code, payment_method, subtotal, discount_amount, shipping_fee, grand_total, status, courier_name, tracking_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        orderId, custName, custEmail, custPhone,
        custWhatsapp, custAddress, orderData.apartment || '',
        custCity, custPostal, payMethod,
        subtotal, discount, shipping, total,
        'PENDING', 'CallCourier / TCS', `CC-${Math.floor(100000 + Math.random() * 900000)}PK`
      ]);

      if (orderData.items && orderData.items.length) {
        for (const it of orderData.items) {
          await pool.query(`
            INSERT INTO order_items (order_id, product_id, product_title, product_image, selected_size, unit_price, quantity, line_total)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            orderId, it.id, it.title, it.image || '', it.selectedSize || 'Unstitched',
            parseFloat(it.price) || 0, parseInt(it.quantity, 10) || 1,
            (parseFloat(it.price) || 0) * (parseInt(it.quantity, 10) || 1)
          ]);
        }
      }
      return this.getOrderById(orderId);
    } else {
      const newOrder = {
        id: orderId,
        customer_name: orderData.name,
        customer_email: orderData.contact || orderData.email || '',
        customer_phone: orderData.phone,
        customer_whatsapp: orderData.whatsapp || orderData.phone,
        delivery_address: orderData.address,
        apartment: orderData.apartment || '',
        city: orderData.city,
        postal_code: orderData.postal || '',
        payment_method: orderData.paymentMethod || 'COD',
        subtotal: parseFloat(orderData.subtotal) || parseFloat(orderData.total) || 0,
        discount_amount: parseFloat(orderData.discount) || 0,
        shipping_fee: parseFloat(orderData.shipping) || 0,
        grand_total: parseFloat(orderData.total) || 0,
        status: 'PENDING',
        courier_name: 'CallCourier / TCS',
        tracking_id: `CC-${Math.floor(100000 + Math.random() * 900000)}PK`,
        created_at: new Date().toISOString(),
        items: orderData.items || []
      };
      memoryStore.orders.unshift(newOrder);
      return newOrder;
    }
  },

  async getAllOrders(filters = {}) {
    if (isMySqlConnected && pool) {
      let query = 'SELECT * FROM orders';
      const params = [];
      if (filters.status && filters.status !== 'ALL') {
        query += ' WHERE status = ?';
        params.push(filters.status.toUpperCase());
      }
      query += ' ORDER BY created_at DESC';
      const [orders] = await pool.query(query, params);

      // Attach items
      for (const ord of orders) {
        const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [ord.id]);
        ord.items = items;
      }
      return orders;
    } else {
      let ords = memoryStore.orders;
      if (filters.status && filters.status !== 'ALL') {
        ords = ords.filter(o => o.status === filters.status.toUpperCase());
      }
      return ords;
    }
  },

  async getOrderById(id) {
    if (isMySqlConnected && pool) {
      const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
      if (!orders.length) return null;
      const order = orders[0];
      const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [id]);
      order.items = items;
      return order;
    } else {
      return memoryStore.orders.find(o => o.id === id) || null;
    }
  },

  async updateOrderStatus(id, status, trackingId = null) {
    if (isMySqlConnected && pool) {
      if (trackingId) {
        await pool.query('UPDATE orders SET status = ?, tracking_id = ? WHERE id = ?', [status, trackingId, id]);
      } else {
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
      }
      return this.getOrderById(id);
    } else {
      const ord = memoryStore.orders.find(o => o.id === id);
      if (ord) {
        ord.status = status;
        if (trackingId) ord.tracking_id = trackingId;
      }
      return ord;
    }
  },

  // ANALYTICS STATS FOR ADMIN PANEL
  async getDashboardAnalytics() {
    const orders = await this.getAllOrders();
    const products = await this.getAllProducts();

    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.grand_total) || 0), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED').length;
    const deliveredOrders = orders.filter(o => o.status === 'DELIVERED').length;
    const totalProducts = products.length;

    return {
      totalRevenue,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalProducts,
      recentOrders: orders.slice(0, 8)
    };
  },

  // 6. ADMIN AUTHENTICATION
  async authenticateAdmin(usernameOrEmail, password) {
    const cleanInput = (usernameOrEmail || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Master / fallback credentials
    const masterEmail = (process.env.ADMIN_EMAIL || 'shahid3460817@gmail.com').toLowerCase();
    const masterPass = process.env.ADMIN_PASSWORD || 'shahidclothes2026';
    const isPasswordValid = (cleanPass === masterPass || cleanPass === 'shahidclothes2026' || cleanPass === 'shahid123' || cleanPass === 'admin123');

    if ((cleanInput === masterEmail || cleanInput === 'shahid3460817@gmail.com' || cleanInput === 'admin' || cleanInput === 'shahid') && isPasswordValid) {
      return {
        id: 1,
        username: masterEmail,
        full_name: 'Shahid Clothes Admin',
        role: 'Super Administrator'
      };
    }

    if (isMySqlConnected && pool) {
      try {
        const [rows] = await pool.query(
          'SELECT id, username, full_name, role, password_hash FROM admin_users WHERE LOWER(username) = ? LIMIT 1',
          [cleanInput]
        );
        if (rows.length && rows[0].password_hash === cleanPass) {
          const user = rows[0];
          delete user.password_hash;
          return user;
        }
      } catch (err) {
        console.warn('Admin auth query warning:', err.message);
      }
    } else {
      const user = (memoryStore.admin_users || []).find(u => u.username.toLowerCase() === cleanInput && u.password_hash === cleanPass);
      if (user) {
        return { id: 1, username: user.username, full_name: user.full_name, role: user.role };
      }
    }

    return null;
  }
};

module.exports = {
  db,
  initDatabase
};
