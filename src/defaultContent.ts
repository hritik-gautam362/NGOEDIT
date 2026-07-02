import { SiteContent } from "./cmsTypes";

// Default local images imported for initial state preservation
import weavingImg from "./assets/images/weaving.png";
import committeeImg from "./assets/images/committee.png";
import speechImg from "./assets/images/speech.png";
import agmImg from "./assets/images/agm.png";
import ecologyImg from "./assets/images/ecology.png";
import shgImg from "./assets/images/shg.png";
import newspaperImg from "./assets/images/newspaper.png";

export const DEFAULT_SITE_CONTENT: SiteContent = {
    hero: {
        title: "Empowering Women.\nTransforming Communities.",
        subtitle: "For over two decades, Prochesta Multipurpose Co-Operative Society Asom Ltd. has been working to strengthen communities through women empowerment, financial inclusion, entrepreneurship development, and sustainable livelihood opportunities across Assam.",
        stats: {
            volunteerCount: 22450,
            internCount: 3850,
            enrollmentCount: 35000,
            totalRaised: 84000000,
            donationCount: 1450
        }
    },
    aboutUs: {
        title: "From Literacy To Lasting Change",
        subtitle: "ABOUT PROCHESTA",
        content: `
            <p>The story of Prochesta began with a simple belief — when women are empowered with knowledge, entire communities move forward.</p>
            <p>In the late 1980s, literacy movements across Assam inspired local volunteers and learners, majority of whom were women eager to continue their journey beyond education. What started as a movement for learning soon became a movement for opportunity, self-reliance, and collective growth.</p>
            <p>Through discussions, workshops, and community participation, women came together to form Self Help Groups (SHGs), creating a foundation for financial independence and social progress. These groups quickly spread across rural Assam, bringing people together through shared purpose and determination. It was named Prochesta - endeavour.</p>
            <p>In 1999, Prochesta was formally registered as a society, strengthening its mission to support women and communities through organized development initiatives. Over the years, the organization continued to grow, eventually becoming a registered cooperative in 2012.</p>
            <p>Today, Prochesta continues to work alongside communities to promote financial inclusion, entrepreneurship and skill development, and creating sustainable opportunities for women across Assam.</p>
        `.trim(),
        pledge: "Real change begins when women are given the opportunity to learn, lead, and create a better future.",
        founder: {
            name: "Dr. Debadatta Barkataki",
            years: "1937 — 2021",
            quote: "Great institutions begin with a vision, but they endure because that vision inspires others to carry it forward.",
            description: `
                <p>No organization is built by one individual alone. It grows through the dedication, support, and shared efforts of many people who believe in a common purpose. Prochesta is no exception. From its earliest days, the organization was strengthened by a network of committed individuals who contributed their time, knowledge, and encouragement. Their support remains an important part of Prochesta's journey, and the organization continues to honor their contributions with gratitude.</p>
                <p>At the heart of this journey was Dr. Debadatta Barkataki, the visionary who first conceptualized the idea of Prochesta. While serving as a Chemistry teacher at B. Borooah College, he was actively involved with various social organizations and played a significant role in literacy movements both within Assam and across India.</p>
                <p>Recognizing the need for sustainable community development and women-led collective action, he worked alongside like-minded individuals to shape the foundation of what would eventually become Prochesta. Through determination, leadership, and a commitment to social progress, he helped establish an organization that continues to create positive change today.</p>
                <p>Dr. Debadatta Barkataki served as the Founder Executive Director of Prochesta and later continued to guide the organization as an advisor. His contributions, leadership, and vision remain an enduring part of Prochesta's identity.</p>
            `.trim()
        },
        milestones: [
            {
                year: "1987",
                title: "1987",
                description: "The literacy movement sparks community awareness and participation.",
                dateDetail: "Late 1980s Movement"
            },
            {
                year: "1998",
                title: "1998",
                description: "Women-led groups begin forming through community workshops and collective action.",
                dateDetail: "SHG Formations"
            },
            {
                year: "1999",
                title: "1999",
                description: "Prochesta is officially registered as a society.",
                dateDetail: "Society Registration"
            },
            {
                year: "2012",
                title: "2012",
                description: "Registered as a cooperative organization under Assam Co-operative legislation.",
                dateDetail: "Co-operative Legacy"
            },
            {
                year: "Today",
                title: "Today",
                description: "Supporting women through empowerment, developing entrepreneurship and financial inclusion, and community development.",
                dateDetail: "Sustainable Future"
            }
        ],
        teamMembers: [
            { id: "tm-1", name: "Ms Madhobi Medhi", role: "Chairperson", initials: "M.M" },
            { id: "tm-2", name: "Dr. Anjana Borkakati", role: "Executive Director", initials: "A.B" },
            { id: "tm-3", name: "Mr. Subhan Bora", role: "Managing Director (Ex Officio Member)", initials: "S.B" },
            { id: "tm-4", name: "Mr. Ranjit Sarma", role: "Director Administration", initials: "R.S" },
            { id: "tm-5", name: "Mr. Tapan Kr. Sarma", role: "Director (Member)", initials: "T.S" },
            { id: "tm-6", name: "Mr. Jamini Ranjan Das", role: "Director (Member)", initials: "J.D" },
            { id: "tm-7", name: "Mrs. Sushnata Goswami", role: "Director (Member)", initials: "S.G" },
            { id: "tm-8", name: "Mr. Dwipendra Kr. Sharma", role: "Director (Member)", initials: "D.S" },
            { id: "tm-9", name: "Mr. Munindra Kakati", role: "Director (Member)", initials: "M.K" },
            { id: "tm-10", name: "Mr. Paresh Dev Choudhury", role: "Director (Member)", initials: "P.C" },
            { id: "tm-11", name: "Mr. Balen Choudhury", role: "Director (Member)", initials: "B.C" },
            { id: "tm-12", name: "Mr. Kusum Sarma", role: "Director (Member)", initials: "K.S" },
            { id: "tm-13", name: "Ms Kalpana Goswami", role: "Director (Member)", initials: "K.G" },
            { id: "tm-14", name: "Mrs. Labanya Das", role: "Director (Member)", initials: "L.D" }
        ],
        executives: [
            { id: "exec-1", name: "Ms Madhobi Medhi", role: "Chairperson", initials: "M.M" },
            { id: "exec-2", name: "Dr. Anjana Borkakati", role: "Executive Director", initials: "A.B" },
            { id: "exec-3", name: "Mr. Subhan Bora", role: "Managing Director (Ex Officio Member)", initials: "S.B" },
            { id: "exec-4", name: "Mr. Ranjit Sarma", role: "Director Administration", initials: "R.S" },
            { id: "exec-5", name: "Advocate Kusum Sarma", role: "Legal Advisor (Gauhati High Court)", initials: "K.S" }
        ]
    },
    missionVision: {
        missionTitle: "Our Mission",
        missionDesc: "<p>To strengthen communities through sustainable financial services, capacity building, entrepreneurship support, and women-led development initiatives that create lasting social and economic impact.</p>",
        visionTitle: "Our Vision",
        visionDesc: "<p>To create a future where every woman has the confidence, resources, and opportunities to improve her life, support her family, and contribute meaningfully to her community.</p>"
    },
    programs: [
        {
            id: "prog-women",
            title: "Women Empowerment",
            target: "10,000+ Sisters Active",
            description: "Supporting women through leadership development, financial literacy, self-help groups, and income-generating opportunities.",
            longDesc: "Through structured group organization and sovereign peer networks, we foster local support systems. Women are trained in public leadership, direct decision making, smart group budgeting, and collective social action to enhance household welfare across Assam.",
            color: "from-[#D63384]/15 to-[#7C3AED]/20 hover:border-[#D63384]",
            iconName: "Flame"
        },
        {
            id: "prog-finance",
            title: "Financial Inclusion",
            target: "Interest-Free Loans",
            description: "Providing accessible financial services that help individuals and communities achieve economic stability and growth.",
            longDesc: "We eliminate high-interest exploitation. By operating peer-audited group savings and credit conduits, we disburse microcapital with cooperative interest rates or zero-interest emergency pooling reserves to sustain local family enterprises.",
            color: "from-[#7C3AED]/15 to-[#F97316]/20 hover:border-[#7C3AED]",
            iconName: "TrendingUp"
        },
        {
            id: "prog-entrepreneur",
            title: "Entrepreneurship Development",
            target: "1,200+ Local Startups",
            description: "Encouraging local entrepreneurship through training, mentoring, and business development support.",
            longDesc: "From organizing native food processing units to bio-degradable plate manufacturing, we accelerate small rural enterprises. Our workshops help women draft viable project ideas, command premium local pricing, and leverage cooperative bulk supplies.",
            color: "from-[#F97316]/15 to-[#FBBF24]/20 hover:border-[#F97316]",
            iconName: "Cpu"
        },
        {
            id: "prog-skills",
            title: "Skill Development",
            target: "35,000+ Weavers Skilled",
            description: "Conducting workshops and training programmes that improve employability and self-reliance.",
            longDesc: "We provide computerized Jacquard punch design cards, modernize manual loom setups, and run vocational handloom courses. Weavers can multiply their yields and master digital merchant applications for self-sustained trade logistics.",
            color: "from-[#FBBF24]/15 to-[#D63384]/20 hover:border-[#FBBF24]",
            iconName: "Feather"
        },
        {
            id: "prog-welfare",
            title: "Community Welfare",
            target: "Health & Care Camps",
            description: "Implementing initiatives focused on education, awareness, health, sanitation, and overall community well-being.",
            longDesc: "We conduct periodic medical campaigns in remote tea plantations, distribute bio-degradable sanitary hygiene kits, and run clean drinking water drives. We cultivate nutritional knowledge to protect working mothers and infants from iron deficiencies.",
            color: "from-[#D63384]/10 to-[#F97316]/15 hover:border-[#7C3AED]",
            iconName: "Sparkles"
        },
        {
            id: "prog-rural",
            title: "Rural Development",
            target: "15+ Solar Workstations",
            description: "Promoting sustainable development practices that improve living conditions in rural communities.",
            longDesc: "We establish digital solar-powered desks, book banks, and cooperative agricultural pooling setups. Our mobile teams support sustainable farming integration, rural community libraries, and youth leadership training to enrich village lives.",
            color: "from-emerald-500/10 to-teal-500/15 hover:border-emerald-500/40",
            iconName: "Compass"
        }
    ],
    events: {
        agmTitle: "Annual General Meeting",
        agmContent: `
            <p>Prochesta organises its Annual General Meeting each year during the month of September. This is the forum where all members meet annually and share their feelings. This is the forum where clients can meet all Board of Directors directly along with observer from Co-operative Department, stake holders and media persons.</p>
            <p>Proceedings of previous year's meeting along with audited balance sheet is approved in the meeting. Activities of previous year is discussed and projection for next year is passed in the meeting. Ashok Saikia Award for the best entrepreneur is awarded in this meeting.</p>
        `.trim(),
        ashokSaikiaTitle: "Ashok Saikia Award",
        ashokSaikiaContent: `
            <p>Since 2013 Prochesta has started awarding the best women entrepreneur of the year in the name of Late Ashok Saikia. Ashok Saikia was 1971 batch IAS officer of the Assam-Meghalaya cadre.</p>
            <p>Ashok Saikia was a key pointsman in the Prime Minister's Office when Atal Bihari Vajpayee was in charge. He was additional secretary in the PMO, in charge of education, agriculture, and the tricky but all-important task of handling bureaucratic appointments and transfers.</p>
            <p>Late Ashok Saikia was the initiator and helped Prochesta to grow as a self successful organization. To keep his memory alive we started this Ashok Saikia Award.</p>
        `.trim()
    },
    partners: [
        {
            id: "funders",
            title: "Funders",
            theme: "from-indigo-600 via-indigo-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-blue-300",
            textColor: "text-gray-100",
            borderColor: "border-indigo-400/20",
            glowColor: "rgba(99, 102, 241, 0.15)",
            bgBadge: "bg-indigo-950/50 border border-indigo-500/20",
            badgeText: "text-indigo-300",
            items: [
                "Rashtriya Mahila Kosh, New Delhi",
                "National Housing Bank, New Delhi",
                "Assam Cooperative Apex Bank Ltd.",
                "Assam Financial Corporation",
                "Assam Gramin Vikash Bank",
                "NEDFi",
                "National Cooperative Development Corporation (NCDC)",
                "Rashtriya Gramin Vikash Nidhi"
            ]
        },
        {
            id: "financial",
            title: "Financial Support",
            theme: "from-purple-600 via-purple-900 to-indigo-950",
            accentText: "text-amber-400",
            headingText: "text-cyan-300",
            textColor: "text-gray-100",
            borderColor: "border-purple-400/20",
            glowColor: "rgba(168, 85, 247, 0.15)",
            bgBadge: "bg-purple-950/50 border border-purple-500/20",
            badgeText: "text-purple-300",
            items: [
                "Rashtriya Mahila Kosh, New Delhi",
                "NABARD, Guwahati",
                "SIDBI, Guwahati",
                "Employment Generation Mission"
            ]
        },
        {
            id: "academic",
            title: "Academic Support",
            theme: "from-violet-600 via-violet-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-indigo-300",
            textColor: "text-gray-100",
            borderColor: "border-violet-400/20",
            glowColor: "rgba(139, 92, 246, 0.15)",
            bgBadge: "bg-violet-950/50 border border-violet-500/20",
            badgeText: "text-violet-300",
            items: [
                "Sa-Dhan, New Delhi (SRO, RBI)",
                "Rashtriya Mahila Kosh, New Delhi",
                "FWWB",
                "NIPCCD",
                "Department Of Handloom And Textile, Government Of Assam",
                "NEDFi"
            ]
        },
        {
            id: "legal",
            title: "Legal Support",
            theme: "from-blue-600 via-blue-900 to-slate-950",
            accentText: "text-amber-400",
            headingText: "text-sky-300",
            textColor: "text-gray-100",
            borderColor: "border-blue-400/20",
            glowColor: "rgba(59, 130, 246, 0.15)",
            bgBadge: "bg-blue-950/50 border border-blue-500/20",
            badgeText: "text-blue-300",
            items: [
                "Sa-Dhan, New Delhi",
                "Registrar of Co-operative Societies, Guwahati",
                "Ranjan Baishya & Co.",
                "Advocate Kusum Sarma, Gauhati High Court"
            ]
        }
    ],
    gallery: [
        {
            id: "gal-1",
            title: "Traditional Assam Spinning & Handloom Weaving",
            category: "Handloom Skill",
            image: weavingImg
        },
        {
            id: "gal-2",
            title: "Co-operative Committee Meeting",
            category: "Governance",
            image: committeeImg
        },
        {
            id: "gal-3",
            title: "Executive Advisory Address",
            category: "Advisory",
            image: speechImg
        },
        {
            id: "gal-4",
            title: "Annual General Meeting (AGM) 2024-25",
            category: "Co-operative",
            image: agmImg
        },
        {
            id: "gal-5",
            title: "Community Ecology & Plant Sapling Drive",
            category: "Social Welfare",
            image: ecologyImg
        },
        {
            id: "gal-6",
            title: "Self-Help Group (SHG) Financial Literacy",
            category: "Financial Inclusion",
            image: shgImg
        },
        {
            id: "gal-7",
            title: "Annual Co-operative Success Coverage",
            category: "Media Coverage",
            image: newspaperImg
        }
    ],
    news: [],
    announcements: [],
    contactInfo: {
        address: "2A, Sonadhar Senapati Path\nSilpukhuri\nGuwahati – 781003\nAssam, India",
        phoneNumbers: ["03612963506"],
        emails: ["prochesta@hotmail.com", "prochesta.mfi@gmail.com"],
        facebookUrl: "https://www.facebook.com/prochesta.mfi",
        linkedinUrl: "https://www.linkedin.com/in/prochesta-multipurpose-co-operative-society-asom-ltd-guwahati/"
    },
    donationDetails: {
        qrCodeImage: "", // Initially no QR code image
        bankDetails: `
            <p><strong>Bank Account Details:</strong></p>
            <p>Account Name: PROCHESTA Multipurpose Co-operative Society Asom Ltd.<br>
            Bank Name: State Bank of India<br>
            Branch Name: Silpukhuri Branch<br>
            Account Number: 12345678901<br>
            IFSC Code: SBIN0001234</p>
        `.trim(),
        description: "<p>Your donations directly support Assamese women weavers. We support bank transfers and UPI payments.</p>"
    },
    footer: {
        tagline: "Empowering Women. Strengthening Communities. Creating Opportunities.",
        copyright: "© 2026 Prochesta Multipurpose Co-Operative Society Asom Ltd. All Rights Reserved.",
        description: "Prochesta Multipurpose Co-Operative Society Asom Ltd. is a federated socio-development co-op targeting female agency, craft digitization, and healthcare access across rural Assam districts."
    },
    documents: []
};
