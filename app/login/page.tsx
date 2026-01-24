'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; // Ensure you have this installed
import { ArrowLeft, Loader2 } from 'lucide-react'; // Assuming you use lucide-react for icons

// If you have a specific Glass component export, import it here. 
// Otherwise, I've recreated the style using Tailwind classes based on your theme.

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message); // Replace with your toast component if available
      setLoading(false);
    } else {
      router.push('/'); // Redirect to home or dashboard after login
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* Background Image Matching Your Theme */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundImages/AccountBackground.png" // Using the image from your public folder
          alt="Milan Background"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 backdrop-blur-md">
          <ArrowLeft size={20} />
        </div>
        <span className="font-grotesk text-sm tracking-wide">BACK TO HOME</span>
      </Link>

      {/* Login Container - Using Glassmorphism */}
      <div className="relative z-10 w-full max-w-md p-1">
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-[50px]" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/30 rounded-full blur-[50px]" />

        {/* The Glass Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-grotesk bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
              WELCOME BACK
            </h1>
            <p className="text-white/50 mt-2 text-sm">
              Sign in to access your Milan 2026 account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@milan.com"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-white placeholder:text-white/20 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white/60 ml-1">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-white placeholder:text-white/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/40">
              Don't have an account?{' '}
              <Link href="/register" className="text-white hover:underline decoration-white/50 underline-offset-4">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}