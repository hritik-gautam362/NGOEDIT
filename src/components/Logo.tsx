import React from "react";
import logoImg from "../assets/images/logo.png";
interface LogoProps {
    className?: string;
    logoClassName?: string;
    iconOnly?: boolean;
    dark?: boolean;
}
export default function Logo({ className = "", logoClassName = "w-11 h-11", iconOnly = false, dark = false }: LogoProps) {
    const paths = [logoImg, "/assets/images/logo.png", "/logo.png", "/src/logo.png", "/src/components/logo.png", "/assets/logo.png"];
    const [pathIndex, setPathIndex] = React.useState(0);
    const [useSvg, setUseSvg] = React.useState(false);
    const handleImgError = () => {
        if (pathIndex < paths.length - 1) {
            setPathIndex(prev => prev + 1);
        }
        else {
            setUseSvg(true);
        }
    };
    if (!useSvg) {
        return (<div className={`flex items-center space-x-2.5 select-none ${className}`}>
        <img src={paths[pathIndex]} alt="PROCHESTA Logo" className={`${logoClassName} select-none object-contain`} onError={handleImgError}/>
        {!iconOnly && (<div className="flex flex-col text-left">
            <span className={`text-[14px] md:text-[15px] font-black tracking-[0.06em] leading-tight font-sans ${dark ? "text-white" : "text-gray-900"}`}>
              PROCHESTA Multipurpose
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-[#D63384] uppercase font-sans">
              Co-operative Society Asom
            </span>
          </div>)}
      </div>);
    }
    return (<div className={`flex items-center space-x-2.5 select-none ${className}`}>
      
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${logoClassName} select-none filter drop-shadow-[0_2px_8px_rgba(255,0,0,0.15)]`} id="ngo-svg-logo">
        <defs>
          
          
          <path id="text-path-top" d="M 52,200 A 148,148 0 0,1 348,200" fill="none"/>
          
          
          <path id="text-path-bottom" d="M 348,200 A 148,148 0 0,1 52,200" fill="none"/>
        </defs>

        
        <circle cx="200" cy="200" r="185" fill="#E61E25" stroke="#BF0D13" strokeWidth="1.5"/>
        
        
        <circle cx="200" cy="200" r="132" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="1"/>

        

        
        <path d="M 145,100 C 130,120 115,140 115,160 C 115,185 135,215 145,215 C 155,215 175,185 175,160 C 175,140 160,120 145,100 Z" fill="#3EAF47" stroke="#1E6E24" strokeWidth="1.5"/>
        <path d="M 145,100 L 145,215" stroke="#1E6E24" strokeWidth="1"/>

        
        
        <path d="M 155,162 Q 220,78 280,206" fill="none" stroke="#ED1C24" strokeWidth="3.5"/>
        <path d="M 157,165 Q 220,84 278,207" fill="none" stroke="#F7941D" strokeWidth="3.5"/>
        <path d="M 159,168 Q 220,90 276,208" fill="none" stroke="#FFF200" strokeWidth="3.5"/>
        <path d="M 161,171 Q 220,96 274,209" fill="none" stroke="#00A651" strokeWidth="3.5"/>
        <path d="M 163,174 Q 220,102 272,210" fill="none" stroke="#00ADEF" strokeWidth="3.5"/>
        <path d="M 165,177 Q 220,108 270,211" fill="none" stroke="#1B75BC" strokeWidth="3.5"/>
        <path d="M 167,180 Q 220,114 268,212" fill="none" stroke="#662D91" strokeWidth="3.5"/>

        
        
        <path d="M 125,235 C 92,202 65,210 60,235 C 55,260 88,270 125,265 Z" fill="#10D756" stroke="#0C7D32" strokeWidth="1.5"/>
        <path d="M 60,235 C 82,235 104,245 125,265" fill="none" stroke="#0C7D32" strokeWidth="1"/>

        
        <path d="M 145,235 C 178,202 205,210 210,235 C 215,260 182,270 145,265 Z" fill="#10D756" stroke="#0C7D32" strokeWidth="1.5"/>
        <path d="M 210,235 C 188,235 166,245 145,265" fill="none" stroke="#0C7D32" strokeWidth="1"/>

        
        
        <circle cx="138" cy="148" r="13" fill="#FFFFFF" stroke="#000000" strokeWidth="2"/>
        
        <circle cx="138" cy="148" r="2.5" fill="#E61E25"/>
        
        
        <path d="M 120,172 L 154,168 L 140,205 L 122,205 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5"/>
        
        <path d="M 120,172 L 130,171 L 138,205 L 122,205 Z" fill="#E61E25"/>
        
        
        <path d="M 122,205 L 140,205 L 148,260 L 114,260 Z" fill="#FFFFFF" stroke="#000000" strokeWidth="1.7"/>
        
        <path d="M 114,254 L 148,254 L 148,260 L 114,260 Z" fill="#E61E25"/>
        
        <line x1="122" y1="205" x2="116" y2="254" stroke="#F97316" strokeWidth="1"/>
        <line x1="129" y1="205" x2="125" y2="254" stroke="#F97316" strokeWidth="1"/>
        <line x1="135" y1="205" x2="134" y2="254" stroke="#F97316" strokeWidth="1"/>

        
        <path d="M 118,174 C 110,183 110,196 122,197" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M 152,170 C 166,178 166,188 154,193" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round"/>
        
        <line x1="122" y1="197" x2="154" y2="193" stroke="#F97316" strokeWidth="1.5" strokeDasharray="2 1"/>

        
        
        <ellipse cx="268" cy="201" rx="34" ry="11" fill="#C0C0C0" stroke="#777777" strokeWidth="1"/>
        <ellipse cx="253" cy="198" rx="7" ry="3" fill="#E6E6E6"/>
        <ellipse cx="268" cy="197" rx="9" ry="4" fill="#FFFFFF"/>
        <ellipse cx="282" cy="199" rx="7" ry="3" fill="#E6E6E6"/>
        <ellipse cx="242" cy="202" rx="6" ry="2.5" fill="#D3D3D3"/>
        <ellipse cx="262" cy="202" rx="8" ry="3.5" fill="#D3D3D3"/>
        <ellipse cx="280" cy="201" rx="8" ry="3.5" fill="#D3D3D3"/>

        
        <path d="M 235,202 
             C 232,215 224,235 224,248 
             C 224,272 242,282 268,282 
             C 294,282 312,272 312,248 
             C 312,235 304,215 301,202 
             Z" fill="#000000" stroke="#222222" strokeWidth="1"/>
        
        <ellipse cx="268" cy="202" rx="32" ry="6" fill="#151515" stroke="#444444" strokeWidth="1.5"/>

        
        <path d="M 242,280 L 238,287 L 246,287 Z" fill="#000000"/>
        <path d="M 294,280 L 298,287 L 290,287 Z" fill="#000000"/>
        <path d="M 268,282 L 268,288 L 264,288 Z" fill="#000000"/>

        
        <text x="268" y="254" fill="#F5BC3E" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="26" textAnchor="middle">
          ₹
        </text>

        
        <text x="200" y="308" fill="#000000" fontFamily="Impact, system-ui, sans-serif" fontWeight="900" fontSize="24" letterSpacing="0.8" textAnchor="middle">
          PROCHESTA
        </text>

        
        
        
        <text fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.3">
          <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">
            প্ৰচেষ্টা মাল্টিপাৰপাজ কো-অপাৰেটিভ চোচাইটি অসম লিমিটেড
          </textPath>
        </text>

        
        <text fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.8">
          <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">
            স্থাপিত-১৯৯৮, গুৱাহাটী, অসম
          </textPath>
        </text>

        
        
        <polygon points="56,238 59,244 65,245 61,250 62,256 56,253 50,256 51,250 47,245 53,244" fill="#FFFFFF"/>
        
        <polygon points="344,238 347,244 353,245 349,250 350,256 344,253 338,256 339,250 335,245 341,244" fill="#FFFFFF"/>
      </svg>

      {!iconOnly && (<div className="flex flex-col text-left">
            <span className={`text-[14px] md:text-[15px] font-black tracking-[0.06em] leading-tight font-sans ${dark ? "text-white" : "text-gray-900"}`}>
              PROCHESTA
            </span>
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-[#D63384] uppercase font-sans">
            Co-operative Asom
          </span>
        </div>)}
    </div>);
}
