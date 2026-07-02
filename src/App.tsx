import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Shield, X, Mail, Phone, ChevronRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ProgramsStagger from "./components/ProgramsStagger";
import Testimonials from "./components/Testimonials";
import MasonryGallery from "./components/MasonryGallery";
import DonationPortal from "./components/DonationPortal";
import VolunteerForm from "./components/VolunteerForm";
import InternshipForm from "./components/InternshipForm";
import ApplicationConsole from "./components/ApplicationConsole";
import ContactAndMap from "./components/ContactAndMap";
import Logo from "./components/Logo";

import CmsEditor from "./components/CmsEditor";
import { DEFAULT_SITE_CONTENT } from "./defaultContent";
import { SiteContent } from "./cmsTypes";

function deepMerge(target: any, source: any): any {
    if (!source) return target;
    const output = { ...target };
    for (const key of Object.keys(source)) {
        if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
            output[key] = source[key];
        }
    }
    return output;
}

export default function App() {
    const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
    const [isLoadingContent, setIsLoadingContent] = useState(true);
    const [activeOverlay, setActiveOverlay] = useState<"volunteer" | "internship" | "admin" | null>(null);
    const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.pathname === "/admin");
    const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => !!sessionStorage.getItem("ngo_admin_pin"));
    const [adminPin, setAdminPin] = useState("");
    const [pinError, setPinError] = useState("");
    const [pinSubmitting, setPinSubmitting] = useState(false);
    const [adminTab, setAdminTab] = useState<"cms" | "trustee">("cms");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch("/api/public/content");
                if (res.ok) {
                    const data = await res.json();
                    if (data && Object.keys(data).length > 0) {
                        setSiteContent(prev => deepMerge(prev, data));
                    }
                }
            } catch (err) {
                console.error("Error fetching public CMS content:", err);
            } finally {
                setIsLoadingContent(false);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            setIsAdminRoute(window.location.pathname === "/admin");
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    const handleSaveContent = async (updated: SiteContent) => {
        try {
            const pin = sessionStorage.getItem("ngo_admin_pin") || "";
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-PIN": pin
                },
                body: JSON.stringify(updated)
            });
            if (res.ok) {
                setSiteContent(updated);
                return true;
            }
        } catch (e) {
            console.error("Error saving CMS content:", e);
        }
        return false;
    };

    const handleResetDefaults = async () => {
        try {
            const pin = sessionStorage.getItem("ngo_admin_pin") || "";
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-PIN": pin
                },
                body: JSON.stringify(DEFAULT_SITE_CONTENT)
            });
            if (res.ok) {
                setSiteContent(DEFAULT_SITE_CONTENT);
            }
        } catch (e) {
            console.error("Error resetting CMS content:", e);
        }
    };

    const handleVerifyPin = async (e: React.FormEvent) => {
        e.preventDefault();
        setPinError("");
        setPinSubmitting(true);
        try {
            const res = await fetch("/api/admin/verify-pin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin: adminPin })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                sessionStorage.setItem("ngo_admin_pin", adminPin);
                setIsAdminAuthorized(true);
            } else {
                setPinError(data.error || "Incorrect admin passcode.");
            }
        } catch (err) {
            setPinError("Connection issue. Try again.");
        } finally {
            setPinSubmitting(false);
        }
    };

    const handleScrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const handleOverlayClose = () => {
        setActiveOverlay(null);
    };

    const handleOpenAdmin = () => {
        window.history.pushState({}, "", "/admin");
        setIsAdminRoute(true);
    };

    if (isAdminRoute) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between font-sans">
                <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 flex justify-between items-center shadow-lg relative z-20">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { window.history.pushState({}, "", "/"); setIsAdminRoute(false); }}>
                        <Logo dark />
                        <span className="text-sm font-bold tracking-widest text-[#D63384] uppercase font-mono">Administration</span>
                    </div>
                    <button 
                        onClick={() => { window.history.pushState({}, "", "/"); setIsAdminRoute(false); }} 
                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    >
                        View Public Site
                    </button>
                </header>

                {!isAdminAuthorized ? (
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="w-full max-w-md bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D63384] to-[#7C3AED]" />
                            <h2 className="text-2xl font-black font-sans tracking-tight text-white mb-2">Admin Passcode Gating</h2>
                            <p className="text-xs text-slate-400 mb-6 font-light">Access is restricted to authorized trustees and cooperative editors.</p>
                            <form onSubmit={handleVerifyPin} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Enter Secure PIN</label>
                                    <input 
                                        type="password" 
                                        value={adminPin} 
                                        onChange={(e) => setAdminPin(e.target.value)} 
                                        placeholder="••••" 
                                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xl tracking-widest focus:outline-none focus:border-[#D63384] focus:ring-1 focus:ring-[#D63384] transition"
                                    />
                                </div>
                                {pinError && <p className="text-xs text-rose-500 font-semibold">{pinError}</p>}
                                <button 
                                    type="submit" 
                                    disabled={pinSubmitting}
                                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] text-white font-bold text-sm shadow-md transition disabled:opacity-50"
                                >
                                    {pinSubmitting ? "Verifying..." : "Verify Passcode"}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col bg-slate-950">
                        <div className="bg-slate-900 border-b border-slate-800 px-6 py-2 flex justify-between items-center text-xs font-semibold">
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => setAdminTab("cms")} 
                                    className={`py-2 border-b-2 px-1 transition-all ${adminTab === "cms" ? "border-[#D63384] text-[#D63384] font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                                >
                                    Website Page Editor
                                </button>
                                <button 
                                    onClick={() => setAdminTab("trustee")} 
                                    className={`py-2 border-b-2 px-1 transition-all ${adminTab === "trustee" ? "border-[#D63384] text-[#D63384] font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                                >
                                    Trustee Console (Applications)
                                </button>
                            </div>
                            <button 
                                onClick={() => {
                                    sessionStorage.removeItem("ngo_admin_pin");
                                    setIsAdminAuthorized(false);
                                    setAdminPin("");
                                }} 
                                className="text-slate-400 hover:text-rose-400 transition"
                            >
                                Logout Session
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
                            {adminTab === "cms" ? (
                                <CmsEditor 
                                    content={siteContent} 
                                    onSave={handleSaveContent} 
                                    onResetDefaults={handleResetDefaults} 
                                />
                            ) : (
                                <div className="bg-slate-900/50 border border-slate-800/80 p-6 rounded-3xl text-gray-900">
                                    <ApplicationConsole />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <footer className="bg-slate-950 border-t border-slate-900 py-3 text-center text-[10px] text-slate-500 font-mono">
                    &copy; 2026 Prochesta Cooperative Administration Dashboard.
                </footer>
            </div>
        );
    }

    return (<div className="relative min-h-screen bg-[#FFF9FB] text-gray-900 selection:bg-[#D63384] selection:text-white antialiased font-sans flex flex-col justify-between">
      
      
      <Navbar 
        onOpenVolunteer={() => setActiveOverlay("volunteer")} 
        onOpenInternship={() => setActiveOverlay("internship")} 
        onOpenAdmin={handleOpenAdmin} 
        onScrollToSection={handleScrollToSection}
      />

      
      <main className="flex-1">
        
        
        <Hero 
          onOpenVolunteer={() => setActiveOverlay("volunteer")} 
          onOpenInternship={() => setActiveOverlay("internship")} 
          onScrollToSection={handleScrollToSection}
          hero={siteContent.hero}
        />

        
        <AboutUs aboutUs={siteContent.aboutUs} />

        
        <ProgramsStagger events={siteContent.events} />

        
        <Testimonials partners={siteContent.partners} />

        
        <MasonryGallery gallery={siteContent.gallery} />

        
        <div id="donations" className="py-24 bg-[#FFF9FB] border-t border-[#D63384]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 text-left space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#D63384] bg-pink-100/40 px-3 py-1 rounded-full uppercase">
                    Donation Section
                  </span>
                  <h2 className="text-4xl font-black font-sans tracking-tight text-gray-950 leading-[1.1]">
                    Support Our Mission
                  </h2>
                  <p className="text-sm text-gray-650 font-sans leading-relaxed">
                    Your contribution helps us expand programmes, support women entrepreneurs, strengthen self-help groups, and create sustainable opportunities for communities across Assam. Every donation, regardless of size, contributes to lasting social impact.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <DonationPortal 
                  onSuccess={(donation) => console.log("Successful donation tracked: ", donation)}
                  contactInfo={siteContent.contactInfo}
                  donationDetails={siteContent.donationDetails}
                />
              </div>

            </div>
          </div>
        </div>

        
        <ContactAndMap contactInfo={siteContent.contactInfo} />

        
        <section className="bg-gray-900 text-white py-24 relative overflow-hidden border-t border-gray-800">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D63384]/10 via-[#7C3AED]/5 to-transparent filter blur-[150px] rounded-full pointer-events-none"/>

          
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Compass className="w-[500px] h-[500px] mx-auto mt-12"/>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
              
              
              <div className="bg-gray-950/40 border border-gray-800/80 p-8 sm:p-10 rounded-[32px] text-left flex flex-col justify-between hover:border-pink-500/30 transition-all duration-300">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-pink-500/10 text-pink-400 font-mono text-[10px] uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-pink-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse"/>
                    <span>Volunteer Chapter</span>
                  </div>
                  
                  <h3 className="text-3xl font-black font-sans text-white tracking-tight leading-tight">
                    Become a Volunteer
                  </h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-gray-400 font-sans leading-relaxed font-light">
                    <p>
                      Volunteers are the driving force behind community transformation. By sharing your skills, time, and passion, you can help create meaningful impact and support initiatives that empower women and strengthen communities.
                    </p>
                    <p>
                      Whether you are a student, professional, or community leader, there is a place for you at Prochesta.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-800/60 mt-8 flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
                  <span className="text-[10px] text-gray-500 font-mono uppercase font-semibold">Ready to Support rural Assam?</span>
                  <button onClick={() => setActiveOverlay("volunteer")} className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#D63384] to-[#7C3AED] text-white font-bold text-xs tracking-wider uppercase transition shadow-md hover:from-[#c21f73] hover:to-[#6a30c9] cursor-pointer">
                    ❤️ Join as Volunteer
                  </button>
                </div>
              </div>

              
              <div className="bg-gray-950/40 border border-gray-800/80 p-8 sm:p-10 rounded-[32px] text-left flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-purple-500/10 text-purple-400 font-mono text-[10px] uppercase tracking-widest py-1.5 px-3.5 rounded-full border border-purple-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"/>
                    <span>Academic Internships</span>
                  </div>

                  <h3 className="text-3xl font-black font-sans text-white tracking-tight leading-tight">
                    Learn While Creating Impact
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed font-light">
                    Our internship programme offers students and young professionals an opportunity to gain practical experience while contributing to real social development projects. Interns work alongside experienced teams, participate in community initiatives, and develop valuable leadership and professional skills.
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-800/60 mt-8 flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
                  <span className="text-[10px] text-gray-500 font-mono uppercase font-semibold">Build credentials on-ground</span>
                  <button onClick={() => setActiveOverlay("internship")} className="w-full sm:w-auto py-3.5 px-8 rounded-2xl border border-gray-700 hover:border-[#7C3AED] text-white text-xs font-bold tracking-wider uppercase bg-transparent hover:bg-white/5 transition cursor-pointer">
                    🎓 Apply For Internship
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      
      <footer className="bg-gray-900 text-white border-t border-gray-800 pt-16 pb-8 text-left font-sans select-none relative z-10 overflow-hidden">
        
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#D63384]/8 via-[#7C3AED]/4 to-transparent filter blur-[120px] rounded-full pointer-events-none"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          
          <div className="border-b border-gray-800 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <Logo dark/>
            <span className="text-sm sm:text-base font-serif italic text-pink-400 font-light tracking-wide">
              Empowering Women. Strengthening Communities. Creating Opportunities.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-gray-800 pb-12 mb-8 relative z-10">
            
            
            <div className="md:col-span-5 space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-sm">
                Prochesta Multipurpose Co-Operative Society Asom Ltd. is a federated socio-development co-op targeting female agency, craft digitization, and healthcare access across rural Assam districts.
              </p>

            </div>

            
            <div className="md:col-span-3 space-y-3.5">
              <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest font-mono">
                Support Channels
              </h4>
              <ul className="space-y-2 text-xs text-gray-500 font-sans">
                <li>
                  <button onClick={() => setActiveOverlay("volunteer")} className="hover:text-white transition cursor-pointer">
                    Volunteer Onboarding
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveOverlay("internship")} className="hover:text-white transition cursor-pointer">
                    Academic Intern Program
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("donations")} className="hover:text-white transition cursor-pointer">
                    Cooperative Solidarity Fund
                  </button>
                </li>
                <li>
                  <button onClick={handleOpenAdmin} className="hover:text-white transition cursor-pointer flex items-center gap-1.5 text-gray-400 font-semibold">
                    <Shield className="w-3.5 h-3.5"/> Core Trustee Console
                  </button>
                </li>
              </ul>
            </div>

            
            <div className="md:col-span-4 space-y-3.5 font-sans">
              <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest font-mono">
                Silpukhuri Headquarters
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-550 text-gray-500 font-mono">
                <li className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#D63384]"/>
                  <span>{siteContent.contactInfo?.phoneNumbers?.join(" / ") || "03612963506 / 03612660020"}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#7C3AED]"/>
                  <span className="truncate">{siteContent.contactInfo?.emails?.join(" / ") || "prochesta@hotmail.com / prochesta.mfi@gmail.com"}</span>
                </li>
              </ul>
            </div>

          </div>

          
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4 relative z-10 w-full">
            <span>
              {siteContent.footer?.copyright || "© 2026 Prochesta Multipurpose Co-Operative Society Asom Ltd. All Rights Reserved."}
            </span>
          </div>

        </div>
      </footer>

      
      <AnimatePresence>
        {activeOverlay && activeOverlay !== "news" && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-950/40 backdrop-blur-md z-999 flex items-center justify-center p-4" onClick={handleOverlayClose}>
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }} onClick={(e) => e.stopPropagation()} className={`w-full max-w-3xl bg-[#FFF9FB] rounded-3xl border border-gray-150 p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]`}>
              
              <button onClick={handleOverlayClose} className="absolute top-4 right-4 p-2 bg-white rounded-full border hover:bg-gray-100 transition shadow-xs cursor-pointer text-gray-500 hover:text-gray-900 z-50" title="Dismiss Pane">
                <X className="w-4 h-4"/>
              </button>

              
              {activeOverlay === "volunteer" && (<VolunteerForm onSuccess={handleOverlayClose}/>)}

              {activeOverlay === "internship" && (<InternshipForm onSuccess={handleOverlayClose}/>)}
            </motion.div>
          </motion.div>)}
      </AnimatePresence>

      


    </div>);
}
