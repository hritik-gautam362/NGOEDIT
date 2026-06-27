import React, { useState, useEffect } from "react";
import { Menu, X, Heart, Shield, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
interface NavbarProps {
    onOpenVolunteer: () => void;
    onOpenInternship: () => void;
    onOpenAdmin: () => void;
    onScrollToSection: (id: string) => void;
}
export default function Navbar({ onOpenVolunteer, onOpenInternship, onOpenAdmin, onScrollToSection }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const menuItems = [
        { label: "Our Story", id: "about" },
        { label: "Events & Awards", id: "verticals" },
        { label: "Artisan Gallery", id: "gallery" },
        { label: "Donate", id: "donations" },
        { label: "Contact Us", id: "contact" }
    ];
    const handleNavClick = (id: string) => {
        onScrollToSection(id);
        setIsOpen(false);
    };
    return (<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#FFF9FB]/80 backdrop-blur-xl border-b border-[#D63384]/10 py-3 shadow-[0_4px_30px_rgba(214,51,132,0.02)]"
            : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="cursor-pointer">
          <Logo />
        </div>

        
        <nav className="hidden lg:flex items-center space-x-5 font-sans">
          {menuItems.map((item) => (<button key={item.id} onClick={() => handleNavClick(item.id)} className="text-[11.5px] font-black tracking-wider text-gray-600 hover:text-slate-900 transition-all duration-300 relative group py-2 px-3 rounded-xl hover:bg-pink-500/[0.04] cursor-pointer hover:scale-[1.04] active:scale-[0.97]">
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[3px] rounded-full bg-gradient-to-r from-[#D63384] to-[#7C3AED] transition-all duration-300 group-hover:w-[75%]"/>
            </button>))}
        </nav>

        
        <div className="hidden lg:flex items-center space-x-3.5">
          <button onClick={onOpenInternship} className="py-2 px-3.5 rounded-xl border border-gray-250 hover:border-[#7C3AED] text-gray-800 text-xs font-semibold hover:bg-[#7C3AED]/5 transition duration-300 cursor-pointer">
            Internships & Jobs
          </button>

          <button onClick={onOpenVolunteer} className="py-2 px-4 rounded-xl text-white font-semibold text-xs shadow-sm bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] hover:shadow-md transition duration-300 flex items-center space-x-1.5 cursor-pointer">
            <Heart className="w-3 h-3 fill-white"/>
            <span>Volunteer With Us</span>
          </button>
        </div>

        
        <div className="flex lg:hidden items-center space-x-3">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 hover:text-[#D63384] focus:outline-none rounded-xl hover:bg-gray-100 transition">
            {isOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>
      </div>

      
      {isOpen && (<div className="lg:hidden absolute top-full left-0 right-0 bg-[#FFF9FB] border-b border-[#D63384]/15 shadow-xl py-6 px-5 space-y-6 animate-fade-in z-50">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (<button key={item.id} onClick={() => handleNavClick(item.id)} className="text-left text-sm font-bold text-gray-800 hover:text-[#D63384] py-1 border-b border-gray-100/60">
                {item.label}
              </button>))}
          </div>

          
          <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-500 font-mono">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#D63384]"/>
              <span>0361-2963506 / 2660020</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#7C3AED]"/>
              <span>prochesta@hotmail.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={() => {
                onOpenInternship();
                setIsOpen(false);
            }} className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100">
              Internships & Jobs
            </button>
            <button onClick={() => {
                onOpenVolunteer();
                setIsOpen(false);
            }} className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#D63384] to-[#7C3AED]">
              ❤️ Join as Volunteer
            </button>
          </div>
        </div>)}
    </header>);
}
