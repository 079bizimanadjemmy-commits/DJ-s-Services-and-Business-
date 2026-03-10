import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Language, translations } from '../translations';

interface VideosProps {
  lang: Language;
}

const Videos = ({ lang }: VideosProps) => {
  const t = translations[lang].videos;
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("Videos data is not an array:", data);
          setVideos([]);
        }
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (isLoading) return null;
  if (videos.length === 0) return null;

  return (
    <section id="videos" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === 'en' ? (
              <>Event <span className="gold-text-gradient">Highlights</span></>
            ) : lang === 'rw' ? (
              <>Ibyaranze <span className="gold-text-gradient">Ibirori</span></>
            ) : (
              <>Points forts <span className="gold-text-gradient">de l'événement</span></>
            )}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, index) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-black border border-white/5 rounded-3xl overflow-hidden group hover:border-gold/30 transition-all duration-500"
            >
              <div className="aspect-video relative">
                {vid.url.includes('youtube.com') || vid.url.includes('youtu.be') ? (
                  <iframe 
                    src={`https://www.youtube.com/embed/${vid.url.split('v=')[1] || vid.url.split('/').pop()}`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <video 
                    src={vid.url} 
                    controls 
                    className="w-full h-full object-cover" 
                    preload="none"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">{vid.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Videos;
