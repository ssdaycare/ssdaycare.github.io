import { useState } from 'react';
import { Menu, X, Sparkles, Home, Info, Calendar, Apple, Image, Star } from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'about' as Page, label: 'About', icon: Info },
    { id: 'programs' as Page, label: 'Programs', icon: Calendar },
    { id: 'nutrition' as Page, label: 'Nutrition', icon: Apple },
    { id: 'gallery' as Page, label: 'Gallery', icon: Image },
  ];

  const handleNavClick = (pageId: Page) => {
    setCurrentPage(pageId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => handleNavClick('home')} className="flex items-center text-left group focus:outline-none">
          <div className="relative w-12 h-12 mr-3 flex-shrink-0">
            {/* SVG Stars simulating Lucide icons */}
            <div className="absolute -top-1 -right-1 text-secondary animate-pulse" style={{ animationDuration: '3s' }}>
              <Star className="w-5 h-5 fill-secondary" />
            </div>
            <div className="absolute bottom-0 -left-1 text-primary animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}>
              <Star className="w-4 h-4 fill-primary/80" />
            </div>
            <div className="absolute top-1 left-1 text-primary animate-bounce drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-accent fill-accent" />
            </div>
          </div>
          
          <div>
            <h1 className="font-nunito font-extrabold text-xl md:text-2xl text-dark leading-tight group-hover:text-primary transition-colors">
              Sparkling Stars Daycare
            </h1>
            <span className="text-sm text-dark/80 font-poppins">Where every child shines</span>
          </div>
        </button>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden text-dark hover:text-primary transition-colors p-2 focus:outline-none"
          id="mobile-menu-btn"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex space-x-2 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)} 
                    className={`nav-link px-4 py-2 rounded-full font-semibold transition-all duration-300 font-poppins flex items-center ${
                      isActive 
                        ? 'bg-primary text-white shadow-md -translate-y-0.5' 
                        : 'text-dark hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="ml-2 px-6 py-2 rounded-full font-semibold bg-accent text-dark shadow-md hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300 font-poppins focus:outline-none"
              >
                Enroll Now
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Dropdown */}
        {/* Mobile Dropdown */}
        {isOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-white shadow-lg lg:hidden py-4"
          id="mobile-menu"
        >
          <ul className="flex flex-col px-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button 
                    onClick={() => handleNavClick(item.id)} 
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors font-poppins flex items-center ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-dark hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3 text-primary" />
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="w-full mt-2 px-4 py-3 rounded-xl font-semibold bg-accent text-dark hover:bg-yellow-400 transition-colors font-poppins text-center focus:outline-none"
              >
                Enroll Now
              </button>
            </li>
        </ul>
        </div>
        )}
      </div>
    </header>
  );
