'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowRight, AlertCircle, CheckCircle2, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [error, setError] = useState('')
  const [otpSentMsg, setOtpSentMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const { sendOtp, verifyOtp, loginWithGoogle, user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [returnUrl, setReturnUrl] = useState('/')
  
  useEffect(() => {
     const urlParam = searchParams.get('returnUrl')
     if (urlParam) {
         setReturnUrl(urlParam)
     } else {
         const localUrl = localStorage.getItem('redirectAfterLogin')
         if (localUrl) {
             setReturnUrl(localUrl)
             localStorage.removeItem('redirectAfterLogin') // Clear after consuming
         }
     }
  }, [searchParams])

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push(returnUrl)
    }
  }, [user, router, returnUrl])

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setOtpSentMsg('')
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await sendOtp(email)
      
      if (result.success) {
        setStep('otp')
        setOtpSentMsg(result.message || 'OTP sent! Check your inbox.')
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!otp) {
      setError('Please enter the OTP')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await verifyOtp(email, otp)
      
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push(returnUrl)
        }, 1000)
      } else {
        setError(result.message || 'Verification failed')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      if (!success) setIsSubmitting(false) // Don't Un-load if successful, wait for redirect
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setIsSubmitting(true)
    try {
      const result = await loginWithGoogle()
       if (!result.success) {
          setError(result.message || 'Google Login failed')
          setIsSubmitting(false)
       }
       // If success, we wait for redirect (handled by Supabase or Context)
    } catch {
       setError('An unexpected error occurred')
       setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden p-4">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
             <motion.h1 
               className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-2"
             >
               MILAN &apos;26
             </motion.h1>
             <p className="text-neutral-400 text-sm font-medium tracking-wide uppercase">
               Secure Login
             </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@srmist.edu.in"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20"
                      disabled={isSubmitting}
                      autoFocus
                    />
                  </div>
                   <p className="text-xs text-neutral-500 ml-1">
                    Use your SRM email for Pro Passes.
                  </p>
                </div>

                {error && (
                   <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                     <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                     <p className="text-sm text-red-200">{error}</p>
                   </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-base transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification Code</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </Button>
              </motion.form>
            ) : (
               <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6"
              >
                {/* OTP Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-200 text-xs font-medium">
                        <Mail size={12} />
                        <span>Code sent to {email}</span>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => { setStep('email'); setError(''); }}
                        className="text-xs text-neutral-500 hover:text-white underline decoration-neutral-700 underline-offset-4"
                    >
                        Change Email
                    </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 group-hover:border-white/20 tracking-widest font-mono text-lg"
                      disabled={isSubmitting || success}
                      maxLength={6}
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                   <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3">
                     <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                     <p className="text-sm text-red-200">{error}</p>
                   </div>
                )}
                
                {otpSentMsg && !error && !success && (
                   <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-3">
                     <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                     <p className="text-sm text-blue-200">{otpSentMsg}</p>
                   </div>
                )}

                {success && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-green-200">Verified! Redirecting...</p>
                    </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="w-full h-12 bg-white text-black hover:bg-neutral-200 rounded-xl font-bold text-base transition-all duration-300 relative overflow-hidden group"
                >
                   <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                        <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verifying...</span>
                        </>
                    ) : success ? (
                         <span>Success</span>
                    ) : (
                        <>
                        <span>Verify & Login</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                  </div>
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs text-neutral-500 font-medium">OR</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || success}
            className="w-full h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group"
          >
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
              <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">Sign in with Google</span>
          </button>
        </div>
      </motion.div>
    </main>
  )
}
