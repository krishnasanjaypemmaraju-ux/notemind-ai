import React, { useState } from "react";
import { 
  Check, 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  Star
} from "lucide-react";
import { motion } from "motion/react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect to get started",
      features: ["3 Notebooks", "10 Sources", "AI Chat", "Basic Summaries"],
      button: "Get Started",
      premium: false
    },
    {
      name: "Pro",
      price: isAnnual ? "12" : "15",
      description: "For serious learners",
      features: ["Unlimited Notebooks", "AI Chat with Citations", "Auto Summaries", "Audio Overviews", "Mind Maps", "Priority AI Access"],
      button: "Start Pro Trial",
      premium: true,
      popular: true
    },
    {
      name: "Team",
      price: isAnnual ? "29" : "35",
      description: "For organizations",
      features: ["Everything in Pro", "Team Collaboration", "Admin Dashboard", "API Access", "Dedicated Support", "Custom Integrations"],
      button: "Contact Sales",
      premium: false
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16 pb-24">
      {/* Header */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          Premium Intelligence
        </div>
        <h1 className="font-serif text-5xl font-bold text-cream">Choose Your Plan</h1>
        <p className="text-cream/50 text-xl max-w-2xl mx-auto">Start free. Upgrade when you're ready to unlock the full power of NoteMind AI.</p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <span className={`text-sm font-bold ${!isAnnual ? "text-gold" : "text-cream/40"}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 bg-navy-card rounded-full border border-gold/20 p-1 relative transition-all"
          >
            <div className={`w-6 h-6 bg-gold rounded-full transition-all ${isAnnual ? "translate-x-6" : "translate-x-0"}`}></div>
          </button>
          <span className={`text-sm font-bold ${isAnnual ? "text-gold" : "text-cream/40"}`}>Annual (Save 20%)</span>
        </div>
      </header>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
        {plans.map((plan, i) => (
          <motion.div 
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 flex flex-col h-full relative ${plan.popular ? "border-gold/60 bg-gold/5 scale-105 z-10 gold-glow" : "hover:border-gold/30 transition-all"}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-navy-deep px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-gold text-xl font-bold mb-2 uppercase tracking-widest">{plan.name}</h3>
              <p className="text-cream/50 text-sm mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-cream text-5xl font-serif font-bold">${plan.price}</span>
                <span className="text-cream/40 text-sm font-bold uppercase tracking-widest">/ month</span>
              </div>
            </div>

            <ul className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="p-1 bg-gold/10 rounded-full mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm text-cream/80">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              plan.popular 
                ? "bg-gold text-navy-deep hover:opacity-90 shadow-lg shadow-gold/20" 
                : "border border-gold/30 text-gold hover:bg-gold/10"
            }`}>
              {plan.button}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges */}
      <section className="pt-20 border-t border-gold/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Secure Payment", icon: Shield, desc: "256-bit SSL encrypted checkout" },
            { title: "No Credit Card", icon: Zap, desc: "Start your free trial instantly" },
            { title: "Cancel Anytime", icon: Star, desc: "No long-term commitments" },
          ].map((item) => (
            <div key={item.title} className="space-y-3">
              <div className="flex justify-center">
                <item.icon className="w-8 h-8 text-gold/40" />
              </div>
              <h4 className="text-cream font-bold uppercase tracking-widest text-xs">{item.title}</h4>
              <p className="text-cream/40 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
