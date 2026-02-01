import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { DiningSection } from "@/components/sections/DiningSection";
import { VirtualTourSection } from "@/components/sections/VirtualTourSection";
import { BookingCalendarSection } from "@/components/sections/BookingCalendarSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <DiningSection />
        <VirtualTourSection />
        <BookingCalendarSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
