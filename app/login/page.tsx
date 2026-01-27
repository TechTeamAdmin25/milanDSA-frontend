"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");
  const [otpSentMsg, setOtpSentMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [returnUrl, setReturnUrl] = useState("/");

  const { sendOtp, verifyOtp, loginWithGoogle, user } = useAuth();
  const router = useRouter();

  /* ✅ SAFE: browser-only query parsing */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get("returnUrl");

    if (urlParam) {
      setReturnUrl(urlParam);
    } else {
      const localUrl = localStorage.getItem("redirectAfterLogin");
      if (localUrl) {
        setReturnUrl(localUrl);
        localStorage.removeItem("redirectAfterLogin");
      }
    }
  }, []);

  /* Redirect if already logged in */
  useEffect(() => {
    if (user) {
      router.push(returnUrl);
    }
  }, [user, router, returnUrl]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOtpSentMsg("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendOtp(email);
      if (result.success) {
        setStep("otp");
        setOtpSentMsg(result.message || "OTP sent! Check your inbox.");
      } else {
        setError(result.message || "Failed to send OTP");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await verifyOtp(email, otp);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => router.push(returnUrl), 1000);
      } else {
        setError(result.message || "Verification failed");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      if (!success) setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        setError(result.message || "Google Login failed");
        setIsSubmitting(false);
      }
    } catch {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl p-8">
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email"
                onSubmit={handleSendOtp}
                className="space-y-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@srmist.edu.in"
                  className="w-full p-3 rounded-xl bg-white/5 text-white"
                />

                {error && (
                  <div className="flex gap-2 text-red-400 text-sm">
                    <AlertCircle /> {error}
                  </div>
                )}

                <Button
                  disabled={isSubmitting}
                  className="w-full">
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="otp"
                onSubmit={handleVerifyOtp}
                className="space-y-6">
                <input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="w-full p-3 rounded-xl bg-white/5 text-white tracking-widest"
                  maxLength={6}
                />

                {success && (
                  <div className="flex gap-2 text-green-400 text-sm">
                    <CheckCircle2 /> Verified! Redirecting…
                  </div>
                )}

                <Button
                  disabled={isSubmitting || success}
                  className="w-full">
                  Verify & Login
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full mt-6">
            Sign in with Google
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
