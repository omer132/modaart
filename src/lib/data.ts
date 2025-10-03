// Gerçek ürün verileri
export const products = [
  {
    id: 1,
    name: 'Deniz Derinlikleri',
    price: 1250,
    originalPrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 24,
    category: 'Deniz Koleksiyonu',
    isNew: true,
    discount: 17,
    stock: 15,
    status: 'active',
    description: 'Denizin derinliklerindeki gizemli dünyayı yansıtan özel eser. Bu büyüleyici kompozisyon, mavi tonların uyumlu dansı ile deniz canlılarının yaşam alanını gözler önüne seriyor.',
    features: [
      'Yüksek kaliteli tuval üzerine yağlı boya',
      'Profesyonel çerçeve dahil',
      '60x80 cm boyutlarında',
      'İmzalı ve sertifikalı',
      'Hızlı kargo ile teslimat'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '2.5 kg'
    },
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Orman Sessizliği',
    price: 980,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 18,
    category: 'Doğa Koleksiyonu',
    isNew: false,
    discount: null,
    stock: 8,
    status: 'active',
    description: 'Doğanın sakinliğini ve güzelliğini yansıtan eser. Ağaçların arasından süzülen ışık ve doğanın huzuru bu kompozisyonda buluşuyor.',
    features: [
      'Akrilik boya tekniği',
      'Ahşap çerçeve dahil',
      '50x70 cm boyutlarında',
      'Doğal renkler',
      'Eco-friendly malzeme'
    ],
    specifications: {
      'Boyutlar': '50x70 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '1.8 kg'
    },
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Modern Çizgiler',
    price: 750,
    originalPrice: 900,
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 31,
    category: 'Modern Sanat',
    isNew: true,
    discount: 17,
    stock: 0,
    status: 'inactive',
    description: 'Çağdaş sanatın en güzel örneklerinden biri. Geometrik şekiller ve canlı renklerin uyumu ile modern yaşamın dinamizmini yansıtıyor.',
    features: [
      'Mixed media tekniği',
      'Modern çerçeve dahil',
      '40x60 cm boyutlarında',
      'Soyut kompozisyon',
      'Çağdaş tasarım'
    ],
    specifications: {
      'Boyutlar': '40x60 cm',
      'Teknik': 'Mixed Media',
      'Tuval': 'Sentetik Tuval',
      'Çerçeve': 'Metal Çerçeve',
      'Ağırlık': '1.2 kg'
    },
    createdAt: '2024-01-08'
  },
  {
    id: 4,
    name: 'Dağ Manzarası',
    price: 1100,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 22,
    category: 'Dağ Manzaraları',
    isNew: false,
    discount: null,
    stock: 12,
    status: 'active',
    description: 'Dağların ihtişamını yansıtan manzara eseri. Doğanın gücü ve büyüklüğü bu kompozisyonda en güzel şekilde ifade ediliyor.',
    features: [
      'Yağlı boya tekniği',
      'Klasik çerçeve dahil',
      '70x90 cm boyutlarında',
      'Doğal manzara',
      'Profesyonel kalite'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '3.2 kg'
    },
    createdAt: '2024-01-05'
  },
  {
    id: 5,
    name: 'Renkli Dünyalar',
    price: 650,
    originalPrice: 800,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 15,
    category: 'Modern Sanat',
    isNew: true,
    discount: 19,
    stock: 6,
    status: 'active',
    description: 'Renklerin dans ettiği canlı bir kompozisyon. Her rengin kendine özgü hikayesi ile sanatın evrensel dilini konuşuyor.',
    features: [
      'Akrilik boya tekniği',
      'Modern çerçeve dahil',
      '45x65 cm boyutlarında',
      'Canlı renkler',
      'Enerjik kompozisyon'
    ],
    specifications: {
      'Boyutlar': '45x65 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '1.5 kg'
    },
    createdAt: '2024-01-03'
  },
  {
    id: 6,
    name: 'Sakin Sular',
    price: 890,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 27,
    category: 'Deniz Koleksiyonu',
    isNew: false,
    discount: null,
    stock: 10,
    status: 'active',
    description: 'Suyun dinginliğini ve berraklığını yansıtan eser. Denizin sakin yüzü ile huzurun en güzel ifadesi.',
    features: [
      'Su bazlı boya tekniği',
      'Doğal çerçeve dahil',
      '55x75 cm boyutlarında',
      'Sakin kompozisyon',
      'Huzur verici tasarım'
    ],
    specifications: {
      'Boyutlar': '55x75 cm',
      'Teknik': 'Su Bazlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '2.1 kg'
    },
    createdAt: '2024-01-01'
  },
  {
    id: 7,
    name: 'Okyanus Dalgaları',
    price: 1450,
    originalPrice: 1650,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 42,
    category: 'Deniz Koleksiyonu',
    isNew: true,
    discount: 12,
    stock: 18,
    status: 'active',
    description: 'Okyanusun güçlü dalgalarının enerjisini yansıtan muhteşem eser. Mavinin tüm tonlarıyla doğanın gücünü evinize taşır.',
    features: [
      'Yüksek kaliteli tuval üzerine yağlı boya',
      'Premium çerçeve dahil',
      '80x100 cm boyutlarında',
      'İmzalı ve sertifikalı',
      'Özel koruma kaplamı'
    ],
    specifications: {
      'Boyutlar': '80x100 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Premium Ahşap Çerçeve',
      'Ağırlık': '4.2 kg'
    },
    createdAt: '2024-01-20'
  },
  {
    id: 8,
    name: 'Mercan Kayalıkları',
    price: 980,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 35,
    category: 'Deniz Koleksiyonu',
    isNew: false,
    discount: null,
    stock: 14,
    status: 'active',
    description: 'Renkli mercan kayalıklarının büyüleyici dünyası. Denizin altındaki yaşamı tüm canlılığıyla gözler önüne serer.',
    features: [
      'Akrilik boya tekniği',
      'Doğal ahşap çerçeve',
      '65x85 cm boyutlarında',
      'Canlı renkler',
      'Parlak vernik koruma'
    ],
    specifications: {
      'Boyutlar': '65x85 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '3.1 kg'
    },
    createdAt: '2024-01-18'
  },
  {
    id: 9,
    name: 'Deniz Feneri',
    price: 1200,
    originalPrice: 1400,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 28,
    category: 'Deniz Koleksiyonu',
    isNew: true,
    discount: 14,
    stock: 9,
    status: 'active',
    description: 'Fırtınalı gecede deniz fenerinin ışığını taşıyan romantik eser. Umudu ve yol göstermeyi simgeler.',
    features: [
      'Yağlı boya tekniği',
      'Antik stil çerçeve',
      '70x90 cm boyutlarında',
      'Dramatik kompozisyon',
      'Mat vernik koruma'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Antik Ahşap Çerçeve',
      'Ağırlık': '3.8 kg'
    },
    createdAt: '2024-01-16'
  },
  {
    id: 10,
    name: 'Yunus Ailesi',
    price: 850,
    originalPrice: 1050,
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 51,
    category: 'Deniz Koleksiyonu',
    isNew: false,
    discount: 19,
    stock: 22,
    status: 'active',
    description: 'Yunusların doğal habitatında özgürce yüzdüğü büyüleyici anlar. Denizin neşeli ve zeki sakinleri.',
    features: [
      'Su bazlı boya tekniği',
      'Modern çerçeve dahil',
      '55x75 cm boyutlarında',
      'Dinamik kompozisyon',
      'Ekolojik malzeme'
    ],
    specifications: {
      'Boyutlar': '55x75 cm',
      'Teknik': 'Su Bazlı Boya',
      'Tuval': 'Organik Tuval',
      'Çerçeve': 'Modern Ahşap Çerçeve',
      'Ağırlık': '2.4 kg'
    },
    createdAt: '2024-01-14'
  },
  {
    id: 11,
    name: 'Denizaltı Dünyası',
    price: 1350,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 19,
    category: 'Deniz Koleksiyonu',
    isNew: true,
    discount: null,
    stock: 11,
    status: 'active',
    description: 'Denizin derinliklerindeki gizemli yaşamı keşfeden fantastik kompozisyon. Bilinmeyen güzelliklerin dünyası.',
    features: [
      'Mixed media tekniği',
      'Özel tasarım çerçeve',
      '75x95 cm boyutlarında',
      'Fantastik kompozisyon',
      'Özel efekt vernik'
    ],
    specifications: {
      'Boyutlar': '75x95 cm',
      'Teknik': 'Mixed Media',
      'Tuval': 'Özel Tuval',
      'Çerçeve': 'Tasarım Çerçeve',
      'Ağırlık': '3.9 kg'
    },
    createdAt: '2024-01-12'
  },
  {
    id: 12,
    name: 'Gün Batımı Sahili',
    price: 1180,
    originalPrice: 1380,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 37,
    category: 'Deniz Koleksiyonu',
    isNew: false,
    discount: 15,
    stock: 16,
    status: 'active',
    description: 'Güneşin denizle buluştuğu büyülü anlar. Doğanın en romantik manzaralarından biri.',
    features: [
      'Yağlı boya tekniği',
      'Klasik çerçeve dahil',
      '60x80 cm boyutlarında',
      'Romantik kompozisyon',
      'Sıcak renkler'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Klasik Ahşap Çerçeve',
      'Ağırlık': '2.8 kg'
    },
    createdAt: '2024-01-09'
  },
  {
    id: 13,
    name: 'Çiçek Bahçesi',
    price: 720,
    originalPrice: 900,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviews: 19,
    category: 'Doğa Koleksiyonu',
    isNew: false,
    discount: 20,
    stock: 4,
    status: 'active',
    description: 'Renkli çiçeklerin büyüleyici dünyası. Doğanın en güzel renklerini evinize taşıyan özel eser.',
    features: [
      'Yağlı boya tekniği',
      'Klasik çerçeve dahil',
      '50x70 cm boyutlarında',
      'Çiçek kompozisyonu',
      'Doğal renkler'
    ],
    specifications: {
      'Boyutlar': '50x70 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Ahşap Çerçeve',
      'Ağırlık': '2.0 kg'
    },
    createdAt: '2023-12-28'
  },
  {
    id: 14,
    name: 'Çam Ormanı',
    price: 1100,
    originalPrice: 1300,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 45,
    category: 'Doğa Koleksiyonu',
    isNew: true,
    discount: 15,
    stock: 20,
    status: 'active',
    description: 'Çam ormanlarının sessiz büyüsünü yansıtan muhteşem eser. Yeşilin tüm tonlarıyla doğanın huzurunu evinize taşır.',
    features: [
      'Yağlı boya tekniği',
      'Doğal ahşap çerçeve',
      '65x85 cm boyutlarında',
      'Yeşil tonlar ağırlıklı',
      'Mat vernik koruma'
    ],
    specifications: {
      'Boyutlar': '65x85 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Doğal Ahşap Çerçeve',
      'Ağırlık': '3.2 kg'
    },
    createdAt: '2024-01-25'
  },
  {
    id: 15,
    name: 'Kiraz Çiçekleri',
    price: 950,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 38,
    category: 'Doğa Koleksiyonu',
    isNew: false,
    discount: null,
    stock: 16,
    status: 'active',
    description: 'Baharın müjdecisi kiraz çiçeklerinin zarafeti. Pembe ve beyaz tonlarla doğanın en romantik anlarından biri.',
    features: [
      'Su bazlı boya tekniği',
      'İnce detay işçiliği',
      '50x70 cm boyutlarında',
      'Bahar teması',
      'Canlı renkler'
    ],
    specifications: {
      'Boyutlar': '50x70 cm',
      'Teknik': 'Su Bazlı Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Bambu Çerçeve',
      'Ağırlık': '1.9 kg'
    },
    createdAt: '2024-01-22'
  },
  {
    id: 16,
    name: 'Sonbahar Yaprakları',
    price: 880,
    originalPrice: 1100,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 29,
    category: 'Doğa Koleksiyonu',
    isNew: true,
    discount: 20,
    stock: 12,
    status: 'active',
    description: 'Sonbaharın altın renklerinin büyüleyici dansı. Sarı, turuncu ve kırmızı tonlarla mevsimlerin değişimini kutlar.',
    features: [
      'Akrilik boya tekniği',
      'Sıcak renk paleti',
      '60x80 cm boyutlarında',
      'Sonbahar teması',
      'Dokulu yüzey'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Dokulu Tuval',
      'Çerçeve': 'Antik Ahşap Çerçeve',
      'Ağırlık': '2.7 kg'
    },
    createdAt: '2024-01-19'
  },
  {
    id: 17,
    name: 'Lavanta Tarlası',
    price: 1250,
    originalPrice: 1450,
    images: [
      'https://images.unsplash.com/photo-1464822759844-d150a8ac0c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759844-d150a8ac0c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 52,
    category: 'Doğa Koleksiyonu',
    isNew: false,
    discount: 14,
    stock: 18,
    status: 'active',
    description: 'Provence lavanta tarlalarının büyüleyici manzarası. Mor rengin dinginliği ile doğanın huzurunu yansıtır.',
    features: [
      'Yağlı boya tekniği',
      'Perspektif kompozisyon',
      '70x90 cm boyutlarında',
      'Mor tonlar ağırlıklı',
      'Premium çerçeve'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Premium Ahşap Çerçeve',
      'Ağırlık': '3.8 kg'
    },
    createdAt: '2024-01-17'
  },
  {
    id: 18,
    name: 'Karlı Dağ Zirvesi',
    price: 1350,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 21,
    category: 'Doğa Koleksiyonu',
    isNew: true,
    discount: null,
    stock: 8,
    status: 'active',
    description: 'Karlı dağ zirvelerinin heybetli güzelliği. Beyazın saflığı ve doğanın gücünü bir arada sunan etkileyici eser.',
    features: [
      'Mixed media tekniği',
      'Kar efekti detayları',
      '75x100 cm boyutlarında',
      'Soğuk renk paleti',
      'Özel efekt vernik'
    ],
    specifications: {
      'Boyutlar': '75x100 cm',
      'Teknik': 'Mixed Media',
      'Tuval': 'Özel Tuval',
      'Çerçeve': 'Modern Metal Çerçeve',
      'Ağırlık': '4.5 kg'
    },
    createdAt: '2024-01-15'
  },
  {
    id: 19,
    name: 'Güneş Işığında Çayır',
    price: 780,
    originalPrice: 950,
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 41,
    category: 'Doğa Koleksiyonu',
    isNew: false,
    discount: 18,
    stock: 25,
    status: 'active',
    description: 'Güneş ışığının çayıra düştüğü büyülü anlar. Yeşilin canlılığı ve ışığın sıcaklığı bir arada.',
    features: [
      'Akrilik boya tekniği',
      'Işık-gölge oyunu',
      '55x75 cm boyutlarında',
      'Canlı yeşil tonlar',
      'Doğal çerçeve'
    ],
    specifications: {
      'Boyutlar': '55x75 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Doğal Ahşap Çerçeve',
      'Ağırlık': '2.3 kg'
    },
    createdAt: '2024-01-13'
  },
  {
    id: 20,
    name: 'Everest Zirvesi',
    price: 1500,
    originalPrice: 1800,
    images: [
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-14b5e4d4b4c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 67,
    category: 'Dağ Manzaraları',
    isNew: true,
    discount: 17,
    stock: 12,
    status: 'active',
    description: 'Dünyanın en yüksek zirvesi Everest\'in heybetli güzelliği. Kar beyazının sonsuzlukla buluştuğu muhteşem manzara.',
    features: [
      'Yağlı boya tekniği',
      'Panoramik kompozisyon',
      '90x120 cm boyutlarında',
      'Kar detayları',
      'Premium çerçeve dahil'
    ],
    specifications: {
      'Boyutlar': '90x120 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Premium Ahşap Çerçeve',
      'Ağırlık': '5.2 kg'
    },
    createdAt: '2024-01-28'
  },
  {
    id: 21,
    name: 'Alpler Gün Doğumu',
    price: 1250,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1464822759844-d150a8ac0c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759844-d150a8ac0c40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 43,
    category: 'Dağ Manzaraları',
    isNew: false,
    discount: null,
    stock: 18,
    status: 'active',
    description: 'Alp dağlarında büyüleyici gün doğumu manzarası. Güneşin zirvelerden süzülen ışığıyla doğanın büyüsü.',
    features: [
      'Akrilik boya tekniği',
      'Işık-gölge oyunu',
      '70x90 cm boyutlarında',
      'Sıcak renk tonları',
      'Doğal ahşap çerçeve'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Doğal Ahşap Çerçeve',
      'Ağırlık': '3.5 kg'
    },
    createdAt: '2024-01-26'
  },
  {
    id: 22,
    name: 'Karadeniz Yaylaları',
    price: 980,
    originalPrice: 1200,
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 35,
    category: 'Dağ Manzaraları',
    isNew: true,
    discount: 18,
    stock: 22,
    status: 'active',
    description: 'Karadeniz yaylalarının eşsiz güzelliği. Yeşil çayırlar ve bulutlarla kaplı dağların uyumu.',
    features: [
      'Su bazlı boya tekniği',
      'Yeşil tonlar ağırlıklı',
      '60x80 cm boyutlarında',
      'Yayla atmosferi',
      'Mat vernik koruma'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Su Bazlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Rustik Ahşap Çerçeve',
      'Ağırlık': '2.8 kg'
    },
    createdAt: '2024-01-24'
  },
  {
    id: 23,
    name: 'Himalaya Zirvesi',
    price: 1400,
    originalPrice: 1650,
    images: [
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 56,
    category: 'Dağ Manzaraları',
    isNew: false,
    discount: 15,
    stock: 8,
    status: 'active',
    description: 'Himalaya dağlarının mistik atmosferi. Bulutların arasından yükselen zirveler ve sonsuzluk hissi.',
    features: [
      'Mixed media tekniği',
      'Mistik atmosfer',
      '80x100 cm boyutlarında',
      'Bulut efektleri',
      'Özel vernik koruma'
    ],
    specifications: {
      'Boyutlar': '80x100 cm',
      'Teknik': 'Mixed Media',
      'Tuval': 'Özel Tuval',
      'Çerçeve': 'Modern Metal Çerçeve',
      'Ağırlık': '4.2 kg'
    },
    createdAt: '2024-01-21'
  },
  {
    id: 24,
    name: 'Dağ Gölü Yansıması',
    price: 1100,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 41,
    category: 'Dağ Manzaraları',
    isNew: true,
    discount: null,
    stock: 15,
    status: 'active',
    description: 'Kristal berraklığındaki dağ gölünde yansıyan zirveler. Doğanın mükemmel simetrisini gösteren eser.',
    features: [
      'Yağlı boya tekniği',
      'Yansıma efekti',
      '65x85 cm boyutlarında',
      'Su detayları',
      'Klasik çerçeve'
    ],
    specifications: {
      'Boyutlar': '65x85 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Klasik Ahşap Çerçeve',
      'Ağırlık': '3.1 kg'
    },
    createdAt: '2024-01-18'
  },
  {
    id: 25,
    name: 'Sonbahar Dağları',
    price: 850,
    originalPrice: 1000,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 28,
    category: 'Dağ Manzaraları',
    isNew: false,
    discount: 15,
    stock: 20,
    status: 'active',
    description: 'Sonbaharın altın renklerini taşıyan dağ manzarası. Sarı, turuncu ve kırmızı yaprakların büyüleyici uyumu.',
    features: [
      'Akrilik boya tekniği',
      'Sonbahar renkleri',
      '55x75 cm boyutlarında',
      'Sıcak tonlar',
      'Doğal çerçeve'
    ],
    specifications: {
      'Boyutlar': '55x75 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Doğal Ahşap Çerçeve',
      'Ağırlık': '2.4 kg'
    },
    createdAt: '2024-01-16'
  },
  {
    id: 26,
    name: 'Soyut Kompozisyon',
    price: 1200,
    originalPrice: 1450,
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 52,
    category: 'Modern Sanat',
    isNew: true,
    discount: 17,
    stock: 15,
    status: 'active',
    description: 'Çağdaş sanatın en güzel örneklerinden geometrik formların dans ettiği soyut kompozisyon. Renklerin uyumu ile modern yaşamın dinamizmini yansıtır.',
    features: [
      'Akrilik boya tekniği',
      'Geometrik kompozisyon',
      '70x90 cm boyutlarında',
      'Canlı renk paleti',
      'Modern çerçeve dahil'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Pamuklu Tuval',
      'Çerçeve': 'Modern Metal Çerçeve',
      'Ağırlık': '3.2 kg'
    },
    createdAt: '2024-01-30'
  },
  {
    id: 27,
    name: 'Minimalist Çizgiler',
    price: 950,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 38,
    category: 'Modern Sanat',
    isNew: false,
    discount: null,
    stock: 22,
    status: 'active',
    description: 'Minimalizmin gücünü yansıtan sade ama etkili çizgiler. Az ile çoğu anlatan çağdaş sanat yaklaşımının mükemmel örneği.',
    features: [
      'Mixed media tekniği',
      'Minimalist tasarım',
      '60x80 cm boyutlarında',
      'Siyah-beyaz ağırlıklı',
      'Premium çerçeve'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Mixed Media',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Premium Çerçeve',
      'Ağırlık': '2.8 kg'
    },
    createdAt: '2024-01-28'
  },
  {
    id: 28,
    name: 'Renkli Ekspresyon',
    price: 1100,
    originalPrice: 1300,
    images: [
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 44,
    category: 'Modern Sanat',
    isNew: true,
    discount: 15,
    stock: 18,
    status: 'active',
    description: 'Ekspresyonist akımından ilham alan canlı renklerle dolu eser. Duyguların renklere dönüştüğü büyüleyici bir kompozisyon.',
    features: [
      'Yağlı boya tekniği',
      'Ekspresyonist tarz',
      '80x100 cm boyutlarında',
      'Yoğun renk kullanımı',
      'Dokulu yüzey'
    ],
    specifications: {
      'Boyutlar': '80x100 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Dokulu Tuval',
      'Çerçeve': 'Sanatsal Çerçeve',
      'Ağırlık': '4.1 kg'
    },
    createdAt: '2024-01-26'
  },
  {
    id: 29,
    name: 'Digital Art Fusion',
    price: 1350,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551913902-c92207136625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 61,
    category: 'Modern Sanat',
    isNew: true,
    discount: null,
    stock: 12,
    status: 'active',
    description: 'Dijital sanat ile geleneksel tekniklerin buluştuğu yenilikçi eser. Gelecek ile geçmişin muhteşem uyumu.',
    features: [
      'Dijital-analog hibrit',
      'Yenilikçi teknik',
      '75x95 cm boyutlarında',
      'Holografik detaylar',
      'Özel LED çerçeve'
    ],
    specifications: {
      'Boyutlar': '75x95 cm',
      'Teknik': 'Digital-Analog Hibrit',
      'Tuval': 'Özel Dijital Tuval',
      'Çerçeve': 'LED Çerçeve',
      'Ağırlık': '3.8 kg'
    },
    createdAt: '2024-01-24'
  },
  {
    id: 30,
    name: 'Kentsel Ritim',
    price: 880,
    originalPrice: 1050,
    images: [
      'https://images.unsplash.com/photo-1471666875520-c75081f42081?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1471666875520-c75081f42081?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 33,
    category: 'Modern Sanat',
    isNew: false,
    discount: 16,
    stock: 25,
    status: 'active',
    description: 'Modern şehir yaşamının ritmini yansıtan dinamik eser. Kentsel kaosun içindeki düzeni gösteren sanatsal bakış.',
    features: [
      'Spraypaint tekniği',
      'Urban art stili',
      '65x85 cm boyutlarında',
      'Grafiti estetiği',
      'Endüstriyel çerçeve'
    ],
    specifications: {
      'Boyutlar': '65x85 cm',
      'Teknik': 'Spraypaint',
      'Tuval': 'Metal Yüzey',
      'Çerçeve': 'Endüstriyel Çerçeve',
      'Ağırlık': '3.5 kg'
    },
    createdAt: '2024-01-22'
  },
  {
    id: 31,
    name: 'Işık ve Gölge',
    price: 1250,
    originalPrice: 1480,
    images: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 47,
    category: 'Modern Sanat',
    isNew: false,
    discount: 16,
    stock: 14,
    status: 'active',
    description: 'Işık ve gölgenin dramatik oyunu ile yaratılmış büyüleyici kompozisyon. Zıtlıkların uyum içinde bulunduğu sanat eseri.',
    features: [
      'Chiaroscuro tekniği',
      'Işık-gölge oyunu',
      '70x90 cm boyutlarında',
      'Dramatik kontrast',
      'Klasik çerçeve'
    ],
    specifications: {
      'Boyutlar': '70x90 cm',
      'Teknik': 'Yağlı Boya',
      'Tuval': 'Keten Tuval',
      'Çerçeve': 'Klasik Ahşap Çerçeve',
      'Ağırlık': '3.3 kg'
    },
    createdAt: '2024-01-20'
  },
  {
    id: 32,
    name: 'Gece Şehri',
    price: 950,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 33,
    category: 'Modern Sanat',
    isNew: false,
    discount: null,
    stock: 7,
    status: 'active',
    description: 'Şehrin gece ışıklarının büyüsü. Modern yaşamın dinamizmi ve enerjisi bu kompozisyonda hayat buluyor.',
    features: [
      'Akrilik boya tekniği',
      'Modern çerçeve dahil',
      '60x80 cm boyutlarında',
      'Şehir manzarası',
      'Gece kompozisyonu'
    ],
    specifications: {
      'Boyutlar': '60x80 cm',
      'Teknik': 'Akrilik Boya',
      'Tuval': 'Sentetik Tuval',
      'Çerçeve': 'Metal Çerçeve',
      'Ağırlık': '2.3 kg'
    },
    createdAt: '2023-12-25'
  }
]

export const categories = [
  'Deniz Koleksiyonu',
  'Doğa Koleksiyonu',
  'Modern Sanat',
  'Dağ Manzaraları'
]

export const getProducts = () => products
export const getProductById = (id: number) => products.find(product => product.id === id)
export const getProductsByCategory = (category: string) => products.filter(product => product.category === category)
export const getFeaturedProducts = () => products.filter(product => product.isNew || product.rating >= 4.7)
export const getRelatedProducts = (productId: number, limit: number = 4) => {
  const product = getProductById(productId)
  if (!product) return []
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit)
}

