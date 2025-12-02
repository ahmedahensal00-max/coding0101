
'use client';

import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';
import { useState } from 'react';

export default function Navbar() {
    const { language, setLanguage, cartItemsCount } = useShop();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: t('nav.home', language) },
        { href: '/about', label: t('nav.about', language) },
        { href: '/products', label: t('nav.products', language) },
        { href: '/contact', label: t('nav.contact', language) },
    ];

    return (
        <nav className="fixed top-0 w-full bg-black/90 z-50 shadow-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* Brand */}
                <Link href="/" className="text-white font-bold text-xl tracking-wider">
                    coding1010
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 text-white items-center">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="hover:text-gold-400 transition-colors duration-200 px-2"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side: Language & Cart */}
                <div className="flex items-center space-x-4">
                    {/* Language Switcher */}
                    <div className="flex items-center space-x-2">
                        {(['ar', 'fr', 'en'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === lang
                                    ? 'text-gold-400'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Cart */}
                    <Link href="/cart" className="relative text-white hover:text-gold-400 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden py-4 border-t border-white/10 bg-black/95">
                    <ul className="flex flex-col space-y-4 px-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-white hover:text-gold-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
