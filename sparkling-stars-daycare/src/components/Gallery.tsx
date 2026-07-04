import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '../data';

export default function Gallery() {
  return (
    <div className="py-16 bg-off-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-nunito font-extrabold text-dark relative inline-block">
              Our Sparkling Moments
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
            </h2>
            <p className="mt-8 text-lg text-dark/70 font-poppins max-w-2xl mx-auto">
              A peek inside our daycare workspace, highlighting joyful outdoor play, creative exploration, reading sessions, and puzzle games.
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group w-full h-72 rounded-2xl overflow-hidden shadow-md relative hover:shadow-xl hover:scale-[1.03] transition-all duration-300 bg-gray-200 cursor-pointer border border-white"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/600/400?sig=${idx}`;
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
