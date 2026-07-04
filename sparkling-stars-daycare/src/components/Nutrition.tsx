import { motion } from 'motion/react';
import { Utensils, ShieldAlert, Apple } from 'lucide-react';
import { NUTRITION_FEATURES } from '../data';

const iconMap: Record<string, any> = {
  Utensils: Utensils,
  ShieldAlert: ShieldAlert,
  Apple: Apple,
};

export default function Nutrition() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-nunito font-extrabold text-dark relative inline-block">
              Nutrition at Sparkling Stars
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
            </h2>
            <p className="mt-8 text-lg text-dark/70 font-poppins max-w-2xl mx-auto">
              We understand that healthy bodies breed active minds. Our carefully compiled menu ensures all children get the required daily nutrition they need to thrive.
            </p>
          </motion.div>
        </div>

        {/* Nutrition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NUTRITION_FEATURES.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Utensils;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-50 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-nunito font-bold mb-4 text-dark">{feature.title}</h3>
                <p className="text-dark/70 font-poppins leading-relaxed text-base">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Healthy Eating Notice Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-bg-light-2/30 rounded-3xl p-8 md:p-12 text-center border border-accent/20 shadow-sm max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-nunito font-bold text-dark mb-4">Fresh & Home-Cooked Daily</h3>
          <p className="text-dark/80 font-poppins leading-relaxed text-lg max-w-2xl mx-auto">
            We cook meals fresh daily in our home workspace. Every dish incorporates wholesome, fresh ingredients so your child enjoys homey, nutritional, and delicious flavors.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
