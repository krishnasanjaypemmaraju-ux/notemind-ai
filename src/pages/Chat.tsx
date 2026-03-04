import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Sparkles, 
  Brain, 
  BookOpen, 
  ChevronRight,
  User,
  Bot,
  Loader2,
  Quote
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([
    { 
      id: 1, 
      role: "assistant", 
      content: "Hello! I'm NoteMind AI. Upload some sources to your notebook, and I'll help you analyze them, find connections, and answer your questions.",
      citations: []
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: input,
        config: {
          systemInstruction: "You are NoteMind AI, an expert research assistant. Answer questions based on the user's documents. Provide concise, high-quality responses with academic tone."
        }
      });

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.text || "I'm sorry, I couldn't process that.",
        citations: ["Source: Cardiology Textbook, p.142", "Source: ECG Lecture 4:32"]
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content: "Error connecting to AI. Please check your API key." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-navy-deep relative overflow-hidden">
      {/* Header */}
      <header className="px-8 py-4 border-b border-gold/10 bg-navy-card/30 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gold/10 rounded-xl border border-gold/20">
            <BookOpen className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-cream">Cardiology Research</h1>
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              3 Sources Active
            </p>
          </div>
        </div>
        <button className="bg-gold text-navy-deep px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-gold/20">
          <Sparkles className="w-4 h-4" />
          Generate Summary
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth pb-32">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-4 max-w-3xl ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  msg.role === "user" ? "bg-gold/10 border-gold/30" : "bg-navy-card border-gold/20"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5 text-gold" /> : <Bot className="w-5 h-5 text-gold" />}
                </div>
                
                <div className="space-y-4">
                  <div className={`p-6 rounded-2xl shadow-xl ${
                    msg.role === "user" 
                      ? "bg-gold text-navy-deep font-medium rounded-tr-none" 
                      : "glass-card rounded-tl-none"
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((cite: string, i: number) => (
                        <div key={i} className="flex items-center gap-1.5 bg-gold/5 border border-gold/10 text-gold/60 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-gold/10 transition-all">
                          <Quote className="w-3 h-3" />
                          {cite}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-navy-card border border-gold/20 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-gold animate-spin" />
            </div>
            <div className="glass-card p-6 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gold/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gold/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-gold/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-navy-deep via-navy-deep to-transparent">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative bg-navy-card border border-gold/20 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
            <div className="flex items-center gap-1 px-2 border-r border-gold/10">
              <button type="button" className="p-2 text-gold/40 hover:text-gold transition-all">
                <Paperclip className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 text-gold/40 hover:text-gold transition-all">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your sources..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-cream placeholder:text-cream/20 py-4 px-4"
            />
            <button 
              disabled={!input.trim() || isLoading}
              className="bg-gold text-navy-deep p-3 rounded-xl shadow-lg shadow-gold/20 hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
