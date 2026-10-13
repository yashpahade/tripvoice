import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, ShoppingBag, DollarSign, Plane, 
  Building2, Bus, Palmtree, Briefcase, Plus, Search, 
  ArrowUpRight, Download, Eye 
} from 'lucide-react';
import { 
  INITIAL_BOOKINGS, 
  INITIAL_LEADS, 
  INITIAL_COUPONS, 
  INITIAL_CUSTOMERS 
} from '@/data/dashboard';

const SERVICE_ICONS = {
  Flight: Plane,
  Hotel: Building2,
  Bus: Bus,
  Package: Palmtree,
};

const AdminDashboard = React.memo(() => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [leads] = useState(INITIAL_LEADS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [customers] = useState(INITIAL_CUSTOMERS);

  // Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [isNewCouponOpen, setIsNewCouponOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('10% OFF');
  const [newCouponType, setNewCouponType] = useState('All');

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'ALL' && b.status !== statusFilter) return false;
      if (searchQuery && !b.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !b.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [bookings, statusFilter, searchQuery]);

  const handleCancelBooking = useCallback((bookingId) => {
    if (window.confirm(`Are you sure you want to cancel booking ${bookingId} and process a refund?`)) {
      setBookings((prev) =>
        prev.map((b) => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
      );
    }
  }, []);

  const handleCreateCoupon = useCallback((e) => {
    e.preventDefault();
    if (!newCouponCode) return;
    const newC = {
      code: newCouponCode.toUpperCase(),
      discount: newCouponDiscount,
      type: newCouponType,
      used: 0,
      expiry: '31 Dec 2026',
      status: 'Active'
    };
    setCoupons((prev) => [newC, ...prev]);
    setNewCouponCode('');
    setIsNewCouponOpen(false);
  }, [newCouponCode, newCouponDiscount, newCouponType]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4 text-slate-900">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#0F172A] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                Admin Panel
              </span>
              <span className="text-xs text-gray-400 font-semibold">• Live Operations Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              TripNest Business Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/account/my-trips"
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Switch to Customer View →
            </Link>
            <button
              onClick={() => alert('Exporting all transactions & bookings to CSV...')}
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 4 TOP KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">TOTAL REVENUE (GMV)</span>
              <h3 className="text-2xl font-black text-[#0F172A]">₹24,85,600</h3>
              <p className="text-[11px] text-teal-600 font-bold mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% this month
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">TOTAL BOOKINGS</span>
              <h3 className="text-2xl font-black text-[#0F172A]">1,428</h3>
              <p className="text-[11px] text-teal-600 font-bold mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.0% vs last week
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">ACTIVE CUSTOMERS</span>
              <h3 className="text-2xl font-black text-[#0F172A]">3,890</h3>
              <p className="text-[11px] text-teal-600 font-bold mt-1 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" /> +145 new today
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-1">CORPORATE / LEADS</span>
              <h3 className="text-2xl font-black text-[#0F172A]">7 Leads</h3>
              <p className="text-[11px] text-amber-600 font-bold mt-1">
                4 pending RFP proposals
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-2 flex flex-wrap gap-2 text-xs font-black">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'bookings' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-gray-600 hover:bg-slate-50'
            }`}
          >
            Live Bookings Manager ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'leads' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-gray-600 hover:bg-slate-50'
            }`}
          >
            Corporate & Package Enquiries ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'coupons' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-gray-600 hover:bg-slate-50'
            }`}
          >
            Coupons & Discounts ({coupons.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'customers' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-gray-600 hover:bg-slate-50'
            }`}
          >
            Customer Directory ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl transition-all ${
              activeTab === 'analytics' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-gray-600 hover:bg-slate-50'
            }`}
          >
            Revenue Analytics
          </button>
        </div>

        {/* 1. BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in">
            {/* Filter toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer name or Booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="text-gray-500">Filter Status:</span>
                {['ALL', 'Confirmed', 'Pending', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      statusFilter === st
                        ? 'border-[#0D9488] bg-teal-50 text-[#0D9488]'
                        : 'border-slate-200 text-gray-600 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Details & Seat/Room</th>
                    <th className="p-3">Travel Date</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredBookings.map((b) => {
                    const ServiceIcon = SERVICE_ICONS[b.service] || Plane;
                    return (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-[#0D9488]">{b.id}</td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1.5 font-bold text-gray-700 bg-slate-100 px-2 py-0.5 rounded">
                            <ServiceIcon className="w-3.5 h-3.5 text-gray-500" />
                            <span>{b.service}</span>
                          </span>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-[#0F172A]">{b.customer}</p>
                          <p className="text-[10px] text-gray-400">{b.contact}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-bold text-gray-800">{b.details}</p>
                          <span className="text-[10px] bg-teal-50 text-[#0D9488] font-black px-1.5 py-0.2 rounded">
                            {b.seat}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">{b.date}</td>
                        <td className="p-3 font-black text-gray-900">₹{b.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : b.status === 'Cancelled'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => alert(`Showing electronic ticket voucher for ${b.id} (${b.customer})`)}
                            className="p-1.5 text-gray-500 hover:text-[#0D9488] rounded-lg hover:bg-teal-50"
                            title="View Voucher"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {b.status === 'Confirmed' && (
                            <button
                              onClick={() => handleCancelBooking(b.id)}
                              className="px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded"
                            >
                              Cancel & Refund
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. LEADS TAB */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Corporate & Family Tour RFP Pipeline</h3>
                <p className="text-xs text-gray-500">Inbound retreat & vacation inquiries submitted via website</p>
              </div>
              <span className="text-xs bg-teal-50 text-teal-700 font-bold px-3 py-1 rounded-full border border-teal-200">
                {leads.length} Active Leads
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <th className="p-3">Lead ID</th>
                    <th className="p-3">Company / Client</th>
                    <th className="p-3">Contact</th>
                    <th className="p-3">Destination & Event</th>
                    <th className="p-3">Group Size</th>
                    <th className="p-3">Budget</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {leads.map((ld) => (
                    <tr key={ld.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-mono font-bold text-[#0D9488]">{ld.id}</td>
                      <td className="p-3 font-black text-[#0F172A]">{ld.company}</td>
                      <td className="p-3">
                        <p>{ld.contact}</p>
                        <p className="text-[10px] text-gray-400">{ld.phone}</p>
                      </td>
                      <td className="p-3">
                        <p className="font-bold text-gray-800">{ld.dest}</p>
                        <p className="text-[10px] text-gray-500">{ld.event}</p>
                      </td>
                      <td className="p-3 font-bold text-indigo-700">{ld.groupSize}</td>
                      <td className="p-3 font-black text-gray-900">{ld.budget}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          ld.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {ld.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Opening proposal editor for ${ld.company}...`)}
                          className="px-3 py-1 bg-[#0D9488] text-white font-bold rounded-lg hover:bg-[#0F766E] text-xs"
                        >
                          Send Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-[#0F172A]">Discounts & Promo Code Engine</h3>
                <p className="text-xs text-gray-500">Create and manage marketing coupons for flights, hotels and buses</p>
              </div>
              <button
                onClick={() => setIsNewCouponOpen(true)}
                className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>+ Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-sm bg-white border border-gray-300 px-2 py-0.5 rounded text-[#0F172A]">
                      {c.code}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-base font-black text-[#0D9488]">{c.discount}</p>
                  <p className="text-gray-500">Category: {c.type} • Used: {c.used} times</p>
                  <p className="text-[10px] text-gray-400">Expires: {c.expiry}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4 animate-in fade-in">
            <h3 className="text-lg font-black text-[#0F172A] pb-3 border-b border-slate-100">Customer Directory</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-gray-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <th className="p-3">User ID</th>
                    <th className="p-3">Customer Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Bookings</th>
                    <th className="p-3">Total Spend</th>
                    <th className="p-3">Loyalty Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-gray-500">{c.id}</td>
                      <td className="p-3 font-black text-[#0F172A]">{c.name}</td>
                      <td className="p-3 text-gray-600">{c.email}</td>
                      <td className="p-3 text-gray-600">{c.phone}</td>
                      <td className="p-3 font-bold text-gray-900">{c.totalTrips} Trips</td>
                      <td className="p-3 font-black text-emerald-600">₹{c.totalSpend.toLocaleString('en-IN')}</td>
                      <td className="p-3">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                          ★ {c.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. REVENUE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
            <h3 className="text-lg font-black text-[#0F172A] pb-3 border-b border-slate-100">Platform Revenue Breakdown</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Breakdown Bars */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-gray-700">Gross Booking Value by Vertical</h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Flights (IndiGo, Air India, Vistara)</span>
                      <span>45% (₹11,18,500)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0D9488] rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Hotels & Resorts (Grand Hyatt, Taj, Novotel)</span>
                      <span>30% (₹7,45,600)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Buses (IntrCity, Zingbus, VRL)</span>
                      <span>15% (₹3,72,800)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D84E55] rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Holiday & Corporate Packages</span>
                      <span>10% (₹2,48,700)</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Stats */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                <h4 className="font-black text-sm text-[#0F172A]">Operational Highlights</h4>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-gray-500">Average Order Value (AOV):</span>
                  <span className="font-black text-gray-900">₹4,850</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-gray-500">Customer Cancellation Rate:</span>
                  <span className="font-black text-emerald-600">3.2% (Low)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-gray-500">Repeat Customer Rate:</span>
                  <span className="font-black text-teal-600">42%</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">Average Refund Processing Time:</span>
                  <span className="font-black text-emerald-600">Under 4 Hours</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Coupon Modal */}
      {isNewCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-xs">
            <h3 className="font-black text-lg text-[#0F172A] mb-1">Create Promo Code</h3>
            <p className="text-gray-500 mb-4">Set discount rules for customers</p>

            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE25"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full p-2.5 uppercase font-mono font-bold border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Discount Amount / %</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 25% OFF or Flat ₹300"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Service</label>
                <select
                  value={newCouponType}
                  onChange={(e) => setNewCouponType(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                >
                  <option value="All">All Services</option>
                  <option value="Flight">Flights Only</option>
                  <option value="Hotel">Hotels Only</option>
                  <option value="Bus">Buses Only</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewCouponOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 font-bold text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0D9488] text-white font-black rounded-xl shadow-md uppercase"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;
