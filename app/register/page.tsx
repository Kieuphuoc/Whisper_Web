"use client";
import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Fingerprint, AlertCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");

    const { register, isProcessing, error } = useAuth();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ username, email, password, displayName });
        } catch (err) {
            // Error handled by hook
        }
    };

    const inputVariants = {
        rest: { width: "0%", opacity: 0 },
        focus: { width: "100%", opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <div className="light">
            <main className="relative w-screen h-screen overflow-hidden transition-colors duration-500 flex items-center justify-center font-sans selection:bg-primary/30">
                {/* Background Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-[2px] scale-110"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/c0/8b/6e/c08b6e6e2e5e1e1e1e1e1e1e1e1e1e1e.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-white/20" />

                {/* Decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -top-[10%] -right-[10%] w-[80vw] h-[80vw] bg-secondary/10 rounded-full blur-[120px]"
                    />
                </div>

                {/* Main Card */}
                <div className="relative w-full max-w-lg px-6">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative z-20 bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl shadow-primary/10 rounded-[2.5rem] p-8 md:p-10"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ rotate: -20, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-secondary to-primary rounded-2xl flex items-center justify-center text-white shadow-lg"
                            >
                                <Sparkles size={32} />
                            </motion.div>
                            <h1 className="text-2xl font-bold text-slate-800 mb-1">Join Whisper</h1>
                            <p className="text-slate-500 text-sm">Create your memory vault</p>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                                        <AlertCircle size={16} />
                                        <span>{error}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <InputGroup label="Username" icon={<Fingerprint size={18} />} value={username} onChange={setUsername} placeholder="johndoe" />
                                <InputGroup label="Display Name" icon={<User size={18} />} value={displayName} onChange={setDisplayName} placeholder="John Doe" />
                            </div>
                            <div className="space-y-6">
                                <InputGroup label="Email" icon={<Mail size={18} />} type="email" value={email} onChange={setEmail} placeholder="john@example.com" />
                                <InputGroup
                                    label="Password"
                                    icon={<Lock size={18} />}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="••••••••"
                                    suffix={
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    }
                                />
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <motion.button
                                    disabled={isProcessing}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full h-14 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                                >
                                    {isProcessing ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center pt-6 border-t border-slate-100">
                            <p className="text-sm text-slate-500">
                                Already have an account?
                                <button onClick={() => router.push("/login")} className="ml-1 font-bold text-primary hover:underline">
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

function InputGroup({ label, icon, type = "text", value, onChange, placeholder, suffix }: any) {
    const inputVariants = {
        rest: { width: "0%", opacity: 0 },
        focus: { width: "100%", opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <motion.div initial="rest" whileFocus="focus" whileHover="focus" className="group relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block group-focus-within:text-primary transition-colors">{label}</label>
            <div className="relative flex items-center">
                <div className="absolute left-0 text-slate-400 group-focus-within:text-primary transition-colors">
                    {icon}
                </div>
                <input
                    type={type}
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-3 pl-8 pr-4 text-slate-800 placeholder-slate-300 text-sm focus:outline-none transition-colors"
                    placeholder={placeholder}
                />
                {suffix && <div className="absolute right-0">{suffix}</div>}
                <motion.div variants={inputVariants} className="absolute bottom-0 left-0 h-[1.5px] bg-primary" />
            </div>
        </motion.div>
    );
}
