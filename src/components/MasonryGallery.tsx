import React, { useState } from "react";
import { GALLERY_DATA } from "../data";
import { ZoomIn, Tag, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
interface MasonryGalleryProps {
    gallery?: { id: string; title: string; category: string; image: string }[];
}
export default function MasonryGallery({ gallery }: MasonryGalleryProps) {
    const activeGallery = gallery || GALLERY_DATA;
    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    return (<section id="gallery" className="py-24 bg-[#FFF9FB] border-t border-[#D63384]/5 relative overflow-hidden">
      
      
      <div className="absolute top-1/2 left-0 w-84 h-84 bg-[#7C3AED]/4 rounded-full filter blur-[100px] pointer-events-none"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <div className="space-y-4 text-left max-w-xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#D63384] bg-[#D63384]/10 px-3 py-1 rounded-full uppercase">
              Gallery Section
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-sans text-gray-950 tracking-tight leading-[1.1]">
              Moments of Change
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <p className="text-sm text-gray-500 font-sans text-left">
              Explore snapshots of our journey, community programmes, training sessions, awareness campaigns, and the inspiring individuals who continue to make positive change possible.
            </p>
            <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href="https://www.facebook.com/prochesta.mfi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-pink-600 to-[#D63384] text-white text-[11px] font-bold tracking-wider uppercase font-mono rounded-xl shadow-lg shadow-pink-500/10 cursor-pointer select-none transition-all">
              <Facebook className="w-4 h-4 text-white"/>
              <span>More Pictures</span>
            </motion.a>
          </div>
        </div>

        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {activeGallery.map((img) => (<div key={img.id} onClick={() => setSelectedImage(img)} className="break-inside-avoid relative rounded-2xl overflow-hidden border border-gray-200 bg-white mb-6 p-4 flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              
              <div className="relative w-full overflow-hidden rounded-xl bg-stone-50 mb-3 shadow-xs">
                {img.image && (<img src={img.image} alt={img.title} referrerPolicy="no-referrer" className="w-full h-auto object-contain block select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]"/>)}
                
                
                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-100 text-[#D63384] text-[9px] font-extrabold tracking-wider uppercase shadow-xs">
                    <Tag className="w-2.5 h-2.5"/>
                    <span>{img.category}</span>
                  </span>
                </div>
              </div>

              
              <div className="text-left space-y-1.5 px-0.5 mt-1">
                <h3 className="text-sm font-bold font-sans tracking-tight text-gray-950 leading-snug group-hover:text-[#D63384] transition-colors">
                  {img.title}
                </h3>
              </div>
            </div>))}
        </div>

        
        <AnimatePresence>
          {selectedImage && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-gray-950/80 backdrop-blur-md z-999 flex items-center justify-center p-4">
              <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full p-5 md:p-6 rounded-3xl bg-white border border-gray-200 shadow-2xl relative space-y-5 text-left flex flex-col max-h-[90vh] overflow-y-auto">
                
                <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 text-xs font-mono font-bold text-gray-500 hover:text-gray-900 cursor-pointer bg-gray-100 px-2.5 py-1 rounded-md transition-colors">
                  CLOSE
                </button>

                
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-extrabold text-[#D63384] tracking-widest uppercase bg-pink-50 border border-pink-100 px-2.5 py-0.5 rounded-md font-mono">
                    {selectedImage.category}
                  </span>
                </div>

                
                <div className="w-full overflow-hidden rounded-2xl bg-stone-100 border border-gray-200 shadow-sm flex items-center justify-center relative min-h-[240px] max-h-[55vh]">
                  {selectedImage.image && (<img src={selectedImage.image} alt={selectedImage.title} referrerPolicy="no-referrer" className="max-h-[55vh] max-w-full w-auto h-auto object-contain select-none shadow-xs rounded-xl"/>)}
                </div>

                
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-extrabold font-sans text-gray-950 tracking-tight leading-snug">
                    {selectedImage.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-sans leading-relaxed pt-1 border-t border-gray-100">
                    Official photographic log of the cooperative core programs. This verification record validates our community programs and advisory board actions.
                  </p>
                </div>

                <div className="flex justify-end items-center text-[10px] font-mono pt-1">
                  <button onClick={() => setSelectedImage(null)} className="text-xs text-[#D63384] font-bold hover:underline cursor-pointer bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition-all">
                    Close Window &rarr;
                  </button>
                </div>

              </div>
            </motion.div>)}
        </AnimatePresence>

      </div>
    </section>);
}
