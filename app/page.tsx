import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function Home() {
  // Show first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Collection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-gold-500/50 transition-all duration-200"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
