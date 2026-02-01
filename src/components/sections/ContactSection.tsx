import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    roomType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground">
      <div className="container-luxury" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="luxury-subheading text-accent">Get in Touch</span>
            <h2 className="luxury-heading text-4xl md:text-5xl mt-4 mb-8">
              Book Your <span className="gold-text">Stay</span>
            </h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Location</h4>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">
                    Karampur Chaudhary, Nainital Road,<br />
                    Bareilly, Uttar Pradesh 243001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Phone</h4>
                  <p className="text-primary-foreground/70 text-sm">
                    +91 9520991039<br />
                    +91 9359101677
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Email</h4>
                  <p className="text-primary-foreground/70 text-sm">
                    info@thegrandnirvana.com<br />
                    reservations@thegrandnirvana.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-serif text-lg mb-1">Check-in / Check-out</h4>
                  <p className="text-primary-foreground/70 text-sm">
                    Check-in: 2:00 PM<br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-10 h-48 bg-navy-light rounded-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.123456789!2d79.4165!3d28.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe%20Grand%20Nirvana!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card text-card-foreground p-8 md:p-10 rounded-sm shadow-[var(--shadow-card)]">
              <h3 className="font-serif text-2xl mb-6">Reserve Your Room</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Check-in Date
                    </label>
                    <Input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Check-out Date
                    </label>
                    <Input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Guests
                    </label>
                    <Input
                      type="number"
                      placeholder="2"
                      min="1"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="bg-muted/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                      Room Type
                    </label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      className="w-full h-10 px-3 rounded-sm bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Select Room</option>
                      <option value="executive">Executive Room</option>
                      <option value="deluxe">Deluxe Suite</option>
                      <option value="presidential">Presidential Suite</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                    Special Requests
                  </label>
                  <Textarea
                    placeholder="Any special requests or requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-muted/50 border-border resize-none"
                  />
                </div>

                <Button type="submit" variant="luxury" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Reservation
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
