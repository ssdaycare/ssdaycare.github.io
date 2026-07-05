import { Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Page } from '../types';
import { CONTACT_INFO } from '../data';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-off-white pt-16 pb-8 text-dark border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Col */}
          <div>
            <h3 className="text-2xl font-nunito font-bold text-primary mb-6">Sparkling Stars Daycare</h3>
            <p className="opacity-90 leading-relaxed font-poppins">
              Providing a safe, nurturing, and stimulating environment for your child's growth and development.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61562913093091&mibextid=LQQJ4d" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-nunito font-bold text-primary mb-6">Quick Links</h3>
            <ul className="space-y-2 font-poppins">
              {[
                { id: 'home' as Page, label: 'Home' },
                { id: 'about' as Page, label: 'About' },
                { id: 'programs' as Page, label: 'Programs' },
                { id: 'nutrition' as Page, label: 'Nutrition' },
                { id: 'gallery' as Page, label: 'Gallery' },
                { id: 'contact' as Page, label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)} 
                    className="w-full text-left py-2 hover:text-primary hover:pl-2 transition-all duration-300 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-nunito font-bold text-primary mb-6">Contact Info</h3>
            <ul className="space-y-4 font-poppins">
              <li className="flex items-start">
                <MapPin className="mt-1.5 w-6 text-primary flex-shrink-0" />
                <span className="ml-3">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-6 text-primary flex-shrink-0" />
                <span className="ml-3">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-6 text-primary flex-shrink-0" />
                <span className="ml-3 break-all">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-gray-200 pt-8 text-center text-sm opacity-70 font-poppins">
          <p>© {currentYear} Sparkling Stars Daycare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
