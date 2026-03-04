import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Mail, Lock, Github, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-navy-deep to-navy-deep">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="p-4 bg-gold/10 rounded-2xl border border-gold/30">
            <Brain className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold gold-gradient-text">NoteMind AI</h1>
          <p className="text-cream/60 text-center">Your intelligent research companion</p>
        </div>

        <div className="flex p-1 bg-navy-card rounded-xl border border-gold/10 mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? "bg-gold text-navy-deep" : "text-cream/50 hover:text-cream"}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? "bg-gold text-navy-deep" : "text-cream/50 hover:text-cream"}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-navy-card border border-gold/20 rounded-xl py-3 px-4 text-cream focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gold uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full bg-navy-card border border-gold/20 rounded-xl py-3 pl-12 pr-4 text-cream focus:outline-none focus:border-gold transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gold uppercase tracking-widest">Password</label>
              <button type="button" className="text-[10px] text-gold/50 hover:text-gold uppercase font-bold tracking-widest">Forgot?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-navy-card border border-gold/20 rounded-xl py-3 pl-12 pr-4 text-cream focus:outline-none focus:border-gold transition-all"
              />
            </div>
          </div>

          <button className="w-full bg-gold text-navy-deep font-bold py-4 rounded-xl shadow-lg shadow-gold/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-4">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 bg-navy-deep text-cream/30 uppercase tracking-widest">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 border border-gold/20 rounded-xl hover:bg-gold/5 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gold/20 rounded-xl hover:bg-gold/5 transition-all">
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
