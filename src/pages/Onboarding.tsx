import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, BookOpen, Headphones, Network, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Welcome to NoteMind AI",
    description: "Your research assistant that turns documents into intelligence.",
    icon: Brain,
    color: "text-gold"
  },
  {
    title: "Chat with Documents",
    description: "Ask questions and get cited answers instantly from your library.",
    icon: Sparkles,
    color: "text-blue-400"
  },
  {
    title: "Audio Overviews",
    description: "Turn any research into a podcast for learning on the go.",
    icon: Headphones,
    color: "text-emerald-400"
  },
  {
    title: "Visualize Knowledge",
    description: "See connections between ideas with auto-generated mind maps.",
    icon: Network,
    color: "text-purple-400"
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-deep p-6">
      <div className="w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <div className={`p-8 bg-navy-card rounded-3xl border border-gold/20 shadow-2xl relative`}>
                <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
                <StepIcon className={`w-20 h-20 relative z-10 ${steps[currentStep].color}`} />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="font-serif text-4xl font-bold text-cream">{steps[currentStep].title}</h1>
              <p className="text-cream/60 text-xl max-w-md mx-auto">{steps[currentStep].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? "w-8 bg-gold" : "w-2 bg-gold/20"}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="bg-gold text-navy-deep px-12 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-gold/20"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next Step"}
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-cream/30 hover:text-cream text-sm font-bold tracking-widest uppercase transition-all"
          >
            Skip Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
