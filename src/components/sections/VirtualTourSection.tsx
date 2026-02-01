import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  Wifi, 
  Coffee,
  Tv,
  Wind,
  X,
  Maximize2,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import heroLobby from "@/assets/hero-lobby.jpg";
import roomExecutive from "@/assets/room-executive.jpg";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomPresidential from "@/assets/room-presidential.jpg";
import spa from "@/assets/spa.jpg";
import pool from "@/assets/pool.jpg";
import dining from "@/assets/dining.jpg";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface TourLocation {
  id: string;
  name: string;
  image: string;
  description: string;
  hotspots: Hotspot[];
}

const tourLocations: TourLocation[] = [
  {
    id: "lobby",
    name: "Grand Lobby",
    image: heroLobby,
    description: "Experience the majestic entrance with soaring ceilings and crystal chandeliers",
    hotspots: [
      { id: "h1", x: 25, y: 40, label: "Reception Desk", description: "24/7 concierge and check-in services", icon: <MapPin className="w-4 h-4" /> },
      { id: "h2", x: 70, y: 55, label: "Lounge Area", description: "Comfortable seating with complimentary refreshments", icon: <Coffee className="w-4 h-4" /> },
      { id: "h3", x: 50, y: 25, label: "Crystal Chandelier", description: "Handcrafted Venetian glass masterpiece", icon: <Eye className="w-4 h-4" /> },
    ]
  },
  {
    id: "executive",
    name: "Executive Suite",
    image: roomExecutive,
    description: "Elegantly appointed rooms with modern amenities and city views",
    hotspots: [
      { id: "h1", x: 30, y: 50, label: "King Size Bed", description: "Premium Egyptian cotton linens with pillow menu", icon: <Bed className="w-4 h-4" /> },
      { id: "h2", x: 75, y: 35, label: "Smart TV", description: "65-inch 4K display with streaming services", icon: <Tv className="w-4 h-4" /> },
      { id: "h3", x: 85, y: 60, label: "Climate Control", description: "Individual temperature and air quality management", icon: <Wind className="w-4 h-4" /> },
    ]
  },
  {
    id: "deluxe",
    name: "Deluxe Suite",
    image: roomDeluxe,
    description: "Spacious accommodations with separate living area and premium bath",
    hotspots: [
      { id: "h1", x: 40, y: 45, label: "Living Area", description: "Separate lounge with designer furniture", icon: <Tv className="w-4 h-4" /> },
      { id: "h2", x: 20, y: 55, label: "En-suite Bath", description: "Marble bathroom with rain shower and soaking tub", icon: <Bath className="w-4 h-4" /> },
      { id: "h3", x: 65, y: 30, label: "High-Speed WiFi", description: "Complimentary fiber-optic internet throughout", icon: <Wifi className="w-4 h-4" /> },
    ]
  },
  {
    id: "presidential",
    name: "Presidential Suite",
    image: roomPresidential,
    description: "The pinnacle of luxury with panoramic views and butler service",
    hotspots: [
      { id: "h1", x: 50, y: 40, label: "Master Bedroom", description: "Opulent sleeping quarters with walk-in closet", icon: <Bed className="w-4 h-4" /> },
      { id: "h2", x: 25, y: 60, label: "Private Jacuzzi", description: "Indoor spa with therapeutic jets", icon: <Bath className="w-4 h-4" /> },
      { id: "h3", x: 80, y: 45, label: "Butler Pantry", description: "Dedicated service area with mini bar", icon: <Coffee className="w-4 h-4" /> },
    ]
  },
  {
    id: "spa",
    name: "Nirvana Spa",
    image: spa,
    description: "Tranquil wellness sanctuary offering rejuvenating treatments",
    hotspots: [
      { id: "h1", x: 35, y: 50, label: "Treatment Rooms", description: "Private suites for massage and therapies", icon: <Bath className="w-4 h-4" /> },
      { id: "h2", x: 65, y: 40, label: "Relaxation Lounge", description: "Heated beds with aromatherapy", icon: <Wind className="w-4 h-4" /> },
    ]
  },
  {
    id: "pool",
    name: "Infinity Pool",
    image: pool,
    description: "Stunning rooftop pool with breathtaking sunset views",
    hotspots: [
      { id: "h1", x: 50, y: 55, label: "Heated Pool", description: "Temperature-controlled year-round swimming", icon: <Bath className="w-4 h-4" /> },
      { id: "h2", x: 20, y: 45, label: "Poolside Bar", description: "Refreshing cocktails and light bites", icon: <Coffee className="w-4 h-4" /> },
    ]
  },
  {
    id: "dining",
    name: "Fine Dining",
    image: dining,
    description: "Award-winning culinary experiences in elegant settings",
    hotspots: [
      { id: "h1", x: 45, y: 50, label: "Private Dining", description: "Exclusive rooms for intimate gatherings", icon: <Coffee className="w-4 h-4" /> },
      { id: "h2", x: 75, y: 35, label: "Wine Cellar", description: "Curated collection of 500+ vintages", icon: <Coffee className="w-4 h-4" /> },
    ]
  },
];

export function VirtualTourSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentLocation, setCurrentLocation] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const location = tourLocations[currentLocation];

  const navigateTo = (direction: "prev" | "next") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveHotspot(null);
    
    if (direction === "prev") {
      setCurrentLocation((prev) => (prev === 0 ? tourLocations.length - 1 : prev - 1));
    } else {
      setCurrentLocation((prev) => (prev === tourLocations.length - 1 ? 0 : prev + 1));
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToLocation = (index: number) => {
    if (isAnimating || index === currentLocation) return;
    setIsAnimating(true);
    setActiveHotspot(null);
    setCurrentLocation(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="virtual-tour" className="section-padding bg-muted/30">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="luxury-subheading">Explore Our Property</span>
          <h2 className="luxury-heading text-4xl md:text-5xl mt-4 mb-6">
            Virtual <span className="gold-text">Tour</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in our exquisite spaces. Click on the hotspots to discover 
            the exceptional details that make The Grand Nirvana truly special.
          </p>
        </motion.div>

        {/* Tour Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main Image Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-primary shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20" />
              </motion.div>
            </AnimatePresence>

            {/* Hotspots */}
            <AnimatePresence>
              {location.hotspots.map((hotspot, index) => (
                <motion.button
                  key={hotspot.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`absolute z-10 group ${activeHotspot?.id === hotspot.id ? 'z-20' : ''}`}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
                  onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
                >
                  {/* Pulse Ring */}
                  <span className="absolute inset-0 w-10 h-10 -m-2 rounded-full bg-accent/30 animate-ping" />
                  
                  {/* Hotspot Button */}
                  <span className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                    activeHotspot?.id === hotspot.id 
                      ? 'bg-accent text-accent-foreground scale-125' 
                      : 'bg-primary-foreground/90 text-primary group-hover:bg-accent group-hover:text-accent-foreground'
                  }`}>
                    {hotspot.icon}
                  </span>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeHotspot?.id === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-48 md:w-64 p-4 bg-card rounded-sm shadow-xl border border-border z-30"
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
                        <h4 className="font-serif text-sm font-semibold mb-1 text-card-foreground">{hotspot.label}</h4>
                        <p className="text-xs text-muted-foreground">{hotspot.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={() => navigateTo("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all z-10"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateTo("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all z-10"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 w-10 h-10 rounded-sm bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all z-10"
            >
              <Maximize2 className="w-5 h-5" />
            </button>

            {/* Location Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mb-2">
                  {location.name}
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base max-w-xl">
                  {location.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {tourLocations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => goToLocation(index)}
                className={`relative flex-shrink-0 w-24 md:w-32 aspect-video rounded-sm overflow-hidden transition-all duration-300 ${
                  index === currentLocation 
                    ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/40" />
                <span className="absolute bottom-1 left-1 right-1 text-[10px] md:text-xs text-primary-foreground font-medium truncate">
                  {loc.name}
                </span>
              </button>
            ))}
          </div>

          {/* Instructions */}
          <p className="text-center text-muted-foreground text-sm mt-4">
            <Eye className="w-4 h-4 inline mr-2" />
            Click on the glowing hotspots to explore details
          </p>
        </motion.div>
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-primary border-none">
          <DialogTitle className="sr-only">Virtual Tour - {location.name}</DialogTitle>
          <div className="relative w-full h-[90vh]">
            <img
              src={location.image}
              alt={location.name}
              className="w-full h-full object-contain"
            />
            
            {/* Hotspots in Fullscreen */}
            {location.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="absolute z-10 group"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
                onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
              >
                <span className="absolute inset-0 w-12 h-12 -m-3 rounded-full bg-accent/30 animate-ping" />
                <span className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  activeHotspot?.id === hotspot.id 
                    ? 'bg-accent text-accent-foreground scale-125' 
                    : 'bg-primary-foreground/90 text-primary group-hover:bg-accent group-hover:text-accent-foreground'
                }`}>
                  {hotspot.icon}
                </span>

                <AnimatePresence>
                  {activeHotspot?.id === hotspot.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-64 p-4 bg-card rounded-sm shadow-xl border border-border z-30"
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
                      <h4 className="font-serif text-base font-semibold mb-1 text-card-foreground">{hotspot.label}</h4>
                      <p className="text-sm text-muted-foreground">{hotspot.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}

            {/* Navigation in Fullscreen */}
            <button
              onClick={() => navigateTo("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => navigateTo("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/30 transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Location Title */}
            <div className="absolute bottom-8 left-8">
              <h3 className="font-serif text-3xl text-primary-foreground mb-2">
                {location.name}
              </h3>
              <p className="text-primary-foreground/80">{location.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
