import React from "react";
import { Calendar, Award, Users, CheckCircle2, Star, Flame } from "lucide-react";
import { motion } from "motion/react";
interface ProgramsStaggerProps {
    events?: {
        agmTitle: string;
        agmContent: string;
        ashokSaikiaTitle: string;
        ashokSaikiaContent: string;
    };
}
export default function ProgramsStagger({ events }: ProgramsStaggerProps) {
    return (<section id="verticals" className="py-24 bg-gradient-to-b from-[#FFF9FB] via-white to-[#FFF9FB] border-t border-[#D63384]/5 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full filter blur-[120px] pointer-events-none -translate-x-32"/>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#D63384]/5 to-transparent rounded-full filter blur-[150px] pointer-events-none translate-x-32"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        
        <div className="max-w-3xl text-left space-y-4 mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center space-x-2 bg-[#D63384]/10 px-4 py-1.5 rounded-full border border-[#D63384]/15 mb-2 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#D63384]"/>
            <span className="text-[10px] font-extrabold tracking-widest text-[#D63384] uppercase font-sans">
              INSTITUTIONAL CALENDAR & EVENTS
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black font-sans tracking-tight text-gray-950 leading-[1.1]">
            Events & Honors
          </h2>
          <p className="text-sm text-gray-500 font-sans max-w-xl">
            Tracing Procheesta's cooperative highlight forums, democratic general assemblies, and our highly cherished social recognition platforms.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative rounded-[36px] bg-gradient-to-br from-[#FFFDEB] via-white to-[#FFFBE0] p-8 sm:p-10 border border-amber-200 shadow-[0_20px_50px_rgba(251,191,36,0.06)] flex flex-col justify-between text-left group overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none select-none"/>
            
            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-amber-800 bg-amber-500/15 border border-amber-500/20 px-3.5 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-amber-700"/>
                  <span className="text-[9.5px] font-black font-mono uppercase tracking-widest">DEMOCRATIC FORUM</span>
                </div>
                <span className="text-[10px] font-bold font-mono text-amber-700 bg-white border border-amber-200 px-3 py-1 rounded-lg">
                  ANNUAL EVENT
                </span>
              </div>

              
              
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-gray-950 tracking-tight leading-tight">
                {events?.agmTitle || "Annual General Meeting"}
              </h3>

              
              <div 
                className="space-y-4 text-gray-700 text-sm sm:text-[15px] font-sans leading-relaxed prose prose-sm max-w-none font-light"
                dangerouslySetInnerHTML={{ __html: events?.agmContent || `
                  <p>
                    Prochesta organises its Annual General Meeting each year during the month of September. This is the forum where all members meet annually and share their feelings. This is the forum where clients can meet all Board of Directors directly along with observer from Co-operative Department, stake holders and media persons.
                  </p>
                  <p>
                    Proceedings of previous year's meeting along with audited balance sheet is approved in the meeting. Activities of previous year is discussed and projection for next year is passed in the meeting. Ashok Saikia Award for the best entrepreneur is awarded in this meeting.
                  </p>
                ` }}
              />

              
              <div className="space-y-2.5 pt-4">
                <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white/60 p-3 rounded-xl border border-amber-200/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0"/>
                  <span className="font-medium">Held annually in the month of September</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white/60 p-3 rounded-xl border border-amber-200/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0"/>
                  <span className="font-medium">Direct interaction with Directors & Co-op Officers</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-600 bg-white/60 p-3 rounded-xl border border-amber-200/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0"/>
                  <span className="font-medium">Financial transparency & audited balance sheets approved</span>
                </div>
              </div>
            </div>

            
            <div className="mt-8 pt-6 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-950 font-mono font-bold select-none">
              <span>ESTD. FORUM</span>
              <div className="flex items-center space-x-1.5 bg-[#FEF08A] px-2.5 py-1 rounded-md text-amber-800 border border-amber-300">
                <Calendar className="w-3.5 h-3.5"/>
                <span>SEPTEMBER CALENDAR</span>
              </div>
            </div>
          </motion.div>

          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }} className="relative rounded-[36px] bg-gradient-to-br from-[#EEF2F6] via-white to-[#F5F3FF] p-8 sm:p-10 border border-indigo-200 shadow-[0_20px_50px_rgba(99,102,241,0.06)] flex flex-col justify-between text-left group overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/5 rounded-full blur-3xl pointer-events-none select-none"/>

            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5 text-indigo-800 bg-indigo-500/15 border border-indigo-500/20 px-3.5 py-1 rounded-full">
                  <Award className="w-3.5 h-3.5 text-indigo-700"/>
                  <span className="text-[9.5px] font-black font-mono uppercase tracking-widest">ENTREPRENEUR LAURELS</span>
                </div>
              </div>

              
              
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-gray-950 tracking-tight leading-tight">
                {events?.ashokSaikiaTitle || "Ashok Saikia Award"}
              </h3>

              
              <div 
                className="space-y-4 text-gray-700 text-sm sm:text-[14.5px] font-sans leading-relaxed prose prose-sm max-w-none font-light"
                dangerouslySetInnerHTML={{ __html: events?.ashokSaikiaContent || `
                  <p class="font-semibold text-indigo-950 border-l-3 border-indigo-500 pl-4 italic">
                    Since 2013 Prochesta has started awarding the best women entrepreneur of the year in the name of Late Ashok Saikia. Ashok Saikia was 1971 batch IAS officer of the Assam-Meghalaya cadre.
                  </p>
                  <p>
                    Ashok Saikia was a key pointsman in the Prime Minister's Office when Atal Bihari Vajpayee was in charge. He was additional secretary in the PMO, in charge of education, agriculture, and the tricky but all-important task of handling bureaucratic appointments and transfers.
                  </p>
                  <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-150 text-indigo-950 font-serif italic text-sm leading-relaxed">
                    "Because of his honest, no-nonsense approach, Saikia was referred to by many colleagues as the prime minister's conscience keeper."
                  </div>
                  <p>
                    Late Ashok Saikia was the initiator and helped Prochesta to grow as a self successful organization. To keep his memory alive we started this Ashok Saikia Award.
                  </p>
                ` }}
              />
            </div>

            
            <div className="mt-8 pt-6 border-t border-indigo-200/60 flex items-center justify-between text-xs text-indigo-950 font-mono font-bold select-none">
              <span>ESTD. 2013</span>
              <div className="flex items-center space-x-1.5 bg-indigo-100 px-2.5 py-1 rounded-md text-indigo-800 border border-indigo-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500"/>
                <span>CONSCIENCE KEEPER</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>);
}
