import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Award, Clock, Heart, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
interface VolunteerFormProps {
    onSuccess: () => void;
}
export default function VolunteerForm({ onSuccess }: VolunteerFormProps) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState("");
    const [interests, setInterests] = useState("");
    const [availability, setAvailability] = useState("Weekends");
    const [statementOfPurpose, setStatementOfPurpose] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        if (!fullName || !email || !phone) {
            setErrorMessage("Please enter at least your name, email, and phone number.");
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch("/api/volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    email,
                    phone,
                    address,
                    education,
                    skills,
                    interests,
                    availability,
                    statementOfPurpose
                })
            });
            if (!res.ok) {
                throw new Error("Failed to submit volunteer details.");
            }
            setSubmitSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 3000);
        }
        catch (err: any) {
            console.error(err);
            setErrorMessage("There was an error, please try again: " + err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    if (submitSuccess) {
        return (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#D63384]"/>
        </div>
        <h3 className="text-xl font-bold text-gray-900 font-serif">
          Application Received Successfully!
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Thank you for offering your skills to support our rural initiatives in Assam. Our regional trustee team will review your statement of purpose and email you back within 3-4 working days.
        </p>
        <div className="text-xs text-[#D63384] font-semibold animate-pulse">
          Redirecting / reloading...
        </div>
      </motion.div>);
    }
    return (<form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
      <div className="text-left mb-4">
        <h3 className="text-xl font-bold text-gray-900 font-serif">
          Volunteer Registration Portal
        </h3>
        <p className="text-xs text-gray-500">
          Share your energy, build grassroots connections, and support female-led co-ops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#D63384]"/> Full Name
          </label>
          <input type="text" required placeholder="E.g., Xyz" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transitionbg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#7C3AED]"/> Email
          </label>
          <input type="email" required placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F97316]"/> Phone Number
          </label>
          <input type="tel" required placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#FBBF24]"/> Highest Qualification
          </label>
          <input type="text" placeholder="Bachelor of Science / MSW / Higher Sec" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50"/>
        </div>
      </div>

      
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#D63384]"/> Physical Address / Location in Assam
        </label>
        <input type="text" placeholder="E.g., Silpukhuri, Guwahati" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest">
            Specialized Skills / Tools
          </label>
          <input type="text" placeholder="E.g., Handloom weaving, design, bookkeeping" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7C3AED]"/> Availability Schedule
          </label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50">
            <option value="Weekends (Saturdays & Sundays)">Weekends (Saturdays & Sundays)</option>
            <option value="Weekdays (Monday to Friday)">Weekdays (Monday to Friday)</option>
            <option value="Alternate Days (Flexible 2-3 hours)">Alternate Days (Flexible 2-3 hours)</option>
            <option value="Full Time Placement (30+ hours/week)">Full Time Placement (30+ hours/week)</option>
          </select>
        </div>
      </div>

      
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest">
          Areas of Interest / Select Core Vertical
        </label>
        <input type="text" placeholder="E.g., Digital Literacy class, silk pattern drafting, health camps" value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
      </div>

      
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-[#D63384]"/> Statement of Purpose
        </label>
        <textarea required rows={3} placeholder="Why do you wish to support Prochesta Co-operative, and how would your skills benefit the women leaders in Assam?" value={statementOfPurpose} onChange={(e) => setStatementOfPurpose(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50 resize-none"/>
        <span className="text-[11px] text-gray-400">Please provide 2-3 sentences minimum.</span>
      </div>

      {errorMessage && (<div className="p-3 bg-red-50 text-red-650 rounded-xl border border-red-150 text-xs text-left font-semibold">
          ⚠️ {errorMessage}
        </div>)}

      
      <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all cursor-pointer bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] flex items-center justify-center space-x-2">
        {isLoading ? (<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>) : (<span>Submit Onboarding Application</span>)}
      </button>
    </form>);
}
