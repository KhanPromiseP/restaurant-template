const axios = require('axios');

// Comprehensive knowledge base with all restaurant information
const knowledgeBase = {
  // Basic restaurant info
  basic: {
    name: "Gastronomique",
    type: "Michelin-starred fine dining restaurant",
    location: "123 Gourmet Avenue, Culinary District, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "reservations@gastronomique.com",
    description: "World-class, Michelin-starred fine dining restaurant in NYC known for innovative culinary creations, elegant ambiance, and exceptional service."
  },
  
  // Hours and operations
  hours: {
    weekday: "Monday to Friday: 9:00 AM - 10:00 PM",
    weekend: "Saturday & Sunday: 11:00 AM - 10:00 PM",
    happyHour: "4-6 PM daily with 20% off cocktails and select wines",
    brunch: "Saturday & Sunday 11:00 AM - 2:00 PM"
  },
  
  // Menu items categorized
  menu: {
    starters: [
      "Seared Scallops with citrus beurre blanc",
      "Foie Gras Torchon with fig compote",
      "Truffle Arancini with parmesan foam"
    ],
    mains: [
      "Filet Mignon with red wine reduction",
      "Lobster Thermidor with saffron risotto", 
      "Duck Confit with black cherry gastrique",
      "Vegetarian & Vegan options available"
    ],
    desserts: [
      "Chocolate Soufflé with Grand Marnier sauce",
      "Crème Brûlée infused with Madagascar vanilla", 
      "Seasonal Sorbets made from local fruits"
    ],
    beverages: [
      "Extensive wine list curated by sommelier",
      "Craft cocktails using seasonal ingredients",
      "Rare spirits and Champagne selections"
    ]
  },
  
  // Pricing information
  pricing: {
    tastingMenu: "$185 per person",
    winePairing: "+$95 per person",
    note: "24-hour advance reservation recommended"
  },
  
  // Special features and services
  features: [
    "Private dining rooms for up to 20 guests",
    "Seasonal tasting menus updated monthly",
    "Cooking classes with Executive Chef John Smith",
    "Wine tasting events every Friday evening",
    "Chef's table experience"
  ],
  
  // Policies and requirements
  policies: {
    reservations: "Advance reservations strongly recommended",
    cancellation: "24-hour cancellation policy",
    dressCode: "Business casual, formal attire encouraged for evenings",
    dietary: "Special dietary requests accommodated with advance notice"
  },
  
  // Awards and recognition
  awards: [
    "Michelin Guide 2025 (2 Stars)",
    "World's 50 Best Restaurants 2024",
    "Wine Spectator Award of Excellence 2024", 
    "James Beard Award Finalist 2024",
    "AAA Five Diamond Award Recipient"
  ],
  
  // Sustainability and philosophy
  sustainability: {
    philosophy: "Provide unforgettable sensory experience combining taste, presentation, and service",
    practices: [
      "Source ingredients from local farms and sustainable suppliers",
      "Use seasonal and organic ingredients",
      "Reduce food waste and support ethical practices"
    ]
  },
  
  // History and timeline
  history: {
    2008: "Humble Beginnings - Opened as small bistro with 12 tables",
    2012: "First Michelin Star - Recognition of culinary excellence", 
    2016: "Expansion - Moved to current historic building location",
    2020: "Second Michelin Star - For innovative tasting menus"
  },
  
  // Contact methods
  contact: {
    phone: "+1 (555) 123-4567",
    email: "reservations@gastronomique.com", 
    address: "123 Gourmet Avenue, Culinary District, NY 10001",
    parking: "Valet and street parking available",
    transit: "Nearby subway: 5th Avenue Station (Line 1)"
  }
};

// Pre-defined responses for common questions
const predefinedResponses = {
  // Greetings
  greetings: [
    "Hello there! 👋 I'm Kelly, your personal assistant at Gastronomique. 🌟 How can I help you with reservations, menu information, or anything else about our Michelin-starred dining experience?",
    "Welcome to Gastronomique! 🍽️ I'm Kelly, delighted to assist you with our restaurant services, menu, or reservations. What can I help you with today?",
    "Hi! 😊 I'm Kelly from Gastronomique, ready to help you discover our Michelin-starred dining experience. How may I assist you?"
  ],
  
  // Hours
  hours: "We're open Monday to Friday from 9:00 AM to 10:00 PM, and Saturday & Sunday from 11:00 AM to 10:00 PM. 🕘 Happy Hour is 4-6 PM daily with 20% off cocktails! Perfect time for a luxurious dining experience!",
  
  // Location
  location: "We're located at 123 Gourmet Avenue, Culinary District, NY 10001. 🗺️ Valet parking is complimentary for all our guests! Nearby subway: 5th Avenue Station.",
  
  // Reservations
  reservations: "Reservations can be made by calling (555) 123-4567 or emailing reservations@gastronomique.com. 📞 We highly recommend booking in advance, especially for weekends! 24-hour cancellation policy applies.",
  
  // Menu
  menu: "Our Michelin-starred menu features exquisite dishes! 🍽️ Starters: Seared Scallops, Foie Gras. Mains: Filet Mignon, Lobster Thermidor. Desserts: Chocolate Soufflé, Crème Brûlée. Full menu available on our website!",
  
  // Pricing
  pricing: "Our Chef's Tasting Menu is $185 per person, with optional wine pairing for $95. 💫 An unforgettable 7-course culinary journey! Special dietary requests accommodated.",
  
  // Contact
  contact: "Reach us at (555) 123-4567 or reservations@gastronomique.com. ✉️ We'd be delighted to assist you personally! You can also visit us at 123 Gourmet Avenue.",
  
  // Dress code
  dresscode: "We maintain a business casual dress code to enhance your dining experience. 👔 Formal attire encouraged for evenings to create the perfect ambiance!",
  
  // Parking
  parking: "Complimentary valet parking is available for all our guests. 🚗 Street parking also available. Your convenience is our priority!",
  
  // Events
  events: "We offer private dining for up to 20 guests and host wine tasting evenings every Friday. 🎊 Perfect for celebrations and corporate events! Cooking classes also available.",
  
  // Awards
  awards: "We're proud of our accolades! 🏆 2 Michelin Stars, World's 50 Best Restaurants 2024, Wine Spectator Award, James Beard Finalist, and AAA Five Diamond Award!",
  
  // Thank you responses
  thanks: [
    "You're very welcome! 😊 Is there anything else I can help you with today?",
    "My pleasure! 🌟 Let me know if you need any other information about Gastronomique!",
    "Happy to help! 🍽️ Feel free to ask if you have any other questions!"
  ],
  
  // Fallback
  default: "I'd be delighted to help with that! 🌟 For detailed information or to make a reservation, please call us at (555) 123-4567. Is there anything else I can assist you with?"
};

// Question-answer mapping for direct responses
const questionMap = {
  // Hours related
  'hour': 'hours',
  'open': 'hours', 
  'time': 'hours',
  'close': 'hours',
  'when': 'hours',
  
  // Location related
  'where': 'location',
  'location': 'location',
  'address': 'location',
  'directions': 'location',
  'map': 'location',
  
  // Reservations
  'reservation': 'reservations',
  'book': 'reservations',
  'table': 'reservations',
  'reserve': 'reservations',
  
  // Menu
  'menu': 'menu',
  'food': 'menu',
  'dish': 'menu',
  'eat': 'menu',
  'drink': 'menu',
  'wine': 'menu',
  
  // Pricing
  'price': 'pricing',
  'cost': 'pricing',
  'how much': 'pricing',
  '$': 'pricing',
  
  // Contact
  'contact': 'contact',
  'phone': 'contact',
  'email': 'contact',
  'call': 'contact',
  
  // Dress code
  'dress': 'dresscode',
  'wear': 'dresscode',
  'attire': 'dresscode',
  'clothes': 'dresscode',
  
  // Parking
  'parking': 'parking',
  'car': 'parking',
  'valet': 'parking',
  'drive': 'parking',
  
  // Events
  'event': 'events',
  'party': 'events',
  'private': 'events',
  'celebration': 'events',
  'corporate': 'events',
  
  // Awards
  'award': 'awards',
  'michelin': 'awards',
  'star': 'awards',
  'recognition': 'awards'
};

// Calculate response complexity to determine delay
function calculateResponseComplexity(message) {
  const lowerMessage = message.toLowerCase();
  let complexity = 1; // Default complexity
  
  // Simple greetings and thanks - faster response
  if (/(hi|hello|hey|thanks|thank you)/i.test(lowerMessage)) {
    complexity = 1;
  }
  // Basic info queries - medium response time
  else if (/(hour|open|time|where|location|menu|price)/i.test(lowerMessage)) {
    complexity = 2;
  }
  // Complex queries - longer "thinking" time
  else if (/(history|sustainab|chef|story|philosophy|award|event)/i.test(lowerMessage)) {
    complexity = 3;
  }
  // Very complex or unique queries - longest delay
  else {
    complexity = 4;
  }
  
  return complexity;
}

// Enhanced pattern matching for better question detection
function findBestResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Handle empty message
  if (!lowerMessage) return { response: predefinedResponses.greetings[0], complexity: 1 };
  
  // Handle greetings
  if (/(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i.test(lowerMessage)) {
    return { 
      response: predefinedResponses.greetings[Math.floor(Math.random() * predefinedResponses.greetings.length)],
      complexity: 1
    };
  }
  
  // Handle thanks
  if (/(thank|thanks|appreciate|grateful)/i.test(lowerMessage)) {
    return { 
      response: predefinedResponses.thanks[Math.floor(Math.random() * predefinedResponses.thanks.length)],
      complexity: 1
    };
  }
  
  // Check question map for direct matches
  for (const [keyword, responseKey] of Object.entries(questionMap)) {
    if (lowerMessage.includes(keyword)) {
      return { 
        response: predefinedResponses[responseKey],
        complexity: 2
      };
    }
  }
  
  // Special case handling for complex questions
  if (/(chef|john smith|cook)/i.test(lowerMessage)) {
    return {
      response: "Our Executive Chef John Smith brings 25+ years of international experience! 👨‍🍳 He leads our team in creating innovative dishes that tell a story and create lasting memories.",
      complexity: 3
    };
  }
  
  if (/(sustainab|organic|local|farm|eco|green)/i.test(lowerMessage)) {
    return {
      response: "We're committed to sustainability! 🌿 85% ingredients from within 100 miles, zero-waste practices, ethical sourcing. Supporting local farmers and reducing carbon footprint!",
      complexity: 3
    };
  }
  
  if (/(history|story|about|journey|timeline)/i.test(lowerMessage)) {
    return {
      response: "Our journey: 🕰️ 2008: Started as small bistro • 2012: First Michelin Star • 2016: Expanded to current location • 2020: Second Michelin Star! Growing through dedication to excellence.",
      complexity: 3
    };
  }
  
  if (/(tasting menu|chef menu|degustation)/i.test(lowerMessage)) {
    return {
      response: "Our Chef's Tasting Menu is a 7-course culinary journey for $185! 🎭 Optional wine pairing +$95. Seasonal dishes change monthly. 24-hour advance reservation recommended!",
      complexity: 2
    };
  }
  
  // If no match found, return null to use AI
  return null;
}

// Simulate realistic typing delay based on response length and complexity
function calculateTypingDelay(response, complexity) {
  const baseDelay = 800; // Minimum delay in ms
  const lengthFactor = response.length * 25; // 25ms per character
  const complexityFactor = complexity * 400; // 400ms per complexity level
  
  return Math.min(baseDelay + lengthFactor + complexityFactor, 5000); // Max 5 seconds
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    // First try to find a predefined response
    const predefinedResult = findBestResponse(message);
    
    if (predefinedResult) {
      console.log('Using predefined response for:', message.substring(0, 50));
      
      // Calculate appropriate delay for this response
      const delay = calculateTypingDelay(predefinedResult.response, predefinedResult.complexity);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          response: predefinedResult.response,
          source: 'predefined',
          delay: delay,
          complexity: predefinedResult.complexity
        })
      };
    }

    // Only use AI for complex or unique questions
    console.log('Using AI for complex query:', message.substring(0, 50));
    
    const groqApiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    const model = 'llama-3.3-70b-versatile';

    const groqPayload = {
      model,
      messages: [
        {
          role: 'system',
          content: `You are Kelly, an enthusiastic assistant for Gastronomique restaurant! 🌟

IMPORTANT RULES:
1. Answer ONLY about Gastronomique using this knowledge: ${JSON.stringify(knowledgeBase)}
2. Keep responses under 100 tokens - SHORT and CONCISE
3. Use 1-2 relevant emojis maximum
4. Be enthusiastic but brief
5. If unrelated, say: "Sorry, I specialize in Gastronomique restaurant inquiries! 🍽️"

KNOWLEDGE AVAILABLE: Restaurant info, menu, hours, location, pricing, policies, awards, history, sustainability.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
      top_p: 0.9
    };

    const groqResponse = await axios.post(groqApiUrl, groqPayload, {
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    const aiResponse = groqResponse.data.choices[0].message.content;
    
    // Calculate delay for AI response (typically longer)
    const complexity = calculateResponseComplexity(message);
    const delay = calculateTypingDelay(aiResponse, complexity);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        response: aiResponse,
        source: 'ai',
        delay: delay,
        complexity: complexity
      })
    };
    
  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);

    // Return predefined fallback for API errors
    const fallbackResponse = predefinedResponses.default;
    const delay = calculateTypingDelay(fallbackResponse, 2);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        response: fallbackResponse,
        source: 'fallback',
        delay: delay,
        error: 'API unavailable'
      })
    };
  }
};