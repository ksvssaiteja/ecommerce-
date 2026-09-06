import { Shoe, NotificationItem } from '../types';

export const BRAND_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdh11OJ8F3oZZ3vj8gIxnF-mZvIIkGUBV4UaF1RyyuQIfkruvLvBdsMF5zcK5BIvq1mVmiS6X0aO-HvFOIFSnF_sCRez0JADEtf2njYHd4mrAeTHtksY0cM1ZeseMxWrH4ATzB94LgwrVDmI50UCNYB2DtXdgYwsb_rpYbZp5JQZqnwOjTr4AKl6oXmbWw3MOaZhW18tfDH_UNT70r0wyjCADni1hf_tPBexMbdyeZACQ_4C8fbhKeLg',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBamu8m_cki6pymQnDSfC22w2up92gVTO3tVRbcrwCe1jIm2KEO2VaK1p3pN13dFuAwUMBHYPWVSRACAUO42Q7pfImULk4KuJhsc1AiqgAC40hKf2Bq8kYF726cjWg1MA9FpZIltDodspp8ZOn4gHb3TQAN_5k0LKa_R74wUn86aFvac0sjwJA4sl8CFFFlYQCGdDDxTOAGiMPVfZk2QSktlYeifpy4_0tNWofIeiIrRhBVYp98Fe7gAA',
  heroShoe: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM3118WVaJquhkrkPeXhaBhIG44yPvPOiS58A0CE0lF-6PtyfG0Dw8_0oFB-uFDt8F3WLc7GcNvqXgwLAFbXmUUWy5whVmv12x6u7PbQk1XTg46ZkbMYDMaquYedzTHBk71vgmKwGKCvHNVhCPWCxEHT7HMfoqUOpiXoJgVWADj_YixUpCP1WCYoz2ZFDv9ejOJqv6cyTte-tVV3mxK6GGK-w1IEEFV7TjJ4PjyZCH89fHrKrGAVniYg',
};

export const SHOES: Shoe[] = [
  {
    id: 'aeroglide-pro',
    name: 'AeroGlide Pro Runner',
    brand: 'Sunitha SpeedLab',
    category: 'Running & Sports',
    price: 3499,
    originalPrice: 5999,
    discountPercentage: 41,
    rating: 4.8,
    reviewCount: 312,
    stockAlert: 'Only 3 pairs left!',
    isFlashDeal: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGbJHCxVvoOpiWNt4o0eDqy3SISwWvsWIMjk1TqYbhl9AI-I3uXTH0cKXsDNEYruvd1syMSYbGQuABVcaxkosLiBpkkmwRWacFswHPEnKuyAm7gSyWg7eNKxZhCP5SNU-2W5rYuWflzCqQNFZE8j2lL5DLepiKuoPfe-EBj6UWxdzs_-LhLdeUq4YBvUt8i-VL9vG5P79EClaBQwqU_eSXTzXy1xMCW5nR4rbEgHvoI0DyygYChY-r8g',
    alt: 'AeroGlide Pro Runner shoe, sport crimson and aerodynamic solar flare orange soles',
    description: 'Engineered for sub-3 marathoners. Features ultralight responsive nitrogen-infused foam with high-energy propulsion plates for kinetic energy return.',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Sport Crimson', 'Solar Flare Orange', 'Midnight Stealth'],
    specs: {
      cushioning: 'Nitrogen HyperBoost Foam',
      upper: 'VaporWeave Engineered Mesh',
      sole: 'Carbon Traction Outsole',
      weight: '198 grams (Size 9)'
    }
  },
  {
    id: 'velocity-neon',
    name: 'Velocity Neon Boost',
    brand: 'Sunitha SpeedLab',
    category: 'Running & Sports',
    price: 4299,
    originalPrice: 6499,
    discountPercentage: 33,
    rating: 4.9,
    reviewCount: 458,
    soldCount: '142 sold today',
    isFlashDeal: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDimL-FJHAdFft3A4WGoq9ufX6f9IEkc-SJeXmXi919yxzylx_BHJi6Jt8PVXd4LighBjnQEsKPrc6HAp2zLVSOrpWkQ4YSzuytlmcygBOyUjTjkQmsBt6xbWioD286qRQbDVyJh0pHUaNbJkUEjSkw-4Gc-TD2U2aX2_-VUKWo6Mkb06Of0_ODEZa_gE9i1G_nmCGhZKgZEVg_2CeLS1H9_kGLYwyc-ybO4yFjKYc8x061CZjI8ormjw',
    alt: 'Velocity Neon Boost running shoes with gradient reflective accents',
    description: 'Maximum energy return with radiant neon gradient accents and dynamic rocker geometry for effortless heel-to-toe stride transitions.',
    sizes: [6, 7, 8, 9, 10],
    colors: ['Neon Lime / Onyx', 'Sunset Glow', 'Volt Electric'],
    specs: {
      cushioning: 'Dual-Density Reactive Gel',
      upper: 'Reflective PrimeKnit weave',
      sole: 'All-Terrain Continental Grip',
      weight: '225 grams'
    }
  },
  {
    id: 'air-cloud-strider',
    name: 'Air Cloud Strider',
    brand: 'Sunitha Original',
    category: 'Sneakers',
    price: 4899,
    originalPrice: 6200,
    rating: 4.7,
    reviewCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNwiRWDU2PIt6kySKkTnnkfUYI156DdkfrxM6ve6b6Z6OGTAxnSuI9PuwvCGJs0VgUWGjGMbqW-m3T39zwlFx002hSZyiNIi-Tk5mOtCcSFmJ3jFSRLYNMSfbKjnAvkbDR5AC1K8XKDAvG4WdtX8EfOvU86NhZUTbd30Ap_F2Ip3QWLsNE48BT9EMunleK7ZLR9qZezSPC7Tl4a1BcNNOKVJcnrrf-q5hAD2Qe1KOP8ceyO9xf3jQsHg',
    alt: 'Athletic white running sneaker with subtle energetic red wing overlays',
    description: 'Crisp athletic white profile accented with kinetic crimson wing overlays. Cloudfoam midsole gives featherlight support on urban pavement.',
    sizes: [7, 8, 9, 10, 11],
    colors: ['White / Kinetic Crimson', 'Pure White', 'Ghost Grey'],
    specs: {
      cushioning: 'Air-Cloud Aerogel Cell',
      upper: 'Reinforced TPU & Breathable Microfiber',
      sole: 'Abrasion-resistant Rubber Cupsole',
      weight: '240 grams'
    }
  },
  {
    id: 'urban-monarch-high',
    name: 'Urban Monarch High',
    brand: 'Sunitha Original',
    category: 'Sneakers',
    price: 5499,
    originalPrice: 7999,
    tag: 'Leather',
    rating: 4.9,
    reviewCount: 94,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzr3WN4R2gwVY0fxOpF9fC57mGO2kqmiBP_n_8KexkYgVVUOSnfQ-rzI-i_Q-nzhgZaZAYCTk1ejp38MHmtWx1Wghn520tFgramBFRRX9xjMF-g_FhSgCVw1K2-pRPWvWL2iyJ6bMimABeC_ARWOH08cllkyZEmDRmDNXoI9dqlVOFEOQeJiyEfQ1mzEGXHtJcO0sBby6mPLZcI1nPHbWmFLRABcLyPuiZ8TjgZsFyQO00BKEkwToEhg',
    alt: 'Urban high-top sneaker crafted from rich burnished chestnut leather',
    description: 'Crafted from full-grain burnished chestnut leather with hand-finished patina. Features padded ankle collars and a vulcanized sports cupsole.',
    sizes: [7, 8, 9, 10],
    colors: ['Burnished Chestnut', 'Espresso Brown', 'Obsidian Black'],
    specs: {
      cushioning: 'Memory Foam Arch Cushion',
      upper: '100% Genuine Full-Grain Calfskin Leather',
      sole: 'Hand-Stitched Rubber Cupsole',
      weight: '360 grams'
    }
  },
  {
    id: 'flex-motion-trainer',
    name: 'FlexMotion Trainer',
    brand: 'Sunitha Original',
    category: 'Sneakers',
    price: 2999,
    originalPrice: 4499,
    rating: 4.6,
    reviewCount: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgMc6g8cSb8JhcqUinKmzLuOeXzzHWEsj-ThIfZOugaYHcdE_T49ugAszuLJ3Zzl_ueJGEyPvHmsMbMMKpQghnG0CdJf8lwT91quk_0-scbs7U_S4I0wNvisBj8b0-ATUSbNQfLq2rWZ58yERN7N4P0TxxPito0l3ZzqeYzrVfsNDiQ_iM9WeFTa5SWIcFk4Qnqw1A2I5AhBad7hp_RgcvSTei_G73_JWwPYizTOf1-27nJ4Lhe28HbA',
    alt: 'Breathable knit athletic cross-training shoe in charcoal grey with coral accents',
    description: 'Seamless ergonomic knit upper contours seamlessly to your foot shape. Ribbed flexibility grooves ensure maximum agility during multidirectional drills.',
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Charcoal / Sport Coral', 'Stealth Black', 'Glacier Grey'],
    specs: {
      cushioning: 'Dynamic Flex Shock Core',
      upper: 'Seamless 3D Engineered Knit',
      sole: 'Segmented Multi-Flex Rubber Pods',
      weight: '210 grams'
    }
  },
  {
    id: 'classic-oxford-derby',
    name: 'Classic Oxford Derby',
    brand: 'Sunitha Original',
    category: 'Formal',
    price: 3899,
    originalPrice: 5999,
    tag: 'Handcrafted',
    rating: 4.8,
    reviewCount: 76,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoPxKoLOuweb79v8T8kKx-d0YQW0hqlAdfNF62jBDTTlb9klbTmqZ8TtwRCHDjb6qd5vmIlcmkI4zvoPurQhTPRz5o6QfsWkr8hw3R7NplXOzKGpQh3iOkFcZI_zBi0WnwyV3QInqacojzWq_0PkOcxh9qKG2FwoZegyrbmn-xJpzvG16re9o9IcDU4MyvKd8_7jNQHyC6VDiEDg_HWohJgWkcfOhZIEfXlC89qeZLm12LUWnZvSgE-g',
    alt: 'Polished mahogany leather classic Oxford Derby shoe with wingtip brogue detailing',
    description: 'Mastercrafted with Italian wingtip brogue detailing and Goodyear welt construction. Wax-burnished polish provides timeless elegance for weddings and executive wear.',
    sizes: [7, 8, 9, 10],
    colors: ['Polished Mahogany', 'Antique Tan', 'Ebony Black'],
    specs: {
      cushioning: 'Orthotic Leather Lined Insole',
      upper: 'Top-Grade Hand-Burnished Boxcalf Leather',
      sole: 'Goodyear Welted Leather & Rubber Heel',
      weight: '390 grams'
    }
  },
  {
    id: 'spring-kick-fest-drop',
    name: 'Kinetic SpeedRunner Crimson',
    brand: 'Sunitha SpeedLab',
    category: 'Running & Sports',
    price: 4599,
    originalPrice: 7499,
    discountPercentage: 38,
    tag: 'Limited Drop',
    rating: 4.95,
    reviewCount: 88,
    stockAlert: 'Spring Kick Fest Exclusive',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM3118WVaJquhkrkPeXhaBhIG44yPvPOiS58A0CE0lF-6PtyfG0Dw8_0oFB-uFDt8F3WLc7GcNvqXgwLAFbXmUUWy5whVmv12x6u7PbQk1XTg46ZkbMYDMaquYedzTHBk71vgmKwGKCvHNVhCPWCxEHT7HMfoqUOpiXoJgVWADj_YixUpCP1WCYoz2ZFDv9ejOJqv6cyTte-tVV3mxK6GGK-w1IEEFV7TjJ4PjyZCH89fHrKrGAVniYg',
    alt: 'Dynamic crimson and bright orange gradient high-top athletic sneaker',
    description: 'The centerpiece of the Spring Kick Fest. Blends cutting-edge aero-cushion technology with vibrant gradient aesthetics to deliver uncompromising velocity.',
    sizes: [7, 8, 9, 10, 11],
    colors: ['Crimson Blaze', 'Solar Orange', 'Hyper Red'],
    specs: {
      cushioning: 'Kinetic Spring Carbon Plate',
      upper: 'Ultralight Aerodynamic Poly-Weave',
      sole: 'SpeedTrack Hydrophobic Rubber',
      weight: '185 grams'
    }
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Spring Kick Fest is LIVE!',
    message: 'Up to 40% OFF on elite speedrunners. Limited drops expire in 8 hours.',
    time: '12m ago',
    unread: true,
    type: 'drop'
  },
  {
    id: 'notif-2',
    title: 'Flash Steal Alert: 3 pairs left!',
    message: 'AeroGlide Pro Runner size 9 is almost sold out at ₹3,499.',
    time: '45m ago',
    unread: true,
    type: 'deal'
  },
  {
    id: 'notif-3',
    title: 'Exchange Pick-up Complete',
    message: 'Your size swap for Urban Monarch High (Size 9) was delivered successfully.',
    time: '2h ago',
    unread: false,
    type: 'shipping'
  }
];
