'use client';

import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';
import { useState } from 'react';

export default function ContactPage() {
    const { language } = useShop();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('contact.title', language)}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
                </div>

                {/* Contact Form */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                    {submitted ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">✓</div>
                            <h3 className="text-2xl font-bold text-gold-400 mb-2">
                                {language === 'ar' ? 'شكراً لتواصلك!' : language === 'fr' ? 'Merci de nous avoir contactés!' : 'Thank you for contacting us!'}
                            </h3>
                            <p className="text-gray-400">
                                {language === 'ar' ? 'سنرد عليك قريباً' : language === 'fr' ? 'Nous vous répondrons bientôt' : 'We will respond to you soon'}
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white mb-2 font-medium">
                                    {t('contact.name', language)}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-white mb-2 font-medium">
                                    {t('contact.message', language)}
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                            >
                                {t('contact.send', language)}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
