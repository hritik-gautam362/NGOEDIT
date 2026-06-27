import React, { useState, useEffect } from "react";
import { Eye, Target, BookOpen, Users2, Landmark, ShieldCheck, Heart, Quote, Sparkles, Award, Flame, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import founderImg from "../assets/images/debadatta_barkataki_1781534488476.png";
const milestones = [
    {
        year: "1987",
        title: "1987",
        description: "The literacy movement sparks community awareness and participation.",
        icon: BookOpen,
        color: "from-pink-500 to-rose-500",
        glow: "rgba(214, 51, 132, 0.4)",
        dateDetail: "Late 1980s Movement"
    },
    {
        year: "1998",
        title: "1998",
        description: "Women-led groups begin forming through community workshops and collective action.",
        icon: Users2,
        color: "from-purple-500 to-indigo-500",
        glow: "rgba(124, 58, 237, 0.4)",
        dateDetail: "SHG Formations"
    },
    {
        year: "1999",
        title: "1999",
        description: "Prochesta is officially registered as a society.",
        icon: ShieldCheck,
        color: "from-teal-500 to-emerald-500",
        glow: "rgba(20, 184, 166, 0.4)",
        dateDetail: "Society Registration"
    },
    {
        year: "2012",
        title: "2012",
        description: "Registered as a cooperative organization under Assam Co-operative legislation.",
        icon: Landmark,
        color: "from-[#D63384] to-[#7C3AED]",
        glow: "rgba(214, 51, 132, 0.4)",
        dateDetail: "Co-operative Legacy"
    },
    {
        year: "Today",
        title: "Today",
        description: "Supporting women through empowerment, developing entrepreneurship and financial inclusion, and community development.",
        icon: Heart,
        color: "from-amber-500 to-orange-500",
        glow: "rgba(245, 158, 11, 0.4)",
        dateDetail: "Sustainable Future"
    }
];
export default function AboutUs() {
    const [selectedMilestone, setSelectedMilestone] = useState<number>(milestones.length - 1);
    const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsFounderModalOpen(false);
                setIsBoardModalOpen(false);
                setIsAdvisoryModalOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };
    return (<>
      <section id="about" className="py-24 bg-gradient-to-b from-white via-pink-50/15 to-white border-t border-[#D63384]/5 relative overflow-hidden">
      
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-[#D63384]/4 to-transparent rounded-full filter blur-[120px] pointer-events-none -translate-x-32"/>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#7C3AED]/4 to-transparent rounded-full filter blur-[150px] pointer-events-none translate-x-32"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          
          <div className="lg:col-span-7 flex flex-col justify-between text-left">
            <div>
              
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#D63384]/10 to-[#7C3AED]/10 px-4 py-1.5 rounded-full border border-[#D63384]/15 mb-6 shadow-2xs">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D63384] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D63384]"></span>
                </div>
                <span className="text-xs font-extrabold tracking-widest text-[#D63384] uppercase font-sans">
                  ABOUT PROCHESTA
                </span>
              </motion.div>

              
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-gray-950 leading-tight mb-8">
                From Literacy To <span className="bg-gradient-to-r from-[#D63384] via-[#7C3AED] to-amber-500 bg-clip-text text-transparent">Lasting Change</span>
              </motion.h2>

              
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="space-y-5 font-sans text-gray-700 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                <motion.p variants={itemVariants} className="font-medium text-gray-900 leading-relaxed">
                  The story of Prochesta began with a simple belief — when women are empowered with knowledge, entire communities move forward.
                </motion.p>
                <motion.p variants={itemVariants}>
                  In the late 1980s, literacy movements across Assam inspired local volunteers and learners, majority of whom were women eager to continue their journey beyond education. What started as a movement for learning soon became a movement for opportunity, self-reliance, and collective growth.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Through discussions, workshops, and community participation, women came together to form Self Help Groups (SHGs), creating a foundation for financial independence and social progress. These groups quickly spread across rural Assam, bringing people together through shared purpose and determination. It was named Prochesta - endeavour.
                </motion.p>
                <motion.p variants={itemVariants}>
                  In 1999, Prochesta was formally registered as a society, strengthening its mission to support women and communities through organized development initiatives. Over the years, the organization continued to grow, eventually becoming a registered cooperative in 2012.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Today, Prochesta continues to work alongside communities to promote financial inclusion, entrepreneurship and skill development, and creating sustainable opportunities for women across Assam.
                </motion.p>
              </motion.div>
            </div>

            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative p-7 bg-white/60 backdrop-blur-md rounded-3xl border border-pink-100 shadow-[0_12px_40px_rgba(214,51,132,0.03)] mt-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-[#D63384]/3 via-transparent to-transparent rounded-full pointer-events-none"/>
              <Quote className="absolute top-4 left-4 w-12 h-12 text-pink-200/40 pointer-events-none"/>
              <div className="relative z-10 pl-6 border-l-3 border-gradient-[#D63384] border-[#D63384]">
                <p className="text-gray-800 text-sm sm:text-base font-serif italic font-medium leading-relaxed">
                  "Real change begins when women are given the opportunity to learn, lead, and create a better future."
                </p>
                <div className="mt-3 flex items-center space-x-2">
                  <div className="w-5 h-[1px] bg-[#D63384]/50"/>
                  <span className="text-[10px] uppercase tracking-widest text-[#D63384] font-bold">THE PROCHESTA PLEDGE</span>
                </div>
              </div>
            </motion.div>

            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4 text-left">
              <button id="explore-founder-legacy-btn" onClick={() => setIsFounderModalOpen(true)} className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-950 px-8 py-4 text-sm font-bold text-white shadow-[0_15px_30px_rgba(24,24,27,0.15)] hover:shadow-[0_20px_40px_rgba(214,51,132,0.15)] hover:from-[#D63384] hover:to-[#7C3AED] transition-all duration-350 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center space-x-3 border border-white/5">
                
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[250%] transition-transform duration-1000 ease-in-out"/>
                
                <Award className="w-4.5 h-4.5 text-pink-400 group-hover:text-white group-hover:rotate-12 transition-all duration-300"/>
                <span className="font-semibold tracking-wide">Explore Founder Legacy</span>
                <span className="text-pink-400 group-hover:text-white font-mono font-bold">&rarr;</span>
              </button>
            </motion.div>
          </div>

          
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center space-y-6">
            
            
            <div className="grid grid-cols-2 gap-4">
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsBoardModalOpen(true)} className="flex items-center justify-center space-x-2 py-4 px-4 bg-white/80 backdrop-blur-md hover:bg-pink-50/40 text-gray-900 border border-pink-200 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#D63384]/40 hover:shadow-[0_12px_24px_rgba(214,51,132,0.06)] cursor-pointer text-xs font-black font-sans uppercase tracking-widest transition-all">
                <Users2 className="w-4 h-4 shrink-0 text-[#D63384]"/>
                <span className="truncate">Board of Directors</span>
              </motion.button>
              
              <motion.button whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsAdvisoryModalOpen(true)} className="flex items-center justify-center space-x-2 py-4 px-4 bg-white/80 backdrop-blur-md hover:bg-pink-50/40 text-gray-900 border border-pink-200 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.01)] hover:border-[#7C3AED]/40 hover:shadow-[0_12px_24px_rgba(124,58,237,0.06)] cursor-pointer text-xs font-black font-sans uppercase tracking-widest transition-all">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#7C3AED]"/>
                <span className="truncate">Executives</span>
              </motion.button>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="p-6 sm:p-8 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_20px_50px_rgba(124,58,237,0.05)] relative w-full">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-mono tracking-widest text-[#7C3AED] font-bold uppercase flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5"/>
                  <span>Interactive Timeline</span>
                </span>
                <span className="text-[10px] text-gray-400 font-mono">Click milestones to focus</span>
              </div>

              
              <div className="relative text-left space-y-6">
                
                
                <div className="absolute left-[23px] top-6 bottom-6 w-0.5 bg-gray-100"/>
                
                
                <motion.div className="absolute left-[23px] top-6 origin-top w-0.5 bg-gradient-to-b from-[#D63384] to-[#7C3AED]" style={{
            height: `${(selectedMilestone / (milestones.length - 1)) * 90}%`,
        }} layout transition={{ type: "spring", stiffness: 70, damping: 15 }}/>

                
                {milestones.map((item, index) => {
            const IconComponent = item.icon;
            const isSelected = selectedMilestone === index;
            return (<motion.div key={index} onClick={() => setSelectedMilestone(index)} className="group cursor-pointer relative z-10" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <div className="flex items-start space-x-4">
                        
                        <div className="relative">
                          
                          {isSelected && (<motion.span layoutId="timeline-halo" transition={{ type: "spring", stiffness: 100, damping: 12 }} className="absolute -inset-1.5 rounded-full bg-[#D63384]/15 filter blur-xs animate-pulse"/>)}

                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${isSelected
                    ? `bg-gradient-to-tr ${item.color || "from-[#D63384] to-[#7C3AED]"} border-transparent text-white shadow-md`
                    : "bg-white border-gray-100 text-gray-400 group-hover:border-[#D63384]/30 group-hover:text-gray-700"}`}>
                            <IconComponent className="w-5 h-5"/>
                          </div>
                        </div>

                        
                        <div className="flex-1 mt-1.5">
                          <div className="flex items-center space-x-2">
                            <span className={`text-[15px] font-black transition-colors ${isSelected ? "text-gray-950 font-black scale-102 transform origin-left" : "text-gray-400 group-hover:text-gray-600"}`}>
                              {item.year}
                            </span>
                            {isSelected && (<motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[10px] font-mono tracking-wide text-[#pink-600] text-[#D63384] bg-pink-50 border border-pink-100 rounded-full px-2">
                                {item.dateDetail}
                              </motion.span>)}
                          </div>
                          
                          
                          <motion.div className={`rounded-2xl mt-1.5 transition-all duration-300 ${isSelected
                    ? "p-3.5 bg-gray-50/80 border border-gray-100 text-gray-800 shadow-2xs font-medium"
                    : "text-gray-500 overflow-hidden text-[12px] group-hover:text-gray-700"}`}>
                            <p className="text-[12.5px] leading-relaxed">
                              {item.description}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>);
        })}

              </div>
            </motion.div>
          </div>

        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-18">
          
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} whileHover={{ y: -8, scale: 1.01 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-tr from-[#FFFDFE] to-white border border-[#D63384]/10 shadow-[0_15px_45px_col-span-rgba(214,51,132,0.03)] hover:shadow-[0_25px_60px_rgba(214,51,132,0.08)] transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/0 via-transparent to-pink-500/0 group-hover:from-rose-500/2 group-hover:to-pink-500/4 transition-all duration-500 pointer-events-none"/>

            <div className="space-y-6">
              
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="p-4 bg-gradient-to-tr from-[#D63384] to-pink-400 text-white rounded-2xl w-fit shadow-lg shadow-pink-500/15">
                <Eye className="w-6 h-6"/>
              </motion.div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#D63384] font-bold uppercase block">
                  Future-focused Legacy
                </span>
                <h3 className="text-2xl font-black font-sans text-gray-950">
                  Our Vision
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-sans font-light">
                  To create a future where every woman has the confidence, resources, and opportunities to improve her life, support her family, and contribute meaningfully to her community.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-8 pt-5 flex justify-between items-center text-[10px] font-mono text-gray-400 tracking-wider">
              <span>PROCHESTA ALIGNMENT</span>
              <span className="font-bold text-[#D63384] opacity-80 group-hover:opacity-100 transition-opacity flex items-center space-x-1 uppercase">
                <span>Empowering Possibilities</span>
              </span>
            </div>
          </motion.div>

          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} whileHover={{ y: -8, scale: 1.01 }} transition={{ type: "spring", stiffness: 120, damping: 20 }} className="p-8 sm:p-10 rounded-[32px] bg-gradient-to-tr from-[#FAF9FF] to-white border border-[#7C3AED]/10 shadow-[0_15px_45px_rgba(124,58,237,0.03)] hover:shadow-[0_25px_60px_rgba(124,58,237,0.08)] transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/0 via-transparent to-indigo-500/0 group-hover:from-[#7C3AED]/2 group-hover:to-indigo-500/4 transition-all duration-500 pointer-events-none"/>

            <div className="space-y-6">
              
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="p-4 bg-gradient-to-tr from-[#7C3AED] to-indigo-500 text-white rounded-2xl w-fit shadow-lg shadow-[#7C3AED]/15">
                <Target className="w-6 h-6"/>
              </motion.div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#7C3AED] font-bold uppercase block">
                  Core Mandate
                </span>
                <h3 className="text-2xl font-black font-sans text-gray-950">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-[14px] leading-relaxed font-sans font-light">
                  To strengthen communities through sustainable financial services, capacity building, entrepreneurship support, and women-led development initiatives that create lasting social and economic impact.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-8 pt-5 flex justify-between items-center text-[10px] font-mono text-gray-400 tracking-wider">
              <span>SOCIETY BLUEPRINT</span>
              <span className="font-bold text-[#7C3AED] opacity-80 group-hover:opacity-100 transition-opacity flex items-center space-x-1 uppercase">
                <span>Creating Sustainable Impact</span>
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>

    
    <AnimatePresence>
      {isFounderModalOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFounderModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-950/40 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10">
          
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/5 rounded-full blur-[80px] pointer-events-none select-none"/>
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[90px] pointer-events-none select-none"/>

          
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 280, damping: 26 }
            }} exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
                transition: { duration: 0.2, ease: "easeInOut" }
            }} drag="y" dragConstraints={{ top: 0, bottom: 400 }} dragElastic={0.15} dragSnapToOrigin={true} onDragEnd={(e, info) => {
                if (info.offset.y > 120) {
                    setIsFounderModalOpen(false);
                }
            }} onClick={(e) => e.stopPropagation()} className="relative w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-5xl rounded-t-[32px] md:rounded-[40px] border border-white/20 bg-white/45 backdrop-blur-3xl shadow-[0_45px_100px_-20px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.7)] text-gray-900 overflow-hidden flex flex-col hover:shadow-[0_45px_100px_-20px_rgba(214,51,132,0.1),_inset_0_1px_1px_rgba(255,255,255,0.85)] transition-shadow duration-500 group">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/25 pointer-events-none select-none"/>

            
            <div className="sticky top-0 bg-white/30 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between z-30">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-gradient-to-tr from-amber-500/10 to-pink-500/10 border border-amber-500/20 rounded-xl">
                  <Award className="w-4 h-4 text-amber-700 animate-pulse"/>
                </div>
                <span className="text-[10px] md:text-xs font-black font-sans tracking-widest text-[#D63384] uppercase">
                  PROCHESTA LEGACY ARCHIVES
                </span>
              </div>

              
              <div className="flex items-center space-x-2.5">
                <span className="hidden sm:inline-block text-[9px] text-gray-500 font-mono bg-white/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/30 font-bold uppercase tracking-wider">
                  ESC to close
                </span>
                
                <span className="inline-block sm:hidden text-[9px] text-[#D63384] font-extrabold font-sans bg-pink-100/50 px-2 py-1 rounded-lg border border-pink-200/15">
                  Swipe down to close
                </span>

                <button onClick={() => setIsFounderModalOpen(false)} className="p-1.5 sm:p-2 rounded-full bg-white/70 hover:bg-[#D63384] hover:text-white text-gray-700 transition-all border border-white/50 cursor-pointer shadow-sm active:scale-95" aria-label="Close Legacy archive">
                  <X className="w-4.5 h-4.5"/>
                </button>
              </div>
            </div>

            
            <div className="overflow-y-auto p-6 sm:p-8 md:p-12 space-y-12 md:space-y-16 text-left flex-1 scrollbar-thin">
              
              
              <div className="flex justify-center -mt-4 sm:-mt-6 mb-4 select-none pointer-events-none md:hidden">
                <div className="w-12 h-1 rounded-full bg-gray-400/40"/>
              </div>

              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                
                
                <div className="lg:col-span-5">
                  
                  <div className="relative rounded-[32px] bg-gradient-to-br from-gray-950/98 via-[#180e25]/98 to-gray-950 p-6 sm:p-8 text-white overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/10">
                    
                    <span className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full bg-pink-400 opacity-60 animate-bounce" style={{ animationDuration: "3s" }}/>
                    <span className="absolute bottom-16 right-12 w-1 h-1 rounded-full bg-[#7C3AED] opacity-50 animate-pulse" style={{ animationDuration: "2s" }}/>
                    <span className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-amber-400 opacity-30 animate-pulse" style={{ animationDuration: "4s" }}/>
                    
                    <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-[35px] pointer-events-none select-none"/>
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/10 rounded-full blur-[35px] pointer-events-none select-none"/>

                    
                    <div className="relative flex flex-col items-center py-4 text-center">
                      
                      
                      <div className="relative mb-6 select-none">
                        
                        <div className="absolute inset-x-[-12px] inset-y-[-12px] rounded-full border border-dashed border-pink-500/30 animate-spin" style={{ animationDuration: "35s" }}/>
                        <div className="absolute inset-x-[-6px] inset-y-[-6px] rounded-full border border-dotted border-[#7C3AED]/40 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }}/>
                        
                        
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 via-purple-600 to-amber-500 opacity-25 blur-md scale-95 animate-pulse"/>

                        
                        <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500/90 via-[#7C3AED]/90 to-amber-500/90 p-0.5 shadow-[0_0_35px_rgba(214,51,132,0.35)] flex items-center justify-center relative">
                          <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
                            
                            <div className="absolute inset-y-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-pulse" style={{ animationDuration: "3s" }}/>

                            <img src={founderImg} alt="Dr. Debadatta Barkataki" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer"/>
                          </div>
                        </div>
                      </div>

                      
                      <div className="space-y-1.5 mt-2">
                        <h4 className="text-xl font-black font-sans tracking-tight text-white leading-tight">
                          Dr. Debadatta Barkataki
                        </h4>
                        <p className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold bg-white/5 border border-white/10 px-3 py-0.5 rounded-full w-fit mx-auto select-none">
                          1937 — 2021
                        </p>
                        <p className="text-[12.5px] text-gray-300 font-sans max-w-xs mx-auto leading-relaxed mt-2 font-medium">
                          Chemistry educator, social visionary, and community architect.
                        </p>
                      </div>

                      
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent my-5"/>

                      
                      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                        <span className="text-[9px] font-extrabold font-mono tracking-wider bg-pink-500/20 border border-pink-500/40 text-pink-200 rounded-full px-3 py-1 shadow-xs">
                          FOUNDER
                        </span>
                        <span className="text-[9px] font-extrabold font-mono tracking-wider bg-purple-500/20 border border-purple-500/40 text-purple-200 rounded-full px-3 py-1 shadow-xs">
                          VISIONARY
                        </span>
                        <span className="text-[9px] font-extrabold font-mono tracking-wider bg-amber-500/20 border border-amber-500/40 text-amber-200 rounded-full px-3 py-1 shadow-xs">
                          MENTOR
                        </span>
                        <span className="text-[9px] font-extrabold font-mono tracking-wider bg-blue-500/20 border border-blue-500/40 text-blue-200 rounded-full px-3 py-1 shadow-xs">
                          COMMUNITY LEADER
                        </span>
                      </div>

                      
                      <div className="mt-8 flex items-center space-x-2 text-[10.5px] font-mono text-gray-400">
                        <Flame className="w-4 h-4 text-amber-500 animate-pulse"/>
                        <span>In Cherished Memory • 23 November 2021</span>
                      </div>

                    </div>
                  </div>
                </div>

                
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between self-stretch">
                  
                  
                  <div className="space-y-4 text-gray-700 text-[14px] sm:text-[14.5px] font-sans leading-relaxed text-left">
                    <h3 className="text-xl md:text-2xl font-black font-sans text-gray-950 tracking-tight mb-2">
                      The Visionary Behind Prochesta
                    </h3>
                    <p className="text-gray-900 font-bold border-l-3 border-[#D63384] pl-5 italic leading-relaxed text-sm sm:text-[15px]">
                      No organization is built by one individual alone. It grows through the dedication, support, and shared efforts of many people who believe in a common purpose. Prochesta is no exception. From its earliest days, the organization was strengthened by a network of committed individuals who contributed their time, knowledge, and encouragement. Their support remains an important part of Prochesta's journey, and the organization continues to honor their contributions with gratitude.
                    </p>
                    
                    <p>
                      At the heart of this journey was Dr. Debadatta Barkataki, the visionary who first conceptualized the idea of Prochesta. While serving as a Chemistry teacher at B. Borooah College, he was actively involved with various social organizations and played a significant role in literacy movements both within Assam and across India.
                    </p>
                    
                    <p>
                      Recognizing the need for sustainable community development and women-led collective action, he worked alongside like-minded individuals to shape the foundation of what would eventually become Prochesta. Through determination, leadership, and a commitment to social progress, he helped establish an organization that continues to create positive change today.
                    </p>
                    
                    <p>
                      Dr. Debadatta Barkataki served as the Founder Executive Director of Prochesta and later continued to guide the organization as an advisor. His contributions, leadership, and vision remain an enduring part of Prochesta's identity.
                    </p>
                    
                    <p className="text-[#D63384] font-extrabold text-xs font-mono uppercase tracking-wider flex items-center space-x-2 pt-2">
                      <span className="w-2 h-2 rounded-full bg-[#D63384] animate-ping shrink-0"/>
                      <span>The organization deeply remembers and honors his legacy following his passing on 23 November 2021.</span>
                    </p>
                  </div>

                  
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-neutral-900/5 backdrop-blur-md border border-neutral-200/40 shadow-xs overflow-hidden text-left mt-4 select-none">
                    
                    <Quote className="absolute -top-2 right-4 w-24 h-24 text-pink-500/5 pointer-events-none select-none"/>

                    <div className="relative z-10 space-y-3">
                      <p className="text-gray-950 font-serif italic text-sm sm:text-base opacity-95 leading-relaxed pr-6">
                        "Great institutions begin with a vision, but they endure because that vision inspires others to carry it forward."
                      </p>
                      
                      
                      <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#D63384] font-bold uppercase">
                        <span className="w-5 h-[1px] bg-[#D63384]"/>
                        <span>IN HONOR OF THE SPIRIT OF PROCHESTA</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              
              <div className="flex justify-end pt-6 border-t border-white/20">
                <button onClick={() => setIsFounderModalOpen(false)} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-950 text-white text-xs font-bold tracking-wider uppercase font-mono shadow-md hover:shadow-lg hover:shadow-pink-500/10 active:scale-98 transition-all hover:-translate-y-0.5 cursor-pointer border border-white/5 text-center">
                  Close Legacy Window &times;
                </button>
              </div>

            </div>

          </motion.div>
        </motion.div>)}
    </AnimatePresence>

    
    <AnimatePresence>
      {isBoardModalOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBoardModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-slate-950/80 flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10 select-none font-sans">
          
          <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-pink-500/5 rounded-full blur-[90px] pointer-events-none select-none"/>
          <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-[#7C3AED]/5 rounded-full blur-[100px] pointer-events-none select-none"/>

          
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 280, damping: 26 }
            }} exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
                transition: { duration: 0.2, ease: "easeInOut" }
            }} onClick={(e) => e.stopPropagation()} className="relative w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-5xl rounded-t-[32px] md:rounded-[40px] border border-slate-200 bg-slate-50 text-gray-900 overflow-hidden flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-all duration-300">
            
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-30">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-pink-50 border border-pink-100 rounded-xl">
                  <Users2 className="w-4 h-4 text-[#D63384]"/>
                </div>
                <span className="text-[10px] md:text-sm font-black tracking-widest text-[#D63384] uppercase">
                  BOARD DIRECTORY
                </span>
              </div>

              
              <div className="flex items-center space-x-2.5">
                <span className="hidden sm:inline-block text-[9px] text-gray-400 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-250 font-bold uppercase tracking-wider">
                  ESC to close
                </span>
                
                <button onClick={() => setIsBoardModalOpen(false)} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-[#D63384] hover:text-white text-gray-700 transition-all border border-slate-200 cursor-pointer shadow-sm active:scale-95" aria-label="Close">
                  <X className="w-4.5 h-4.5"/>
                </button>
              </div>
            </div>

            
            <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6 text-left flex-1 scrollbar-thin">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                  Board of Directors
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Prochesta's registered board steering economic programs, women empowerment coalitions, and statutory cooperative operations across Assam.
                </p>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                {
                    name: "Ms Madhobi Medhi",
                    role: "Chairperson",
                    initials: "M.M",
                    // description: "Leading intellectual and social advocate shaping Prochesta's macro-governance, institutional compliance, and ethical mandate structures."
                },
                {
                    name: "Dr. Anjana Borkakati",
                    role: "Executive Director",
                    initials: "A.B",
                    // description: "Chief operational director steering program execution, donor relationships, self-help-group networks, and academic-grassroots translation modules."
                },
                {
                    name: "Mr. Subhan Bora",
                    role: "Managing Director (Ex Officio Member)",
                    initials: "S.B",
                    // description: "Administrative registrar coordinating external department clearances, structural auditing mandates, and active cooperative oversight models."
                },
                {
                    name: "Mr. Ranjit Sarma",
                    role: "Director Administration",
                    initials: "R.S",
                    // description: "Supervising internal logistics, physical workspace systems, financial records validation, and regional branch operations connectivity."
                },
                {
                    name: "Mr. Tapan Kr. Sarma",
                    role: "Director (Member)",
                    initials: "T.S",
                    // description: "Coordinating executive communications, public welfare linkages, field deployment strategies, and general assembly voting consensus."
                },
                {
                    name: "Mr. Jamini Ranjan Das",
                    role: "Director (Member)",
                    initials: "J.D",
                    // description: "Directing weaver guild alliances, physical material logistics, and grassroots cluster development initiatives."
                },
                {
                    name: "Mrs. Sushnata Goswami",
                    role: "Director (Member)",
                    initials: "S.G",
                    // description: "Dedicated welfare leader coordinating regional women-empowerment cooperatives and village community networks."
                },
                {
                    name: "Mr. Dwipendra Kr. Sharma",
                    role: "Director (Member)",
                    initials: "D.S",
                    // description: "Managing regional stakeholder communications, local micro-credit outreach campaigns, and compliance audit alignment with cooperative rules."
                },
                // {
                //     name: "Mr. Hiranya Bhattacharya",
                //     role: "Director (Member)",
                //     initials: "H.B",
                //     description: "Providing legal guidance and administrative strategy support for grassroots cooperative federation activities."
                // },
                {
                    name: "Mr. Munindra Kakati",
                    role: "Director (Member)",
                    initials: "M.K",
                    // description: "Advising on market integration, digital training workshops, and cooperative weavers' financial accessibility structures."
                },
                {
                    name: "Mr. Paresh Dev Choudhury",
                    role: "Director (Member)",
                    initials: "P.C",
                    // description: "Supervising field research outreach, demographic data classification, and community developmental program reviews."
                },
                {
                    name: "Mr. Balen Choudhury",
                    role: "Director (Member)",
                    initials: "B.C",
                    // description: "Structuring logistics, artisan tools distribution pipelines, and workshop facilities coordination across rural zones."
                },
                {
                    name: "Mr. Kusum Sarma",
                    role: "Director (Member)",
                    initials: "K.S",
                    // description: "Coordinating development funds allocation, field audits, and primary relations with state-level cooperative agencies."
                },
                {
                    name: "Ms Kalpana Goswami",
                    role: "Director (Member)",
                    initials: "K.G",
                    // description: "Focusing on women empowerment programs, craft design innovations, and micro-entrepreneurship incubation networks."
                },
                {
                    name: "Mrs. Labanya Das",
                    role: "Director (Member)",
                    initials: "L.D",
                    // description: "Mobilizing local weaver self-help cliques, raw materials distribution, and on-ground welfare support models."
                }
            ].map((member, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }} whileHover={{ scale: 1.01, y: -2 }} className="p-5 rounded-[20px] bg-white border border-slate-200/80 hover:border-[#D63384]/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(214,51,132,0.04)] flex items-start space-x-3.5 transition-all duration-300">
                    
                    <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-white bg-gradient-to-tr from-[#D63384] to-[#7C3AED] font-black text-xs shadow-sm">
                      {member.initials}
                    </div>

                    <div className="space-y-1.5 flex-1 text-left">
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                          {member.name}
                        </h4>
                        <span className="text-[10px] font-extrabold font-mono text-[#D63384] uppercase tracking-wider mt-0.5">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-500 font-sans font-light leading-relaxed pt-1.5 border-t border-slate-100">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>))}
              </div>
            </div>

            
            <div className="p-4 sm:p-5 bg-white border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] font-mono text-gray-400">
              <span>REGISTERED REGIONAL DIRECTORS DIRECTORY</span>
              <span className="text-[#D63384] font-bold">PROCHESTA MULTIPURPOSE CO-OPERATIVE SOCIETY</span>
            </div>
          </motion.div>
        </motion.div>)}
    </AnimatePresence>

    
    <AnimatePresence>
      {isAdvisoryModalOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAdvisoryModalOpen(false)} className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-slate-950/80 flex items-end md:items-center justify-center p-0 md:p-6 lg:p-10 select-none font-sans">
          
          <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none select-none"/>
          <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none select-none"/>

          
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 280, damping: 26 }
            }} exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
                transition: { duration: 0.2, ease: "easeInOut" }
            }} onClick={(e) => e.stopPropagation()} className="relative w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-4xl rounded-t-[32px] md:rounded-[40px] border border-slate-200 bg-slate-50 text-gray-900 overflow-hidden flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.25)] transition-all duration-300">
            
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-30">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#7C3AED]"/>
                </div>
                <span className="text-[10px] md:text-sm font-black tracking-widest text-[#7C3AED] uppercase">
                  EXECUTIVES DIRECTORY
                </span>
              </div>

              
              <div className="flex items-center space-x-2.5">
                <span className="hidden sm:inline-block text-[9px] text-gray-400 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-250 font-bold uppercase tracking-wider">
                  ESC to close
                </span>
                
                <button onClick={() => setIsAdvisoryModalOpen(false)} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-[#7C3AED] hover:text-white text-gray-700 transition-all border border-slate-200 cursor-pointer shadow-sm active:scale-95" aria-label="Close">
                  <X className="w-4.5 h-4.5"/>
                </button>
              </div>
            </div>

            
            <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-6 text-left flex-1 scrollbar-thin">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                  Executives list
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Prochesta's executive leaders driving program execution, administrative compliance, and organizational integrity.
                </p>
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                {
                    name: "Ms Madhobi Medhi",
                    role: "Chairperson",
                    initials: "M.M",
                    // description: "Leading intellectual and social advocate shaping Prochesta's macro-governance, institutional compliance, and ethical mandate structures."
                },
                {
                    name: "Dr. Anjana Borkakati",
                    role: "Executive Director",
                    initials: "A.B",
                    // description: "Chief operational director steering program execution, donor relationships, self-help-group networks, and academic-grassroots translation modules."
                },
                {
                    name: "Mr. Subhan Bora",
                    role: "Managing Director (Ex Officio Member)",
                    initials: "S.B",
                    // description: "Administrative registrar coordinating external department clearances, structural auditing mandates, and active cooperative oversight models."
                },
                {
                    name: "Mr. Ranjit Sarma",
                    role: "Director Administration",
                    initials: "R.S",
                    // description: "Supervising internal logistics, physical workspace systems, financial records validation, and regional branch operations connectivity."
                },
                {
                    name: "Mr. Tapan Kr. Sarma",
                    role: "Director (Member)",
                    initials: "T.S",
                    // description: "Coordinating executive communications, public welfare linkages, field deployment strategies, and general assembly voting consensus."
                }
            ].map((member, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} whileHover={{ scale: 1.01, y: -2 }} className="p-5 rounded-[20px] bg-white border border-slate-200/80 hover:border-[#7C3AED]/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(124,58,237,0.04)] flex items-start space-x-3.5 transition-all duration-300">
                    
                    <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-white bg-gradient-to-tr from-[#D63384] to-[#7C3AED] font-black text-xs shadow-sm">
                      {member.initials}
                    </div>

                    <div className="space-y-1.5 flex-1 text-left">
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-slate-900 tracking-tight">
                          {member.name}
                        </h4>
                        <span className="text-[10px] font-extrabold font-mono text-[#D63384] uppercase tracking-wider mt-0.5">
                          {member.role}
                        </span>
                      </div>
                      <p className="text-[11.5px] text-slate-500 font-sans font-light leading-relaxed pt-1.5 border-t border-slate-100">
                        {member.description}
                      </p>
                    </div>
                  </motion.div>))}
              </div>
            </div>

            
            <div className="p-4 sm:p-5 bg-white border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] font-mono text-gray-400">
              <span>REGISTERED OPERATIONAL DIRECTORS DIRECTORY</span>
              <span className="text-[#7C3AED] font-bold">PROCHESTA CONSTITUTIONAL BOARD</span>
            </div>
          </motion.div>
        </motion.div>)}
    </AnimatePresence>
  </>);
}
