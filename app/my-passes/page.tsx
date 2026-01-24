'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Ticket, Calendar, QrCode, Share2, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock Data Type
interface PurchasedPass {
    id: string
    title: string
    type: 'events' | 'single' | 'pro'
    purchaseDate: string
    qrCode: string
    status: 'active' | 'used' | 'expired'
}

export default function MyPassesPage() {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const [passes, setPasses] = useState<PurchasedPass[]>([])

    // Protect Route & Load Data
    useEffect(() => {
        if (isLoading) return
        if (!user) {
            router.push('/login?returnUrl=/my-passes')
            return
        }

        // Mock Loading Passes
        // In a real app, fetch from API /api/my-passes
        // For now, we simulate a list, maybe specific to user email domain
        const mockPasses: PurchasedPass[] = [
            {
                id: 'MP-2026-001',
                title: 'Events Pass',
                type: 'events',
                purchaseDate: '2026-01-20',
                qrCode: 'mock-qr-data',
                status: 'active'
            }
        ]

        // Add dummy special passes for SRM students to verify layout
        if (user.email.endsWith('@srmist.edu.in')) {
             mockPasses.push({
                id: 'MP-2026-002',
                title: 'Pro-Show Pass (Day 3)',
                type: 'pro',
                purchaseDate: '2026-01-22',
                qrCode: 'mock-qr-pro',
                status: 'active'
             })
        }

        setTimeout(() => setPasses(mockPasses), 0)

    }, [user, isLoading, router])

    if (isLoading || !user) return null

    return (
        <main className="min-h-screen bg-neutral-950 pt-28 pb-12 px-4">
            <div className="container mx-auto max-w-5xl">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-2">My Passes</h1>
                        <p className="text-neutral-400">Manage and access your tickets for Milan &apos;26</p>
                    </div>
                </div>

                {/* Pass List */}
                {passes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {passes.map((pass, index) => (
                            <motion.div
                                key={pass.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group overflow-hidden bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col md:flex-row gap-6 hover:border-white/20 transition-all duration-300"
                            >
                                {/* Left Side: Pass Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                                            pass.type === 'pro' ? 'bg-amber-500/10 text-amber-200 border-amber-500/20' :
                                            pass.type === 'single' ? 'bg-purple-500/10 text-purple-200 border-purple-500/20' :
                                            'bg-blue-500/10 text-blue-200 border-blue-500/20'
                                        }`}>
                                            {pass.type} Pass
                                        </div>
                                        <span className="text-xs text-neutral-500 font-mono">#{pass.id}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">{pass.title}</h3>
                                        <p className="text-sm text-neutral-400 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> Purchased on {pass.purchaseDate}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex gap-3">
                                       <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                                          <Share2 className="w-4 h-4 mr-2" /> Share
                                       </Button>
                                       <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                                          <Download className="w-4 h-4 mr-2" /> Download PDF
                                       </Button>
                                    </div>
                                </div>

                                {/* Right Side: QR Code Area */}
                                <div className="md:w-1/3 flex flex-col items-center justify-center bg-white/5 rounded-2xl p-4 border border-white/5 relative">
                                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-3">
                                        {/* Placeholder for QR Code */}
                                        <QrCode className="w-20 h-20 text-black opacity-80" />
                                    </div>
                                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest text-center">Scan at Entrance</p>
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-2 right-2">
                                         <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 bg-neutral-900/30 rounded-3xl border border-white/5">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                            <Ticket className="w-10 h-10 text-neutral-600" />
                        </div>
                        <div>
                             <h3 className="text-xl font-bold text-white mb-2">No Passes Found</h3>
                             <p className="text-neutral-400 max-w-md mx-auto">You haven&apos;t purchased any passes yet. Secure your spot at Milan &apos;26 now!</p>
                        </div>
                        <Button onClick={() => router.push('/passes')} className="bg-white text-black hover:bg-neutral-200">
                            Get Passes <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}

            </div>
        </main>
    )
}
