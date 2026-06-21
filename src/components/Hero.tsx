import React, { useState, useEffect } from "react";
import { ArrowRight, Heart, Sparkles, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";
interface HeroProps {
    onOpenVolunteer: () => void;
    onOpenInternship: () => void;
    onScrollToSection: (id: string) => void;
}
export default function Hero({ onOpenVolunteer, onOpenInternship, onScrollToSection }: HeroProps) {
    const [liveStats, setLiveStats] = useState({
        volunteerCount: 0,
        internCount: 0,
        enrollmentCount: 0,
        totalRaised: 0,
        donationCount: 0
    });
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/public/stats");
                if (res.ok) {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const data = await res.json();
                        if (data && typeof data.volunteerCount === "number") {
                            setLiveStats(data);
                            return;
                        }
                    }
                }
                setLiveStats({
                    volunteerCount: 22450,
                    internCount: 3850,
                    enrollmentCount: 35000,
                    totalRaised: 84000000,
                    donationCount: 1450
                });
            }
            catch (e) {
                console.error("Error fetching live stats for Hero: ", e);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 6000);
        return () => clearInterval(interval);
    }, []);
    return (<section className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#FFF9FB]">
      
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#D63384]/10 to-[#7C3AED]/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: "12s" }}/>
      <div className="absolute bottom-12 right-12 w-[600px] h-[600px] bg-gradient-to-bl from-orange-200/20 via-[#FBBF24]/10 to-[#7C3AED]/10 rounded-full filter blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: "18s" }}/>

      
      <svg className="absolute inset-0 w-full h-full stroke-gray-200/30 stroke-[1.5] pointer-events-none" fill="none">
        <path d="M-100 200 C300 250, 400 100, 800 300 S1200 100, 1600 400"/>
        <path d="M-50 400 C200 450, 600 200, 900 600 S1400 400, 1800 800" strokeDasharray="5,15"/>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          
          <div className="lg:col-span-7 space-y-8 text-left">
            
            
            <div className="inline-flex items-center space-x-2 bg-[#D63384]/10 px-4 py-1.5 rounded-full border border-[#D63384]/15">
              <Sparkles className="w-4 h-4 text-[#D63384] animate-spin" style={{ animationDuration: "6s" }}/>
              <span className="text-xs font-semibold tracking-wider text-[#D63384] uppercase">
                Prochesta Co-operative Society Asom
              </span>
            </div>

            
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-sans font-black tracking-tight text-gray-950 leading-[1.08] relative">
              Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D63384] to-[#7C3AED]">Women</span>.<br />
              Transforming <span className="italic font-serif font-light text-gray-800">Communities</span>.
            </h1>

            
            <p className="text-base md:text-lg text-gray-650 font-sans max-w-xl leading-relaxed">
              For over two decades, Prochesta Multipurpose Co-Operative Society Asom Ltd. has been working to strengthen communities through women empowerment, financial inclusion, entrepreneurship development, and sustainable livelihood opportunities across Assam.
            </p>

            
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={onOpenVolunteer} className="py-3 px-6 rounded-2xl text-white font-bold text-sm shadow-md bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] hover:shadow-lg transition-all duration-300 flex items-center space-x-2 cursor-pointer">
                <Heart className="w-4 h-4 fill-white animate-pulse"/>
                <span>Volunteer With Us</span>
              </button>

              <button onClick={onOpenInternship} className="py-3 px-6 rounded-2xl border border-gray-300 hover:border-[#7C3AED] text-gray-800 font-bold text-sm hover:bg-[#7C3AED]/5 transition-all duration-300 cursor-pointer">
                Apply for Internships & Jobs
              </button>

              <button onClick={() => onScrollToSection("verticals")} className="py-3 px-5 text-gray-500 hover:text-[#D63384] text-sm font-semibold flex items-center space-x-1.5 hover:underline transition duration-200 cursor-pointer">
                <span>Explore Impact</span>
                <ArrowRight className="w-4 h-4"/>
              </button>
            </div>

            
            <div className="flex items-center space-x-6 text-[11px] text-gray-400 font-mono pt-4 border-t border-gray-100">
              <div>REGISTRY: <span className="font-bold text-gray-700">GUWAHATI - #781003</span></div>
              <div>STATE: <span className="font-bold text-gray-700">ASSAM, INDIA</span></div>
            </div>

          </div>

          
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            <div className="relative w-80 h-96 md:w-96 md:h-[420px] rounded-3xl" id="hero-interactive-stage">
              
              
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-r from-[#D63384]/20 via-[#7C3AED]/20 to-amber-400/10 filter blur-xl animate-pulse pointer-events-none"/>

              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF5F8] via-[#FFFCFD] to-white border border-pink-100/80 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(214,51,132,0.08)] p-6 flex flex-col justify-between">
                
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-widest text-[#D63384] font-bold uppercase flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D63384] rounded-full animate-pulse"/>
                    <span>Assam Women's Cooperative</span>
                  </span>
                  <div className="bg-[#D63384]/10 text-[#D63384] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Live Ledger
                  </div>
                </div>

                
                <div className="flex-1 flex items-center justify-center relative py-6">
                  
                  
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#D63384]/20 animate-spin" style={{ animationDuration: "60s" }}/>
                  
                  
                  <div className="absolute w-36 h-36 rounded-full border-2 border-dotted border-[#7C3AED]/30 animate-spin" style={{ animationDuration: "35s" }}/>
                  
                  
                  <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#FFF5F8] to-[#FFEDF4] flex items-center justify-center shadow-inner border border-pink-100/50">
                    <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-md border border-pink-100/60 overflow-hidden p-0">
                      <Logo iconOnly={true} logoClassName="w-32 h-32 animate-none"/>
                    </div>
                  </div>

                  
                  <div className="absolute left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D63384] to-transparent opacity-50 top-[42%]"/>
                  <div className="absolute left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent opacity-50 bottom-[42%]"/>
                  <div className="absolute top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-amber-400 to-transparent opacity-40 left-1/2"/>
                </div>

                
                <div className="bg-white p-3.5 rounded-2xl border border-pink-100/80 shadow-xs relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute -top-1 right-2 text-pink-300/30 font-serif text-6xl leading-none pointer-events-none select-none select-all-none">”</div>
                  <p className="text-[11px] font-serif italic text-gray-800 leading-relaxed relative z-10 pr-4">
                    "Empowering a woman doesn't just uplift her—it weaves self-reliance and strength into the very fabric of her community's future."
                  </p>
                  <div className="mt-2 flex items-center justify-between z-10">
                    <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-[#D63384] flex items-center space-x-1">
                      <span>🌸</span>
                      <span>Prochesta Sisterhood Alliance</span>
                    </span>
                  </div>
                </div>

              </div>



            </div>

          </div>

        </div>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 bg-[#1F2937] py-4 border-t border-gray-800 z-20 overflow-hidden transform skew-y-0.5">
        <div className="flex whitespace-nowrap animate-marquee font-sans uppercase tracking-[5px] text-xs font-bold text-gray-400/90 gap-12">
          <span>WOMEN EMPOWERMENT • RURAL DIGITAL CO-OPERATIVES • GRASSROOTS LITERACY • SKILL DEVELOPMENT • CRAFT REVIVAL • ASSAM ON THE GLOBAL STAGE • ECONOMIC SELF-RELIANCE</span>
          <span>WOMEN EMPOWERMENT • RURAL DIGITAL CO-OPERATIVES • GRASSROOTS LITERACY • SKILL DEVELOPMENT • CRAFT REVIVAL • ASSAM ON THE GLOBAL STAGE • ECONOMIC SELF-RELIANCE</span>
          <span>WOMEN EMPOWERMENT • RURAL DIGITAL CO-OPERATIVES • GRASSROOTS LITERACY • SKILL DEVELOPMENT • CRAFT REVIVAL • ASSAM ON THE GLOBAL STAGE • ECONOMIC SELF-RELIANCE</span>
        </div>
      </div>

      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 14s linear infinite;
        }
      `}</style>

    </section>);
}
