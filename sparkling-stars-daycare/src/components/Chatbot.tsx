import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatbotProps {
  onNeedsEmail: (subject: string, body: string) => void;
}

export default function Chatbot({ onNeedsEmail }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm Sparky, your friendly AI assistant for Sparkling Stars Daycare. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserQuestion, setLastUserQuestion] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text }]);
    setInput('');
    setLastUserQuestion(text);
    setIsLoading(true);

    try {
      // API call to Express proxy endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from chat API');
      }

      const data = await response.json();
      const botReply = data.reply?.trim();

      if (botReply === 'NEEDS_EMAIL') {
        const subject = data.paraphrasedSubject || '';
        const body = data.paraphrasedBody || '';

        // Mock prompt to suggest email client draft
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: "That's a great question! For that, it's best to speak with the daycare directly. I can help you draft an email. Does that sound good?"
          }
        ]);
        
        // Open the email modal after a short delay
        setTimeout(() => {
          onNeedsEmail(subject, body);
        }, 1500);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: botReply || "I'm sorry, I didn't catch that. Could you please rephrase?"
          }
        ]);
      }
    } catch (error) {
      console.error('Chatbot API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "Oops! I'm having a little trouble connecting right now. Please try again in a moment."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[1000] flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`mb-4 bg-white rounded-2xl shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[65vh] sm:h-[500px] max-h-[80vh] overflow-hidden transition-all duration-300 origin-bottom-right border border-gray-100 flex flex-col ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto' 
            : 'scale-0 opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex justify-between items-center text-white shadow-sm shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-nunito font-bold text-base">Sparky, your assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="hover:bg-white/20 rounded-full p-1.5 transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-3 font-poppins text-sm">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-accent text-dark rounded-br-sm' 
                    : 'bg-white text-dark border border-gray-200 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 border border-gray-200 rounded-2xl rounded-bl-sm p-3 shadow-sm text-xs italic">
                Sparky is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..." 
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-poppins" 
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors shadow-sm w-9 h-9 flex items-center justify-center disabled:opacity-50 focus:outline-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center w-16 h-16 focus:outline-none"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </button>
    </div>
  );
}
