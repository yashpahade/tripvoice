export const MOCK_USER = {
  name: 'Omkar Sharma',
  email: 'omkar@example.com',
  phone: '+91 98765 43210',
  tier: 'TripNest Gold Member',
  tripsCount: 6,
  walletBalance: 2450,
  joinedDate: 'Jan 2025'
};

export const MOCK_UPCOMING_TRIPS = [
  {
    id: 'TRIP-748291',
    type: 'flight',
    title: 'IndiGo 6E-205',
    route: 'DEL → BLR',
    fromAirport: 'Delhi (DEL) T3',
    toAirport: 'Bengaluru (BLR) T1',
    depTime: '06:00 AM, 13 Oct 2026',
    arrTime: '08:45 AM, 13 Oct 2026',
    seat: '12A (Window)',
    passenger: 'Mr Omkar Sharma',
    pnr: 'TN748291',
    amount: 5250,
    status: 'Confirmed'
  },
  {
    id: 'TRIP-918234',
    type: 'bus',
    title: 'IntrCity SmartBus',
    route: 'Bengaluru → Hyderabad',
    fromStation: 'Majestic Bus Stand (Platform 18)',
    toStation: 'Ameerpet Metro Station',
    depTime: '09:30 PM, 14 Oct 2026',
    arrTime: '06:30 AM, 15 Oct 2026',
    seat: 'L2 (Lower Deck Sleeper)',
    passenger: 'Mr Omkar Sharma',
    pnr: 'BUS8842',
    amount: 950,
    status: 'Confirmed'
  }
];

export const MOCK_COMPLETED_TRIPS = [
  {
    id: 'TRIP-632194',
    type: 'hotel',
    title: 'Grand Hyatt Goa Resort & Spa',
    location: 'Bambolim Bay, Goa',
    dates: '14 Oct - 16 Oct 2025 (2 Nights)',
    room: 'Grand Deluxe King Room',
    amount: 18998,
    status: 'Completed'
  },
  {
    id: 'TRIP-512093',
    type: 'flight',
    title: 'Vistara UK-993',
    route: 'BOM → DEL',
    depTime: '18 Sep 2025',
    seat: '4C (Aisle)',
    amount: 6190,
    status: 'Completed'
  }
];

export const MOCK_CANCELLED_TRIPS = [
  {
    id: 'TRIP-401923',
    type: 'flight',
    title: 'Air India AI-804',
    route: 'DEL → BLR',
    depTime: '10 Aug 2025',
    refundAmount: 5250,
    refundStatus: 'Credited to Bank Account',
    refundRef: 'SBIN98421942',
    status: 'Cancelled & Refunded'
  }
];

export const MOCK_SAVED_TRAVELLERS = [
  { id: 't1', name: 'Omkar Sharma', age: 26, gender: 'Male', type: 'Primary' },
  { id: 't2', name: 'Priya Sharma', age: 24, gender: 'Female', type: 'Family' },
  { id: 't3', name: 'Ramesh Sharma', age: 58, gender: 'Male', type: 'Family' }
];

export const MOCK_WALLET_LEDGER = [
  { id: 'w1', title: 'Refund Credited - Air India AI-804', date: '11 Aug 2025', amount: '+ ₹5,250', isCredit: true },
  { id: 'w2', title: 'Flight Booking - IndiGo 6E-205', date: '01 Oct 2026', amount: '- ₹3,000', isCredit: false },
  { id: 'w3', title: 'Cashback Earned - Grand Hyatt Goa', date: '17 Oct 2025', amount: '+ ₹200', isCredit: true }
];

export const INITIAL_BOOKINGS = [
  { id: 'BK-10091', service: 'Flight', customer: 'Omkar Sharma', contact: 'omkar@example.com', details: 'IndiGo 6E-205 (DEL → BLR)', seat: 'Seat 12A', date: '13 Oct 2026', amount: 5250, status: 'Confirmed' },
  { id: 'BK-10090', service: 'Hotel', customer: 'Priya Verma', contact: 'priya@gmail.com', details: 'Grand Hyatt Goa (2 Nights)', seat: 'Deluxe King', date: '14 Oct 2026', amount: 18998, status: 'Confirmed' },
  { id: 'BK-10089', service: 'Bus', customer: 'Rahul Patil', contact: 'rahul@yahoo.com', details: 'IntrCity SmartBus (BLR → HYD)', seat: 'Seat L2', date: '14 Oct 2026', amount: 950, status: 'Confirmed' },
  { id: 'BK-10088', service: 'Package', customer: 'Vikram Mehta', contact: 'vikram@mehta.com', details: 'Magical Kashmir Holiday (4 Pax)', seat: 'Family Tour', date: '20 Oct 2026', amount: 67996, status: 'Pending' },
  { id: 'BK-10087', service: 'Flight', customer: 'Ananya Roy', contact: 'ananya@roy.com', details: 'Air India AI-804 (DEL → BLR)', seat: 'Seat 8F', date: '10 Aug 2025', amount: 5480, status: 'Cancelled' },
];

export const INITIAL_LEADS = [
  { id: 'LD-401', company: 'Zomato Media Ltd', contact: 'Kunal Sen (VP HR)', phone: '98112 34567', dest: 'Goa Beach Resort', groupSize: '85 Employees', event: 'Annual Tech Offsite', budget: '₹7,20,000', status: 'Quote Sent' },
  { id: 'LD-402', company: 'Razorpay Software', contact: 'Sneha Jain (Ops Lead)', phone: '98223 45678', dest: 'Rishikesh Retreat', groupSize: '45 Employees', event: 'Leadership Retreat', budget: '₹2,80,000', status: 'New Lead' },
  { id: 'LD-403', company: 'Swiggy Delivery Corp', contact: 'Arun Nair (Director)', phone: '98334 56789', dest: 'Jim Corbett Wilderness', groupSize: '120 Employees', event: 'Sales Summit', budget: '₹8,50,000', status: 'Closed' },
  { id: 'LD-404', company: 'Gupta Family Vacation', contact: 'Suresh Gupta', phone: '98445 67890', dest: 'Dubai Extravaganza', groupSize: '6 Family Members', event: 'Family Tour', budget: '₹1,95,000', status: 'In Discussion' },
];

export const INITIAL_COUPONS = [
  { code: 'TRIPNESTFLY', discount: '15% OFF', type: 'Flight', used: 412, expiry: '31 Oct 2026', status: 'Active' },
  { code: 'TRIPNESTSTAY', discount: '20% OFF', type: 'Hotel', used: 289, expiry: '15 Nov 2026', status: 'Active' },
  { code: 'BUS50', discount: 'Flat ₹50 OFF', type: 'Bus', used: 630, expiry: '31 Dec 2026', status: 'Active' },
  { code: 'CORP10', discount: '10% Cashback', type: 'Office', used: 45, expiry: '30 Nov 2026', status: 'Active' },
];

export const INITIAL_CUSTOMERS = [
  { id: 'USR-1', name: 'Omkar Sharma', email: 'omkar@example.com', phone: '98765 43210', totalTrips: 6, totalSpend: 31448, tier: 'Gold' },
  { id: 'USR-2', name: 'Priya Verma', email: 'priya@gmail.com', phone: '98123 45678', totalTrips: 4, totalSpend: 24500, tier: 'Silver' },
  { id: 'USR-3', name: 'Vikram Mehta', email: 'vikram@mehta.com', phone: '98987 65432', totalTrips: 2, totalSpend: 74186, tier: 'Gold' },
  { id: 'USR-4', name: 'Ananya Roy', email: 'ananya@roy.com', phone: '98555 12345', totalTrips: 3, totalSpend: 16200, tier: 'Member' },
];
