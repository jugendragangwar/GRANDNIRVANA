import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, ArrowUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "#about" },
    { name: "Rooms & Suites", href: "#rooms" },
    { name: "Amenities", href: "#amenities" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Dining", href: "#dining" },
    { name: "Spa & Wellness", href: "#dining" },
    { name: "Events & Weddings", href: "#dining" },
    { name: "Conference Rooms", href: "#amenities" },
    { name: "Airport Transfer", href: "#amenities" },
  ],
  policies: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Cancellation Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-luxury py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-primary-foreground/60 text-sm">
                Stay updated with our latest offers and exclusive deals.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 w-full md:w-80"
              />
              <Button variant="luxury">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              onClick={() => scrollToSection("#home")}
              className="inline-block cursor-pointer"
            >
              <span className="text-accent text-3xl font-serif font-light tracking-wider">
                The Grand Nirvana
              </span>
              <span className="block text-primary-foreground/50 text-[10px] tracking-[0.4em] uppercase mt-1">
                Hotel & Resort
              </span>
            </motion.a>
            <p className="mt-6 text-primary-foreground/60 text-sm leading-relaxed max-w-sm">
              Experience the epitome of luxury and hospitality at The Grand Nirvana. 
              Where traditional elegance meets modern comfort, creating unforgettable 
              memories for every guest.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-sm bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif text-lg mb-6">Policies</h4>
            <ul className="space-y-3">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm text-center md:text-left">
            © {new Date().getFullYear()} The Grand Nirvana Hotel & Resort. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-sm bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
