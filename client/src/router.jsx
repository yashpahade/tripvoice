import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

// Optimized Page Loader
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0D9488] border-t-transparent"></div>
  </div>
);

// 17 Unique Lazy-Loaded Page Components (Consolidated from 87 redundant imports)
const Home = lazy(() => import('@/pages/Home'));
const FlightResults = lazy(() => import('@/pages/FlightResults'));
const FlightReview = lazy(() => import('@/pages/FlightReview'));
const FlightTravellerDetails = lazy(() => import('@/pages/FlightTravellerDetails'));
const HotelResults = lazy(() => import('@/pages/HotelResults'));
const HotelDetails = lazy(() => import('@/pages/HotelDetails'));
const HotelReview = lazy(() => import('@/pages/HotelReview'));
const BusResults = lazy(() => import('@/pages/BusResults'));
const BusPassengerDetails = lazy(() => import('@/pages/BusPassengerDetails'));
const HolidayPackagesPage = lazy(() => import('@/pages/HolidayPackagesPage'));
const CorporateTravelPage = lazy(() => import('@/pages/CorporateTravelPage'));
const Payment = lazy(() => import('@/pages/Payment'));
const BookingConfirmation = lazy(() => import('@/pages/BookingConfirmation'));
const UserDashboard = lazy(() => import('@/pages/UserDashboard'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const ComingSoon = lazy(() => import('@/pages/ComingSoon'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function RouterConfig() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          {/* Home */}
          <Route path="/" element={<Home />} />
          
          {/* Flights Booking Flow */}
          <Route path="/flights" element={<FlightResults />} />
          <Route path="/flights/search" element={<FlightResults />} />
          <Route path="/flights/review" element={<FlightReview />} />
          <Route path="/flights/traveller-details" element={<FlightTravellerDetails />} />
          
          {/* Hotels & Homestays Flow */}
          <Route path="/hotels" element={<HotelResults />} />
          <Route path="/hotels/search" element={<HotelResults />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotels/review" element={<HotelReview />} />
          <Route path="/hotels/guest-details" element={<ComingSoon />} />
          <Route path="/homestays" element={<HotelResults />} />
          <Route path="/homestays/search" element={<HotelResults />} />
          <Route path="/homestays/:id" element={<HotelDetails />} />
          
          {/* Bus Booking Flow */}
          <Route path="/bus-tickets" element={<BusResults />} />
          <Route path="/bus-tickets/search" element={<BusResults />} />
          <Route path="/bus-tickets/passenger-details" element={<BusPassengerDetails />} />
          
          {/* Railways */}
          <Route path="/railways" element={<ComingSoon />} />
          <Route path="/railways/search" element={<ComingSoon />} />
          
          {/* Holiday Packages & Corporate Offsites */}
          <Route path="/holidays" element={<HolidayPackagesPage />} />
          <Route path="/holidays/listing" element={<HolidayPackagesPage />} />
          <Route path="/holidays/:id" element={<HolidayPackagesPage />} />
          <Route path="/corporate-travel" element={<CorporateTravelPage />} />
          
          {/* Ancillary Services */}
          <Route path="/cabs" element={<ComingSoon />} />
          <Route path="/forex" element={<ComingSoon />} />
          <Route path="/travel-insurance" element={<ComingSoon />} />
          <Route path="/visa" element={<ComingSoon />} />
          
          {/* Universal Checkout & Confirmation */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking/confirmation/:id" element={<BookingConfirmation />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<ComingSoon />} />
          <Route path="/signup" element={<ComingSoon />} />
          <Route path="/forgot-password" element={<ComingSoon />} />
          <Route path="/reset-password/:token" element={<ComingSoon />} />
          
          {/* Customer Dashboard Routes */}
          <Route path="/account/profile" element={<UserDashboard />} />
          <Route path="/account/my-trips" element={<UserDashboard />} />
          <Route path="/account/travellers" element={<UserDashboard />} />
          <Route path="/account/wallet" element={<UserDashboard />} />
          <Route path="/account/coupons" element={<UserDashboard />} />
          <Route path="/account/wishlist" element={<ComingSoon />} />
          <Route path="/account/notifications" element={<ComingSoon />} />
          <Route path="/account/payment-methods" element={<ComingSoon />} />
          
          {/* Admin Operations Panel */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Company, Offers & Legal Pages */}
          <Route path="/offers" element={<ComingSoon />} />
          <Route path="/about-us" element={<ComingSoon />} />
          <Route path="/careers" element={<ComingSoon />} />
          <Route path="/press" element={<ComingSoon />} />
          <Route path="/investor-relations" element={<ComingSoon />} />
          <Route path="/contact-us" element={<ComingSoon />} />
          <Route path="/help-center" element={<ComingSoon />} />
          <Route path="/faq" element={<ComingSoon />} />
          <Route path="/cancellation-policy" element={<ComingSoon />} />
          <Route path="/refund-policy" element={<ComingSoon />} />
          <Route path="/privacy-policy" element={<ComingSoon />} />
          <Route path="/terms-and-conditions" element={<ComingSoon />} />
          <Route path="/user-agreement" element={<ComingSoon />} />
          <Route path="/cookie-policy" element={<ComingSoon />} />
          <Route path="/sitemap" element={<ComingSoon />} />
          <Route path="/payment-security" element={<ComingSoon />} />
          <Route path="/become-a-partner" element={<ComingSoon />} />
          <Route path="/gift-cards" element={<ComingSoon />} />
          <Route path="/blog" element={<ComingSoon />} />
          <Route path="/blog/:slug" element={<ComingSoon />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
