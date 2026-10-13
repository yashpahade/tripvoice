import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Bus, User, Clock, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';

const BusPassengerDetails = React.memo(() => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const operator = searchParams.get('operator') || 'IntrCity SmartBus';
  const busType = searchParams.get('busType') || 'Volvo 9600 AC Sleeper (2+1)';
  const seatsString = searchParams.get('seats') || '2';
  const seats = seatsString.split(',');
  const fare = Number(searchParams.get('fare')) || 950;
  const bp = searchParams.get('bp') || 'Majestic Bus Stand';
  const bpTime = searchParams.get('bpTime') || '21:30';
  const dp = searchParams.get('dp') || 'Ameerpet Metro Station';
  const dpTime = searchParams.get('dpTime') || '06:30';
  const fromCity = searchParams.get('from') || 'Bengaluru';
  const toCity = searchParams.get('to') || 'Hyderabad';

  // State for passengers per seat
  const [passengers, setPassengers] = useState(() =>
    seats.map((seatNo) => ({ seat: seatNo, name: '', age: '', gender: 'Male' }))
  );
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [insurance, setInsurance] = useState(true);

  const handlePassengerChange = useCallback((index, field, value) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    for (let p of passengers) {
      if (!p.name || !p.age) {
        alert(`Please fill in name and age for Seat ${p.seat}.`);
        return;
      }
    }
    if (!email || !phone) {
      alert('Please provide contact email and phone number.');
      return;
    }

    const totalFare = fare + (insurance ? 15 * seats.length : 0);
    navigate(`/payment?type=bus&seats=${seatsString}&fare=${totalFare}&passenger=${encodeURIComponent(passengers[0].name)}&operator=${encodeURIComponent(operator)}`);
  }, [passengers, email, phone, fare, insurance, seats.length, navigate, seatsString, operator]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4">
      <div className="max-w-[1040px] mx-auto">
        {/* Breadcrumb Steps */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#D84E55]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/bus-tickets/search?from=${fromCity}&to=${toCity}`} className="hover:text-[#D84E55]">Bus Results</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#D84E55]">Passenger Details & Seats</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form & Seat Summary */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bus Itinerary & Pickup Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D84E55] flex items-center justify-center font-bold">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#0F172A]">{operator}</h3>
                  <p className="text-xs text-gray-500 font-medium">{busType}</p>
                </div>
              </div>

              {/* Boarding and Dropping Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                <div>
                  <span className="text-gray-400 font-bold block mb-1">BOARDING POINT</span>
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Clock className="w-4 h-4 text-[#D84E55]" />
                    <span className="font-black text-sm">{bpTime}</span>
                    <span>- {bp}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{fromCity}</p>
                </div>

                <div>
                  <span className="text-gray-400 font-bold block mb-1">DROPPING POINT</span>
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Clock className="w-4 h-4 text-[#D84E55]" />
                    <span className="font-black text-sm">{dpTime}</span>
                    <span>- {dp}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{toCity}</p>
                </div>
              </div>
            </div>

            {/* Passenger Forms per Seat */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
              <h3 className="font-black text-base text-[#0F172A] pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Passenger Information</span>
                <span className="text-xs bg-red-50 text-[#D84E55] font-bold px-2.5 py-1 rounded-full">
                  {seats.length} Seat(s) Selected: {seats.join(', ')}
                </span>
              </h3>

              {passengers.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D84E55]" />
                      <span>Passenger {idx + 1}</span>
                    </span>
                    <span className="text-xs font-black bg-[#D84E55] text-white px-2 py-0.5 rounded">
                      Seat: {p.seat}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suresh Kumar"
                        value={p.name}
                        onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#D84E55]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-gray-700 block mb-1">Age</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={100}
                        placeholder="Age"
                        value={p.age}
                        onChange={(e) => handlePassengerChange(idx, 'age', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#D84E55]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="text-xs font-bold text-gray-700 block mb-1">Gender</label>
                      <select
                        value={p.gender}
                        onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value)}
                        className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#D84E55]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Contact Details */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-gray-700 mb-3 uppercase tracking-wider">Contact Details (Ticket will be sent here)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Email ID</label>
                    <input
                      type="email"
                      required
                      placeholder="suresh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D84E55]"
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
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#D84E55]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Insurance Protection */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#D84E55] focus:ring-[#D84E55]"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-black text-[#0F172A]">Add Travel Insurance</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+ ₹15 / person</span>
                  </div>
                  <p className="text-gray-500">Includes accidental coverage up to ₹5,00,000 & baggage loss protection.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Column: Price Summary & Checkout */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h4 className="font-black text-sm text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
                Fare Breakdown
              </h4>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Base Ticket Fare ({seats.length} seats)</span>
                  <span className="font-bold text-gray-800">₹{fare.toLocaleString('en-IN')}</span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-gray-600">
                    <span>Travel Insurance</span>
                    <span className="font-bold text-gray-800">₹{15 * seats.length}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST & Service Tax</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-black text-[#0F172A]">Total Amount</span>
                  <span className="text-xl font-black text-[#D84E55]">
                    ₹{(fare + (insurance ? 15 * seats.length : 0)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D84E55] hover:bg-[#b93a40] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
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

BusPassengerDetails.displayName = 'BusPassengerDetails';

export default BusPassengerDetails;
