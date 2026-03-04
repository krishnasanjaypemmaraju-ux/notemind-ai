import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "motion/react";
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Download, 
  Share2, 
  Sparkles,
  ChevronRight,
  Info,
  BookOpen
} from "lucide-react";

const MindMap = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;

    const data = {
      name: "Knowledge Map",
      children: []
    };

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("width", "100%")
      .style("height", "100%");

    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const tree = d3.tree().size([2 * Math.PI, Math.min(width, height) / 2 - 100]);
    const root = d3.hierarchy(data);
    tree(root);

    const link = g.append("g")
      .attr("fill", "none")
      .attr("stroke", "#C9A84C")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", d3.linkRadial()
        .angle((d: any) => d.x)
        .radius((d: any) => d.y) as any);

    const node = g.append("g")
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", (d: any) => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    node.append("circle")
      .attr("fill", (d: any) => d.children ? "#C9A84C" : "#0D1130")
      .attr("stroke", "#C9A84C")
      .attr("stroke-width", 1.5)
      .attr("r", (d: any) => d.children ? 6 : 4);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("x", (d: any) => d.x < Math.PI === !d.children ? 10 : -10)
      .attr("text-anchor", (d: any) => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("transform", (d: any) => d.x >= Math.PI ? "rotate(180)" : null)
      .attr("fill", "#F5F0E8")
      .attr("font-size", "12px")
      .attr("font-weight", (d: any) => d.children ? "bold" : "normal")
      .text((d: any) => d.data.name)
      .clone(true).lower()
      .attr("stroke", "#0A0E27")
      .attr("stroke-width", 3);

  }, []);

  return (
    <div className="h-screen flex flex-col bg-navy-deep relative overflow-hidden">
      {/* Header */}
      <header className="px-8 py-4 border-b border-gold/10 bg-navy-card/30 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gold/10 rounded-xl border border-gold/20">
            <Network className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-cream">Knowledge Map</h1>
            <p className="text-[10px] font-bold text-gold/60 uppercase tracking-widest">Cardiology Research — AI Visualization</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-navy-card rounded-xl p-1 border border-gold/10">
            <button className="p-2 text-gold/40 hover:text-gold transition-all"><ZoomIn className="w-5 h-5" /></button>
            <button className="p-2 text-gold/40 hover:text-gold transition-all border-l border-gold/10"><ZoomOut className="w-5 h-5" /></button>
            <button className="p-2 text-gold/40 hover:text-gold transition-all border-l border-gold/10"><Maximize className="w-5 h-5" /></button>
          </div>
          <button className="bg-gold text-navy-deep px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-gold/20">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex overflow-hidden">
        {/* SVG Container */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/5 to-transparent">
          <svg ref={svgRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>

        {/* Details Panel */}
        <aside className="w-96 border-l border-gold/10 bg-navy-card/30 backdrop-blur-xl p-8 space-y-8 z-20 overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Node Details</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-cream">Symptoms</h2>
            <div className="h-1 w-12 bg-gold rounded-full"></div>
          </div>

          <div className="space-y-6">
            <p className="text-cream/70 leading-relaxed">
              Key physiological indicators of worsening cardiac function and peripheral congestion.
            </p>
            
            <div className="space-y-4">
              {[
                "Systemic congestion leading to peripheral swelling (edema).",
                "Dyspnea on exertion or when lying flat (orthopnea).",
                "Reduced exercise tolerance due to persistent fatigue."
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></div>
                  <p className="text-sm text-cream/80">{point}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gold/5 rounded-xl border border-gold/10 space-y-2">
              <div className="flex items-center gap-2 text-gold/60">
                <BookOpen className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Sources</span>
              </div>
              <p className="text-xs text-cream/50 italic">"Braunwald's Heart Disease: A Textbook of Cardiovascular Medicine", p.89-94</p>
            </div>
          </div>

          <button className="w-full bg-gold text-navy-deep py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg shadow-gold/20 mt-auto">
            <Sparkles className="w-5 h-5" />
            Ask AI about this
          </button>
        </aside>
      </main>

      {/* Legend */}
      <footer className="px-8 py-4 border-t border-gold/10 bg-navy-card/30 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex gap-6">
          {[
            { label: "Pathology", color: "bg-red-400" },
            { label: "Clinical Signs", color: "bg-emerald-400" },
            { label: "Tests", color: "bg-blue-400" },
            { label: "Intervention", color: "bg-purple-400" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-gold/40">
          <span className="text-[10px] font-bold uppercase tracking-widest">NoteMind AI Engine v2.4</span>
        </div>
      </footer>
    </div>
  );
};

export default MindMap;
