import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowDown } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function Contact() {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const contactList = [
    {
      title: "Our Location",
      desc: CONTACT_INFO.address,
      link: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT_INFO.address)}`,
      linkLabel: "Get Directions",
      subLabel: `Group Family Child Care Home – ${CONTACT_INFO.provider}`,
      icon: MapPin,
    },
    {
      title: "Business Line",
      desc: CONTACT_INFO.phone,
      icon: Phone,
    },
    {
      title: "Email Us",
      desc: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
      linkLabel: CONTACT_INFO.email,
      icon: Mail,
    },
    {
      title: "Hours of Operation",
      desc: CONTACT_INFO.hours,
      icon: Clock,
    },
  ];

  return (
    <div className="py-16 bg-off-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-nunito font-extrabold text-dark relative inline-block">
              Contact Us
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-accent rounded-full"></span>
            </h2>
          </motion.div>
        </div>

        {/* Jump Button Mobile */}
        <div className="lg:hidden flex justify-center mb-10">
          <button 
            onClick={scrollToForm} 
            className="group flex items-center gap-2 bg-accent/20 hover:bg-accent text-dark font-bold py-2.5 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 border border-accent/40 focus:outline-none"
          >
            <span>Jump to Application Form</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Contact Info list */}
          <div className="space-y-8">
            {contactList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="ml-6 flex-grow">
                    <h3 className="text-xl font-nunito font-bold text-dark mb-1">{item.title}</h3>
                    {item.link ? (
                      <div>
                        {item.title === 'Email Us' ? (
                          <a href={item.link} className="text-primary font-semibold hover:underline font-poppins break-all">
                            {item.linkLabel}
                          </a>
                        ) : (
                          <>
                            <p className="text-dark/70 font-poppins mb-2">{item.desc}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline font-poppins">
                              {item.linkLabel}
                            </a>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-dark/70 font-poppins">{item.desc}</p>
                    )}
                    {item.subLabel && (
                      <p className="text-sm text-dark/50 mt-2 font-poppins italic">{item.subLabel}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Google Form Iframe Container */}
          <div className="flex flex-col h-full">
            {/* Jump Button Desktop */}
            <div className="hidden lg:flex justify-end mb-4">
              <button 
                onClick={scrollToForm} 
                className="group flex items-center gap-2 bg-accent/20 hover:bg-accent text-dark font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 border border-accent/40 focus:outline-none"
              >
                <span>Jump to Application Form</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="application-form" 
              className="bg-white rounded-3xl shadow-lg p-3 overflow-hidden h-[800px] lg:h-auto flex-grow flex flex-col border border-gray-100"
            >
              <div className="bg-accent/10 p-6 mb-4 rounded-2xl text-center">
                <h3 className="text-xl font-nunito font-bold text-dark mb-1">Application Process</h3>
                <p className="text-dark/70 font-poppins text-sm">Please fill out the secure enrollment application form below.</p>
              </div>
              <div className="flex-grow w-full rounded-2xl overflow-hidden border border-gray-100">
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdF2yckT8IjKUuq7XyhC5IDn7fjYWqipkS2h1EA7CWl6Ts_tA/viewform?embedded=true" 
                  width="100%" 
                  height="100%" 
                  className="w-full h-full min-h-[600px] border-0"
                  title="Application Form"
                >
                  Loading…
                </iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
