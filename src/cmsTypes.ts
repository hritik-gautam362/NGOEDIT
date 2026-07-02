export interface MilestoneItem {
    year: string;
    title: string;
    description: string;
    dateDetail?: string;
    color?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    initials: string;
    description?: string;
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

export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    image: string; // Base64 data URI
}

export interface NewsItem {
    id: string;
    title: string;
    summary: string;
    content: string; // Rich Text HTML (CKEditor)
    date: string;
    image?: string; // Base64 image
}

export interface AnnouncementItem {
    id: string;
    title: string;
    content: string; // Rich Text HTML (CKEditor)
    date: string;
    type?: "info" | "warning" | "success";
}

export interface DocumentItem {
    id: string;
    name: string;
    size: string;
    type: string; // e.g. "application/pdf"
    data: string; // Base64 content
    date: string;
}

export interface PartnerItem {
    id: string;
    title: string;
    theme: string;
    accentText: string;
    headingText: string;
    textColor: string;
    borderColor: string;
    glowColor: string;
    bgBadge: string;
    badgeText: string;
    items: string[];
}

export interface SiteContent {
    hero: {
        title: string;
        subtitle: string;
        stats: {
            volunteerCount: number;
            internCount: number;
            enrollmentCount: number;
            totalRaised: number;
            donationCount: number;
        };
    };
    aboutUs: {
        title: string;
        subtitle: string;
        content: string; // Rich text
        pledge: string;
        founder: {
            name: string;
            years: string;
            description: string; // Rich text
            quote: string;
        };
        milestones: MilestoneItem[];
        teamMembers: TeamMember[];
        executives: TeamMember[];
    };
    missionVision: {
        missionTitle: string;
        missionDesc: string; // Rich text
        visionTitle: string;
        visionDesc: string; // Rich text
    };
    programs: ProgramItem[];
    events: {
        agmTitle: string;
        agmContent: string; // Rich text
        ashokSaikiaTitle: string;
        ashokSaikiaContent: string; // Rich text
    };
    partners: PartnerItem[];
    gallery: GalleryItem[];
    news: NewsItem[];
    announcements: AnnouncementItem[];
    contactInfo: {
        address: string;
        phoneNumbers: string[];
        emails: string[];
        facebookUrl: string;
        linkedinUrl: string;
    };
    donationDetails: {
        qrCodeImage: string; // Base64 string
        bankDetails: string; // Rich text
        description: string; // Rich text
    };
    footer: {
        tagline: string;
        copyright: string;
        description: string;
    };
    documents: DocumentItem[];
}
