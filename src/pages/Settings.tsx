import React from "react";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Database, 
  Globe, 
  Moon, 
  CreditCard,
  ChevronRight,
  Camera,
  LogOut
} from "lucide-react";

const Settings = () => {
  const sections = [
    {
      title: "Account",
      items: [
        { name: "Profile Information", icon: User, value: "User Name" },
        { name: "Email Address", icon: Mail, value: "user@example.com" },
        { name: "Password & Security", icon: Shield, value: "Last changed recently" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { name: "Notifications", icon: Bell, value: "All active" },
        { name: "Language", icon: Globe, value: "English (US)" },
        { name: "Appearance", icon: Moon, value: "Dark Mode" },
      ]
    },
    {
      title: "Subscription",
      items: [
        { name: "Current Plan", icon: CreditCard, value: "Pro Member" },
        { name: "Billing History", icon: Database, value: "Next bill Oct 24" },
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl font-bold text-cream">Settings</h1>
          <p className="text-cream/50">Manage your account and app preferences.</p>
        </div>
        <button className="bg-red-400/10 text-red-400 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-400 hover:text-navy-deep transition-all">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      {/* Profile Card */}
      <section className="glass-card p-8 flex items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <div className="bg-gold/10 text-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold/20">
            Pro Member
          </div>
        </div>
        
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl border-2 border-gold/30 overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/alex/200/200" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-gold text-navy-deep rounded-xl shadow-lg hover:scale-110 transition-all">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl font-bold text-cream">User Name</h2>
          <p className="text-cream/50 text-sm">Member since March 2024</p>
        </div>
      </section>

      {/* Settings Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="space-y-4">
            <h3 className="text-xs font-bold text-gold uppercase tracking-[0.2em] ml-1">{section.title}</h3>
            <div className="glass-card overflow-hidden">
              {section.items.map((item, i) => (
                <button 
                  key={item.name} 
                  className={`w-full flex items-center justify-between p-6 ${i !== section.items.length - 1 ? "border-b border-gold/5" : ""} hover:bg-gold/5 transition-all group`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gold/10 rounded-xl border border-gold/20">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-cream group-hover:text-gold transition-all">{item.name}</p>
                      <p className="text-xs text-cream/40">{item.value}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gold/20 group-hover:text-gold transition-all" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="text-center pt-8 border-t border-gold/10">
        <p className="text-[10px] font-bold text-gold/20 uppercase tracking-[0.3em]">NoteMind AI v2.4.0 • Built with Intelligence</p>
      </footer>
    </div>
  );
};

export default Settings;
