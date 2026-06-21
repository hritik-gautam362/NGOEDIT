import React, { useState, useRef } from "react";
import { User, Mail, Phone, BookOpen, Link, FileText, CheckCircle2, Upload, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
interface InternshipFormProps {
    onSuccess: () => void;
}
export default function InternshipForm({ onSuccess }: InternshipFormProps) {
    const [formType, setFormType] = useState<"internship" | "job">("internship");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [college, setCollege] = useState("");
    const [course, setCourse] = useState("");
    const [semester, setSemester] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeFile, setResumeFile] = useState<{
        name: string;
        size: string;
        dataBase64?: string;
    } | null>(null);
    const [fileError, setFileError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0)
            return;
        validateAndSaveFile(files[0]);
    };
    const validateAndSaveFile = (file: File) => {
        setFileError("");
        const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setFileError("Invalid format! Please upload a PDF, DOC, or DOCX document.");
            return;
        }
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setFileError("Limit Exceeded! Maximum resume payload is 10 MB.");
            return;
        }
        const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + " MB";
        const reader = new FileReader();
        reader.onload = () => {
            setResumeFile({
                name: file.name,
                size: sizeFormatted,
                dataBase64: reader.result as string
            });
        };
        reader.onerror = () => {
            setFileError("Failed to encode files.");
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        if (!fullName || !email || !phone) {
            setSubmitError("Please fill out Name, Email, and Phone elements.");
            return;
        }
        if (!resumeFile) {
            setFileError("Please attach your professional resume (Required).");
            return;
        }
        setIsLoading(true);
        try {
            const payload = {
                type: formType,
                fullName,
                email,
                phone,
                college,
                course,
                semester,
                linkedin,
                portfolio,
                coverLetter,
                resumeName: resumeFile.name,
                resumeSize: resumeFile.size,
                resumeData: resumeFile.dataBase64
            };
            const res = await fetch("/api/internship", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                throw new Error("Unable to submit registration.");
            }
            setSubmitSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 3000);
        }
        catch (err: any) {
            console.error(err);
            setSubmitError("Submission error: " + err.message);
        }
        finally {
            setIsLoading(false);
        }
    };
    if (submitSuccess) {
        return (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#7C3AED]"/>
        </div>
        <h3 className="text-xl font-bold text-gray-900 font-serif">
          {formType === "internship" ? "Internship Application" : "Job Recruitee Application"} Lodged!
        </h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          The registry has successfully stored your profiles and document dossiers. Our administration will contact you directly at <span className="font-semibold text-gray-800">{email}</span>.
        </p>
        <p className="text-xs text-gray-400">
          Size processed: {resumeFile?.size} ({resumeFile?.name})
        </p>
        <div className="text-xs text-[#7C3AED] font-semibold animate-pulse">
          Refreshing page...
        </div>
      </motion.div>);
    }
    return (<form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
      <div className="grid grid-cols-2 gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
        <button type="button" onClick={() => setFormType("internship")} className={`py-2 text-[10px] md:text-sm font-semibold rounded-xl transition-all ${formType === "internship"
            ? "bg-white text-[#D63384] shadow-sm font-bold"
            : "text-gray-500 hover:text-gray-900"}`}>
          🎓 Internship
        </button>
        <button type="button" onClick={() => setFormType("job")} className={`py-2 text-[10px] md:text-sm font-semibold rounded-xl transition-all ${formType === "job"
            ? "bg-white text-orange-600 shadow-sm font-bold"
            : "text-gray-500 hover:text-gray-900"}`}>
          💼 Job Role
        </button>
      </div>

      <div className="text-left py-1">
        <h3 className="text-lg font-bold text-gray-900 font-serif">
          {formType === "internship" ? "Academic Internship Program" : "Professional Careers & Jobs"}
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mt-0.5">
          {formType === "internship"
            ? "Submit your academic details to work with rural textile groups & micro-credit analytics in Guwahati."
            : "Apply for open staff positions, cluster supervisors, accounting heads, loom designers or marketing team."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 flex-row">
            <User className="w-3.5 h-3.5 text-[#D63384]"/> Full Name <span className="text-red-500 font-bold">*</span>
          </label>
          <input type="text" required placeholder="Xyz" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#7C3AED]"/> Email <span className="text-red-500 font-bold">*</span>
          </label>
          <input type="email" required placeholder="Xyz@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F97316]"/> Phone <span className="text-red-500 font-bold">*</span>
          </label>
          <input type="tel" required placeholder="+91 98XXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
        </div>

        
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]"/> {formType === "internship" ? "College / Institution" : "Position of Interest"} <span className="text-red-500 font-bold">*</span>
          </label>
          <input type="text" required placeholder={formType === "internship" ? "Gauhati University, Tezpur, etc." : "E.g., Field Supervisor, Textile Expert, Accountant"} value={college} onChange={(e) => setCollege(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50"/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {formType === "internship" ? "Course / Degree Major" : "Primary Skills & Experience"}
          </label>
          <input type="text" placeholder={formType === "internship" ? "MA Sociology, BSW, B.Tech CS etc." : "E.g. Weaving instructions, Bookkeeping"} value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50"/>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {formType === "internship" ? "Current Semester / Year" : "Total Experience & Expected Salary"}
          </label>
          <input type="text" placeholder={formType === "internship" ? "4th Semester, Final Year, etc." : "E.g., 2 Years Experience / Rs. 18k pm"} value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none transition bg-gray-50/50"/>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Link className="w-3.5 h-3.5 text-gray-450"/> LinkedIn Link <span className="text-gray-400 text-[10px] lowercase normal-case">(optional)</span>
          </label>
          <input type="url" placeholder="linkedin.com/in/username (Optional)" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-300 outline-none transition bg-gray-50/50"/>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5 font-sans">
            <Link className="w-3.5 h-3.5 text-gray-455"/> Portfolio / GitHub Website <span className="text-gray-400 text-[10px] lowercase normal-case">(optional)</span>
          </label>
          <input type="url" placeholder="https://portfolio-url.com or github.com (Optional)" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-300 outline-none transition bg-gray-50/50"/>
        </div>
      </div>

      
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#D63384]"/> Cover Message
        </label>
        <textarea rows={3} placeholder="What specific projects or areas do you plan to study or contribute to?" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] outline-none transition bg-gray-50/50 resize-none"/>
      </div>

      
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider flex justify-between">
          <span>Attach Resume / Qualification Marksheet</span>
          <span className="text-gray-400 font-normal">PDF, DOC, DOCX • Max 10MB</span>
        </label>

        <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${resumeFile
            ? "border-emerald-400 bg-emerald-50/30"
            : fileError
                ? "border-red-400 bg-red-50/30"
                : "border-gray-200 bg-gray-50/40 hover:bg-gray-100/50 hover:border-[#D63384]/30"}`}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden"/>
          {resumeFile ? (<div className="space-y-1 flex flex-col items-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-500"/>
              <p className="text-xs font-bold text-gray-800 line-clamp-1">{resumeFile.name}</p>
              <p className="text-[10px] text-gray-400">{resumeFile.size} - Decoded & ready</p>
              <button type="button" onClick={(e) => {
                e.stopPropagation();
                setResumeFile(null);
            }} className="text-[10px] text-red-500 font-semibold hover:underline mt-1">
                Remove details
              </button>
            </div>) : (<div className="space-y-1 flex flex-col items-center">
              <Upload className="w-7 h-7 text-gray-400 mb-0.5"/>
              <p className="text-xs font-semibold text-gray-700">
                Drag drop or <span className="text-[#D63384] underline">browse documents</span>
              </p>
              <p className="text-[10px] text-gray-400">PDF, DOCX up to 10MB</p>
            </div>)}
        </div>

        {fileError && (<div className="text-[11px] text-red-500 flex items-center space-x-1 mt-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5"/>
            <span>{fileError}</span>
          </div>)}
      </div>

      {submitError && (<div className="p-3 bg-red-50 text-red-650 rounded-xl border border-red-150 text-xs text-left font-semibold">
          ⚠️ {submitError}
        </div>)}

      
      <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all cursor-pointer bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] flex items-center justify-center space-x-2">
        {isLoading ? (<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"/>) : (<span>File Official Application</span>)}
      </button>
    </form>);
}
