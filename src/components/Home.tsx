import { motion } from 'motion/react';
import { Page } from '../types';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  return (
    <div className="relative h-[85vh] flex items-center justify-center text-center text-white">
      {/* Background with custom linear-gradient */}
     <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 ease-out scale-105"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.45)), url('https://raw.githubusercontent.com/ssdaycare/ssdaycare.github.io/main/writing.jpg')` 
          }}
        />
      </div>
      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-nunito font-extrabold mb-6 text-white drop-shadow-lg leading-tight">
            Welcome to <span className="text-accent">Sparkling Stars</span> Daycare
          </h2>
          <p className="text-xl md:text-2xl font-poppins mb-10 opacity-95 max-w-2xl mx-auto drop-shadow-md">
            A nurturing environment where children grow, learn, and shine.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="bg-accent text-dark px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus:outline-none"
            >
              Schedule a Tour
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-white/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus:outline-none"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
