"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   Eyeball Component
───────────────────────────────────────────── */
function Eyeball({ size = 260 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const s = size / 260; 
  const irisSize = 144 * s;
  const pupilSize = 96 * s;
  const maxDist = 36 * s;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ratio = Math.min(dist, maxDist) / (dist || 1);
      setPupil({ x: dx * ratio, y: dy * ratio });
      setTilt({
        rotateX: ((e.clientY - window.innerHeight / 2) / window.innerHeight) * -18,
        rotateY: ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 18,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [maxDist]);

  useEffect(() => {
    const scheduleBlink = () => {
      const t = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => { setIsBlinking(false); scheduleBlink(); }, 160);
      }, 2500 + Math.random() * 2000);
      return t;
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ perspective: "600px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
    >
      <motion.div
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Sclera */}
        <div
          style={{
            width: size, height: size, borderRadius: "50%",
            background: "radial-gradient(circle at 38% 35%, #ffffff 0%, #f0f0f0 40%, #d8d8d8 80%, #b0b0b0 100%)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.22), inset 0 -10px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
            position: "relative", overflow: "hidden",
          }}
        >
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} viewBox="0 0 260 260">
            <path d="M130 80 Q160 110 145 145" stroke="#e05555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M100 100 Q85 130 105 160" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M160 105 Q180 135 165 165" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M118 75 Q100 100 112 125" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>

          {/* Iris */}
          <motion.div
            animate={{ x: pupil.x * 0.65, y: pupil.y * 0.65 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              marginTop: -irisSize / 2, marginLeft: -irisSize / 2,
              width: irisSize, height: irisSize, borderRadius: "50%",
              background: "radial-gradient(circle at 42% 38%, #f5a623 0%, #e8820c 35%, #c45e00 65%, #8b3d00 100%)",
              boxShadow: "inset 0 4px 16px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.20)",
            }}
          >
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                marginTop: -pupilSize / 2, marginLeft: -pupilSize / 2,
                width: pupilSize, height: pupilSize, borderRadius: "50%",
                background: "radial-gradient(circle at 35% 32%, #2a2a2a 0%, #0a0a0a 60%, #000 100%)",
              }}
            >
              <div style={{ position: "absolute", top: pupilSize * 0.125, left: pupilSize * 0.145, width: pupilSize * 0.25, height: pupilSize * 0.25, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
              <div style={{ position: "absolute", top: pupilSize * 0.4, left: pupilSize * 0.48, width: pupilSize * 0.1, height: pupilSize * 0.1, borderRadius: "50%", background: "rgba(255,255,255,0.4)" }} />
            </div>
          </motion.div>

          <motion.div
            animate={{ scaleY: isBlinking ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, #f8f4ee 0%, #e8ddd0 100%)", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", transformOrigin: "top center", zIndex: 10 }}
          />
          <div style={{ position: "absolute", top: 18 * s, left: 24 * s, width: 60 * s, height: 40 * s, borderRadius: "50%", background: "rgba(255,255,255,0.55)", filter: "blur(6px)", transform: "rotate(-15deg)" }} />
        </div>

        <motion.div style={{ marginTop: 28 * s, display: "flex", justifyContent: "center" }}>
          <svg width={120 * s} height={48 * s} viewBox="0 0 120 48">
            <path d="M20 10 Q30 44 60 44 Q90 44 100 10" stroke="#c45e00" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Landing Page
───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* ─────────────────────────────────────────────
          1. NAVBAR (Sticky)
      ───────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 shadow-md shadow-orange-500/20">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5 4H14V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <Link href="/" className="text-xl font-bold tracking-tight">
                Content<span className="text-orange-500">AI</span>
              </Link>
            </div>

            {/* Links (Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors">Pricing</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all">
                Get Started
              </Link>
            </div>

          </div>
        </div>
      </nav>

      <main>
        {/* ─────────────────────────────────────────────
            2. HERO SECTION
        ───────────────────────────────────────────── */}
        <section className="relative pt-20 pb-28 lg:pt-32 lg:pb-36 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left pt-8 lg:pt-0"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6">
                Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">SEO-Optimized</span> <br className="hidden lg:block" /> Content in Seconds
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0">
                AI-powered content generation with built-in SEO scoring — write faster, rank higher.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  href="/signup" 
                  className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                <Link 
                  href="#features" 
                  className="w-full sm:w-auto px-8 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-2xl transition-all flex items-center justify-center"
                >
                  See how it works
                </Link>
              </div>
            </motion.div>

            {/* Visual Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-lg lg:max-w-none relative"
            >
              <div className="aspect-square relative rounded-[3rem] overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(145deg, #FF9A3C 0%, #FF6B00 60%, #E05500 100%)" }}>
                
                {/* Visual decorations */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                
                <div className="relative z-10 w-[60%] h-[60%]">
                  <Eyeball size={260} />
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white/50"
                >
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-bold text-gray-800">SEO Score: 98/100</span>
                </motion.div>
                
              </div>
            </motion.div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────
            3. FEATURES SECTION (4 cards)
        ───────────────────────────────────────────── */}
        <section id="features" className="py-24 bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2">Features</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Everything you need to rank</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">AI Content Generation</h4>
                <p className="text-gray-500 leading-relaxed">Generate blog titles, articles, and comprehensive outlines instantly with our advanced AI engine.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Real-time SEO Scoring</h4>
                <p className="text-gray-500 leading-relaxed">Get instant, actionable feedback on keyword density, readability, and structure as you create.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Save & Manage</h4>
                <p className="text-gray-500 leading-relaxed">Organize all your content in one clean dashboard. Never lose track of your drafts or published pieces.</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Export Anywhere</h4>
                <p className="text-gray-500 leading-relaxed">Ready to publish? Download your fully optimized content instantly as a PDF or Markdown file.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────
            4. PRICING SECTION
        ───────────────────────────────────────────── */}
        <section id="pricing" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-2">Pricing</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Simple, transparent pricing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Free Plan */}
              <div className="bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 sm:p-10 flex flex-col hover:border-gray-200 transition-colors">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h4>
                <p className="text-gray-500 mb-6">Perfect to try out the AI capabilities.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">₹0</span>
                  <span className="text-gray-500 font-medium">/month</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span><strong>5</strong> generations per month</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Basic SEO scoring</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Standard templates</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full block text-center px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-colors">
                  Get Started for Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-900 rounded-[2.5rem] p-8 sm:p-10 flex flex-col relative overflow-hidden shadow-2xl shadow-gray-900/30 border border-gray-800">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-orange-500 rounded-full opacity-20 blur-3xl"></div>
                
                <div className="absolute top-0 right-8 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-b-lg">
                  Most Popular
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 relative z-10">Pro Plan</h4>
                <p className="text-gray-400 mb-6 relative z-10">For serious creators who want to rank.</p>
                <div className="mb-8 relative z-10">
                  <span className="text-5xl font-extrabold text-white">₹499</span>
                  <span className="text-gray-400 font-medium">/month</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1 relative z-10">
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-white"><strong>Unlimited</strong> generations</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Advanced SEO insights</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Priority email support</span>
                  </li>
                </ul>
                <Link href="/signup" className="w-full block text-center px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 transition-all relative z-10">
                  Upgrade to Pro
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────
          5. FOOTER
      ───────────────────────────────────────────── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
                <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                  <path d="M14 4L4 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5 4H14V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                Content<span className="text-orange-500">AI</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ContentAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
