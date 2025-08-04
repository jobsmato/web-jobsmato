"use client";

import { useEffect, useRef, useState } from 'react';

const IndiaMap = () => {
  const mapRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Comprehensive job data for all Indian states and union territories
  const jobData = {
    "Andhra Pradesh": [
      { title: "Software Engineer", company: "Vizag Tech", type: "Full-time", id: 1 },
      { title: "Data Analyst", company: "AP Analytics", type: "Full-time", id: 2 },
      { title: "Civil Engineer", company: "Coastal Constructions", type: "Full-time", id: 3 },
      { title: "Agricultural Officer", company: "FarmTech Solutions", type: "Full-time", id: 4 },
      { title: "Marine Engineer", company: "Port Authority", type: "Full-time", id: 5 },
      { title: "Pharma Researcher", company: "BioMed Labs", type: "Contract", id: 6 },
    ],
    "Arunachal Pradesh": [
      { title: "Forest Officer", company: "Nature Conservancy", type: "Full-time", id: 7 },
      { title: "Tourism Guide", company: "Mountain Adventures", type: "Part-time", id: 8 },
      { title: "Hydro Engineer", company: "Power Grid Corp", type: "Full-time", id: 9 },
      { title: "Border Security", company: "Defense Services", type: "Full-time", id: 10 },
      { title: "Environmental Scientist", company: "EcoWatch", type: "Contract", id: 11 },
    ],
    "Assam": [
      { title: "Tea Plantation Manager", company: "Assam Tea Co.", type: "Full-time", id: 12 },
      { title: "Oil Refinery Engineer", company: "Indian Oil", type: "Full-time", id: 13 },
      { title: "Cultural Researcher", company: "Heritage Foundation", type: "Contract", id: 14 },
      { title: "Silk Production Specialist", company: "Muga Silk Mills", type: "Full-time", id: 15 },
      { title: "Wildlife Photographer", company: "Kaziranga Media", type: "Freelance", id: 16 },
    ],
    "Bihar": [
      { title: "Education Coordinator", company: "Skill Development", type: "Full-time", id: 17 },
      { title: "Agricultural Engineer", company: "Bihar Agro", type: "Full-time", id: 18 },
      { title: "Social Worker", company: "Rural Development", type: "Full-time", id: 19 },
      { title: "Mining Engineer", company: "Coal India", type: "Full-time", id: 20 },
      { title: "Healthcare Worker", company: "Public Health", type: "Full-time", id: 21 },
    ],
    "Chhattisgarh": [
      { title: "Mining Engineer", company: "Steel Authority", type: "Full-time", id: 22 },
      { title: "Forest Ranger", company: "Forest Department", type: "Full-time", id: 23 },
      { title: "Tribal Welfare Officer", company: "Social Justice", type: "Full-time", id: 24 },
      { title: "Power Plant Operator", company: "NTPC", type: "Full-time", id: 25 },
      { title: "Rice Mill Supervisor", company: "Agro Industries", type: "Full-time", id: 26 },
    ],
    "Goa": [
      { title: "Hotel Manager", company: "Beach Resorts", type: "Full-time", id: 27 },
      { title: "Casino Dealer", company: "Gaming Corp", type: "Part-time", id: 28 },
      { title: "Marine Biologist", company: "Ocean Research", type: "Contract", id: 29 },
      { title: "Tour Operator", company: "Goa Tourism", type: "Full-time", id: 30 },
      { title: "Iron Ore Analyst", company: "Mining Solutions", type: "Full-time", id: 31 },
    ],
    "Gujarat": [
      { title: "Chemical Engineer", company: "Reliance Industries", type: "Full-time", id: 32 },
      { title: "Textile Designer", company: "Fabric Mills", type: "Full-time", id: 33 },
      { title: "Port Operations Manager", company: "JNPT", type: "Full-time", id: 34 },
      { title: "Petrochemical Analyst", company: "ONGC", type: "Full-time", id: 35 },
      { title: "Diamond Cutter", company: "Gem Palace", type: "Contract", id: 36 },
      { title: "Solar Engineer", company: "Green Energy", type: "Full-time", id: 37 },
    ],
    "Haryana": [
      { title: "Automobile Engineer", company: "Maruti Suzuki", type: "Full-time", id: 38 },
      { title: "Agricultural Specialist", company: "Punjab Kesari", type: "Full-time", id: 39 },
      { title: "Sports Coach", company: "Olympic Training", type: "Full-time", id: 40 },
      { title: "IT Support", company: "Gurgaon Tech", type: "Full-time", id: 41 },
      { title: "Dairy Farm Manager", company: "Milk Cooperative", type: "Full-time", id: 42 },
    ],
    "Himachal Pradesh": [
      { title: "Hydroelectric Engineer", company: "HP Power Corp", type: "Full-time", id: 43 },
      { title: "Apple Orchard Manager", company: "Hill Fruits", type: "Seasonal", id: 44 },
      { title: "Adventure Sports Guide", company: "Mountain Adventures", type: "Part-time", id: 45 },
      { title: "Snow Leopard Researcher", company: "Wildlife Trust", type: "Contract", id: 46 },
      { title: "Hotel Manager", company: "Hill Station Resorts", type: "Full-time", id: 47 },
    ],
    "Jharkhand": [
      { title: "Mining Engineer", company: "Tata Steel", type: "Full-time", id: 48 },
      { title: "Tribal Affairs Officer", company: "State Government", type: "Full-time", id: 49 },
      { title: "Coal Quality Analyst", company: "Coal India", type: "Full-time", id: 50 },
      { title: "Forest Conservation", company: "Environmental Board", type: "Full-time", id: 51 },
      { title: "Heavy Machinery Operator", company: "Industrial Corp", type: "Full-time", id: 52 },
    ],
    "Karnataka": [
      { title: "Software Engineer", company: "Infosys", type: "Full-time", id: 53 },
      { title: "Aerospace Engineer", company: "HAL", type: "Full-time", id: 54 },
      { title: "Coffee Plantation Manager", company: "Coorg Coffee", type: "Full-time", id: 55 },
      { title: "Biotechnology Researcher", company: "Biocon", type: "Full-time", id: 56 },
      { title: "Silk Weaving Specialist", company: "Karnataka Silk", type: "Contract", id: 57 },
      { title: "Data Scientist", company: "Flipkart", type: "Full-time", id: 58 },
    ],
    "Kerala": [
      { title: "Spice Trader", company: "Kerala Spices", type: "Full-time", id: 59 },
      { title: "Coconut Oil Producer", company: "Tropical Oils", type: "Full-time", id: 60 },
      { title: "Ayurveda Practitioner", company: "Wellness Center", type: "Full-time", id: 61 },
      { title: "Backwater Tour Guide", company: "Kerala Tourism", type: "Part-time", id: 62 },
      { title: "Marine Fisheries Officer", company: "Coastal Development", type: "Full-time", id: 63 },
      { title: "Rubber Plantation Manager", company: "Rubber Board", type: "Full-time", id: 64 },
    ],
    "Madhya Pradesh": [
      { title: "Diamond Mining Engineer", company: "Panna Mines", type: "Full-time", id: 65 },
      { title: "Tiger Conservation Officer", company: "Wildlife Sanctuary", type: "Full-time", id: 66 },
      { title: "Soybean Processing", company: "Agro Industries", type: "Full-time", id: 67 },
      { title: "Textile Worker", company: "Handloom Board", type: "Full-time", id: 68 },
      { title: "Archaeological Researcher", company: "Heritage Department", type: "Contract", id: 69 },
    ],
    "Maharashtra": [
      { title: "Financial Analyst", company: "Mumbai Stock Exchange", type: "Full-time", id: 70 },
      { title: "Film Production Assistant", company: "Bollywood Studios", type: "Contract", id: 71 },
      { title: "Sugar Mill Supervisor", company: "Cooperative Sugar", type: "Full-time", id: 72 },
      { title: "Automobile Engineer", company: "Tata Motors", type: "Full-time", id: 73 },
      { title: "Wine Production Manager", company: "Nashik Vineyards", type: "Full-time", id: 74 },
      { title: "Software Developer", company: "TCS", type: "Full-time", id: 75 },
    ],
    "Manipur": [
      { title: "Handloom Weaver", company: "Manipur Textiles", type: "Full-time", id: 76 },
      { title: "Organic Farmer", company: "Hill Agriculture", type: "Full-time", id: 77 },
      { title: "Cultural Performer", company: "Arts Council", type: "Part-time", id: 78 },
      { title: "Border Security Personnel", company: "BSF", type: "Full-time", id: 79 },
      { title: "Bamboo Craft Artisan", company: "Handicrafts Board", type: "Contract", id: 80 },
    ],
    "Meghalaya": [
      { title: "Coal Mining Supervisor", company: "Meghalaya Minerals", type: "Full-time", id: 81 },
      { title: "Tourism Officer", company: "Living Root Bridges", type: "Full-time", id: 82 },
      { title: "Rain Forest Researcher", company: "Climate Studies", type: "Contract", id: 83 },
      { title: "Orange Cultivation Expert", company: "Khasi Hills Fruits", type: "Full-time", id: 84 },
      { title: "Traditional Music Teacher", company: "Cultural Academy", type: "Part-time", id: 85 },
    ],
    "Mizoram": [
      { title: "Bamboo Products Manager", company: "Mizoram Bamboo", type: "Full-time", id: 86 },
      { title: "Border Trade Officer", company: "Customs Department", type: "Full-time", id: 87 },
      { title: "Jhum Cultivation Advisor", company: "Agricultural Extension", type: "Full-time", id: 88 },
      { title: "Church Administrator", company: "Presbyterian Church", type: "Full-time", id: 89 },
      { title: "Handloom Designer", company: "Puan Textiles", type: "Contract", id: 90 },
    ],
    "Nagaland": [
      { title: "Tribal Council Coordinator", company: "Village Administration", type: "Full-time", id: 91 },
      { title: "Hornbill Festival Organizer", company: "Tourism Board", type: "Seasonal", id: 92 },
      { title: "Organic Spice Farmer", company: "Naga Spices", type: "Full-time", id: 93 },
      { title: "Handicraft Artisan", company: "Tribal Arts", type: "Contract", id: 94 },
      { title: "Border Security Officer", company: "Assam Rifles", type: "Full-time", id: 95 },
    ],
    "Odisha": [
      { title: "Steel Plant Engineer", company: "SAIL", type: "Full-time", id: 96 },
      { title: "Temple Restoration Expert", company: "Archaeological Survey", type: "Contract", id: 97 },
      { title: "Fisheries Development Officer", company: "Marine Department", type: "Full-time", id: 98 },
      { title: "Handloom Weaver", company: "Sambalpuri Textiles", type: "Full-time", id: 99 },
      { title: "Cyclone Warning Officer", company: "Meteorological Department", type: "Full-time", id: 100 },
    ],
    "Punjab": [
      { title: "Agricultural Engineer", company: "Punjab Agro", type: "Full-time", id: 101 },
      { title: "Wheat Processing Manager", company: "Food Corporation", type: "Full-time", id: 102 },
      { title: "Sports Equipment Manufacturer", company: "Jalandhar Sports", type: "Full-time", id: 103 },
      { title: "Dairy Farm Supervisor", company: "Milk Union", type: "Full-time", id: 104 },
      { title: "Textile Exporter", company: "Ludhiana Mills", type: "Full-time", id: 105 },
    ],
    "Rajasthan": [
      { title: "Desert Tourism Guide", company: "Rajasthan Tourism", type: "Part-time", id: 106 },
      { title: "Marble Mining Engineer", company: "Makrana Marble", type: "Full-time", id: 107 },
      { title: "Camel Breeding Specialist", company: "Desert Research", type: "Full-time", id: 108 },
      { title: "Handicraft Designer", company: "Royal Arts", type: "Contract", id: 109 },
      { title: "Solar Energy Engineer", company: "Desert Solar", type: "Full-time", id: 110 },
      { title: "Palace Heritage Manager", company: "Hotel Heritage", type: "Full-time", id: 111 },
    ],
    "Sikkim": [
      { title: "Organic Tea Garden Manager", company: "Himalayan Tea", type: "Full-time", id: 112 },
      { title: "Monastery Administrator", company: "Buddhist Council", type: "Full-time", id: 113 },
      { title: "Cardamom Cultivation Expert", company: "Spice Board", type: "Full-time", id: 114 },
      { title: "Mountain Climbing Guide", company: "Adventure Sports", type: "Seasonal", id: 115 },
      { title: "Hydroelectric Technician", company: "Sikkim Power", type: "Full-time", id: 116 },
    ],
    "Tamil Nadu": [
      { title: "Automobile Engineer", company: "Chennai Motors", type: "Full-time", id: 117 },
      { title: "Textile Mill Supervisor", company: "Coimbatore Mills", type: "Full-time", id: 118 },
      { title: "Temple Sculptor", company: "Bronze Arts", type: "Contract", id: 119 },
      { title: "Software Developer", company: "IT Corridor", type: "Full-time", id: 120 },
      { title: "Marine Engineer", company: "Chennai Port", type: "Full-time", id: 121 },
      { title: "Classical Music Teacher", company: "Carnatic Academy", type: "Part-time", id: 122 },
    ],
    "Telangana": [
      { title: "IT Consultant", company: "Cyberabad Tech", type: "Full-time", id: 123 },
      { title: "Pharmaceutical Researcher", company: "Genome Valley", type: "Full-time", id: 124 },
      { title: "Rice Research Scientist", company: "ICRISAT", type: "Full-time", id: 125 },
      { title: "Biotechnology Analyst", company: "Life Sciences", type: "Full-time", id: 126 },
      { title: "Cloud Architect", company: "Microsoft", type: "Full-time", id: 127 },
    ],
    "Tripura": [
      { title: "Bamboo Craftsperson", company: "Tripura Handicrafts", type: "Full-time", id: 128 },
      { title: "Tea Garden Supervisor", company: "Hill Tea Estate", type: "Full-time", id: 129 },
      { title: "Border Trade Facilitator", company: "Bangladesh Trade", type: "Full-time", id: 130 },
      { title: "Tribal Welfare Officer", company: "Social Welfare", type: "Full-time", id: 131 },
      { title: "Rubber Tapping Supervisor", company: "Plantation Board", type: "Full-time", id: 132 },
    ],
    "Uttar Pradesh": [
      { title: "Carpet Weaver", company: "Bhadohi Carpets", type: "Full-time", id: 133 },
      { title: "Leather Craftsman", company: "Kanpur Leather", type: "Full-time", id: 134 },
      { title: "Government Officer", company: "UP Administration", type: "Full-time", id: 135 },
      { title: "Sugar Mill Engineer", company: "Cooperative Sugar", type: "Full-time", id: 136 },
      { title: "Heritage Guide", company: "Taj Mahal Tourism", type: "Part-time", id: 137 },
      { title: "Agricultural Extension Worker", company: "Krishi Vigyan", type: "Full-time", id: 138 },
    ],
    "Uttarakhand": [
      { title: "Forest Conservation Officer", company: "Forest Department", type: "Full-time", id: 139 },
      { title: "Yoga Instructor", company: "Rishikesh Ashram", type: "Part-time", id: 140 },
      { title: "Hydroelectric Engineer", company: "THDC", type: "Full-time", id: 141 },
      { title: "Adventure Sports Guide", company: "River Rafting", type: "Seasonal", id: 142 },
      { title: "Medicinal Plant Researcher", company: "Ayurveda Institute", type: "Contract", id: 143 },
    ],
    "West Bengal": [
      { title: "Jute Mill Worker", company: "Bengal Jute", type: "Full-time", id: 144 },
      { title: "Tea Taster", company: "Darjeeling Tea", type: "Full-time", id: 145 },
      { title: "Film Industry Technician", company: "Tollywood", type: "Contract", id: 146 },
      { title: "Fish Market Vendor", company: "Howrah Fish Market", type: "Full-time", id: 147 },
      { title: "Handloom Weaver", company: "Tant Saree", type: "Full-time", id: 148 },
      { title: "IT Professional", company: "Salt Lake Tech", type: "Full-time", id: 149 },
    ],
    "Delhi": [
      { title: "Government Policy Advisor", company: "Central Government", type: "Full-time", id: 150 },
      { title: "Metro Operations Manager", company: "Delhi Metro", type: "Full-time", id: 151 },
      { title: "Media Journalist", company: "News Broadcasting", type: "Full-time", id: 152 },
      { title: "Heritage Conservation", company: "Red Fort Authority", type: "Contract", id: 153 },
      { title: "Tech Startup Founder", company: "Delhi Innovation", type: "Full-time", id: 154 },
      { title: "Air Quality Analyst", company: "Pollution Board", type: "Full-time", id: 155 },
    ],
    "Chandigarh": [
      { title: "Urban Planner", company: "City Administration", type: "Full-time", id: 156 },
      { title: "Rose Garden Curator", company: "Horticulture Department", type: "Full-time", id: 157 },
      { title: "Rock Garden Artist", company: "Tourism Board", type: "Contract", id: 158 },
      { title: "Medical Equipment Technician", company: "PGI Hospital", type: "Full-time", id: 159 },
      { title: "Architecture Consultant", company: "Le Corbusier Foundation", type: "Contract", id: 160 },
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
      { title: "Beach Resort Manager", company: "Coastal Tourism", type: "Full-time", id: 161 },
      { title: "Fishing Boat Captain", company: "Marine Fisheries", type: "Full-time", id: 162 },
      { title: "Salt Production Supervisor", company: "Salt Works", type: "Full-time", id: 163 },
      { title: "Portuguese Heritage Guide", company: "Cultural Tourism", type: "Part-time", id: 164 },
      { title: "Liquor Production Manager", company: "Distillery", type: "Full-time", id: 165 },
    ],
    "Lakshadweep": [
      { title: "Coral Reef Researcher", company: "Marine Institute", type: "Contract", id: 166 },
      { title: "Coconut Coir Producer", company: "Island Cooperatives", type: "Full-time", id: 167 },
      { title: "Scuba Diving Instructor", company: "Water Sports", type: "Part-time", id: 168 },
      { title: "Lagoon Tour Guide", company: "Island Tourism", type: "Seasonal", id: 169 },
      { title: "Fisheries Development Officer", company: "Marine Department", type: "Full-time", id: 170 },
    ],
    "Puducherry": [
      { title: "French Cultural Coordinator", company: "French Institute", type: "Full-time", id: 171 },
      { title: "Auroville Community Manager", company: "Auroville Foundation", type: "Full-time", id: 172 },
      { title: "Textile Heritage Specialist", company: "Handloom Board", type: "Contract", id: 173 },
      { title: "Beach Tourism Coordinator", company: "Tourism Department", type: "Full-time", id: 174 },
      { title: "Spiritual Retreat Organizer", company: "Ashram Management", type: "Part-time", id: 175 },
    ],
    "Andaman and Nicobar Islands": [
      { title: "Marine Biologist", company: "Island Research", type: "Full-time", id: 176 },
      { title: "Naval Base Administrator", company: "Indian Navy", type: "Full-time", id: 177 },
      { title: "Tribal Welfare Officer", company: "Island Administration", type: "Full-time", id: 178 },
      { title: "Underwater Photography", company: "Adventure Tourism", type: "Freelance", id: 179 },
      { title: "Coconut Plantation Manager", company: "Agricultural Department", type: "Full-time", id: 180 },
    ],
    "Jammu and Kashmir": [
      { title: "Saffron Cultivation Expert", company: "Kashmir Spices", type: "Full-time", id: 181 },
      { title: "Handicraft Artisan", company: "Kashmir Arts", type: "Contract", id: 182 },
      { title: "Ski Resort Manager", company: "Gulmarg Tourism", type: "Seasonal", id: 183 },
      { title: "Apple Orchard Supervisor", company: "Hill Fruits", type: "Full-time", id: 184 },
      { title: "Border Security Personnel", company: "CRPF", type: "Full-time", id: 185 },
    ],
    "Ladakh": [
      { title: "High Altitude Research", company: "Mountain Institute", type: "Contract", id: 186 },
      { title: "Buddhist Monastery Guide", company: "Cultural Tourism", type: "Part-time", id: 187 },
      { title: "Adventure Trekking Guide", company: "Himalayan Adventures", type: "Seasonal", id: 188 },
      { title: "Solar Energy Technician", company: "Renewable Energy", type: "Full-time", id: 189 },
      { title: "Yak Herding Specialist", company: "Pastoral Development", type: "Full-time", id: 190 },
    ]
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // State coordinates mapping for geolocation
  const stateCoordinates = {
    "Andhra Pradesh": { lat: 15.9129, lng: 79.7400 },
    "Arunachal Pradesh": { lat: 28.2180, lng: 94.7278 },
    "Assam": { lat: 26.2006, lng: 92.9376 },
    "Bihar": { lat: 25.0961, lng: 85.3131 },
    "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
    "Goa": { lat: 15.2993, lng: 74.1240 },
    "Gujarat": { lat: 23.0225, lng: 72.5714 },
    "Haryana": { lat: 29.0588, lng: 76.0856 },
    "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
    "Jharkhand": { lat: 23.6102, lng: 85.2799 },
    "Karnataka": { lat: 15.3173, lng: 75.7139 },
    "Kerala": { lat: 10.8505, lng: 76.2711 },
    "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
    "Maharashtra": { lat: 19.7515, lng: 75.7139 },
    "Manipur": { lat: 24.6637, lng: 93.9063 },
    "Meghalaya": { lat: 25.4670, lng: 91.3662 },
    "Mizoram": { lat: 23.1645, lng: 92.9376 },
    "Nagaland": { lat: 26.1584, lng: 94.5624 },
    "Odisha": { lat: 20.9517, lng: 85.0985 },
    "Punjab": { lat: 31.1471, lng: 75.3412 },
    "Rajasthan": { lat: 27.0238, lng: 74.2179 },
    "Sikkim": { lat: 27.5330, lng: 88.5122 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
    "Telangana": { lat: 18.1124, lng: 79.0193 },
    "Tripura": { lat: 23.9408, lng: 91.9882 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    "Uttarakhand": { lat: 30.0668, lng: 79.0193 },
    "West Bengal": { lat: 22.9868, lng: 87.8550 },
    "Delhi": { lat: 28.7041, lng: 77.1025 },
    "Chandigarh": { lat: 30.7333, lng: 76.7794 },
    "Dadra and Nagar Haveli and Daman and Diu": { lat: 20.1809, lng: 73.0169 },
    "Lakshadweep": { lat: 10.0000, lng: 72.0000 },
    "Puducherry": { lat: 11.9416, lng: 79.8083 },
    "Andaman and Nicobar Islands": { lat: 11.7401, lng: 92.6586 },
    "Jammu and Kashmir": { lat: 33.7782, lng: 76.5762 },
    "Ladakh": { lat: 34.2996, lng: 78.2932 }
  };

  // Function to check if a point is inside a polygon using ray casting algorithm
  const pointInPolygon = (point, polygon) => {
    const [x, y] = point;
    let inside = false;
    
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];
      
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
        inside = !inside;
      }
    }
    
    return inside;
  };

  // Function to extract coordinates from GeoJSON geometry
  const extractCoordinates = (geometry) => {
    if (geometry.type === 'Polygon') {
      return geometry.coordinates[0]; // Outer ring
    } else if (geometry.type === 'MultiPolygon') {
      // Return the largest polygon (by area approximation)
      let largestPolygon = geometry.coordinates[0][0];
      let maxLength = largestPolygon.length;
      
      geometry.coordinates.forEach(polygon => {
        if (polygon[0].length > maxLength) {
          largestPolygon = polygon[0];
          maxLength = polygon[0].length;
        }
      });
      
      return largestPolygon;
    }
    return [];
  };

  // Function to get user's current location and find correct state
  const detectUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          console.log('User location detected:', userLat, userLng);
          
          // Wait for map to be fully loaded before checking state boundaries
          setTimeout(() => {
            findStateByBoundary(userLat, userLng);
          }, 2000); // Increased delay to ensure map is loaded
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          // Silently fail - just show the normal map
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Increased timeout
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // Function to find state by checking actual boundaries
  const findStateByBoundary = (userLat, userLng) => {
    if (!window.d3 || !mapRef.current) {
      console.log('Map not ready yet, using fallback method');
      fallbackNearestState(userLat, userLng);
      return;
    }

    console.log('Checking state boundaries for:', userLat, userLng);
    let foundState = null;
    
    // Check each state's actual boundary
    if (window.mapData) {
      window.mapData.features.forEach(feature => {
        if (feature.geometry && feature.properties) {
          const coordinates = extractCoordinates(feature.geometry);
          
          if (coordinates.length > 0) {
            // Check if user point is inside this state's boundary
            if (pointInPolygon([userLng, userLat], coordinates)) {
              foundState = feature.properties.st_nm;
              console.log('Found state by boundary:', foundState);
            }
          }
        }
      });
    }
    
    if (foundState) {
      console.log('Accurate state detected:', foundState);
      autoZoomToState(foundState);
    } else {
      console.log('No state boundary match, using nearest state fallback');
      fallbackNearestState(userLat, userLng);
    }
  };

  // Fallback method using nearest distance
  const fallbackNearestState = (userLat, userLng) => {
    let nearestState = null;
    let minDistance = Infinity;
    
    Object.entries(stateCoordinates).forEach(([stateName, coords]) => {
      // Use Haversine formula for more accurate distance
      const R = 6371; // Earth's radius in km
      const dLat = (coords.lat - userLat) * Math.PI / 180;
      const dLng = (coords.lng - userLng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(userLat * Math.PI / 180) * Math.cos(coords.lat * Math.PI / 180) * 
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distance in km
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestState = stateName;
      }
    });
    
    if (nearestState) {
      console.log('Fallback nearest state:', nearestState, 'Distance:', minDistance.toFixed(2), 'km');
      autoZoomToState(nearestState);
    }
  };

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    // Load D3 scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadD3AndInitMap = async () => {
      try {
        await loadScript('https://d3js.org/d3.v7.min.js');
        await loadScript('https://d3js.org/topojson.v3.min.js');
        
        // Wait a bit for scripts to initialize
        setTimeout(initializeMap, 100);
      } catch (error) {
        console.error('Error loading D3 scripts:', error);
      }
    };

    const initializeMap = () => {
      if (!window.d3) return;

      const d3 = window.d3;
      const mapContainer = mapRef.current;
      if (!mapContainer) return;

      // Clear any existing content
      d3.select(mapContainer).selectAll("*").remove();

      let width = 800;
      let height = 700;

      const svg = d3.select(mapContainer)
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "100%");

      // Add 3D effect filter and gradients
      const defs = svg.append("defs");
      
      // Create blue gradient for entire map
      const blueGradient = defs.append("linearGradient")
        .attr("id", "blueGradient")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", width)
        .attr("y2", height)
        .attr("gradientUnits", "userSpaceOnUse");
      
      blueGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#dbeafe")
        .attr("stop-opacity", 1);
      
      blueGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#93c5fd")
        .attr("stop-opacity", 1);
      
      blueGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#3b82f6")
        .attr("stop-opacity", 1);

      // Create hover gradient (lighter blue) for entire map
      const hoverGradient = defs.append("linearGradient")
        .attr("id", "hoverGradient")
        .attr("x1", "0")
        .attr("y1", "0")
        .attr("x2", width)
        .attr("y2", height)
        .attr("gradientUnits", "userSpaceOnUse");
      
      hoverGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#f0f9ff")
        .attr("stop-opacity", 1);
      
      hoverGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#bfdbfe")
        .attr("stop-opacity", 1);
      
      hoverGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#60a5fa")
        .attr("stop-opacity", 1);
      
      const filter = defs.append("filter")
        .attr("id", "india-3d-effect")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");

      filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", "4")
        .attr("result", "blur");

      filter.append("feFlood")
        .attr("flood-color", "#add8e6")
        .attr("result", "flood");

      filter.append("feComposite")
        .attr("in", "flood")
        .attr("in2", "blur")
        .attr("operator", "in")
        .attr("result", "coloredBlur");

      filter.append("feOffset")
        .attr("in", "coloredBlur")
        .attr("dx", "3")
        .attr("dy", "3")
        .attr("result", "offsetBlur");

      const merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "offsetBlur");
      merge.append("feMergeNode").attr("in", "SourceGraphic");

      const g = svg.append("g")
        .attr("filter", "url(#india-3d-effect)");

      const projection = d3.geoMercator()
        .scale(1000)
        .center([82.8, 23.4])
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);

      const zoom = d3.zoom()
        .scaleExtent([0.8, 10])
        .on("zoom", zoomed);

      let initialTransform = d3.zoomIdentity;

      // Load India GeoJSON
      const indiaGeoJSONUrl = "https://raw.githubusercontent.com/adarshbiradar/maps-geojson/master/india.json";
      
                      d3.json(indiaGeoJSONUrl).then(function(data) {
          if (data && data.features) {
            // Store map data globally for boundary checking
            window.mapData = data;
            
            g.selectAll("path.state")
              .data(data.features)
              .enter().append("path")
              .attr("class", "state")
              .attr("d", path)
              .style("fill", "url(#blueGradient)")
              .style("stroke", "#ffffff")
              .style("stroke-width", "2px")
              .style("cursor", "pointer")
              .style("transition", "fill 0.3s ease")
                              .on("mouseover", function() {
                  if (!d3.select(this).classed("active")) {
                    d3.select(this).style("fill", "#3b82f6");
                  }
                })
                .on("mouseout", function() {
                  if (!d3.select(this).classed("active")) {
                    d3.select(this).style("fill", "url(#blueGradient)");
                  }
                })
              .on("click", clicked);

            // Calculate initial transform
            const bounds = path.bounds(data);
            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = (bounds[0][1] + bounds[1][1]) / 2;
            const scale = 0.9 / Math.max(dx / width, dy / height);
            const translate = [width / 2 - scale * x, height / 2 - scale * y];

            initialTransform = d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale);
            svg.call(zoom).call(zoom.transform, initialTransform);
            
            // Start location detection after map is loaded
            detectUserLocation();
          }
        }).catch(error => console.error("Error loading GeoJSON data:", error));

      function clicked(event, d) {
        event.stopPropagation();
        
        // Check if this state is already active (zoomed in)
        const isCurrentlyActive = d3.select(this).classed("active");
        
        if (isCurrentlyActive) {
          // If clicking on already active state, zoom out (reset)
          window.resetIndiaMap();
        } else {
          // If clicking on new state, zoom in
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          
          svg.selectAll(".state").classed("active", false).style("fill", "url(#blueGradient)").style("opacity", 1);
          d3.select(this).classed("active", true).style("fill", "#3b82f6");

          // Animate text content upward and hide button
          animateTextContent(true);

          const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height));
          const x = (x0 + x1) / 2;
          const y = (y0 + y1) / 2;
          const newTransform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-x, -y);

          svg.transition().duration(750)
             .call(zoom.transform, newTransform)
             .on("end", () => {
               // Completely hide unselected states and borders after zoom
               svg.selectAll(".state:not(.active)")
                 .transition()
                 .duration(300)
                 .style("opacity", 0)
                 .style("stroke-opacity", 0);
               
               // Hide border of selected state too
               svg.selectAll(".state.active")
                 .transition()
                 .duration(300)
                 .style("stroke-opacity", 0);
               
               const stateName = d.properties.st_nm;
               showJobInfo(stateName);
             });
        }
      }

      function zoomed(event) {
        g.attr("transform", event.transform);
      }

      function showJobInfo(stateName) {
        const jobs = jobData[stateName] || [];
        const jobInfoContainer = document.getElementById('job-info-india-map');
        const jobTableTitle = document.getElementById('job-table-title-india-map');
        const jobListingsBody = document.getElementById('job-listings-india-map');
        
        if (jobInfoContainer && jobTableTitle && jobListingsBody) {
          jobTableTitle.textContent = `Job Openings in ${stateName}`;
          jobListingsBody.innerHTML = "";

          if (jobs.length > 0) {
            jobs.slice(0, 5).forEach((job, index) => {
              const row = document.createElement('tr');
              const typeColor = job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 
                               job.type === 'Remote' ? 'bg-blue-100 text-blue-800' : 
                               job.type === 'Contract' ? 'bg-yellow-100 text-yellow-800' : 
                               'bg-purple-100 text-purple-800';
              
              row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
              row.innerHTML = `
                <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #374151; font-medium;">${job.title}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${job.company}</td>
                <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full ${typeColor}">${job.type}</span>
                </td>
                <td style="padding: 1rem; border-bottom: 1px solid #e5e7eb;">
                  <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200" onclick="alert('Apply for ${job.title} at ${job.company}')">
                    Apply
                  </button>
                </td>
              `;
              jobListingsBody.appendChild(row);
            });
          } else {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" style="padding: 1rem; border-bottom: 1px solid #e5e7eb; color: #6b7280; text-align: center;">No job listings available.</td>`;
            jobListingsBody.appendChild(row);
          }

          jobInfoContainer.style.opacity = '1';
          jobInfoContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
          jobInfoContainer.style.pointerEvents = 'all';
        }
      }

      // Function to animate text content
      function animateTextContent(isZooming) {
        // Target the desktop text container, floating images, and connection lines
        const desktopTextContainer = document.querySelector('.mt-20 .banner-content');
        const desktopButton = document.querySelector('.mt-20 .banner-btn');
        const floatingImages = document.querySelector('.z-10');
        const connectionLines = document.querySelector('svg.z-5');
        
        if (desktopTextContainer && desktopButton) {
          if (isZooming) {
            // Hide text, button, floating images, and connection lines completely
            desktopTextContainer.style.transition = 'opacity 0.75s ease-in-out, transform 0.75s ease-in-out';
            desktopTextContainer.style.opacity = '0';
            desktopTextContainer.style.transform = 'translateY(-100px)';
            desktopButton.style.transition = 'opacity 0.75s ease-in-out, transform 0.75s ease-in-out';
            desktopButton.style.opacity = '0';
            desktopButton.style.transform = 'translateY(-50px)';
            
            if (floatingImages) {
              // Immediately hide images to prevent interference
              floatingImages.style.display = 'none';
              floatingImages.style.opacity = '0';
            }
            
            if (connectionLines) {
              // Immediately hide lines to prevent zoomed dots
              connectionLines.style.display = 'none';
              connectionLines.style.opacity = '0';
              // Also stop all animations
              const allLines = connectionLines.querySelectorAll('line');
              const allCircles = connectionLines.querySelectorAll('circle');
              allLines.forEach(line => {
                line.style.display = 'none';
              });
              allCircles.forEach(circle => {
                circle.style.display = 'none';
              });
            }
          } else {
            // Show text, button, floating images, and connection lines
            desktopTextContainer.style.transition = 'opacity 0.75s ease-in-out, transform 0.75s ease-in-out';
            desktopTextContainer.style.opacity = '1';
            desktopTextContainer.style.transform = 'translateY(0)';
            desktopButton.style.transition = 'opacity 0.75s ease-in-out, transform 0.75s ease-in-out';
            desktopButton.style.opacity = '1';
            desktopButton.style.transform = 'translateY(0)';
            
            if (floatingImages) {
              // Show images first, then fade in
              floatingImages.style.display = 'block';
              floatingImages.style.transition = 'opacity 0.75s ease-in-out';
              floatingImages.style.opacity = '1';
            }
            
            if (connectionLines) {
              // Show lines and their children first, then fade in
              connectionLines.style.display = 'block';
              const allLines = connectionLines.querySelectorAll('line');
              const allCircles = connectionLines.querySelectorAll('circle');
              allLines.forEach(line => {
                line.style.display = 'block';
              });
              allCircles.forEach(circle => {
                circle.style.display = 'block';
              });
              connectionLines.style.transition = 'opacity 0.75s ease-in-out';
              connectionLines.style.opacity = '1';
            }
          }
        }
      }

      // Auto-zoom to state function
      function autoZoomToState(stateName) {
        console.log('Auto-zooming to state:', stateName);
        
        // Find the state in the map data using D3 selection
        let targetStateElement = null;
        let targetStateData = null;
        
        g.selectAll(".state").each(function(d) {
          if (d && d.properties && d.properties.st_nm === stateName) {
            targetStateElement = this;
            targetStateData = d;
          }
        });
        
        if (targetStateElement && targetStateData) {
          const [[x0, y0], [x1, y1]] = path.bounds(targetStateData);
          
          // Clear previous selections and set new active state
          svg.selectAll(".state").classed("active", false).style("fill", "url(#blueGradient)").style("opacity", 1);
          d3.select(targetStateElement).classed("active", true).style("fill", "#3b82f6");

          // Animate text content upward and hide button
          animateTextContent(true);

          const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height));
          const x = (x0 + x1) / 2;
          const y = (y0 + y1) / 2;
          const newTransform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-x, -y);

          svg.transition().duration(1000) // Slightly longer for auto-zoom
             .call(zoom.transform, newTransform)
             .on("end", () => {
               // Completely hide unselected states and borders after zoom
               svg.selectAll(".state:not(.active)")
                 .transition()
                 .duration(300)
                 .style("opacity", 0)
                 .style("stroke-opacity", 0);
               
               // Hide border of selected state too
               svg.selectAll(".state.active")
                 .transition()
                 .duration(300)
                 .style("stroke-opacity", 0);
               
               showJobInfo(stateName);
             });
        } else {
          console.log('State not found in map data:', stateName);
          console.log('Available states:', []);
          // Log available states for debugging
          g.selectAll(".state").each(function(d) {
            if (d && d.properties && d.properties.st_nm) {
              console.log('Found state:', d.properties.st_nm);
            }
          });
        }
      }

      // Reset functionality
      window.resetIndiaMap = function() {
        svg.selectAll(".state")
          .classed("active", false)
          .style("fill", "url(#blueGradient)")
          .transition()
          .duration(300)
          .style("opacity", 1)
          .style("stroke-opacity", 1);
        
        const jobInfoContainer = document.getElementById('job-info-india-map');
        if (jobInfoContainer) {
          jobInfoContainer.style.opacity = '0';
          jobInfoContainer.style.pointerEvents = 'none';
        }
        // Reset text content position and show button
        animateTextContent(false);
        svg.transition().duration(750).call(zoom.transform, initialTransform);
      };

      // Make autoZoomToState available globally
      window.autoZoomToState = autoZoomToState;

      // Function to highlight state on hover from dropdown
      window.highlightStateOnMap = function(stateName) {
        if (!svg || !g) return;
        
        // Reset all states to default color first (only non-active states)
        g.selectAll(".state").each(function(d) {
          if (!d3.select(this).classed("active")) {
            d3.select(this)
              .style("fill", "url(#blueGradient)")
              .style("stroke", "#ffffff")
              .style("stroke-width", "2px");
          }
        });
        
        // Find and highlight the target state (same color as selected state)
        g.selectAll(".state").each(function(d) {
          if (d && d.properties && d.properties.st_nm === stateName) {
            if (!d3.select(this).classed("active")) {
              d3.select(this)
                .style("fill", "#3b82f6")
                .style("stroke", "#ffffff")
                .style("stroke-width", "2px");
            }
          }
        });
      };

      // Function to remove state highlight
      window.removeStateHighlight = function() {
        if (!svg || !g) return;
        
        // Reset all states to default unless they are active (zoomed)
        g.selectAll(".state").each(function(d) {
          if (!d3.select(this).classed("active")) {
            d3.select(this)
              .style("fill", "url(#blueGradient)")
              .style("stroke", "#ffffff")
              .style("stroke-width", "2px");
          }
        });
      };
    };

    loadD3AndInitMap();

    return () => {
      // Cleanup
      if (window.resetIndiaMap) {
        delete window.resetIndiaMap;
      }
    };
  }, [isClient]);

  if (!isClient) {
    return <div className="w-full h-full bg-transparent"></div>;
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full bg-transparent" />
      
      {/* Job Info Container */}
              <div
          id="job-info-india-map"
          className="absolute bottom-4 left-[-600px] bg-white rounded-xl shadow-2xl p-6 w-[960px] transition-all duration-500 z-[9998]"
        style={{
          opacity: 0,
          transform: 'perspective(1000px) rotateY(5deg) rotateX(5deg)',
          pointerEvents: 'none',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 15px 35px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Back Button - Top Right of Job Card */}
        <button 
          onClick={() => window.resetIndiaMap && window.resetIndiaMap()}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 px-3 py-2 rounded-lg cursor-pointer text-sm transition-all duration-300 z-[9999] flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        <h3 
          id="job-table-title-india-map" 
          className="mt-0 mb-4 text-gray-800 border-b border-gray-200 pb-2 pr-20"
        >
          Job Openings
        </h3>
        <table className="w-full border-collapse text-base">
          <thead>
            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <th className="text-left py-4 px-4 text-gray-700 font-semibold border-b-2 border-blue-200 w-1/3">Position</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold border-b-2 border-blue-200 w-1/3">Company</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold border-b-2 border-blue-200 w-1/6">Type</th>
              <th className="text-left py-4 px-4 text-gray-700 font-semibold border-b-2 border-blue-200 w-1/6">Apply</th>
            </tr>
          </thead>
          <tbody id="job-listings-india-map">
            {/* Job rows will be inserted here dynamically */}
          </tbody>
        </table>
        <button 
          onClick={() => alert("Functionality to show more jobs would be implemented here!")}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 border-none rounded-lg cursor-pointer text-base transition-all duration-300"
        >
          Show more jobs in this state
        </button>
      </div>
    </div>
  );
};

export default IndiaMap; 