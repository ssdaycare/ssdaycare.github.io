import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-bg-light-1 via-bg-light-2 to-bg-light-3">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-nunito font-extrabold text-dark relative inline-block">
            What Parents Say
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
          </h2>
        </div>

        {/* Testimonial Cards Layout */}
        <div className="flex flex-col md:flex-row gap-8 justify-center max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-10 w-full shadow-lg border border-white/40 text-center flex flex-col justify-between"
            >
              <div>
                <div className="text-primary text-4xl mb-4 flex justify-center">
                  <Quote className="w-10 h-10 text-primary fill-primary/10 rotate-180" />
                </div>
                <p className="text-lg md:text-xl italic text-dark/80 mb-6 font-poppins leading-relaxed">
                  "{t.text}"
                </p>
              </div>
              <p className="font-nunito font-bold text-primary text-lg mt-auto">- {t.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
