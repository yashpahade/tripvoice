import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  CreditCard, Smartphone, Building, 
  Clock, Lock, ArrowRight, Armchair, Plane 
} from 'lucide-react';

const Payment = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const flightId = searchParams.get('flightId') || 'f1';
  const seats = searchParams.get('seats') || '12A';
  const passenger = searchParams.get('passenger') || 'Mr Rahul Sharma';

  // State
  const [method, setMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('4111 1111 1111 1111');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');
  const [isProcessing, setIsProcessing] = useState(false);

  // 15 min Countdown timer
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handlePay = useCallback((e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const pnr = 'TN' + Math.floor(100000 + Math.random() * 900000);
      navigate(`/booking/confirmation/${pnr}?flightId=${flightId}&seats=${seats}&passenger=${encodeURIComponent(passenger)}`);
    }, 1500);
  }, [flightId, seats, passenger, navigate]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1040px] mx-auto">
        {/* Top Timer Strip */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-center justify-between text-xs text-amber-900 font-bold">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Seats are locked for you. Complete payment within:</span>
          </div>
          <span className="text-amber-700 font-black text-sm bg-amber-100 px-2 py-0.5 rounded">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-black text-base text-[#0F172A] mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#0D9488]" />
              <span>Choose Payment Method</span>
            </h3>

            {/* Method Tabs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  method === 'upi'
                    ? 'border-[#0D9488] bg-teal-50 text-[#0D9488] shadow-xs'
                    : 'border-slate-200 text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                <span>UPI (GPay/PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  method === 'card'
                    ? 'border-[#0D9488] bg-teal-50 text-[#0D9488] shadow-xs'
                    : 'border-slate-200 text-gray-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('netbanking')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  method === 'netbanking'
                    ? 'border-[#0D9488] bg-teal-50 text-[#0D9488] shadow-xs'
                    : 'border-slate-200 text-gray-700 hover:bg-slate-50'
                }`}
              >
                <Building className="w-5 h-5" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* UPI Form */}
            {method === 'upi' && (
              <div className="space-y-4 animate-in fade-in">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <p className="font-bold text-gray-800 mb-1">Instant UPI Payment</p>
                  <p className="text-gray-500 mb-3">Enter your virtual payment address (VPA) / UPI ID</p>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
              </div>
            )}

            {/* Card Form */}
            {method === 'card' && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking Form */}
            {method === 'netbanking' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in text-xs font-bold text-gray-700">
                {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((b) => (
                  <button key={b} type="button" className="p-3 border rounded-xl hover:border-[#0D9488] hover:bg-teal-50">
                    {b}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay Securely ₹5,699</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h4 className="font-black text-sm text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
              Trip Details
            </h4>

            <div className="space-y-3 text-xs mb-4">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-[#0D9488]" />
                <span className="font-bold text-gray-800">IndiGo 6E-205 (DEL → BLR)</span>
              </div>
              <p className="text-gray-500">Passenger: <span className="font-bold text-gray-800">{passenger}</span></p>

              {/* SEAT DISPLAY */}
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-bold text-gray-700">Selected Seat:</span>
                </div>
                <span className="font-black text-[#0D9488] bg-white px-2 py-0.5 rounded shadow-2xs">
                  {seats}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
              <span className="font-black text-[#0F172A]">Total Paid:</span>
              <span className="text-xl font-black text-[#0D9488]">₹5,699</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Payment.displayName = 'Payment';

export default Payment;
