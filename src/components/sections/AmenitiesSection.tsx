import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Waves,
  Sparkles,
  Users,
  Clock,
  Shield,
  Plane,
} from "lucide-react";

const amenities = [
  {
    icon: Waves,
    title: "Infinity Pool",
    description: "Temperature-controlled pool with stunning views and poolside service.",
  },
  {
    icon: Sparkles,
    title: "Luxury Spa",
    description: "Rejuvenating treatments and therapies for complete relaxation.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description: "World-class restaurants serving international and local cuisine.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description: "State-of-the-art equipment and personal training services.",
  },
  {
    icon: Users,
    title: "Event Spaces",
    description: "Elegant venues for weddings, conferences, and celebrations.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description: "Complimentary high-speed internet throughout the property.",
  },
  {
    icon: Car,
    title: "Valet Parking",
    description: "Secure parking with complimentary valet service for guests.",
  },
  {
    icon: Clock,
    title: "24/7 Concierge",
    description: "Dedicated team to assist with all your needs, any time.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Round-the-clock security for your peace of mind.",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Luxury vehicle transfers to and from the airport.",
  },
];

function AmenityCard({ amenity, index }: { amenity: typeof amenities[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="group p-6 bg-card rounded-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-[var(--shadow-gold)]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="w-14 h-14 rounded-sm bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <amenity.icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="font-serif text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
        {amenity.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {amenity.description}
      </p>
    </motion.div>
  );
}

export function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="amenities" className="section-padding bg-background">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subheading">World-Class Facilities</span>
          <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Amenities & <span className="gold-text">Services</span>
          </h2>
          <p className="text-muted-foreground">
            Discover a world of premium amenities designed to enhance every aspect
            of your stay with us.
          </p>
        </motion.div>

        {/* Amenities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <AmenityCard key={amenity.title} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
