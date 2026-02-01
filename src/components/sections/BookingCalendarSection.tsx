import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { format, addDays, isBefore, isAfter, isSameDay, differenceInDays, startOfToday } from "date-fns";
import { Calendar as CalendarIcon, Users, Bed, Check, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RoomType {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  available: boolean;
}

// Simulated availability data (in real app, this would come from backend)
const generateAvailability = () => {
  const availability: Record<string, RoomType[]> = {};
  const today = startOfToday();
  
  for (let i = 0; i < 90; i++) {
    const date = addDays(today, i);
    const dateKey = format(date, "yyyy-MM-dd");
    
    // Simulate some random availability
    const executiveAvailable = Math.random() > 0.3;
    const deluxeAvailable = Math.random() > 0.4;
    const presidentialAvailable = Math.random() > 0.5;
    
    availability[dateKey] = [
      { id: "executive", name: "Executive Room", price: 8999, maxGuests: 2, available: executiveAvailable },
      { id: "deluxe", name: "Deluxe Suite", price: 15999, maxGuests: 3, available: deluxeAvailable },
      { id: "presidential", name: "Presidential Suite", price: 35999, maxGuests: 4, available: presidentialAvailable },
    ];
  }
  
  return availability;
};

export function BookingCalendarSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  
  const availability = useMemo(() => generateAvailability(), []);
  const today = startOfToday();

  // Get available rooms for selected date range
  const availableRooms = useMemo(() => {
    if (!checkInDate || !checkOutDate) return [];
    
    const rooms: RoomType[] = [
      { id: "executive", name: "Executive Room", price: 8999, maxGuests: 2, available: true },
      { id: "deluxe", name: "Deluxe Suite", price: 15999, maxGuests: 3, available: true },
      { id: "presidential", name: "Presidential Suite", price: 35999, maxGuests: 4, available: true },
    ];
    
    // Check availability for each day in the range
    let currentDate = checkInDate;
    while (isBefore(currentDate, checkOutDate)) {
      const dateKey = format(currentDate, "yyyy-MM-dd");
      const dayAvailability = availability[dateKey];
      
      if (dayAvailability) {
        rooms.forEach((room) => {
          const dayRoom = dayAvailability.find(r => r.id === room.id);
          if (!dayRoom?.available) {
            room.available = false;
          }
        });
      }
      
      currentDate = addDays(currentDate, 1);
    }
    
    return rooms.filter(room => room.maxGuests >= guests);
  }, [checkInDate, checkOutDate, guests, availability]);

  const nights = checkInDate && checkOutDate ? differenceInDays(checkOutDate, checkInDate) : 0;
  
  const selectedRoomDetails = availableRooms.find(r => r.id === selectedRoom);
  const totalPrice = selectedRoomDetails ? selectedRoomDetails.price * nights : 0;

  // Calendar day styling based on availability
  const getDayClassName = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const dayAvailability = availability[dateKey];
    
    if (!dayAvailability) return "";
    
    const allUnavailable = dayAvailability.every(r => !r.available);
    const someUnavailable = dayAvailability.some(r => !r.available);
    
    if (allUnavailable) return "bg-destructive/20 text-destructive-foreground/50";
    if (someUnavailable) return "bg-accent/30";
    return "bg-green-500/20";
  };

  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date && checkOutDate && !isAfter(checkOutDate, date)) {
      setCheckOutDate(addDays(date, 1));
    }
    setCheckInOpen(false);
    setSelectedRoom(null);
  };

  const handleCheckOutSelect = (date: Date | undefined) => {
    setCheckOutDate(date);
    setCheckOutOpen(false);
    setSelectedRoom(null);
  };

  const handleBookNow = () => {
    if (selectedRoom && checkInDate && checkOutDate) {
      setShowBookingModal(true);
    }
  };

  return (
    <section id="availability" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-luxury" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="luxury-subheading">Plan Your Stay</span>
          <h2 className="luxury-heading text-4xl md:text-5xl mt-4 mb-6">
            Check <span className="gold-text">Availability</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your dates to view real-time room availability and secure the 
            perfect accommodation for your luxury getaway.
          </p>
        </motion.div>

        {/* Booking Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-sm shadow-xl border border-border overflow-hidden"
        >
          {/* Date Selection Bar */}
          <div className="p-6 md:p-8 bg-gradient-to-r from-primary to-primary/90">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Check-in Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-primary-foreground/70">
                  Check-in
                </label>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20",
                        !checkInDate && "text-primary-foreground/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckInSelect}
                      disabled={(date) => isBefore(date, today)}
                      modifiersClassNames={{
                        today: "bg-accent text-accent-foreground",
                      }}
                      className="p-3 pointer-events-auto"
                    />
                    <div className="p-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-sm bg-accent/40" /> Available
                        <span className="w-3 h-3 rounded-sm bg-accent/20 ml-2" /> Limited
                        <span className="w-3 h-3 rounded-sm bg-destructive/20 ml-2" /> Sold Out
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-primary-foreground/70">
                  Check-out
                </label>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20",
                        !checkOutDate && "text-primary-foreground/50"
                      )}
                      disabled={!checkInDate}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={handleCheckOutSelect}
                      disabled={(date) => 
                        isBefore(date, today) || 
                        (checkInDate ? !isAfter(date, checkInDate) : false)
                      }
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-primary-foreground/70">
                  Guests
                </label>
                <div className="flex items-center h-12 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-3">
                  <Users className="w-4 h-4 text-primary-foreground/70 mr-2" />
                  <select
                    value={guests}
                    onChange={(e) => {
                      setGuests(Number(e.target.value));
                      setSelectedRoom(null);
                    }}
                    className="flex-1 bg-transparent text-primary-foreground border-none focus:outline-none"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num} className="text-foreground">
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-primary-foreground/70 opacity-0">
                  Search
                </label>
                <Button 
                  variant="luxury" 
                  className="w-full h-12"
                  disabled={!checkInDate || !checkOutDate}
                >
                  Check Availability
                </Button>
              </div>
            </div>

            {/* Date Summary */}
            {nights > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-primary-foreground/20"
              >
                <p className="text-primary-foreground/80 text-sm text-center">
                  {nights} {nights === 1 ? "night" : "nights"} • {format(checkInDate!, "MMM d")} – {format(checkOutDate!, "MMM d, yyyy")}
                </p>
              </motion.div>
            )}
          </div>

          {/* Room Availability Results */}
          {checkInDate && checkOutDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-8"
            >
              <h3 className="font-serif text-xl mb-6">Available Accommodations</h3>
              
              <div className="space-y-4">
                {availableRooms.length > 0 ? (
                  availableRooms.map((room) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "p-4 md:p-6 rounded-sm border transition-all cursor-pointer",
                        room.available 
                          ? selectedRoom === room.id
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50 bg-muted/30 hover:bg-muted/50"
                          : "border-border bg-muted/20 opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => room.available && setSelectedRoom(room.id)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-sm flex items-center justify-center",
                            room.available ? "bg-accent/20" : "bg-muted"
                          )}>
                            <Bed className={cn("w-5 h-5", room.available ? "text-accent" : "text-muted-foreground")} />
                          </div>
                          <div>
                            <h4 className="font-serif text-lg">{room.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Up to {room.maxGuests} guests
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-8">
                          <div className="text-right">
                            <p className="text-2xl font-serif gold-text">
                              ₹{room.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">per night</p>
                          </div>
                          
                          {room.available ? (
                            selectedRoom === room.id ? (
                              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                                <Check className="w-5 h-5 text-accent-foreground" />
                              </div>
                            ) : (
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            )
                          ) : (
                            <span className="text-xs uppercase text-destructive font-medium">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No rooms available for {guests} guests. Try selecting fewer guests.
                    </p>
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              {selectedRoom && selectedRoomDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-muted/50 rounded-sm border border-border"
                >
                  <h4 className="font-serif text-lg mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room</span>
                      <span>{selectedRoomDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{nights} {nights === 1 ? "night" : "nights"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span>{guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rate</span>
                      <span>₹{selectedRoomDetails.price.toLocaleString()} × {nights}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-border flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="gold-text text-lg">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="luxury" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Empty State */}
          {(!checkInDate || !checkOutDate) && (
            <div className="p-8 md:p-12 text-center">
              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                Select your check-in and check-out dates to view available rooms
              </p>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent/60" />
            <span>All rooms available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-accent/50" />
            <span>Limited availability</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-destructive/50" />
            <span>Fully booked</span>
          </div>
        </motion.div>
      </div>

      {/* Booking Confirmation Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-center">
              Confirm Your Reservation
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Room</span>
                <span className="font-medium">{selectedRoomDetails?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-in</span>
                <span className="font-medium">{checkInDate && format(checkInDate, "PPP")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-out</span>
                <span className="font-medium">{checkOutDate && format(checkOutDate, "PPP")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Guests</span>
                <span className="font-medium">{guests}</span>
              </div>
              <div className="pt-4 border-t flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="font-serif text-xl gold-text">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center mb-6">
              By proceeding, you agree to our booking terms and cancellation policy.
            </p>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowBookingModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="luxury" 
                className="flex-1"
                onClick={() => {
                  // In real app, this would submit to backend
                  setShowBookingModal(false);
                  // Show success toast or redirect
                  alert("Booking request submitted! Our team will contact you shortly.");
                }}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
