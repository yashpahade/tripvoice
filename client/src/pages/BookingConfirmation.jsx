import React, { useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  CheckCircle, Plane, Printer, Download, 
  Armchair, QrCode, ArrowLeft 
} from 'lucide-react';

const BookingConfirmation = React.memo(() => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const pnr = id || 'TN748291';
  const seats = searchParams.get('seats') || '12A';
  const passenger = searchParams.get('passenger') || 'Mr Rahul Sharma';

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-8 px-4 print:bg-white print:py-0">
      <div className="max-w-[860px] mx-auto">
        {/* Success Header (Hidden in print) */}
        <div className="text-center mb-8 print:hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-sm animate-bounce duration-1000">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-[#0F172A]">Flight Booking Confirmed!</h2>
          <p className="text-xs text-gray-500 font-medium mt-1">
            We have sent your E-Ticket confirmation and boarding details to your email.
          </p>
        </div>

        {/* E-TICKET CARD */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-6">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center font-black text-xs text-teal-300">
                6E
              </div>
              <div>
                <h3 className="font-black text-lg">IndiGo 6E-205</h3>
                <p className="text-xs text-teal-100">Airbus A320neo • Economy Class</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-teal-200 font-bold block">PNR NUMBER</span>
              <span className="font-mono font-black text-xl text-amber-300 tracking-wider">{pnr}</span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Dep / Arr Flight Path */}
            <div className="grid grid-cols-3 items-center text-center pb-6 border-b border-slate-100">
              <div className="text-left">
                <span className="text-xs font-bold text-gray-400">DEPARTURE</span>
                <p className="text-3xl font-black text-[#0F172A] mt-1">06:00</p>
                <p className="text-sm font-bold text-gray-800">DEL - Delhi</p>
                <p className="text-xs text-gray-500 font-medium">Indira Gandhi Intl Airport, T3</p>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-gray-400 mb-1">2h 45m</span>
                <div className="w-28 h-0.5 bg-gray-300 relative flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#0D9488] absolute -top-2" />
                </div>
                <span className="text-[10px] font-bold text-teal-600 mt-1">Non-stop</span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-gray-400">ARRIVAL</span>
                <p className="text-3xl font-black text-[#0F172A] mt-1">08:45</p>
                <p className="text-sm font-bold text-gray-800">BLR - Bengaluru</p>
                <p className="text-xs text-gray-500 font-medium">Kempegowda Intl Airport, T1</p>
              </div>
            </div>

            {/* Passenger & SEAT DETAILS HIGHLIGHT */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-teal-50/60 border border-teal-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">PASSENGER NAME</span>
                <p className="text-xs font-black text-[#0F172A] truncate">{passenger}</p>
              </div>

              {/* SEAT NUMBER CONFIRMED */}
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-700 block mb-0.5">SEAT NUMBER</span>
                <p className="text-base font-black text-[#0D9488] flex items-center gap-1">
                  <Armchair className="w-4 h-4 text-[#0D9488]" />
                  <span>{seats}</span>
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">BOARDING GATE</span>
                <p className="text-xs font-black text-[#0F172A]">Gate 14B</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">BOARDING TIME</span>
                <p className="text-xs font-black text-[#0F172A]">05:15 AM</p>
              </div>
            </div>

            {/* Baggage & Barcode / QR Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-gray-700">Baggage Allowance:</p>
                <p className="text-gray-500">Cabin: 7 Kgs / Adult • Check-in: 15 Kgs / Adult</p>
                <p className="text-[11px] text-teal-600 font-bold">✓ Web Check-in Available</p>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-white rounded border flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-gray-800" />
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">SCAN AT AIRPORT</span>
                  <span className="text-xs font-mono font-bold text-gray-700">{pnr}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Hidden in print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-gray-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-gray-700 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-4 h-4 text-gray-600" />
              <span>Print E-Ticket</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0F766E] hover:from-[#0F766E] hover:to-[#115E59] text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

BookingConfirmation.displayName = 'BookingConfirmation';

export default BookingConfirmation;
