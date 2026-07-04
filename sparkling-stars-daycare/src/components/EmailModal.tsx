import { useState, useEffect } from 'react';
import { Mail, X } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubjectText?: string;
  initialBodyText?: string;
}

export default function EmailModal({ isOpen, onClose, initialSubjectText = '', initialBodyText = '' }: EmailModalProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubjectText || `Inquiry about Sparkling Stars Daycare`);
      setBody(initialBodyText);
    }
  }, [isOpen, initialSubjectText, initialBodyText]);

  if (!isOpen) return null;

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all scale-100 border border-gray-100">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-dark transition-colors p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-nunito font-bold text-dark">Draft Email to Daycare</h3>
        </div>

        {/* Content Inputs */}
        <div className="space-y-4 font-poppins">
          <div>
            <label className="block text-sm font-bold text-dark mb-1">To:</label>
            <input 
              type="text" 
              value={CONTACT_INFO.email} 
              readOnly 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-dark/70 cursor-not-allowed outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-dark mb-1">Subject:</label>
            <input 
              type="text" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-dark mb-1">Body:</label>
            <textarea 
              value={body} 
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm resize-none"
            />
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSendEmail} 
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary hover:-translate-y-0.5 transition-all shadow-md mt-2 focus:outline-none"
          >
            Open in Email Client
          </button>
        </div>
      </div>
    </div>
  );
}
