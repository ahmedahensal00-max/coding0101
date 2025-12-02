'use client';

import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';

export default function AboutPage() {
    const { language } = useShop();

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('about.title', language)}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-gold-400 mb-6">
                            coding1010
                        </h2>
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            {t('about.description', language)}
                        </p>
                        <p className="text-lg text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'منذ تأسيسنا، كنا ملتزمين بإنشاء عطور استثنائية تأسر الحواس وتترك انطباعًا دائمًا. مجموعتنا المنسقة بعناية تقدم شيئًا للجميع، من العطور الشرقية الغنية إلى الروائح الزهرية الرقيقة.'
                                : language === 'fr'
                                    ? 'Depuis notre création, nous nous engageons à créer des parfums exceptionnels qui captivent les sens et laissent une impression durable. Notre collection soigneusement sélectionnée offre quelque chose pour tout le monde, des riches parfums orientaux aux délicates senteurs florales.'
                                    : 'Since our founding, we have been committed to creating exceptional perfumes that captivate the senses and leave a lasting impression. Our carefully curated collection offers something for everyone, from rich oriental scents to delicate floral fragrances.'
                            }
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {language === 'ar' ? 'الحرفية' : language === 'fr' ? 'Artisanat' : 'Craftsmanship'}
                            </h3>
                            <p className="text-gray-400">
                                {language === 'ar'
                                    ? 'كل عطر مصنوع بدقة باستخدام أجود المكونات من جميع أنحاء العالم.'
                                    : language === 'fr'
                                        ? 'Chaque parfum est fabriqué avec précision en utilisant les meilleurs ingrédients du monde entier.'
                                        : 'Each perfume is crafted with precision using the finest ingredients from around the world.'
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
                            <div className="text-4xl mb-4">✨</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {language === 'ar' ? 'الأناقة' : language === 'fr' ? 'Élégance' : 'Elegance'}
                            </h3>
                            <p className="text-gray-400">
                                {language === 'ar'
                                    ? 'تصاميمنا تعكس الرقي والفخامة في كل التفاصيل.'
                                    : language === 'fr'
                                        ? 'Nos designs reflètent la sophistication et le luxe dans chaque détail.'
                                        : 'Our designs reflect sophistication and luxury in every detail.'
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
                            <div className="text-4xl mb-4">🌍</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {language === 'ar' ? 'عالمي' : language === 'fr' ? 'Mondial' : 'Global'}
                            </h3>
                            <p className="text-gray-400">
                                {language === 'ar'
                                    ? 'نقدم خدماتنا للعملاء في جميع أنحاء العالم بأعلى معايير الجودة.'
                                    : language === 'fr'
                                        ? 'Nous servons des clients du monde entier avec les plus hauts standards de qualité.'
                                        : 'We serve customers worldwide with the highest standards of quality.'
                                }
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {language === 'ar' ? 'الفخامة' : language === 'fr' ? 'Luxe' : 'Luxury'}
                            </h3>
                            <p className="text-gray-400">
                                {language === 'ar'
                                    ? 'تجربة فاخرة من لحظة فتح العبوة حتى آخر رشة.'
                                    : language === 'fr'
                                        ? 'Une expérience luxueuse du moment où vous ouvrez l\'emballage jusqu\'à la dernière vaporisation.'
                                        : 'A luxurious experience from the moment you open the package to the last spray.'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
