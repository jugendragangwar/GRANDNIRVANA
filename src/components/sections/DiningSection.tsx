import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import diningImage from "@/assets/dining.jpg";
import spaImage from "@/assets/spa.jpg";
import weddingImage from "@/assets/wedding.jpg";
import poolImage from "@/assets/pool.jpg";

const experiences = [
  {
    title: "Fine Dining",
    subtitle: "Culinary Excellence",
    description: "Savor exquisite cuisines crafted by world-renowned chefs in our elegant restaurants.",
    image: diningImage,
  },
  {
    title: "Nirvana Spa",
    subtitle: "Wellness & Rejuvenation",
    description: "Indulge in transformative spa treatments designed to restore mind, body, and soul.",
    image: spaImage,
  },
  {
    title: "Grand Celebrations",
    subtitle: "Weddings & Events",
    description: "Create unforgettable moments in our magnificent banquet halls and garden venues.",
    image: weddingImage,
  },
  {
    title: "Infinity Pool",
    subtitle: "Leisure & Recreation",
    description: "Unwind by our stunning infinity pool with panoramic views and poolside service.",
    image: poolImage,
  },
];

function ExperienceCard({ experience, index, isReversed }: { 
  experience: typeof experiences[0]; 
  index: number;
  isReversed: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`grid md:grid-cols-2 gap-8 items-center ${isReversed ? "md:grid-flow-dense" : ""}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Image */}
      <motion.div
        className={`relative overflow-hidden rounded-sm ${isReversed ? "md:col-start-2" : ""}`}
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative group">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`${isReversed ? "md:col-start-1 md:text-right" : ""} py-8`}
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="luxury-subheading">{experience.subtitle}</span>
        <h3 className="luxury-heading text-3xl md:text-4xl text-foreground mt-3 mb-4">
          {experience.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
          {experience.description}
        </p>
        <div className={`flex items-center gap-4 ${isReversed ? "md:justify-end" : ""}`}>
          <div className={`h-px w-12 bg-accent ${isReversed ? "order-2" : ""}`} />
          <span className="text-accent">✦</span>
          <div className={`h-px w-12 bg-accent ${isReversed ? "order-first" : ""}`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function DiningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dining" className="section-padding bg-muted/30">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subheading">Curated Experiences</span>
          <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Dining & <span className="gold-text">Experiences</span>
          </h2>
          <p className="text-muted-foreground">
            Immerse yourself in a world of refined pleasures, from culinary delights
            to rejuvenating wellness experiences.
          </p>
        </motion.div>

        {/* Experiences */}
        <div className="space-y-20">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
