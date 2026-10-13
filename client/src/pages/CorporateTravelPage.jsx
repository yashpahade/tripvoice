import React, { useState, useCallback } from 'react';
import { 
  Check, 
  MapPin 
} from 'lucide-react';
import { CORPORATE_PACKAGES } from '@/data/corporate';

const CorporateTravelPage = React.memo(() => {
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [groupSize, setGroupSize] = useState('30-50');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    alert(`Thank you ${companyName}! Our Corporate Account Director will email a custom itinerary & GST breakdown to ${workEmail} within 30 minutes.`);
    setCompanyName('');
    setWorkEmail('');
    setPhone('');
  }, [companyName, workEmail]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white py-14 px-4 shadow-md">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-black text-teal-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
              TripNest Corporate & MICE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black mt-3 tracking-tight leading-tight">
              Office Packages & Team Offsites
            </h1>
            <p className="text-sm text-gray-200 mt-2 max-w-xl leading-relaxed">
              Curated corporate retreats, team outings, annual conferences and leadership offsites with full GST Input Tax Credit invoices (18% savings) and dedicated event planners.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-6 text-xs">
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="text-lg font-black text-teal-300">18% GST</p>
                <p className="text-gray-300 font-semibold">Input Credit Invoice</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="text-lg font-black text-teal-300">500+ Offsites</p>
                <p className="text-gray-300 font-semibold">Successfully Executed</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                <p className="text-lg font-black text-teal-300">24x7</p>
                <p className="text-gray-300 font-semibold">On-ground Coordinator</p>
              </div>
            </div>
          </div>

          {/* Instant Corporate RFP Form */}
          <div className="lg:col-span-5 bg-white text-gray-900 rounded-2xl p-6 shadow-2xl border border-slate-100">
            <h3 className="font-black text-lg text-[#0F172A] mb-1">Get Custom Corporate Quote</h3>
            <p className="text-xs text-gray-500 mb-4">Receive custom offsite proposal within 30 minutes</p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Technologies Pvt Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Corporate Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Expected Group Size</label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488]"
                  >
                    <option value="10-25">10 - 25 Employees</option>
                    <option value="25-50">25 - 50 Employees</option>
                    <option value="50-100">50 - 100 Employees</option>
                    <option value="100+">100+ Employees</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white font-black rounded-xl shadow-md uppercase tracking-wider text-xs"
              >
                REQUEST CUSTOM PROPOSAL
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Office Packages Grid */}
      <div className="max-w-[1240px] mx-auto px-4 py-8 space-y-6">
        <h2 className="text-2xl font-black text-[#0F172A]">Trending Corporate Offsite Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORPORATE_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:border-teal-200 hover:shadow-lg transition-all grid grid-cols-1 sm:grid-cols-12"
            >
              <div className="sm:col-span-5 relative h-52 sm:h-auto overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              </div>

              <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{pkg.destination}</span>
                    </span>
                    <span className="font-bold text-[#0D9488]">{pkg.duration}</span>
                  </div>

                  <h3 className="text-base font-black text-[#0F172A] leading-tight mb-2">
                    {pkg.title}
                  </h3>

                  <div className="space-y-1 text-xs text-gray-600">
                    {pkg.inclusions.map((inc, i) => (
                      <p key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{inc}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold">STARTING FROM</span>
                    <span className="text-xl font-black text-[#0F172A]">₹{pkg.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-gray-500 font-semibold"> / employee</span>
                  </div>

                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl"
                  >
                    Get RFP Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CorporateTravelPage.displayName = 'CorporateTravelPage';

export default CorporateTravelPage;
