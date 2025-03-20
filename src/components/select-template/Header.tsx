import React from "react";
import { Bell, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <header className="w-full px-4 py-3 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 animate-fade-in">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" className="mr-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="6" x2="20" y2="6"></line>
                            <line x1="4" y1="12" x2="20" y2="12"></line>
                            <line x1="4" y1="18" x2="20" y2="18"></line>
                        </svg>
                    </Button>
          
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="py-2 pl-10 pr-4 rounded-full bg-background border border-border w-[280px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
        
                <div className="flex items-center gap-2">
                    <ThemeToggle />
          
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
                    </Button>
          
                    <Button variant="ghost" size="icon">
                        <Calendar className="h-5 w-5" />
                    </Button>
          
                    <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
            Add Event
                    </Button>
          
                    <div className="ml-4 flex items-center">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">H</div>
                        <span className="ml-2 font-medium">Hemant</span>
                        <svg className="ml-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;