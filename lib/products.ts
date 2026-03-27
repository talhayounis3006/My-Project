
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  images: string[];
  origin: string;
  weight: string;
  inStock: boolean;
  ingredients: string[];
  nutritionFacts: {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dauti Ajvar",
    category: "Pantry & Spreads",
    description: "Authentic roasted red pepper spread",
    longDescription: "Dauti Ajvar is the quintessential Balkan condiment, crafted from vacuum-roasted red peppers. This rich, creamy spread captures the soul of traditional home cooking, perfect as a side dish, bread spread, or ingredient in gourmet recipes.",
    price: "$8.99",
    images: ["/images/114.png"],
    origin: "Balkans",
    weight: "690g",
    inStock: true,
    ingredients: ["Roasted Red Peppers", "Sunflower Oil", "Sea Salt", "Vinegar"],
    nutritionFacts: { calories: "90 per serving", fat: "6g", carbs: "8g", protein: "1g" }
  },
  {
    id: 2,
    name: "Podravka Alpisk Soppa",
    category: "Soups & Meals",
    description: "Alpine style vegetable soup mix",
    longDescription: "A comforting blend of dried vegetables and noodles from Podravka, a legend in Balkan kitchens. Quick to prepare and rich in flavor, it's the perfect warm meal for any season.",
    price: "$3.49",
    images: ["/images/22.png"],
    origin: "Croatia",
    weight: "64g",
    inStock: true,
    ingredients: ["Dried Vegetables", "Enriched Noodles", "Natural Spices"],
    nutritionFacts: { calories: "70 per serving", fat: "1g", carbs: "12g", protein: "2g" }
  },
  {
    id: 3,
    name: "Vipa Sweet Pepper Chips",
    category: "Snacks & Sweets",
    description: "Crunchy potato chips with sweet paprika",
    longDescription: "Premium Vipa potato chips seasoned with the finest sweet red peppers. A favorite snack across the Balkans, offering a perfect crunch and balanced spicy-sweet flavor profile.",
    price: "$2.99",
    images: ["/images/34.png"],
    origin: "Kosovo",
    weight: "150g",
    inStock: true,
    ingredients: ["Selected Potatoes", "Vegetable Oil", "Sweet Paprika Seasoning", "Salt"],
    nutritionFacts: { calories: "150 per serving", fat: "9g", carbs: "16g", protein: "2g" }
  },
  {
    id: 4,
    name: "Prince Caffe Fantastic",
    category: "Beverages & Coffee",
    description: "Classic roasted Balkan coffee",
    longDescription: "Prince Caffe offers an intense, fantastic aroma that awakens the senses. Finely ground for the traditional 'Turka' style preparation, it provides a thick, rich crema and deep flavor.",
    price: "$5.99",
    images: ["/images/50.png"],
    origin: "Kosovo",
    weight: "500g",
    inStock: true,
    ingredients: ["Roasted Ground Coffee Beans"],
    nutritionFacts: { calories: "2 per cup", fat: "0g", carbs: "0g", protein: "0g" }
  },
  {
    id: 5,
    name: "Tanay Ceylon Tea",
    category: "Beverages & Coffee",
    description: "Traditional loose leaf black tea",
    longDescription: "Premium Ceylon black tea from Tanay, offering a robust flavor and deep amber color. Perfect for the traditional long-brew method favored in Balkan households.",
    price: "$7.49",
    images: ["/images/66.png"],
    origin: "Sri Lanka / Balkans",
    weight: "500g",
    inStock: true,
    ingredients: ["Pure Ceylon Black Tea"],
    nutritionFacts: { calories: "0", fat: "0", carbs: "0", protein: "0" }
  },
  {
    id: 6,
    name: "Argeta Chicken Pate",
    category: "Soups & Meals",
    description: "World-famous chicken meat spread",
    longDescription: "Argeta is Europe's favorite meat pate. Made from the finest chicken meat and enriched with natural spices, it contains no additives or preservatives, making it a healthy and delicious snack.",
    price: "$2.49",
    images: ["/images/53.png"],
    origin: "Slovenia",
    weight: "95g",
    inStock: true,
    ingredients: ["Cooked Chicken Meat", "Vegetable Oil", "Milk Proteins", "Spices"],
    nutritionFacts: { calories: "180", fat: "14g", carbs: "1g", protein: "12g" }
  },
  {
    id: 7,
    name: "Podravka Govedi Gulas",
    category: "Soups & Meals",
    description: "Traditional ready-to-eat beef goulash",
    longDescription: "A hearty, traditional beef goulash from Podravka. Tender chunks of beef in a rich, savory sauce, prepared according to a classic Croatian recipe. Just heat and serve.",
    price: "$5.99",
    images: ["/images/55.png"],
    origin: "Croatia",
    weight: "200g",
    inStock: true,
    ingredients: ["Beef", "Water", "Onions", "Tomato Paste", "Spices"],
    nutritionFacts: { calories: "240", fat: "12g", carbs: "8g", protein: "24g" }
  },
  {
    id: 8,
    name: "Vegeta Original Seasoning",
    category: "Pantry & Spreads",
    description: "The ultimate Balkan food enhancer",
    longDescription: "Vegeta is the most famous Balkan culinary creation. A unique blend of salt, spices, and dried vegetables that adds a savory depth to any dish, from soups to roasted meats.",
    price: "$3.99",
    images: ["/images/27.png"],
    origin: "Croatia",
    weight: "250g",
    inStock: true,
    ingredients: ["Salt", "Dehydrated Vegetables (Carrot, Parsnip, Onion, Celery)", "Flavor Enhancers", "Spices"],
    nutritionFacts: { calories: "5 per serving", fat: "0g", carbs: "1g", protein: "0g" }
  },
  {
    id: 9,
    name: "Shama Golden Sella Rice",
    category: "Grains & Bakery",
    description: "Premium parboiled long grain rice",
    longDescription: "Shama Paris Golden Sella is a premium quality rice that stays separate and fluffy after cooking. Perfect for pilafs and biryanis, offering a delicate nutty aroma.",
    price: "$12.99",
    images: ["/images/325.png"],
    origin: "India / France",
    weight: "5kg",
    inStock: true,
    ingredients: ["Parboiled Basmati Rice"],
    nutritionFacts: { calories: "160 per serving", fat: "0.5g", carbs: "35g", protein: "3g" }
  },
  {
    id: 10,
    name: "Evropa Krem Banana",
    category: "Snacks & Sweets",
    description: "Chocolate covered banana cream treats",
    longDescription: "A nostalgic favorite! Soft, fluffy banana-flavored cream covered in a thin layer of dark chocolate. A classic treat from Evropa, one of the oldest candy makers in the Balkans.",
    price: "$4.99",
    images: ["/images/75.png"],
    origin: "Macedonia",
    weight: "150g",
    inStock: true,
    ingredients: ["Sugar", "Glucose Syrup", "Dark Chocolate", "Banana Flavor", "Egg Whites"],
    nutritionFacts: { calories: "80 per piece", fat: "2g", carbs: "15g", protein: "1g" }
  },
  {
    id: 11,
    name: "Hina Roasted Red Peppers",
    category: "Pantry & Spreads",
    description: "Whole roasted and peeled red peppers",
    longDescription: "Premium red peppers, fire-roasted and carefully peeled by hand. Preserved in a light brine to maintain their smoky flavor and tender texture. Excellent for salads or as a side.",
    price: "$10.99",
    images: ["/images/234.png"],
    origin: "Balkans",
    weight: "1.5kg",
    inStock: true,
    ingredients: ["Roasted Red Peppers", "Water", "Vinegar", "Salt"],
    nutritionFacts: { calories: "40 per serving", fat: "0g", carbs: "8g", protein: "1g" }
  },
  {
    id: 12,
    name: "Golden Eagle Energy",
    category: "Beverages & Coffee",
    description: "The #1 Balkan energy drink",
    longDescription: "Stay energized with the authentic taste of Golden Eagle. A high-caffeine energy drink that's a staple in Kosovo and across the Balkan region.",
    price: "$1.99",
    images: ["/images/43.png"],
    origin: "Kosovo",
    weight: "250ml",
    inStock: true,
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Taurine", "B-Vitamins"],
    nutritionFacts: { calories: "115", fat: "0g", carbs: "28g", protein: "0g" }
  },
  {
    id: 13,
    name: "Stobi Flips Kikiriki",
    category: "Snacks & Sweets",
    description: "Classic peanut-flavored corn flips",
    longDescription: "The most iconic snack from Macedonia. Light, crunchy corn flips coated with real peanut butter. loved by kids and adults alike for generations.",
    price: "$1.49",
    images: ["/images/296.png"],
    origin: "Macedonia",
    weight: "40g",
    inStock: true,
    ingredients: ["Corn Grits", "Peanuts", "Vegetable Oil", "Salt"],
    nutritionFacts: { calories: "190", fat: "11g", carbs: "20g", protein: "4g" }
  },
  {
    id: 14,
    name: "San Ignacio Dulce de Leche",
    category: "Snacks & Sweets",
    description: "Creamy traditional milk caramel spread",
    longDescription: "Directly from Argentina/Balkans, this premium Dulce de Leche is smooth, rich, and slow-cooked to perfection. Perfect for pancakes, cakes, or eating directly from the jar.",
    price: "$9.99",
    images: ["/images/301.png"],
    origin: "Argentina",
    weight: "450g",
    inStock: true,
    ingredients: ["Milk", "Sugar", "Glucose", "Bicarbonate of Soda", "Vanilla"],
    nutritionFacts: { calories: "130 per serving", fat: "3g", carbs: "24g", protein: "2g" }
  },
  {
    id: 15,
    name: "EGE Kadayif",
    category: "Grains & Bakery",
    description: "Traditional shredded pastry for syrup desserts",
    longDescription: "Fine, crispy shredded dough ready to be baked and soaked in honey syrup. A cornerstone of Balkan and Mediterranean dessert tradition.",
    price: "$6.99",
    images: ["/images/95.png"],
    origin: "Turkey",
    weight: "400g",
    inStock: true,
    ingredients: ["Wheat Flour", "Water"],
    nutritionFacts: { calories: "320 per serving", fat: "1g", carbs: "70g", protein: "6g" }
  },
  {
    id: 16,
    name: "Gazoza Prilepska",
    category: "Beverages & Coffee",
    description: "Legendary pear-flavored Balkan soda",
    longDescription: "The original Gazoza from Prilep. A unique, refreshing taste of pear and tropical fruits that has been a Balkan favorite for over 60 years.",
    price: "$2.49",
    images: ["/images/42.png"],
    origin: "Macedonia",
    weight: "330ml",
    inStock: true,
    ingredients: ["Carbonated Water", "Sugar", "Citric Acid", "Pear Aroma"],
    nutritionFacts: { calories: "140", fat: "0g", carbs: "36g", protein: "0g" }
  },
  {
    id: 17,
    name: "Podravka Oxsoppa",
    category: "Soups & Meals",
    description: "Beef bouillon soup with noodles",
    longDescription: "A clear, savory beef soup with fine egg noodles. A quick and warming meal that brings the taste of traditional Croatian Sunday soup to your home.",
    price: "$3.49",
    images: ["/images/21.png"],
    origin: "Croatia",
    weight: "58g",
    inStock: true,
    ingredients: ["Egg Noodles", "Beef Extract", "Dried Vegetables", "Spices"],
    nutritionFacts: { calories: "65", fat: "1g", carbs: "11g", protein: "2g" }
  },
  {
    id: 18,
    name: "Ulker Halley Biscuits",
    category: "Snacks & Sweets",
    description: "Chocolate coated marshmallow biscuits",
    longDescription: "Soft marshmallow sandwiched between two crunchy biscuits and covered in thick milk chocolate. A premium snack that offers a perfect balance of textures.",
    price: "$5.49",
    images: ["/images/63.png"],
    origin: "Turkey",
    weight: "300g",
    inStock: true,
    ingredients: ["Wheat Flour", "Sugar", "Glucose Syrup", "Milk Chocolate", "Gelatin"],
    nutritionFacts: { calories: "140 per piece", fat: "6g", carbs: "20g", protein: "1g" }
  },
  {
    id: 19,
    name: "Turka Tortilla Wraps",
    category: "Grains & Bakery",
    description: "Extra soft 25cm wheat tortillas",
    longDescription: "High-quality, durable and soft wheat tortillas from Turka. Perfect for making traditional wraps, tacos, or quick Balkan-style snacks.",
    price: "$4.99",
    images: ["/images/60.png"],
    origin: "Germany",
    weight: "10 pcs",
    inStock: true,
    ingredients: ["Wheat Flour", "Water", "Vegetable Oils", "Salt"],
    nutritionFacts: { calories: "180 per wrap", fat: "4g", carbs: "32g", protein: "5g" }
  },
  {
    id: 20,
    name: "Haribo Happy Cola",
    category: "Snacks & Sweets",
    description: "Iconic cola-flavored gummy candies",
    longDescription: "The classic Haribo gummy in the shape of cola bottles. A globally loved treat that's always in high demand at our Balkan store.",
    price: "$2.99",
    images: ["/images/181.png"],
    origin: "Europe",
    weight: "100g",
    inStock: true,
    ingredients: ["Glucose Syrup", "Sugar", "Gelatin", "Dextrose", "Citric Acid"],
    nutritionFacts: { calories: "340", fat: "0g", carbs: "77g", protein: "7g" }
  },
  {
    id: 21,
    name: "Shama Basmati Rice",
    category: "Grains & Bakery",
    description: "Extra long premium basmati rice",
    longDescription: "Shama Paris Basmati is carefully aged to ensure the longest, whitest and most aromatic grains. A truly premium rice for discerning kitchens.",
    price: "$14.99",
    images: ["/images/326.png"],
    origin: "India",
    weight: "5kg",
    inStock: true,
    ingredients: ["Premium Basmati Rice"],
    nutritionFacts: { calories: "160 per serving", fat: "0g", carbs: "36g", protein: "3g" }
  },
  {
    id: 22,
    name: "Bona Food Vinegar",
    category: "Pantry & Spreads",
    description: "Traditional white food vinegar",
    longDescription: "A versatile, high-acidity vinegar essential for Balkan salads, pickling, and traditional dressing. Clean, crisp flavor profile.",
    price: "$2.49",
    images: ["/images/154.png"],
    origin: "Balkans",
    weight: "1L",
    inStock: true,
    ingredients: ["Diluted Acetic Acid"],
    nutritionFacts: { calories: "0", fat: "0", carbs: "0", protein: "0" }
  },
  {
    id: 23,
    name: "Gulcan Mixed Pickles",
    category: "Pantry & Spreads",
    description: "Assorted pickled vegetables in brine",
    longDescription: "A crunchy, tangy mix of peppers, cucumbers, and carrots. Gülcan Karisik Tursu is the perfect companion for grilled meats and heavy winter meals.",
    price: "$9.49",
    images: ["/images/145.png"],
    origin: "Turkey",
    weight: "800g",
    inStock: true,
    ingredients: ["Peppers", "Cucumbers", "Carrots", "Brine", "Vinegar"],
    nutritionFacts: { calories: "25 per serving", fat: "0g", carbs: "4g", protein: "0g" }
  },
  {
    id: 24,
    name: "Fanta Exotic",
    category: "Beverages & Coffee",
    description: "Tropical fruit flavored carbonated drink",
    longDescription: "A burst of tropical flavors in every sip! Fanta Exotic is a refreshing blend of passionfruit, peach, and orange that's incredibly popular in the Balkan region.",
    price: "$2.49",
    images: ["/images/139.png"],
    origin: "Europe",
    weight: "330ml",
    inStock: true,
    ingredients: ["Carbonated Water", "Sugar", "Fruit Juices from Concentrate", "Natural Flavors"],
    nutritionFacts: { calories: "155", fat: "0g", carbs: "38g", protein: "0g" }
  },
  {
    id: 25,
    name: "Kamar Pullo Poultry Deli",
    category: "Snacks & Sweets",
    description: "Halal certified poultry meat loaf",
    longDescription: "A fine-textured, mildly seasoned poultry deli meat. Perfect for breakfast platters, sandwiches, or as a protein-rich addition to salads.",
    price: "$7.99",
    images: ["/images/1.png"],
    origin: "Germany",
    weight: "500g",
    inStock: true,
    ingredients: ["Poultry Meat", "Water", "Spices", "Salt"],
    nutritionFacts: { calories: "110 per serving", fat: "7g", carbs: "1g", protein: "14g" }
  },
  {
    id: 26,
    name: "Shama Jasmine Rice",
    category: "Grains & Bakery",
    description: "AAA Quality Thai Hom Mali rice",
    longDescription: "Fragrant, soft and slightly sticky after cooking. Shama Jasmine rice is the highest quality Thai rice, essential for authentic Asian and Mediterranean sides.",
    price: "$11.49",
    images: ["/images/329.png"],
    origin: "Thailand",
    weight: "5kg",
    inStock: true,
    ingredients: ["Thai Hom Mali Jasmine Rice"],
    nutritionFacts: { calories: "160 per serving", fat: "0g", carbs: "35g", protein: "3g" }
  },
  {
    id: 27,
    name: "Mardel Alfajores Negro",
    category: "Snacks & Sweets",
    description: "Chocolate covered alfajor with dulce de leche",
    longDescription: "A decadent Argentine/European treat. Two soft cookies held together by a thick layer of Dulce de Leche and dipped in rich dark chocolate.",
    price: "$3.49",
    images: ["/images/305.png"],
    origin: "Europe",
    weight: "60g",
    inStock: true,
    ingredients: ["Dulce de Leche", "Dark Chocolate", "Wheat Flour", "Sugar"],
    nutritionFacts: { calories: "230", fat: "9g", carbs: "35g", protein: "3g" }
  },
  {
    id: 28,
    name: "Bagley Chocolinas",
    category: "Snacks & Sweets",
    description: "Traditional chocolate biscuits",
    longDescription: "Versatile and delicious chocolate cookies. Perfect for making the famous 'Chocotorta' or enjoying with coffee or milk.",
    price: "$5.99",
    images: ["/images/307.png"],
    origin: "Europe",
    weight: "170g",
    inStock: true,
    ingredients: ["Wheat Flour", "Sugar", "Cocoa Powder", "Vegetable Oil"],
    nutritionFacts: { calories: "140 per serving", fat: "5g", carbs: "22g", protein: "2g" }
  },
  {
    id: 29,
    name: "Sirumka Lemon Soda",
    category: "Beverages & Coffee",
    description: "Refreshing lemon flavored sparkling drink",
    longDescription: "A crisp and tangy lemon soda that's a summer favorite. Lightly carbonated with a clean citrus finish.",
    price: "$2.49",
    images: ["/images/38.png"],
    origin: "Balkans",
    weight: "330ml",
    inStock: true,
    ingredients: ["Carbonated Water", "Sugar", "Lemon Flavor", "Citric Acid"],
    nutritionFacts: { calories: "135", fat: "0g", carbs: "34g", protein: "0g" }
  },
  {
    id: 30,
    name: "Union Suave Yerba Mate",
    category: "Beverages & Coffee",
    description: "Smooth flavored traditional South American tea",
    longDescription: "A mild and balanced Yerba Mate, perfect for those who prefer a less bitter taste. Cultivated with traditional methods for maximum quality.",
    price: "$11.99",
    images: ["/images/276.png"],
    origin: "Argentina",
    weight: "500g",
    inStock: true,
    ingredients: ["Yerba Mate with Stems"],
    nutritionFacts: { calories: "0", fat: "0", carbs: "0", protein: "0" }
  },
  {
    id: 31,
    name: "Podravka Chicken Soup",
    category: "Soups & Meals",
    description: "Clear chicken soup with noodles",
    longDescription: "Hönssopa is a classic comfort food. A delicate chicken broth paired with fine egg noodles that's ready in just five minutes.",
    price: "$3.49",
    images: ["/images/20.png"],
    origin: "Croatia",
    weight: "62g",
    inStock: true,
    ingredients: ["Egg Noodles", "Chicken Fat & Meat", "Dried Vegetables", "Spices"],
    nutritionFacts: { calories: "60 per serving", fat: "1g", carbs: "10g", protein: "2g" }
  },
  {
    id: 32,
    name: "Mia Food Purple Olives",
    category: "Pantry & Spreads",
    description: "Cracked purple olives in bucket",
    longDescription: "Large purple olives, gently cracked and marinated in a traditional Mediterranean brine. Rich, buttery flavor with a firm texture.",
    price: "$19.99",
    images: ["/images/272.png"],
    origin: "Mediterranean",
    weight: "2kg",
    inStock: true,
    ingredients: ["Purple Olives", "Water", "Salt", "Citric Acid"],
    nutritionFacts: { calories: "45 per serving", fat: "4g", carbs: "1g", protein: "0g" }
  },
  {
    id: 33,
    name: "Afnan Spicy Harissa",
    category: "Pantry & Spreads",
    description: "Traditional hot chili pepper paste",
    longDescription: "A bold and fiery Harissa paste preserved in a large service bucket. Perfect for restaurants or spice lovers, made from premium sun-dried chilies.",
    price: "$17.99",
    images: ["/images/274.png"],
    origin: "Middle East / Balkans",
    weight: "2kg",
    inStock: true,
    ingredients: ["Hot Red Peppers", "Garlic", "Coriander", "Cumin", "Oil"],
    nutritionFacts: { calories: "60 per serving", fat: "3g", carbs: "6g", protein: "1g" }
  },
  {
    id: 34,
    name: "Elmas Sunflower Seeds",
    category: "Snacks & Sweets",
    description: "Roasted and salted sunflower seeds",
    longDescription: "Premium striped sunflower seeds, expertly roasted to bring out their nutty flavor and lightly salted for the perfect snack experience.",
    price: "$3.99",
    images: ["/images/275.png"],
    origin: "Europe",
    weight: "250g",
    inStock: true,
    ingredients: ["Sunflower Seeds", "Salt"],
    nutritionFacts: { calories: "180 per serving", fat: "14g", carbs: "6g", protein: "7g" }
  },
  {
    id: 35,
    name: "Gulcan Pickled Cucumbers",
    category: "Pantry & Spreads",
    description: "Small crunchy gherkins in brine",
    longDescription: "Extra crunchy baby cucumbers pickled in a traditional vinegar brine with garlic and dill. The perfect side for any Balkan BBQ.",
    price: "$7.99",
    images: ["/images/265.png"],
    origin: "Turkey",
    weight: "680g",
    inStock: true,
    ingredients: ["Cucumbers", "Water", "Vinegar", "Garlic", "Dill"],
    nutritionFacts: { calories: "15 per serving", fat: "0g", carbs: "3g", protein: "0g" }
  }
];

export const getProductById = (id: number) => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getCategories = () => {
  return Array.from(new Set(products.map(p => p.category)));
};
