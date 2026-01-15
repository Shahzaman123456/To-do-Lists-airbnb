const sampleListings = [
  {
    title: "Cozy Apartment in Downtown",
    description: "A modern and cozy apartment located in the heart of the city.",
    price: 1200,
    image: {
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=870&auto=format",
      filename: "Cozy_Apartment_in_Downtown",
    },
    location: "Downtown, New York",
    country: "USA",
    category: "rooms",
    geometry: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
    },
  },

  {
    title: "Beachfront Villa",
    description: "Spacious villa with a stunning view of the ocean.",
    price: 350,
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format",
      filename: "Beachfront_Villa",
    },
    location: "Malibu",
    country: "USA",
    category: "pools",
    geometry: {
      type: "Point",
      coordinates: [-118.7798, 34.0259],
    },
  },

  {
    title: "Mountain Cabin Retreat",
    description: "Rustic cabin in the mountains.",
    price: 80,
    image: {
      url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?q=80&w=1200&auto=format",
      filename: "Mountain_Cabin_Retreat",
    },
    location: "Aspen, Colorado",
    country: "USA",
    category: "mountains",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911],
    },
  },

  {
    title: "City Center Loft",
    description: "Spacious loft apartment in the city center.",
    price: 150,
    image: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format",
      filename: "City_Center_Loft",
    },
    location: "London",
    country: "UK",
    category: "iconic cities",
    geometry: {
      type: "Point",
      coordinates: [-0.1276, 51.5072],
    },
  },

  {
    title: "Tropical Bungalow",
    description: "Bungalow in a tropical paradise.",
    price: 200,
    image: {
      url: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1200&auto=format",
      filename: "Tropical_Bungalow",
    },
    location: "Bali",
    country: "Indonesia",
    category: "trending",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095],
    },
  },

  {
    title: "Ski Resort Apartment",
    description: "Apartment near ski slopes.",
    price: 250,
    image: {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format",
      filename: "Ski_Resort_Apartment",
    },
    location: "Zermatt",
    country: "Switzerland",
    category: "mountains",
    geometry: {
      type: "Point",
      coordinates: [7.7491, 46.0207],
    },
  },
];

export default sampleListings;
