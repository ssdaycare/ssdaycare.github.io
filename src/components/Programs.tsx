import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PROGRAMS } from '../data';
import { fetchLiveAvailability, ProgramAvailability } from './availabilityService'; // Adjust path as needed

export default function Programs() {
  const [availability, setAvailability] = useState<Record<string, ProgramAvailability>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function syncData() {
      const liveData = await fetchLiveAvailability();
      
      // Convert array to an easy lookup dictionary keyed by program name
      const availabilityMap: Record<string, ProgramAvailability> = {};
      liveData.forEach(item => {
        availabilityMap[item.programName] = item;
      });
      
      setAvailability(availabilityMap);
      setLoading(false);
    }
    
    syncData();
  }, []);

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
              Programs and Activities
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
            </h2>
            <p className="mt-8 text-lg text-dark/70 font-poppins max-w-2xl mx-auto">
              Our structured programs combine child-led discovery with teacher-guided instruction to prepare children for preschool.
            </p>
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog, idx) => {
            // Check if we have live data for this specific program card
            const status = availability[prog.title];
            
            return (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Container with Zoom effect */}
                <div className="h-56 bg-cover bg-center overflow-hidden relative group">
                  <img 
                    src={prog.image} 
                    alt={prog.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/600/400';
                    }}
                  />
                  
                  {/* Live Badges Layer Over image */}
                  {!loading && status && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`font-nunito font-bold px-4 py-1.5 rounded-full shadow-md text-sm tracking-wide transition-all ${
                        status.isWaitlistActive 
                          ? 'bg-red-500 text-white border border-red-400' 
                          : 'bg-emerald-500 text-white border border-emerald-400'
                      }`}>
                        {status.isWaitlistActive ? '🔴 Waitlist Active' : `🟢 ${status.spotsLeft} Spots Open`}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-nunito font-bold text-primary mb-4">{prog.title}</h3>
                    <p className="text-dark/80 font-poppins text-base leading-relaxed">{prog.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
