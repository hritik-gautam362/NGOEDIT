export interface VolunteerApplication {
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
export interface InternshipApplication {
    id: string;
    type: "internship" | "job" | "enrollment";
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
export interface DonationRecord {
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
export interface ContactInquiry {
    id: string;
    fullName: string;
    email: string;
    message: string;
    date: string;
    status: "Pending" | "Reviewed";
    notes?: string;
}
export interface ProgramItem {
    id: string;
    title: string;
    target: string;
    description: string;
    longDesc: string;
    color: string;
    iconName: string;
}
export interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    imageAlt: string;
}
