"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/layout/ThemeToggle";

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Giả lập API call
    setTimeout(() => {
      setStatus("success");
      // Reset sau khi xong (demo)
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  const inputVariants = {
    rest: { width: "0%", opacity: 0 },
    focus: { width: "100%", opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    
    <div className={isDarkMode ? "dark" : "light"}>
      
      <main
        className="relative w-screen h-screen overflow-hidden transition-colors duration-500 flex items-center justify-center font-sans selection:bg-primary/30"
      >
        {/* Nền blur */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[2px] scale-110"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/cf/be/f7/cfbef7ee6088cac3e2e6c01cfe57bfed.jpg')",
          }}
        />

        {/* Overlay nếu muốn dark mode */}
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-black/40" : ""}`}
        />



        {/* === BACKGROUND DECORATIONS === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated Gradient Spot */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[100px] dark:bg-primary/10"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px] dark:bg-purple-900/10"
          />
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(120, 120, 120, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* === THEME TOGGLE === */}
        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* === MAIN CONTAINER === */}
        <div className="relative w-full max-w-md px-6">

          {/* Stacked Cards Effect (Lớp nền trang trí) */}
          <motion.div
            animate={{ rotate: isDarkMode ? -6 : -3, scale: 0.95 }}
            className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-sm transform translate-y-4 translate-x-4 z-0"
          />
          <motion.div
            animate={{ rotate: isDarkMode ? 3 : 2, scale: 0.98 }}
            className="absolute inset-0 bg-white/40 dark:bg-slate-800/40 rounded-[2.5rem] border border-white/20 dark:border-white/5 backdrop-blur-sm z-10"
          />

          {/* === FORM CARD (Lớp chính) === */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 shadow-2xl shadow-primary/10 rounded-[2rem] p-8 md:p-10 overflow-hidden"
          >
            {/* Header */}
            <div className="text-center mb-8 relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30"
              >
                <Fingerprint size={32} />
              </motion.div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Welcome Back</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Please sign in to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email Input */}
              <motion.div
                initial="rest" whileFocus="focus" whileHover="focus"
                className="group relative"
              >
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-focus-within:text-primary transition-colors">Email</label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-0 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 pl-8 pr-4 text-slate-800 dark:text-slate-100 placeholder-transparent focus:outline-none transition-colors"
                    placeholder="Enter email"
                  />
                  {/* Animated Underline */}
                  <motion.div variants={inputVariants} className="absolute bottom-0 left-0 h-[2px] bg-primary" />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial="rest" whileFocus="focus" whileHover="focus"
                className="group relative"
              >
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-focus-within:text-primary transition-colors">Password</label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-0 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-transparent border-b border-slate-200 dark:border-slate-700 py-3 pl-8 pr-10 text-slate-800 dark:text-slate-100 placeholder-transparent focus:outline-none transition-colors"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 p-2 text-slate-400 hover:text-primary transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {/* Animated Underline */}
                  <motion.div variants={inputVariants} className="absolute bottom-0 left-0 h-[2px] bg-primary" />
                </div>
              </motion.div>

              <div className="flex justify-end">
                <a href="#" className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">Forgot Password?</a>
              </div>

              {/* Action Button - Morphing Animation */}
              <div className="h-14 relative">
                <AnimatePresence mode="wait">
                  {status === "idle" && (
                    <motion.button
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-full rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 group overflow-hidden"
                    >
                      <span className="relative z-10">Sign In</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.button>
                  )}

                  {status === "loading" && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </motion.div>
                  )}

                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ width: "3.5rem", height: "3.5rem", borderRadius: "999px", backgroundColor: "var(--primary)" }} // Bắt đầu từ hình tròn
                      animate={{
                        width: "100%", height: "100%", borderRadius: "12px", // Biến lại thành nút đầy
                        backgroundColor: "#10b981" // Màu xanh lá Emerald-500
                      }}
                      className="w-full h-full mx-auto flex items-center justify-center text-white font-bold gap-2 overflow-hidden"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      >
                        <Check size={24} strokeWidth={3} />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Success
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>

            {/* Footer */}
            <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-800/50">
              <p className="text-sm text-slate-500">
                Don't have an account?
                <button className="ml-1 font-bold text-primary hover:underline decoration-2 underline-offset-4">Register</button>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Success Overlay Animation (Hiệu ứng lan tỏa khi thành công) */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-primary flex items-center justify-center pointer-events-none"
            >
              <div className="text-white text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Fingerprint size={80} className="mx-auto mb-4 opacity-50" />
                  <h2 className="text-4xl font-black tracking-tight">Access Granted</h2>
                  <p className="text-primary-foreground/80 mt-2">Welcome to Whisper</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}