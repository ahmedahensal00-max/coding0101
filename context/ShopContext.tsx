'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Product, CartItem, ShopContextType } from '@/types';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart and language from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('coding0101-cart');
            const savedLang = localStorage.getItem('coding0101-language');

            if (savedCart) {
                try {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setCart(JSON.parse(savedCart));
                } catch (e) {
                    console.error('Failed to load cart from localStorage', e);
                }
            }

            if (savedLang && (savedLang === 'ar' || savedLang === 'fr' || savedLang === 'en')) {
                setLanguage(savedLang as Language);
            }
            setIsInitialized(true);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('coding0101-cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    // Save language to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('coding0101-language', language);
        }
        // Update HTML dir attribute for RTL support
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language, isInitialized]);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const cartItemsCount = cart.reduce(
        (count, item) => count + item.quantity,
        0
    );

    return (
        <ShopContext.Provider
            value={{
                language,
                setLanguage,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartItemsCount,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
}
