import { ProgramItem, TimelineItem } from "./types";
import weavingImg from "./assets/images/weaving.png";
import committeeImg from "./assets/images/committee.png";
import speechImg from "./assets/images/speech.png";
import agmImg from "./assets/images/agm.png";
import ecologyImg from "./assets/images/ecology.png";
import shgImg from "./assets/images/shg.png";
import newspaperImg from "./assets/images/newspaper.png";
export const PROGRAMS_DATA: ProgramItem[] = [
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
];
export const TIMELINE_DATA: TimelineItem[] = [
    {
        year: "2012",
        title: "The Seed is Sown in Guwahati",
        subtitle: "Silpukhuri Assembly Room",
        description: "Founded by a dozen visionary social leaders. We began in Guwahati with humble computer literacy classes and immediate community needlework sessions designed to build financial confidence.",
        imageAlt: "Embroidery workshop"
    },
    {
        year: "2015",
        title: "Official State Co-operative Registry",
        subtitle: "Acceptance by Assam Co-operative Registry",
        description: "Registered officially under licensing body of Assam. This enabled us to form formal Self-Help Group (SHG) associations, opening critical bank conduits and building local credit reserves.",
        imageAlt: "State registry day"
    },
    {
        year: "2019",
        title: "The Handloom Computerization Project",
        subtitle: "Silpukhuri Tech Loom Hub",
        description: "Injected digital jacquard equipment to local weavers. We replaced expensive pattern outsourcing with customized in-house training models, reducing dye and thread errors.",
        imageAlt: "Digital loom launch"
    },
    {
        year: "2023",
        title: "Statewide Mobile Training Classrooms",
        subtitle: "Empowerment vans traversing Kamrup & Nalbari",
        description: "Secured vehicles carrying specialized solar laptops and fiber internet hotspots directly into tea-tribe areas, empowering isolated communities.",
        imageAlt: "Mobile classrooms"
    },
    {
        year: "2026 & Beyond",
        title: "Autonomous Local Circles",
        subtitle: "Pillars of rural Assam digital market economy",
        description: "Targeting complete online integration where self-governed women run local textile operations exported globally, with all assets hosted under community co-operative custody.",
        imageAlt: "Global exports vision"
    }
];
export const GALLERY_DATA = [
    {
        id: "gal-1",
        title: "Traditional Assam Spinning & Handloom Weaving",
        subtitle: "Guwahati Skill Center",
        category: "Handloom Skill",
        ratio: "aspect-[3/4]",
        image: weavingImg,
        gradient: "from-[#D63384] via-[#7C3AED] to-orange-400"
    },
    {
        id: "gal-2",
        title: "Co-operative Committee Meeting",
        subtitle: "Silpukhuri Headquarters",
        category: "Governance",
        ratio: "aspect-[4/3]",
        image: committeeImg,
        gradient: "from-[#7C3AED] via-rose-500 to-amber-400"
    },
    {
        id: "gal-3",
        title: "Executive Advisory Address",
        subtitle: "Silpukhuri Namghar Sabha",
        category: "Advisory",
        ratio: "aspect-[3/4]",
        image: speechImg,
        gradient: "from-[#F97316] to-[#D63384]"
    },
    {
        id: "gal-4",
        title: "Annual General Meeting (AGM) 2024-25",
        subtitle: "Bipul Kumar Sharma Memorial Hall",
        category: "Co-operative",
        ratio: "aspect-[4/3]",
        image: agmImg,
        gradient: "from-[#FBBF24] via-rose-500 to-[#7C3AED]"
    },
    {
        id: "gal-5",
        title: "Community Ecology & Plant Sapling Drive",
        subtitle: "Bamunimaidam School Program",
        category: "Social Welfare",
        ratio: "aspect-[4/3]",
        image: ecologyImg,
        gradient: "from-[#7C3AED] via-[#D63384] to-pink-500"
    },
    {
        id: "gal-6",
        title: "Self-Help Group (SHG) Financial Literacy",
        subtitle: "Kamrup Cluster Training Center",
        category: "Financial Inclusion",
        ratio: "aspect-[4/3]",
        image: shgImg,
        gradient: "from-[#D63384] to-purple-600"
    },
    {
        id: "gal-7",
        title: "Annual Co-operative Success Coverage",
        subtitle: "Asamiya Pratidin News",
        category: "Media Coverage",
        ratio: "aspect-[4/3]",
        image: newspaperImg,
        gradient: "from-[#D63384] via-[#7C3AED] to-amber-400"
    }
];
export const MAP_DISTRICTS = [
    {
        id: "dist-guwahati",
        name: "Guwahati (HQ)",
        operational: "Co-operative Head Office & Digital Incubation Campus",
        volunteers: "180+ Active Volunteers",
        shgs: "1,540 SHG Members",
        metric: "Guwahati-Silpukhuri",
        coords: { x: 45, y: 72 }
    },
    {
        id: "dist-kamrup",
        name: "Kamrup Rural",
        operational: "Organic Agro-farming Training and Traditional Silk Dyeing Centers",
        volunteers: "125+ Active Volunteers",
        shgs: "2,100 SHG Members",
        metric: "Hajo / Sualkuchi",
        coords: { x: 38, y: 68 }
    },
    {
        id: "dist-nalbari",
        name: "Nalbari Area",
        operational: "Jacquard Loom Hub & Digital Textile Designing Center",
        volunteers: "95+ Active Volunteers",
        shgs: "1,240 SHG Members",
        metric: "Nalbari Center",
        coords: { x: 30, y: 55 }
    },
    {
        id: "dist-jorhat",
        name: "Jorhat Circle",
        operational: "Eri and Muga silk thread pooling units & Digital Banking Hub",
        volunteers: "140+ Active Volunteers",
        shgs: "1,850 SHG Members",
        metric: "Jorhat Center",
        coords: { x: 74, y: 48 }
    },
    {
        id: "dist-tezpur",
        name: "Tezpur Division",
        operational: "Solar workstation classrooms, green leaf-plate fabrication Labs",
        volunteers: "70+ Active Volunteers",
        shgs: "980 SHG Members",
        metric: "Tezpur Center",
        coords: { x: 55, y: 52 }
    },
    {
        id: "dist-dibrugarh",
        name: "Dibrugarh Region",
        operational: "Tea-tribe female education initiatives & Micro-Finance consulting office",
        volunteers: "62+ Active Volunteers",
        shgs: "650 SHG Members",
        metric: "Dibrugarh Outpost",
        coords: { x: 90, y: 32 }
    }
];
export const SUCCESS_STORIES = [
    {
        quote: "Prochesta provided more than just a loom; they taught me how to budget on a mobile phone, price my silk textiles on digital wholesale, and organize 12 women in my village to guarantee our collective credit line.",
        author: "Riniki Kalita",
        role: "President, Jagriti SHG (Sualkuchi, Kamrup)",
        achievement: "Expanded local weaver pool from 2 looms to an 18-loom village collective, rising average monthly household profit by 280%."
    },
    {
        quote: "During my 6-month digital design internship from Gauhati University, I designed computerized weaving cards that reduced production time by half. Seeing rural weavers apply my code to physical silk was life-changing.",
        author: "Kaushik Borah",
        role: "Former Creative Intern, Gauhati University",
        achievement: "Spearheaded digitizing of 45 indigenous Bodo-Assamese weave patterns into standard geometric instructions."
    },
    {
        quote: "The transparency of Prochesta's cooperative governance is incredibly unique. My financial donations are translated directly into new loom frames, completely tracked and visible on our community ledger.",
        author: "Dr. Himani Kakati",
        role: "Sustaining Donor & Regional Advisor, Guwahati",
        achievement: "Funded five solar-powered loom battery kits to allow night weaving in Kamrup rural circles."
    }
];
