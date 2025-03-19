// Mock data for testing SwiftBurst Food components

export const mockRestaurants = [
  {
    id: 'r1',
    name: 'Burger Kingdom',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800',
    cuisine: ['American', 'Burgers', 'Fast Food'],
    rating: 4.5,
    distance: '1.2 mi',
    platforms: [
      {
        platform: 'UberEats',
        price: 15.99,
        fees: 2.99,
        delivery: 4.99,
        total: 23.97,
        eta: 25,
        promoAvailable: true
      },
      {
        platform: 'DoorDash',
        price: 15.99,
        fees: 3.99,
        delivery: 5.99,
        total: 25.97,
        eta: 35,
        promoAvailable: false
      },
      {
        platform: 'GrubHub',
        price: 15.99,
        fees: 3.49,
        delivery: 3.99,
        total: 23.47,
        eta: 40,
        promoAvailable: false
      }
    ]
  },
  {
    id: 'r2',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.8,
    distance: '0.8 mi',
    platforms: [
      {
        platform: 'UberEats',
        price: 22.99,
        fees: 3.99,
        delivery: 2.99,
        total: 29.97,
        eta: 30,
        promoAvailable: false
      },
      {
        platform: 'DoorDash',
        price: 21.99,
        fees: 4.99,
        delivery: 1.99,
        total: 28.97,
        eta: 25,
        promoAvailable: true
      },
      {
        platform: 'GrubHub',
        price: 22.99,
        fees: 3.99,
        delivery: 4.99,
        total: 31.97,
        eta: 35,
        promoAvailable: false
      }
    ]
  },
  {
    id: 'r3',
    name: 'Sushi Supreme',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    distance: '2.1 mi',
    platforms: [
      {
        platform: 'UberEats',
        price: 35.99,
        fees: 4.99,
        delivery: 5.99,
        total: 46.97,
        eta: 45,
        promoAvailable: true
      },
      {
        platform: 'DoorDash',
        price: 35.99,
        fees: 4.99,
        delivery: 6.99,
        total: 47.97,
        eta: 40,
        promoAvailable: false
      },
      {
        platform: 'GrubHub',
        price: 36.99,
        fees: 3.99,
        delivery: 4.99,
        total: 45.97,
        eta: 50,
        promoAvailable: false
      }
    ]
  },
  {
    id: 'r4',
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1562059390-a761a084768e?q=80&w=800',
    cuisine: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.4,
    distance: '1.5 mi',
    platforms: [
      {
        platform: 'UberEats',
        price: 18.99,
        fees: 2.49,
        delivery: 3.99,
        total: 25.47,
        eta: 20,
        promoAvailable: false
      },
      {
        platform: 'DoorDash',
        price: 18.99,
        fees: 2.99,
        delivery: 4.99,
        total: 26.97,
        eta: 25,
        promoAvailable: true
      },
      {
        platform: 'GrubHub',
        price: 19.99,
        fees: 3.49,
        delivery: 2.99,
        total: 26.47,
        eta: 30,
        promoAvailable: false
      }
    ]
  }
];

export const mockPlatformComparison = {
  restaurantName: 'Burger Kingdom',
  platforms: [
    {
      name: 'UberEats',
      logo: 'https://same-assets.com/placeholder/ubereats.png',
      itemPrice: 15.99,
      serviceFee: 2.99,
      deliveryFee: 4.99,
      tax: 1.99,
      total: 20.98,
      eta: 25,
      promoCode: 'SAVE10NOW',
      promoDiscount: 2.99,
      paymentDiscount: 0.75,
      paymentMethod: 'Cashback Card'
    },
    {
      name: 'DoorDash',
      logo: 'https://same-assets.com/placeholder/doordash.png',
      itemPrice: 15.99,
      serviceFee: 3.99,
      deliveryFee: 5.99,
      tax: 2.29,
      total: 28.26,
      eta: 35
    },
    {
      name: 'GrubHub',
      logo: 'https://same-assets.com/placeholder/grubhub.png',
      itemPrice: 15.99,
      serviceFee: 3.49,
      deliveryFee: 3.99,
      tax: 2.10,
      total: 25.57,
      eta: 40,
      promoCode: 'FIRST15',
      promoDiscount: 3.75
    }
  ]
};

export const mockPaymentMethods = [
  {
    id: 'pm1',
    name: 'Chase Sapphire',
    type: 'credit',
    last4: '5678',
    rewardRate: 3.0,
    rewardType: 'cashback',
    estimatedReward: 0.95,
    isOptimal: true
  },
  {
    id: 'pm2',
    name: 'Citi Double Cash',
    type: 'credit',
    last4: '1234',
    rewardRate: 2.0,
    rewardType: 'cashback',
    estimatedReward: 0.63,
    isOptimal: false
  },
  {
    id: 'pm3',
    name: 'American Express Gold',
    type: 'credit',
    last4: '9012',
    rewardRate: 4.0,
    rewardType: 'points',
    estimatedReward: 0.8,
    isOptimal: false,
    restrictions: [
      'Points value estimated at $0.02 per point',
      'Only valid for restaurants, not delivery services'
    ]
  },
  {
    id: 'pm4',
    name: 'PayPal',
    type: 'paypal',
    rewardRate: 0,
    rewardType: 'none',
    estimatedReward: 0,
    isOptimal: false
  }
];

export const mockPromoCodes = {
  all: [
    {
      code: 'SAVE10NOW',
      discount: 10,
      discountType: 'percentage',
      description: 'Save 10% on your order',
      expiryDate: '2025-03-31',
      verified: true,
      successRate: 95,
      platform: 'UberEats'
    },
    {
      code: 'WELCOME20',
      discount: 20,
      discountType: 'percentage',
      description: 'Save 20% on your first order',
      expiryDate: '2025-03-31',
      verified: true,
      successRate: 98,
      firstOrderOnly: true,
      platform: 'UberEats'
    },
    {
      code: 'FREESHIP',
      discount: 'Free Delivery',
      discountType: 'free-item',
      description: 'Free delivery on orders over $15',
      expiryDate: '2025-03-25',
      verified: false,
      successRate: 80,
      restrictionText: 'Minimum order value of $15 required',
      platform: 'DoorDash'
    },
    {
      code: 'FLASH25',
      discount: 25,
      discountType: 'percentage',
      description: 'Flash sale: 25% off your order',
      expiryDate: '2025-03-20',
      verified: false,
      successRate: 65,
      restrictionText: 'Maximum discount of $10',
      platform: 'GrubHub'
    },
    {
      code: 'BURGER5',
      discount: 5,
      discountType: 'fixed',
      description: '$5 off your burger order',
      expiryDate: '2025-03-30',
      verified: true,
      successRate: 90,
      platform: 'UberEats'
    }
  ],
  recommended: [
    {
      code: 'SAVE10NOW',
      discount: 10,
      discountType: 'percentage',
      description: 'Save 10% on your order',
      expiryDate: '2025-03-31',
      verified: true,
      successRate: 95,
      platform: 'UberEats'
    },
    {
      code: 'BURGER5',
      discount: 5,
      discountType: 'fixed',
      description: '$5 off your burger order',
      expiryDate: '2025-03-30',
      verified: true,
      successRate: 90,
      platform: 'UberEats'
    }
  ]
};

export const mockCuisines = [
  { label: 'American', value: 'american' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Italian', value: 'italian' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Thai', value: 'thai' },
  { label: 'Indian', value: 'indian' },
  { label: 'Mediterranean', value: 'mediterranean' },
  { label: 'Fast Food', value: 'fast-food' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Vegetarian', value: 'vegetarian' }
];

export const mockPlatforms = [
  { label: 'UberEats', value: 'ubereats' },
  { label: 'DoorDash', value: 'doordash' },
  { label: 'GrubHub', value: 'grubhub' },
  { label: 'Postmates', value: 'postmates' },
  { label: 'Seamless', value: 'seamless' },
  { label: 'Caviar', value: 'caviar' }
];

export const mockFeatures = [
  { label: 'Free Delivery', value: 'free-delivery' },
  { label: 'Promo Available', value: 'promo-available' },
  { label: 'Under 30 Min', value: 'under-30-min' },
  { label: 'Top Rated', value: 'top-rated' },
  { label: 'Organic', value: 'organic' },
  { label: 'EcoFriendly Packaging', value: 'eco-friendly' }
];
