import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Camera, Loader2 } from 'lucide-react';
import { Language, translations } from '../translations';

interface GalleryProps {
  lang: Language;
}

const Gallery = ({ lang }: GalleryProps) => {
  const t = translations[lang].gallery;
  const [images, setImages] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Gallery data is not an array:", data);
          setImages([]);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">
              {lang === 'en' ? (
                <>Event <span className="gold-text-gradient">Gallery</span></>
              ) : lang === 'rw' ? (
                <>Amafoto y' <span className="gold-text-gradient">ibirori</span></>
              ) : (
                <>Galerie d' <span className="gold-text-gradient">événements</span></>
              )}
            </h2>
            <p className="text-white/50 mt-2">{t.subtitle}</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="p-3 rounded-full border border-gold/20 text-gold hover:bg-gold hover:text-black transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="text-gold animate-spin w-12 h-12" />
          ) : images.length > 0 ? (
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full"
              >
                <div className="relative w-full h-full rounded-3xl overflow-hidden group">
                  <img 
                    src={images[currentIndex].src} 
                    alt={images[currentIndex].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8 md:p-12">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Camera className="text-gold w-5 h-5" />
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Featured Moment</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider">{images[currentIndex].title}</h3>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-white/20 uppercase tracking-widest">No images in gallery</div>
          )}
        </div>

        {/* Thumbnails/Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === index ? 'w-8 bg-gold' : 'w-2 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
