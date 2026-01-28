"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight, Fingerprint, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isProcessing, error } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      // Redirect is handled by AuthContext upon successful login
    } catch (err) {
      // Error is handled by useAuth state
    }
  };

  const inputVariants = {
    rest: { width: "0%", opacity: 0 },
    focus: { width: "100%", opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="light">
      <main className="relative w-screen h-screen overflow-hidden transition-colors duration-500 flex items-center justify-center font-sans selection:bg-primary/30">
        {/* Nền blur */}
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[2px] scale-110"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/cf/be/f7/cfbef7ee6088cac3e2e6c01cfe57bfed.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/10" />

        {/* === BACKGROUND DECORATIONS === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-500/20 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* === MAIN CONTAINER === */}
        <div className="relative w-full max-w-md px-6">
          <motion.div
            animate={{ rotate: -3, scale: 0.95 }}
            className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-sm transform translate-y-4 translate-x-4 z-0"
          />
          <motion.div
            animate={{ rotate: 2, scale: 0.98 }}
            className="absolute inset-0 bg-white/40 rounded-[2.5rem] border border-white/20 backdrop-blur-sm z-10"
          />

          {/* === FORM CARD === */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-20 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-primary/10 rounded-[2rem] p-8 md:p-10 overflow-hidden"
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
              <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h1>
              <p className="text-slate-500 text-sm">Please sign in to continue</p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <motion.div initial="rest" whileFocus="focus" whileHover="focus" className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-focus-within:text-primary transition-colors">Email</label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-0 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    //required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-3 pl-8 pr-4 text-slate-800 placeholder-transparent focus:outline-none transition-colors border-opacity-50"
                    placeholder="Enter email"
                  />
                  <motion.div variants={inputVariants} className="absolute bottom-0 left-0 h-[2px] bg-primary" />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div initial="rest" whileFocus="focus" whileHover="focus" className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-focus-within:text-primary transition-colors">Password</label>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-0 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-3 pl-8 pr-10 text-slate-800 placeholder-transparent focus:outline-none transition-colors border-opacity-50"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 p-2 text-slate-400 hover:text-primary transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <motion.div variants={inputVariants} className="absolute bottom-0 left-0 h-[2px] bg-primary" />
                </div>
              </motion.div>

              {/* Action Button */}
              <div className="h-14 relative mt-8">
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.button
                      key="idle"
                      type="submit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-full rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 group overflow-hidden"
                    >
                      <span className="relative z-10">Sign In</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?
                <button
                  onClick={() => router.push("/register")}
                  className="ml-1 font-bold text-primary hover:underline decoration-2 underline-offset-4"
                >
                  Register
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
