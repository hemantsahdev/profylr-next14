import { useState } from "react";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MiscEventsProps {
    events: {
      id: number
      title: string
      description: string
      createdAt: string
      updatedAt: string
    }[]
  }

const MiscEvents = ({ events }: MiscEventsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    };
  
    const prevEvent = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    };
  
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <h2 className="text-2xl font-semibold mb-4">Misc Events</h2>
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card>
                            <CardContent className="p-6 pl-12" >
                                <h3 className="text-xl font-semibold mb-2">{events[currentIndex].title}</h3>
                                <p className="text-muted-foreground mb-4">{events[currentIndex].description}</p>
                                <div className="text-sm text-muted-foreground">
                                    <p>Created: {events[currentIndex].createdAt}</p>
                                    <p>Updated: {events[currentIndex].updatedAt}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4">
                    <Button variant="outline" size="icon" onClick={prevEvent}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4">
                    <Button variant="outline" size="icon" onClick={nextEvent}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default MiscEvents;