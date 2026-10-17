'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  division: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
}

interface Product {
  id: string;
  title: string;
  division: string;
  category: string;
  image: string;
  inStock: boolean;
  featured: boolean;
}

const DEFAULT_ADMIN_EMAIL = 'orient@adminpanel.com';
const DEFAULT_ADMIN_PASS = 'orient@admin#1234';

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-1001',
    name: 'Fahad Al-Otaibi',
    email: 'fahad@aramco-contractor.sa',
    phone: '+966551234567',
    company: 'Al-Khobar EPC Consortium',
    division: 'Mechanical Supply Division',
    message: 'Need urgent quote for 150 pcs of Butterfly Valve Lever Handle SS Disc 6" and carbon steel seamless pipes.',
    date: '2026-10-16 14:20',
    status: 'new',
  },
  {
    id: 'INQ-1002',
    name: 'Tariq Mansoor',
    email: 'tmansoor@redsea-marine.com',
    phone: '+966509876543',
    company: 'Red Sea Marine Logistics',
    division: 'Marine Division',
    message: 'Requesting catalog and pricing for Lifejackets (foam/inflatable) and corded industrial ear-plugs for offshore crew.',
    date: '2026-10-16 11:45',
    status: 'contacted',
  },
  {
    id: 'INQ-1003',
    name: 'Sultan Al-Ghamdi',
    email: 'sultan@jubailfabrication.com',
    phone: '+966567890123',
    company: 'Jubail Industrial Fabrication',
    division: 'Welding Division',
    message: 'Need 12 units of Victor Contender EDGE 2.0 and 20 units of 280PL Series Welding Helmets.',
    date: '2026-10-15 16:30',
    status: 'quoted',
  },
  {
    id: 'INQ-1004',
    name: 'Ahmed Bin Salem',
    email: 'ahmed@riyadh-power.sa',
    phone: '+966543210987',
    company: 'Riyadh Energy Infrastructure',
    division: 'Electrical Division',
    message: 'BOM tender pricing required for Acti9 MCB circuit breakers and Schneider TeSys Giga 185A Contactors.',
    date: '2026-10-15 09:15',
    status: 'new',
  },
];

const INITIAL_PRODUCTS: Product[] = [
  { id: '1', title: 'Butterfly Valve Lever Handle SS Disc 6', division: 'Mechanical Division', category: 'Valves & Fittings', image: '/products/mechanical/butterfly-valve-lever-handle-ss-disc-6.png', inStock: true, featured: true },
  { id: '2', title: 'Carbon Steel Seamless & ERW Pipes', division: 'Mechanical Division', category: 'Pipes & Tubes', image: '/products/mechanical/carbon-steel-seamless-erw-pipes.png', inStock: true, featured: true },
  { id: '3', title: 'Contender EDGE 2.0 Gas System', division: 'Welding Division', category: 'Gas Systems', image: '/products/welding/contender-edge-2-0.png', inStock: true, featured: true },
  { id: '4', title: '280PL Series Welding Helmet Lift Front', division: 'Welding Division', category: 'Safety Helmets', image: '/products/welding/280pl-series-welding-helmet.png', inStock: true, featured: false },
  { id: '5', title: 'Acti9 Miniature Circuit Breaker C60H-DC', division: 'Electrical Division', category: 'Circuit Breakers', image: '/products/electrical/acti9-mcb-c60h-dc-10a.png', inStock: true, featured: true },
  { id: '6', title: 'TeSys Giga Contactor 185A Wide Band', division: 'Electrical Division', category: 'Switchgear', image: '/products/electrical/tesys-giga-contactor-185a.png', inStock: true, featured: true },
  { id: '7', title: 'Industrial Chain Blocks 5 Ton Rating', division: 'Lifting & Material Handling', category: 'Hoists & Rigging', image: '/products/lifting/chain-blocks.png', inStock: true, featured: true },
  { id: '8', title: 'Industrial Diesel Engines High-Capacity', division: 'Power System', category: 'Engines & Generators', image: '/products/power/diesel-engines.png', inStock: true, featured: true },
  { id: '9', title: 'Stainless Steel Hex Head Structural Bolts', division: 'Fasteners Division', category: 'Bolts & Screws', image: '/products/fasteners/stainless-steel-hex-head-bolts.png', inStock: true, featured: true },
  { id: '10', title: 'Jotun Hardtop XP 1005 Protective Paint', division: 'Coatings & Surface Protection', category: 'Paints & Coatings', image: '/products/coatings/jotun-hardtop-xp-1005.png', inStock: true, featured: true },
];

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'products' | 'divisions' | 'settings'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Login form state (pre-filled with default requested credentials)
  const [email, setEmail] = useState<string>(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState<string>(DEFAULT_ADMIN_PASS);
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // App data state
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [divisionFilter, setDivisionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // New product form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    division: 'Mechanical Division',
    category: 'Valves & Fittings',
    inStock: true,
    featured: false,
  });

  // Settings form state
  const [settings, setSettings] = useState({
    companyName: 'Orient Energy Trading Company',
    whatsappPhone: '+966552400778',
    email: 'info@orientenergy.com.sa',
    phone: '+966138901234',
    address: 'King Abdulaziz Road, Al Khobar, Eastern Province, Saudi Arabia',
    crNumber: '2051234567',
    vatNumber: '310987654300003',
  });

  useEffect(() => {
    // Check if token exists in session
    const token = typeof window !== 'undefined' ? localStorage.getItem('orient_admin_token') : null;
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      // Try hitting the backend API first
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('orient_admin_token', data.token || 'demo-token');
        setIsAuthenticated(true);
        showToast('Logged in successfully!');
        setIsLoading(false);
        return;
      }
    } catch {
      // Backend offline or network error: fallback to default credentials check
    }

    // Default credentials validation fallback
    if (
      email.trim().toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() &&
      password === DEFAULT_ADMIN_PASS
    ) {
      localStorage.setItem('orient_admin_token', 'demo-token-orient-admin');
      setIsAuthenticated(true);
      showToast('Logged in successfully!');
    } else {
      setLoginError('Invalid credentials. Use the default login provided.');
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('orient_admin_token');
    setIsAuthenticated(false);
    showToast('Logged out');
  };

  const handleStatusChange = (id: string, newStatus: Inquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    showToast(`Inquiry ${id} status updated to ${newStatus}`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title) return;
    const item: Product = {
      id: String(Date.now()),
      title: newProduct.title,
      division: newProduct.division,
      category: newProduct.category,
      image: '/categories/all-fittings.jpeg',
      inStock: newProduct.inStock,
      featured: newProduct.featured,
    };
    setProducts((prev) => [item, ...prev]);
    setShowAddModal(false);
    setNewProduct({
      title: '',
      division: 'Mechanical Division',
      category: 'Valves & Fittings',
      inStock: true,
      featured: false,
    });
    showToast('Product added successfully!');
  };

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-wrap">
              <Image src="/logo.png" alt="Orient Energy" width={160} height={48} style={{ objectFit: 'contain' }} priority />
            </div>
            <div className="badge-admin">ADMIN PORTAL</div>
            <h1>Secure Control Center</h1>
            <p>Orient Energy Trading Company — Operations Management</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {loginError && <div className="alert-error">{loginError}</div>}

            <div className="form-group">
              <label htmlFor="email">Admin Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="orient@adminpanel.com"
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Security Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="input-field"
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? 'Signing In...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          {/* Quick Demo Helper Box */}
          <div className="credentials-helper">
            <div className="cred-title">Default Admin Credentials:</div>
            <div className="cred-item">
              <span>Email:</span> <code>{DEFAULT_ADMIN_EMAIL}</code>
            </div>
            <div className="cred-item">
              <span>Password:</span> <code>{DEFAULT_ADMIN_PASS}</code>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail(DEFAULT_ADMIN_EMAIL);
                setPassword(DEFAULT_ADMIN_PASS);
                showToast('Default credentials loaded');
              }}
              className="btn-fill"
            >
              Fill Default Credentials
            </button>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #071138 0%, #0d2060 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .login-card {
            background: #ffffff;
            border-radius: 16px;
            width: 100%;
            maxWidth: 440px;
            padding: 36px 30px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          }
          .login-header {
            text-align: center;
            margin-bottom: 24px;
          }
          .logo-wrap {
            margin-bottom: 12px;
            display: flex;
            justify-content: center;
          }
          .badge-admin {
            display: inline-block;
            background: #e0e7ff;
            color: #2e3191;
            font-size: 0.70rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            padding: 3px 10px;
            border-radius: 9999px;
            margin-bottom: 8px;
          }
          .login-header h1 {
            font-size: 1.35rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 6px;
          }
          .login-header p {
            font-size: 0.82rem;
            color: #64748b;
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
            text-align: left;
          }
          .form-group label {
            font-size: 0.82rem;
            font-weight: 600;
            color: #334155;
          }
          .input-field {
            padding: 12px 14px;
            border-radius: 8px;
            border: 1px solid #cbd5e1;
            font-size: 0.92rem;
            outline: none;
            transition: border-color 0.2s;
          }
          .input-field:focus {
            border-color: #2e3191;
            box-shadow: 0 0 0 3px rgba(46, 49, 145, 0.12);
          }
          .btn-primary {
            background-color: #2e3191;
            color: #ffffff;
            padding: 13px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.94rem;
            border: none;
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
            margin-top: 4px;
          }
          .btn-primary:hover {
            background-color: #1f2268;
            transform: translateY(-1px);
          }
          .alert-error {
            background-color: #fef2f2;
            color: #991b1b;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 0.82rem;
            border: 1px solid #fecaca;
          }
          .credentials-helper {
            margin-top: 24px;
            padding: 14px;
            background-color: #f8fafc;
            border-radius: 10px;
            border: 1px dashed #cbd5e1;
            text-align: left;
            font-size: 0.78rem;
          }
          .cred-title {
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 6px;
          }
          .cred-item {
            color: #475569;
            margin-bottom: 4px;
          }
          .cred-item code {
            background: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
            color: #0f172a;
          }
          .btn-fill {
            margin-top: 8px;
            background: #e2e8f0;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.74rem;
            font-weight: 600;
            color: #1e293b;
            cursor: pointer;
            width: 100%;
          }
          .btn-fill:hover {
            background: #cbd5e1;
          }
        `}</style>
      </div>
    );
  }

  // Filtered queries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredProducts = products.filter((p) => {
    const matchesDiv = divisionFilter === 'all' || p.division.toLowerCase().includes(divisionFilter.toLowerCase());
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  return (
    <div className="admin-wrapper">
      {/* Toast Notification */}
      {toastMessage && <div className="admin-toast">{toastMessage}</div>}

      {/* Top Navbar */}
      <header className="admin-header">
        <div className="header-left">
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
          <div className="header-logo">
            <Image src="/logo.png" alt="Orient Energy" width={130} height={38} style={{ objectFit: 'contain' }} />
          </div>
          <span className="portal-badge">Admin Dashboard</span>
        </div>

        <div className="header-right">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="live-site-link"
          >
            <span>Live Storefront</span> &rarr;
          </a>
          <div className="user-profile">
            <div className="avatar">OE</div>
            <div className="user-info">
              <span className="user-name">Administrator</span>
              <span className="user-email">{DEFAULT_ADMIN_EMAIL}</span>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="btn-logout" title="Sign Out">
            Logout
          </button>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="admin-body">
        {/* Sidebar Nav */}
        <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <button
              type="button"
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('dashboard');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📊</span>
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('inquiries');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">💬</span>
              <span>Quotes &amp; Inquiries</span>
              <span className="badge-count">
                {inquiries.filter((i) => i.status === 'new').length}
              </span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('products');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">📦</span>
              <span>Products Catalog</span>
              <span className="badge-count">{products.length}</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'divisions' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('divisions');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">🏭</span>
              <span>Divisions &amp; Units</span>
            </button>

            <button
              type="button"
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('settings');
                setMobileMenuOpen(false);
              }}
            >
              <span className="nav-icon">⚙️</span>
              <span>Company Settings</span>
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="system-status">
              <span className="status-dot"></span>
              <span>System Online &bull; v2.4</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-view">
              <div className="page-heading">
                <h1>Executive Dashboard</h1>
                <p>Welcome back! Real-time operations and quotation request overview.</p>
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Pending Inquiries</span>
                    <span className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#b45309' }}>💬</span>
                  </div>
                  <div className="stat-val">{inquiries.filter((i) => i.status === 'new').length}</div>
                  <div className="stat-hint">Needs quotation review</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Total Inquiries</span>
                    <span className="stat-icon-wrap" style={{ background: '#dbeafe', color: '#1e40af' }}>📈</span>
                  </div>
                  <div className="stat-val">{inquiries.length}</div>
                  <div className="stat-hint">Across all 12 divisions</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Catalog Products</span>
                    <span className="stat-icon-wrap" style={{ background: '#dcfce7', color: '#15803d' }}>📦</span>
                  </div>
                  <div className="stat-val">88+</div>
                  <div className="stat-hint">Across 12 divisions</div>
                </div>

                <div className="stat-card">
                  <div className="stat-header">
                    <span className="stat-label">Active Divisions</span>
                    <span className="stat-icon-wrap" style={{ background: '#ede9fe', color: '#6d28d9' }}>🏭</span>
                  </div>
                  <div className="stat-val">12</div>
                  <div className="stat-hint">Saudi industrial supply</div>
                </div>
              </div>

              {/* Recent Inquiries Section */}
              <div className="panel-box" style={{ marginTop: '28px' }}>
                <div className="panel-head">
                  <h2>Recent Quote Requests</h2>
                  <button type="button" onClick={() => setActiveTab('inquiries')} className="btn-link">
                    View All &rarr;
                  </button>
                </div>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client &amp; Company</th>
                        <th>Division</th>
                        <th>Message Preview</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 4).map((inq) => (
                        <tr key={inq.id}>
                          <td>
                            <strong>{inq.name}</strong>
                            <div className="cell-sub">{inq.company}</div>
                          </td>
                          <td>
                            <span className="pill-division">{inq.division}</span>
                          </td>
                          <td style={{ maxWidth: '280px' }} className="truncate">
                            {inq.message}
                          </td>
                          <td>{inq.date}</td>
                          <td>
                            <span className={`status-pill ${inq.status}`}>{inq.status}</span>
                          </td>
                          <td>
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${inq.name}, this is Orient Energy Trading Co. following up on your quotation request.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-wa-action"
                            >
                              WhatsApp
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES & QUOTES */}
          {activeTab === 'inquiries' && (
            <div className="inquiries-view">
              <div className="page-heading">
                <h1>Quotations &amp; Customer Inquiries</h1>
                <p>Manage RFQs and procurement inquiries received through the storefront.</p>
              </div>

              {/* Filter & Search Bar */}
              <div className="filter-bar">
                <input
                  type="text"
                  placeholder="Search by client, company, division..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New (Unresolved)</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="panel-box">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Division</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ textAlign: 'center', padding: '36px' }}>
                            No inquiries match your filter.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id}>
                            <td>
                              <code>{inq.id}</code>
                            </td>
                            <td>
                              <strong>{inq.name}</strong>
                              <div className="cell-sub">{inq.company}</div>
                            </td>
                            <td>
                              <div>{inq.email}</div>
                              <div className="cell-sub">{inq.phone}</div>
                            </td>
                            <td>
                              <span className="pill-division">{inq.division}</span>
                            </td>
                            <td style={{ maxWidth: '300px' }}>{inq.message}</td>
                            <td>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                                className={`select-status ${inq.status}`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="quoted">Quoted</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                            <td>
                              <a
                                href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `Hello ${inq.name}, Orient Energy is reaching out regarding your quotation inquiry: ${inq.message}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-wa-action"
                              >
                                Reply on WhatsApp
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div className="products-view">
              <div className="page-heading flex-between">
                <div>
                  <h1>Products Catalog Management</h1>
                  <p>Browse, manage and add products to the online catalog.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary-action"
                >
                  + Add New Product
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="filter-bar">
                <input
                  type="text"
                  placeholder="Search products by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Divisions</option>
                  <option value="Mechanical">Mechanical Supply Division</option>
                  <option value="Welding">Welding Division</option>
                  <option value="Electrical">Electrical Division</option>
                  <option value="Lifting">Lifting &amp; Material Handling</option>
                  <option value="Power">Power System</option>
                  <option value="Fasteners">Fasteners Division</option>
                  <option value="Coatings">Coatings &amp; Surface Protection</option>
                </select>
              </div>

              <div className="panel-box">
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Product Title</th>
                        <th>Division</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <strong>{p.title}</strong>
                          </td>
                          <td>
                            <span className="pill-division">{p.division}</span>
                          </td>
                          <td>{p.category}</td>
                          <td>
                            <span className={`status-pill ${p.inStock ? 'quoted' : 'closed'}`}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td>{p.featured ? '⭐ Yes' : 'No'}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id)}
                              className="btn-delete"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DIVISIONS & UNITS */}
          {activeTab === 'divisions' && (
            <div className="divisions-view">
              <div className="page-heading">
                <h1>Industrial Divisions Overview</h1>
                <p>Orient Energy's 12 specialized supply units serving Saudi Arabia.</p>
              </div>

              <div className="divisions-grid">
                {[
                  { name: 'Mechanical Supply Division', slug: 'mechanical-division', count: '13 products', desc: 'Valves, flanges, fittings, gaskets, actuators, and pipes.' },
                  { name: 'Welding Division', slug: 'welding-division', count: '16 products', desc: 'Cutting torches, regulators, auto helmets, Victor systems.' },
                  { name: 'Electrical Division', slug: 'electrical-division', count: '12 products', desc: 'Circuit breakers, switchgear, UPS systems, cables.' },
                  { name: 'Lifting & Material Handling', slug: 'lifting-material-handling', count: '8 products', desc: 'Chain blocks, hoists, wire rope slings, snatch blocks.' },
                  { name: 'Power System', slug: 'power-system', count: '4 products', desc: 'Industrial generators, diesel & gas engines.' },
                  { name: 'Auxiliary Systems', slug: 'auxiliary-systems', count: '6 products', desc: 'Air compressors, water tanks, camp logistics equipment.' },
                  { name: 'Marine Division', slug: 'marine-division', count: '4 products', desc: 'Lifejackets, life-saving appliances, deck equipment.' },
                  { name: 'Steel & Structural Materials', slug: 'steel-structural-materials-division', count: '7 products', desc: 'Seamless pipes, structural beams, stainless tubes.' },
                  { name: 'Coatings & Surface Protection', slug: 'coatings-surface-protection', count: '8 products', desc: 'Jotun, National Paints, intumescent fire coatings.' },
                  { name: 'Pumps & Motors Division', slug: 'pumps-motors', count: '4 products', desc: 'API 610 pumps, electric motors, high-pressure boosters.' },
                  { name: 'Fasteners Division', slug: 'fasteners-division', count: '16 products', desc: 'Hex bolts, stud bolts, carriage bolts, anchors.' },
                  { name: 'Substructure', slug: 'substructure', count: '4 products', desc: 'Rig floors, base frames, spill containment systems.' },
                ].map((div, idx) => (
                  <div key={idx} className="division-card">
                    <div className="division-card-header">
                      <h3>{div.name}</h3>
                      <span className="count-pill">{div.count}</span>
                    </div>
                    <p>{div.desc}</p>
                    <a
                      href={`http://localhost:3000/products/${div.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="div-link"
                    >
                      View Live Division Page &rarr;
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMPANY SETTINGS */}
          {activeTab === 'settings' && (
            <div className="settings-view">
              <div className="page-heading">
                <h1>Company Operational Settings</h1>
                <p>Manage contact info, WhatsApp dispatch numbers, and Saudi legal credentials.</p>
              </div>

              <div className="panel-box" style={{ maxWidth: '780px' }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('Settings saved successfully!');
                  }}
                  className="settings-form"
                >
                  <div className="form-group">
                    <label>Company Trading Name</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>WhatsApp Orders Phone</label>
                      <input
                        type="text"
                        value={settings.whatsappPhone}
                        onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                        className="input-field"
                      />
                    </div>
                    <div className="form-group">
                      <label>Official Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Commercial Registration (CR) Number</label>
                    <input
                      type="text"
                      value={settings.crNumber}
                      onChange={(e) => setSettings({ ...settings, crNumber: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label>Operating Address (Kingdom of Saudi Arabia)</label>
                    <textarea
                      rows={3}
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <button type="submit" className="btn-primary-action" style={{ alignSelf: 'flex-start' }}>
                    Save Settings
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Add New Industrial Product</h2>
              <button type="button" onClick={() => setShowAddModal(false)} className="btn-close">
                &times;
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="modal-form">
              <div className="form-group">
                <label>Product Title / Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High Pressure Ball Valve 4 Inch"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Division</label>
                <select
                  value={newProduct.division}
                  onChange={(e) => setNewProduct({ ...newProduct, division: e.target.value })}
                  className="input-field"
                >
                  <option value="Mechanical Division">Mechanical Division</option>
                  <option value="Welding Division">Welding Division</option>
                  <option value="Electrical Division">Electrical Division</option>
                  <option value="Lifting & Material Handling">Lifting &amp; Material Handling</option>
                  <option value="Power System">Power System</option>
                  <option value="Fasteners Division">Fasteners Division</option>
                  <option value="Coatings & Surface Protection">Coatings &amp; Surface Protection</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="e.g. Valves & Fittings"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-action">
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Styles with complete Mobile Responsiveness */}
      <style jsx>{`
        .admin-wrapper {
          min-height: 100vh;
          background-color: #f8fafc;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .admin-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #0f172a;
          color: #ffffff;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 500;
          z-index: 9999;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.25s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .admin-header {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .portal-badge {
          background-color: #e0e7ff;
          color: #2e3191;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .live-site-link {
          font-size: 0.84rem;
          color: #2e3191;
          font-weight: 600;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 6px;
          background-color: #f1f5f9;
          transition: background 0.2s;
        }

        .live-site-link:hover {
          background-color: #e2e8f0;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #2e3191;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.82rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .user-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: #0f172a;
        }

        .user-email {
          font-size: 0.72rem;
          color: #64748b;
        }

        .btn-logout {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.80rem;
          font-weight: 600;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          background-color: #fee2e2;
        }

        .admin-body {
          display: flex;
          flex: 1;
        }

        .admin-sidebar {
          width: 250px;
          background-color: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 14px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 8px;
          border: none;
          background: none;
          color: #475569;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .nav-item.active {
          background-color: #2e3191;
          color: #ffffff;
          font-weight: 600;
        }

        .nav-icon {
          font-size: 1.05rem;
        }

        .badge-count {
          margin-left: auto;
          background: #e2e8f0;
          color: #334155;
          font-size: 0.70rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .nav-item.active .badge-count {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: #64748b;
          padding: 10px 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
        }

        .admin-content {
          flex: 1;
          padding: 28px 32px;
          max-width: 1400px;
        }

        .page-heading {
          margin-bottom: 24px;
        }

        .page-heading h1 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .page-heading p {
          font-size: 0.88rem;
          color: #64748b;
        }

        .flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748b;
        }

        .stat-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .stat-val {
          font-size: 1.85rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .stat-hint {
          font-size: 0.76rem;
          color: #94a3b8;
        }

        .panel-box {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .panel-head {
          padding: 18px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .panel-head h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .btn-link {
          background: none;
          border: none;
          color: #2e3191;
          font-weight: 600;
          font-size: 0.84rem;
          cursor: pointer;
        }

        .filter-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .search-input {
          flex: 1;
          min-width: 240px;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
        }

        .filter-select {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.88rem;
          cursor: pointer;
          outline: none;
        }

        .table-wrapper {
          overflow-x: auto;
          width: 100%;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.86rem;
        }

        .data-table th {
          background: #f8fafc;
          padding: 12px 18px;
          font-weight: 600;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }

        .data-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .cell-sub {
          font-size: 0.74rem;
          color: #64748b;
          margin-top: 2px;
        }

        .pill-division {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .status-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: capitalize;
        }

        .status-pill.new {
          background: #fef3c7;
          color: #92400e;
        }
        .status-pill.contacted {
          background: #e0e7ff;
          color: #3730a3;
        }
        .status-pill.quoted {
          background: #dcfce7;
          color: #166534;
        }
        .status-pill.closed {
          background: #f1f5f9;
          color: #64748b;
        }

        .select-status {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.78rem;
          border: 1px solid #cbd5e1;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-wa-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: #25d366;
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-wa-action:hover {
          background-color: #1ebe5d;
        }

        .btn-delete {
          background: none;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          cursor: pointer;
        }

        .btn-delete:hover {
          background: #fef2f2;
        }

        .btn-primary-action {
          background-color: #2e3191;
          color: #ffffff;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.88rem;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary-action:hover {
          background-color: #1f2268;
        }

        .divisions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .division-card {
          background: #ffffff;
          padding: 22px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .division-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .division-card-header h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
        }

        .count-pill {
          background: #f1f5f9;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .division-card p {
          font-size: 0.84rem;
          color: #64748b;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .div-link {
          margin-top: auto;
          color: #2e3191;
          font-weight: 600;
          font-size: 0.82rem;
          text-decoration: none;
        }

        .settings-form {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .modal-card {
          background: #ffffff;
          border-radius: 14px;
          width: 100%;
          max-width: 480px;
          padding: 28px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
        }

        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 10px;
        }

        .btn-cancel {
          background: none;
          border: 1px solid #cbd5e1;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Responsive Mobile Styles */
        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .admin-header {
            padding: 0 16px;
          }
          .mobile-toggle {
            display: inline-block !important;
          }
          .user-info, .portal-badge {
            display: none !important;
          }
          .admin-sidebar {
            position: fixed;
            top: 64px;
            bottom: 0;
            left: 0;
            z-index: 99;
            transform: translateX(-100%);
            transition: transform 0.28s ease;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
          }
          .admin-sidebar.open {
            transform: translateX(0) !important;
          }
          .admin-content {
            padding: 20px 16px !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
