'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export interface User {
  email: string
  name: string
  id?: string
}

interface AuthContextType {
  user: User | null
  sendOtp: (email: string) => Promise<{ success: boolean; message?: string }>
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; message?: string }>
  loginWithGoogle: () => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize Auth State (Supabase or Local Mock)
  useEffect(() => {
    if (supabase) {
      // SUPABASE MODE
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const email = session.user.email || ''
          
          setUser({
            email,
            name: session.user.user_metadata?.full_name || email.split('@')[0],
            id: session.user.id
          })
        } else {
          setUser(null)
        }
        setIsLoading(false)
      })

      return () => subscription.unsubscribe()
    } else {
      // MOCK MODE: Check localStorage
      const storedUser = localStorage.getItem('srm_user')
      if (storedUser) {
        try {
            const parsed = JSON.parse(storedUser);
            // Simulate async load
            setTimeout(() => setUser(parsed), 100);
        } catch {
            localStorage.removeItem('srm_user');
        }
      }
      setTimeout(() => setIsLoading(false), 200)
    }
  }, [])

  const sendOtp = async (email: string) => {
    // In a real app, strict domain checking might happen here or in backend.
    // For now, we allow sending OTP to anyone, restriction applies on Purchase.
    
    if (supabase) {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (error) return { success: false, message: error.message }
      return { success: true }
    } else {
      // MOCK
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Store email temporarily for verify step
      sessionStorage.setItem('mock_otp_email', email)
      return { success: true, message: "OTP sent to console (Dev Mode)" } 
    }
  }

  const verifyOtp = async (email: string, token: string) => {
     if (supabase) {
        const { error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email'
        })
        if (error) return { success: false, message: error.message }
        // User state will be updated by onAuthStateChange
        return { success: true }
     } else {
        // MOCK
        await new Promise(resolve => setTimeout(resolve, 1000))
        const pendingEmail = sessionStorage.getItem('mock_otp_email')
        
        if (!pendingEmail || pendingEmail !== email) {
            return { success: false, message: "Email mismatch or session expired" }
        }

        if (token !== "123456") {
            return { success: false, message: "Invalid OTP (Use 123456)" }
        }

        const newUser = {
            email,
            name: email.split('@')[0]
        }
        setUser(newUser)
        localStorage.setItem('srm_user', JSON.stringify(newUser))
        sessionStorage.removeItem('mock_otp_email')
        
        return { success: true }
     }
  }

  const loginWithGoogle = async () => {
    // We allow any Google login here.
    // Restrictions for Pro/Single passes are handled at the purchase/button level.
    
    if (supabase) {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      
      if (error) return { success: false, message: error.message }
      return { success: true }
    } else {
      // MOCK OAUTH
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Randomly decide if it's SRM or not for testing variety? 
      // Or just default to SRM. Let's default to SRM as it's the happy path.
      // But developer might want to test rejection.
      
      const mockGoogleEmail = "student@srmist.edu.in" 
      
      const newUser = {
        email: mockGoogleEmail,
        name: "SRM Student"
      }
      setUser(newUser)
      localStorage.setItem('srm_user', JSON.stringify(newUser))
      return { success: true }
    }
  }

  const logout = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    setUser(null)
    localStorage.removeItem('srm_user')
    sessionStorage.removeItem('mock_otp_email')
    router.push('/')
  }, [router])

  // Auto-logout on inactivity (15 minutes)
  useEffect(() => {
    if (!user) return

    let timeoutId: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        logout()
      }, 15 * 60 * 1000) // 15 minutes
    }

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
    events.forEach(event => window.addEventListener(event, resetTimer))
    
    resetTimer()

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer))
      clearTimeout(timeoutId)
    }
  }, [user, logout])

  return (
    <AuthContext.Provider value={{ user, sendOtp, verifyOtp, loginWithGoogle, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
