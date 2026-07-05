import { motion } from 'motion/react';
import { Heart, Sprout, Baby, Users, BookOpen, ShieldCheck } from 'lucide-react';
import { ABOUT_TEXT, PHILOSOPHY_FEATURES } from '../data';

// Map icon names to Lucide Icon components
const iconMap: Record<string, any> = {
  Heart: Heart,
  Sprout: Sprout,
  Baby: Baby,
  Users: Users,
  BookOpen: BookOpen,
};

export default function About() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-nunito font-extrabold text-dark mb-6 relative inline-block">
              About Sparkling Stars Daycare
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
            </h2>
            <p className="text-lg md:text-xl text-dark/80 font-poppins leading-relaxed mt-10">
              {ABOUT_TEXT}
            </p>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-nunito font-bold text-dark mb-10 relative inline-block">
            Our Philosophy
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent rounded-full"></span>
          </h2>
        </div>

        {/* Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PHILOSOPHY_FEATURES.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Heart;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-nunito font-bold mb-4 text-dark">{feature.title}</h3>
                <p className="text-dark/70 font-poppins text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Accessibility & Inclusivity Callout Box */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-bg-light-1/30 rounded-3xl p-8 md:p-12 border border-primary/10 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-primary flex-shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-nunito font-bold text-dark mb-3">Accessibility & Inclusivity</h3>
              <p className="text-dark/80 font-poppins leading-relaxed text-lg">
                Wide doorways, adaptive play equipment with soft flooring, accessible restrooms with grab bars, and child-sized furniture. We prioritize safety with gates, offer diverse learning materials, and ensure accessible outdoor paths. Clear emergency exits and staff training on inclusivity to support all children.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
