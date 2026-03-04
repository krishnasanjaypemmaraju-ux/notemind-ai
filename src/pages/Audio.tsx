import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Headphones, 
  Download, 
  Share2, 
  Repeat,
  ListMusic,
  Sparkles
} from "lucide-react";

const Audio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
            <Headphones className="w-16 h-16 text-gold relative z-10" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-bold text-cream">Audio Overview</h1>
          <p className="text-gold font-bold uppercase tracking-[0.2em] text-xs">No active notebook — AI Generated Podcast</p>
        </div>
      </header>

      {/* Player Card */}
      <section className="glass-card p-10 space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-center p-8 space-y-4">
          <Headphones className="w-12 h-12 text-gold/30" />
          <p className="text-cream/60 font-serif italic">Generate an audio overview from your notebook sources to start listening.</p>
          <button className="px-6 py-2 bg-gold text-navy-deep rounded-xl font-bold text-sm uppercase tracking-widest">Generate Audio</button>
        </div>
        <div className="absolute top-0 right-0 p-6">
          <Sparkles className="w-6 h-6 text-gold/20" />
        </div>

        {/* Visualizer Mockup */}
        <div className="flex items-end justify-center gap-1 h-24">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [20, 80, 40, 60, 20] : 20 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
              className="w-1.5 bg-gold/40 rounded-full"
            />
          ))}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-gold/50 uppercase tracking-widest">
              <span>3:42</span>
              <span>12:34</span>
            </div>
            <div className="h-2 bg-navy-deep rounded-full overflow-hidden border border-gold/10 relative cursor-pointer group">
              <div 
                className="h-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]" 
                style={{ width: `${progress}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cream rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-10">
            <button className="text-gold/40 hover:text-gold transition-all"><Repeat className="w-5 h-5" /></button>
            <button className="text-gold/60 hover:text-gold transition-all"><SkipBack className="w-8 h-8" /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-gold text-navy-deep rounded-full flex items-center justify-center shadow-2xl shadow-gold/30 hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
            <button className="text-gold/60 hover:text-gold transition-all"><SkipForward className="w-8 h-8" /></button>
            <button className="text-gold/40 hover:text-gold transition-all"><ListMusic className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gold/10">
          <div className="flex items-center gap-4">
            <Volume2 className="w-5 h-5 text-gold/50" />
            <div className="w-32 h-1 bg-navy-deep rounded-full overflow-hidden border border-gold/10">
              <div className="h-full bg-gold/40 w-2/3" />
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/20 text-gold/60 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/5 transition-all">
              <Download className="w-4 h-4" /> Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gold/20 text-gold/60 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/5 transition-all">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Transcript */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-cream">Transcript</h2>
          <button className="text-xs font-bold text-gold uppercase tracking-widest">Auto-Scroll</button>
        </div>
        <div className="glass-card p-8 space-y-6 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Alex (AI Host)</p>
            <p className="text-cream/70 leading-relaxed">
              Today we are diving into cardiology research, specifically focusing on the recent developments in minimally invasive valve replacements. Maya, it's fascinating how much the field has shifted in just the last decade.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-gold/20 pl-6">
            <p className="text-[10px] font-bold text-gold uppercase tracking-widest">Maya (AI Expert)</p>
            <p className="text-cream/70 leading-relaxed">
              That's right, Alex. The data from the latest clinical trials suggests that TAVR procedures are now showing comparable, if not superior, outcomes for low-risk patients compared to traditional open-heart surgery.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audio;
