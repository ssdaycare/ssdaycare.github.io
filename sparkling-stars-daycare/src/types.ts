export type Page = 'home' | 'about' | 'programs' | 'nutrition' | 'gallery' | 'contact';

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
  provider: string;
}

export interface PhilosophyFeature {
  title: string;
  description: string;
  icon: string; // Lucide or FA name
}

export interface Program {
  title: string;
  description: string;
  image: string;
}

export interface NutritionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  id: string;
}
