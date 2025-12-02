'use client';

import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function ProductsPage() {
    const { language } = useShop();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', 'oriental', 'floral', 'woody', 'citrus'];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('nav.products', language)}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black'
                                    : 'bg-white/5 text-white hover:bg-white/10'
                                }`}
                        >
                            {category === 'all'
                                ? language === 'ar' ? 'الكل' : language === 'fr' ? 'Tous' : 'All'
                                : t(`category.${category}`, language)
                            }
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">
                            {language === 'ar' ? 'لا توجد منتجات' : language === 'fr' ? 'Aucun produit' : 'No products found'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
