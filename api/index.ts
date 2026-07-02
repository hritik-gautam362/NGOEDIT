import express from "express";
import path from "path";
import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
let aiInstance: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
    if (!aiInstance) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is required");
        }
        aiInstance = new GoogleGenAI({
            apiKey,
            httpOptions: {
                headers: {
                    "User-Agent": "aistudio-build",
                },
            },
        });
    }
    return aiInstance;
}
let memoryDB: DatabaseSchema | null = null;
async function getDBPath(): Promise<string> {
    if (process.env.DB_PATH) {
        return process.env.DB_PATH;
    }
    if (process.env.VERCEL || process.env.ZEIT_ENV) {
        return path.join("/tmp", "db.json");
    }
    return path.join(process.cwd(), "db.json");
}
interface VolunteerApplication {
    id: string;
    type: "volunteer";
    fullName: string;
    email: string;
    phone: string;
    address: string;
    education: string;
    skills: string;
    interests: string;
    availability: string;
    statementOfPurpose: string;
    status: "Pending" | "Approved" | "Rejected";
    notes?: string;
    date: string;
}
interface InternshipApplication {
    id: string;
    type: "internship" | "enrollment";
    fullName: string;
    email: string;
    phone: string;
    college: string;
    course: string;
    semester: string;
    linkedin: string;
    portfolio: string;
    coverLetter: string;
    resumeName: string;
    resumeSize: string;
    resumeData?: string;
    status: "Pending" | "Approved" | "Rejected";
    notes?: string;
    date: string;
}
interface DonationRecord {
    id: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    paymentType: "Online" | "Offline";
    paymentMethod: string;
    transactionId: string;
    date: string;
    message?: string;
}
interface ContactInquiry {
    id: string;
    fullName: string;
    email: string;
    message: string;
    date: string;
    status: "Pending" | "Reviewed";
    notes?: string;
}
interface DatabaseSchema {
    volunteers: VolunteerApplication[];
    internships: InternshipApplication[];
    donations: DonationRecord[];
    inquiries?: ContactInquiry[];
    adminPin?: string;
}
const initialDatabase: DatabaseSchema = {
    volunteers: [],
    internships: [],
    donations: [],
    inquiries: [],
    adminPin: "2026"
};
async function readDB(): Promise<DatabaseSchema> {
    if (memoryDB) {
        return memoryDB;
    }
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
            console.log("[DATABASE] Attempting to read from Vercel KV...");
            const res = await fetch(`${process.env.KV_REST_API_URL}/get/prochesta_db`, {
                headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
            });
            if (res.ok) {
                const payload = await res.json() as {
                    result?: string;
                };
                if (payload && payload.result) {
                    const parsed = JSON.parse(payload.result) as DatabaseSchema;
                    if (!parsed.adminPin)
                        parsed.adminPin = "2026";
                    if (!parsed.inquiries)
                        parsed.inquiries = [];
                    memoryDB = parsed;
                    return parsed;
                }
            }
        }
        catch (kvError) {
            console.warn("[DATABASE] Failed to read from Vercel KV, checking fallback:", kvError);
        }
    }
    if (process.env.JSONBIN_API_KEY && process.env.JSONBIN_BIN_ID) {
        try {
            console.log("[DATABASE] Attempting to read from JSONBin...");
            const res = await fetch(`https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}/latest`, {
                headers: { "X-Master-Key": process.env.JSONBIN_API_KEY }
            });
            if (res.ok) {
                const payload = await res.json() as {
                    record?: DatabaseSchema;
                };
                if (payload && payload.record) {
                    const parsed = payload.record;
                    if (!parsed.adminPin)
                        parsed.adminPin = "2026";
                    if (!parsed.inquiries)
                        parsed.inquiries = [];
                    memoryDB = parsed;
                    return parsed;
                }
            }
        }
        catch (binError) {
            console.warn("[DATABASE] Failed to read from JSONBin, checking fallback:", binError);
        }
    }
    const dbPath = await getDBPath();
    try {
        const data = await fs.readFile(dbPath, "utf-8");
        const parsed = JSON.parse(data) as DatabaseSchema;
        if (!parsed.adminPin) {
            parsed.adminPin = "2026";
        }
        if (!parsed.inquiries) {
            parsed.inquiries = [];
        }
        memoryDB = parsed;
        return parsed;
    }
    catch (error) {
        try {
            await fs.writeFile(dbPath, JSON.stringify(initialDatabase, null, 2), "utf-8");
            memoryDB = { ...initialDatabase };
            return memoryDB;
        }
        catch (writeErr) {
            console.warn("Unable to write db.json, falling back to memory store:", writeErr);
            memoryDB = { ...initialDatabase };
            return memoryDB;
        }
    }
}
async function writeDB(db: DatabaseSchema): Promise<void> {
    memoryDB = db;
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
            const res = await fetch(`${process.env.KV_REST_API_URL}/set/prochesta_db`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(JSON.stringify(db))
            });
            if (res.ok) {
                console.log("[DATABASE] Successfully saved to Vercel KV");
                return;
            }
        }
        catch (kvError) {
            console.warn("[DATABASE] Failed to save to Vercel KV, trying other drivers:", kvError);
        }
    }
    if (process.env.JSONBIN_API_KEY && process.env.JSONBIN_BIN_ID) {
        try {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": process.env.JSONBIN_API_KEY
                },
                body: JSON.stringify(db)
            });
            if (res.ok) {
                console.log("[DATABASE] Successfully saved to JSONBin");
                return;
            }
        }
        catch (binError) {
            console.warn("[DATABASE] Failed to save to JSONBin, checking fallback:", binError);
        }
    }
    const dbPath = await getDBPath();
    try {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
        console.log("[DATABASE] Saved successfully to disk (db.json)");
    }
    catch (error) {
        console.warn("Disk writing disallowed or failed:", error);
    }
}
function hasAdminAuthorization(req: express.Request, db: DatabaseSchema): boolean {
    const pin = req.headers["x-admin-pin"] as string;
    const actualPin = db.adminPin || "2026";
    return pin === actualPin;
}
app.use(express.json({ limit: "15mb" }));
app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
});
app.post("/api/chat", async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Missing 'message' field in body." });
        }
        const contents: any[] = [];
        if (history && Array.isArray(history)) {
            history.forEach((h: any) => {
                contents.push({
                    role: h.role === "assistant" ? "model" : "user",
                    parts: [{ text: h.content || h.text || "" }]
                });
            });
        }
        contents.push({
            role: "user",
            parts: [{ text: message }]
        });
        const sysInstruction = `You are 'Prochesta Mitra', the friendly, supportive, and knowledgeable AI assistant for PROCHESTA Multipurpose Co-operative Society Asom Ltd, based in Guwahati, Assam, India. Founded in 1998, PROCHESTA is a micro-cooperative focusing on rural women empowerment, traditional handloom weaving (Mekhela Chador, local sarees, traditional Assamese wear), sustainable local bamboo and textile crafts, skill development, internships, volunteer opportunities, and community development.

    Provide warm, helpful, positive, and concise answers based on the context. Ask questions or guide them to relevant sections of our page for actions like the Application Console to check status, the Donation Portal to support, the Internship Form, or Volunteer form.
    Do not make up fake contact specs; our headquarters are at G.S. Road, Near Dispur, Guwahati, Assam, India. Email is contact@prochestaasom.org. Use subtle Assamese cultural references (e.g., saying 'Namaskar!' or 'Greetings from Assam!') and format your reply with clear readable Markdown formatting.`;
        if (!process.env.GEMINI_API_KEY) {
            const fallbacks: {
                [key: string]: string;
            } = {
                empowerment: "Namaskar! PROCHESTA is dedicated to empowering rural women in Assam by reviving traditional handlooms and providing modern weaving workshops, skill development centers, and sustainable livelihood support.",
                apply: "Warm greetings! You can apply to be a volunteer or an intern right here on our website! Simply open the Internship Form or the Volunteer signup layout to cooperate with us.",
                donate: "Thank you for your generosity! Your donations directly support Assamese women weavers. We support UPI QR payment and Bank Transfers in our Donation section.",
                hello: "Namaskar & warm greetings from Assam! I am Prochesta Mitra, your virtual cooperative guide. How can I help you explore our programs, traditional handlooms, or community empowerment today?"
            };
            const msgLower = message.toLowerCase();
            let reply = fallbacks.hello;
            if (msgLower.includes("empower") || msgLower.includes("women") || msgLower.includes("work") || msgLower.includes("weave") || msgLower.includes("handloom")) {
                reply = fallbacks.empowerment;
            }
            else if (msgLower.includes("apply") || msgLower.includes("join") || msgLower.includes("volunteer") || msgLower.includes("intern") || msgLower.includes("signup")) {
                reply = fallbacks.apply;
            }
            else if (msgLower.includes("donate") || msgLower.includes("money") || msgLower.includes("fund") || msgLower.includes("support")) {
                reply = fallbacks.donate;
            }
            return res.json({ response: reply + " (Local Guided Mode)" });
        }
        const response = await getAiClient().models.generateContent({
            model: "gemini-3.5-flash",
            contents: contents,
            config: {
                systemInstruction: sysInstruction,
                temperature: 0.7,
            }
        });
        res.json({ response: response.text || "Greetings! I had a little trouble formulating that response right now." });
    }
    catch (err: any) {
        console.error("Gemini route error:", err);
        res.status(550).json({ error: "Sorry, I had trouble processing that with Gemini. " + err.message });
    }
});
app.post("/api/volunteer", async (req, res) => {
    try {
        const { fullName, email, phone, address, education, skills, interests, availability, statementOfPurpose } = req.body;
        if (!fullName || !email || !phone) {
            return res.status(400).json({ error: "Missing required fields: fullName, email, phone." });
        }
        const db = await readDB();
        const newVol: VolunteerApplication = {
            id: `vol-${Date.now()}`,
            type: "volunteer",
            fullName,
            email,
            phone,
            address: address || "",
            education: education || "",
            skills: skills || "",
            interests: interests || "",
            availability: availability || "",
            statementOfPurpose: statementOfPurpose || "",
            status: "Pending",
            date: new Date().toISOString()
        };
        db.volunteers.unshift(newVol);
        await writeDB(db);
        res.status(201).json({ success: true, application: newVol });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/internship", async (req, res) => {
    try {
        const { fullName, email, phone, college, course, semester, linkedin, portfolio, coverLetter, resumeName, resumeSize, resumeData, type } = req.body;
        if (!fullName || !email || !phone || !type) {
            return res.status(400).json({ error: "Missing required fields: fullName, email, phone, type." });
        }
        const db = await readDB();
        const newInt: InternshipApplication = {
            id: `int-${Date.now()}`,
            type: type === "enrollment" ? "enrollment" : "internship",
            fullName,
            email,
            phone,
            college: college || "",
            course: course || "",
            semester: semester || "",
            linkedin: linkedin || "",
            portfolio: portfolio || "",
            coverLetter: coverLetter || "",
            resumeName: resumeName || `Resume_${fullName.trim().replace(/\s+/g, "_")}.pdf`,
            resumeSize: resumeSize || "512 KB",
            resumeData: resumeData || "",
            status: "Pending",
            date: new Date().toISOString()
        };
        db.internships.unshift(newInt);
        await writeDB(db);
        res.status(201).json({ success: true, application: newInt });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/donate", async (req, res) => {
    try {
        const { donorName, donorEmail, amount, paymentType, paymentMethod, transactionId, message } = req.body;
        if (!donorName || !donorEmail || !amount) {
            return res.status(400).json({ error: "Missing required donation fields: donorName, donorEmail, amount." });
        }
        const db = await readDB();
        const newDonation: DonationRecord = {
            id: `don-${Date.now()}`,
            donorName,
            donorEmail,
            amount: Number(amount),
            paymentType: paymentType || "Online",
            paymentMethod: paymentMethod || "UPI",
            transactionId: transactionId || `TXN${Math.floor(1000000000 + Math.random() * 9000000000).toString()}`,
            date: new Date().toISOString(),
            message: message || ""
        };
        db.donations.unshift(newDonation);
        await writeDB(db);
        res.status(201).json({ success: true, donation: newDonation });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
async function sendInquiryEmail(fullName: string, email: string, message: string) {
    const targetEmail = "prochesta.mfi@gmail.com";
    console.log(`[PROCHESTA EMAIL] Triggering email delivery for message from ${fullName} (${email})...`);
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (smtpUser && smtpPass) {
        try {
            const transporter = nodemailer.createTransport({
                host: smtpHost || "smtp.gmail.com",
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });
            const mailOptions = {
                from: `"${fullName}" <${smtpUser}>`,
                replyTo: email,
                to: targetEmail,
                subject: `[PROCHESTA INQUIRY] New Message from ${fullName}`,
                text: `You have received a new inquiry from the PROCHESTA contact form:\n\n` +
                    `Name: ${fullName}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}\n\n` +
                    `This message has also been saved to the Trustee Operations Dashboard Console.`,
                html: `
          <div style="font-family: Arial, sans-serif; padding: 25px; color: #333; line-height: 1.6; border: 1px solid #f0f0f0; border-radius: 12px; max-width: 600px; background-color: #ffffff;">
            <h2 style="color: #D63384; border-bottom: 2px solid #FFF1F6; padding-bottom: 12px; margin-top: 0;">New Inquiry Received</h2>
            <p>A message was submitted via the <strong>PROCHESTA Multipurpose Co-operative Society</strong> contact form.</p>
            <div style="background-color: #fafafa; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <strong>From:</strong> ${fullName} (<a href="mailto:${email}" style="color: #D63384; text-decoration: none;">${email}</a>)<br/>
              <strong>Date:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </div>
            <div style="background-color: #FFF9FB; border-left: 4px solid #D63384; padding: 15px; margin: 15px 0; font-style: italic; border-radius: 4px; white-space: pre-wrap;">
              ${message}
            </div>
            <p style="font-size: 11px; color: #999; margin-top: 25px; border-top: 1px solid #f0f0f0; padding-top: 15px;">
              This inquiry has been saved inside the <strong>Trustee Operations Dashboard Console</strong>. You can view, add internal notes, or mark it as reviewed from there.
            </p>
          </div>
        `
            };
            const info = await transporter.sendMail(mailOptions);
            console.log(`[PROCHESTA EMAIL SUCCESS] Notification sent: ${info.messageId}`);
            return true;
        }
        catch (err) {
            console.error("[PROCHESTA EMAIL ERROR] Failed to send real SMTP notification mail:", err);
            return false;
        }
    }
    else {
        console.log(`[PROCHESTA EMAIL NOTICE] SMTP environment variables are not configured. To send real email notifications, please specify SMTP_USER and SMTP_PASS under settings. Details:`);
        console.log(`=========================================`);
        console.log(`TO: prochesta.mfi@gmail.com`);
        console.log(`FROM: ${fullName} <${email}>`);
        console.log(`MESSAGE:\n${message}`);
        console.log(`=========================================`);
        return true;
    }
}
app.post("/api/contact", async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        if (!fullName || !email || !message) {
            return res.status(400).json({ error: "Missing required fields: fullName, email, message." });
        }
        const db = await readDB();
        const newInquiry: ContactInquiry = {
            id: `inq-${Date.now()}`,
            fullName,
            email,
            message,
            status: "Pending",
            date: new Date().toISOString()
        };
        if (!db.inquiries) {
            db.inquiries = [];
        }
        db.inquiries.unshift(newInquiry);
        await writeDB(db);
        sendInquiryEmail(fullName, email, message).catch(err => {
            console.error("sendInquiryEmail background failure:", err);
        });
        res.status(201).json({ success: true, inquiry: newInquiry });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.get("/api/admin/applications", async (req, res) => {
    try {
        const db = await readDB();
        if (!hasAdminAuthorization(req, db)) {
            return res.status(401).json({ error: "Unauthorized access: Invalid or missing administrator PIN." });
        }
        res.json({
            volunteers: db.volunteers,
            internships: db.internships,
            donations: db.donations,
            inquiries: db.inquiries || []
        });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/admin/applications/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;
        if (!status) {
            return res.status(400).json({ error: "Status field is required." });
        }
        const db = await readDB();
        if (!hasAdminAuthorization(req, db)) {
            return res.status(401).json({ error: "Unauthorized access: Invalid or missing administrator PIN." });
        }
        let updated = false;
        const volIndex = db.volunteers.findIndex(v => v.id === id);
        if (volIndex > -1) {
            db.volunteers[volIndex].status = status;
            if (notes !== undefined) {
                db.volunteers[volIndex].notes = notes;
            }
            updated = true;
        }
        else {
            const intIndex = db.internships.findIndex(i => i.id === id);
            if (intIndex > -1) {
                db.internships[intIndex].status = status;
                if (notes !== undefined) {
                    db.internships[intIndex].notes = notes;
                }
                updated = true;
            }
            else {
                if (db.inquiries) {
                    const inqIndex = db.inquiries.findIndex(i => i.id === id);
                    if (inqIndex > -1) {
                        db.inquiries[inqIndex].status = status;
                        if (notes !== undefined) {
                            db.inquiries[inqIndex].notes = notes;
                        }
                        updated = true;
                    }
                }
            }
        }
        if (!updated) {
            return res.status(404).json({ error: "Application not found with ID: " + id });
        }
        await writeDB(db);
        res.json({ success: true, message: "Status updated successfully." });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/admin/applications/:id/delete", async (req, res) => {
    try {
        const { id } = req.params;
        const db = await readDB();
        if (!hasAdminAuthorization(req, db)) {
            return res.status(401).json({ error: "Unauthorized access: Invalid or missing administrator PIN." });
        }
        const initialVolCount = db.volunteers.length;
        db.volunteers = db.volunteers.filter(v => v.id !== id);
        const initialIntCount = db.internships.length;
        db.internships = db.internships.filter(i => i.id !== id);
        const initialInqCount = db.inquiries ? db.inquiries.length : 0;
        if (db.inquiries) {
            db.inquiries = db.inquiries.filter(i => i.id !== id);
        }
        if (db.volunteers.length === initialVolCount &&
            db.internships.length === initialIntCount &&
            (!db.inquiries || db.inquiries.length === initialInqCount)) {
            return res.status(404).json({ error: "Application not found" });
        }
        await writeDB(db);
        res.json({ success: true, message: "Application removed." });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/admin/verify-pin", async (req, res) => {
    try {
        const { pin } = req.body;
        const db = await readDB();
        const actualPin = db.adminPin || "2026";
        if (pin === actualPin) {
            res.json({ success: true });
        }
        else {
            res.status(401).json({ error: "Incorrect administrator access code (PIN)." });
        }
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.post("/api/admin/change-pin", async (req, res) => {
    try {
        const { currentPin, newPin } = req.body;
        const db = await readDB();
        const actualPin = db.adminPin || "2026";
        if (currentPin !== actualPin) {
            return res.status(401).json({ error: "Your current authentication code is incorrect." });
        }
        if (!newPin || newPin.trim().length === 0) {
            return res.status(400).json({ error: "The new PIN cannot be empty." });
        }
        db.adminPin = newPin.trim();
        await writeDB(db);
        res.json({ success: true, message: "NGO Administrative core PIN modified successfully." });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.get("/api/public/stats", async (req, res) => {
    try {
        const db = await readDB();
        const volunteerCount = 22450 + db.volunteers.length;
        const internCount = 3850 + db.internships.filter(i => i.type === "internship").length;
        const enrollmentCount = 35000 + db.internships.filter(i => i.type === "enrollment").length;
        const totalRaised = 84000000 + db.donations.reduce((sum, d) => sum + d.amount, 0);
        const donationCount = 1450 + db.donations.length;
        res.json({
            volunteerCount,
            internCount,
            enrollmentCount,
            totalRaised,
            donationCount
        });
    }
    catch (err: any) {
        res.status(500).json({ error: "Internal server error: " + err.message });
    }
});
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("[SERVER ERROR]", err);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message || "An unexpected error occurred on the server."
    });
});
async function startServer() {
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
        const { createServer: createViteServer } = await import("vite");
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: "spa",
        });
        app.use(vite.middlewares);
    }
    else if (!process.env.VERCEL) {
        const distPath = path.join(process.cwd(), "dist");
        app.use(express.static(distPath));
        app.get("*", (req, res) => {
            res.sendFile(path.join(distPath, "index.html"));
        });
    }
    if (!process.env.VERCEL) {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`[PROCHESSTA SERVER] running beautifully on http://localhost:${PORT}`);
        });
    }
}
startServer();
export default app;
