import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Loader2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { Language, translations } from '../translations';
import { genAI } from '../services/ai';

interface AIChatbotProps {
  lang: Language;
}

const AIChatbot = ({ lang }: AIChatbotProps) => {
  const t = translations[lang].ai;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional AI assistant for 'DJ'S SERVICES & BUSINESS', a luxury DJ service for weddings and events. Your goal is to be helpful, elegant, and professional. You should answer questions about our services (Wedding DJ, Ceremony DJ, Birthday Parties, etc.), our DJs (DJ Emmy & DJ Peter), and encourage users to book via the contact form. Keep responses concise and high-end. If asked about pricing, suggest they contact us for a custom quote. Respond in the language of the user's query (English, Kinyarwanda, or French). Current website language is ${lang}.`,
        }
      });

      const botResponse = response.text || t.error;
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-black border border-gold/30 w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="gold-gradient p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-black">
                <Bot size={24} />
                <span className="font-bold uppercase tracking-widest text-sm">{t.assistant}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-black hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold/20">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold text-black rounded-tr-none' 
                      : 'bg-zinc-900 text-white border border-white/5 rounded-tl-none'
                  }`}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-gold animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-zinc-950">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className="flex-1 bg-black border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-gold outline-none"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-gold text-black p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="gold-gradient p-4 rounded-full shadow-2xl relative group"
      >
        {isOpen ? <X size={24} className="text-black" /> : <Bot size={24} className="text-black" />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full animate-bounce">
            AI
          </span>
        )}
        <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping group-hover:hidden" />
      </motion.button>
    </div>
  );
};

export default AIChatbot;
