/**
 * SHAHID CLOTHES - OFFICIAL WEB APPLICATION ENGINE
 * Exclusive Fashion Boutique - Wear Your Story
 * Features:
 * - Real Nishat catalog with authentic studio gray backdrop & CDN images
 * - Dedicated Pages for:
 *   - Women (Unstitched & Pret): https://nishatlinen.com/collections/women
 *   - Luxury: https://nishatlinen.com/collections/luxury
 *   - Men: https://nishatlinen.com/collections/men
 *   - Accessories: https://nishatlinen.com/collections/accessories
 *   - New In: https://nishatlinen.com/collections/new-in-all
 *   - Boutique: https://nishatlinen.com/pages/nishat-boutique
 *   - Sale: https://nishatlinen.com/collections/sale26
 * - Model faces ALWAYS properly shown without cutting head or neck
 * - Functionable square white "+" button on bottom-right of every product card
 * - Dedicated 2-Column Product Detail Page (PDP) matching Screenshot 5
 * - Slide-out Bag Drawer, Instant Cash on Delivery (COD) Checkout with Pakistani cities
 * - WhatsApp direct ordering & Instant Predictive Search
 */

// ==================== 1. REAL NISHAT PRODUCTS DATABASE ====================
const NISHAT_PRODUCTS = [
  // --- FLAGSHIP 1: EXACT PRODUCT FROM SCREENSHOT 5 ---
  {
    id: '42602216',
    sku: '001866622108',
    title: '2 PIECE - PRINTED SUIT - 42602216',
    collection: 'Unstitched Lawn',
    category: 'unstitched',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42602216-_8.jpg',
    secondaryImage: 'assets/images/prod_42602216-_11.jpg',
    price: 2463.50,
    originalPrice: 3790.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Breezy and vibrant 2-piece digital printed lawn suit from Shahid Clothes Summer Lawn collection. Features all-over botanical print on premium breathable cambric lawn with matching tulip pants and waist tie cord.',
    fabricSpecs: {
      shirt: '3.00m Digital Printed Super Fine Lawn',
      trouser: '2.50m Matching Printed Cambric Trouser',
      embroidery: 'Printed Tonal Motifs with Band Collar Finish'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },

  // --- FLAGSHIP 2: EXACT PRODUCT FROM SCREENSHOT 1 ---
  {
    id: 'KFS26-14',
    sku: '001869925486',
    title: '2 Piece - Embroidered Suit - KFS26-14',
    collection: 'Shahid Boutique',
    category: 'boutique',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Raw Silk',
    primaryImage: 'assets/images/prod_KFS26-14-_3.jpg',
    secondaryImage: 'assets/images/prod_KFS26-14-_10.jpg',
    price: 9093.50,
    originalPrice: 13990.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Iconic deep raspberry / plum raw silk 2-piece formal suit featuring intricate self-thread pin-tucks on bodice, scalloped lace hemline, and embroidered sleeve cuffs paired with matching cigarette trousers.',
    fabricSpecs: {
      shirt: '3.00m Embroidered Raw Silk Shirt with Lace Trim',
      trouser: '2.50m Dyed Raw Silk Trouser with Hem Detailing',
      embroidery: 'Organza Cutwork Scallop Lace Hem & Cuffs'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },

  // --- FLAGSHIP 3: EXACT PRODUCT FROM SCREENSHOT 2 ---
  {
    id: 'KBS26-03',
    sku: '001874636482',
    title: 'ANCHAL - FESTIVE LUXURY SUIT - KBS26-03',
    collection: 'Shahid Boutique',
    category: 'boutique',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Organza & Silk',
    primaryImage: 'assets/images/prod_KBS26-03_3.jpg',
    secondaryImage: 'assets/images/prod_KBS26-03_9.jpg',
    price: 23583.00,
    originalPrice: 33690.00,
    discount: 'SAVE 30%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Anchal Festive Boutique collection featuring an opulent chartreuse green anarkali gown crafted with extensive gold zari needlework, paired with a hand-painted floral organza dupatta and churidar.',
    fabricSpecs: {
      shirt: '3.75m Heavy Embroidered Net/Organza Kalidar Gown',
      dupatta: '2.75m Hand-painted Chunri Printed Organza Dupatta with Zari Borders',
      trouser: '2.50m Dyed Raw Silk Churidar Trouser',
      embroidery: 'Antique Marori, Zardozi & Tilla Hand Embellishments'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },

  // --- MEN'S NAQSH COLLECTION (https://nishatlinen.com/collections/men) ---
  {
    id: '42508113',
    sku: '001842508113',
    title: '2 Piece - Naqsh Suit - 42508113',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Pure Cotton',
    primaryImage: 'assets/images/prod_42508113-_7.jpg',
    secondaryImage: 'assets/images/prod_42508113-_7.jpg',
    price: 4245.00,
    originalPrice: 6530.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Premium tailored Men\'s 2-piece Naqsh kurta and shalwar suit. Made from 100% fine spun cotton with a crisp textured weave and formal band collar.',
    fabricSpecs: {
      shirt: 'Stitched Pure Combed Cotton Kurta',
      trouser: 'Stitched Matching Cotton Shalwar',
      embroidery: 'Minimalist Contrast Threadwork on Placket & Cuffs'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '42508103',
    sku: '001842508103',
    title: '2 Piece - Naqsh Suit - 42508103',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Fine Cotton',
    primaryImage: 'assets/images/prod_42508103-_4.jpg',
    secondaryImage: 'assets/images/prod_42508103-_4.jpg',
    price: 4245.00,
    originalPrice: 6530.00,
    discount: 'SAVE 35%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Refined Men\'s olive/stone Naqsh stitched suit with comfortable breathable drape. Suitable for Friday prayers, weddings, and formal office attire.',
    fabricSpecs: {
      shirt: 'Tailored Straight Fit Cotton Kurta',
      trouser: 'Dyed Matching Shalwar with Drawstring'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '42508130',
    sku: '001842508130',
    title: '2 Piece - Naqsh Suit With Box - 42508130',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Luxury Cotton',
    primaryImage: 'assets/images/prod_42508130-_3.jpg',
    secondaryImage: 'assets/images/prod_42508130-_3.jpg',
    price: 6245.00,
    originalPrice: 8920.00,
    discount: 'SAVE 30%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Deluxe Men\'s gift-boxed Naqsh 2-piece cotton ensemble with premium mother-of-pearl buttons and tailored cuff detailing.',
    fabricSpecs: {
      shirt: 'Executive Stitched Cotton Kurta',
      trouser: 'Tailored Matching Cotton Pajama / Shalwar'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '42508094',
    sku: '001842508094',
    title: '2 Piece - Naqsh Suit - 42508094',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Wash & Wear',
    primaryImage: 'assets/images/prod_42508094-_4.jpg',
    secondaryImage: 'assets/images/prod_42508094-_4.jpg',
    price: 3594.00,
    originalPrice: 5990.00,
    discount: 'SAVE 40%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Wrinkle-resistant wash & wear men\'s 2-piece suit in classic slate gray. Easy care, soft touch, and long-lasting fabric.',
    fabricSpecs: {
      shirt: 'Tailored Wash & Wear Kurta',
      trouser: 'Matching Trousers'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '42508092',
    sku: '001842508092',
    title: '2 Piece - Naqsh Suit - 42508092',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Blended Cotton',
    primaryImage: 'assets/images/prod_42508092-_5_ea304681-1564-49c3-a053-81f47afaaded.jpg',
    secondaryImage: 'assets/images/prod_42508092-_5_ea304681-1564-49c3-a053-81f47afaaded.jpg',
    price: 3594.00,
    originalPrice: 5990.00,
    discount: 'SAVE 40%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Classic midnight blue men\'s stitched kurta shalwar with delicate contrast stitch details.',
    fabricSpecs: {
      shirt: 'Stitched Band Collar Kurta',
      trouser: 'Comfort Fit Shalwar'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '42508193',
    sku: '001842508193',
    title: '2 Piece - Naqsh Suit With Box - 42508193',
    collection: 'Men Naqsh',
    category: 'men',
    department: 'men',
    pieces: '2-Piece',
    fabric: 'Luxury Cotton',
    primaryImage: 'assets/images/prod_42508193-_10_a60dd9c8-0ffd-4007-9273-b8d0b9a7846e.jpg',
    secondaryImage: 'assets/images/prod_42508193-_10_a60dd9c8-0ffd-4007-9273-b8d0b9a7846e.jpg',
    price: 5694.00,
    originalPrice: 8760.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: false,
    isSale: true,
    description: 'Luxury festive boxed suit for Men. Charcoal blended fine fabric with formal tailoring.',
    fabricSpecs: {
      shirt: 'Tailored Kurta with Metal Buttons',
      trouser: 'Matching Shalwar'
    },
    sizes: ['S', 'M', 'L', 'XL']
  },

  // --- ACCESSORIES & FOOTWEAR (https://nishatlinen.com/collections/accessories) ---
  {
    id: '447822122',
    sku: '000447822122',
    title: 'Maroon Women Scarf - 447822122',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'Silk Twill',
    primaryImage: 'assets/images/prod_000447822122-_7.jpg',
    secondaryImage: 'assets/images/prod_000447822122-_7.jpg',
    price: 1943.50,
    originalPrice: 2990.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Luxurious silk twill printed scarf in deep maroon floral paisley. Finished with soft rolled edges.',
    fabricSpecs: {
      shawl: 'Pure Silk Twill Stole (1.80m x 0.70m)'
    },
    sizes: ['Standard Size']
  },
  {
    id: '445672101',
    sku: '000445672101',
    title: 'Wine Red Hand Bag - 445672101',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'PU Leather',
    primaryImage: 'assets/images/prod_000445672101-_2.jpg',
    secondaryImage: 'assets/images/prod_000445672101-_2.jpg',
    price: 6435.00,
    originalPrice: 9900.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Structured vegan leather handbag in royal wine red with gold turn-lock hardware and detachable shoulder strap.',
    fabricSpecs: {
      bag: 'Vegan Leather with Microfiber Lining'
    },
    sizes: ['One Size']
  },
  {
    id: '447512103',
    sku: '000447512103',
    title: 'Black Women Scarf - 447512103',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'Chiffon',
    primaryImage: 'assets/images/prod_000447512103-_6.jpg',
    secondaryImage: 'assets/images/prod_000447512103-_6.jpg',
    price: 1943.50,
    originalPrice: 2990.00,
    discount: 'SAVE 35%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Breathable chiffon black printed scarf with delicate subtle motifs.',
    fabricSpecs: {
      shawl: 'Pure Chiffon Stole (2.00m x 0.75m)'
    },
    sizes: ['Standard Size']
  },
  {
    id: '445332903',
    sku: '000445332903',
    title: 'Black Heels - 445332903',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'Suede & Leather',
    primaryImage: 'assets/images/prod_000445332903_5.jpg',
    secondaryImage: 'assets/images/prod_000445332903_5.jpg',
    price: 4868.50,
    originalPrice: 7490.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Elegant formal black pointed toe stiletto heels with cushioned insole and crystal embellished buckle.',
    fabricSpecs: {
      shoes: 'Faux Suede Upper, Cushioned Footbed, 3-Inch Heel'
    },
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: '447842107',
    sku: '000447842107',
    title: 'Off White Women Scarf - 447842107',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'Voile',
    primaryImage: 'assets/images/prod_000447842107-_6.jpg',
    secondaryImage: 'assets/images/prod_000447842107-_6.jpg',
    price: 1943.50,
    originalPrice: 2990.00,
    discount: 'SAVE 35%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Lightweight off-white everyday scarf with floral digital border prints.',
    fabricSpecs: {
      shawl: 'Fine Voile Stole (1.90m x 0.70m)'
    },
    sizes: ['Standard Size']
  },
  {
    id: '445202912',
    sku: '000445202912',
    title: 'White Chappal - 445202912',
    collection: 'Accessories',
    category: 'accessories',
    department: 'accessories',
    pieces: '1-Piece',
    fabric: 'Leather',
    primaryImage: 'assets/images/prod_000445202912_5.jpg',
    secondaryImage: 'assets/images/prod_000445202912_5.jpg',
    price: 4218.50,
    originalPrice: 6490.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: false,
    isSale: true,
    description: 'Traditional handcrafted Kolhapuri style white slide chappal with golden tilla thread embroidery.',
    fabricSpecs: {
      shoes: 'Genuine Soft Leather Insole with Tilla Embroidery'
    },
    sizes: ['36', '37', '38', '39', '40', '41']
  },

  // --- LUXURY FESTIVE (https://nishatlinen.com/collections/luxury) ---
  {
    id: 'KFE26-210',
    sku: '001877573360',
    title: '3 Piece - Printed Embroidered Suit - KFE26-210',
    collection: 'Shahid Boutique',
    category: 'luxury',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Raw Silk',
    primaryImage: 'assets/images/prod_KFE26-210-_6.jpg',
    secondaryImage: 'assets/images/prod_KFE26-210-_1.jpg',
    price: 14300.00,
    originalPrice: 22000.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Exquisite 3-piece luxury raw silk festive suit from Shahid Boutique. Detailed with gold tilla zardozi embroidery on neckline and daman, paired with an embroidered organza dupatta and raw silk trousers.',
    fabricSpecs: {
      shirt: '3.00m Pure Embroidered Raw Silk',
      dupatta: '2.50m Embroidered Organza Dupatta with Scalloped Borders',
      trouser: '2.50m Dyed Raw Silk Trouser',
      embroidery: 'Handworked Gold Tilla & Resham Neckline'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'KFE26-223',
    sku: '001878030101',
    title: '3 Piece - Embroidered Suit - KFE26-223',
    collection: 'Shahid Boutique',
    category: 'luxury',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Chiffon',
    primaryImage: 'assets/images/prod_KFE26-223-_3.jpg',
    secondaryImage: 'assets/images/prod_KFE26-223-_1.jpg',
    price: 15275.00,
    originalPrice: 23500.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Opulent festive formal 3-piece chiffon ensemble. Intricate sequin and tilla embroidery along front and sleeves with heavy organza embroidered border dupatta.',
    fabricSpecs: {
      shirt: '3.00m Pure Embroidered Chiffon',
      dupatta: '2.50m Heavy Scalloped Embroidered Organza Dupatta',
      trouser: '2.50m Dyed Raw Silk Trouser',
      embroidery: 'Sequin & Antique Zari Needlework'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'KFS26-68',
    sku: '001878514687',
    title: '3 Piece - Embroidered Suit - KFS26-68',
    collection: 'Shahid Boutique',
    category: 'luxury',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Raw Silk',
    primaryImage: 'assets/images/prod_KFS26-68-_5.jpg',
    secondaryImage: 'assets/images/prod_KFS26-68-_7.jpg',
    price: 13643.00,
    originalPrice: 20990.00,
    discount: 'SAVE 35%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'A regal emerald formal ensemble featuring delicate tilla embroidery across front panel with a luminous zari organza dupatta and silk trousers.',
    fabricSpecs: {
      shirt: '3.00m Raw Silk Embroidered',
      dupatta: '2.50m Zari Organza Dupatta',
      trouser: '2.50m Dyed Raw Silk Trouser'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L']
  },
  {
    id: 'KFE26-233',
    sku: '001877097964',
    title: '3 Piece - Embroidered Suit - KFE26-233',
    collection: 'Shahid Boutique',
    category: 'luxury',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Raw Silk',
    primaryImage: 'assets/images/prod_KFE26-233-_6.jpg',
    secondaryImage: 'assets/images/prod_KFE26-233-_1.jpg',
    price: 12950.00,
    originalPrice: 25900.00,
    discount: 'SAVE 50%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Timeless midnight couture raw silk suit featuring intricate Kashmiri needlework and embellished motifs. Complete 3-piece festive attire.',
    fabricSpecs: {
      shirt: '3.00m Fine Raw Silk Fabric',
      dupatta: '2.50m Soft Embroidered Net Dupatta',
      trouser: '2.50m Solid Dyed Raw Silk Trouser'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'KFS26-23',
    sku: '001878030711',
    title: '2 Piece - Embroidered Suit - KFS26-23',
    collection: 'Luxury Festive',
    category: 'luxury',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Silk',
    primaryImage: 'assets/images/prod_KFS26-23-_4.jpg',
    secondaryImage: 'assets/images/prod_KFS26-23-_4.jpg',
    price: 5453.50,
    originalPrice: 8390.00,
    discount: 'SAVE 35%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Subtle festive 2-piece embroidered silk shirt with tailored pants.',
    fabricSpecs: {
      shirt: '2.50m Embroidered Silk Fabric',
      trouser: 'Matching Dyed Pants'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L']
  },

  // --- NEW IN COLLECTION (https://nishatlinen.com/collections/new-in-all) ---
  {
    id: 'PW25-257',
    sku: '001878722204',
    title: '2 Piece - Embroidered Suit - PW25-257',
    collection: 'New In Summer',
    category: 'new-in',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Lawn & Silk',
    primaryImage: 'assets/images/prod_PW25-257-_3_491fa1a6-62ce-47c1-8194-18edb27cf41f.jpg',
    secondaryImage: 'assets/images/prod_PW25-257-_3_491fa1a6-62ce-47c1-8194-18edb27cf41f.jpg',
    price: 14990.00,
    originalPrice: 17990.00,
    discount: 'NEW',
    isNew: true,
    isHot: true,
    isSale: false,
    description: 'New Arrival 2026 embroidered coordinated suit with contemporary neckline cuts and luxury fabric blend.',
    fabricSpecs: {
      shirt: 'Stitched Luxury Embroidered Tunic',
      trouser: 'Stitched Cigarette Pants'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PW25-97',
    sku: '001878722055',
    title: '2 Piece - Solid Suit - PW25-97',
    collection: 'New In Summer',
    category: 'new-in',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Fine Lawn',
    primaryImage: 'assets/images/prod_PW25-97-_3_d4e8f315-cd88-4e1b-928c-3e56d79ae29a.jpg',
    secondaryImage: 'assets/images/prod_PW25-97-_3_d4e8f315-cd88-4e1b-928c-3e56d79ae29a.jpg',
    price: 9990.00,
    originalPrice: 11990.00,
    discount: 'NEW',
    isNew: true,
    isHot: true,
    isSale: false,
    description: 'Minimal solid everyday coordinates in refreshing summer sorbet tones.',
    fabricSpecs: {
      shirt: 'Pure Stitched Cambric Shirt',
      trouser: 'Dyed Cambric Pants'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PW25-363',
    sku: '001878722047',
    title: '2 Piece - Printed Suit - PW25-363',
    collection: 'New In Summer',
    category: 'new-in',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_PW25-363-_3_6ce47534-6789-4822-ad30-40d3e8c315b7.jpg',
    secondaryImage: 'assets/images/prod_PW25-363-_3_6ce47534-6789-4822-ad30-40d3e8c315b7.jpg',
    price: 5490.00,
    originalPrice: 6490.00,
    discount: 'NEW',
    isNew: true,
    isHot: false,
    isSale: false,
    description: 'Summer lawn 2-piece printed tunic and matching culottes.',
    fabricSpecs: {
      shirt: 'Digital Printed Cambric Shirt',
      trouser: 'Printed Culottes'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PW25-99',
    sku: '001878722035',
    title: '2 Piece - Embroidered Suit - PW25-99',
    collection: 'New In Summer',
    category: 'new-in',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Jacquard',
    primaryImage: 'assets/images/prod_PW25-99-_9_0c2fa769-66b2-427f-b346-92ccd4789c2f.jpg',
    secondaryImage: 'assets/images/prod_PW25-99-_9_0c2fa769-66b2-427f-b346-92ccd4789c2f.jpg',
    price: 9990.00,
    originalPrice: 11990.00,
    discount: 'NEW',
    isNew: true,
    isHot: false,
    isSale: false,
    description: 'Cotton jacquard tailored suit with subtle zari interwoven patterns.',
    fabricSpecs: {
      shirt: 'Stitched Cotton Jacquard Shirt',
      trouser: 'Matching Pants'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  // --- WOMEN UNSTITCHED LAWN SUITS (https://nishatlinen.com/collections/women) ---
  {
    id: '42602245',
    sku: '001878590411',
    title: '3 Piece - Printed Embroidered Suit - 42602245',
    collection: 'Unstitched Lawn',
    category: 'unstitched',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42602245-_5.jpg',
    secondaryImage: 'assets/images/prod_42602245-_1.jpg',
    price: 6493.00,
    originalPrice: 9990.00,
    discount: 'SAVE 35%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Pure Shahid Clothes summer lawn printed and embroidered shirt. Accompanied by printed chiffon dupatta and dyed cambric trouser.',
    fabricSpecs: {
      shirt: '3.00m Digital Printed Lawn with Embroidered Neckline',
      dupatta: '2.50m Printed Chiffon Dupatta',
      trouser: '2.50m Dyed Breathable Cambric'
    },
    sizes: ['Unstitched']
  },
  {
    id: '42601795',
    sku: '001877581957',
    title: '3 Piece - Digital Printed Embroidered Suit - 42601795',
    collection: 'Unstitched Lawn',
    category: 'unstitched',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42601795-_6.jpg',
    secondaryImage: 'assets/images/prod_42601795-_9.jpg',
    price: 3995.00,
    originalPrice: 7990.00,
    discount: 'SAVE 50%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Refreshing floral motifs on fine lawn fabric with embroidered neckline patti and digital printed voile dupatta.',
    fabricSpecs: {
      shirt: '3.00m Digital Printed Lawn',
      dupatta: '2.50m Printed Voile Dupatta',
      trouser: '2.50m Dyed Cambric Trouser'
    },
    sizes: ['Unstitched']
  },
  {
    id: '42601859',
    sku: '001877607146',
    title: '3 Piece - Printed Embroidered Suit - 42601859',
    collection: 'Unstitched Lawn',
    category: 'unstitched',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42601859-_3.jpg',
    secondaryImage: 'assets/images/prod_42601859-_1.jpg',
    price: 3245.00,
    originalPrice: 6490.00,
    discount: 'SAVE 50%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Traditional ethnic print with contemporary palette on unstitched 3-piece lawn. Breathable, durable, and comfortable.',
    fabricSpecs: {
      shirt: '3.00m Printed Lawn Shirt',
      dupatta: '2.50m Printed Dupatta',
      trouser: '2.50m Dyed Trouser'
    },
    sizes: ['Unstitched']
  },
  {
    id: '42601760',
    sku: '001877581617',
    title: '3 Piece - Digital Printed Suit - 42601760',
    collection: 'Unstitched Lawn',
    category: 'unstitched',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42601760-_7.jpg',
    secondaryImage: 'assets/images/prod_42601760-_11.jpg',
    price: 2995.00,
    originalPrice: 5990.00,
    discount: 'SAVE 50%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Vibrant geometric digital prints on pure Shahid Clothes lawn with lightweight matching voile dupatta and plain dyed trouser.',
    fabricSpecs: {
      shirt: '3.00m Digital Printed Lawn',
      dupatta: '2.50m Printed Voile Dupatta',
      trouser: '2.50m Dyed Trouser'
    },
    sizes: ['Unstitched']
  },
  {
    id: '42601658',
    sku: '001877580341',
    title: '2 Piece - Printed Embroidered Suit - 42601658',
    collection: 'Unstitched 2-Piece',
    category: 'unstitched',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_42601658-_3.jpg',
    secondaryImage: 'assets/images/prod_42601658-_5.jpg',
    price: 2645.00,
    originalPrice: 5290.00,
    discount: 'SAVE 50%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: '2-Piece unstitched printed lawn suit (Shirt & Dupatta) with delicate neckline embroidery.',
    fabricSpecs: {
      shirt: '3.00m Printed Lawn with Embroidered Neckline',
      dupatta: '2.50m Printed Voile Dupatta'
    },
    sizes: ['Unstitched']
  },

  // --- READY TO WEAR PRET (https://nishatlinen.com/collections/women) ---
  {
    id: 'PE25-470',
    sku: '001875748505',
    title: '3 Piece - Embroidered Suit - PE25-470',
    collection: 'Ready to Wear',
    category: 'pret',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Blended Silk',
    primaryImage: 'assets/images/prod_PE25-470-_5_cd0d7dc6-3f5f-4978-8fd1-884ef7ae6aad.jpg',
    secondaryImage: 'assets/images/prod_PE25-470-_5_cd0d7dc6-3f5f-4978-8fd1-884ef7ae6aad.jpg',
    price: 4796.00,
    originalPrice: 5995.00,
    discount: 'SAVE 20%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Pre-stitched 3-piece embroidered suit from Pret Collection. Tailored kurta with delicate neckline embroidery, matching dupatta, and straight pants.',
    fabricSpecs: {
      shirt: 'Stitched Embroidered Kurta with Finished Slits',
      dupatta: 'Stitched Printed Dupatta with Piko',
      trouser: 'Stitched Straight Cigarette Pants'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PE25-111',
    sku: '001875748504',
    title: '2 Piece - Basic Suit - PE25-111',
    collection: 'Ready to Wear',
    category: 'pret',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Cotton Jacquard',
    primaryImage: 'assets/images/prod_PE25-111-_6.jpg',
    secondaryImage: 'assets/images/prod_PE25-111-_6.jpg',
    price: 5596.00,
    originalPrice: 6995.00,
    discount: 'SAVE 20%',
    isNew: true,
    isHot: false,
    isSale: true,
    description: 'Minimalist 2-piece ready-to-wear solid suit. Premium tailored kurta with matching solid trousers, perfect for office and daily elegance.',
    fabricSpecs: {
      shirt: 'Tailored Straight Fit Kurta',
      trouser: 'Tailored Straight Cut Trousers'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PE25-246',
    sku: '001875748503',
    title: 'Embroidered Shirt - PE25-246',
    collection: 'Ready to Wear',
    category: 'pret',
    department: 'women',
    pieces: '1-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_PE25-246-_1_d5094e71-6453-42bf-a8d8-470279bcdf9c.jpg',
    secondaryImage: 'assets/images/prod_PE25-246-_1_d5094e71-6453-42bf-a8d8-470279bcdf9c.jpg',
    price: 2796.00,
    originalPrice: 3495.00,
    discount: 'SAVE 20%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Single-piece stitched embroidered kurta. Floral embroidered motifs around round collar and cuffs.',
    fabricSpecs: {
      shirt: 'Stitched 1-Piece Embroidered Kurta'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'PE25-378',
    sku: '001875748502',
    title: '3 Piece - Printed Embroidered Suit - PE25-378',
    collection: 'Ready to Wear',
    category: 'pret',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Lawn',
    primaryImage: 'assets/images/prod_PE25-378-_7.jpg',
    secondaryImage: 'assets/images/prod_PE25-378-_7.jpg',
    price: 5196.00,
    originalPrice: 6495.00,
    discount: 'SAVE 20%',
    isNew: false,
    isHot: false,
    isSale: true,
    description: 'Chic stitched 3-piece printed embroidered lawn suit with matching dupatta and trousers.',
    fabricSpecs: {
      shirt: 'Stitched Printed & Embroidered Kurta',
      dupatta: 'Stitched Chiffon Dupatta',
      trouser: 'Stitched Straight Pants'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },

  // --- CELEBRITY ICONIC CAMPAIGNS ---
  {
    id: 'NL-HANIA-01',
    sku: '001899120001',
    title: '3 PC EMBROIDERED RAW SILK FESTIVE SUIT',
    collection: 'Shahid Boutique',
    category: 'boutique',
    department: 'women',
    pieces: '3-Piece',
    fabric: 'Raw Silk',
    primaryImage: 'assets/images/nishat_hania_festive.jpg',
    secondaryImage: 'assets/images/cat_luxury.jpg',
    price: 14990.00,
    originalPrice: 19990.00,
    discount: 'SAVE 25%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Featuring Hania Aamir in Shahid Boutique\'s signature deep plum raw silk 3-piece formal suit with antique gold tilla zari work and scalloped organza dupatta.',
    fabricSpecs: {
      shirt: '3.00m Pure Embroidered Raw Silk',
      dupatta: '2.50m Embroidered Organza with Scalloped Border',
      trouser: '2.50m Dyed Raw Silk Fabric'
    },
    sizes: ['Unstitched', 'XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'NL-SAJAL-02',
    sku: '001899120002',
    title: '2 PC PRINTED SILK PRET SUIT',
    collection: 'Ready to Wear',
    category: 'pret',
    department: 'women',
    pieces: '2-Piece',
    fabric: 'Pure Silk',
    primaryImage: 'assets/images/nishat_sajal_pret.jpg',
    secondaryImage: 'assets/images/cat_pret.jpg',
    price: 7990.00,
    originalPrice: 11990.00,
    discount: 'SAVE 33%',
    isNew: true,
    isHot: true,
    isSale: true,
    description: 'Featuring Sajal Aly in Shahid Clothes Pret\'s contemporary abstract print raw silk coordinated 2-piece set. Styled with round collar and pleated cuffs.',
    fabricSpecs: {
      shirt: 'Stitched Pure Silk Printed Tunic',
      trouser: 'Stitched Straight Cut Silk Trousers'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'NL-SHAWL-01',
    sku: '001899120003',
    title: 'ROYAL VELVET EMBROIDERED SHAWL',
    collection: 'Winter Shawls',
    category: 'shawls',
    department: 'women',
    pieces: '1-Piece',
    fabric: 'Micro Velvet',
    primaryImage: 'assets/images/cat_shawls.jpg',
    secondaryImage: 'assets/images/hero_festive.jpg',
    price: 18900.00,
    originalPrice: 24900.00,
    discount: 'SAVE 24%',
    isNew: false,
    isHot: true,
    isSale: true,
    description: 'Featuring Kinza Hashmi in Shahid Clothes heritage winter shawl. Midnight blue micro velvet with elaborate 4-sided antique gold tilla embroidery and fringe tassels.',
    fabricSpecs: {
      shawl: '2.75m Heavy Micro Silk Velvet',
      borders: '4-Sided Four-Inch Embroidered Zari Borders'
    },
    sizes: ['Standard Size (2.75 Meters)']
  }
];

// ==================== 2. APPLICATION STATE ====================
let appState = {
  currentView: 'home', // 'home' | 'catalog' | 'pdp'
  currentCategory: 'all',
  currentFabric: 'all',
  currentPiece: 'all',
  currentSort: 'featured',
  searchQuery: '',
  cart: [],
  wishlist: [],
  activePromo: null,
  freeShippingThreshold: 2500,
  standardShippingFee: 200,
  currentSlideIndex: 0,
  slideTimer: null,
  currency: 'PKR',
  currencyRate: 1.0,
  currencySymbol: 'Rs. ',
  activePdpProduct: null,
  selectedPdpSize: null,
  pdpQuantity: 1,
  lastOrder: null
};

// Available Promo Codes
const PROMO_CODES = {
  'SHAHID10': { type: 'percent', value: 0.10, label: '10% OFF Shahid Special' },
  'NISHAT10': { type: 'percent', value: 0.10, label: '10% OFF Shahid Special' },
  'WELCOME500': { type: 'flat', value: 500, label: 'Rs. 500 Welcome Voucher' }
};

// ==================== 3. INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  loadStoredState();
  initHeroCarousel();
  initTicker();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
});

function loadStoredState() {
  try {
    const c = localStorage.getItem('nishat_cart');
    if (c) appState.cart = JSON.parse(c);
    const w = localStorage.getItem('nishat_wishlist');
    if (w) appState.wishlist = JSON.parse(w);
  } catch (e) {
    console.error(e);
  }
}

function saveState() {
  try {
    localStorage.setItem('nishat_cart', JSON.stringify(appState.cart));
    localStorage.setItem('nishat_wishlist', JSON.stringify(appState.wishlist));
  } catch (e) {
    console.error(e);
  }
}

// ==================== 4. MULTI-PAGE & CATEGORY ROUTING ====================
/**
 * Opens any dedicated category view (Women, Luxury, Men, Accessories, New In, Boutique, Sale)
 */
function openCategoryPage(category, title, event) {
  if (event) event.preventDefault();

  closeMobileNav();

  // Close PDP, Search & Checkout Page if open
  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');
  if (homeView) homeView.style.display = 'block';
  if (pdpView) pdpView.style.display = 'none';
  if (searchView) searchView.style.display = 'none';
  if (chkView) chkView.style.display = 'none';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';
  if (bottomNav) bottomNav.style.display = '';
  if (floatingWa) floatingWa.style.display = '';

  appState.currentView = 'catalog';
  appState.currentCategory = category;
  appState.currentPiece = 'all';
  appState.currentFabric = 'all';
  appState.searchQuery = '';

  // Update Page Heading
  const heading = document.getElementById('catalogHeading');
  if (heading) {
    heading.textContent = (title || category).toUpperCase();
  }

  // Update Category Pills
  const pills = document.querySelectorAll('.category-pills .pill');
  pills.forEach(p => {
    p.classList.remove('active');
    const txt = p.textContent.toLowerCase();
    if (category === 'all' && txt.includes('all')) p.classList.add('active');
    if (category === 'women' && txt.includes('women')) p.classList.add('active');
    if (category === 'unstitched' && txt.includes('unstitched')) p.classList.add('active');
    if (category === 'pret' && txt.includes('pret')) p.classList.add('active');
    if (category === 'luxury' && txt.includes('luxury')) p.classList.add('active');
    if (category === 'men' && txt.includes('men')) p.classList.add('active');
    if (category === 'accessories' && txt.includes('accessories')) p.classList.add('active');
    if (category === 'new-in' && txt.includes('new')) p.classList.add('active');
    if (category === 'boutique' && txt.includes('boutique')) p.classList.add('active');
    if (category === 'shawls' && txt.includes('shawls')) p.classList.add('active');
    if (category.startsWith('sale') && txt.includes('sale')) p.classList.add('active');
  });

  renderProducts();

  // Smooth scroll to catalog section
  const shopEl = document.getElementById('shop-grid');
  if (shopEl) {
    shopEl.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Back to Homepage View
 */
function showHomePage(event) {
  if (event) event.preventDefault();
  closeMobileNav();
  closeHeaderSearchBar();

  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');
  if (homeView) homeView.style.display = 'block';
  if (pdpView) pdpView.style.display = 'none';
  if (searchView) searchView.style.display = 'none';
  if (chkView) chkView.style.display = 'none';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';
  if (bottomNav) bottomNav.style.display = '';
  if (floatingWa) floatingWa.style.display = '';

  appState.currentView = 'home';
  appState.currentCategory = 'all';
  appState.currentPiece = 'all';
  appState.currentFabric = 'all';
  appState.searchQuery = '';

  const heading = document.getElementById('catalogHeading');
  if (heading) heading.textContent = 'ALL COLLECTIONS';

  const pills = document.querySelectorAll('.category-pills .pill');
  pills.forEach(p => {
    p.classList.remove('active');
    if (p.textContent.toLowerCase().includes('all')) p.classList.add('active');
  });

  renderProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterByPiece(piece, event) {
  if (event) event.preventDefault();
  appState.currentPiece = piece;
  
  const heading = document.getElementById('catalogHeading');
  if (heading) heading.textContent = `${piece.toUpperCase()} SUITS COLLECTION`;

  renderProducts();
  const shopEl = document.getElementById('shop-grid');
  if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
}

function filterByFabric(fabric, event) {
  if (event) event.preventDefault();
  appState.currentFabric = fabric;
  renderProducts();
}

function sortProducts(sortVal) {
  appState.currentSort = sortVal;
  renderProducts();
}

// ==================== 5. PRODUCT CATALOG RENDERING ====================
function getFilteredProducts() {
  let list = [...NISHAT_PRODUCTS];

  // Category Routing Logic (Exact match for Nishat collection links)
  const cat = appState.currentCategory;
  if (cat !== 'all') {
    if (cat === 'women') {
      list = list.filter(p => p.department === 'women' || p.category === 'unstitched' || p.category === 'pret');
    } else if (cat === 'unstitched') {
      list = list.filter(p => p.category === 'unstitched');
    } else if (cat === 'pret') {
      list = list.filter(p => p.category === 'pret');
    } else if (cat === 'luxury') {
      list = list.filter(p => p.category === 'luxury' || p.category === 'boutique');
    } else if (cat === 'men') {
      list = list.filter(p => p.category === 'men' || p.department === 'men');
    } else if (cat === 'accessories') {
      list = list.filter(p => p.category === 'accessories' || p.department === 'accessories');
    } else if (cat === 'new-in') {
      list = list.filter(p => p.isNew || p.category === 'new-in');
    } else if (cat === 'boutique') {
      list = list.filter(p => p.category === 'boutique');
    } else if (cat === 'shawls') {
      list = list.filter(p => p.category === 'shawls' || p.title.toLowerCase().includes('shawl'));
    } else if (cat === 'sale') {
      list = list.filter(p => p.isSale);
    } else if (cat === 'sale-60' || cat === 'sale-50') {
      list = list.filter(p => p.discount && (p.discount.includes('50%') || p.discount.includes('60%')));
    } else if (cat === 'sale-40' || cat === 'sale-35') {
      list = list.filter(p => p.discount && (p.discount.includes('35%') || p.discount.includes('40%')));
    } else if (cat === 'sale-25') {
      list = list.filter(p => p.discount && (p.discount.includes('25%') || p.discount.includes('30%') || p.discount.includes('20%')));
    } else {
      list = list.filter(p => p.category === cat);
    }
  }

  // Fabric Filter
  if (appState.currentFabric !== 'all') {
    list = list.filter(p => p.fabric.toLowerCase().includes(appState.currentFabric.toLowerCase()));
  }

  // Piece Count Filter
  if (appState.currentPiece !== 'all') {
    list = list.filter(p => p.pieces === appState.currentPiece);
  }

  // Search Query
  if (appState.searchQuery.trim() !== '') {
    const q = appState.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.fabric.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (appState.currentSort) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      list.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price));
      break;
    case 'name':
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
    default:
      break;
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const counter = document.getElementById('productCounter');
  if (!grid) return;

  const products = getFilteredProducts();
  if (counter) {
    counter.textContent = `Showing ${products.length} Products`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #8E8E93;">
        <i class="fa-solid fa-shirt" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
        <h3 style="font-size: 1.2rem; color: #1C1C1E; margin-bottom: 0.5rem;">No Products Found</h3>
        <p style="font-size: 0.85rem;">Try clearing your search or category filters.</p>
        <button class="btn btn-primary" style="margin-top: 1.25rem;" onclick="openCategoryPage('all', 'ALL COLLECTIONS', event)">View All Collections</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map((product, idx) => {
    const isWishlisted = appState.wishlist.includes(product.id);
    const formattedPrice = formatMoney(product.price);
    const formattedOriginal = product.originalPrice ? formatMoney(product.originalPrice) : null;
    const loadMode = idx < 4 ? 'eager' : 'lazy';
    const priorityAttr = idx < 2 ? 'fetchpriority="high"' : '';

    return `
      <article class="product-card" data-id="${product.id}">
        <!-- Media Container: Studio light gray background with TOP alignment so model face is NEVER cut off -->
        <div class="product-media" onclick="openProductDetailPage('${product.id}')">
          <img src="${product.primaryImage}" alt="${product.title}" class="product-img-primary" loading="${loadMode}" ${priorityAttr} decoding="async" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
          <img src="${product.secondaryImage || product.primaryImage}" alt="${product.title} Details" class="product-img-secondary" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='assets/images/cat_pret.jpg';">
          
          <!-- Top Left Discount Badge (Exact from Screenshot 1: SAVE 35%) -->
          <div class="badge-stack">
            ${product.discount ? `<span class="product-badge badge-sale">${product.discount}</span>` : ''}
            ${product.isNew ? `<span class="product-badge badge-new">NEW</span>` : ''}
          </div>

          <!-- Wishlist Heart Button -->
          <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}', event)" aria-label="Add to Wishlist" title="Add to Wishlist">
            <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>

          <!-- Exact Square White Button with Plus (+) on Bottom Right (Screenshot 1 & 2) -->
          <button class="card-plus-btn" onclick="handleCardPlusClick('${product.id}', event)" aria-label="Add to Bag" title="Quick Add to Bag">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <!-- Product Information -->
        <div class="product-info">
          <span class="product-category-tag">${product.pieces} • ${product.fabric}</span>
          <h3 class="product-title" onclick="openProductDetailPage('${product.id}')">${product.title}</h3>
          <p class="product-fabric-detail">${product.collection}</p>
          
          <div class="product-pricing">
            <span class="price-current">${formattedPrice}</span>
            ${formattedOriginal ? `<span class="price-original">${formattedOriginal}</span>` : ''}
            ${product.discount ? `<span class="price-discount-percent">${product.discount}</span>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Functionable Plus Button on Product Card:
 * Instant tactile animation, adds item to cart, increments badge with pop, and slides out bag drawer
 */
function handleCardPlusClick(productId, event) {
  if (event) event.stopPropagation();

  // Instant tactile feedback on clicked + button
  const btn = event ? (event.currentTarget || event.target.closest('.card-plus-btn')) : null;
  if (btn) {
    btn.classList.add('added');
    const oldHtml = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = oldHtml;
    }, 650);
  }

  quickAddToCart(productId);
}

// ==================== 6. DEDICATED PRODUCT DETAIL PAGE (EXACT SCREENSHOT 5) ====================
/**
 * Redirects to the dedicated 2-column Product Detail Page matching Screenshot 5
 */
function openProductDetailPage(productId) {
  const product = NISHAT_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  appState.activePdpProduct = product;
  appState.pdpQuantity = 1;
  appState.selectedPdpSize = (product.sizes && product.sizes.length > 0) ? product.sizes[0] : 'Unstitched';

  // Toggle views
  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');
  if (homeView) homeView.style.display = 'none';
  if (pdpView) pdpView.style.display = 'block';
  if (searchView) searchView.style.display = 'none';
  if (chkView) chkView.style.display = 'none';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';
  if (bottomNav) bottomNav.style.display = '';
  if (floatingWa) floatingWa.style.display = '';

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Breadcrumb
  const breadcrumb = document.getElementById('detailBreadcrumbTrail');
  if (breadcrumb) {
    breadcrumb.textContent = `Home / ${product.category.toUpperCase()} / ${product.title}`;
  }

  // Left Column Gallery (Screenshot 5: 2 images with top alignment showing full face)
  const mainImg = document.getElementById('pdpMainImg');
  const secImg = document.getElementById('pdpSecondaryImg');
  if (mainImg) {
    mainImg.src = product.primaryImage;
    mainImg.alt = product.title;
  }
  if (secImg) {
    secImg.src = product.secondaryImage || product.primaryImage;
    secImg.alt = `${product.title} Detail`;
  }

  // Right Column: Title & Prices
  const titleEl = document.getElementById('pdpTitle');
  if (titleEl) titleEl.textContent = product.title;

  const currentPriceEl = document.getElementById('pdpPriceCurrent');
  if (currentPriceEl) currentPriceEl.textContent = formatMoney(product.price);

  const originalPriceEl = document.getElementById('pdpPriceOriginal');
  if (originalPriceEl) {
    if (product.originalPrice && product.originalPrice > product.price) {
      originalPriceEl.style.display = 'inline';
      originalPriceEl.textContent = formatMoney(product.originalPrice);
    } else {
      originalPriceEl.style.display = 'none';
    }
  }

  // Baadmay 3-Installments
  const baadmayEl = document.getElementById('baadmayInstallment');
  if (baadmayEl) {
    const installment = Math.round(product.price / 3);
    baadmayEl.textContent = formatMoney(installment);
  }

  // Red Discount badge (Screenshot 5: "SAVE 35%")
  const badgeEl = document.getElementById('pdpDiscountBadge');
  if (badgeEl) {
    if (product.discount) {
      badgeEl.style.display = 'inline-block';
      badgeEl.textContent = product.discount.toUpperCase();
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // SKU Line (Screenshot 5: "SKU: 001866622108")
  const skuEl = document.getElementById('pdpSkuLine');
  if (skuEl) {
    skuEl.textContent = `SKU: ${product.sku || product.id}`;
  }

  // Size Options
  const sizeContainer = document.getElementById('pdpSizeOptions');
  if (sizeContainer) {
    if (product.sizes && product.sizes.length > 0) {
      sizeContainer.innerHTML = product.sizes.map((sz, idx) => `
        <button class="pdp-size-btn ${idx === 0 ? 'active' : ''}" onclick="selectPdpSize('${sz}', this)">
          ${sz}
        </button>
      `).join('');
    } else {
      sizeContainer.innerHTML = `<button class="pdp-size-btn active">Unstitched</button>`;
    }
  }

  // Quantity Stepper reset
  const qtyEl = document.getElementById('pdpQtyVal');
  if (qtyEl) qtyEl.textContent = '1';

  // Description
  const descEl = document.getElementById('pdpDescription');
  if (descEl) descEl.textContent = product.description || 'Authentic Shahid Clothes fabric with exquisite craftsmanship.';

  // Fabric specs list
  const specsList = document.getElementById('pdpFabricSpecsList');
  if (specsList) {
    let specsHtml = '';
    if (product.fabricSpecs) {
      if (product.fabricSpecs.shirt) specsHtml += `<li><strong>Shirt:</strong> ${product.fabricSpecs.shirt}</li>`;
      if (product.fabricSpecs.dupatta) specsHtml += `<li><strong>Dupatta:</strong> ${product.fabricSpecs.dupatta}</li>`;
      if (product.fabricSpecs.trouser) specsHtml += `<li><strong>Trouser:</strong> ${product.fabricSpecs.trouser}</li>`;
      if (product.fabricSpecs.embroidery) specsHtml += `<li><strong>Work:</strong> ${product.fabricSpecs.embroidery}</li>`;
      if (product.fabricSpecs.shawl) specsHtml += `<li><strong>Shawl:</strong> ${product.fabricSpecs.shawl}</li>`;
      if (product.fabricSpecs.borders) specsHtml += `<li><strong>Borders:</strong> ${product.fabricSpecs.borders}</li>`;
      if (product.fabricSpecs.shoes) specsHtml += `<li><strong>Footwear:</strong> ${product.fabricSpecs.shoes}</li>`;
      if (product.fabricSpecs.bag) specsHtml += `<li><strong>Material:</strong> ${product.fabricSpecs.bag}</li>`;
    }
    if (!specsHtml) {
      specsHtml = `<li><strong>Fabric:</strong> ${product.fabric}</li><li><strong>Pieces:</strong> ${product.pieces}</li><li><strong>Collection:</strong> ${product.collection}</li>`;
    }
    specsList.innerHTML = specsHtml;
  }
}

function selectPdpSize(size, btnEl) {
  appState.selectedPdpSize = size;
  const buttons = document.querySelectorAll('.pdp-size-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

function changePdpQty(delta) {
  let newQty = (appState.pdpQuantity || 1) + delta;
  if (newQty < 1) newQty = 1;
  appState.pdpQuantity = newQty;
  const qtyEl = document.getElementById('pdpQtyVal');
  if (qtyEl) qtyEl.textContent = newQty;
}

function addPdpToCart() {
  if (!appState.activePdpProduct) return;
  addToCart(appState.activePdpProduct.id, appState.selectedPdpSize || 'Unstitched', appState.pdpQuantity || 1);
  showToast(`Added ${appState.pdpQuantity}x "${appState.activePdpProduct.title}" to bag!`);
  openCartDrawer();
}

function buyPdpNow() {
  if (!appState.activePdpProduct) return;
  addToCart(appState.activePdpProduct.id, appState.selectedPdpSize || 'Unstitched', appState.pdpQuantity || 1);
  openCheckoutPage();
}

function orderPdpViaWhatsApp() {
  if (!appState.activePdpProduct) return;
  const p = appState.activePdpProduct;
  const size = appState.selectedPdpSize || 'Unstitched';
  const qty = appState.pdpQuantity || 1;
  const total = p.price * qty;

  let msg = `*Assalam-o-Alaikum Shahid Clothes!*%0A%0A`;
  msg += `I would like to order this suit via *Cash on Delivery*:%0A`;
  msg += `*Suit Name:* ${p.title}%0A`;
  msg += `*SKU:* ${p.sku || p.id}%0A`;
  msg += `*Size:* ${size}%0A`;
  msg += `*Quantity:* ${qty}%0A`;
  msg += `*Total Amount:* Rs. ${total.toLocaleString('en-PK')}%0A%0A`;
  msg += `Please confirm availability and dispatch to my address!`;

  window.open(`https://wa.me/923032431518?text=${msg}`, '_blank');
}

function goBackToPreviousView() {
  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');
  if (homeView) homeView.style.display = 'block';
  if (pdpView) pdpView.style.display = 'none';
  if (searchView) searchView.style.display = 'none';
  if (chkView) chkView.style.display = 'none';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';

  const shopEl = document.getElementById('shop-grid');
  if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
}

// ==================== 7. HERO CAROUSEL LOGIC ====================
function initHeroCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;

  // Preload slide background images for butter-smooth 60fps transitions
  ['assets/images/hero_hania_banner.jpg', 'assets/images/hero_lawn.jpg'].forEach(src => {
    const img = new Image();
    img.src = src;
  });

  appState.slideTimer = setInterval(() => {
    nextSlide();
  }, 6000);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  if (!slides.length) return;

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  appState.currentSlideIndex = (index + slides.length) % slides.length;
  slides[appState.currentSlideIndex].classList.add('active');
  if (dots[appState.currentSlideIndex]) {
    dots[appState.currentSlideIndex].classList.add('active');
  }

  clearInterval(appState.slideTimer);
  appState.slideTimer = setInterval(nextSlide, 6000);
}

function nextSlide() {
  goToSlide(appState.currentSlideIndex + 1);
}

function prevSlide() {
  goToSlide(appState.currentSlideIndex - 1);
}

function initTicker() {
  const items = document.querySelectorAll('.announcement-ticker .ticker-item');
  if (items.length <= 1) return;

  let idx = 0;
  setInterval(() => {
    items[idx].classList.remove('active');
    idx = (idx + 1) % items.length;
    items[idx].classList.add('active');
  }, 4000);
}

// ==================== 8. CART SYSTEM & SLIDE-OUT DRAWER ====================
function openCartDrawer(shouldRender = true) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.add('open');
  if (overlay) overlay.classList.add('open');
  if (shouldRender) renderCart();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function quickAddToCart(productId) {
  const product = NISHAT_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const defaultSize = product.sizes && product.sizes.length ? product.sizes[0] : 'Unstitched';
  addToCart(productId, defaultSize, 1);
  showToast(`Added "${product.title.slice(0, 24)}..." to bag!`);
  openCartDrawer(false); // Ultra smooth: addToCart already called renderCart()
}

function addToCart(productId, size, quantity = 1) {
  const product = NISHAT_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIdx = appState.cart.findIndex(
    item => item.id === productId && item.selectedSize === size
  );

  if (existingIdx > -1) {
    appState.cart[existingIdx].quantity += quantity;
  } else {
    appState.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.primaryImage,
      fabric: product.fabric,
      selectedSize: size,
      quantity: quantity
    });
  }

  saveState();
  updateCartBadge();
  renderCart();
}

function updateCartItemQty(index, change) {
  if (!appState.cart[index]) return;
  appState.cart[index].quantity += change;

  if (appState.cart[index].quantity <= 0) {
    appState.cart.splice(index, 1);
  }

  saveState();
  updateCartBadge();
  renderCart();
}

function removeCartItem(index) {
  appState.cart.splice(index, 1);
  saveState();
  updateCartBadge();
  renderCart();
}

function calculateCartTotals() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (appState.activePromo) {
    if (appState.activePromo.type === 'percent') {
      discount = Math.round(subtotal * appState.activePromo.value);
    } else if (appState.activePromo.type === 'flat') {
      discount = Math.min(subtotal, appState.activePromo.value);
    }
  }

  const isFreeShipping = subtotal >= appState.freeShippingThreshold || subtotal === 0;
  const shipping = isFreeShipping ? 0 : appState.standardShippingFee;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, grandTotal, isFreeShipping };
}

function renderCart() {
  const listEl = document.getElementById('cartItemsList');
  const countEl = document.getElementById('cartDrawerCount');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('cartDiscount');
  const shippingEl = document.getElementById('cartShipping');
  const grandTotalEl = document.getElementById('cartGrandTotal');
  const shippingBarMsg = document.getElementById('shippingMsg');
  const shippingFill = document.getElementById('shippingFill');

  if (!listEl) return;

  const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (countEl) countEl.textContent = totalItems;

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();

  // Free Shipping Threshold Progress
  if (shippingBarMsg && shippingFill) {
    if (subtotal === 0) {
      shippingBarMsg.innerHTML = `Add <strong>${formatMoney(appState.freeShippingThreshold)}</strong> more to unlock <strong>FREE Delivery!</strong>`;
      shippingFill.style.width = '0%';
    } else if (subtotal >= appState.freeShippingThreshold) {
      shippingBarMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Congratulations! You unlocked <strong>FREE Nationwide Delivery!</strong>`;
      shippingFill.style.width = '100%';
    } else {
      const remaining = appState.freeShippingThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / appState.freeShippingThreshold) * 100));
      shippingBarMsg.innerHTML = `Add <strong>${formatMoney(remaining)}</strong> more to unlock <strong>FREE Delivery!</strong>`;
      shippingFill.style.width = `${pct}%`;
    }
  }

  // Items
  if (appState.cart.length === 0) {
    listEl.innerHTML = `
      <div class="empty-cart-view">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4>Your Shopping Bag is Empty</h4>
        <p>Explore Shahid Clothes' latest unstitched & pret collections.</p>
        <button class="btn btn-primary" onclick="closeCartDrawer(); openCategoryPage('all', 'ALL COLLECTIONS', event);">START SHOPPING</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatMoney(0);
    if (discountRow) discountRow.style.display = 'none';
    if (shippingEl) shippingEl.textContent = formatMoney(0);
    if (grandTotalEl) grandTotalEl.textContent = formatMoney(0);
    return;
  }

  listEl.innerHTML = appState.cart.map((item, idx) => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
      <div class="cart-item-details">
        <div class="cart-item-top">
          <h4 class="cart-item-title">${item.title}</h4>
          <button class="remove-item-btn" onclick="removeCartItem(${idx})" title="Remove item">&times;</button>
        </div>
        <div class="cart-item-variant">${item.fabric} • Size: <strong>${item.selectedSize}</strong></div>
        <div class="cart-item-bottom">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartItemQty(${idx}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartItemQty(${idx}, 1)">+</button>
          </div>
          <span class="cart-item-price">${formatMoney(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (discountRow) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `- ${formatMoney(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? 'FREE' : formatMoney(shipping);
  }
  if (grandTotalEl) grandTotalEl.textContent = formatMoney(grandTotal);
}

function updateCartBadge() {
  const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = [
    document.getElementById('cartCount'),
    document.getElementById('mobileCartBadge')
  ];
  badges.forEach(b => {
    if (b) {
      b.textContent = totalItems;
      b.style.display = totalItems > 0 ? 'inline-block' : 'none';
      b.classList.remove('pulse');
      void b.offsetWidth; // Force CSS reflow to replay pulse
      b.classList.add('pulse');
    }
  });
}

function applyPromoCode() {
  const input = document.getElementById('couponInput');
  const status = document.getElementById('promoStatus');
  if (!input || !status) return;

  const code = input.value.trim().toUpperCase();
  if (PROMO_CODES[code]) {
    appState.activePromo = PROMO_CODES[code];
    status.className = 'promo-status success';
    status.textContent = `Applied! ${PROMO_CODES[code].label}`;
    renderCart();
  } else {
    status.className = 'promo-status error';
    status.textContent = 'Invalid promo code. Try SHAHID10 or WELCOME500';
  }
}

// ==================== 9. CASH ON DELIVERY (COD) CHECKOUT ====================
function openCheckoutModal() {
  if (appState.cart.length === 0) {
    showToast('Your cart is empty! Add a suit to proceed.');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkoutOverlay');
  if (!modal) return;

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();
  
  document.getElementById('checkoutSubtotal').textContent = formatMoney(subtotal);
  const discountLine = document.getElementById('checkoutDiscountLine');
  if (discount > 0) {
    discountLine.style.display = 'flex';
    document.getElementById('checkoutDiscount').textContent = `- ${formatMoney(discount)}`;
  } else {
    discountLine.style.display = 'none';
  }

  document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : formatMoney(shipping);
  document.getElementById('checkoutGrandTotal').textContent = formatMoney(grandTotal);

  modal.classList.add('open');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutOverlay');
  if (modal) modal.classList.remove('open');
}

function handlePlaceOrder(event) {
  event.preventDefault();

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const city = document.getElementById('custCity').value;
  const area = document.getElementById('custArea').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const whatsapp = document.getElementById('custWhatsApp').value.trim() || phone;
  const note = document.getElementById('custNote').value.trim();

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();
  const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `#SC-${randomOrderNum}`;
  const fullAddress = area ? `${address}, ${area}` : address;

  const orderPayload = {
    id: orderId,
    name: name,
    contact: whatsapp || phone,
    phone: phone,
    whatsapp: whatsapp || phone,
    address: fullAddress,
    city: city,
    paymentMethod: 'COD',
    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    total: grandTotal,
    note: note,
    items: appState.cart.map(it => ({
      id: it.id,
      title: it.title,
      price: it.price,
      quantity: it.quantity,
      selectedSize: it.selectedSize || 'Unstitched',
      image: it.primaryImage || it.image || ''
    }))
  };

  // Immediately dispatch to backend MySQL API so it appears in Admin Dashboard
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  }).then(res => res.json())
    .then(data => console.log('✅ Order placed & synced to MySQL Admin Dashboard:', data))
    .catch(err => console.warn('Could not post to /api/orders directly:', err));

  appState.lastOrder = {
    orderId,
    name,
    phone,
    whatsapp,
    city,
    area,
    address: fullAddress,
    note,
    items: [...appState.cart],
    total: grandTotal,
    date: new Date().toLocaleDateString('en-PK')
  };

  closeCheckoutModal();
  appState.cart = [];
  saveState();
  updateCartBadge();

  document.getElementById('confirmOrderId').textContent = orderId;
  document.getElementById('confirmCustName').textContent = name;
  document.getElementById('confirmCity').textContent = `${city} (${area})`;
  document.getElementById('confirmAmount').textContent = formatMoney(grandTotal);

  document.getElementById('orderSuccessOverlay').classList.add('open');
  showToast(`🎉 Order ${orderId} received! Confirmed in Admin Dashboard.`);
}

function closeOrderSuccessModal() {
  document.getElementById('orderSuccessOverlay').classList.remove('open');
}

function sendOrderReceiptToWhatsApp() {
  if (!appState.lastOrder) return;
  const o = appState.lastOrder;
  
  let msg = `*Assalam-o-Alaikum Shahid Clothes!*%0A%0A`;
  msg += `I have placed an order via Cash on Delivery:%0A`;
  msg += `*Order ID:* ${o.orderId}%0A`;
  msg += `*Customer:* ${o.name}%0A`;
  msg += `*Phone:* ${o.phone}%0A`;
  msg += `*City:* ${o.city}%0A`;
  msg += `*Delivery Address:* ${o.address}, ${o.area}%0A%0A`;
  msg += `*Items Ordered:*%0A`;
  o.items.forEach(it => {
    msg += `• ${it.title} (Size: ${it.selectedSize}) x ${it.quantity} - Rs. ${it.price * it.quantity}%0A`;
  });
  msg += `%0A*Total Amount to Pay Rider:* Rs. ${o.total}%0A`;
  if (o.note) msg += `*Special Note:* ${o.note}%0A`;
  msg += `%0APlease confirm delivery dispatch!`;

  window.open(`https://wa.me/923032431518?text=${msg}`, '_blank');
}

function orderCartViaWhatsApp() {
  if (appState.cart.length === 0) {
    showToast('Your shopping bag is empty!');
    return;
  }

  const { grandTotal } = calculateCartTotals();
  let msg = `*Assalam-o-Alaikum Shahid Clothes!*%0A%0A`;
  msg += `I would like to order the following items via Cash on Delivery:%0A%0A`;
  appState.cart.forEach(it => {
    msg += `• *${it.title}*%0A  Size: ${it.selectedSize} | Qty: ${it.quantity} | Price: Rs. ${it.price * it.quantity}%0A`;
  });
  msg += `%0A*Total Estimated Value:* Rs. ${grandTotal}%0A`;
  msg += `%0APlease take my delivery address for Cash on Delivery shipment!`;

  window.open(`https://wa.me/923032431518?text=${msg}`, '_blank');
}

// ==================== 10. WISHLIST SYSTEM ====================
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const index = appState.wishlist.indexOf(productId);
  if (index > -1) {
    appState.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    appState.wishlist.push(productId);
    showToast('Saved to wishlist! ♥');
  }

  saveState();
  updateWishlistBadge();
  renderProducts();
  renderWishlist();
}

function openWishlistDrawer() {
  document.getElementById('wishlistDrawer').classList.add('open');
  document.getElementById('wishlistOverlay').classList.add('open');
  renderWishlist();
}

function closeWishlistDrawer() {
  document.getElementById('wishlistDrawer').classList.remove('open');
  document.getElementById('wishlistOverlay').classList.remove('open');
}

function updateWishlistBadge() {
  const count = appState.wishlist.length;
  const badge = document.getElementById('wishlistCount');
  const mobileBadge = document.getElementById('mobileWishlistBadge');
  if (badge) badge.textContent = count;
  if (mobileBadge) {
    mobileBadge.textContent = count;
    mobileBadge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

function renderWishlist() {
  const list = document.getElementById('wishlistItemsList');
  const countEl = document.getElementById('wishlistDrawerCount');
  if (!list) return;

  if (countEl) countEl.textContent = appState.wishlist.length;

  if (appState.wishlist.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-view">
        <i class="fa-regular fa-heart"></i>
        <h4>Your Wishlist is Empty</h4>
        <p>Save your favourite Shahid Clothes suits to order later.</p>
        <button class="btn btn-primary" onclick="closeWishlistDrawer(); openCategoryPage('all', 'ALL COLLECTIONS', event);">BROWSE CATALOG</button>
      </div>
    `;
    return;
  }

  const items = NISHAT_PRODUCTS.filter(p => appState.wishlist.includes(p.id));

  list.innerHTML = items.map(p => `
    <div class="cart-item-row">
      <img src="${p.primaryImage}" alt="${p.title}" class="cart-item-img" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
      <div class="cart-item-details">
        <div class="cart-item-top">
          <h4 class="cart-item-title">${p.title}</h4>
          <button class="remove-item-btn" onclick="toggleWishlist('${p.id}', event)">&times;</button>
        </div>
        <div class="cart-item-variant">${p.fabric} • ${p.collection}</div>
        <div class="cart-item-bottom">
          <span class="cart-item-price">${formatMoney(p.price)}</span>
          <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.7rem;" onclick="quickAddToCart('${p.id}')">ADD TO BAG</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== 11. INSTANT PREDICTIVE SEARCH ====================
function openSearchModal() {
  const modal = document.getElementById('searchOverlay');
  if (!modal) return;
  modal.classList.add('open');
  const input = document.getElementById('siteSearchInput');
  if (input) {
    input.focus();
    handleInstantSearch(input.value);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchOverlay');
  if (modal) modal.classList.remove('open');
}

function clearSearchInput() {
  const input = document.getElementById('siteSearchInput');
  if (input) {
    input.value = '';
    handleInstantSearch('');
  }
}

function applySearchTag(tag) {
  const input = document.getElementById('siteSearchInput');
  if (input) {
    input.value = tag;
    handleInstantSearch(tag);
  }
}

function handleInstantSearch(val) {
  const container = document.getElementById('searchResultsContainer');
  if (!container) return;

  const query = val.trim().toLowerCase();
  if (!query) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 0; color: #8E8E93;">
        <p style="font-size: 0.85rem;">Type a collection name (Lawn, Men, Luxury, Boutique, Pret, Accessories, Shawls) or product code.</p>
      </div>
    `;
    return;
  }

  const results = NISHAT_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.fabric.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.id.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 0; color: #8E8E93;">
        <p style="font-size: 0.85rem;">No results matching "<strong>${val}</strong>".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(p => `
    <div class="search-result-row" onclick="closeSearchModal(); openProductDetailPage('${p.id}')">
      <img src="${p.primaryImage}" alt="${p.title}" class="search-result-img" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
      <div class="search-result-info">
        <h4>${p.title}</h4>
        <span style="font-size: 0.7rem; color: #71717A;">${p.fabric} • ${p.collection}</span>
        <p>${formatMoney(p.price)} ${p.discount ? `<span style="font-size: 0.7rem; color: var(--color-sale-red);">(${p.discount})</span>` : ''}</p>
      </div>
    </div>
  `).join('');
}

// ==================== 11B. HEADER INLINE SEARCH (SCREENSHOTS 1 & 2) ====================
function toggleHeaderSearchBar() {
  const bar = document.getElementById('headerSearchBar');
  if (!bar) return;
  const isHidden = (bar.style.display === 'none' || !bar.style.display);
  if (isHidden) {
    bar.style.display = 'block';
    const input = document.getElementById('headerSearchInput');
    if (input) {
      input.focus();
      input.select();
      if (input.value.trim()) {
        handleHeaderSearch(input.value);
      }
    }
  } else {
    closeHeaderSearchBar();
  }
}

function closeHeaderSearchBar() {
  const bar = document.getElementById('headerSearchBar');
  if (bar) bar.style.display = 'none';
  const dropdown = document.getElementById('headerSearchDropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
  }
}

function handleHeaderSearch(val) {
  const dropdown = document.getElementById('headerSearchDropdown');
  if (!dropdown) return;
  const q = val.trim().toLowerCase();

  if (!q) {
    dropdown.style.display = 'none';
    dropdown.innerHTML = '';
    return;
  }

  dropdown.style.display = 'block';
  const results = NISHAT_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.fabric.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    // Screenshot 2: exact text
    dropdown.innerHTML = `
      <div class="search-inline-no-results">
        No results could be found. Please try again with a different query.
      </div>
    `;
  } else {
    const preview = results.slice(0, 4);
    dropdown.innerHTML = `
      <div class="search-inline-hits">
        ${preview.map(p => `
          <div class="search-hit-card" onclick="closeHeaderSearchBar(); openProductDetailPage('${p.id}')">
            <img src="${p.primaryImage}" alt="${p.title}" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
            <div class="search-hit-info">
              <h5>${p.title}</h5>
              <span>${formatMoney(p.price)}</span>
            </div>
          </div>
        `).join('')}
        <div class="search-view-all-btn" onclick="openSearchPage('${val.replace(/'/g, "\\'")}')">
          VIEW ALL (${results.length}) RESULTS IN FULL PAGE &rarr;
        </div>
      </div>
    `;
  }
}

function handleHeaderSearchKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const val = event.target.value.trim();
    openSearchPage(val);
  } else if (event.key === 'Escape') {
    closeHeaderSearchBar();
  }
}

// ==================== 11C. DEDICATED SEARCH PAGE VIEW (SCREENSHOT 3) ====================
function openSearchPage(query) {
  closeHeaderSearchBar();
  closeMobileNav();

  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');
  if (homeView) homeView.style.display = 'none';
  if (pdpView) pdpView.style.display = 'none';
  if (searchView) searchView.style.display = 'block';
  if (chkView) chkView.style.display = 'none';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';
  if (bottomNav) bottomNav.style.display = '';
  if (floatingWa) floatingWa.style.display = '';

  const pageInput = document.getElementById('searchPageInput');
  if (pageInput) {
    pageInput.value = query || '';
    pageInput.focus();
  }

  executeSearchPageQuery(query || '');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearchPageInput(val) {
  executeSearchPageQuery(val);
}

function handleSearchPageKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    executeSearchPageSubmit();
  }
}

function executeSearchPageSubmit() {
  const pageInput = document.getElementById('searchPageInput');
  const val = pageInput ? pageInput.value : '';
  executeSearchPageQuery(val);
}

function executeSearchPageQuery(rawQuery) {
  const statusEl = document.getElementById('searchPageStatus');
  const gridEl = document.getElementById('searchPageGrid');
  if (!statusEl || !gridEl) return;

  const q = (rawQuery || '').trim().toLowerCase();

  if (!q) {
    statusEl.textContent = 'No results could be found. Please try again with a different query.';
    gridEl.innerHTML = '';
    return;
  }

  const results = NISHAT_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.fabric.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.id.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    // Exact Screenshot 3 message
    statusEl.textContent = 'No results could be found. Please try again with a different query.';
    gridEl.innerHTML = '';
  } else {
    statusEl.textContent = `Showing ${results.length} results for "${rawQuery.trim()}"`;
    gridEl.innerHTML = results.map(product => {
      const isWishlisted = appState.wishlist.includes(product.id);
      const formattedPrice = formatMoney(product.price);
      const formattedOriginal = product.originalPrice ? formatMoney(product.originalPrice) : null;

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media" onclick="openProductDetailPage('${product.id}')">
            <img src="${product.primaryImage}" alt="${product.title}" class="product-img-primary" loading="lazy" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
            <img src="${product.secondaryImage || product.primaryImage}" alt="${product.title} Details" class="product-img-secondary" loading="lazy" onerror="this.onerror=null;this.src='assets/images/cat_pret.jpg';">
            
            <div class="badge-stack">
              ${product.discount ? `<span class="product-badge badge-sale">${product.discount}</span>` : ''}
              ${product.isNew ? `<span class="product-badge badge-new">NEW</span>` : ''}
            </div>

            <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}', event)" aria-label="Add to Wishlist" title="Add to Wishlist">
              <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>

            <button class="card-plus-btn" onclick="handleCardPlusClick('${product.id}', event)" aria-label="Add to Bag" title="Quick Add to Bag">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <div class="product-info">
            <span class="product-category-tag">${product.pieces} • ${product.fabric}</span>
            <h3 class="product-title" onclick="openProductDetailPage('${product.id}')">${product.title}</h3>
            <p class="product-fabric-detail">${product.collection}</p>
            
            <div class="product-pricing">
              <span class="price-current">${formattedPrice}</span>
              ${formattedOriginal ? `<span class="price-original">${formattedOriginal}</span>` : ''}
              ${product.discount ? `<span class="price-discount-percent">${product.discount}</span>` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }
}

// ==================== 12. TRACK ORDER SIMULATION ====================
function openTrackModal(event) {
  if (event) event.preventDefault();
  document.getElementById('trackModalOverlay').classList.add('open');
}

function closeTrackModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('trackModalOverlay').classList.remove('open');
}

function handleTrackOrder(event) {
  event.preventDefault();
  const input = document.getElementById('trackInput').value.trim();
  const res = document.getElementById('trackResult');
  if (!input || !res) return;

  res.style.display = 'block';
  res.innerHTML = `
    <div style="background-color: var(--color-bg-subtle); padding: 1.25rem; border-radius: 4px; margin-top: 1.25rem; text-align: left; border: 1px solid var(--color-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <strong style="font-size: 0.875rem; color: var(--color-noir);">Tracking ID: ${input.toUpperCase()}</strong>
        <span style="font-size: 0.75rem; color: #2E7D32; font-weight: 700;">IN TRANSIT</span>
      </div>
      <p style="font-size: 0.8rem; color: #4A4A52; margin-bottom: 0.75rem;">Courier: <strong>CallCourier / TCS Express</strong> • Cash on Delivery</p>
      <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-top: 1rem; color: #1C1C1E; font-weight: 600;">
        <span><i class="fa-solid fa-circle-check" style="color: #2E7D32;"></i> Order Placed</span>
        <span><i class="fa-solid fa-circle-check" style="color: #2E7D32;"></i> Packed</span>
        <span><i class="fa-solid fa-truck-fast" style="color: var(--color-primary-maroon);"></i> Dispatched</span>
        <span style="color: #8E8E93;"><i class="fa-regular fa-circle"></i> Out for Delivery</span>
      </div>
    </div>
  `;
}

// ==================== 13. EXACT NISHAT FOOTER & MODALS (SCREENSHOT 4) ====================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleNewsletterSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('footerNewsletterEmail');
  const confirmEl = document.getElementById('newsletterConfirmation');
  if (!input) return;

  const email = input.value.trim();
  if (!email) return;

  if (confirmEl) {
    confirmEl.textContent = '✓ Thank you for subscribing! Your Rs. 500 voucher code is WELCOME500';
    confirmEl.style.display = 'block';
  }
  showToast('Subscribed to Shahid Clothes! Promo code WELCOME500 activated.');
  input.value = '';
}

// Shahid Clothes Store Locator Database
const NISHAT_STORES = [
  { city: 'lahore', name: 'Shahid Clothes Boutique - Packages Mall', address: '1st Floor, Packages Mall, Walton Road, Lahore', phone: '03032431518', hours: '10:00 AM – 11:00 PM' },
  { city: 'lahore', name: 'Shahid Clothes Flagship - MM Alam Road', address: 'Gulberg III, MM Alam Road, Lahore', phone: '03032431518', hours: '10:00 AM – 10:30 PM' },
  { city: 'lahore', name: 'Shahid Clothes Emporium Mall', address: 'Ground Floor, Emporium Mall, Johar Town, Lahore', phone: '03032431518', hours: '10:00 AM – 11:00 PM' },
  { city: 'karachi', name: 'Shahid Clothes - Dolmen Mall Clifton', address: '1st Floor, Dolmen Mall Clifton, Karachi', phone: '03032431518', hours: '11:00 AM – 11:00 PM' },
  { city: 'karachi', name: 'Shahid Clothes - Lucky One Mall', address: 'Ground Floor, Lucky One Mall, Rashid Minhas Rd, Karachi', phone: '03032431518', hours: '11:00 AM – 11:00 PM' },
  { city: 'islamabad', name: 'Shahid Clothes - The Centaurus Mall', address: '2nd Floor, The Centaurus Mall, F-8, Islamabad', phone: '03032431518', hours: '10:00 AM – 10:30 PM' },
  { city: 'faisalabad', name: 'Shahid Clothes - Peoples Colony', address: 'D-Ground, Peoples Colony No. 1, Faisalabad', phone: '03032431518', hours: '10:00 AM – 10:00 PM' }
];

function openStoreLocatorModal() {
  const modal = document.getElementById('storeLocatorModalOverlay');
  if (!modal) return;
  modal.classList.add('open');
  renderStoresList('all');
}

function closeStoreLocatorModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('storeLocatorModalOverlay');
  if (modal) modal.classList.remove('open');
}

function filterStores(city, btn) {
  const pills = document.querySelectorAll('.store-city-filter .city-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderStoresList(city);
}

function renderStoresList(cityFilter) {
  const container = document.getElementById('storesListContainer');
  if (!container) return;

  const stores = (cityFilter === 'all') 
    ? NISHAT_STORES 
    : NISHAT_STORES.filter(s => s.city.toLowerCase() === cityFilter.toLowerCase());

  container.innerHTML = stores.map(s => `
    <div class="store-card">
      <div class="store-card-info">
        <h4>${s.name}</h4>
        <p><i class="fa-solid fa-location-dot" style="color: var(--color-nishat-gold);"></i> ${s.address}</p>
        <span><i class="fa-regular fa-clock"></i> ${s.hours}</span>
      </div>
      <a href="tel:${s.phone.replace(/\s+/g, '')}" class="store-call-btn">
        <i class="fa-solid fa-phone"></i> Call
      </a>
    </div>
  `).join('');
}

function openSupportModal() {
  const modal = document.getElementById('supportModalOverlay');
  if (modal) modal.classList.add('open');
}

function closeSupportModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('supportModalOverlay');
  if (modal) modal.classList.remove('open');
}

// Universal Information Modal for all footer links
const NISHAT_INFO_CONTENT = {
  blogs: {
    title: 'SHAHID CLOTHES FASHION & LIFESTYLE BLOGS',
    subtitle: 'Trends, Styling Guides & Heritage Craftsmanship',
    body: `
      <h4>1. Summer Lawn '26: The New Color Palette</h4>
      <p>This season, Shahid Clothes reimagines traditional floral motifs with subtle pastels and striking sorbet hues. Featuring pure Swiss voile and cambric lawn, the collection is tailored for breezy Pakistani summers.</p>
      
      <h4>2. Caring for Delicate Raw Silk & Chiffon Dupattas</h4>
      <p>Luxury fabrics like our raw silk suits and hand-painted organza dupattas retain their luster best when dry cleaned. Always store in breathable muslin covers away from direct moisture.</p>

      <h4>3. The Making of Shahid Boutique Couture</h4>
      <p>Every piece in our boutique atelier undergoes hours of intricate hand-embroidery by master artisans across Punjab, incorporating antique tilla, zari, and zardozi needlework.</p>
    `
  },
  about: {
    title: 'ABOUT SHAHID CLOTHES',
    subtitle: 'A Legacy of Textile Excellence Since 1951',
    body: `
      <h4>Our Heritage</h4>
      <p>Shahid Clothes is an elite Pakistani fashion label dedicated to bespoke craftsmanship, premium luxury fabrics, and timeless silhouettes. With our guiding mantra 'Wear Your Story', we empower modern elegance through unmatched textile artistry.</p>
      
      <h4>Our Philosophy</h4>
      <p>From yarn spinning to the final handcrafted stitch, every Shahid Clothes garment represents the pinnacle of Pakistani artisanal textile engineering. We blend traditional aesthetics with contemporary cuts to offer luxury that lasts.</p>

      <h4>Nationwide Presence</h4>
      <p>With retail boutiques nationwide and fast Cash-on-Delivery across Pakistan, Shahid Clothes delivers luxury directly to your doorstep.</p>
    `
  },
  catalogues: {
    title: 'SHAHID CLOTHES E-CATALOGUES & LOOKBOOKS',
    subtitle: 'Browse Seasonal Digital Lookbooks',
    body: `
      <h4>• Shahid Boutique Festive '26 Lookbook</h4>
      <p>Featuring Hania Aamir in signature 3-piece raw silk formals, antique zari peshwas gowns, and organza dupattas. Available to order online directly.</p>

      <h4>• Summer Lawn 2026 Volume 1</h4>
      <p>Explore 100+ new unstitched 2-piece and 3-piece digital printed lawn designs with matching chiffon and voile dupattas.</p>

      <h4>• Naqsh Men's Summer Fabric Catalogue</h4>
      <p>Egyptian cotton latha, wash & wear blends, and festive embroidered kurtas for men.</p>
    `
  },
  privacy: {
    title: 'PRIVACY POLICY',
    subtitle: 'Your Data Protection & Confidentiality Guarantee',
    body: `
      <h4>Information We Collect</h4>
      <p>We only collect information necessary to fulfill your Cash on Delivery (COD) orders: your full name, delivery address, contact phone number, and optional email address.</p>

      <h4>Security & Courier Sharing</h4>
      <p>Your delivery address and phone number are shared solely with our authorized courier partners (CallCourier and TCS Express) strictly for parcel delivery and rider contact.</p>

      <h4>No Payment Card Storage</h4>
      <p>All Cash on Delivery transactions are paid in cash directly to the courier rider upon delivery. We never store sensitive banking credentials.</p>
    `
  },
  terms: {
    title: 'TERMS & CONDITIONS',
    subtitle: 'Shahid Clothes Online Ordering Policies',
    body: `
      <h4>Order Verification</h4>
      <p>All Cash on Delivery orders are verified via SMS or WhatsApp before dispatch. Please ensure your contact phone number is accurate and reachable.</p>

      <h4>Delivery Timelines</h4>
      <p>Standard delivery takes 2 to 4 business days across major cities (Lahore, Karachi, Islamabad, Faisalabad, Rawalpindi, Peshawar) and 3 to 6 business days for other nationwide areas.</p>

      <h4>Parcel Inspection</h4>
      <p>As per courier security regulations, riders can only hand over parcels after receiving the full COD amount. You can inspect the suit immediately afterward and request an exchange if needed.</p>
    `
  },
  'terms-boutique': {
    title: 'TERMS & CONDITIONS - SHAHID BOUTIQUE',
    subtitle: 'Exclusive Couture & Made-to-Measure Guidelines',
    body: `
      <h4>Luxury Handcrafted Craftsmanship</h4>
      <p>Shahid Boutique garments feature handcrafted needlework, antique zari, and delicate organza cutwork. Slight variations in embroidery are the hallmark of authentic handcrafted artisan work.</p>

      <h4>Dry Clean Only</h4>
      <p>All Shahid Boutique suits, raw silk ensembles, and velvet shawls must strictly be professionally dry cleaned. Do not machine wash or hand wash with harsh detergents.</p>

      <h4>Alterations & Sizing</h4>
      <p>Ready-to-wear boutique suits are crafted to standard luxury size charts. Custom sizing alterations can be requested via our 24/7 WhatsApp boutique team.</p>
    `
  },
  faqs: {
    title: 'FREQUENTLY ASKED QUESTIONS (FAQS)',
    subtitle: 'Help & Quick Answers for Online Shopping',
    body: `
      <h4>Q: How does Cash on Delivery (COD) work?</h4>
      <p>A: Simply place your order without entering credit card details. When the TCS or CallCourier rider arrives at your doorstep, you pay the exact order amount in cash and receive your parcel.</p>

      <h4>Q: What are the shipping charges?</h4>
      <p>A: Shipping is completely FREE on all orders above Rs. 2,500! For orders under Rs. 2,500, a nominal nationwide delivery fee of Rs. 200 applies.</p>

      <h4>Q: How do I track my parcel?</h4>
      <p>A: Click the "Order Tracking" link in the footer or announcement bar, enter your Order ID (e.g. #SC-89241) or mobile number, and view real-time courier dispatch status.</p>

      <h4>Q: Can I exchange a suit if the size is incorrect?</h4>
      <p>A: Yes! We offer a 14-day hassle-free exchange policy. You can exchange at any Shahid Clothes retail store or request a courier pickup through our WhatsApp helpline.</p>
    `
  },
  contact: {
    title: 'CONTACT SHAHID CLOTHES',
    subtitle: 'Head Office & Customer Care Specialists',
    body: `
      <h4>Head Office Address</h4>
      <p>Shahid Clothes Design Studio, 21 Km Ferozpur Road, Lahore, Punjab, Pakistan.</p>

      <h4>Customer Support Channels</h4>
      <p><strong>Helpline:</strong> 03032431518<br>
         <strong>WhatsApp Help:</strong> +92 303 2431518 (03032431518)<br>
         <strong>Online Inquiries:</strong> shahid3460817@gmail.com</p>

      <h4>Operating Timings</h4>
      <p>Online Support: Available 24 Hours / 7 Days a week.<br>Corporate Office: Monday – Saturday (9:00 AM – 6:00 PM PKT).</p>
    `
  },
  returns: {
    title: 'RETURN & EXCHANGE POLICY',
    subtitle: '14-Day Hassle-Free Nationwide Exchanges',
    body: `
      <h4>14-Day Exchange Window</h4>
      <p>If you are not completely satisfied with your unstitched or ready-to-wear suit, you may exchange it within 14 days of receiving your order.</p>

      <h4>Exchange Options</h4>
      <p><strong>Option 1 - In Store:</strong> Walk into any of our Shahid Clothes retail outlets nationwide with your original parcel receipt.</p>
      <p><strong>Option 2 - Doorstep Courier Pickup:</strong> Contact our WhatsApp support at 03032431518, and our courier rider will collect the suit from your address.</p>

      <h4>Condition of Goods</h4>
      <p>Items must be unworn, unwashed, and in original packaging with intact brand tags.</p>
    `
  },
  'returns-boutique': {
    title: 'RETURN & EXCHANGE POLICY - SHAHID BOUTIQUE',
    subtitle: 'Exclusive Guidelines for Couture Collections',
    body: `
      <h4>Boutique Formal Exchange Policy</h4>
      <p>Due to the exclusive and limited production of Shahid Boutique garments, boutique suits can be exchanged for another size or boutique design within 7 days of delivery.</p>

      <h4>Quality Inspection</h4>
      <p>Returned boutique items undergo a brief quality audit by our atelier quality team to verify that all hand-embellishments, laces, and buttons are in pristine original condition.</p>
    `
  }
};

function openInfoModal(type) {
  const modal = document.getElementById('infoModalOverlay');
  const titleEl = document.getElementById('infoModalTitle');
  const subEl = document.getElementById('infoModalSubtitle');
  const bodyEl = document.getElementById('infoModalBody');
  if (!modal || !titleEl || !bodyEl) return;

  const info = NISHAT_INFO_CONTENT[type] || {
    title: 'SHAHID CLOTHES',
    subtitle: 'Official Customer Service',
    body: '<p>Please contact our helpline at 03032431518 or WhatsApp 03032431518 for immediate assistance.</p>'
  };

  titleEl.textContent = info.title;
  if (subEl) subEl.textContent = info.subtitle;
  bodyEl.innerHTML = info.body;

  modal.classList.add('open');
}

function closeInfoModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('infoModalOverlay');
  if (modal) modal.classList.remove('open');
}

// ==================== 14. HELPERS & APP INITIALIZATION ====================
function toggleMobileNav() {
  document.getElementById('mobileNavDrawer').classList.toggle('open');
  document.getElementById('mobileNavOverlay').classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobileNavDrawer').classList.remove('open');
  document.getElementById('mobileNavOverlay').classList.remove('open');
}

function changeCurrency(curr) {
  appState.currency = curr;
  if (curr === 'USD') {
    appState.currencyRate = 0.0036;
    appState.currencySymbol = '$';
  } else if (curr === 'GBP') {
    appState.currencyRate = 0.0028;
    appState.currencySymbol = '£';
  } else if (curr === 'AED') {
    appState.currencyRate = 0.013;
    appState.currencySymbol = 'AED ';
  } else {
    appState.currencyRate = 1.0;
    appState.currencySymbol = 'Rs. ';
  }

  renderProducts();
  renderCart();
}

function formatMoney(amountInPkr) {
  if (appState.currency === 'PKR') {
    return `Rs. ${amountInPkr.toLocaleString('en-PK')}`;
  }
  const converted = (amountInPkr * appState.currencyRate).toFixed(2);
  return `${appState.currencySymbol}${converted}`;
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// ==================== 15. OFFICIAL NISHAT SHOPIFY PLUS 2-COLUMN CHECKOUT ====================
function openCheckoutPage() {
  if (appState.cart.length === 0) {
    showToast('Your shopping bag is empty! Add a suit to proceed.');
    return;
  }

  closeCartDrawer();
  closeMobileNav();
  closeHeaderSearchBar();

  // Hide general storefront views
  const homeView = document.getElementById('homeView');
  const pdpView = document.getElementById('productDetailView');
  const searchView = document.getElementById('searchPageView');
  const chkView = document.getElementById('checkoutPageView');

  if (homeView) homeView.style.display = 'none';
  if (pdpView) pdpView.style.display = 'none';
  if (searchView) searchView.style.display = 'none';
  if (chkView) chkView.style.display = 'block';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  const bottomNav = document.querySelector('.mobile-bottom-nav');
  const floatingWa = document.querySelector('.floating-whatsapp');
  if (header) header.style.display = 'none';
  if (bar) bar.style.display = 'none';
  if (footer) footer.style.display = 'block';
  if (bottomNav) bottomNav.style.display = 'none';
  if (floatingWa) floatingWa.style.display = 'none';

  // Render checkout summary
  renderCheckoutPageSummary();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderCheckoutPageSummary() {
  const itemsListEl = document.getElementById('chkItemsList');
  const subtotalEl = document.getElementById('chkSummarySubtotal');
  const discountLine = document.getElementById('chkSummaryDiscountLine');
  const discountEl = document.getElementById('chkSummaryDiscount');
  const shippingEl = document.getElementById('chkSummaryShipping');
  const shippingRateEl = document.getElementById('chkShippingRate');
  const grandTotalEl = document.getElementById('chkSummaryGrandTotal');
  const mobileTotalEl = document.getElementById('mobileCheckoutTotal');

  if (!itemsListEl) return;

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();

  // Render items with image, quantity bubble, title, details & price
  itemsListEl.innerHTML = appState.cart.map(item => `
    <div class="chk-item-row">
      <div class="chk-item-media">
        <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null;this.src='assets/images/cat_luxury.jpg';">
        <span class="chk-item-qty">${item.quantity}</span>
      </div>
      <div class="chk-item-meta">
        <div class="chk-item-title">${item.title}</div>
        <div class="chk-item-variant">${item.fabric} • Size: <strong>${item.selectedSize}</strong></div>
      </div>
      <div class="chk-item-price">${formatMoney(item.price * item.quantity)}</div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);

  if (discountLine && discountEl) {
    if (discount > 0) {
      discountLine.style.display = 'flex';
      discountEl.textContent = `- ${formatMoney(discount)}`;
    } else {
      discountLine.style.display = 'none';
    }
  }

  const shippingText = shipping === 0 ? 'FREE' : formatMoney(shipping);
  if (shippingEl) shippingEl.textContent = shippingText;
  if (shippingRateEl) shippingRateEl.textContent = shippingText;

  const formattedGrand = formatMoney(grandTotal);
  if (grandTotalEl) grandTotalEl.textContent = formattedGrand;
  if (mobileTotalEl) mobileTotalEl.textContent = formattedGrand;
}

function toggleMobileCheckoutSummary() {
  const sidebar = document.getElementById('checkoutSummarySidebar');
  const toggleText = document.getElementById('mobileToggleText');
  if (!sidebar || !toggleText) return;

  const isOpen = sidebar.classList.contains('mobile-open');
  if (isOpen) {
    sidebar.classList.remove('mobile-open');
    toggleText.innerHTML = `Show order summary <i class="fa-solid fa-angle-down"></i>`;
  } else {
    sidebar.classList.add('mobile-open');
    toggleText.innerHTML = `Hide order summary <i class="fa-solid fa-angle-up"></i>`;
  }
}

function selectCheckoutPayment(method) {
  const codItem = document.getElementById('payMethodCod');
  const cardItem = document.getElementById('payMethodCard');
  const baadmayItem = document.getElementById('payMethodBaadmay');

  const codContent = document.getElementById('payContentCod');
  const cardContent = document.getElementById('payContentCard');
  const baadmayContent = document.getElementById('payContentBaadmay');

  [codItem, cardItem, baadmayItem].forEach(el => el && el.classList.remove('active'));
  [codContent, cardContent, baadmayContent].forEach(el => el && (el.style.display = 'none'));

  const radio = document.querySelector(`input[name="chkPayment"][value="${method.toUpperCase()}"]`);
  if (radio) radio.checked = true;

  if (method === 'cod') {
    if (codItem) codItem.classList.add('active');
    if (codContent) codContent.style.display = 'block';
  } else if (method === 'card') {
    if (cardItem) cardItem.classList.add('active');
    if (cardContent) cardContent.style.display = 'block';
  } else if (method === 'baadmay') {
    if (baadmayItem) baadmayItem.classList.add('active');
    if (baadmayContent) baadmayContent.style.display = 'block';
  }
}

function handleCheckoutCityChange(city) {
  if (city === 'Lahore') {
    showToast('Express Next-Day Delivery available for Lahore!');
  }
}

function applyCheckoutPromo() {
  const input = document.getElementById('chkPromoInput');
  const msgEl = document.getElementById('chkPromoMessage');
  if (!input || !msgEl) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msgEl.className = 'chk-promo-msg error';
    msgEl.textContent = 'Please enter a discount code.';
    msgEl.style.display = 'block';
    return;
  }

  if (PROMO_CODES[code]) {
    appState.activePromo = PROMO_CODES[code];
    msgEl.className = 'chk-promo-msg success';
    msgEl.textContent = `Promo code "${code}" applied! ${PROMO_CODES[code].label}`;
    msgEl.style.display = 'block';
    renderCheckoutPageSummary();
    renderCart();
  } else {
    msgEl.className = 'chk-promo-msg error';
    msgEl.textContent = 'Invalid promo code. Try WELCOME500 or SHAHID10';
    msgEl.style.display = 'block';
  }
}

function handlePlaceShopifyOrder(event) {
  event.preventDefault();

  const contact = document.getElementById('chkContact').value.trim();
  const firstName = document.getElementById('chkFirstName').value.trim();
  const lastName = document.getElementById('chkLastName').value.trim();
  const address = document.getElementById('chkAddress').value.trim();
  const apartment = document.getElementById('chkApartment').value.trim();
  const city = document.getElementById('chkCity').value;
  const postal = document.getElementById('chkPostalCode').value.trim();
  const phone = document.getElementById('chkPhone').value.trim();
  const paymentMethod = (document.querySelector('input[name="chkPayment"]:checked') || {}).value || 'COD';

  if (!city) {
    showToast('Please select your city to continue.');
    document.getElementById('chkCity').focus();
    return;
  }

  const fullName = firstName ? `${firstName} ${lastName}` : lastName;
  const fullAddress = apartment ? `${address}, ${apartment}` : address;
  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();
  const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
  const orderId = `#SC-${randomOrderNum}`;

  const orderPayload = {
    id: orderId,
    name: fullName,
    contact: contact,
    phone: phone,
    whatsapp: phone,
    address: fullAddress,
    apartment: apartment,
    city: city,
    postal: postal,
    paymentMethod: paymentMethod,
    subtotal: subtotal,
    discount: discount,
    shipping: shipping,
    total: grandTotal,
    items: appState.cart.map(it => ({
      id: it.id,
      title: it.title,
      price: it.price,
      quantity: it.quantity,
      selectedSize: it.selectedSize || 'Unstitched',
      image: it.primaryImage || it.image || ''
    }))
  };

  // Dispatch to MySQL backend API
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  }).then(res => res.json())
    .then(data => console.log('✅ Order synced to MySQL backend:', data))
    .catch(err => console.warn('Could not post to /api/orders directly:', err));

  appState.lastOrder = {
    orderId,
    name: fullName,
    contact,
    phone,
    whatsapp: phone,
    city,
    address: fullAddress,
    postal,
    paymentMethod,
    items: [...appState.cart],
    total: grandTotal,
    date: new Date().toLocaleDateString('en-PK')
  };

  // Clear cart
  appState.cart = [];
  saveState();
  updateCartBadge();

  // Populate Order Success Modal
  document.getElementById('confirmOrderId').textContent = orderId;
  document.getElementById('confirmCustName').textContent = fullName;
  document.getElementById('confirmCity').textContent = `${city}`;
  document.getElementById('confirmAmount').textContent = formatMoney(grandTotal);

  // Return to store view
  const chkView = document.getElementById('checkoutPageView');
  const homeView = document.getElementById('homeView');
  if (chkView) chkView.style.display = 'none';
  if (homeView) homeView.style.display = 'block';

  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.announcement-bar');
  const footer = document.querySelector('.site-footer');
  if (header) header.style.display = '';
  if (bar) bar.style.display = '';
  if (footer) footer.style.display = '';

  // Show order confirmation modal & toast
  document.getElementById('orderSuccessOverlay').classList.add('open');
  showToast(`🎉 Order ${orderId} placed successfully! Thank you for shopping with Shahid Clothes.`);
}


