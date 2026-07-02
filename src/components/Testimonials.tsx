import React, { useState } from "react";
import { Landmark, HeartHandshake, GraduationCap, Scale, CheckCircle2, Star, Shield, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
interface TestimonialsProps {
    partners?: {
        funders: string[];
        financial: string[];
        academic: string[];
        legal: string[];
    };
}
export default function Testimonials({ partners }: TestimonialsProps) {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const categories = [
        {
            id: "funders",
            title: "Funders",
            theme: "from-indigo-600 via-indigo-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-blue-300",
            textColor: "text-gray-100",
            borderColor: "border-indigo-400/20",
            glowColor: "rgba(99, 102, 241, 0.15)",
            bgBadge: "bg-indigo-950/50 border border-indigo-500/20",
            badgeText: "text-indigo-300",
            icon: Landmark,
            items: partners?.funders || [
                "Rashtriya Mahila Kosh, New Delhi",
                "National Housing Bank, New Delhi",
                "Assam Cooperative Apex Bank Ltd.",
                "Assam Financial Corporation",
                "Assam Gramin Vikash Bank",
                "NEDFi",
                "National Cooperative Development Corporation (NCDC)",
                "Rashtriya Gramin Vikash Nidhi"
            ]
        },
        {
            id: "financial",
            title: "Financial Support",
            theme: "from-purple-600 via-purple-900 to-indigo-950",
            accentText: "text-amber-400",
            headingText: "text-cyan-300",
            textColor: "text-gray-100",
            borderColor: "border-purple-400/20",
            glowColor: "rgba(168, 85, 247, 0.15)",
            bgBadge: "bg-purple-950/50 border border-purple-500/20",
            badgeText: "text-purple-300",
            icon: HeartHandshake,
            items: partners?.financial || [
                "Rashtriya Mahila Kosh, New Delhi",
                "NABARD, Guwahati",
                "SIDBI, Guwahati",
                "Employment Generation Mission"
            ]
        },
        {
            id: "academic",
            title: "Academic Support",
            theme: "from-violet-600 via-violet-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-indigo-300",
            textColor: "text-gray-100",
            borderColor: "border-violet-400/20",
            glowColor: "rgba(139, 92, 246, 0.15)",
            bgBadge: "bg-violet-950/50 border border-violet-500/20",
            badgeText: "text-violet-300",
            icon: GraduationCap,
            items: partners?.academic || [
                "Sa-Dhan, New Delhi (SRO, RBI)",
                "Rashtriya Mahila Kosh, New Delhi",
                "FWWB",
                "NIPCCD",
                "Department Of Handloom And Textile, Government Of Assam",
                "NEDFi"
            ]
        },
        {
            id: "legal",
            title: "Legal Support",
            theme: "from-blue-600 via-blue-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-sky-300",
            textColor: "text-gray-100",
            borderColor: "border-blue-400/20",
            glowColor: "rgba(59, 130, 246, 0.15)",
            bgBadge: "bg-blue-950/50 border border-blue-500/20",
            badgeText: "text-blue-300",
            icon: Scale,
            items: partners?.legal || [
                "Sa-Dhan, New Delhi",
                "Registrar of Co-operative Societies, Guwahati",
                "Ranjan Baishya & Co.",
                "Advocate Kusum Sarma, Gauhati High Court"
            ]
        }
    ];
    const filteredPartners = categories.map(category => {
        const matchedItems = category.items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
        return {
            ...category,
            items: matchedItems,
            hasMatch: matchedItems.length > 0
        };
    }).filter(cat => cat.hasMatch);
    return (<section id="testimonials" className="py-24 bg-gradient-to-b from-[#FFF9FB] via-white to-[#FFF9FB] border-t border-[#D63384]/5 relative overflow-hidden">
      
      
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-purple-500/4 to-transparent rounded-full filter blur-[120px] pointer-events-none -translate-x-32"/>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#D63384]/4 to-transparent rounded-full filter blur-[150px] pointer-events-none translate-x-32"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="max-w-xl space-y-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/15 mb-2 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-purple-600 animate-pulse"/>
              <span className="text-[10px] font-extrabold tracking-widest text-purple-700 uppercase font-sans">
                INSTITUTIONAL ECOSYSTEM
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight text-gray-950 leading-[1.1]">
              Supporting Agencies.
            </h2>
            <p className="text-sm text-gray-500 font-sans">
              Prochesta is backed by established national banks, micro-finance federations, academic research bodies, and regulatory advisors ensuring robust social development governance.
            </p>
          </div>

          
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search specific agency (e.g. NEDFi)..." className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500/50 shadow-2xs"/>
              {searchTerm && (<button onClick={() => setSearchTerm("")} className="absolute right-3 top-3 text-[10px] font-mono text-gray-400 hover:text-gray-700">
                  Clear
                </button>)}
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          <AnimatePresence>
            {filteredPartners.map((cat) => {
            const IconComponent = cat.icon;
            const isHovered = hoveredCard === cat.id;
            return (<motion.div key={cat.id} layoutId={cat.id} onMouseEnter={() => setHoveredCard(cat.id)} onMouseLeave={() => setHoveredCard(null)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`relative rounded-[32px] bg-gradient-to-b ${cat.theme} p-6 sm:p-7 border ${cat.borderColor} flex flex-col justify-between text-left group overflow-hidden transition-all duration-300`} style={{
                    boxShadow: isHovered ? `0 20px 40px ${cat.glowColor}` : "none",
                    transform: isHovered ? "translateY(-4px)" : "none"
                }}>
                  
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(ellipse at center, #ffffff 1.5px, transparent 1.5px)`,
                    backgroundSize: "16px 16px"
                }}/>

                  <div className="space-y-6 relative z-10">
                    
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${cat.bgBadge}`}>
                        <IconComponent className="w-5 h-5 text-white"/>
                      </div>
                      
                      <span className={`text-[9px] font-black font-mono tracking-widest uppercase ${cat.badgeText} px-2.5 py-1 rounded-lg bg-white/5`}>
                        {cat.title}
                      </span>
                    </div>

                    
                    <div>
                      <h3 className={`text-2xl font-black tracking-tight font-sans ${cat.headingText} mb-4 leading-none`}>
                        {cat.title}
                      </h3>
                      
                      
                      <ul className="space-y-3.5 pt-2">
                        {cat.items.map((item, idx) => (<li key={idx} className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] leading-relaxed text-slate-100 font-sans group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 mt-2 block transition-transform group-hover/item:scale-130"/>
                            <span className="transition-colors duration-200 hover:text-white select-text">
                              {item}
                            </span>
                          </li>))}
                      </ul>
                    </div>
                  </div>

                  
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 select-none">
                    <span>CO-OPERATIVE</span>
                    <span>100% AUDITED</span>
                  </div>
                </motion.div>);
        })}
          </AnimatePresence>
        </div>

        
        {filteredPartners.length === 0 && (<div className="p-12 text-center bg-white border border-gray-150 rounded-2xl max-w-sm mx-auto shadow-xs">
            <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-3"/>
            <span className="block text-sm font-bold text-gray-900">No matched agencies</span>
            <span className="text-xs text-gray-500 mt-1 block">Try searching another query terms.</span>
          </div>)}



      </div>
    </section>);
}
