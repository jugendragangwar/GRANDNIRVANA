import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import heroLobby from "@/assets/hero-lobby.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";
import diningImage from "@/assets/dining.jpg";
import spaImage from "@/assets/spa.jpg";
import poolImage from "@/assets/pool.jpg";
import weddingImage from "@/assets/wedding.jpg";
import aboutResort from "@/assets/about-resort.jpg";

const galleryImages = [
  { src: heroLobby, alt: "Grand Lobby", category: "Hotel" },
  { src: roomExecutive, alt: "Executive Room", category: "Rooms" },
  { src: diningImage, alt: "Fine Dining", category: "Dining" },
  { src: spaImage, alt: "Luxury Spa", category: "Wellness" },
  { src: poolImage, alt: "Infinity Pool", category: "Recreation" },
  { src: roomPresidential, alt: "Presidential Suite", category: "Rooms" },
  { src: weddingImage, alt: "Grand Ballroom", category: "Events" },
  { src: roomDeluxe, alt: "Deluxe Suite", category: "Rooms" },
  { src: aboutResort, alt: "Resort Overview", category: "Hotel" },
];

export function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subheading">Visual Journey</span>
          <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Our <span className="gold-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground">
            Explore the beauty and elegance of The Grand Nirvana through our curated collection.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="break-inside-avoid group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs text-accent uppercase tracking-wider">
                    {image.category}
                  </span>
                  <h4 className="text-lg font-serif text-primary-foreground">
                    {image.alt}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            src={galleryImages[selectedImage].src}
            alt={galleryImages[selectedImage].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-sm"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-accent uppercase tracking-wider">
              {galleryImages[selectedImage].category}
            </span>
            <h4 className="text-xl font-serif text-primary-foreground">
              {galleryImages[selectedImage].alt}
            </h4>
          </div>
        </motion.div>
      )}
    </section>
  );
}
