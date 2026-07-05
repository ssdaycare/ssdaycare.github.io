import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Programs from './components/Programs';
import Nutrition from './components/Nutrition';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import EmailModal from './components/EmailModal';
import { Page } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [modalInitialSubject, setModalInitialSubject] = useState('');
  const [modalInitialBody, setModalInitialBody] = useState('');

  // Handle browser hash router (for matching index.html look-and-feel)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'about', 'programs', 'nutrition', 'gallery', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Init on load
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSetPage = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page;
  };

  const handleNeedsEmail = (subject: string, body: string) => {
    setModalInitialSubject(subject);
    setModalInitialBody(body);
    setIsEmailModalOpen(true);
  };

  return (
    <div className="font-poppins text-dark flex flex-col min-h-screen selection:bg-primary/20">
      {/* Dynamic Nav bar */}
      <Navbar currentPage={currentPage} setCurrentPage={handleSetPage} />

      {/* Main viewport with animated or simple transition heights */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home setCurrentPage={handleSetPage} />}
        {currentPage === 'about' && <About />}
        {currentPage === 'programs' && <Programs />}
        {currentPage === 'nutrition' && <Nutrition />}
        {currentPage === 'gallery' && <Gallery />}
        {currentPage === 'contact' && <Contact />}

        {/* Display Testimonials directly beneath the Home hero screen (similar to original HTML flow) */}
        {currentPage === 'home' && <Testimonials />}
      </main>

      {/* Footer block */}
      <Footer setCurrentPage={handleSetPage} />

      {/* Persistent AI chat support panel */}
      <Chatbot onNeedsEmail={handleNeedsEmail} />

      {/* Contact draft helper modal dialog */}
      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={() => setIsEmailModalOpen(false)} 
        initialSubjectText={modalInitialSubject} 
        initialBodyText={modalInitialBody} 
      />
    </div>
  );
}
