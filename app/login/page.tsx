"use client";

import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-[#dfe7ff] via-[#edf1ff] to-white">
      {/* Background light effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(114,130,255,0.18),_transparent_70%)]" />

      {/* Center card */}
      <div className="absolute inset-0 flex items-center justify-center z-[200]">
        <div
          className="w-[420px] bg-white/70 backdrop-blur-2xl border border-white/50
          shadow-[0_25px_60px_rgba(70,80,160,0.25)] rounded-3xl p-10 space-y-8"
        >
          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4a56e2] to-[#8893ff]
              bg-clip-text text-transparent">
              Whisper Login
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              A location-based audio journal
            </p>
          </div>

          {/* Input Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600">Email</label>
            <div className="flex items-center gap-3 bg-white/60 border border-white/90 rounded-2xl px-4 py-3 shadow-inner">
              <Mail size={18} className="text-gray-500" />
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-600">
              Password
            </label>
            <div className="flex items-center gap-3 bg-white/60 border border-white/90 rounded-2xl px-4 py-3 shadow-inner">
              <Lock size={18} className="text-gray-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Button Login */}
          <button
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#4a56e2] to-[#8893ff]
            text-white font-semibold flex items-center justify-center gap-2
            shadow-[0_15px_30px_rgba(74,86,226,0.38)]"
          >
            Login
            <ArrowRight size={18} />
          </button>

          {/* Forgot + Register */}
          <div className="text-center">
            <button className="text-xs text-gray-500 hover:text-gray-700">
              Forgot password?
            </button>

            <p className="mt-3 text-xs text-gray-600">
              Don't have an account?
              <span className="ml-1 text-[#4a56e2] font-semibold cursor-pointer">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
