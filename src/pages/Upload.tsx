import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Upload as UploadIcon, 
  FileText, 
  Youtube, 
  Globe, 
  FileCode, 
  CheckCircle2, 
  Trash2, 
  Loader2,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      setFiles(prev => [...prev, {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + " MB",
        date: new Date().toLocaleDateString(),
        type: "pdf",
        status: "ready",
        extractedText: data.text
      }]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl font-bold text-cream">Add Sources</h1>
            <p className="text-cream/50">Upload documents, links, or media to build your knowledge base.</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gold uppercase tracking-widest mb-1">{files.length} / 10 Sources</p>
            <div className="w-48 h-2 bg-navy-card rounded-full overflow-hidden border border-gold/10">
              <div 
                className="h-full bg-gold transition-all duration-500" 
                style={{ width: `${(files.length / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Upload Zone */}
      <section>
        <label className="group relative flex flex-col items-center justify-center gap-6 rounded-3xl border-2 border-dashed border-gold/20 bg-navy-card/30 px-6 py-20 transition-all hover:border-gold/50 hover:bg-navy-card/50 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="p-5 bg-gold/10 rounded-full ring-1 ring-gold/20 group-hover:scale-110 transition-transform duration-300">
              {isUploading ? (
                <Loader2 className="w-10 h-10 text-gold animate-spin" />
              ) : (
                <UploadIcon className="w-10 h-10 text-gold" />
              )}
            </div>
            <div className="text-center space-y-2">
              <p className="text-cream text-xl font-bold tracking-tight">
                {isUploading ? "Extracting intelligence..." : "Drop your files here or click to browse"}
              </p>
              <p className="text-cream/40 text-sm">Supports PDF, TXT, and Word docs up to 50MB</p>
            </div>
          </div>
          
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.txt,.doc,.docx" disabled={isUploading} />
          
          {!isUploading && (
            <button className="relative z-10 mt-4 px-8 py-3 bg-gold text-navy-deep rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
              Select Files
            </button>
          )}
        </label>
      </section>

      {/* Quick Import */}
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Quick Import</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "YouTube Link", icon: Youtube },
            { name: "Website URL", icon: Globe },
            { name: "Google Doc", icon: FileText },
            { name: "Notion Page", icon: FileCode },
          ].map((item) => (
            <button key={item.name} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-gold/10 bg-navy-card/50 hover:border-gold/40 hover:-translate-y-1 transition-all group">
              <item.icon className="w-8 h-8 text-gold/50 group-hover:text-gold transition-colors" />
              <span className="text-xs font-bold text-cream/70 group-hover:text-cream uppercase tracking-widest">{item.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* File List */}
      {files.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em]">Already Uploaded</h3>
          <div className="glass-card overflow-hidden">
            {files.map((file, i) => (
              <div key={file.id} className={`flex items-center justify-between p-5 ${i !== files.length - 1 ? "border-b border-gold/5" : ""} hover:bg-gold/5 transition-all group`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gold/10 rounded-xl">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-cream">{file.name}</p>
                    <p className="text-[10px] font-bold text-gold/40 uppercase tracking-widest">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="p-2 text-cream/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Action */}
      {files.length > 0 && (
        <div className="sticky bottom-8 left-0 right-0 z-20">
          <button 
            onClick={() => navigate("/chat")}
            className="w-full h-16 bg-gold text-navy-deep rounded-2xl font-bold text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-gold/30 hover:scale-[1.02] transition-all group"
          >
            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Process Sources with AI
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;
