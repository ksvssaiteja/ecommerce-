export interface Shoe {
  id: string;
  name: string;
  brand: string;
  category: 'Sneakers' | 'Running & Sports' | 'Formal' | "Women's Heels" | 'Kids Kicks' | 'Chappals';
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stockAlert?: string;
  soldCount?: string;
  tag?: string;
  isFlashDeal?: boolean;
  image: string;
  alt: string;
  description: string;
  sizes: number[];
  colors: string[];
  specs: {
    cushioning: string;
    upper: string;
    sole: string;
    weight: string;
  };
}

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

export type TabType = 'home' | 'catalog' | 'cart' | 'wishlist' | 'profile' | 'admin';

export interface AuthUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'deal' | 'shipping' | 'drop';
}
