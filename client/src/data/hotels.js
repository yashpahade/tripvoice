export const MOCK_HOTELS = [
  {
    id: 'h1',
    name: 'Grand Hyatt Goa Resort & Spa',
    stars: 5,
    locality: 'Bambolim Bay, Goa',
    distance: 'Beachfront • 20 min from Airport',
    rating: 4.8,
    reviews: 2840,
    ratingText: 'Exceptional',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop'
    ],
    amenities: ['Private Beach', 'Infinity Pool', 'Luxury Spa', 'Free Breakfast', 'Free Wi-Fi'],
    freeCancellation: true,
    price: 9499,
    originalPrice: 14500,
    roomsLeft: 2,
    tag: 'Top Luxury Choice',
  },
  {
    id: 'h2',
    name: 'Taj Holiday Village Resort & Spa',
    stars: 5,
    locality: 'Candolim, North Goa',
    distance: 'Direct Beach Access • Sinquerim Beach',
    rating: 4.9,
    reviews: 3120,
    ratingText: 'Exceptional',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=600&auto=format&fit=crop'
    ],
    amenities: ['Cottages & Villas', 'Swimming Pool', 'Fine Dining', 'Free Breakfast', 'Beachfront'],
    freeCancellation: true,
    price: 12999,
    originalPrice: 18000,
    roomsLeft: 3,
    tag: 'Heritage & Luxury',
  },
  {
    id: 'h3',
    name: 'Novotel Goa Resort & Spa',
    stars: 4,
    locality: 'Candolim Road, Goa',
    distance: '800m from Candolim Beach',
    rating: 4.4,
    reviews: 1850,
    ratingText: 'Very Good',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop'
    ],
    amenities: ['Outdoor Pool', 'Family Suites', 'Fitness Centre', 'Free Wi-Fi'],
    freeCancellation: true,
    price: 4890,
    originalPrice: 7500,
    roomsLeft: 5,
    tag: 'Best Value 4-Star',
  },
  {
    id: 'h4',
    name: 'Fairfield by Marriott Goa Anjuna',
    stars: 4,
    locality: 'Anjuna, North Goa',
    distance: '1.2 km from Anjuna Beach & Flea Market',
    rating: 4.3,
    reviews: 1210,
    ratingText: 'Very Good',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Complimentary Breakfast', 'Bar / Lounge', 'Free Wi-Fi'],
    freeCancellation: false,
    price: 3750,
    originalPrice: 5200,
    roomsLeft: 4,
    tag: 'Popular in Anjuna',
  },
  {
    id: 'h5',
    name: 'BloomSuites | Calangute',
    stars: 3,
    locality: 'Calangute, North Goa',
    distance: '500m from Calangute Beach',
    rating: 4.2,
    reviews: 890,
    ratingText: 'Good',
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop'
    ],
    amenities: ['Swimming Pool', 'Free Wi-Fi', 'AC', '24-hr Front Desk'],
    freeCancellation: true,
    price: 2390,
    originalPrice: 3800,
    roomsLeft: 6,
    tag: 'Budget Friendly',
  },
];

export const HOTEL_DATA = {
  h1: {
    id: 'h1',
    name: 'Grand Hyatt Goa Resort & Spa',
    stars: 5,
    locality: 'P.O. Goa University, Bambolim Bay, Goa 403206',
    rating: 4.8,
    reviews: 2840,
    ratingText: 'Exceptional',
    description: 'Set along the serene waters of Bambolim Bay, Grand Hyatt Goa is a 5-star luxury resort inspired by 17th-century Indo-Portuguese architecture. Spread across 28 lush landscaped acres, enjoy direct beach access, an expansive outdoor free-form pool, Shamana Spa, and world-class multi-cuisine restaurants.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=600&auto=format&fit=crop',
    ],
    amenities: [
      'Outdoor Swimming Pool', 'Free High-Speed Wi-Fi', 'Luxury Shamana Spa', 
      'Direct Private Beachfront', 'Fitness Center / Gym', '5 Multi-Cuisine Restaurants',
      '24-Hour Room Service', 'Free Valet Parking', 'Cocktail Lounge & Bar'
    ],
    rooms: [
      {
        id: 'r1',
        name: 'Grand Deluxe King Room',
        size: '340 sq.ft',
        bed: '1 King Bed',
        view: 'Lush Garden & Pool View',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=600&auto=format&fit=crop',
        plans: [
          { id: 'p1', name: 'Room Only', price: 9499, freeCancel: true, benefits: ['Free Wi-Fi', 'Free Cancellation till 24h prior'] },
          { id: 'p2', name: 'Room with Breakfast Buffet', price: 10699, freeCancel: true, benefits: ['Free Wi-Fi', 'Daily Breakfast Buffet Included', 'Free Cancellation'] },
          { id: 'p3', name: 'All Meals Included (Breakfast + Dinner)', price: 12499, freeCancel: true, benefits: ['Free Wi-Fi', 'Breakfast & Dinner Buffet', 'Free Cancellation'] }
        ]
      },
      {
        id: 'r2',
        name: 'Grand Sea View Suite with Balcony',
        size: '560 sq.ft',
        bed: '1 King Bed + Living Area',
        view: 'Panoramic Arabian Sea View',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
        plans: [
          { id: 'p4', name: 'Sea View Suite + Breakfast', price: 15999, freeCancel: true, benefits: ['Private Balcony with Sea View', 'Daily Breakfast Buffet Included', 'Free Mini Bar', 'Free Cancellation'] },
          { id: 'p5', name: 'Luxury VIP Package (All Meals & Spa Voucher)', price: 18999, freeCancel: true, benefits: ['Private Balcony', 'All Meals Included', '₹2000 Spa Credit', 'Airport Transfers'] }
        ]
      }
    ]
  }
};
