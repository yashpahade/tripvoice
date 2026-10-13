import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftRight, ChevronDown, Check, 
  Plane, X 
} from 'lucide-react';
import { AIRPORTS, SPECIAL_FARES } from '@/data/flights';

const FlightSearchForm = React.memo(() => {
  const navigate = useNavigate();

  // Search state
  const [tripType, setTripType] = useState('oneWay'); // 'oneWay' | 'roundTrip' | 'multiCity'
  const [fromAirport, setFromAirport] = useState(AIRPORTS[0]); // Delhi
  const [toAirport, setToAirport] = useState(AIRPORTS[1]); // Bengaluru
  const [departureDate, setDepartureDate] = useState('2026-10-13');
  const [returnDate, setReturnDate] = useState('');
  
  // Travellers & Class
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('Economy/Premium Economy');

  // Special fare
  const [selectedFare, setSelectedFare] = useState('regular');
  const [priceDropProtection, setPriceDropProtection] = useState(false);

  // Popovers
  const [activePopover, setActivePopover] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const popoverRef = useRef(null);

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Swap From and To
  const handleSwapAirports = useCallback((e) => {
    e.stopPropagation();
    setFromAirport((prevFrom) => {
      setToAirport(prevFrom);
      return toAirport;
    });
  }, [toAirport]);

  // Format date helper
  const formatDateDisplay = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = String(date.getFullYear()).slice(-2);
    const weekday = date.toLocaleString('default', { weekday: 'long' });
    return { day, monthYear: `${month}'${year}`, weekday };
  };

  const departureFormatted = formatDateDisplay(departureDate);
  const returnFormatted = returnDate ? formatDateDisplay(returnDate) : null;

  const handleSearch = useCallback(() => {
    const query = new URLSearchParams({
      from: fromAirport.code,
      to: toAirport.code,
      departure: departureDate,
      tripType,
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      cabin: cabinClass,
      fare: selectedFare
    });
    if (returnDate) query.append('return', returnDate);

    navigate(`/flights/search?${query.toString()}`);
  }, [fromAirport.code, toAirport.code, departureDate, tripType, adults, children, infants, cabinClass, selectedFare, returnDate, navigate]);

  return (
    <div className="relative">
      {/* Row 1: Trip Type Radios & Right Caption */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 px-1">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === 'oneWay'} 
              onChange={() => setTripType('oneWay')} 
              className="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488] border-gray-300"
            />
            <span className={`text-sm font-bold ${tripType === 'oneWay' ? 'text-[#0F172A]' : 'text-gray-600'}`}>
              One Way
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === 'roundTrip'} 
              onChange={() => {
                setTripType('roundTrip');
                if (!returnDate) setReturnDate('2026-10-18');
              }} 
              className="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488] border-gray-300"
            />
            <span className={`text-sm font-bold ${tripType === 'roundTrip' ? 'text-[#0F172A]' : 'text-gray-600'}`}>
              Round Trip
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="radio" 
              name="tripType" 
              checked={tripType === 'multiCity'} 
              onChange={() => setTripType('multiCity')} 
              className="w-4 h-4 text-[#0D9488] focus:ring-[#0D9488] border-gray-300"
            />
            <span className={`text-sm font-bold ${tripType === 'multiCity' ? 'text-gray-900' : 'text-gray-600'}`}>
              Multi City
            </span>
          </label>
        </div>

        <p className="text-xs font-semibold text-gray-500 hidden sm:block">
          Book International and Domestic Flights
        </p>
      </div>

      {/* Row 2: Search Inputs Grid Container */}
      <div 
        ref={popoverRef}
        className="relative border border-slate-300 rounded-xl bg-white grid grid-cols-1 md:grid-cols-12 shadow-sm transition-all divide-y md:divide-y-0 md:divide-x divide-slate-300"
      >
        {/* 1. FROM */}
        <div 
          onClick={() => {
            setActivePopover(activePopover === 'from' ? null : 'from');
            setSearchFilter('');
          }}
          className={`col-span-1 md:col-span-3 p-3.5 cursor-pointer relative transition-colors rounded-t-xl md:rounded-l-xl md:rounded-tr-none ${
            activePopover === 'from' ? 'bg-[#F0FDFA]' : 'hover:bg-[#F0FDFA]/60'
          }`}
        >
          <span className="text-xs font-bold text-gray-500 block mb-0.5">From</span>
          <h3 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
            {fromAirport.city}
          </h3>
          <p className="text-xs text-gray-500 font-medium truncate">
            {fromAirport.code}, {fromAirport.airport}
          </p>

          {/* Swap Button (Floating on the right border) */}
          <button
            type="button"
            onClick={handleSwapAirports}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md hidden md:flex items-center justify-center text-[#0D9488] hover:shadow-lg hover:scale-110 active:scale-95 transition-all"
            title="Swap Cities"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          {/* FROM Popover */}
          {activePopover === 'from' && (
            <div className="absolute left-0 top-full mt-2 w-80 md:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-3 border-b">
                <span className="text-xs font-bold text-gray-700">Select Departure Airport</span>
                <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <input 
                type="text"
                placeholder="Type city or airport code..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-[#0D9488]"
              />
              <div className="max-h-60 overflow-y-auto space-y-1">
                {AIRPORTS.filter(a => 
                  a.city.toLowerCase().includes(searchFilter.toLowerCase()) || 
                  a.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  a.airport.toLowerCase().includes(searchFilter.toLowerCase())
                ).map((apt) => (
                  <div
                    key={apt.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromAirport(apt);
                      setActivePopover('to');
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      fromAirport.code === apt.code ? 'bg-teal-50 text-[#0D9488]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-black text-[#0F172A]">{apt.city}, {apt.country}</p>
                      <p className="text-[10px] text-gray-500 truncate max-w-[200px]">{apt.airport}</p>
                    </div>
                    <span className="text-xs font-black text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {apt.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. TO */}
        <div 
          onClick={() => {
            setActivePopover(activePopover === 'to' ? null : 'to');
            setSearchFilter('');
          }}
          className={`col-span-1 md:col-span-3 p-3.5 md:pl-6 cursor-pointer relative transition-colors ${
            activePopover === 'to' ? 'bg-[#F0FDFA]' : 'hover:bg-[#F0FDFA]/60'
          }`}
        >
          <span className="text-xs font-bold text-gray-500 block mb-0.5">To</span>
          <h3 className="text-3xl font-black text-[#0F172A] tracking-tight leading-none mb-1">
            {toAirport.city}
          </h3>
          <p className="text-xs text-gray-500 font-medium truncate">
            {toAirport.code}, {toAirport.airport}
          </p>

          {/* TO Popover */}
          {activePopover === 'to' && (
            <div className="absolute left-0 top-full mt-2 w-80 md:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-3 border-b">
                <span className="text-xs font-bold text-gray-700">Select Destination Airport</span>
                <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <input 
                type="text"
                placeholder="Type city or airport code..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                className="w-full text-xs p-2.5 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:border-[#0D9488]"
              />
              <div className="max-h-60 overflow-y-auto space-y-1">
                {AIRPORTS.filter(a => 
                  a.city.toLowerCase().includes(searchFilter.toLowerCase()) || 
                  a.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
                  a.airport.toLowerCase().includes(searchFilter.toLowerCase())
                ).map((apt) => (
                  <div
                    key={apt.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setToAirport(apt);
                      setActivePopover('departure');
                    }}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      toAirport.code === apt.code ? 'bg-teal-50 text-[#0D9488]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-black text-[#0F172A]">{apt.city}, {apt.country}</p>
                      <p className="text-[10px] text-gray-500 truncate max-w-[200px]">{apt.airport}</p>
                    </div>
                    <span className="text-xs font-black text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {apt.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. DEPARTURE */}
        <div 
          onClick={() => setActivePopover(activePopover === 'departure' ? null : 'departure')}
          className={`col-span-1 md:col-span-2 p-3.5 cursor-pointer relative transition-colors ${
            activePopover === 'departure' ? 'bg-[#F0FDFA]' : 'hover:bg-[#F0FDFA]/60'
          }`}
        >
          <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-0.5">
            <span>Departure</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">
              {departureFormatted?.day || '13'}
            </span>
            <span className="text-base font-bold text-[#0F172A]">
              {departureFormatted?.monthYear || "Oct'26"}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {departureFormatted?.weekday || 'Tuesday'}
          </p>

          {/* Departure Datepicker Popover */}
          {activePopover === 'departure' && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-3 border-b">
                <span className="text-xs font-bold text-gray-700">Select Departure Date</span>
                <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <input 
                type="date"
                value={departureDate}
                onChange={(e) => {
                  setDepartureDate(e.target.value);
                  setActivePopover(null);
                }}
                className="w-full p-2 border rounded-lg text-sm font-semibold mb-3 focus:outline-none focus:border-[#0D9488]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDepartureDate(new Date().toISOString().split('T')[0]);
                    setActivePopover(null);
                  }}
                  className="flex-1 py-1.5 text-xs font-bold bg-teal-50 text-[#0D9488] rounded-lg hover:bg-teal-100"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const tmrw = new Date();
                    tmrw.setDate(tmrw.getDate() + 1);
                    setDepartureDate(tmrw.toISOString().split('T')[0]);
                    setActivePopover(null);
                  }}
                  className="flex-1 py-1.5 text-xs font-bold bg-teal-50 text-[#0D9488] rounded-lg hover:bg-teal-100"
                >
                  Tomorrow
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. RETURN */}
        <div 
          onClick={() => {
            if (tripType !== 'roundTrip') {
              setTripType('roundTrip');
              if (!returnDate) setReturnDate('2026-10-18');
            }
            setActivePopover(activePopover === 'return' ? null : 'return');
          }}
          className={`col-span-1 md:col-span-2 p-3.5 cursor-pointer relative transition-colors ${
            activePopover === 'return' ? 'bg-[#F0FDFA]' : 'hover:bg-[#F0FDFA]/60'
          }`}
        >
          <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-0.5">
            <span>Return</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>

          {returnFormatted ? (
            <>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">
                  {returnFormatted.day}
                </span>
                <span className="text-base font-bold text-[#0F172A]">
                  {returnFormatted.monthYear}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                {returnFormatted.weekday}
              </p>
            </>
          ) : (
            <div className="py-1">
              <p className="text-xs text-gray-400 font-semibold leading-tight">
                Tap to add return date
              </p>
              <p className="text-[10px] text-teal-600 font-bold mt-1">
                Save more on round trips
              </p>
            </div>
          )}

          {/* Return Datepicker Popover */}
          {activePopover === 'return' && (
            <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-3 border-b">
                <span className="text-xs font-bold text-gray-700">Select Return Date</span>
                <button onClick={(e) => { e.stopPropagation(); setActivePopover(null); }}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <input 
                type="date"
                value={returnDate}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setActivePopover(null);
                }}
                className="w-full p-2 border rounded-lg text-sm font-semibold mb-3 focus:outline-none focus:border-[#0D9488]"
              />
            </div>
          )}
        </div>

        {/* 5. TRAVELLERS & CLASS */}
        <div 
          onClick={() => setActivePopover(activePopover === 'travellers' ? null : 'travellers')}
          className={`col-span-1 md:col-span-2 p-3.5 cursor-pointer relative transition-colors rounded-b-xl md:rounded-r-xl md:rounded-bl-none ${
            activePopover === 'travellers' ? 'bg-[#F0FDFA]' : 'hover:bg-[#F0FDFA]/60'
          }`}
        >
          <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-0.5">
            <span>Travellers & Class</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-black text-[#0F172A] tracking-tight leading-none">
              {adults + children + infants}
            </span>
            <span className="text-base font-bold text-[#0F172A]">
              Traveller{(adults + children + infants) > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-gray-500 font-medium truncate">
            {cabinClass.split('/')[0]}
          </p>

          {/* Travellers Popover */}
          {activePopover === 'travellers' && (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b">
                <span className="text-xs font-bold text-gray-700">Select Travellers & Cabin Class</span>
                <button onClick={() => setActivePopover(null)}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              {/* Adults Counter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <p className="text-xs font-black text-[#0F172A]">ADULTS (12y +)</p>
                    <p className="text-[10px] text-gray-500">on the day of travel</p>
                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAdults(num)}
                        className={`w-7 h-7 text-xs font-bold ${
                          adults === num ? 'bg-[#0D9488] text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Children Counter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <p className="text-xs font-black text-[#0F172A]">CHILDREN (2y - 12y)</p>
                    <p className="text-[10px] text-gray-500">on the day of travel</p>
                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    {[0, 1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setChildren(num)}
                        className={`w-7 h-7 text-xs font-bold ${
                          children === num ? 'bg-[#0D9488] text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Infants Counter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <p className="text-xs font-black text-[#0F172A]">INFANTS (under 2y)</p>
                    <p className="text-[10px] text-gray-500">on the day of travel</p>
                  </div>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    {[0, 1, 2].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setInfants(num)}
                        className={`w-7 h-7 text-xs font-bold ${
                          infants === num ? 'bg-[#0D9488] text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="mb-4 border-t pt-3">
                <p className="text-xs font-black text-[#0F172A] mb-2">CHOOSE CABIN CLASS</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Economy/Premium Economy', 'Premium Economy', 'Business', 'First Class'].map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setCabinClass(cls)}
                      className={`text-[11px] font-bold p-2 rounded-lg border text-left transition-all ${
                        cabinClass === cls 
                          ? 'border-[#0D9488] bg-teal-50 text-[#0D9488]' 
                          : 'border-slate-200 text-gray-700 hover:bg-slate-50'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActivePopover(null)}
                className="w-full py-2.5 bg-[#0D9488] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-[#0F766E] transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Row 3: Select a Special Fare Chips */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-1">
        <div className="text-xs font-black text-[#0F172A] leading-tight mr-1">
          Select a<br />special fare
        </div>

        <div className="flex flex-wrap items-center gap-2 flex-grow">
          {SPECIAL_FARES.map((fare) => {
            const isSelected = selectedFare === fare.id;
            return (
              <button
                key={fare.id}
                type="button"
                onClick={() => setSelectedFare(fare.id)}
                className={`relative px-3 py-1.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-[#0D9488] bg-[#F0FDFA] shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {fare.isNew && (
                  <span className="absolute -top-1.5 right-1 px-1 py-0.2 bg-[#F97316] text-white text-[8px] font-black rounded-sm uppercase tracking-tighter">
                    new
                  </span>
                )}
                <p className="text-[11px] font-bold text-[#0F172A] leading-tight flex items-center gap-1">
                  {fare.title}
                </p>
                <p className="text-[9px] text-gray-500 leading-tight">
                  {fare.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 4: Add-on Protection & Flight Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
        {/* Left: Price Drop Protection */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={priceDropProtection} 
            onChange={(e) => setPriceDropProtection(e.target.checked)} 
            className="w-4 h-4 rounded text-[#0D9488] focus:ring-[#0D9488] border-gray-300"
          />
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#0F172A]">Add Price Drop Protection</span>
            <span className="text-gray-500 hidden sm:inline">Price drops, we'll refund the difference.</span>
            <a href="#details" onClick={(e) => { e.preventDefault(); alert("Price Drop Protection guarantees you get a refund if fares drop before departure!"); }} className="text-[#0D9488] font-semibold hover:underline">
              View Details
            </a>
            <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center text-[#0D9488] font-black text-[10px]">
              ₹
            </div>
          </div>
        </label>

        {/* Right: Flight Status Button */}
        <button
          type="button"
          onClick={() => alert("Live flight tracking: enter your flight number to check status.")}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <Plane className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Flight Status</span>
        </button>
      </div>

      {/* SEARCH BUTTON (Centered Bottom Edge) */}
      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleSearch}
          className="bg-gradient-to-r from-[#2DD4BF] via-[#0D9488] to-[#0F766E] hover:from-[#0D9488] hover:to-[#115E59] text-white font-black text-2xl tracking-widest px-16 sm:px-24 py-3 sm:py-3.5 rounded-full shadow-[0_10px_25px_rgba(13,148,136,0.4)] hover:shadow-[0_12px_30px_rgba(13,148,136,0.6)] hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
});

FlightSearchForm.displayName = 'FlightSearchForm';

export default FlightSearchForm;
