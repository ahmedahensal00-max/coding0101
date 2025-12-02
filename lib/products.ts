import { Product } from '@/types';

export const products: Product[] = [
    {
        id: '1',
        name: {
            ar: 'عود ملكي',
            fr: 'Oud Royal',
            en: 'Royal Oud'
        },
        description: {
            ar: 'عطر شرقي فاخر يجمع بين العود الطبيعي والمسك الأبيض',
            fr: 'Parfum oriental luxueux combinant oud naturel et musc blanc',
            en: 'Luxurious oriental fragrance combining natural oud and white musk'
        },
        price: 899,
        image: '/perfumes/oud-royal.svg',
        category: 'oriental'
    },
    {
        id: '2',
        name: {
            ar: 'ياسمين الليل',
            fr: 'Jasmin de Nuit',
            en: 'Night Jasmine'
        },
        description: {
            ar: 'عطر زهري رومانسي بنفحات الياسمين والفانيليا',
            fr: 'Parfum floral romantique aux notes de jasmin et vanille',
            en: 'Romantic floral fragrance with jasmine and vanilla notes'
        },
        price: 749,
        image: '/perfumes/jasmine.svg',
        category: 'floral'
    },
    {
        id: '3',
        name: {
            ar: 'خشب الصندل',
            fr: 'Bois de Santal',
            en: 'Sandalwood'
        },
        description: {
            ar: 'عطر خشبي دافئ مع لمسات من الأرز والباتشولي',
            fr: 'Parfum boisé chaleureux avec des touches de cèdre et patchouli',
            en: 'Warm woody fragrance with cedar and patchouli touches'
        },
        price: 799,
        image: '/perfumes/sandalwood.svg',
        category: 'woody'
    },
    {
        id: '4',
        name: {
            ar: 'برغموت الصيف',
            fr: 'Bergamote d\'Été',
            en: 'Summer Bergamot'
        },
        description: {
            ar: 'عطر حمضي منعش بنفحات البرغموت والليمون',
            fr: 'Parfum citrus rafraîchissant aux notes de bergamote et citron',
            en: 'Refreshing citrus fragrance with bergamot and lemon notes'
        },
        price: 649,
        image: '/perfumes/bergamot.svg',
        category: 'citrus'
    },
    {
        id: '5',
        name: {
            ar: 'وردة دمشق',
            fr: 'Rose de Damas',
            en: 'Damascus Rose'
        },
        description: {
            ar: 'عطر زهري فاخر من الورد الدمشقي الأصيل',
            fr: 'Parfum floral luxueux de rose de Damas authentique',
            en: 'Luxurious floral fragrance from authentic Damascus rose'
        },
        price: 849,
        image: '/perfumes/damascus-rose.svg',
        category: 'floral'
    },
    {
        id: '6',
        name: {
            ar: 'عنبر ذهبي',
            fr: 'Ambre Doré',
            en: 'Golden Amber'
        },
        description: {
            ar: 'عطر شرقي دافئ بنفحات العنبر والفانيليا',
            fr: 'Parfum oriental chaleureux aux notes d\'ambre et vanille',
            en: 'Warm oriental fragrance with amber and vanilla notes'
        },
        price: 879,
        image: '/perfumes/amber.svg',
        category: 'oriental'
    },
    {
        id: '7',
        name: {
            ar: 'أرز الأطلس',
            fr: 'Cèdre de l\'Atlas',
            en: 'Atlas Cedar'
        },
        description: {
            ar: 'عطر خشبي قوي مستوحى من غابات الأرز',
            fr: 'Parfum boisé puissant inspiré des forêts de cèdre',
            en: 'Powerful woody fragrance inspired by cedar forests'
        },
        price: 779,
        image: '/perfumes/cedar.svg',
        category: 'woody'
    },
    {
        id: '8',
        name: {
            ar: 'نيرولي الربيع',
            fr: 'Néroli Printanier',
            en: 'Spring Neroli'
        },
        description: {
            ar: 'عطر حمضي زهري منعش بنفحات النيرولي وزهر البرتقال',
            fr: 'Parfum citrus floral rafraîchissant aux notes de néroli et fleur d\'oranger',
            en: 'Refreshing citrus floral fragrance with neroli and orange blossom notes'
        },
        price: 699,
        image: '/perfumes/neroli.svg',
        category: 'citrus'
    }
];
