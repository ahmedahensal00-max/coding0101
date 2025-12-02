'use client';

import { useShop } from '@/context/ShopContext';
import { t } from '@/lib/translations';

export default function PrivacyPage() {
    const { language } = useShop();

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t('nav.privacy', language)}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto" />
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4">
                            {language === 'ar' ? 'جمع المعلومات' : language === 'fr' ? 'Collecte d\'Informations' : 'Information Collection'}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'نحن نجمع المعلومات التي تقدمها لنا عند إجراء عملية شراء أو الاتصال بنا. قد تشمل هذه المعلومات اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وعنوان الشحن.'
                                : language === 'fr'
                                    ? 'Nous collectons les informations que vous nous fournissez lorsque vous effectuez un achat ou nous contactez. Ces informations peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone et votre adresse de livraison.'
                                    : 'We collect information that you provide to us when making a purchase or contacting us. This information may include your name, email address, phone number, and shipping address.'
                            }
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4">
                            {language === 'ar' ? 'استخدام المعلومات' : language === 'fr' ? 'Utilisation des Informations' : 'Use of Information'}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'نستخدم المعلومات التي نجمعها لمعالجة طلباتك والتواصل معك وتحسين خدماتنا. لن نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك.'
                                : language === 'fr'
                                    ? 'Nous utilisons les informations que nous collectons pour traiter vos commandes, communiquer avec vous et améliorer nos services. Nous ne partagerons pas vos informations personnelles avec des tiers sans votre consentement.'
                                    : 'We use the information we collect to process your orders, communicate with you, and improve our services. We will not share your personal information with third parties without your consent.'
                            }
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4">
                            {language === 'ar' ? 'أمن البيانات' : language === 'fr' ? 'Sécurité des Données' : 'Data Security'}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'نحن نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.'
                                : language === 'fr'
                                    ? 'Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisés.'
                                    : 'We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.'
                            }
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4">
                            {language === 'ar' ? 'ملفات تعريف الارتباط' : language === 'fr' ? 'Cookies' : 'Cookies'}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك. يمكنك اختيار تعطيل ملفات تعريف الارتباط في إعدادات المتصفح الخاص بك.'
                                : language === 'fr'
                                    ? 'Nous utilisons des cookies pour améliorer votre expérience de navigation. Vous pouvez choisir de désactiver les cookies dans les paramètres de votre navigateur.'
                                    : 'We use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.'
                            }
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gold-400 mb-4">
                            {language === 'ar' ? 'اتصل بنا' : language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {language === 'ar'
                                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر صفحة الاتصال.'
                                : language === 'fr'
                                    ? 'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter via la page de contact.'
                                    : 'If you have any questions about this privacy policy, please contact us through the contact page.'
                            }
                        </p>
                    </section>

                    <div className="pt-6 border-t border-white/10">
                        <p className="text-sm text-gray-500 text-center">
                            {language === 'ar' ? 'آخر تحديث' : language === 'fr' ? 'Dernière mise à jour' : 'Last updated'}: {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'fr' ? 'fr-FR' : 'en-US')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
