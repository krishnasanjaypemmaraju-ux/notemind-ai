import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Plus, 
  Search, 
  BookOpen, 
  Clock, 
  Star, 
  MoreVertical, 
  MessageSquare, 
  Upload as UploadIcon,
  Sparkles
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notebooks] = useState<any[]>([]);

  return (
    <div className="p-8 space-y-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-gold/60 font-bold">Welcome to NoteMind AI</p>
          <h1 className="font-serif text-4xl font-bold text-cream leading-tight">
            Your <span className="text-gold italic font-normal">intelligence</span> journey starts here.
          </h1>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-navy-deep font-bold shadow-lg shadow-gold/20 hover:opacity-90 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Notebook
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Notebooks", value: "0", icon: BookOpen },
          { label: "Sources", value: "0", icon: UploadIcon },
          { label: "Queries", value: "0", icon: MessageSquare },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center justify-between group hover:border-gold/40 transition-all">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gold/50 font-bold">{stat.label}</p>
              <p className="text-3xl font-serif font-bold text-cream">{stat.value}</p>
            </div>
            <div className="p-4 bg-gold/5 rounded-2xl group-hover:bg-gold/10 transition-all">
              <stat.icon className="w-6 h-6 text-gold" />
            </div>
          </div>
        ))}
      </section>

      {/* Notebooks Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-cream">My Notebooks</h2>
        </div>

        {notebooks.length === 0 ? (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-6 border-dashed border-2 border-gold/20">
            <div className="p-6 bg-gold/5 rounded-full">
              <BookOpen className="w-12 h-12 text-gold/30" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-cream">No notebooks yet</h3>
              <p className="text-cream/40 max-w-xs">Create your first notebook to start organizing your research with AI.</p>
            </div>
            <button 
              onClick={() => navigate("/create")}
              className="px-8 py-3 bg-gold/10 border border-gold/30 text-gold rounded-xl font-bold hover:bg-gold hover:text-navy-deep transition-all"
            >
              Create Notebook
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Notebook mapping would go here */}
          </div>
        )}
      </section>

      {/* Insights */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-cream">AI Insights</h2>
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 bg-gradient-to-br from-gold/5 to-transparent">
          <Sparkles className="w-8 h-8 text-gold/20" />
          <p className="text-cream/40 italic font-serif">
            Insights will appear here once you've added sources and started chatting with NoteMind AI.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
