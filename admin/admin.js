// ==========================================================================
// SHAHID CLOTHES • INTERNATIONAL ADMIN CONTROLLER
// Handles real-time MySQL database sync, orders, products, and WhatsApp alerts
// ==========================================================================

const API_BASE = '/api';

// Image URL Resolver to guarantee images load correctly from backend without broken links
function resolveImgUrl(url) {
  if (!url) return '/assets/images/nishat_hania_festive.jpg';
  url = String(url).trim();
  if (url.includes('cat_velvet_shawls')) return '/assets/images/cat_shawls.jpg';
  if (url.includes('cat_luxury_formals')) return '/assets/images/cat_luxury.jpg';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/')) {
    return url;
  }
  return '/' + url;
}

// State Store
let adminState = {
  isAuthenticated: false,
  currentUser: null,
  activeTab: 'dashboard',
  orders: [],
  knownOrderIds: new Set(),
  filteredOrders: [],
  products: [],
  filteredProducts: [],
  currentOrderFilter: 'ALL',
  currentCategoryFilter: 'all',
  analytics: null,
  isMySqlConnected: false
};

// ==================== 1. INITIALIZATION & AUTHENTICATION ====================
document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

async function initAdmin() {
  await checkServerHealth();
  checkAuthSession();

  // Handle URL hash navigation
  const hash = window.location.hash.replace('#', '');
  if (['dashboard', 'orders', 'products', 'settings'].includes(hash)) {
    switchTab(hash);
  }
}

// Check stored session on page load
function checkAuthSession() {
  const saved = localStorage.getItem('shahid_admin_auth') || sessionStorage.getItem('shahid_admin_auth');
  if (saved) {
    try {
      const auth = JSON.parse(saved);
      if (auth && auth.token) {
        setAuthenticated(auth);
        return;
      }
    } catch (e) {
      console.warn('Session parse error:', e);
    }
  }
  showLoginScreen();
}

function showLoginScreen() {
  adminState.isAuthenticated = false;
  stopLiveOrderWatcher();
  const gate = document.getElementById('adminLoginGate');
  const app = document.getElementById('adminApp');
  if (gate) {
    gate.style.display = 'flex';
    gate.classList.remove('hidden');
  }
  if (app) app.style.display = 'none';
}

function setAuthenticated(auth) {
  adminState.isAuthenticated = true;
  adminState.currentUser = auth.admin || { username: 'shahid3460817@gmail.com', full_name: 'Shahid Clothes Admin' };

  // Update UI user greeting & role
  const userGreeting = document.getElementById('sidebarUserName');
  const userRole = document.getElementById('sidebarUserRole');
  if (userGreeting) userGreeting.textContent = adminState.currentUser.full_name || 'Store Manager';
  if (userRole) userRole.textContent = adminState.currentUser.role || 'Admin Portal';

  // Smoothly transition from Login Gate to Admin Dashboard
  const gate = document.getElementById('adminLoginGate');
  const app = document.getElementById('adminApp');
  if (gate) {
    gate.classList.add('hidden');
    setTimeout(() => { gate.style.display = 'none'; }, 400);
  }
  if (app) app.style.display = 'flex';

  // Load all initial store data
  refreshAdminData(false);

  // Start background live order listener for real-time customer orders
  startLiveOrderWatcher();
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const emailInput = document.getElementById('adminLoginEmail');
  const passInput = document.getElementById('adminLoginPassword');
  const rememberCheckbox = document.getElementById('adminRememberMe');
  const submitBtn = document.getElementById('adminLoginSubmitBtn');
  const alertBanner = document.getElementById('adminLoginAlert');
  const alertMsg = document.getElementById('adminLoginAlertMsg');

  if (alertBanner) alertBanner.style.display = 'none';

  const email = (emailInput ? emailInput.value : '').trim();
  const password = (passInput ? passInput.value : '').trim();

  if (!email || !password) {
    if (alertBanner) {
      alertMsg.textContent = 'Please enter your administrator Gmail / username and password.';
      alertBanner.style.display = 'flex';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
  }

  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      const authData = {
        token: data.token,
        admin: data.admin,
        loginTime: new Date().toISOString()
      };

      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('shahid_admin_auth', JSON.stringify(authData));
      } else {
        sessionStorage.setItem('shahid_admin_auth', JSON.stringify(authData));
      }

      showToast(`Welcome back, ${data.admin.full_name || 'Administrator'}!`, 'success');
      setAuthenticated(authData);
    } else {
      if (alertBanner) {
        alertMsg.textContent = data.message || 'Invalid administrator credentials. Please check your details.';
        alertBanner.style.display = 'flex';
      }
      showToast(data.message || 'Invalid credentials', 'error');
    }
  } catch (err) {
    console.error('Login error:', err);
    if (alertBanner) {
      alertMsg.textContent = 'Server connection error. Please ensure the backend is running.';
      alertBanner.style.display = 'flex';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Sign In to Admin Portal</span> <i class="fa-solid fa-arrow-right"></i>';
    }
  }
}

function handleAdminLogout() {
  if (!confirm('Are you sure you want to sign out of the Admin Portal?')) return;
  localStorage.removeItem('shahid_admin_auth');
  sessionStorage.removeItem('shahid_admin_auth');
  stopLiveOrderWatcher();
  showToast('Signed out from Admin Portal', 'info');
  showLoginScreen();
}

function togglePasswordVisibility() {
  const input = document.getElementById('adminLoginPassword');
  const icon = document.getElementById('pwdEyeIcon');
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-regular fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-regular fa-eye';
  }
}

// ==================== REAL-TIME LIVE ORDER WATCHER ====================
let liveOrderWatcherInterval = null;

function startLiveOrderWatcher() {
  if (liveOrderWatcherInterval) clearInterval(liveOrderWatcherInterval);

  // Poll every 2.5 seconds for newly placed customer orders
  liveOrderWatcherInterval = setInterval(async () => {
    if (!adminState.isAuthenticated) return;
    try {
      const res = await fetch(`${API_BASE}/orders`);
      const json = await res.json();
      if (!json.success || !json.data) return;

      const serverOrders = json.data;

      // If first run, populate known IDs
      if (adminState.knownOrderIds.size === 0) {
        serverOrders.forEach(o => adminState.knownOrderIds.add(o.id));
        adminState.orders = serverOrders;
        filterOrders();
        return;
      }

      // Detect any new orders
      const newOrders = serverOrders.filter(o => !adminState.knownOrderIds.has(o.id));
      if (newOrders.length > 0) {
        // Play notification chime
        playNotificationChime();

        // Register new IDs
        newOrders.forEach(o => adminState.knownOrderIds.add(o.id));
        adminState.orders = serverOrders;

        // Show toast alert for newest order
        const newest = newOrders[0];
        const total = Number(newest.grand_total || newest.total || 0).toLocaleString('en-PK');
        showToast(`🔔 New Order ${newest.id} from ${escapeHtml(newest.customer_name || 'Customer')} in ${newest.city || 'Pakistan'} (Rs. ${total})!`, 'success');

        // Update all dashboard metrics & orders tables immediately
        await fetchAnalytics();
        filterOrders();

        // Flash highlight rows
        setTimeout(() => {
          document.querySelectorAll(`tr[data-order-id="${newest.id}"]`).forEach(tr => {
            tr.classList.add('new-order-flash');
            setTimeout(() => tr.classList.remove('new-order-flash'), 4000);
          });
        }, 150);
      }
    } catch (err) {
      // Quiet background polling failure
    }
  }, 2500);
}

function stopLiveOrderWatcher() {
  if (liveOrderWatcherInterval) {
    clearInterval(liveOrderWatcherInterval);
    liveOrderWatcherInterval = null;
  }
}

// Synthesized audio chime using Web Audio API (works natively across all browsers)
function playNotificationChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // AudioContext blocked
  }
}

// Check server health & MySQL status
async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    adminState.isMySqlConnected = data.mysql_connected;

    const dbDot = document.querySelector('.db-status-dot');
    const dbLabel = document.getElementById('dbStatusLabel');
    const settingsDb = document.getElementById('settingsDbStatus');

    if (data.mysql_connected) {
      if (dbDot) { dbDot.className = 'db-status-dot online'; dbDot.title = 'MySQL Connected'; }
      if (dbLabel) dbLabel.textContent = 'MySQL Online';
      if (settingsDb) settingsDb.innerHTML = '<i class="fa-solid fa-circle-check"></i> Connected to MySQL (shahid_clothes_db)';
    } else {
      if (dbDot) { dbDot.className = 'db-status-dot online'; dbDot.title = 'Resilient Mode Active'; }
      if (dbLabel) dbLabel.textContent = 'Resilient Memory';
      if (settingsDb) settingsDb.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Active (Resilient In-Memory Mode)';
    }
  } catch (err) {
    console.warn('Health check error:', err);
  }
}

// Refresh all admin data
async function refreshAdminData(showToastAlert = true) {
  const syncBtn = document.querySelector('.topbar-btn i.fa-rotate');
  if (syncBtn) syncBtn.classList.add('fa-spin');

  try {
    await Promise.all([
      fetchAnalytics(),
      fetchOrders(),
      fetchProducts()
    ]);
    if (showToastAlert) {
      showToast('Admin data synchronized with MySQL', 'success');
    }
  } catch (err) {
    console.error('Failed to sync data:', err);
    if (showToastAlert) {
      showToast('Sync warning: check network', 'error');
    }
  } finally {
    if (syncBtn) {
      setTimeout(() => syncBtn.classList.remove('fa-spin'), 600);
    }
  }
}

// ==================== 2. NAVIGATION & TABS ====================
function switchTab(tabId, event) {
  if (event) event.preventDefault();
  adminState.activeTab = tabId;

  // Update URL hash
  window.location.hash = tabId;

  // Update nav links
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${tabId}`) {
      link.classList.add('active');
    }
  });

  // Update tab sections
  document.querySelectorAll('.admin-tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  const activeContent = document.getElementById(`tab${capitalize(tabId)}`);
  if (activeContent) {
    activeContent.classList.add('active');
  }

  // Update titles
  const titleMap = {
    dashboard: { title: 'Dashboard Overview', sub: 'Real-time store metrics, customer orders, and MySQL inventory' },
    orders: { title: 'Customer Orders & COD Shipments', sub: 'Manage live Cash on Delivery shipments, courier tracking, and verification' },
    products: { title: 'Product Inventory & Catalog', sub: 'Manage active suits, retail prices, fabric specifications, and stock' },
    settings: { title: 'MySQL & System Configuration', sub: 'Inspect database pools, nationwide courier integrations, and server status' }
  };

  const current = titleMap[tabId] || titleMap.dashboard;
  const pageTitle = document.getElementById('adminPageTitle');
  const pageSubtitle = document.getElementById('adminPageSubtitle');
  if (pageTitle) pageTitle.textContent = current.title;
  if (pageSubtitle) pageSubtitle.textContent = current.sub;

  // Close sidebar on mobile
  closeSidebar();
}

function toggleSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open');
}

function closeSidebar() {
  const sidebar = document.getElementById('adminSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

// ==================== 3. ANALYTICS & DASHBOARD ====================
async function fetchAnalytics() {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    const json = await res.json();
    if (json.success && json.data) {
      adminState.analytics = json.data;
      renderAnalytics(json.data);
    }
  } catch (err) {
    console.error('Error fetching analytics:', err);
  }
}

function renderAnalytics(data) {
  const kpiRevenue = document.getElementById('kpiRevenue');
  const kpiTotalOrders = document.getElementById('kpiTotalOrders');
  const kpiPendingOrders = document.getElementById('kpiPendingOrders');
  const kpiProductsCount = document.getElementById('kpiProductsCount');
  const kpiDelivered = document.getElementById('kpiDeliveredSummary');
  const sidebarBadge = document.getElementById('sidebarOrdersBadge');

  if (kpiRevenue) kpiRevenue.textContent = `Rs. ${Number(data.totalRevenue || 0).toLocaleString('en-PK')}`;
  if (kpiTotalOrders) kpiTotalOrders.textContent = data.totalOrders || 0;
  if (kpiPendingOrders) kpiPendingOrders.textContent = data.pendingOrders || 0;
  if (kpiProductsCount) kpiProductsCount.textContent = data.totalProducts || 0;
  if (kpiDelivered) kpiDelivered.textContent = `${data.deliveredOrders || 0} Delivered`;
  if (sidebarBadge) sidebarBadge.textContent = data.pendingOrders || data.totalOrders || 0;

  // Render recent orders table
  renderRecentOrdersTable(data.recentOrders || []);
}

function renderRecentOrdersTable(orders) {
  const tbody = document.getElementById('recentOrdersTableBody');
  if (!tbody) return;

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-loading">No orders placed yet. Orders made at checkout will appear here instantly!</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(ord => {
    const statusClass = getStatusClass(ord.status);
    const total = Number(ord.grand_total || ord.total || 0).toLocaleString('en-PK');
    return `
      <tr data-order-id="${ord.id}">
        <td><strong>${ord.id}</strong></td>
        <td>
          <div><strong>${escapeHtml(ord.customer_name || 'Valued Guest')}</strong></div>
          <small style="color:#64748B;">${escapeHtml(ord.customer_phone || '')}</small>
        </td>
        <td>${escapeHtml(ord.city || 'N/A')}</td>
        <td><strong>Rs. ${total}</strong></td>
        <td><span class="status-pill ${statusClass}">${ord.status || 'PENDING'}</span></td>
        <td>
          <div class="action-btn-group">
            <button class="tbl-action-btn" title="View Details" onclick="openOrderModal('${ord.id}')">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="tbl-action-btn whatsapp-btn" title="WhatsApp Customer" onclick="sendWhatsAppMessage('${ord.id}')">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// ==================== 4. ORDERS MANAGEMENT ====================
async function fetchOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    const json = await res.json();
    if (json.success) {
      adminState.orders = json.data || [];
      filterOrders();
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}

function filterOrdersByStatus(status, btnElement) {
  adminState.currentOrderFilter = status;

  // If clicked from quick action or external, switch to tab
  switchTab('orders');

  // Update active pill button
  document.querySelectorAll('.status-tab').forEach(b => b.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    document.querySelectorAll('.status-tab').forEach(b => {
      if (b.textContent.trim().toUpperCase() === status || (status === 'ALL' && b.textContent.includes('All'))) {
        b.classList.add('active');
      }
    });
  }

  filterOrders();
}

function searchOrders(query) {
  const q = (query || '').toLowerCase().trim();
  if (!q) {
    adminState.filteredOrders = adminState.orders.filter(o => 
      adminState.currentOrderFilter === 'ALL' ? true : o.status === adminState.currentOrderFilter
    );
  } else {
    adminState.filteredOrders = adminState.orders.filter(o => {
      const matchStatus = adminState.currentOrderFilter === 'ALL' ? true : o.status === adminState.currentOrderFilter;
      const matchQuery = (o.id && o.id.toLowerCase().includes(q)) ||
                         (o.customer_name && o.customer_name.toLowerCase().includes(q)) ||
                         (o.customer_phone && o.customer_phone.includes(q)) ||
                         (o.city && o.city.toLowerCase().includes(q)) ||
                         (o.delivery_address && o.delivery_address.toLowerCase().includes(q));
      return matchStatus && matchQuery;
    });
  }
  renderOrdersTable();
}

function filterOrders() {
  if (adminState.currentOrderFilter === 'ALL') {
    adminState.filteredOrders = [...adminState.orders];
  } else {
    adminState.filteredOrders = adminState.orders.filter(o => o.status === adminState.currentOrderFilter);
  }
  renderOrdersTable();
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;

  if (adminState.filteredOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-loading">No orders found matching this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminState.filteredOrders.map(ord => {
    const statusClass = getStatusClass(ord.status);
    const dateStr = ord.created_at ? new Date(ord.created_at).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
    const total = Number(ord.grand_total || ord.total || 0).toLocaleString('en-PK');
    const itemsCount = (ord.items && ord.items.length) || 1;

    return `
      <tr data-order-id="${ord.id}">
        <td>
          <strong>${ord.id}</strong>
          <div style="font-size:0.7rem; color:#94A3B8;">${itemsCount} item(s)</div>
        </td>
        <td style="white-space:nowrap; font-size:0.75rem; color:#64748B;">${dateStr}</td>
        <td>
          <div style="font-weight:600;">${escapeHtml(ord.customer_name || 'Guest')}</div>
          <div style="font-size:0.75rem; color:#475569;">${escapeHtml(ord.customer_phone || '')}</div>
        </td>
        <td>
          <div style="font-size:0.78rem; max-width:220px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${escapeHtml(ord.delivery_address || '')}">
            ${escapeHtml(ord.delivery_address || 'N/A')}, ${escapeHtml(ord.city || '')}
          </div>
        </td>
        <td>
          <span style="font-size:0.72rem; font-weight:700; background:#F1F5F9; padding:2px 8px; border-radius:4px;">
            ${ord.payment_method || 'COD'}
          </span>
        </td>
        <td><strong>Rs. ${total}</strong></td>
        <td>
          <select class="status-select-sm" onchange="handleOrderStatusChange('${ord.id}', this.value)">
            <option value="PENDING" ${ord.status === 'PENDING' ? 'selected' : ''}>PENDING</option>
            <option value="CONFIRMED" ${ord.status === 'CONFIRMED' ? 'selected' : ''}>CONFIRMED</option>
            <option value="DISPATCHED" ${ord.status === 'DISPATCHED' ? 'selected' : ''}>DISPATCHED</option>
            <option value="DELIVERED" ${ord.status === 'DELIVERED' ? 'selected' : ''}>DELIVERED</option>
            <option value="CANCELLED" ${ord.status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option>
          </select>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="tbl-action-btn" title="View Full Details" onclick="openOrderModal('${ord.id}')">
              <i class="fa-solid fa-file-invoice"></i>
            </button>
            <button class="tbl-action-btn whatsapp-btn" title="WhatsApp Customer" onclick="sendWhatsAppMessage('${ord.id}')">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function handleOrderStatusChange(orderId, newStatus) {
  try {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Order ${orderId} updated to ${newStatus}`, 'success');
      // Update local state
      const order = adminState.orders.find(o => o.id === orderId);
      if (order) order.status = newStatus;
      await fetchAnalytics();
      filterOrders();
    } else {
      showToast(data.message || 'Could not update status', 'error');
    }
  } catch (err) {
    console.error('Failed to update status:', err);
    showToast('Failed to update order status', 'error');
  }
}

// Order Modal Detail
async function openOrderModal(orderId) {
  const modal = document.getElementById('orderModalOverlay');
  const title = document.getElementById('modalOrderId');
  const dateSpan = document.getElementById('modalOrderDate');
  const body = document.getElementById('modalOrderBody');
  const footer = document.getElementById('modalOrderFooter');

  if (!modal) return;

  modal.classList.add('open');
  if (body) body.innerHTML = '<div class="table-loading">Fetching order details from MySQL...</div>';

  try {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId)}`);
    const json = await res.json();

    if (!json.success || !json.data) {
      if (body) body.innerHTML = '<div class="table-loading" style="color:red;">Order not found.</div>';
      return;
    }

    const order = json.data;
    if (title) title.textContent = `Order ${order.id}`;
    if (dateSpan) dateSpan.textContent = order.created_at ? new Date(order.created_at).toLocaleString() : '';

    const itemsHtml = (order.items || []).map(it => `
      <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #F1F5F9;">
        <img src="${resolveImgUrl(it.product_image || it.image)}" onerror="this.onerror=null;this.src='/assets/images/nishat_hania_festive.jpg';" style="width:48px; height:48px; border-radius:6px; object-fit:cover; border:1px solid #E2E8F0;" alt="item">
        <div style="flex:1;">
          <strong style="font-size:0.85rem; display:block;">${escapeHtml(it.product_title || it.title || 'Shahid Clothes Suit')}</strong>
          <span style="font-size:0.75rem; color:#64748B;">Size: ${escapeHtml(it.selected_size || it.selectedSize || 'Unstitched')} | Qty: ${it.quantity}</span>
        </div>
        <div style="font-weight:700; font-size:0.85rem;">Rs. ${(Number(it.unit_price || it.price || 0) * (it.quantity || 1)).toLocaleString('en-PK')}</div>
      </div>
    `).join('') || '<p style="color:#94A3B8;">No itemized products found.</p>';

    if (body) {
      body.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; background:#F8FAFC; padding:12px; border-radius:8px;">
          <div>
            <strong style="font-size:0.75rem; color:#64748B; text-transform:uppercase; letter-spacing:0.05em;">Customer Information</strong>
            <p style="margin:4px 0 2px; font-weight:700;">${escapeHtml(order.customer_name || 'Guest')}</p>
            <p style="margin:0; font-size:0.8rem; color:#334155;">📞 Phone: ${escapeHtml(order.customer_phone || 'N/A')}</p>
            <p style="margin:0; font-size:0.8rem; color:#334155;">💬 WhatsApp: ${escapeHtml(order.customer_whatsapp || order.customer_phone || 'N/A')}</p>
          </div>
          <div>
            <strong style="font-size:0.75rem; color:#64748B; text-transform:uppercase; letter-spacing:0.05em;">Shipping Destination</strong>
            <p style="margin:4px 0 2px; font-size:0.82rem;">${escapeHtml(order.delivery_address || '')} ${order.apartment ? `(${escapeHtml(order.apartment)})` : ''}</p>
            <p style="margin:0; font-size:0.8rem; font-weight:600; color:#0F172A;">City: ${escapeHtml(order.city || 'Pakistan')}</p>
            <p style="margin:0; font-size:0.75rem; color:#64748B;">Tracking: <code>${escapeHtml(order.tracking_id || 'Generating...')}</code> (${escapeHtml(order.courier_name || 'CallCourier')})</p>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <strong style="font-size:0.78rem; text-transform:uppercase; color:#64748B; display:block; margin-bottom:8px;">Purchased Items</strong>
          ${itemsHtml}
        </div>

        <div style="background:#FFFFFF; border:1px solid #E2E8F0; padding:12px; border-radius:8px; font-size:0.82rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#64748B;">Subtotal</span>
            <span>Rs. ${Number(order.subtotal || order.grand_total || 0).toLocaleString('en-PK')}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#64748B;">Discount</span>
            <span style="color:#10B981;">- Rs. ${Number(order.discount_amount || 0).toLocaleString('en-PK')}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#64748B;">Shipping (Nationwide COD)</span>
            <span>${Number(order.shipping_fee || 0) === 0 ? 'FREE' : 'Rs. ' + order.shipping_fee}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px dashed #E2E8F0; font-weight:800; font-size:0.95rem; color:#0F172A;">
            <span>Grand Total (${order.payment_method || 'Cash on Delivery'})</span>
            <span>Rs. ${Number(order.grand_total || 0).toLocaleString('en-PK')}</span>
          </div>
        </div>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <button type="button" class="btn btn-outline" onclick="closeOrderModal()">Close</button>
        <button type="button" class="btn btn-whatsapp" onclick="sendWhatsAppMessage('${order.id}')">
          <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
        </button>
        <select class="status-select-sm" style="padding:8px 12px; font-size:0.82rem;" onchange="handleOrderStatusChange('${order.id}', this.value); closeOrderModal();">
          <option value="PENDING" ${order.status === 'PENDING' ? 'selected' : ''}>Status: PENDING</option>
          <option value="CONFIRMED" ${order.status === 'CONFIRMED' ? 'selected' : ''}>Status: CONFIRMED</option>
          <option value="DISPATCHED" ${order.status === 'DISPATCHED' ? 'selected' : ''}>Status: DISPATCHED</option>
          <option value="DELIVERED" ${order.status === 'DELIVERED' ? 'selected' : ''}>Status: DELIVERED</option>
          <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Status: CANCELLED</option>
        </select>
      `;
    }

  } catch (err) {
    console.error('Error opening order modal:', err);
    if (body) body.innerHTML = '<div class="table-loading" style="color:red;">Error loading order details.</div>';
  }
}

function closeOrderModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('orderModalOverlay');
  if (modal) modal.classList.remove('open');
}

// WhatsApp direct order communication
function sendWhatsAppMessage(orderId) {
  const order = adminState.orders.find(o => o.id === orderId);
  if (!order) {
    showToast('Order not found', 'error');
    return;
  }

  let phone = (order.customer_whatsapp || order.customer_phone || '').replace(/[^0-9]/g, '');
  if (phone.startsWith('03')) {
    phone = '92' + phone.substring(1);
  } else if (!phone.startsWith('92') && phone.length === 10) {
    phone = '92' + phone;
  }

  const grandTotal = Number(order.grand_total || 0).toLocaleString('en-PK');
  const message = `Assalam-o-Alaikum ${order.customer_name || 'Valued Customer'},%0A%0AThank you for shopping at *Shahid Clothes Online*.%0A%0A📦 *Order ID:* ${order.id}%0A💰 *Amount Payable:* Rs. ${grandTotal} (Cash on Delivery)%0A🚚 *Current Status:* ${order.status}%0A📍 *Delivery City:* ${order.city}%0A%0AWe are preparing your order for prompt dispatch. If you have any inquiries or customization requests, feel free to reply right here!%0A%0ARegards,%0A*Shahid Clothes Official Support*`;

  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function openWhatsAppBroadcaster(event) {
  if (event) event.preventDefault();
  const phone = prompt('Enter customer WhatsApp phone number (e.g. 03032431518):', '03032431518');
  if (!phone) return;

  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('03')) cleanPhone = '92' + cleanPhone.substring(1);

  const defaultMsg = encodeURIComponent('Assalam-o-Alaikum from Shahid Clothes Official! How can we assist you with your order today?');
  window.open(`https://wa.me/${cleanPhone}?text=${defaultMsg}`, '_blank');
}

// ==================== 5. PRODUCT CATALOG MANAGEMENT ====================
async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    const json = await res.json();
    if (json.success) {
      adminState.products = json.data || [];
      filterProducts();
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

function filterProductsByCategory(cat) {
  adminState.currentCategoryFilter = cat;
  filterProducts();
}

function searchProducts(query) {
  const q = (query || '').toLowerCase().trim();
  adminState.filteredProducts = adminState.products.filter(p => {
    const matchCat = adminState.currentCategoryFilter === 'all' ? true : p.category.toLowerCase() === adminState.currentCategoryFilter.toLowerCase();
    const matchQuery = !q || (p.title && p.title.toLowerCase().includes(q)) ||
                             (p.fabric && p.fabric.toLowerCase().includes(q)) ||
                             (p.sku && p.sku.toLowerCase().includes(q)) ||
                             (p.id && p.id.toLowerCase().includes(q)) ||
                             (p.collection && p.collection.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });
  renderProductsTable();
}

function filterProducts() {
  if (adminState.currentCategoryFilter === 'all') {
    adminState.filteredProducts = [...adminState.products];
  } else {
    adminState.filteredProducts = adminState.products.filter(p => p.category.toLowerCase() === adminState.currentCategoryFilter.toLowerCase());
  }
  renderProductsTable();
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;

  if (adminState.filteredProducts.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-loading">No products found in this category. Click "+ Add New Suit" to upload one to MySQL!</td></tr>`;
    return;
  }

  tbody.innerHTML = adminState.filteredProducts.map(prod => {
    const price = Number(prod.price || 0).toLocaleString('en-PK');
    const origPrice = prod.original_price ? `Rs. ${Number(prod.original_price).toLocaleString('en-PK')}` : '-';
    const stock = prod.stock_quantity !== undefined ? prod.stock_quantity : 50;
    const isLowStock = stock <= 10;
    const imgUrl = resolveImgUrl(prod.primary_image);

    return `
      <tr>
        <td>
          <div class="tbl-product-cell">
            <img class="tbl-product-thumb" src="${imgUrl}" onerror="this.onerror=null;this.src='/assets/images/nishat_hania_festive.jpg';" alt="${escapeHtml(prod.title)}" onclick="window.open('${imgUrl}', '_blank')" title="Click to view full photoshoot image">
            <div class="tbl-product-info">
              <strong>${escapeHtml(prod.title)}</strong>
              <span>${escapeHtml(prod.collection || 'Shahid Clothes Collection')} • ${escapeHtml(prod.pieces || '3 Piece')}</span>
            </div>
          </div>
        </td>
        <td>
          <div><code style="font-weight:700; color:#0F172A; background:#F1F5F9; padding:2px 6px; border-radius:4px;">${escapeHtml(prod.sku || prod.id)}</code></div>
          <small style="color:#64748B; font-size:0.72rem; display:block; margin-top:3px;">ID: ${escapeHtml(prod.id)}</small>
        </td>
        <td><span style="text-transform:capitalize; font-size:0.75rem; font-weight:600;">${escapeHtml(prod.category)}</span></td>
        <td><span style="font-size:0.75rem; color:#475569;">${escapeHtml(prod.fabric || 'Pure Lawn')}</span></td>
        <td>
          <div style="font-weight:700;">Rs. ${price}</div>
          <small style="text-decoration:line-through; color:#94A3B8; font-size:0.7rem;">${origPrice}</small>
        </td>
        <td>
          <span style="font-size:0.75rem; font-weight:700; color:${isLowStock ? '#EF4444' : '#10B981'};">
            ${stock} units
          </span>
        </td>
        <td>
          <span class="status-pill status-delivered">Active</span>
        </td>
        <td>
          <div class="action-btn-group">
            <button class="tbl-action-btn" title="View Storefront Item" onclick="window.open('/#category=${encodeURIComponent(prod.category)}', '_blank')">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button class="tbl-action-btn delete-btn" title="Delete Product" onclick="handleDeleteProduct('${prod.id}', '${escapeHtml(prod.title)}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Add Product Modal
function openAddProductModal(event) {
  if (event) event.preventDefault();
  const form = document.getElementById('productForm');
  if (form) form.reset();
  const modal = document.getElementById('productModalOverlay');
  if (modal) modal.classList.add('open');
}

function closeProductModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('productModalOverlay');
  if (modal) modal.classList.remove('open');
}

async function handleSaveProduct(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('saveProdSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving to MySQL...';
  }

  const rawPrimary = document.getElementById('formProdPrimaryImg').value.trim();
  const rawSecondary = document.getElementById('formProdSecondaryImg').value.trim();

  const payload = {
    title: document.getElementById('formProdTitle').value.trim(),
    category: document.getElementById('formProdCategory').value,
    collection: document.getElementById('formProdCollection').value.trim() || "Summer Lawn '26",
    fabric: document.getElementById('formProdFabric').value.trim() || 'Pure Voile & Printed Lawn',
    pieces: document.getElementById('formProdPieces').value.trim() || '3 Piece',
    price: parseFloat(document.getElementById('formProdPrice').value) || 0,
    original_price: document.getElementById('formProdOriginalPrice').value ? parseFloat(document.getElementById('formProdOriginalPrice').value) : null,
    discount: document.getElementById('formProdDiscount').value.trim() || null,
    stock_quantity: parseInt(document.getElementById('formProdStock').value, 10) || 50,
    primary_image: resolveImgUrl(rawPrimary || 'assets/images/nishat_hania_festive.jpg'),
    secondary_image: resolveImgUrl(rawSecondary || rawPrimary || 'assets/images/nishat_hania_lawn.jpg'),
    description: document.getElementById('formProdDesc').value.trim() || '',
    is_new: true,
    is_featured: true
  };

  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.success) {
      showToast('Product successfully saved in MySQL database!', 'success');
      closeProductModal();
      await fetchProducts();
      await fetchAnalytics();
      switchTab('products');
    } else {
      showToast(data.message || 'Error saving product', 'error');
    }
  } catch (err) {
    console.error('Error saving product:', err);
    showToast('Failed to save product to server', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Save to MySQL Database';
    }
  }
}

async function handleDeleteProduct(prodId, title) {
  if (!confirm(`Are you sure you want to delete "${title}" from the catalog and database?`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(prodId)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Product deleted successfully`, 'success');
      await fetchProducts();
      await fetchAnalytics();
    } else {
      showToast(data.message || 'Could not delete product', 'error');
    }
  } catch (err) {
    console.error('Error deleting product:', err);
    showToast('Failed to delete product', 'error');
  }
}

// ==================== 6. TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info');
  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==================== UTILITIES ====================
function getStatusClass(status) {
  switch ((status || '').toUpperCase()) {
    case 'CONFIRMED': return 'status-confirmed';
    case 'DISPATCHED': return 'status-dispatched';
    case 'DELIVERED': return 'status-delivered';
    case 'CANCELLED': return 'status-cancelled';
    case 'PENDING':
    default: return 'status-pending';
  }
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
