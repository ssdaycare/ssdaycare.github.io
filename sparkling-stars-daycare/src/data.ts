import { ContactInfo, PhilosophyFeature, Program, NutritionFeature, GalleryImage, Testimonial } from './types';

export const CONTACT_INFO: ContactInfo = {
  address: "715 Pohorecky Crescent, Saskatoon SK S7W 0J4",
  phone: "306-850-4790",
  email: "nalinighai04@gmail.com",
  hours: "Monday - Friday, 7:30 am - 5:00 pm",
  provider: "Nalini Ghai"
};

export const ABOUT_TEXT = "Sparkling Stars Daycare is a licensed child care home that provides care and supervision for up to 12 children between the ages of 12 months and 12 years. Operated in the provider’s private residence, we strive to create a safe and stimulating environment for all children. We may be able to accommodate children with delays and differing needs. Please contact us for further information.";

export const PHILOSOPHY_FEATURES: PhilosophyFeature[] = [
  { 
    title: "Nurturing Environment", 
    description: "Creates a warm, safe, and inclusive space where every child feels valued and supported.", 
    icon: "Heart" 
  },
  { 
    title: "Holistic Development", 
    description: "Focuses on the overall growth of each child – socially, emotionally, physically, and cognitively – through engaging and play-based learning.", 
    icon: "Sprout" 
  },
  { 
    title: "Individualized Care", 
    description: "Recognizes and adapts to the unique needs and interests of each child, fostering their curiosity and independence.", 
    icon: "Baby" 
  },
  { 
    title: "Community Engagement", 
    description: "Builds strong relationships with families and the community to promote collaboration and open communication.", 
    icon: "Users" 
  },
  { 
    title: "Lifelong Learning", 
    description: "Encourages a love for learning by providing diverse experiences and opportunities that inspire creativity and exploration.", 
    icon: "BookOpen" 
  }
];

export const PROGRAMS: Program[] = [
  { 
    title: "Creative Arts and Crafts", 
    description: "Engaging children in hands-on activities like painting, drawing, and crafting to foster creativity and fine motor skills.", 
    image: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/craftblocks.jpg" 
  },
  { 
    title: "Outdoor Play and Exploration", 
    description: "Providing structured outdoor activities, such as nature walks and games, to promote physical health and social interaction.", 
    image: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/nature.jpeg" 
  },
  { 
    title: "Storytime and Language Development", 
    description: "Offering daily story time sessions to enhance language skills, comprehension, and a love for reading.", 
    image: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/storytime.jpg" 
  },
  { 
    title: "Sensory Play", 
    description: "Incorporating activities with sand, water, and other sensory materials to stimulate exploration and sensory development.", 
    image: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/connect4.jpg" 
  },
  { 
    title: "Music and Movement", 
    description: "Introducing songs, dance, and movement activities to encourage physical activity, rhythm, and coordination.", 
    image: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/dance.jpg" 
  }
];

export const NUTRITION_FEATURES: NutritionFeature[] = [
  { 
    title: "Balanced Meals", 
    description: "Provides nutritious, well-rounded meals that include a variety of fruits, vegetables, whole grains, and protein sources to support healthy growth.", 
    icon: "Utensils" 
  },
  { 
    title: "Allergy Awareness", 
    description: "Maintains a careful approach to accommodate food allergies and dietary restrictions, ensuring all meals are safe for every child.", 
    icon: "ShieldAlert" 
  },
  { 
    title: "Healthy Snacks", 
    description: "Offers nutritious snacks, such as fresh fruit, yogurt, and whole-grain options, to keep energy levels stable throughout the day.", 
    icon: "Apple" 
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/bouncycastle.jpg", alt: "Children playing" },
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/IMG_20250829_103643.jpg", alt: "Arts and crafts" },
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/BC2.jpg", alt: "Outdoor play" },
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/puzzle.jpeg", alt: "Story time" },
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/assistantblurred.jpg", alt: "Learning" },
  { src: "https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/cards.jpg", alt: "Meal time" }
];

export const TESTIMONIALS: Testimonial[] = [
  { 
    text: "We are so grateful for Nalini and her wonderful team! They provide excellent care and create a warm, nurturing environment for children. The daycare offers fresh, home-cooked meals and encourages plenty of outdoor play, which our little one loves. The Montessori approach to learning is evident in every activity, fostering independence and curiosity. The focus on preschool readiness is fantastic, with engaging activities like letters, numbers, writing, songs, puzzles, yoga, self-regulation, and motor skill development. We highly recommend this daycare to any parent looking for a caring, educational, and fun environment for their child.", 
    author: "Adriana" 
  },
  { 
    text: "Wonderful Daycare; the caregiver is very kind, compassionate, and accommodating.", 
    author: "Rohit" 
  }
];
