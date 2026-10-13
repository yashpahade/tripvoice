import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Building2, User, 
  ShieldCheck, Tag, Check, ArrowRight, ChevronRight 
} from 'lucide-react';

const HotelReview = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hotelName = searchParams.get('hotelName') || 'Grand Hyatt Goa Resort & Spa';
  const roomName = searchParams.get('roomName') || 'Grand Deluxe King Room';
  const planName = searchParams.get('planName') || 'Room with Breakfast Buffet';
  const pricePerNight = Number(searchParams.get('price')) || 9499;

  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Promo
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const nights = 2;
  const basePrice = pricePerNight * nights;
  const taxes = Math.round(basePrice * 0.12);
  const total = basePrice + taxes - discount;

  const handleApplyCoupon = useCallback((e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'TRIPNESTSTAY' || coupon.toUpperCase() === 'STAY20') {
      setDiscount(Math.round(basePrice * 0.20));
      alert('20% discount applied successfully!');
    } else {
      alert('Invalid code! Use TRIPNESTSTAY for 20% off.');
    }
  }, [coupon, basePrice]);

  const handleProceedToPayment = useCallback((e) => {
    e.preventDefault();
    if (!guestName || !email || !phone) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    navigate(`/payment?type=hotel&hotel=${encodeURIComponent(hotelName)}&room=${encodeURIComponent(roomName)}&fare=${total}&passenger=${encodeURIComponent(guestName)}`);
  }, [guestName, email, phone, hotelName, roomName, total, navigate]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1040px] mx-auto">
        {/* Breadcrumb Steps */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#0D9488]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/hotels/search" className="hover:text-[#0D9488]">Hotels</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D9488]">Review Hotel Booking</span>
        </div>

        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Hotel Summary Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#0F172A]">{hotelName}</h3>
                  <p className="text-xs text-gray-500 font-medium">Bambolim Bay, Goa • 5 Star Luxury</p>
                </div>
              </div>

              {/* Dates & Room Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs mb-4">
                <div>
                  <span className="text-gray-400 font-bold block mb-1">CHECK-IN</span>
                  <p className="text-sm font-black text-[#0F172A]">14 Oct 2026 (2:00 PM)</p>
                  <p className="text-gray-500">Wednesday</p>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-1">CHECK-OUT</span>
                  <p className="text-sm font-black text-[#0F172A]">16 Oct 2026 (11:00 AM)</p>
                  <p className="text-gray-500">Friday • 2 Nights</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200">
                <p className="text-xs font-black text-[#0D9488]">{roomName}</p>
                <p className="text-[11px] text-gray-600 font-medium">{planName} • 1 Room, 2 Adults</p>
              </div>
            </div>

            {/* Guest Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <h3 className="font-black text-base text-[#0F172A] pb-2 border-b border-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-[#0D9488]" />
                <span>Primary Guest Details</span>
              </h3>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name (as per ID)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omkar Sharma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Email (Voucher will be sent here)</label>
                  <input
                    type="email"
                    required
                    placeholder="omkar@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Quiet room, high floor, non-smoking"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Price Breakdown */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-black text-sm text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
                Price Breakdown
              </h4>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Room Charges (2 Nights)</span>
                  <span className="font-bold text-gray-800">₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Hotel GST & Taxes (12%)</span>
                  <span className="font-bold text-gray-800">₹{taxes.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Promo Code (TRIPNESTSTAY)</span>
                    <span>- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-black text-[#0F172A]">Total Payable</span>
                  <span className="text-xl font-black text-[#0D9488]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Promo box */}
              <div className="mb-6 pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-gray-700 block mb-1 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Promo / Coupon Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter TRIPNESTSTAY"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 uppercase text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

HotelReview.displayName = 'HotelReview';

export default HotelReview;
