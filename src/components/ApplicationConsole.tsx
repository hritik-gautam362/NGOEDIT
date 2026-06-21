import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Trash2, Edit3, ArrowRight, Shield, Download, FileText, Activity, Users, Award, Star, MailOpen } from "lucide-react";
import { VolunteerApplication, InternshipApplication, DonationRecord, ContactInquiry } from "../types";
import { motion, AnimatePresence } from "motion/react";
interface ApplicationsData {
    volunteers: VolunteerApplication[];
    internships: InternshipApplication[];
    donations: DonationRecord[];
    inquiries: ContactInquiry[];
}
export default function ApplicationConsole() {
    const [data, setData] = useState<ApplicationsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeTab, setActiveTab] = useState<"volunteers" | "internships" | "donations" | "inquiries">("volunteers");
    const [passcode, setPasscode] = useState(() => sessionStorage.getItem("ngo_admin_pin") || "");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
    const [tempNotes, setTempNotes] = useState("");
    const [showPinModal, setShowPinModal] = useState(false);
    const [currentPinValue, setCurrentPinValue] = useState("");
    const [newPinValue, setNewPinValue] = useState("");
    const [isChangingPin, setIsChangingPin] = useState(false);
    const [pinChangeError, setPinChangeError] = useState("");
    const [pinChangeSuccess, setPinChangeSuccess] = useState("");
    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setError("");
        setTimeout(() => setSuccessMessage(""), 4500);
    };
    const showError = (msg: string) => {
        setError(msg);
        setSuccessMessage("");
        setTimeout(() => setError(""), 5000);
    };
    const [stats, setStats] = useState({
        totalRaised: 0,
        volunteerCount: 0,
        internCount: 0,
        pendingReviews: 0
    });
    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/applications", {
                headers: {
                    "X-Admin-PIN": passcode
                }
            });
            if (res.status === 401) {
                setIsAuthorized(false);
                sessionStorage.removeItem("ngo_admin_pin");
                throw new Error("Administrative session expired or access PIN changed.");
            }
            if (!res.ok)
                throw new Error("Failed to pull registry rosters.");
            const result: ApplicationsData = await res.json();
            setData(result);
            const totalRaised = result.donations.reduce((sum, d) => sum + d.amount, 0);
            const pendingReviews = result.volunteers.filter(v => v.status === "Pending").length +
                result.internships.filter(i => i.status === "Pending").length +
                (result.inquiries || []).filter(inq => inq.status === "Pending").length;
            setStats({
                totalRaised,
                volunteerCount: result.volunteers.length,
                internCount: result.internships.length,
                pendingReviews
            });
        }
        catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to retrieve datasets.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const cachedPin = sessionStorage.getItem("ngo_admin_pin");
        if (cachedPin) {
            setPasscode(cachedPin);
            setIsAuthorized(true);
        }
        return () => {
            sessionStorage.removeItem("ngo_admin_pin");
        };
    }, []);
    useEffect(() => {
        if (isAuthorized && passcode) {
            fetchApplications();
        }
    }, [isAuthorized]);
    const handleAuthSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setError("");
        try {
            const res = await fetch("/api/admin/verify-pin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pin: passcode })
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.error || "Incorrect configuration PIN. Access denied.");
            }
            sessionStorage.setItem("ngo_admin_pin", passcode);
            setIsAuthorized(true);
            setError("");
        }
        catch (err: any) {
            setError(err.message || "Unauthorized access code.");
        }
        finally {
            setIsVerifying(false);
        }
    };
    const handleUpdateStatus = async (id: string, status: "Approved" | "Rejected" | "Pending" | "Reviewed", notesText?: string) => {
        try {
            const res = await fetch(`/api/admin/applications/${id}/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-PIN": passcode
                },
                body: JSON.stringify({
                    status,
                    notes: notesText
                })
            });
            if (res.status === 401) {
                setIsAuthorized(false);
                sessionStorage.removeItem("ngo_admin_pin");
                throw new Error("Authorization expired.");
            }
            if (!res.ok)
                throw new Error("Failed to persist update.");
            showSuccess(`Application updated to [${status}] successfully.`);
            fetchApplications();
        }
        catch (err: any) {
            showError("Error updating application status: " + err.message);
        }
    };
    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to permanently delete this application from co-operative records?"))
            return;
        try {
            const res = await fetch(`/api/admin/applications/${id}/delete`, {
                method: "POST",
                headers: {
                    "X-Admin-PIN": passcode
                }
            });
            if (res.status === 401) {
                setIsAuthorized(false);
                sessionStorage.removeItem("ngo_admin_pin");
                throw new Error("Authorization expired.");
            }
            if (!res.ok)
                throw new Error("Failed to delete record.");
            showSuccess("Co-operative application removed successfully.");
            fetchApplications();
        }
        catch (err: any) {
            showError("Error removing candidate: " + err.message);
        }
    };
    const startEditingNotes = (id: string, currentNotes: string) => {
        setEditingNotesId(id);
        setTempNotes(currentNotes || "");
    };
    const saveNotes = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/applications/${id}/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Admin-PIN": passcode
                },
                body: JSON.stringify({
                    status,
                    notes: tempNotes
                })
            });
            if (res.status === 401) {
                setIsAuthorized(false);
                sessionStorage.removeItem("ngo_admin_pin");
                throw new Error("Authorization expired.");
            }
            if (!res.ok)
                throw new Error("Could not update notes.");
            setEditingNotesId(null);
            showSuccess("Administrative log notes successfully updated.");
            fetchApplications();
        }
        catch (err: any) {
            showError("Error saving notes: " + err.message);
        }
    };
    const downloadResume = (application: InternshipApplication) => {
        if (!application.resumeData) {
            showSuccess("This resume is stored as local meta-file. Prompting default download simulator.");
            return;
        }
        const link = document.createElement("a");
        link.href = application.resumeData;
        link.download = application.resumeName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const changeAdminPinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPinChangeError("");
        setPinChangeSuccess("");
        if (!currentPinValue.trim() || !newPinValue.trim()) {
            setPinChangeError("Both fields are required.");
            return;
        }
        setIsChangingPin(true);
        try {
            const res = await fetch("/api/admin/change-pin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPin: currentPinValue.trim(),
                    newPin: newPinValue.trim()
                })
            });
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.error || "Failed to make updates to security PIN.");
            }
            setPinChangeSuccess("Administrative PIN changed successfully!");
            setPasscode(newPinValue.trim());
            sessionStorage.setItem("ngo_admin_pin", newPinValue.trim());
            setCurrentPinValue("");
            setNewPinValue("");
            setTimeout(() => {
                setShowPinModal(false);
                setPinChangeSuccess("");
            }, 2000);
        }
        catch (err: any) {
            setPinChangeError(err.message || "An unexpected error occurred during operation.");
        }
        finally {
            setIsChangingPin(false);
        }
    };
    if (!isAuthorized) {
        return (<div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#7C3AED]/20 shadow-[0_20px_50px_rgba(124,58,237,0.06)] text-center space-y-6">
        <div className="mx-auto w-14 h-14 bg-[#7C3AED]/10 rounded-2xl flex items-center justify-center text-[#7C3AED]">
          <Shield className="w-7 h-7"/>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 font-serif">NGO Administrative Core</h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            Authorized regional trustees, volunteer advisors, and coordinators can access application files and resumes.
          </p>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-3">
          <div className="text-left">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-1">
              Enter Access Code (PIN)
            </label>
            <input type="password" placeholder="Hint: Press Submit directly to access!" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] bg-gray-50/50 text-center"/>
          </div>

          <button type="submit" disabled={isVerifying} className="w-full py-2.5 bg-[#7C3AED] hover:bg-[#682ecf] text-white text-xs font-semibold rounded-xl tracking-wider uppercase transition shadow-md cursor-pointer disabled:opacity-50">
            {isVerifying ? "Verifying Credentials..." : "Authenticate Credentials →"}
          </button>
        </form>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
      </div>);
    }
    return (<div className="space-y-6">
      
      {successMessage && (<div className="p-4 bg-emerald-50 text-emerald-850 rounded-2xl border border-emerald-250 text-xs font-semibold flex items-center space-x-2 shadow-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-bounce"/>
          <span>{successMessage}</span>
        </div>)}
      {error && (<div className="p-4 bg-red-50 text-red-750 rounded-2xl border border-red-250 text-xs font-semibold flex items-center space-x-2 shadow-xs">
          <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 animate-pulse"/>
          <span>{error}</span>
        </div>)}

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-pink-100 text-[#D63384] rounded-xl">
            <Users className="w-5 h-5"/>
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Volunteers Registered</span>
            <span className="text-lg font-bold text-gray-800 font-mono">{stats.volunteerCount}</span>
          </div>
        </div>

        <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-purple-100 text-[#7C3AED] rounded-xl">
            <Award className="w-5 h-5"/>
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Interns & Enrolled</span>
            <span className="text-lg font-bold text-gray-800 font-mono">{stats.internCount}</span>
          </div>
        </div>

        <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl">
            <Activity className="w-5 h-5"/>
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Fundraising Total</span>
            <span className="text-lg font-bold text-gray-800 font-mono">₹{stats.totalRaised.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl">
            <Star className="w-5 h-5"/>
          </div>
          <div>
            <span className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Pending Reviews</span>
            <span className="text-lg font-bold text-red-650 font-mono animate-pulse">{stats.pendingReviews}</span>
          </div>
        </div>
      </div>

      
      <div className="flex justify-between items-center bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200">
        <div className="flex space-x-1">
          {(["volunteers", "internships", "donations", "inquiries"] as const).map((tab) => (<button key={tab} onClick={() => {
                setActiveTab(tab);
                setEditingNotesId(null);
            }} className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all capitalize ${activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"}`}>
              {tab}
            </button>))}
        </div>

        <div className="flex items-center space-x-3 pr-3">
          <button onClick={() => setShowPinModal(true)} className="text-[11px] font-semibold text-[#7C3AED] hover:underline flex items-center space-x-1 cursor-pointer">
            <span>🔑 Change Admin PIN</span>
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={fetchApplications} className="text-[11px] font-semibold text-[#D63384] hover:underline flex items-center space-x-1 cursor-pointer">
            <span>🔄 Refresh Feed</span>
          </button>
        </div>
      </div>

      
      <AnimatePresence>
        {showPinModal && (<div className="fixed inset-0 bg-neutral-900/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl border border-gray-100 shadow-2xl max-w-sm w-full p-6 space-y-4 text-left">
              <div className="flex items-center space-x-3 text-[#7C3AED]">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <Shield className="w-5 h-5"/>
                </div>
                <h3 className="text-md font-bold text-gray-900 font-serif">Update Administrative PIN</h3>
              </div>
              <p className="text-xs text-gray-400">
                Modify the secure key code required for managing application files, status adjustments, and viewing financial donation tables.
              </p>

              <form onSubmit={changeAdminPinSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Current Secret PIN</label>
                  <input type="password" required placeholder="••••" value={currentPinValue} onChange={(e) => setCurrentPinValue(e.target.value)} className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-[#7C3AED]"/>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">New Secure PIN</label>
                  <input type="password" required placeholder="••••" value={newPinValue} onChange={(e) => setNewPinValue(e.target.value)} className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-[#7C3AED]"/>
                </div>

                {pinChangeError && (<p className="text-[11px] text-red-505 font-semibold">⚠️ {pinChangeError}</p>)}
                {pinChangeSuccess && (<p className="text-[11px] text-emerald-600 font-semibold font-mono">✓ {pinChangeSuccess}</p>)}

                <div className="flex space-x-2 pt-2">
                  <button type="button" onClick={() => {
                setShowPinModal(false);
                setPinChangeError("");
                setPinChangeSuccess("");
                setCurrentPinValue("");
                setNewPinValue("");
            }} className="w-1/2 py-2 text-xs bg-gray-100 font-semibold text-gray-600 rounded-xl hover:bg-gray-200 transition cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={isChangingPin} className="w-1/2 py-2 text-xs bg-[#7C3AED] hover:bg-[#682ecf] font-semibold text-white rounded-xl transition cursor-pointer disabled:opacity-50">
                    {isChangingPin ? "Updating..." : "Save PIN Change"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>)}
      </AnimatePresence>

      {loading ? (<div className="h-48 flex flex-col items-center justify-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"/>
          <span className="text-xs text-gray-400 font-mono">Retrieving live state files...</span>
        </div>) : (<div className="space-y-4">
          <AnimatePresence mode="wait">
            {activeTab === "volunteers" && (<motion.div key="volunteers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {data?.volunteers.length === 0 ? (<p className="text-center text-xs text-gray-400 py-12">No volunteer logs found.</p>) : (data?.volunteers.map((vol) => (<div key={vol.id} className="p-5 rounded-2xl border border-gray-100 bg-white/80 shadow-xs flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2 max-w-2xl text-left">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-gray-800">{vol.fullName}</h4>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase ${vol.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : vol.status === "Rejected"
                            ? "bg-red-50 text-red-500 border border-red-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                            {vol.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {new Date(vol.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600 font-mono">
                          <div><span className="text-gray-400 font-sans">Email:</span> {vol.email}</div>
                          <div><span className="text-gray-400 font-sans">Phone:</span> {vol.phone}</div>
                          <div><span className="text-gray-400 font-sans">Edu:</span> {vol.education || "N/A"}</div>
                          <div><span className="text-gray-400 font-sans">Loc:</span> {vol.address || "N/A"}</div>
                        </div>

                        <p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                          &ldquo;{vol.statementOfPurpose}&rdquo;
                        </p>

                        <div className="text-xs">
                          <span className="font-bold text-gray-700">Internal Admin Notes:</span>{" "}
                          {editingNotesId === vol.id ? (<div className="flex items-center space-x-2 mt-1">
                              <input type="text" value={tempNotes} onChange={(e) => setTempNotes(e.target.value)} className="px-2 py-1 text-xs border rounded-lg max-w-md w-full bg-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"/>
                              <button onClick={() => saveNotes(vol.id, vol.status)} className="px-2.5 py-1 bg-emerald-650 hover:bg-emerald-700 text-teal-980 font-bold text-[10px] rounded">
                                Save
                              </button>
                              <button onClick={() => setEditingNotesId(null)} className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] rounded">
                                Cancel
                              </button>
                            </div>) : (<span className="text-gray-500 italic">
                              {vol.notes || "None set yet."}{" "}
                              <button onClick={() => startEditingNotes(vol.id, vol.notes || "")} className="text-xs text-[#7C3AED] hover:underline inline-flex items-center ml-1">
                                <Edit3 className="w-3 h-3 ml-0.5"/> Edit
                              </button>
                            </span>)}
                        </div>
                      </div>

                      
                      <div className="flex md:flex-col items-end gap-2 justify-center">
                        <button onClick={() => handleUpdateStatus(vol.id, "Approved", vol.notes)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-605 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <CheckCircle className="w-3.5 h-3.5"/>
                          <span>Approve</span>
                        </button>
                        <button onClick={() => handleUpdateStatus(vol.id, "Rejected", vol.notes)} className="px-3 py-1.5 bg-rose-500 hover:bg-rose-555 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <XCircle className="w-3.5 h-3.5"/>
                          <span>Reject</span>
                        </button>
                        <button onClick={() => handleDelete(vol.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition mt-2 cursor-pointer" title="Delete Candidate">
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>)))}
              </motion.div>)}

            {activeTab === "internships" && (<motion.div key="internships" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {data?.internships.length === 0 ? (<p className="text-center text-xs text-gray-400 py-12">No academic internships, jobs or enrollments filed.</p>) : (data?.internships.map((intern) => (<div key={intern.id} className="p-5 rounded-2xl border border-gray-100 bg-white/80 shadow-xs flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2 max-w-2xl text-left">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-gray-800">{intern.fullName}</h4>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase ${intern.type === "enrollment"
                        ? "bg-purple-100 text-purple-700 font-bold"
                        : intern.type === "job"
                            ? "bg-amber-100 text-amber-800 font-bold border border-amber-200"
                            : "bg-[#D63384]/15 text-[#D63384] font-bold"}`}>
                            {intern.type}
                          </span>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase ${intern.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : intern.status === "Rejected"
                            ? "bg-red-50 text-red-500 border border-red-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                            {intern.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {new Date(intern.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-650 font-mono">
                          {intern.type === "job" ? (<>
                              <div><span className="text-gray-400 font-sans">Desired Role:</span> {intern.college || "N/A"}</div>
                              <div><span className="text-gray-400 font-sans">Key Skills:</span> {intern.course || "N/A"}</div>
                              <div className="col-span-2"><span className="text-gray-400 font-sans">Experience & Salary:</span> {intern.semester || "N/A"}</div>
                            </>) : (<>
                              <div><span className="text-gray-400 font-sans">College/Village:</span> {intern.college || "N/A"}</div>
                              <div><span className="text-gray-400 font-sans">Course/Syllabus:</span> {intern.course || "N/A"}</div>
                              {intern.type !== "enrollment" && (<div><span className="text-gray-400 font-sans">Semester:</span> {intern.semester || "N/A"}</div>)}
                            </>)}
                          <div><span className="text-gray-400 font-sans">Phone:</span> {intern.phone}</div>
                          <div><span className="text-gray-400 font-sans">Email:</span> {intern.email}</div>
                          {intern.linkedin && (<div className="col-span-2 text-blue-600 underline text-[11px] truncate">
                              LinkedIn: <a href={intern.linkedin} target="_blank" rel="noreferrer">{intern.linkedin}</a>
                            </div>)}
                        </div>

                        {intern.coverLetter && (<p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                            &ldquo;{intern.coverLetter}&rdquo;
                          </p>)}

                        
                        <div className="p-2.5 bg-purple-50/50 rounded-xl border border-purple-100 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-[#7C3AED]"/>
                            <span className="text-xs font-mono font-medium text-gray-800 line-clamp-1">
                              {intern.resumeName} ({intern.resumeSize})
                            </span>
                          </div>
                          <button onClick={() => downloadResume(intern)} className="px-2.5 py-1 text-[10px] font-bold bg-[#7C3AED] hover:bg-[#682ecf] text-white rounded-lg flex items-center space-x-1 cursor-pointer">
                            <Download className="w-3 h-3"/>
                            <span>Download File</span>
                          </button>
                        </div>

                        <div className="text-xs">
                          <span className="font-bold text-gray-700">Internal Admin Notes:</span>{" "}
                          {editingNotesId === intern.id ? (<div className="flex items-center space-x-2 mt-1">
                              <input type="text" value={tempNotes} onChange={(e) => setTempNotes(e.target.value)} className="px-2 py-1 text-xs border rounded-lg max-w-md w-full bg-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"/>
                              <button onClick={() => saveNotes(intern.id, intern.status)} className="px-2.5 py-1 bg-emerald-650 hover:bg-emerald-700 text-teal-980 font-bold text-[10px] rounded">
                                Save
                              </button>
                              <button onClick={() => setEditingNotesId(null)} className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] rounded">
                                Cancel
                              </button>
                            </div>) : (<span className="text-gray-500 italic">
                              {intern.notes || "None set yet."}{" "}
                              <button onClick={() => startEditingNotes(intern.id, intern.notes || "")} className="text-xs text-[#7C3AED] hover:underline inline-flex items-center ml-1">
                                <Edit3 className="w-3 h-3 ml-0.5"/> Edit
                              </button>
                            </span>)}
                        </div>
                      </div>

                      <div className="flex md:flex-col items-end gap-2 justify-center">
                        <button onClick={() => handleUpdateStatus(intern.id, "Approved", intern.notes)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <CheckCircle className="w-3.5 h-3.5"/>
                          <span>Approve</span>
                        </button>
                        <button onClick={() => handleUpdateStatus(intern.id, "Rejected", intern.notes)} className="px-3 py-1.5 bg-rose-500 hover:bg-rose-555 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <XCircle className="w-3.5 h-3.5"/>
                          <span>Reject</span>
                        </button>
                        <button onClick={() => handleDelete(intern.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition mt-2 cursor-pointer">
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>)))}
              </motion.div>)}

            {activeTab === "donations" && (<motion.div key="donations" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 mr-1">
                {data?.donations.length === 0 ? (<p className="text-center text-xs text-gray-400 py-12">No donation records received yet.</p>) : (<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-400 font-bold border-b border-gray-250 uppercase tracking-widest text-[9px]">
                          <th className="p-3">Reference No / Txn ID</th>
                          <th className="p-3">Donor Info</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Amount Paid</th>
                          <th className="p-3">Date Submitted</th>
                          <th className="p-3">Message</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-mono text-gray-600">
                        {data?.donations.map((don) => (<tr key={don.id} className="hover:bg-amber-50/20">
                            <td className="p-3 font-semibold text-gray-750">{don.transactionId}</td>
                            <td className="p-3 font-sans">
                              <div className="font-bold text-gray-800">{don.donorName}</div>
                              <div className="text-[10px] text-gray-550">{don.donorEmail}</div>
                            </td>
                            <td className="p-3">
                              <span className="font-semibold text-[#7C3AED]">{don.paymentMethod}</span>
                            </td>
                            <td className="p-3 font-semibold text-emerald-800 text-sm">
                              ₹{don.amount.toLocaleString("en-IN")}
                            </td>
                            <td className="p-3 text-[10px]">{new Date(don.date).toLocaleDateString()}</td>
                            <td className="p-3 max-w-[200px] truncate font-sans text-gray-500 text-[11px]" title={don.message}>
                              {don.message || "—"}
                            </td>
                          </tr>))}
                      </tbody>
                    </table>
                  </div>)}
              </motion.div>)}

            {activeTab === "inquiries" && (<motion.div key="inquiries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                {!data?.inquiries || data.inquiries.length === 0 ? (<p className="text-center text-xs text-gray-400 py-12">No contact inquiries or messages received.</p>) : (data.inquiries.map((inq) => (<div key={inq.id} className="p-5 rounded-2xl border border-gray-105 bg-white shadow-xs flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2 max-w-2xl text-left">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-gray-800">{inq.fullName}</h4>
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase ${inq.status === "Reviewed"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-amber-50 text-amber-600 border border-amber-200"}`}>
                            {inq.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {new Date(inq.date).toLocaleDateString()} {new Date(inq.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <div className="text-xs text-[#D33384] font-mono leading-tight">
                          <span className="text-gray-400 font-sans">Email:</span> <a href={`mailto:${inq.email}`} className="hover:underline">{inq.email}</a>
                        </div>

                        <p className="text-xs text-gray-700 bg-gray-50/50 p-3 rounded-xl border border-gray-150 leading-relaxed whitespace-pre-wrap font-sans">
                          {inq.message}
                        </p>

                        <div className="text-xs pt-1">
                          <span className="font-bold text-gray-750">Internal Admin Notes:</span>{" "}
                          {editingNotesId === inq.id ? (<div className="flex items-center space-x-2 mt-1">
                              <input type="text" value={tempNotes} onChange={(e) => setTempNotes(e.target.value)} className="px-2 py-1 text-xs border rounded-lg max-w-md w-full bg-white focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"/>
                              <button onClick={() => saveNotes(inq.id, inq.status)} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded">
                                Save
                              </button>
                              <button onClick={() => setEditingNotesId(null)} className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] rounded">
                                Cancel
                              </button>
                            </div>) : (<span className="text-gray-500 italic">
                              {inq.notes || "None logged yet."}{" "}
                              <button onClick={() => startEditingNotes(inq.id, inq.notes || "")} className="text-xs text-[#7C3AED] hover:underline inline-flex items-center ml-1">
                                <Edit3 className="w-3 h-3 ml-0.5"/> Edit
                              </button>
                            </span>)}
                        </div>
                      </div>

                      
                      <div className="flex md:flex-col items-end gap-2 justify-center">
                        <button onClick={() => handleUpdateStatus(inq.id, "Reviewed", inq.notes)} className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <CheckCircle className="w-3.5 h-3.5"/>
                          <span>Mark Reviewed</span>
                        </button>
                        <button onClick={() => handleUpdateStatus(inq.id, "Pending", inq.notes)} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold flex items-center space-x-1 shadow-sm cursor-pointer">
                          <XCircle className="w-3.5 h-3.5"/>
                          <span>Mark Pending</span>
                        </button>
                        <button onClick={() => handleDelete(inq.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition mt-2 cursor-pointer" title="Delete Inquiry">
                          <Trash2 className="w-4 h-4"/>
                        </button>
                      </div>
                    </div>)))}
              </motion.div>)}
          </AnimatePresence>
        </div>)}
    </div>);
}
