export type Language = 'ar' | 'fr' | 'en';

export interface Product {
  id: string;
  name: {
    ar: string;
    fr: string;
    en: string;
  };
  description: {
    ar: string;
    fr: string;
    en: string;
  };
  price: number;
  image: string;
  category: 'oriental' | 'floral' | 'woody' | 'citrus';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
}

export interface Translations {
  [key: string]: {
    ar: string;
    fr: string;
    en: string;
  };
}
