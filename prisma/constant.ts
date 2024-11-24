import { Status } from "@prisma/client";

export const countries = [
  {
      id: "country-1",
      nameEn: "United Arab Emirates", 
      nameAr: "الإمارات العربية المتحدة",
      code: "UAE",
      flag: "🇦🇪",
      currency: "AED",
      dialCode: "+971",
      isActive: true
  },
  {
      id: "country-2",
      nameEn: "Saudi Arabia",
      nameAr: "المملكة العربية السعودية", 
      code: "SAU",
      flag: "🇸🇦",
      currency: "SAR",
      dialCode: "+966",
      isActive: true
  },
  {
      id: "country-3",
      nameEn: "Syria",
      nameAr: "سوريا",
      code: "SYR", 
      flag: "🇸🇾",
      currency: "SYP",
      dialCode: "+963",
      isActive: true
  },
  {
      id: "country-4",
      nameEn: "Egypt",
      nameAr: "مصر",
      code: "EGY",
      flag: "🇪🇬",
      currency: "EGP", 
      dialCode: "+20",
      isActive: true
  },
  {
      id: "country-5",
      nameEn: "Qatar",
      nameAr: "قطر",
      code: "QAT",
      flag: "🇶🇦",
      currency: "QAR",
      dialCode: "+974",
      isActive: true
  },
  {
      id: "country-6",
      nameEn: "Kuwait",
      nameAr: "الكويت",
      code: "KWT",
      flag: "🇰🇼",
      currency: "KWD",
      dialCode: "+965",
      isActive: true
  }
];

export const cities = [
  {
      id: "city-1",
      nameEn: "Dubai",
      nameAr: "دبي",
      countryId: "country-1",
      latitude: 25.2048,
      longitude: 55.2708,
      isActive: true
  },
  {
      id: "city-2",
      nameEn: "Abu Dhabi",
      nameAr: "أبوظبي",
      countryId: "country-1",
      latitude: 24.4539,
      longitude: 54.3773,
      isActive: true
  },
  {
      id: "city-3",
      nameEn: "Riyadh",
      nameAr: "الرياض",
      countryId: "country-2",
      latitude: 24.7136,
      longitude: 46.6753,
      isActive: true
  }
];

export const categories = [
  // Транспорт
  {
      id: "cat-1",
      nameEn: "Vehicles",
      nameAr: "مركبات",
      slug: "vehicles",
      icon: "🚗",
      isActive: true,
      order: 1
  },
  {
      id: "cat-1-1",
      nameEn: "Cars",
      nameAr: "سيارات",
      slug: "cars",
      icon: "🚘",
      parentId: "cat-1",
      isActive: true,
      order: 1
  },
  {
      id: "cat-1-2",
      nameEn: "Motorcycles",
      nameAr: "دراجات نارية",
      slug: "motorcycles",
      icon: "🏍️",
      parentId: "cat-1",
      isActive: true,
      order: 2
  },
  {
      id: "cat-1-3",
      nameEn: "Spare Parts",
      nameAr: "قطع غيار",
      slug: "spare-parts",
      icon: "🔧",
      parentId: "cat-1",
      isActive: true,
      order: 3
  },

  // Недвижимость
  {
      id: "cat-2",
      nameEn: "Real Estate",
      nameAr: "عقارات",
      slug: "real-estate",
      icon: "🏠",
      isActive: true,
      order: 2
  },
  {
      id: "cat-2-1",
      nameEn: "Apartments",
      nameAr: "شقق",
      slug: "apartments",
      icon: "🏢",
      parentId: "cat-2",
      isActive: true,
      order: 1
  },
  {
      id: "cat-2-2",
      nameEn: "Villas",
      nameAr: "فلل",
      slug: "villas",
      icon: "🏡",
      parentId: "cat-2",
      isActive: true,
      order: 2
  },
  {
      id: "cat-2-3",
      nameEn: "Commercial",
      nameAr: "تجاري",
      slug: "commercial",
      icon: "🏪",
      parentId: "cat-2",
      isActive: true,
      order: 3
  },

  // Электроника
  {
      id: "cat-3",
      nameEn: "Electronics",
      nameAr: "إلكترونيات",
      slug: "electronics",
      icon: "📱",
      isActive: true,
      order: 3
  },
  {
      id: "cat-3-1",
      nameEn: "Phones",
      nameAr: "هواتف",
      slug: "phones",
      icon: "📱",
      parentId: "cat-3",
      isActive: true,
      order: 1
  },
  {
      id: "cat-3-2",
      nameEn: "Laptops",
      nameAr: "حواسيب محمولة",
      slug: "laptops",
      icon: "💻",
      parentId: "cat-3",
      isActive: true,
      order: 2
  },
  {
      id: "cat-3-3",
      nameEn: "Gaming",
      nameAr: "ألعاب",
      slug: "gaming",
      icon: "🎮",
      parentId: "cat-3",
      isActive: true,
      order: 3
  },

  // Мода
  {
      id: "cat-4",
      nameEn: "Fashion",
      nameAr: "أزياء",
      slug: "fashion",
      icon: "👕",
      isActive: true,
      order: 4
  },
  {
      id: "cat-4-1",
      nameEn: "Men's Clothing",
      nameAr: "ملابس رجالية",
      slug: "mens-clothing",
      icon: "👔",
      parentId: "cat-4",
      isActive: true,
      order: 1
  },
  {
      id: "cat-4-2",
      nameEn: "Women's Clothing",
      nameAr: "ملابس نسائية",
      slug: "womens-clothing",
      icon: "👗",
      parentId: "cat-4",
      isActive: true,
      order: 2
  },
  {
      id: "cat-4-3",
      nameEn: "Accessories",
      nameAr: "اكسسوارات",
      slug: "accessories",
      icon: "👜",
      parentId: "cat-4",
      isActive: true,
      order: 3
  }
];

export const adts = [
  {
      title: "2023 Toyota Camry",
      description: "Excellent condition, low mileage",
      price: 75000.00,
      status: Status.PUBLISHED,
      countryId: "country-1", 
      cityId: "city-1",
      address: "Dubai Marina",
      latitude: 25.2048,
      longitude: 55.2708,
      userId: 1,
      categoryId: "cat-1-1",
      views: 0,
      image: "https://example.com/camry.jpg",
      contactPhone: "+971501234567",
      isPromoted: true
  },
  {
      title: "iPhone 14 Pro Max",
      description: "Новый, запечатанный iPhone 14 Pro Max 256GB",
      price: 4499.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1", 
      address: "Mall of Emirates",
      latitude: 25.1181,
      longitude: 55.2008,
      userId: 1,
      categoryId: "cat-3-1",
      views: 0,
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb",
      contactPhone: "+971501234567",
      isPromoted: false
  },
  {
      title: "Роскошная вилла с бассейном",
      description: "6 спален, 7 ванных комнат, частный бассейн, сад",
      price: 12000000.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Palm Jumeirah",
      latitude: 25.1124,
      longitude: 55.1390,
      userId: 1,
      categoryId: "cat-2-2",
      views: 0,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      contactPhone: "+971501234567",
      isPromoted: true
  },
  {
      title: "Дизайнерская сумка Gucci",
      description: "Оригинальная сумка Gucci из новой коллекции",
      price: 8500.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Dubai Mall",
      latitude: 25.1972,
      longitude: 55.2744,
      userId: 1,
      categoryId: "cat-4-3",
      views: 0,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
      contactPhone: "+971501234567",
      isPromoted: false
  },
  {
      title: "Harley-Davidson Street Glide",
      description: "2022 год, пробег 5000 км, отличное состояние",
      price: 95000.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Motor City",
      latitude: 25.0511,
      longitude: 55.2492,
      userId: 1,
      categoryId: "cat-1-2",
      views: 0,
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39",
      contactPhone: "+971501234567",
      isPromoted: true
  },
  {
      title: "Оригинальные запчасти BMW",
      description: "Новые тормозные диски и колодки для BMW X5",
      price: 2500.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Al Quoz",
      latitude: 25.1539,
      longitude: 55.2289,
      userId: 1,
      categoryId: "cat-1-3",
      views: 0,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3",
      contactPhone: "+971501234567",
      isPromoted: false
  },
  {
      title: "Женское вечернее платье",
      description: "Элегантное вечернее платье от известного дизайнера",
      price: 3500.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Dubai Mall",
      latitude: 25.1972,
      longitude: 55.2744,
      userId: 1,
      categoryId: "cat-4-2",
      views: 0,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
      contactPhone: "+971501234567",
      isPromoted: true
  },
  {
      title: "Мужской костюм Tom Ford",
      description: "Новый костюм Tom Ford, размер 52",
      price: 12000.00,
      status: Status.PUBLISHED,
      countryId: "country-1",
      cityId: "city-1",
      address: "Mall of Emirates",
      latitude: 25.1181,
      longitude: 55.2008,
      userId: 1,
      categoryId: "cat-4-1",
      views: 0,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
      contactPhone: "+971501234567",
      isPromoted: false
  }
];

// export const adts = [
//   {
//       title: "2023 Toyota Camry",
//       description: "Excellent condition, low mileage",
//       price: 75000.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Dubai Marina",
//       latitude: 25.2048,
//       longitude: 55.2708,
//       userId: 1,
//       categoryId: "cat-1-1", // Обновлено на подкатегорию Cars
//       views: 0,
//       image: "https://example.com/camry.jpg",
//       contactPhone: "+971501234567",
//       isPromoted: true
//   },
//   {
//       title: "Студия в центре города",
//       description: "Современная студия с прекрасным видом",
//       price: 2200.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Downtown Dubai",
//       latitude: 25.2048,
//       longitude: 55.2708,
//       userId: 1,
//       categoryId: "cat-2-1", // Обновлено на подкатегорию Apartments
//       views: 0,
//       image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
//       contactPhone: "+971501234567",
//       isPromoted: true
//   },
//   {
//       title: "MacBook Pro M2",
//       description: "Новый MacBook Pro с чипом M2",
//       price: 2499.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Dubai Mall",
//       latitude: 25.2048,
//       longitude: 55.2708,
//       userId: 1,
//       categoryId: "cat-3-2", // Обновлено на подкатегорию Laptops
//       views: 0,
//       image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//       contactPhone: "+971501234567",
//       isPromoted: false
//   },
//   {
//       title: "Винтажная кожаная куртка",
//       description: "Оригинальная кожаная куртка, ручная работа",
//       price: 299.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Portland Fashion District",
//       latitude: 45.5155,
//       longitude: -122.6789,
//       userId: 2,
//       categoryId: "cat-4",
//       views: 0,
//       image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
//       contactPhone: "+15035559876",
//       isPromoted: true
//   },
//   {
//       title: "Профессиональная камера DSLR",
//       description: "Полный комплект профессиональной фототехники",
//       price: 1899.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "New York Photography District",
//       latitude: 40.7128,
//       longitude: -74.0060,
//       userId: 1,
//       categoryId: "cat-3",
//       views: 0,
//       image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
//       contactPhone: "+12125558899",
//       isPromoted: true
//   },
//   {
//       title: "Игровая приставка PS5",
//       description: "Новая PS5 с дополнительным геймпадом",
//       price: 499.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Las Vegas Gaming Center",
//       latitude: 36.1699,
//       longitude: -115.1398,
//       userId: 1,
//       categoryId: "cat-3",
//       views: 0,
//       image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
//       contactPhone: "+17025553344",
//       isPromoted: false
//   },
//   {
//       title: "Электрогитара Fender Stratocaster",
//       description: "Классическая электрогитара в идеальном состоянии",
//       price: 1199.00,
//       status: Status.PUBLISHED,
//       countryId: "country-1",
//       cityId: "city-1",
//       address: "Nashville Music Row",
//       latitude: 36.1627,
//       longitude: -86.7816,
//       userId: 2,
//       categoryId: "cat-6",
//       views: 0,
//       image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
//       contactPhone: "+16155557777",
//       isPromoted: true
//   }
// ];
