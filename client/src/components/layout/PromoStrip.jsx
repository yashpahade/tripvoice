import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import brand from '@/config/brand';
import { dismissPromoStrip } from '@/store/slices/uiSlice';

const PromoStrip = React.memo(() => {
  const dispatch = useDispatch();
  const isDismissed = useSelector((state) => state.ui?.promoStripDismissed || false);

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white overflow-hidden shadow-xs"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex-1 flex justify-center items-center gap-2">
              <span className="font-black text-[#F97316]">🔥 HOT DEAL</span>
              <span>Flat 15% OFF on Domestic Flights! Use code: <strong>{brand.name.toUpperCase()}FLY</strong></span>
              <a href="/offers" className="underline font-bold hover:text-teal-200 ml-2">Book Now</a>
            </div>
            <button
              onClick={() => dispatch(dismissPromoStrip())}
              className="p-1 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Dismiss promo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PromoStrip.displayName = 'PromoStrip';

export default PromoStrip;
