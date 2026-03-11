import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface TestimonialsProps {
  lang: Language;
}

const Testimonials = ({ lang }: TestimonialsProps) => {
  const t = translations[lang].testimonials;
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setSubmitSuccess(true);
        setNewReview({ name: '', rating: 5, comment: '' });
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {lang === 'en' ? (
                <>What Our <span className="gold-text-gradient">Clients Say</span></>
              ) : lang === 'rw' ? (
                <>Ibyo abakiriya <span className="gold-text-gradient">bacu bavuga</span></>
              ) : (
                <>Ce que disent <span className="gold-text-gradient">nos clients</span></>
              )}
            </h2>
            <p className="text-white/50 max-w-2xl">{t.subtitle}</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="gold-gradient px-8 py-4 rounded-full text-black font-bold uppercase tracking-widest text-sm hover:scale-110 transition-transform"
          >
            {showForm ? 'Close Form' : 'Leave a Review'}
          </button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-16 overflow-hidden"
            >
              <div className="bg-zinc-900/50 border border-gold/20 p-8 rounded-3xl max-w-2xl mx-auto">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="text-gold mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-white/50">Your review has been submitted and is pending approval.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={newReview.name}
                          onChange={e => setNewReview({...newReview, name: e.target.value})}
                          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Rating</label>
                        <div className="flex gap-2 py-2">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button 
                              key={star}
                              type="button"
                              onClick={() => setNewReview({...newReview, rating: star})}
                              className="focus:outline-none"
                            >
                              <Star 
                                size={24} 
                                className={star <= newReview.rating ? "fill-gold text-gold" : "text-white/10 hover:text-white/30"} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Your Experience</label>
                      <textarea 
                        required
                        rows={4}
                        value={newReview.comment}
                        onChange={e => setNewReview({...newReview, comment: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none text-white resize-none"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Post Review'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-gold animate-spin w-10 h-10" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {(reviews.length > 0 ? reviews : t.items).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-zinc-900/50 border border-gold/10 p-8 rounded-3xl relative group hover:border-gold/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < (item.rating || 5) ? "fill-gold text-gold" : "text-white/10"} />
                  ))}
                </div>
                <p className="text-white/80 italic mb-6 leading-relaxed">"{item.comment || item.text}"</p>
                <div className="mt-auto">
                  <h4 className="text-gold font-bold text-lg">{item.name}</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{item.event || 'Client'}</p>
                </div>
                <div className="absolute top-8 right-8 text-gold/5 opacity-20 group-hover:opacity-40 transition-opacity">
                  <MessageSquare size={64} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
