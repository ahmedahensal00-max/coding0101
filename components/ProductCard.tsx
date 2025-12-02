'use client';

import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { language, addToCart } = useShop();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all duration-300"
        >
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-gold-500/20 backdrop-blur-sm text-gold-400 text-xs font-medium rounded-full border border-gold-500/30">
                    {t(`category.${product.category}`, language)}
                </span>
            </div>

            {/* Product Image */}
            <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder perfume bottle icon */}
                    <svg
                        className="w-32 h-32 text-gold-500/30 group-hover:text-gold-500/50 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M9 2h6v2h-6V2zm-1 3h8v2h-8V5zm0 3h8v14H8V8z" />
                    </svg>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-6 space-y-4">
                {/* Product Name */}
                <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors duration-200">
                    {product.name[language]}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 line-clamp-2">
                    {product.description[language]}
                </p>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-2xl font-bold text-gold-400">
                        {product.price} {t('common.currency', language)}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
                    >
                        {t('product.addToCart', language)}
                    </motion.button>
                </div>
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent" />
            </div>
        </motion.div>
    );
}
