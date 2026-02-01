import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Calendar, Star } from "lucide-react";
import aboutImage from "@/assets/about-resort.jpg";

const stats = [
  { icon: Calendar, value: "10+", label: "Years of Excellence" },
  { icon: Users, value: "50K+", label: "Happy Guests" },
  { icon: Award, value: "25+", label: "Awards Won" },
  { icon: Star, value: "4.9", label: "Guest Rating" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-background overflow-hidden">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side with Parallax Effect */}
          <motion.div
            ref={ref}
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <img
                src={aboutImage}
                alt="The Grand Nirvana Resort"
                className="w-full h-[500px] object-cover rounded-sm shadow-[var(--shadow-elegant)]"
              />
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/30 rounded-sm -z-10" />
            </div>

            {/* Stats Overlay */}
            <motion.div
              className="absolute -bottom-8 left-4 right-4 md:left-8 md:right-8 bg-card p-6 rounded-sm shadow-[var(--shadow-card)] grid grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-accent" />
                  <div className="text-xl md:text-2xl font-serif font-semibold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="lg:pl-8 pt-16 lg:pt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="luxury-subheading">Our Story</span>
            <h2 className="luxury-heading text-4xl md:text-5xl text-foreground mt-4 mb-6">
              Welcome to
              <span className="gold-text"> Grand Nirvana</span>
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bareilly, a city in Uttar Pradesh, popularly known as Jumka City, is a land 
                rich in religious history, culture, and different forms of art, attracting 
                tourists and visitors from all over the world.
              </p>
              <p>
                Entering into the world of Nirvana will transport you away from the hustle 
                and bustle of the city. Spread across 10 acres, The Grand Nirvana gives you 
                a taste of contemporary luxury with a combination of traditional architecture 
                and modern day comforts.
              </p>
              <p>
                Crafted with a modern outlook, our rooms are bespoke luxury blended with 
                heartwarming aesthetics. From grand traditional Indian weddings to intimate 
                events, business meetings and conferences, we have spaces that cater to the 
                individual needs of our guests.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-accent">✦</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <p className="mt-6 font-serif italic text-lg text-foreground/80">
              "Where every moment becomes a cherished memory"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
