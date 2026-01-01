"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles, X, Wand2, Download, Share2, Loader2, RefreshCw, MapPin, Star, Image as ImageIcon, Upload } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface AIGeneratorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIGeneratorModal({ isOpen, onClose }: AIGeneratorModalProps) {
  const [prompt, setPrompt] = useState("")
  const [venue, setVenue] = useState("Main Stage")
  const [features, setFeatures] = useState<string[]>([])
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  
  // Image to text/edit feature
  const [baseImage, setBaseImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock styles for generation
  const styles = [
    "Cyberpunk", "Watercolor", "Realistic", "Anime", "Oil Painting", "Neon"
  ]
  const [selectedStyle, setSelectedStyle] = useState("Realistic")

  const toggleFeature = (feature: string) => {
      if (features.includes(feature)) {
          setFeatures(features.filter(f => f !== feature));
      } else {
          setFeatures([...features, feature]);
      }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setBaseImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  }

  const handleGenerate = () => {
    setGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      // Construct a query based on inputs to get a relevant placeholder
      const baseQuery = [venue, ...features, selectedStyle, prompt].filter(Boolean).join(",");
      // Use unsplash random with these keywords
      // If base image exists, we pretend we edited it. In a real app we'd send the image to an API.
      setGeneratedImage(`https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop&text=${encodeURIComponent(baseQuery)}`)
      setGenerating(false)
    }, 2500)
  }

  const handleClose = () => {
      setGeneratedImage(null)
      setBaseImage(null)
      setPrompt("")
      setFeatures([])
      setVenue("Main Stage")
      setGenerating(false)
      onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="font-semibold text-lg">Milan AI Studio</h2>
          </div>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
            {!generatedImage ? (
                <>
                    {/* Image Upload Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-500 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" /> Reference Image (Optional)
                        </label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="relative w-full h-32 border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group overflow-hidden"
                        >
                             {baseImage ? (
                                <Image src={baseImage} alt="Reference" fill className="object-cover opacity-50 group-hover:opacity-40" />
                             ) : null}
                             <div className="relative z-10 flex flex-col items-center gap-2 text-neutral-500 group-hover:text-purple-600 transition-colors">
                                <Upload className="w-6 h-6" />
                                <span className="text-xs font-medium">{baseImage ? "Change Image" : "Upload Reference Photo"}</span>
                             </div>
                             <input 
                                ref={fileInputRef}
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImageUpload}
                             />
                        </div>
                    </div>

                    {/* Venue Selection */}
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-neutral-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Location
                        </label>
                        <select 
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-purple-500/50"
                        >
                            <option>Main Stage</option>
                            <option>TP Ganesan Auditorium</option>
                            <option>Tech Park Plaza</option>
                            <option>Java Canteen</option>
                            <option>Biotech Block</option>
                        </select>
                    </div>

                    {/* Features Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-500 flex items-center gap-2">
                            <Star className="w-4 h-4" /> Special Features
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {["Stars", "Fireworks", "Crowd", "Laser Show", "Celebrity"].map(feature => (
                                <button
                                    key={feature}
                                    onClick={() => toggleFeature(feature)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all border ${
                                        features.includes(feature)
                                        ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-500 text-indigo-600 dark:text-indigo-300"
                                        : "bg-transparent border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400"
                                    }`}
                                >
                                    {feature}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-500">Custom Prompt</label>
                        <textarea 
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Add extra details... e.g. 'Cyberpunk vibe with neon rain'" 
                            className="w-full h-24 p-4 rounded-xl resize-none bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-500">Art Style</label>
                        <div className="flex flex-wrap gap-2">
                            {styles.map(style => (
                                <button
                                    key={style}
                                    onClick={() => setSelectedStyle(style)}
                                    className={`px-4 py-2 text-xs rounded-full transition-all ${
                                        selectedStyle === style 
                                        ? "bg-purple-500 text-white shadow-md shadow-purple-500/20" 
                                        : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                    }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button 
                        onClick={handleGenerate}
                        disabled={generating}
                        className="w-full py-6 text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg shadow-purple-500/25 transition-all"
                    >
                        {generating ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>{baseImage ? "Remixing Reality..." : "Dreaming..."}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Wand2 className="w-5 h-5" />
                                <span>{baseImage ? "Generate from Image" : "Generate Magic"}</span>
                            </div>
                        )}
                    </Button>
                </>
            ) : (
                <div className="flex flex-col items-center space-y-6">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-2xl group">
                         <Image 
                            src={generatedImage} 
                            alt="Generated Art" 
                            fill 
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                             <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border-none">
                                <Download className="w-5 h-5" />
                             </Button>
                             <Button variant="secondary" size="icon" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border-none">
                                <Share2 className="w-5 h-5" />
                             </Button>
                        </div>
                    </div>
                    
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 py-6 rounded-xl border-neutral-200 dark:border-neutral-700"
                            onClick={() => setGeneratedImage(null)}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                        <Button 
                             className="flex-1 py-6 rounded-xl bg-purple-500 hover:bg-purple-600 text-white"
                             onClick={() => {
                                 // Logic to share/post
                                 onClose()
                             }}
                        >
                            Post to Explore
                        </Button>
                    </div>
                </div>
            )}
        </div>
      </motion.div>
    </div>
  )
}
