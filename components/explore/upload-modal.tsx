"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X, Loader2, Tag, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File, hashtags: string[]) => Promise<void>
  studentName?: string
}

export function UploadModal({ isOpen, onClose, onUpload, studentName }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().replace(/^#/, "").toLowerCase()
      if (!hashtags.includes(newTag)) {
        setHashtags([...hashtags, newTag])
      }
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag))
  }

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    try {
      await onUpload(file, hashtags)
      // Reset
      setFile(null)
      setPreview("")
      setHashtags([])
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-800"
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h2 className="font-semibold text-lg">Share a Moment</h2>
            {studentName && <p className="text-xs text-neutral-500">Posting as {studentName}</p>}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Image Select */}
          <div className="space-y-4">
            <div className={`
              relative w-full aspect-square rounded-xl border-2 border-dashed 
              ${preview ? 'border-transparent' : 'border-neutral-300 dark:border-neutral-700 hover:border-purple-500 transition-colors'}
              flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-800/50 overflow-hidden group cursor-pointer
            `}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0 z-10" 
              />
              
              {preview ? (
                <>
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                    Change Image
                  </div>
                </>
              ) : (
                <div className="text-center p-4 space-y-2 text-neutral-500">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-500 flex items-center justify-center mx-auto">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm">Click or drop image here</p>
                </div>
              )}
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-500 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Hashtags
            </label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
              {hashtags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-medium">
                  #{tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-purple-800"><X className="w-3 h-3" /></button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder={hashtags.length === 0 ? "Add tags (press Enter)..." : ""}
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px]"
              />
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!file || loading}
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Photo"}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
