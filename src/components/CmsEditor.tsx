import React, { useState } from "react";
import { SiteContent, MilestoneItem, TeamMember, ProgramItem, GalleryItem, NewsItem, AnnouncementItem, DocumentItem, PartnerItem } from "../cmsTypes";
import RichTextEditor from "./RichTextEditor";
import { 
    Layout, 
    Info, 
    Target, 
    Users, 
    Briefcase, 
    Calendar, 
    Image as ImageIcon, 
    MessageSquare, 
    PhoneCall, 
    FileText, 
    Plus, 
    Trash2, 
    Save, 
    X, 
    Edit, 
    Upload, 
    RefreshCw, 
    ChevronUp, 
    ChevronDown,
    CheckCircle
} from "lucide-react";

interface CmsEditorProps {
    content: SiteContent;
    onSave: (updatedContent: SiteContent) => Promise<boolean>;
    onResetDefaults: () => void;
}

// Client-side image compression utility using canvas
const compressImageFile = (file: File, maxDim = 1000, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxDim) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    }
                } else {
                    if (height > maxDim) {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const base64 = canvas.toDataURL("image/jpeg", quality);
                    resolve(base64);
                } else {
                    resolve(e.target?.result as string);
                }
            };
            img.onerror = () => reject(new Error("Image load error"));
            img.src = e.target?.result as string;
        };
        reader.onerror = () => reject(new Error("File read error"));
        reader.readAsDataURL(file);
    });
};

export default function CmsEditor({ content, onSave, onResetDefaults }: CmsEditorProps) {
    const [activeTab, setActiveTab] = useState<
        "hero" | "about" | "mission" | "team" | "programs" | "events" | "gallery" | "contact" | "documents"
    >("hero");

    const [isSaving, setIsSaving] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Working draft of the content being edited
    const [draft, setDraft] = useState<SiteContent>(() => JSON.parse(JSON.stringify(content)));

    // Re-sync draft when content props change (e.g. on load or reset)
    React.useEffect(() => {
        setDraft(JSON.parse(JSON.stringify(content)));
    }, [content]);

    const handleSave = async () => {
        setIsSaving(true);
        setErrorMsg("");
        setSuccessMsg("");

        // Validate timeline milestones in About section
        const invalidMilestone = draft.aboutUs?.milestones?.find(
            m => !m.year?.trim() || !m.dateDetail?.trim() || !m.description?.trim()
        );
        if (invalidMilestone) {
            setErrorMsg("Validation Error: Please fill in the Year Badge, Date Detail Header, and Description for all timeline milestones before saving.");
            setIsSaving(false);
            return;
        }

        try {
            const success = await onSave(draft);
            if (success) {
                setSuccessMsg("Changes saved successfully and are now live!");
                setEditMode(false);
                setTimeout(() => setSuccessMsg(""), 4000);
            } else {
                setErrorMsg("Failed to save changes. Please try again.");
            }
        } catch (e: any) {
            setErrorMsg("Error: " + (e.message || "Unable to save."));
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setDraft(JSON.parse(JSON.stringify(content)));
        setEditMode(false);
        setErrorMsg("");
    };

    const updateField = (section: keyof SiteContent, field: string, value: any) => {
        setDraft(prev => {
            const updated = { ...prev };
            (updated as any)[section] = {
                ...(updated as any)[section],
                [field]: value
            };
            return updated;
        });
    };

    const updateNestedField = (section: keyof SiteContent, subsection: string, field: string, value: any) => {
        setDraft(prev => {
            const updated = { ...prev };
            (updated as any)[section] = {
                ...(updated as any)[section],
                [subsection]: {
                    ...((updated as any)[section])[subsection],
                    [field]: value
                }
            };
            return updated;
        });
    };

    // Helper to upload document files
    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const sizeInKB = Math.round(file.size / 1024);
        const sizeStr = sizeInKB > 1000 ? `${(sizeInKB / 1024).toFixed(1)} MB` : `${sizeInKB} KB`;

        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64Data = event.target?.result as string;
            const newDoc: DocumentItem = {
                id: `doc-${Date.now()}`,
                name: file.name,
                size: sizeStr,
                type: file.type || "application/octet-stream",
                data: base64Data,
                date: new Date().toISOString()
            };
            
            setDraft(prev => ({
                ...prev,
                documents: [newDoc, ...(prev.documents || [])]
            }));
        };
        reader.readAsDataURL(file);
    };

    const sidebarItems = [
        { id: "hero", label: "Hero & Stats", icon: Layout },
        { id: "about", label: "About & Milestones", icon: Info },
        { id: "mission", label: "Mission & Vision", icon: Target },
        { id: "team", label: "Team & Trustees", icon: Users },
        { id: "programs", label: "Programs List", icon: Briefcase },
        { id: "events", label: "Events & Honors", icon: Calendar },
        { id: "gallery", label: "Artisan Gallery", icon: ImageIcon },
        { id: "contact", label: "Contact & Footer", icon: PhoneCall },
        { id: "documents", label: "Documents & PDFs", icon: FileText }
    ] as const;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left font-sans items-stretch min-h-[500px]">
            {/* Sidebar Controls */}
            <div className="lg:col-span-3 bg-gray-50 p-4 border border-gray-200 rounded-2xl flex flex-col justify-between text-slate-800">
                <div className="space-y-1">
                    <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2 mb-2">
                        CMS Navigation
                    </span>
                    {sidebarItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id as any);
                                    setEditMode(false);
                                    setErrorMsg("");
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold rounded-xl transition cursor-pointer ${
                                    activeTab === item.id
                                        ? "bg-[#7C3AED] text-white shadow-sm"
                                        : "text-slate-700 hover:bg-slate-200/50 hover:text-slate-950"
                                }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="pt-6 border-t border-gray-200 mt-6 space-y-2">
                    <button
                        onClick={() => {
                            if (window.confirm("Are you sure you want to restore the entire website layout and text to the original co-operative defaults? Your local edits will be discarded.")) {
                                onResetDefaults();
                                setSuccessMsg("Site reset to default parameters.");
                                setTimeout(() => setSuccessMsg(""), 3500);
                            }
                        }}
                        className="w-full py-2 bg-pink-50 hover:bg-pink-100 text-[#D63384] text-[10px] font-bold tracking-widest uppercase rounded-xl transition flex items-center justify-center space-x-1 border border-pink-200/50 cursor-pointer"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset to Defaults</span>
                    </button>
                    <span className="block text-[9px] text-center text-gray-400 font-mono uppercase">
                        Core System v1.1
                    </span>
                </div>
            </div>

            {/* Editing Pane */}
            <div className="lg:col-span-9 bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative shadow-xs text-slate-800">
                {/* State Alerts */}
                {successMsg && (
                    <div className="absolute top-4 left-4 right-4 z-40 p-4 bg-emerald-50 text-emerald-850 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center space-x-2 shadow-xs">
                        <CheckCircle className="w-4 h-4 text-emerald-605 shrink-0 animate-bounce" />
                        <span>{successMsg}</span>
                    </div>
                )}
                {errorMsg && (
                    <div className="absolute top-4 left-4 right-4 z-40 p-4 bg-red-50 text-red-850 rounded-2xl border border-red-200 text-xs font-semibold flex items-center space-x-2 shadow-xs animate-pulse">
                        <X className="w-4 h-4 text-red-555 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-black text-gray-900 font-serif capitalize">
                                {sidebarItems.find(i => i.id === activeTab)?.label} Settings
                            </h4>
                            <p className="text-xs text-gray-500">
                                {editMode ? "Modify parameters in this section." : "View current active properties."}
                            </p>
                        </div>

                        {!editMode ? (
                            <button
                                onClick={() => setEditMode(true)}
                                className="px-3.5 py-1.5 bg-[#7C3AED] hover:bg-[#682ecf] text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm transition cursor-pointer"
                            >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit Section</span>
                            </button>
                        ) : (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleCancel}
                                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm transition cursor-pointer disabled:opacity-50"
                                >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Fields */}
                    <div className="space-y-4">
                        {/* HERO & STATS TAB */}
                        {activeTab === "hero" && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        Hero Heading Title (Supports \n for linebreaks)
                                    </label>
                                    <textarea
                                        disabled={!editMode}
                                        value={draft.hero.title}
                                        onChange={(e) => updateField("hero", "title", e.target.value)}
                                        rows={2}
                                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 font-mono"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        Hero Subtitle Description
                                    </label>
                                    <textarea
                                        disabled={!editMode}
                                        value={draft.hero.subtitle}
                                        onChange={(e) => updateField("hero", "subtitle", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 leading-relaxed"
                                    />
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-3">
                                        Base Statistic Counts (These add to applications / donations dynamically)
                                    </span>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {Object.keys(draft.hero.stats).map((statKey) => (
                                            <div key={statKey} className="space-y-1">
                                                <label className="block text-[9px] font-bold text-gray-400 capitalize pl-1">
                                                    {statKey.replace(/([A-Z])/g, " $1")}
                                                </label>
                                                <input
                                                    type="number"
                                                    disabled={!editMode}
                                                    value={(draft.hero.stats as any)[statKey]}
                                                    onChange={(e) => updateNestedField("hero", "stats", statKey, Number(e.target.value))}
                                                    className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 font-mono"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ABOUT US TAB */}
                        {activeTab === "about" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                            Section Small Tag
                                        </label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.aboutUs.subtitle}
                                            onChange={(e) => updateField("aboutUs", "subtitle", e.target.value)}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                            Section Heading Title
                                        </label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.aboutUs.title}
                                            onChange={(e) => updateField("aboutUs", "title", e.target.value)}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        Main About Us Paragraphs Content (Rich Text)
                                    </label>
                                    {editMode ? (
                                        <RichTextEditor
                                            value={draft.aboutUs.content}
                                            onChange={(html) => updateField("aboutUs", "content", html)}
                                        />
                                    ) : (
                                        <div 
                                            className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans max-h-48 overflow-y-auto"
                                            dangerouslySetInnerHTML={{ __html: draft.aboutUs.content }}
                                        />
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        The Pledge Quote
                                    </label>
                                    <input
                                        type="text"
                                        disabled={!editMode}
                                        value={draft.aboutUs.pledge}
                                        onChange={(e) => updateField("aboutUs", "pledge", e.target.value)}
                                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-[#7C3AED] bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 font-serif italic"
                                    />
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-4 space-y-4">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 font-sans">
                                        Founder Legacy Archive Settings
                                    </span>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[9px] font-bold text-gray-400">Founder Name</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.aboutUs.founder.name}
                                                onChange={(e) => updateNestedField("aboutUs", "founder", "name", e.target.value)}
                                                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-[#7C3AED] disabled:opacity-70 disabled:bg-gray-50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[9px] font-bold text-gray-400">Founder Lifespan Years</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.aboutUs.founder.years}
                                                onChange={(e) => updateNestedField("aboutUs", "founder", "years", e.target.value)}
                                                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-[#7C3AED] disabled:opacity-70 disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400">Founder Quote Statement</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.aboutUs.founder.quote}
                                            onChange={(e) => updateNestedField("aboutUs", "founder", "quote", e.target.value)}
                                            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-[#7C3AED] disabled:opacity-70 disabled:bg-gray-50 italic"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400">Founder Biography Text (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.aboutUs.founder.description}
                                                onChange={(html) => updateNestedField("aboutUs", "founder", "description", html)}
                                            />
                                        ) : (
                                            <div 
                                                className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans max-h-48 overflow-y-auto"
                                                dangerouslySetInnerHTML={{ __html: draft.aboutUs.founder.description }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 font-sans">
                                            Interactive Timeline Milestones
                                        </span>
                                        {editMode && (
                                            <button
                                                onClick={() => {
                                                    const newMilestone = {
                                                        year: "New Year",
                                                        title: "New Year",
                                                        description: "Write description of milestones here...",
                                                        dateDetail: "Milestone detail..."
                                                    };
                                                    updateField("aboutUs", "milestones", [...draft.aboutUs.milestones, newMilestone]);
                                                }}
                                                className="px-2.5 py-1 text-[9px] font-bold bg-[#7C3AED] hover:bg-[#682ecf] text-white rounded-lg flex items-center space-x-1 cursor-pointer border-0"
                                            >
                                                <Plus className="w-3 h-3" />
                                                <span>Add Milestone</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        {draft.aboutUs.milestones.map((milestone, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3 justify-between">
                                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 flex-1">
                                                    <div>
                                                        <label className="block text-[8px] font-bold text-gray-400 uppercase">Year Badge</label>
                                                        <input
                                                            type="text"
                                                            disabled={!editMode}
                                                            value={milestone.year}
                                                            onChange={(e) => {
                                                                const updatedList = [...draft.aboutUs.milestones];
                                                                updatedList[idx].year = e.target.value;
                                                                updatedList[idx].title = e.target.value;
                                                                updateField("aboutUs", "milestones", updatedList);
                                                            }}
                                                            className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-70"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[8px] font-bold text-gray-400 uppercase">Date Detail Header</label>
                                                        <input
                                                            type="text"
                                                            disabled={!editMode}
                                                            value={milestone.dateDetail || ""}
                                                            onChange={(e) => {
                                                                const updatedList = [...draft.aboutUs.milestones];
                                                                updatedList[idx].dateDetail = e.target.value;
                                                                updateField("aboutUs", "milestones", updatedList);
                                                            }}
                                                            className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-70"
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-[8px] font-bold text-gray-400 uppercase">Description</label>
                                                        <input
                                                            type="text"
                                                            disabled={!editMode}
                                                            value={milestone.description}
                                                            onChange={(e) => {
                                                                const updatedList = [...draft.aboutUs.milestones];
                                                                updatedList[idx].description = e.target.value;
                                                                updateField("aboutUs", "milestones", updatedList);
                                                            }}
                                                            className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-70"
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {editMode && (
                                                    <button
                                                        onClick={() => {
                                                            const updatedList = draft.aboutUs.milestones.filter((_, i) => i !== idx);
                                                            updateField("aboutUs", "milestones", updatedList);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 shrink-0 cursor-pointer border-0 bg-transparent"
                                                        title="Delete Milestone"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* MISSION & VISION TAB */}
                        {activeTab === "mission" && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="block text-xs font-bold text-[#D63384] uppercase tracking-wider pl-1">
                                        Vision Settings
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Vision Section Title</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.missionVision.visionTitle}
                                            onChange={(e) => updateNestedField("missionVision", "visionTitle", "", e.target.value)} // Note: direct string assignment handled cleanly below
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Vision Description (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.missionVision.visionDesc}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        missionVision: {
                                                            ...prev.missionVision,
                                                            visionDesc: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans"
                                                dangerouslySetInnerHTML={{ __html: draft.missionVision.visionDesc }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6 space-y-3">
                                    <span className="block text-xs font-bold text-[#7C3AED] uppercase tracking-wider pl-1">
                                        Mission Settings
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mission Section Title</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.missionVision.missionTitle}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    missionVision: {
                                                        ...prev.missionVision,
                                                        missionTitle: e.target.value
                                                    }
                                                }));
                                            }}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-1">Mission Description (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.missionVision.missionDesc}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        missionVision: {
                                                            ...prev.missionVision,
                                                            missionDesc: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans"
                                                dangerouslySetInnerHTML={{ __html: draft.missionVision.missionDesc }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TEAM & TRUSTEES TAB */}
                        {activeTab === "team" && (
                            <div className="space-y-6">
                                {/* Board of Directors */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="block text-xs font-bold text-[#D63384] uppercase tracking-wider pl-1">
                                            Board of Directors
                                        </span>
                                        {editMode && (
                                            <button
                                                onClick={() => {
                                                    const newMember: TeamMember = {
                                                        id: `tm-${Date.now()}`,
                                                        name: "New Member Name",
                                                        role: "Board Director",
                                                        initials: "N.M"
                                                    };
                                                    updateField("aboutUs", "teamMembers", [...draft.aboutUs.teamMembers, newMember]);
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold bg-[#D63384] hover:bg-[#c21f73] text-white rounded-lg flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add Director</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                        {draft.aboutUs.teamMembers.map((member, idx) => (
                                            <div key={member.id} className="p-3 bg-gray-50 border rounded-xl flex items-center justify-between gap-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Initials"
                                                        value={member.initials}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.teamMembers];
                                                            list[idx].initials = e.target.value;
                                                            updateField("aboutUs", "teamMembers", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 text-center font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Full Name"
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.teamMembers];
                                                            list[idx].name = e.target.value;
                                                            updateField("aboutUs", "teamMembers", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 sm:col-span-2 font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Cooperative Role"
                                                        value={member.role}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.teamMembers];
                                                            list[idx].role = e.target.value;
                                                            updateField("aboutUs", "teamMembers", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 sm:col-span-3 text-[#D63384] font-semibold"
                                                    />
                                                </div>
                                                {editMode && (
                                                    <button
                                                        onClick={() => {
                                                            const list = draft.aboutUs.teamMembers.filter(m => m.id !== member.id);
                                                            updateField("aboutUs", "teamMembers", list);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 shrink-0 cursor-pointer"
                                                        title="Delete Director"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Executives / Advisory */}
                                <div className="border-t border-gray-100 pt-6 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="block text-xs font-bold text-[#7C3AED] uppercase tracking-wider pl-1">
                                            Executives & Legal Advisory Directory
                                        </span>
                                        {editMode && (
                                            <button
                                                onClick={() => {
                                                    const newMember: TeamMember = {
                                                        id: `exec-${Date.now()}`,
                                                        name: "New Executive Name",
                                                        role: "Advisor",
                                                        initials: "N.E"
                                                    };
                                                    updateField("aboutUs", "executives", [...draft.aboutUs.executives, newMember]);
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold bg-[#7C3AED] hover:bg-[#682ecf] text-white rounded-lg flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add Executive</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                                        {draft.aboutUs.executives.map((member, idx) => (
                                            <div key={member.id} className="p-3 bg-gray-50 border rounded-xl flex items-center justify-between gap-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Initials"
                                                        value={member.initials}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.executives];
                                                            list[idx].initials = e.target.value;
                                                            updateField("aboutUs", "executives", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 text-center font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Full Name"
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.executives];
                                                            list[idx].name = e.target.value;
                                                            updateField("aboutUs", "executives", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 sm:col-span-2 font-bold"
                                                    />
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Role"
                                                        value={member.role}
                                                        onChange={(e) => {
                                                            const list = [...draft.aboutUs.executives];
                                                            list[idx].role = e.target.value;
                                                            updateField("aboutUs", "executives", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 sm:col-span-3 text-[#7C3AED] font-semibold"
                                                    />
                                                </div>
                                                {editMode && (
                                                    <button
                                                        onClick={() => {
                                                            const list = draft.aboutUs.executives.filter(m => m.id !== member.id);
                                                            updateField("aboutUs", "executives", list);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 shrink-0 cursor-pointer"
                                                        title="Delete Executive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PROGRAMS LIST TAB */}
                        {activeTab === "programs" && (
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 mb-2">
                                    Modify Core Cooperative Programs
                                </span>
                                {draft.programs.map((prog, idx) => (
                                    <div key={prog.id} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="block text-[8px] font-bold text-gray-400 uppercase">Program Title</label>
                                                <input
                                                    type="text"
                                                    disabled={!editMode}
                                                    value={prog.title}
                                                    onChange={(e) => {
                                                        const list = [...draft.programs];
                                                        list[idx].title = e.target.value;
                                                        updateField("programs", "programs", list);
                                                    }}
                                                    className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-bold text-gray-900"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="block text-[8px] font-bold text-gray-400 uppercase">Target Metric Info</label>
                                                <input
                                                    type="text"
                                                    disabled={!editMode}
                                                    value={prog.target}
                                                    onChange={(e) => {
                                                        const list = [...draft.programs];
                                                        list[idx].target = e.target.value;
                                                        updateField("programs", "programs", list);
                                                    }}
                                                    className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 text-[#D63384] font-semibold"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-[8px] font-bold text-gray-400 uppercase">Short Description (Cards)</label>
                                            <textarea
                                                disabled={!editMode}
                                                value={prog.description}
                                                onChange={(e) => {
                                                    const list = [...draft.programs];
                                                    list[idx].description = e.target.value;
                                                    updateField("programs", "programs", list);
                                                }}
                                                rows={2}
                                                className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 leading-relaxed text-gray-650"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-[8px] font-bold text-gray-400 uppercase">Long Description Content</label>
                                            <textarea
                                                disabled={!editMode}
                                                value={prog.longDesc}
                                                onChange={(e) => {
                                                    const list = [...draft.programs];
                                                    list[idx].longDesc = e.target.value;
                                                    updateField("programs", "programs", list);
                                                }}
                                                rows={3}
                                                className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 leading-relaxed text-gray-650"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* EVENTS & HONORS TAB */}
                        {activeTab === "events" && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <span className="block text-xs font-bold text-amber-700 uppercase tracking-wider pl-1">
                                        Annual General Meeting Forum Settings
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Event Header Title</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.events.agmTitle}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    events: {
                                                        ...prev.events,
                                                        agmTitle: e.target.value
                                                    }
                                                }));
                                            }}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Event Narrative Body (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.events.agmContent}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        events: {
                                                            ...prev.events,
                                                            agmContent: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans max-h-48 overflow-y-auto"
                                                dangerouslySetInnerHTML={{ __html: draft.events.agmContent }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6 space-y-3">
                                    <span className="block text-xs font-bold text-indigo-705 uppercase tracking-wider pl-1">
                                        Ashok Saikia Award Laurels Settings
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Laurel Header Title</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.events.ashokSaikiaTitle}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    events: {
                                                        ...prev.events,
                                                        ashokSaikiaTitle: e.target.value
                                                    }
                                                }));
                                            }}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-70 disabled:bg-gray-50 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Award Background Story (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.events.ashokSaikiaContent}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        events: {
                                                            ...prev.events,
                                                            ashokSaikiaContent: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-650 leading-relaxed font-light font-sans max-h-48 overflow-y-auto"
                                                dangerouslySetInnerHTML={{ __html: draft.events.ashokSaikiaContent }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ARTISAN GALLERY TAB */}
                        {activeTab === "gallery" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        Gallery Photo Records (Resized & optimized on-upload)
                                    </span>
                                    {editMode && (
                                        <div className="flex items-center space-x-2">
                                            <label className="px-2.5 py-1.5 bg-[#D63384] hover:bg-[#c21f73] text-white text-[10px] font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-sm">
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Upload Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const base64 = await compressImageFile(file);
                                                            const newItem: GalleryItem = {
                                                                id: `gal-${Date.now()}`,
                                                                title: "New Photo Title",
                                                                category: "Activity",
                                                                image: base64
                                                            };
                                                            updateField("gallery", "gallery", [newItem, ...draft.gallery]);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-1">
                                    {draft.gallery.map((item, idx) => (
                                        <div key={item.id} className="p-3 bg-gray-50 border rounded-xl flex gap-3 items-start justify-between">
                                            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white relative group">
                                                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                                                {editMode && (
                                                    <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                                                        <Upload className="w-4 h-4" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (file) {
                                                                    const base64 = await compressImageFile(file);
                                                                    const list = [...draft.gallery];
                                                                    list[idx].image = base64;
                                                                    updateField("gallery", "gallery", list);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                )}
                                            </div>

                                            <div className="flex-1 space-y-1.5 text-left">
                                                <input
                                                    type="text"
                                                    disabled={!editMode}
                                                    placeholder="Photo Title"
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const list = [...draft.gallery];
                                                        list[idx].title = e.target.value;
                                                        updateField("gallery", "gallery", list);
                                                    }}
                                                    className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-bold"
                                                />
                                                <input
                                                    type="text"
                                                    disabled={!editMode}
                                                    placeholder="Category tag (e.g. Handloom)"
                                                    value={item.category}
                                                    onChange={(e) => {
                                                        const list = [...draft.gallery];
                                                        list[idx].category = e.target.value;
                                                        updateField("gallery", "gallery", list);
                                                    }}
                                                    className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-mono text-[10px]"
                                                />
                                            </div>

                                            {editMode && (
                                                <button
                                                    onClick={() => {
                                                        const list = draft.gallery.filter(g => g.id !== item.id);
                                                        updateField("gallery", "gallery", list);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 shrink-0 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* NEWS & NOTICES TAB */}
                        {activeTab === "news" && (
                            <div className="space-y-6">
                                {/* Notice Board Section */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="block text-xs font-bold text-[#D63384] uppercase tracking-wider pl-1">
                                            Official Announcements / Notices
                                        </span>
                                        {editMode && (
                                            <button
                                                onClick={() => {
                                                    const newItem: AnnouncementItem = {
                                                        id: `ann-${Date.now()}`,
                                                        title: "New notice Title",
                                                        content: "<p>Write notice content here...</p>",
                                                        date: new Date().toISOString(),
                                                        type: "info"
                                                    };
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        announcements: [newItem, ...(prev.announcements || [])]
                                                    }));
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold bg-[#D63384] hover:bg-[#c21f73] text-white rounded-lg flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add Notice</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                        {draft.announcements.map((item, idx) => (
                                            <div key={item.id} className="p-3 bg-gray-50 border rounded-xl space-y-2">
                                                <div className="flex gap-2 items-center justify-between">
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Notice Title"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const list = [...draft.announcements];
                                                            list[idx].title = e.target.value;
                                                            updateField("announcements", "announcements", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 flex-1 font-bold"
                                                    />
                                                    <select
                                                        disabled={!editMode}
                                                        value={item.type || "info"}
                                                        onChange={(e) => {
                                                            const list = [...draft.announcements];
                                                            list[idx].type = e.target.value as any;
                                                            updateField("announcements", "announcements", list);
                                                        }}
                                                        className="px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-bold"
                                                    >
                                                        <option value="info">Info (Pink)</option>
                                                        <option value="warning">Warning (Amber)</option>
                                                        <option value="success">Success (Green)</option>
                                                    </select>
                                                    {editMode && (
                                                        <button
                                                            onClick={() => {
                                                                const list = draft.announcements.filter(a => a.id !== item.id);
                                                                updateField("announcements", "announcements", list);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {editMode ? (
                                                    <RichTextEditor
                                                        value={item.content}
                                                        onChange={(html) => {
                                                            const list = [...draft.announcements];
                                                            list[idx].content = html;
                                                            updateField("announcements", "announcements", list);
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="p-2.5 bg-white rounded-lg border text-xs text-gray-650 leading-relaxed font-light prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* News Section */}
                                <div className="border-t border-gray-100 pt-6 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="block text-xs font-bold text-[#7C3AED] uppercase tracking-wider pl-1">
                                            Chronological News Articles
                                        </span>
                                        {editMode && (
                                            <button
                                                onClick={() => {
                                                    const newItem: NewsItem = {
                                                        id: `news-${Date.now()}`,
                                                        title: "New News Title",
                                                        summary: "Brief summary paragraph...",
                                                        content: "<p>Write full news article content here...</p>",
                                                        date: new Date().toISOString()
                                                    };
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        news: [newItem, ...(prev.news || [])]
                                                    }));
                                                }}
                                                className="px-2.5 py-1 text-[10px] font-bold bg-[#7C3AED] hover:bg-[#682ecf] text-white rounded-lg flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add Article</span>
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                        {draft.news.map((item, idx) => (
                                            <div key={item.id} className="p-4 bg-gray-50 border rounded-2xl space-y-3">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                                                        <input
                                                            type="text"
                                                            disabled={!editMode}
                                                            placeholder="Article Title"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const list = [...draft.news];
                                                                list[idx].title = e.target.value;
                                                                updateField("news", "news", list);
                                                            }}
                                                            className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-bold"
                                                        />
                                                        <input
                                                            type="text"
                                                            disabled={!editMode}
                                                            placeholder="Short Summary (Cards)"
                                                            value={item.summary}
                                                            onChange={(e) => {
                                                                const list = [...draft.news];
                                                                list[idx].summary = e.target.value;
                                                                updateField("news", "news", list);
                                                            }}
                                                            className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white disabled:opacity-75"
                                                        />
                                                    </div>
                                                    {editMode && (
                                                        <button
                                                            onClick={() => {
                                                                const list = draft.news.filter(n => n.id !== item.id);
                                                                updateField("news", "news", list);
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex gap-4 items-center">
                                                    <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden border bg-white relative group">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-[10px]">No Banner</div>
                                                        )}
                                                        {editMode && (
                                                            <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-[10px]">
                                                                <Upload className="w-3.5 h-3.5" />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={async (e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            const base64 = await compressImageFile(file, 800, 0.7);
                                                                            const list = [...draft.news];
                                                                            list[idx].image = base64;
                                                                            updateField("news", "news", list);
                                                                        }
                                                                    }}
                                                                />
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="text-[10px] text-gray-400 font-mono">Banner image matches card dimensions</span>
                                                    </div>
                                                </div>

                                                {editMode ? (
                                                    <RichTextEditor
                                                        value={item.content}
                                                        onChange={(html) => {
                                                            const list = [...draft.news];
                                                            list[idx].content = html;
                                                            updateField("news", "news", list);
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="p-3 bg-white rounded-xl border text-xs text-gray-650 leading-relaxed font-light prose max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTACT & FOOTER TAB */}
                        {activeTab === "contact" && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider pl-1">
                                        Headquarters Contact Directory
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">HQ Address</label>
                                        <textarea
                                            disabled={!editMode}
                                            value={draft.contactInfo.address}
                                            onChange={(e) => updateNestedField("contactInfo", "address", "", e.target.value)} // Direct edit handled below
                                            rows={3}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75 font-mono"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Phone number list (Comma separated)</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.contactInfo.phoneNumbers.join(", ")}
                                                onChange={(e) => {
                                                    const list = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        contactInfo: {
                                                            ...prev.contactInfo,
                                                            phoneNumbers: list
                                                        }
                                                    }));
                                                }}
                                                className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75 font-mono"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Email Addresses (Comma separated)</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.contactInfo.emails.join(", ")}
                                                onChange={(e) => {
                                                    const list = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        contactInfo: {
                                                            ...prev.contactInfo,
                                                            emails: list
                                                        }
                                                    }));
                                                }}
                                                className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75 font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Facebook Fanpage URL</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.contactInfo.facebookUrl}
                                                onChange={(e) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        contactInfo: {
                                                            ...prev.contactInfo,
                                                            facebookUrl: e.target.value
                                                        }
                                                    }));
                                                }}
                                                className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">LinkedIn Profile URL</label>
                                            <input
                                                type="text"
                                                disabled={!editMode}
                                                value={draft.contactInfo.linkedinUrl}
                                                onChange={(e) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        contactInfo: {
                                                            ...prev.contactInfo,
                                                            linkedinUrl: e.target.value
                                                        }
                                                    }));
                                                }}
                                                className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6 space-y-4">
                                    <span className="block text-xs font-bold text-[#D63384] uppercase tracking-wider pl-1">
                                        Donation Portal & QR Code Settings
                                    </span>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-24 h-24 shrink-0 border border-gray-200 rounded-2xl bg-white flex items-center justify-center overflow-hidden relative group">
                                            {draft.donationDetails.qrCodeImage ? (
                                                <img src={draft.donationDetails.qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="text-[10px] text-gray-400 text-center font-bold px-1">Upload UPI QR</div>
                                            )}
                                            {editMode && (
                                                <label className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer text-center text-[10px]">
                                                    <Upload className="w-4 h-4" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const base64 = await compressImageFile(file, 600, 0.8);
                                                                setDraft(prev => ({
                                                                    ...prev,
                                                                    donationDetails: {
                                                                        ...prev.donationDetails,
                                                                        qrCodeImage: base64
                                                                    }
                                                                }));
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                        <div className="flex-1 text-xs text-gray-400 leading-normal">
                                            {draft.donationDetails.qrCodeImage && editMode && (
                                                <button
                                                    onClick={() => {
                                                        setDraft(prev => ({
                                                            ...prev,
                                                            donationDetails: {
                                                                ...prev.donationDetails,
                                                                qrCodeImage: ""
                                                            }
                                                        }));
                                                    }}
                                                    className="px-2 py-1 bg-red-50 text-red-500 rounded border border-red-200 text-[10px] font-bold uppercase transition"
                                                >
                                                    Remove QR
                                                </button>
                                            )}
                                            <p className="mt-1">Provide a scan QR image for offline UPI transactions (GPay/PhonePe).</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Bank details description (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.donationDetails.bankDetails}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        donationDetails: {
                                                            ...prev.donationDetails,
                                                            bankDetails: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-3.5 bg-gray-50 rounded-xl border text-xs text-gray-655 font-light"
                                                dangerouslySetInnerHTML={{ __html: draft.donationDetails.bankDetails }}
                                            />
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase pl-1">Donation Intro Paragraph (Rich Text)</label>
                                        {editMode ? (
                                            <RichTextEditor
                                                value={draft.donationDetails.description}
                                                onChange={(html) => {
                                                    setDraft(prev => ({
                                                        ...prev,
                                                        donationDetails: {
                                                            ...prev.donationDetails,
                                                            description: html
                                                        }
                                                    }));
                                                }}
                                            />
                                        ) : (
                                            <div 
                                                className="p-3.5 bg-gray-50 rounded-xl border text-xs text-gray-655 font-light"
                                                dangerouslySetInnerHTML={{ __html: draft.donationDetails.description }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6 space-y-4">
                                    <span className="block text-xs font-bold text-gray-800 uppercase tracking-wider pl-1">
                                        Website Footer Settings
                                    </span>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Footer Tagline Description</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.footer.tagline}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    footer: {
                                                        ...prev.footer,
                                                        tagline: e.target.value
                                                    }
                                                }));
                                            }}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Footer Description Paragraph</label>
                                        <textarea
                                            disabled={!editMode}
                                            value={draft.footer.description}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    footer: {
                                                        ...prev.footer,
                                                        description: e.target.value
                                                    }
                                                }));
                                            }}
                                            rows={2}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Copyright Statement</label>
                                        <input
                                            type="text"
                                            disabled={!editMode}
                                            value={draft.footer.copyright}
                                            onChange={(e) => {
                                                setDraft(prev => ({
                                                    ...prev,
                                                    footer: {
                                                        ...prev.footer,
                                                        copyright: e.target.value
                                                    }
                                                }));
                                            }}
                                            className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50/50 disabled:opacity-75"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* DOCUMENTS TAB */}
                        {activeTab === "documents" && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
                                        Downloadable Resources & PDFs (Stored securely on-DB)
                                    </span>
                                    {editMode && (
                                        <label className="px-2.5 py-1.5 bg-[#7C3AED] hover:bg-[#682ecf] text-white text-[10px] font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-sm">
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>Upload Document</span>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx,.xls,.xlsx"
                                                className="hidden"
                                                onChange={handleDocumentUpload}
                                            />
                                        </label>
                                    )}
                                </div>

                                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                                    {(draft.documents || []).length === 0 ? (
                                        <p className="text-xs text-gray-400 text-center py-10 bg-gray-55/20 border border-dashed rounded-xl">
                                            No resources uploaded yet. Upload PDFs/forms here.
                                        </p>
                                    ) : (
                                        (draft.documents || []).map((doc, idx) => (
                                            <div key={doc.id} className="p-3 bg-gray-50 border rounded-xl flex items-center justify-between gap-4">
                                                <div className="flex-1 space-y-1">
                                                    <input
                                                        type="text"
                                                        disabled={!editMode}
                                                        placeholder="Document Name"
                                                        value={doc.name}
                                                        onChange={(e) => {
                                                            const list = [...(draft.documents || [])];
                                                            list[idx].name = e.target.value;
                                                            updateField("documents", "documents", list);
                                                        }}
                                                        className="w-full px-2 py-1 text-xs border rounded-lg bg-white disabled:opacity-75 font-mono"
                                                    />
                                                    <div className="flex items-center space-x-2 text-[9px] text-gray-400 font-mono pl-1">
                                                        <span>Size: {doc.size}</span>
                                                        <span>•</span>
                                                        <span>Type: {doc.type}</span>
                                                    </div>
                                                </div>

                                                {editMode && (
                                                    <button
                                                        onClick={() => {
                                                            const list = draft.documents.filter(d => d.id !== doc.id);
                                                            updateField("documents", "documents", list);
                                                        }}
                                                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 shrink-0 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Controls */}
                {editMode && (
                    <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end space-x-2.5 z-10">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-xs font-semibold text-gray-650 bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
                        >
                            Discard Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] rounded-xl shadow-md transition cursor-pointer disabled:opacity-50"
                        >
                            {isSaving ? "Saving Live Updates..." : "Save Live Updates &rarr;"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
