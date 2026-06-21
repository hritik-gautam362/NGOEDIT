import React, { useState } from "react";
import { Phone, Mail, MapPin, Compass, Send, CheckCircle2, MessageSquare, ExternalLink, X, Building, Tag, Facebook, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export default function ContactAndMap() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [isBranchesModalOpen, setIsBranchesModalOpen] = useState(false);
    const branches = [
        { id: 1, name: "Guwahati Branch", district: "Kamrup Metro District", code: "BR-GH-01", type: "Main Metropolitan Branch", region: "Guwahati, Silpukhuri" },
        { id: 2, name: "Raha Branch", district: "Nagaon District", code: "BR-RH-02", type: "Central Regional Point", region: "Nagaon, Central Assam" },
        { id: 3, name: "Balipara Branch", district: "Sonitpur District", code: "BR-BP-03", type: "North-Bank Operations Hub", region: "Sonitpur, North Assam" },
        { id: 4, name: "Goreswar Branch", district: "Baksa District", code: "BR-GW-04", type: "Bodoland Territorial Node", region: "Baksa District, BTAD" },
        { id: 5, name: "Rangia Branch", district: "Kamrup Rural", code: "BR-RG-05", type: "Rural Micro-finance Center", region: "Kamrup Rural District" },
        { id: 6, name: "Dhupdhara Branch", district: "Gowalpara District", code: "BR-DD-06", type: "Lower Assam Empowerment Area", region: "Gowalpara District" }
    ];
    const handleMessageSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !msg) {
            setError("Please fill out Name, Email, and message context.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: name,
                    email,
                    message: msg
                })
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.error || "Failed to forward your message to the cooperative board.");
            }
            setSuccess(true);
            setError("");
            setName("");
            setEmail("");
            setMsg("");
            setTimeout(() => setSuccess(false), 5050);
        }
        catch (err: any) {
            setError(err.message || "An unexpected system issue occurred.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleWhatsApp = () => {
        window.open("https://wa.me/919435012345?text=Hello%20Prochesta%20NGO,%20I%20am%2520interested%20in%20supporting%20weavers.", "_blank");
    };
    return (<section id="contact" className="py-24 bg-[#FFF9FB] border-t border-[#D63384]/5 relative overflow-hidden">
      
      
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D63384]/3 rounded-full filter blur-[100px] pointer-events-none -translate-y-1/2"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          
          <div className="lg:col-span-6 text-left space-y-8">
            
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-[0.2em] text-[#D63384] bg-pink-100/40 px-3 py-1 rounded-full uppercase">
                Official Directory
              </span>
              <h2 className="text-3xl md:text-4xl font-black font-sans tracking-tight text-gray-950 leading-tight">
                Get In Touch With Prochesta.
              </h2>
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-gray-500 font-sans max-w-sm">
                  Connect with our head offices in Silpukhuri, Guwahati. We welcome field researchers, university advisors, and community leaders.
                </p>
                
                
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setIsBranchesModalOpen(true)} className="inline-flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-pink-600 to-[#D63384] text-white text-[11px] font-bold tracking-wider uppercase font-mono rounded-xl shadow-lg shadow-pink-500/10 cursor-pointer select-none transition-all">
                  <Building className="w-4 h-4 text-white"/>
                  <span>View 6 Regional Branches</span>
                </motion.button>
              </div>
            </div>

            
            <div className="space-y-4 relative z-10 font-sans">
              
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-gray-150 shadow-xs">
                <div className="p-3 bg-pink-100 text-[#D63384] rounded-xl flex-shrink-0 font-bold uppercase shrink-0">
                  <MapPin className="w-5 h-5 animate-bounce"/>
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">📍 Our Address</h4>
                  <p className="text-sm font-bold text-gray-900 leading-tight">
                    Prochesta Multipurpose Co-Operative Society Asom Ltd.
                  </p>
                  <p className="text-xs text-gray-650 leading-relaxed whitespace-pre-line font-sans">
                    2A, Sonadhar Senapati Path
                    Silpukhuri
                    Guwahati – 781003
                    Assam, India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-gray-150 shadow-xs">
                <div className="p-3 bg-[#7C3AED]/10 text-[#7C3AED] rounded-xl flex-shrink-0 font-bold uppercase shrink-0">
                  <Phone className="w-5 h-5 animate-pulse"/>
                </div>
                <div className="space-y-1 w-full text-left">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">☎ Our Phone No.</h4>
                  <div className="flex flex-col sm:flex-row justify-between text-xs font-bold font-mono text-gray-800 gap-2 mt-1">
                    <div>📞 03612963506</div>
                    <div>📞 03612660020</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-gray-150 shadow-xs">
                <div className="p-3 bg-orange-100 text-[#F97316] rounded-xl flex-shrink-0 font-bold uppercase shrink-0">
                  <Mail className="w-5 h-5"/>
                </div>
                <div className="space-y-1 w-full text-left">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">✉ Our Email</h4>
                  <div className="flex flex-col sm:flex-row justify-between text-xs font-bold font-mono text-[#D63384] gap-2 overflow-hidden mt-1">
                    <a href="mailto:prochesta@hotmail.com" className="hover:underline truncate">prochesta@hotmail.com</a>
                    <a href="mailto:prochesta.mfi@gmail.com" className="hover:underline text-[#7C3AED] truncate">prochesta.mfi@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-gray-150 shadow-xs">
                <div className="p-3 bg-[#D63384]/10 text-[#D63384] rounded-xl flex-shrink-0 font-bold uppercase shrink-0">
                  <Compass className="w-5 h-5"/>
                </div>
                <div className="space-y-1 w-full text-left">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">🌐 Social Media Connect</h4>
                  <div className="flex flex-col sm:flex-row justify-start text-xs font-bold text-gray-800 gap-4 mt-1.5 font-sans">
                    <a href="https://www.facebook.com/prochesta.mfi" target="_blank" rel="noreferrer" className="hover:text-[#D63384] md:hover:scale-105 transition duration-300 flex items-center space-x-1.5">
                      <Facebook className="w-4 h-4 text-blue-600 fill-blue-600/10"/>
                      <span>Facebook</span>
                    </a>
                    <a href="https://www.linkedin.com/in/prochesta-multipurpose-co-operative-society-asom-ltd-guwahati/" target="_blank" rel="noreferrer" className="hover:text-[#7C3AED] md:hover:scale-105 transition duration-300 flex items-center space-x-1.5">
                      <Linkedin className="w-4 h-4 text-blue-800 fill-blue-800/10"/>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            
            <div className="p-4 rounded-3xl bg-white border border-gray-150 shadow-sm relative overflow-hidden space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                  Map View • Silpukhuri headquarters
                </span>
                <span className="text-[9px] font-bold text-pink-600 bg-pink-55/10 px-2.5 py-1 rounded-lg">
                  ★ Active Head Office
                </span>
              </div>

              
              <div className="h-56 rounded-2xl bg-stone-50 border border-gray-150 relative overflow-hidden shadow-xs">
                <iframe title="Prochesta Google Maps Location" src="https://maps.google.com/maps?q=2A,%20Sonadhar%20Senapati%20Path,%20Silpukhuri,%20Guwahati%20-%20781003,%20Assam,%20India&t=&z=16&ie=UTF8&iwloc=&output=embed" className="absolute inset-0 w-full h-full border-0 select-none" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>

              
              <div className="flex items-center space-x-2.5 bg-gray-50/70 p-3 rounded-2xl border border-gray-150/60 text-left">
                <MapPin className="w-4 h-4 text-[#D63384] flex-shrink-0 animate-bounce"/>
                <div className="text-[11px] font-sans text-gray-600 leading-tight">
                  <span className="font-bold text-gray-900">Marker Code: MP-HQ-01</span> • 2A, Sonadhar Senapati Path, Silpukhuri, Guwahati – 781003, Assam, India
                </div>
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a href="https://maps.google.com/?q=2A,+Sonadhar+Senapati+Path,+Silpukhuri,+Guwahati+–+781003,+Assam,+India" target="_blank" rel="noreferrer" className="py-2.5 rounded-xl bg-gray-900 hover:bg-gray-850 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs text-center font-mono uppercase tracking-wider">
                  <ExternalLink className="w-4 h-4 text-pink-300"/>
                  <span>Open in Google Maps</span>
                </a>
                <a href="https://www.google.com/maps/dir/?api=1&destination=2A,+Sonadhar+Senapati+Path,+Silpukhuri,+Guwahati+–+781003,+Assam,+India" target="_blank" rel="noreferrer" className="py-2.5 rounded-xl border border-[#D63384]/30 hover:bg-pink-50/50 text-[#D63384] text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer text-center font-mono uppercase tracking-wider">
                  <Compass className="w-4 h-4 text-[#D63384]"/>
                  <span>Get Directions</span>
                </a>
              </div>

              <div>
                <button onClick={handleWhatsApp} className="w-full py-2.5 rounded-xl border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer font-sans">
                  <MessageSquare className="w-4 h-4 text-emerald-650"/>
                  <span>Interactive WhatsApp Advisor</span>
                </button>
              </div>

            </div>

          </div>

          
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border border-[#D63384]/10 shadow-[0_20px_50px_rgba(214,51,132,0.04)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-tr from-[#7C3AED]/5 to-transparent rounded-full translate-x-12 -translate-y-12 pointer-events-none"/>

            <div className="space-y-6 relative z-10">
              
              <div className="border-b border-gray-100 pb-5">
                <h3 className="text-xl font-bold text-gray-900 font-serif">Leave an Inquiry</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Want to conduct on-field university research or enroll multiple Self-Help Groups under our co-operative program? Write to our regional trust board.
                </p>
              </div>

              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-full-name" className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5">
                    Full Name
                  </label>
                  <input id="contact-full-name" type="text" required placeholder="Xyz" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] bg-gray-50/50"/>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5">
                    Email Address
                  </label>
                  <input type="email" required placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] bg-gray-50/50"/>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1.5">
                    Message Body
                  </label>
                  <textarea required rows={4} placeholder="Write your specifications to the cooperative board..." value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] bg-gray-50/50 resize-none"/>
                </div>

                
                <AnimatePresence>
                  {success && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-3 bg-emerald-50 text-emerald-850 rounded-xl border border-emerald-200 text-xs flex items-center space-x-2 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-650 flex-shrink-0"/>
                      <span>Inquiry Sent! We will email you back within 24 hours.</span>
                    </motion.div>)}
                  {error && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-3 bg-red-50 text-red-650 rounded-xl border border-red-150 text-xs flex items-center space-x-2 font-semibold">
                      <span>⚠️ {error}</span>
                    </motion.div>)}
                </AnimatePresence>

                <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#1F2937] hover:bg-[#111827] text-white text-xs font-bold rounded-xl tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer">
                  {isSubmitting ? (<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>) : (<>
                      <Send className="w-3.5 h-3.5"/>
                      <span>Send Cooperative Inquiry</span>
                    </>)}
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>

      
      <AnimatePresence>
        {isBranchesModalOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBranchesModalOpen(false)} className="absolute inset-0 bg-gray-950/75 backdrop-blur-md cursor-pointer"/>

            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.55 }} className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-gray-150 relative z-10 flex flex-col max-h-[85vh]">
              
              <div className="p-6 sm:p-8 bg-gradient-to-r from-pink-50 via-[#FFF9FB] to-pink-50/30 border-b border-gray-150 flex items-center justify-between">
                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#D63384]/10 border border-[#D63384]/15 rounded-full text-[10px] font-extrabold font-mono text-[#D63384] uppercase tracking-widest">
                    <Building className="w-3.5 h-3.5"/>
                    <span>Regional Network</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-gray-950">
                    Prochesta Branch Network
                  </h3>
                  <p className="text-xs text-gray-450 font-sans">
                    Empowering local weavers and self-help-groups across six crucial districts in Assam.
                  </p>
                </div>

                
                <button onClick={() => setIsBranchesModalOpen(false)} className="p-3 bg-white hover:bg-gray-105 border border-gray-150 rounded-full text-gray-500 hover:text-gray-900 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-gray-50/50 custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {branches.map((branch, index) => (<motion.div key={branch.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-5 rounded-2xl bg-white border border-gray-150 hover:border-[#D63384]/35 hover:shadow-xs transition-all text-left flex flex-col justify-between group">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#D63384]/80 bg-[#D63384]/8 px-2.5 py-0.5 rounded-md">
                            {index + 1}. {branch.code}
                          </span>
                          <span className="text-[10px] text-gray-450 font-sans font-medium">
                            {branch.type}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-lg font-black font-sans text-gray-950 group-hover:text-[#D63384] transition-colors leading-tight">
                            {branch.name}
                          </h4>
                          <div className="flex items-center space-x-1 text-xs text-pink-600 font-sans font-bold">
                            <Tag className="w-3.5 h-3.5"/>
                            <span>{branch.district}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-550">
                        <span className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gray-400"/>
                          <span>{branch.region}</span>
                        </span>
                        <span className="text-[10px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          OPEN
                        </span>
                      </div>
                    </motion.div>))}
                </div>
              </div>

              
              <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-gray-400 text-center sm:text-left">
                <span>REGISTERED ASSAM CO-OPERATIVE DIRECTORY CORES</span>
                <span className="text-gray-500 font-bold">APPROVED BY THE BOARD OF DIRECTORS</span>
              </div>
            </motion.div>
          </div>)}
      </AnimatePresence>
    </section>);
}
