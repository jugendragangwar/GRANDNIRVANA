import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, Car, Coffee, Tv, Bath, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import roomExecutive from "@/assets/room-executive.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";

const rooms = [
  {
    name: "Executive Room",
    image: roomExecutive,
    price: "₹8,999",
    size: "382 sq.ft",
    description: "Experience bespoke luxury and comfort with king size Nirvana Grand beds and modern amenities.",
    features: [Wifi, Tv, Coffee, Bath],
    guests: 2,
  },
  {
    name: "Deluxe Suite",
    image: roomDeluxe,
    price: "₹14,999",
    size: "520 sq.ft",
    description: "Spacious suites with separate living area, premium furnishings and panoramic views.",
    features: [Wifi, Tv, Coffee, Bath, Car],
    guests: 3,
  },
  {
    name: "Presidential Suite",
    image: roomPresidential,
    price: "₹29,999",
    size: "850 sq.ft",
    description: "The pinnacle of luxury with exclusive amenities, butler service, and breathtaking vistas.",
    features: [Wifi, Tv, Coffee, Bath, Car],
    guests: 4,
  },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="luxury-card group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-sm">
          <span className="text-lg font-semibold">{room.price}</span>
          <span className="text-xs opacity-80">/night</span>
        </div>

        {/* Quick Book on Hover */}
        <motion.div
          className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        >
          <Button variant="hero" className="w-full">
            Book Now
          </Button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-serif text-foreground">{room.name}</h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>{room.guests}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {room.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">{room.size}</span>
          <div className="flex items-center gap-2">
            {room.features.slice(0, 4).map((Icon, i) => (
              <Icon key={i} className="w-4 h-4 text-accent" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function RoomsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rooms" className="section-padding bg-muted/30">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="luxury-subheading">The Pleasure of Luxury</span>
          <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
            Rooms & <span className="gold-text">Suites</span>
          </h2>
          <p className="text-muted-foreground">
            Each room is designed to provide you with an unforgettable experience,
            combining elegant aesthetics with modern comfort.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={room.name} room={room} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button variant="luxury-outline" size="lg">
            View All Accommodations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
