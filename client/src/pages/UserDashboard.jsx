import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, Briefcase, Wallet, Tag, Plane, Bus, 
  ArrowUpRight, ArrowDownLeft, 
  Plus, Edit, Download, Armchair, ChevronRight 
} from 'lucide-react';
import { 
  MOCK_USER, 
  MOCK_UPCOMING_TRIPS, 
  MOCK_COMPLETED_TRIPS, 
  MOCK_CANCELLED_TRIPS, 
  MOCK_SAVED_TRAVELLERS, 
  MOCK_WALLET_LEDGER 
} from '@/data/dashboard';

const UserDashboard = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'trips';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tripsFilter, setTripsFilter] = useState('upcoming');

  // Modals
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('1000');
  const [isAddTravellerOpen, setIsAddTravellerOpen] = useState(false);
  const [newTravellerName, setNewTravellerName] = useState('');
  const [newTravellerAge, setNewTravellerAge] = useState('');
  const [newTravellerGender, setNewTravellerGender] = useState('Male');
  const [travellersList, setTravellersList] = useState(MOCK_SAVED_TRAVELLERS);
  const [walletBalance, setWalletBalance] = useState(MOCK_USER.walletBalance);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  }, [setSearchParams]);

  const handleAddMoney = useCallback((e) => {
    e.preventDefault();
    const val = Number(addMoneyAmount);
    if (val > 0) {
      setWalletBalance((prev) => prev + val);
      alert(`Successfully added ₹${val} to your TripNest Wallet!`);
      setIsAddMoneyOpen(false);
    }
  }, [addMoneyAmount]);

  const handleAddTraveller = useCallback((e) => {
    e.preventDefault();
    if (!newTravellerName || !newTravellerAge) return;
    const newEntry = {
      id: 't_' + Date.now(),
      name: newTravellerName,
      age: Number(newTravellerAge),
      gender: newTravellerGender,
      type: 'Co-Traveller'
    };
    setTravellersList((prev) => [...prev, newEntry]);
    setNewTravellerName('');
    setNewTravellerAge('');
    setIsAddTravellerOpen(false);
  }, [newTravellerName, newTravellerAge, newTravellerGender]);

  const handleRemoveTraveller = useCallback((id) => {
    setTravellersList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1240px] mx-auto space-y-6">
        {/* User Hero Banner */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-inner">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{MOCK_USER.name}</h1>
                <span className="bg-amber-400 text-[#0F172A] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  ★ Gold
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-0.5">{MOCK_USER.email} • {MOCK_USER.phone}</p>
              <p className="text-[11px] text-teal-300 font-semibold mt-1">
                TripNest Member since {MOCK_USER.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/15">
            <div className="text-right">
              <span className="text-[10px] text-teal-200 uppercase tracking-wider font-bold block">WALLET BALANCE</span>
              <span className="text-2xl font-black text-amber-300">₹{walletBalance.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => setIsAddMoneyOpen(true)}
              className="px-3.5 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-lg shadow transition-colors"
            >
              + Add Cash
            </button>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 space-y-1">
              <button
                onClick={() => handleTabChange('trips')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === 'trips'
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>My Trips</span>
              </button>

              <button
                onClick={() => handleTabChange('wallet')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === 'wallet'
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>TripNest Wallet</span>
              </button>

              <button
                onClick={() => handleTabChange('travellers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === 'travellers'
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Saved Travellers</span>
              </button>

              <button
                onClick={() => handleTabChange('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={() => handleTabChange('coupons')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                  activeTab === 'coupons'
                    ? 'bg-[#0D9488] text-white shadow-md'
                    : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>My Coupons & Deals</span>
              </button>

              {/* Admin Panel Direct Link */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-black bg-slate-900 text-white hover:bg-black transition-colors"
                >
                  <span>Switch to Admin Panel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. MY TRIPS TAB */}
            {activeTab === 'trips' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
                {/* Trips Subtabs */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTripsFilter('upcoming')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        tripsFilter === 'upcoming'
                          ? 'bg-teal-50 text-[#0D9488] border border-[#0D9488]'
                          : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      Upcoming Trips ({MOCK_UPCOMING_TRIPS.length})
                    </button>

                    <button
                      onClick={() => setTripsFilter('completed')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        tripsFilter === 'completed'
                          ? 'bg-teal-50 text-[#0D9488] border border-[#0D9488]'
                          : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      Completed ({MOCK_COMPLETED_TRIPS.length})
                    </button>

                    <button
                      onClick={() => setTripsFilter('cancelled')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                        tripsFilter === 'cancelled'
                          ? 'bg-teal-50 text-[#0D9488] border border-[#0D9488]'
                          : 'text-gray-600 hover:bg-slate-50'
                      }`}
                    >
                      Refunds & Cancelled ({MOCK_CANCELLED_TRIPS.length})
                    </button>
                  </div>
                </div>

                {/* UPCOMING TRIPS LIST */}
                {tripsFilter === 'upcoming' && (
                  <div className="space-y-4">
                    {MOCK_UPCOMING_TRIPS.map((trip) => (
                      <div key={trip.id} className="p-5 rounded-2xl border border-slate-200 hover:border-teal-300 transition-all bg-slate-50/50 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                          <div className="flex items-center gap-2.5">
                            {trip.type === 'flight' ? (
                              <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#0D9488] flex items-center justify-center font-bold">
                                <Plane className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-lg bg-red-100 text-[#D84E55] flex items-center justify-center font-bold">
                                <Bus className="w-4 h-4" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-black text-sm text-[#0F172A]">{trip.title}</h4>
                              <p className="text-[11px] text-gray-500 font-medium">PNR: {trip.pnr}</p>
                            </div>
                          </div>

                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            {trip.status}
                          </span>
                        </div>

                        {/* Route & Times */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">DEPARTURE</span>
                            <p className="font-black text-gray-900 mt-0.5">{trip.depTime}</p>
                            <p className="text-gray-500">{trip.fromAirport || trip.fromStation}</p>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">CONFIRMED SEAT</span>
                            <p className="font-black text-[#0D9488] mt-0.5 flex items-center gap-1">
                              <Armchair className="w-3.5 h-3.5" />
                              <span>{trip.seat}</span>
                            </p>
                            <p className="text-gray-500">{trip.passenger}</p>
                          </div>

                          <div className="sm:text-right">
                            <span className="text-[10px] uppercase font-bold text-gray-400 block">PAID AMOUNT</span>
                            <p className="font-black text-base text-[#0F172A] mt-0.5">₹{trip.amount.toLocaleString('en-IN')}</p>
                            <span className="text-[10px] text-gray-400">All taxes included</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                          <Link
                            to={`/booking/confirmation/${trip.pnr}?seats=${trip.seat.split(' ')[0]}&passenger=${encodeURIComponent(trip.passenger)}`}
                            className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download E-Ticket</span>
                          </Link>

                          <button
                            onClick={() => alert(`Cancellation requested for ${trip.pnr}. Refund will be credited within 24 hours.`)}
                            className="px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 text-xs font-bold rounded-xl transition-colors"
                          >
                            Cancel Ticket & Get Refund
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* COMPLETED TRIPS */}
                {tripsFilter === 'completed' && (
                  <div className="space-y-4">
                    {MOCK_COMPLETED_TRIPS.map((trip) => (
                      <div key={trip.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div>
                          <h4 className="font-black text-sm text-[#0F172A]">{trip.title}</h4>
                          <p className="text-gray-500 mt-0.5">{trip.location || trip.route} • {trip.dates || trip.depTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-base text-[#0F172A]">₹{trip.amount.toLocaleString('en-IN')}</p>
                          <button
                            onClick={() => alert('GST Invoice PDF downloading...')}
                            className="text-[#0D9488] font-bold hover:underline mt-1 block"
                          >
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CANCELLED & REFUND TRACKER */}
                {tripsFilter === 'cancelled' && (
                  <div className="space-y-4">
                    {MOCK_CANCELLED_TRIPS.map((trip) => (
                      <div key={trip.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                          <div>
                            <h4 className="font-black text-sm text-[#0F172A]">{trip.title} ({trip.route})</h4>
                            <p className="text-xs text-gray-500">{trip.depTime}</p>
                          </div>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                            ₹{trip.refundAmount} {trip.refundStatus}
                          </span>
                        </div>

                        {/* 3-Step Visual Refund Tracker */}
                        <div>
                          <p className="text-xs font-black text-gray-700 mb-3">Live Refund Tracker (UTR: {trip.refundRef})</p>
                          <div className="grid grid-cols-3 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                              ✓ 1. Request Initiated
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                              ✓ 2. Airline Approved
                            </div>
                            <div className="p-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-xs">
                              ✓ 3. Credited to Account
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. WALLET TAB */}
            {activeTab === 'wallet' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-[#0F172A]">TripNest Cash Wallet</h3>
                    <p className="text-xs text-gray-500 font-medium">Use wallet cash for 1-click booking without entering card details</p>
                  </div>
                  <button
                    onClick={() => setIsAddMoneyOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] text-white text-xs font-black rounded-xl shadow-md"
                  >
                    + Add Money
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
                    <span className="text-[10px] uppercase font-bold text-teal-700 block mb-1">TOTAL BALANCE</span>
                    <p className="text-2xl font-black text-[#0D9488]">₹{walletBalance.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block mb-1">TRIPNEST CASH</span>
                    <p className="text-2xl font-black text-emerald-700">₹{(walletBalance - 450).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                    <span className="text-[10px] uppercase font-bold text-purple-700 block mb-1">PROMO REWARD POINTS</span>
                    <p className="text-2xl font-black text-purple-700">₹450</p>
                  </div>
                </div>

                {/* Ledger */}
                <div>
                  <h4 className="font-black text-sm text-[#0F172A] mb-3">Wallet Activity History</h4>
                  <div className="space-y-2">
                    {MOCK_WALLET_LEDGER.map((w) => (
                      <div key={w.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${w.isCredit ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {w.isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-black text-[#0F172A]">{w.title}</p>
                            <p className="text-[11px] text-gray-400">{w.date}</p>
                          </div>
                        </div>
                        <span className={`font-black text-sm ${w.isCredit ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {w.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. SAVED TRAVELLERS TAB */}
            {activeTab === 'travellers' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-black text-[#0F172A]">Saved Co-Travellers</h3>
                    <p className="text-xs text-gray-500 font-medium">Add frequent flyers & family members for fast 1-click booking</p>
                  </div>
                  <button
                    onClick={() => setIsAddTravellerOpen(true)}
                    className="px-4 py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-black rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Traveller</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {travellersList.map((t) => (
                    <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0D9488] font-black flex items-center justify-center">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-sm text-[#0F172A]">{t.name}</h4>
                          <p className="text-gray-500">{t.gender} • {t.age} Years</p>
                          <span className="text-[10px] text-teal-600 font-bold">{t.type}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveTraveller(t.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
                <h3 className="text-xl font-black text-[#0F172A] pb-3 border-b border-slate-100">Profile Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue={MOCK_USER.name}
                      className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={MOCK_USER.email}
                      className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      defaultValue={MOCK_USER.phone}
                      className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Preferred Seat</label>
                    <select className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]">
                      <option>Window Seat</option>
                      <option>Aisle Seat</option>
                      <option>Extra Legroom</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Profile settings saved successfully!')}
                  className="px-6 py-2.5 bg-[#0D9488] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* 5. COUPONS TAB */}
            {activeTab === 'coupons' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
                <h3 className="text-xl font-black text-[#0F172A] pb-3 border-b border-slate-100">My Active Coupons & Promo Codes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-dashed border-teal-300 bg-teal-50/50 space-y-2">
                    <span className="text-[10px] bg-[#0D9488] text-white font-black px-2 py-0.5 rounded uppercase">FLIGHTS</span>
                    <h4 className="font-black text-sm text-[#0F172A]">Flat 15% OFF on Domestic Flights</h4>
                    <p className="text-xs text-gray-500">Valid on all IndiGo, Air India and Vistara bookings</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono font-black text-xs bg-white px-2.5 py-1 rounded border border-gray-300">TRIPNESTFLY</span>
                      <button
                        onClick={() => { navigator.clipboard.writeText('TRIPNESTFLY'); alert('Coupon code copied!'); }}
                        className="text-xs font-bold text-[#0D9488] hover:underline"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-orange-300 bg-orange-50/50 space-y-2">
                    <span className="text-[10px] bg-orange-500 text-white font-black px-2 py-0.5 rounded uppercase">HOTELS</span>
                    <h4 className="font-black text-sm text-[#0F172A]">Flat 20% OFF on Luxury Resorts</h4>
                    <p className="text-xs text-gray-500">Valid on 4★ and 5★ hotels with free cancellation</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="font-mono font-black text-xs bg-white px-2.5 py-1 rounded border border-gray-300">TRIPNESTSTAY</span>
                      <button
                        onClick={() => { navigator.clipboard.writeText('TRIPNESTSTAY'); alert('Coupon code copied!'); }}
                        className="text-xs font-bold text-orange-600 hover:underline"
                      >
                        Copy Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-black text-lg text-[#0F172A] mb-1">Add Cash to Wallet</h3>
            <p className="text-xs text-gray-500 mb-4">Select amount to top-up via UPI / Card</p>

            <form onSubmit={handleAddMoney} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488] text-base font-black"
                />
              </div>

              <div className="flex gap-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAddMoneyAmount(String(amt))}
                    className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg"
                  >
                    +₹{amt}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddMoneyOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 font-bold text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0D9488] text-white font-black rounded-xl shadow-md"
                >
                  Add Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Traveller Modal */}
      {isAddTravellerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-black text-lg text-[#0F172A] mb-1">Add Co-Traveller</h3>
            <p className="text-xs text-gray-500 mb-4">Save passenger details for 1-click checkout</p>

            <form onSubmit={handleAddTraveller} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={newTravellerName}
                  onChange={(e) => setNewTravellerName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Age</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    placeholder="e.g. 28"
                    value={newTravellerAge}
                    onChange={(e) => setNewTravellerAge(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Gender</label>
                  <select
                    value={newTravellerGender}
                    onChange={(e) => setNewTravellerGender(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddTravellerOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 font-bold text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0D9488] text-white font-black rounded-xl shadow-md"
                >
                  Save Passenger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});

UserDashboard.displayName = 'UserDashboard';

export default UserDashboard;
