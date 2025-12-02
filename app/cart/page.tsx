'use client';

import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartPage() {
    const { language, cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useShop();
    const [checkoutStep, setCheckoutStep] = useState<'cart' | 'info' | 'payment' | 'confirmed'>('cart');
    const [orderNumber, setOrderNumber] = useState('');

    const [customerInfo, setCustomerInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setCheckoutStep('info');
    };

    const handleSubmitInfo = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStep('payment');
    };

    const handlePlaceOrder = () => {
        // Generate order number
        const orderNum = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderNumber(orderNum);
        setCheckoutStep('confirmed');
        clearCart();
    };

    if (checkoutStep === 'confirmed') {
        return (
            <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('checkout.orderConfirmed', language)}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8">
                            {t('checkout.thankYou', language)}
                        </p>
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                            <p className="text-gray-400 mb-2">{t('checkout.orderNumber', language)}</p>
                            <p className="text-3xl font-bold text-gold-400">{orderNumber}</p>
                        </div>
                    </motion.div>
                    <Link
                        href="/products"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                    >
                        {t('cart.continueShopping', language)}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {checkoutStep === 'cart' ? t('cart.title', language) : t('checkout.title', language)}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
                </div>

                {/* Progress Steps */}
                {checkoutStep !== 'cart' && (
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center space-x-4">
                            {['info', 'payment'].map((step, index) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${checkoutStep === step ? 'bg-gold-500 text-black' : 'bg-white/10 text-white'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    {index < 1 && <div className="w-16 h-0.5 bg-white/10 mx-2" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {checkoutStep === 'cart' && (
                        <motion.div
                            key="cart"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            {cart.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-2xl text-gray-400 mb-8">{t('cart.empty', language)}</p>
                                    <Link
                                        href="/products"
                                        className="inline-block px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                                    >
                                        {t('cart.continueShopping', language)}
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 flex items-center gap-6"
                                        >
                                            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-12 h-12 text-gold-500/30" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 2h6v2h-6V2zm-1 3h8v2h-8V5zm0 3h8v14H8V8z" />
                                                </svg>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white mb-1">
                                                    {item.product.name[language]}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-2">
                                                    {item.product.price} {t('common.currency', language)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}

                                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
                                        <div className="flex justify-between items-center text-2xl font-bold mb-6">
                                            <span className="text-white">{t('cart.total', language)}</span>
                                            <span className="text-gold-400">{cartTotal} {t('common.currency', language)}</span>
                                        </div>
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                                        >
                                            {t('cart.checkout', language)}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {checkoutStep === 'info' && (
                        <motion.div
                            key="info"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {t('checkout.customerInfo', language)}
                                </h2>
                                <form onSubmit={handleSubmitInfo} className="space-y-6">
                                    <div>
                                        <label className="block text-white mb-2 font-medium">
                                            {t('checkout.fullName', language)}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={customerInfo.fullName}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white mb-2 font-medium">
                                            {t('checkout.email', language)}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={customerInfo.email}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white mb-2 font-medium">
                                            {t('checkout.phone', language)}
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white mb-2 font-medium">
                                            {t('checkout.address', language)}
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={customerInfo.address}
                                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCheckoutStep('cart')}
                                            className="flex-1 px-8 py-4 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
                                        >
                                            {language === 'ar' ? 'رجوع' : language === 'fr' ? 'Retour' : 'Back'}
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                                        >
                                            {language === 'ar' ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {checkoutStep === 'payment' && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {t('checkout.paymentMethod', language)}
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/5 border border-gold-500 rounded-lg p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-black rounded-full" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">{t('checkout.cashOnDelivery', language)}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {language === 'ar' ? 'ادفع عند استلام طلبك' : language === 'fr' ? 'Payez à la réception de votre commande' : 'Pay when you receive your order'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-lg p-6 mb-8">
                                    <h3 className="text-white font-semibold mb-4">{language === 'ar' ? 'ملخص الطلب' : language === 'fr' ? 'Résumé de la commande' : 'Order Summary'}</h3>
                                    <div className="space-y-2 text-gray-400">
                                        <div className="flex justify-between">
                                            <span>{t('cart.subtotal', language)}</span>
                                            <span>{cartTotal} {t('common.currency', language)}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                                            <span>{t('cart.total', language)}</span>
                                            <span className="text-gold-400">{cartTotal} {t('common.currency', language)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setCheckoutStep('info')}
                                        className="flex-1 px-8 py-4 bg-white/5 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-200"
                                    >
                                        {language === 'ar' ? 'رجوع' : language === 'fr' ? 'Retour' : 'Back'}
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="flex-1 px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                                    >
                                        {t('checkout.placeOrder', language)}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
