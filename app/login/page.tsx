'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  // Check for error codes returned from the callback (e.g., if they tried a personal email)
  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'InvalidDomain') {
      setErrorMsg('Access Restricted: Please use your official @srmist.edu.in email address.');
    }
  }, [searchParams]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          // THIS IS KEY: It hints Google to only show accounts from this domain
          hd: 'srmist.edu.in', 
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
    // Note: No setloading(false) on success because we redirect away
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* Background with Theme */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/BackgroundImages/AccountBackground.png"
          alt="Milan Background"
          fill
          className="object-cover opacity-60"
          priority
        />
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
        <span className="font-sans text-sm tracking-wide">BACK TO HOME</span>
      </Link>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md p-4">
        
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px]" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px]" />

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70">
              STUDENT LOGIN
            </h1>
            <p className="text-white/50 mt-2 text-sm">
              Exclusive access for SRMIST Students
            </p>
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="text-red-400 shrink-0" size={20} />
              <p className="text-sm text-red-200">{errorMsg}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {/* Simple Google Icon SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Sign in with SRM Email</span>
                </>
              )}
            </button>

            <div className="text-center">
               <p className="text-xs text-white/30 mt-4">
                 Note: Only <span className="text-white/50">@srmist.edu.in</span> accounts are authorized.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}