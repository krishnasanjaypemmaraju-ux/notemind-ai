import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Brain, 
  LayoutDashboard, 
  PlusCircle, 
  Upload, 
  MessageSquare, 
  Headphones, 
  Network, 
  Settings, 
  CreditCard,
  LogOut
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/onboarding";

  if (isAuthPage) return <>{children}</>;

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Create", path: "/create", icon: PlusCircle },
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Chat", path: "/chat", icon: MessageSquare },
    { name: "Audio", path: "/audio", icon: Headphones },
    { name: "Mind Map", path: "/mindmap", icon: Network },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Pricing", path: "/pricing", icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-navy-deep text-cream">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gold/10 bg-navy-card/30 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-gold/10 rounded-xl border border-gold/30">
            <Brain className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-serif text-xl font-bold text-gold">NoteMind AI</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path
                  ? "bg-gold text-navy-deep font-bold shadow-lg shadow-gold/20"
                  : "hover:bg-gold/10 text-cream/70 hover:text-gold"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gold/10">
          <Link
            to="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-cream/50 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
