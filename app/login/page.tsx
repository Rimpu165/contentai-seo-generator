"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────
   Shared: 3D Eyeball (size-aware)
───────────────────────────────────────────── */
function Eyeball({
  isPasswordFocused,
  size = 260,
}: {
  isPasswordFocused: boolean;
  size?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const s = size / 260; // scale factor
  const irisSize = 144 * s;
  const pupilSize = 96 * s;
  const maxDist = 36 * s;

  useEffect(() => {
    if (isPasswordFocused) return;
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
  }, [isPasswordFocused, maxDist]);

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
      style={{
        perspective: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        animate={
          isPasswordFocused
            ? { rotateX: 0, rotateY: 0 }
            : { rotateX: tilt.rotateX, rotateY: tilt.rotateY }
        }
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Sclera */}
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 38% 35%, #ffffff 0%, #f0f0f0 40%, #d8d8d8 80%, #b0b0b0 100%)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.22), inset 0 -10px 30px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Blood vessels */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
            viewBox="0 0 260 260"
          >
            <path d="M130 80 Q160 110 145 145" stroke="#e05555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M100 100 Q85 130 105 160" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M160 105 Q180 135 165 165" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M118 75 Q100 100 112 125" stroke="#e05555" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>

          {/* Iris */}
          <motion.div
            animate={{
              x: isPasswordFocused ? 0 : pupil.x * 0.65,
              y: isPasswordFocused ? 0 : pupil.y * 0.65,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: -irisSize / 2,
              marginLeft: -irisSize / 2,
              width: irisSize,
              height: irisSize,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 42% 38%, #f5a623 0%, #e8820c 35%, #c45e00 65%, #8b3d00 100%)",
              boxShadow: "inset 0 4px 16px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.20)",
            }}
          >
            {/* Pupil */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -pupilSize / 2,
                marginLeft: -pupilSize / 2,
                width: pupilSize,
                height: pupilSize,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 32%, #2a2a2a 0%, #0a0a0a 60%, #000 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: pupilSize * 0.125,
                  left: pupilSize * 0.145,
                  width: pupilSize * 0.25,
                  height: pupilSize * 0.25,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.85)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: pupilSize * 0.4,
                  left: pupilSize * 0.48,
                  width: pupilSize * 0.1,
                  height: pupilSize * 0.1,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.4)",
                }}
              />
            </div>
          </motion.div>

          {/* Eyelid top */}
          <motion.div
            animate={{ scaleY: isPasswordFocused ? 1 : isBlinking ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: "50%",
              background: "linear-gradient(180deg, #f8f4ee 0%, #e8ddd0 100%)",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              transformOrigin: "top center",
              zIndex: 10,
            }}
          />
          {/* Eyelid bottom (peek) */}
          <motion.div
            animate={{ scaleY: isPasswordFocused ? 0.85 : 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "50%",
              background: "linear-gradient(0deg, #f8f4ee 0%, #e8ddd0 100%)",
              borderRadius: "0 0 50% 50% / 0 0 100% 100%",
              transformOrigin: "bottom center",
              zIndex: 10,
            }}
          />
          {/* Gloss */}
          <div
            style={{
              position: "absolute",
              top: 18 * s, left: 24 * s,
              width: 60 * s, height: 40 * s,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
              filter: "blur(6px)",
              transform: "rotate(-15deg)",
            }}
          />
        </div>

        {/* Smile */}
        <motion.div
          animate={{ opacity: isPasswordFocused ? 0.3 : 1, y: isPasswordFocused ? 4 : 0 }}
          style={{ marginTop: 28 * s, display: "flex", justifyContent: "center" }}
        >
          <svg width={120 * s} height={48 * s} viewBox="0 0 120 48">
            <path
              d="M20 10 Q30 44 60 44 Q90 44 100 10"
              stroke="#c45e00"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile Header — animated orange hero with mini eyeball
───────────────────────────────────────────── */
function MobileHero({ isPasswordFocused }: { isPasswordFocused: boolean }) {
  return (
    <div
      className="lg:hidden relative overflow-hidden flex flex-col items-center justify-end pt-10 pb-8"
      style={{
        background: "linear-gradient(145deg, #FF9A3C 0%, #FF6B00 65%, #E05500 100%)",
        minHeight: 220,
      }}
    >
      {/* Morphing blobs */}
      {[
        { w: 180, h: 160, top: -60, left: -40, delay: 0 },
        { w: 140, h: 140, top: -30, right: -40, delay: 1.2 },
        { w: 100, h: 100, bottom: -30, left: "30%", delay: 0.6 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{ width: b.w, height: b.h, top: (b as any).top, left: (b as any).left, right: (b as any).right, bottom: (b as any).bottom }}
          animate={{
            borderRadius: [
              "60% 40% 70% 30% / 50% 60% 40% 70%",
              "40% 60% 30% 70% / 70% 40% 60% 30%",
              "60% 40% 70% 30% / 50% 60% 40% 70%",
            ],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Floating rings */}
      {[120, 180, 240].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-white/15"
          style={{ width: r, height: r }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5 + i, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}

      {/* Mini eyeball */}
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
        style={{ width: 130, height: 148, position: "relative", zIndex: 2 }}
      >
        <Eyeball isPasswordFocused={isPasswordFocused} size={120} />
      </motion.div>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-1 text-white/70 text-xs font-medium tracking-widest uppercase"
      >
        {isPasswordFocused ? "I won't peek 🙈" : "I see what ranks."}
      </motion.p>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 400 32" preserveAspectRatio="none" className="w-full h-8">
          <path d="M0,32 Q100,0 200,16 Q300,32 400,8 L400,32 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Login Page
───────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Login failed"); return; }
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">

      {/* ── MOBILE HERO ── */}
      <MobileHero isPasswordFocused={isPasswordFocused && !showPassword} />

      {/* ── FORM PANEL ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 lg:w-[46%] flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-8 lg:py-12"
      >
        {/* Brand — desktop only */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex items-center gap-2.5 mb-12"
        >
          {/* Logo mark */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #FF9A3C 0%, #F97316 100%)", boxShadow: "0 6px 18px rgba(249,115,22,0.40)" }}
          >
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M5 4H14V13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Logo text */}
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            Content<span className="text-orange-500">AI</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 tracking-tight">Login</h1>
          <p className="text-gray-400 text-sm mb-8">Welcome back. Sign in to continue.</p>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-red-50 border border-red-100 text-red-500 text-sm rounded-2xl px-4 py-3"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition"
            />
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-600">Password</label>
              <Link href="#" className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-14 text-sm text-gray-900 placeholder:text-gray-300 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs select-none text-gray-600 font-medium hover:text-orange-500 cursor-pointer transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-1"
          >
            <motion.button
              id="login-btn"
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.015, boxShadow: "0 14px 40px rgba(234,88,12,0.32)" }}
              whileTap={{ scale: 0.975 }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl py-3.5 text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ boxShadow: "0 6px 24px rgba(234,88,12,0.22)" }}
            >
              {loading ? "Signing in..." : "Login"}
            </motion.button>
          </motion.div>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-300 font-medium">Or</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-400">
          Not registered yet?{" "}
          <Link href="/signup" className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>

      {/* ── DESKTOP EYEBALL PANEL ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #FF9A3C 0%, #FF6B00 60%, #E05500 100%)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* Morphing background blobs */}
        {[
          { size: 300, top: "-10%", left: "-8%", delay: 0 },
          { size: 200, bottom: "-8%", right: "-5%", delay: 1.5 },
          { size: 120, top: "60%", left: "10%", delay: 0.8 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10"
            style={{ width: b.size, height: b.size, top: (b as any).top, left: (b as any).left, bottom: (b as any).bottom, right: (b as any).right }}
            animate={{
              borderRadius: [
                "60% 40% 70% 30% / 50% 60% 40% 70%",
                "40% 60% 30% 70% / 70% 40% 60% 30%",
                "60% 40% 70% 30% / 50% 60% 40% 70%",
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          />
        ))}

        {/* Pulsing rings */}
        {[280, 400, 520].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: size, height: size }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}

        {/* Eyeball */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
          style={{ width: 320, height: 380 }}
        >
          <Eyeball isPasswordFocused={isPasswordFocused && !showPassword} size={260} />
        </motion.div>

        {/* Watching label */}
        <motion.div
          className="absolute bottom-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/60 text-sm font-medium tracking-wide">
            {isPasswordFocused && !showPassword ? "I won't peek... 🙈" : "I see what ranks."}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
