import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Rooms", href: "#rooms" },
  { name: "Amenities", href: "#amenities" },
  { name: "Dining", href: "#dining" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      {/* <div className="hidden md:block bg-primary text-cream/80 py-2">
        <div className="container-luxury flex justify-between items-center text-xs tracking-wider">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              +91 9520991039
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              info@thegrandnirvana.com
            </span>
          </div>
          <span>Karampur Chaudhary, Nainital Road, Bareilly, UP</span>
        </div>
      </div> */}

      {/* Main Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between py-4 px-4 md:px-8">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={() => scrollToSection("#home")}
              className="flex flex-col items-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-accent text-2xl md:text-3xl font-serif font-light tracking-wider">
                The Grand Nirvana
              </span>
              <span className="text-cream/60 text-[10px] tracking-[0.4em] uppercase">
                Hotel & Resort
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="nav"
                  onClick={() => scrollToSection(link.href)}
                  className="px-4"
                >
                  {link.name}
                </Button>
              ))}
              <Button
                variant="luxury"
                size="sm"
                className="ml-4"
                onClick={() => scrollToSection("#contact")}
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="nav"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/98 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative h-full flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-6 right-6 text-cream"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-8 h-8" />
              </Button>

              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-serif text-cream/90 hover:text-accent transition-colors tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="luxury"
                  size="lg"
                  className="mt-4"
                  onClick={() => scrollToSection("#contact")}
                >
                  Book Your Stay
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
