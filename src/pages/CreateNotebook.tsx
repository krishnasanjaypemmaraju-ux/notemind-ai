import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BookOpen, ArrowRight, Sparkles, X } from "lucide-react";

const CreateNotebook = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) navigate("/upload");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/5 via-navy-deep to-navy-deep">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl glass-card p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6">
          <button onClick={() => navigate("/dashboard")} className="text-cream/30 hover:text-cream transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-gold mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">New Project</span>
            </div>
            <h1 className="font-serif text-4xl font-bold text-cream">Create your first notebook</h1>
            <p className="text-cream/50 text-lg">Give your project a name to start organizing your thoughts with AI.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gold uppercase tracking-[0.2em] ml-1">Notebook Name</label>
              <input 
                autoFocus
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Cardiology Research" 
                className="w-full bg-navy-card border-2 border-gold/20 focus:border-gold text-cream rounded-2xl h-20 px-8 text-2xl placeholder:text-cream/10 focus:ring-0 transition-all outline-none"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <p className="text-cream/30 text-sm font-bold uppercase tracking-widest">Quick suggestions</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["My Research Paper", "Study Notes", "Work Project", "Thesis Ideas"].map((s) => (
                  <button 
                    key={s}
                    type="button"
                    onClick={() => setName(s)}
                    className="px-6 py-2.5 rounded-full border border-gold/20 text-gold/60 text-sm font-bold hover:bg-gold hover:text-navy-deep hover:border-gold transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={!name}
              className="w-full bg-gold text-navy-deep h-16 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-gold/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Create & Continue
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateNotebook;
