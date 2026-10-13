import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Youtube, Linkedin, 
  ChevronDown, ChevronUp 
} from 'lucide-react';
import brand from '@/config/brand';
import { footerLinks } from '@/config/navigation';
import TripNestLogo from '@/components/ui/TripNestLogo';

const Footer = React.memo(() => {
  const [expandedSection, setExpandedSection] = useState(null);
  const currentYear = new Date().getFullYear();

  const toggleSection = useCallback((index) => {
    setExpandedSection((prev) => (prev === index ? null : index));
  }, []);

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-12 pb-24 md:pb-8 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-800 pb-8 mb-8 gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <TripNestLogo isDark={true} size="lg" />
            <p className="text-slate-400 text-sm text-center md:text-left mt-1">Your trusted travel partner for seamless journeys.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Youtube"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          {footerLinks?.map((section, idx) => (
            <div key={idx} className="border-b border-slate-800 md:border-0 pb-4 md:pb-0">
              <button 
                className="flex justify-between items-center w-full md:cursor-default py-2"
                onClick={() => toggleSection(idx)}
                aria-expanded={expandedSection === idx}
              >
                <h3 className="text-white font-bold text-base tracking-wide uppercase">{section.title}</h3>
                <span className="md:hidden">
                  {expandedSection === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              
              <ul className={`mt-3 space-y-2 ${expandedSection === idx ? 'block' : 'hidden md:block'}`}>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link to={link.path} className="hover:text-teal-300 hover:underline transition-colors block py-1 text-slate-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO Text */}
        <div className="mb-10 text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-8">
          <p className="mb-3">
            <strong className="text-slate-200">Online Travel Booking in India</strong><br/>
            {brand.name} is India's leading online travel booking platform, dedicated to making your travel seamless and affordable. We offer a comprehensive suite of travel services ranging from domestic and international flight tickets to hotel reservations, homestays, holiday packages, bus tickets, and train bookings. With a focus on customer satisfaction and technological innovation, {brand.name} provides a user-friendly interface to search, compare, and book the best travel options suited for your needs.
          </p>
          <p>
            Whether you are planning a business trip, a family vacation, or a solo adventure, our robust platform ensures secure payments, competitive pricing, and dedicated customer support. We partner with top airlines, hotel chains, and transport providers to bring you exclusive deals and offers. Experience the joy of hassle-free travel planning with {brand.name}.
          </p>
        </div>

        {/* Badges & Payments */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-white font-semibold">Download App</span>
            <div className="flex gap-3">
              <div className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 cursor-pointer hover:bg-slate-700">
                <span className="text-xs">GET IT ON<br/><strong className="text-sm">Google Play</strong></span>
              </div>
              <div className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 cursor-pointer hover:bg-slate-700">
                <span className="text-xs">Download on the<br/><strong className="text-sm">App Store</strong></span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-white font-semibold">100% Secure Payments</span>
            <div className="flex flex-wrap justify-center gap-2">
              {['Visa', 'Mastercard', 'Amex', 'RuPay', 'UPI', 'Net Banking'].map(method => (
                <span key={method} className="bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {currentYear} {brand.legalEntity || brand.name}. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
