"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react"

export interface Post {
  id: string;
  image_url: string;
  hashtags: string; // JSON string
  posted_by: string;
  created_at: string;
  student_name: string;
  caption?: string; 
}

interface ExploreFeedProps {
  posts: Post[]
  loading: boolean
}

export function ExploreFeed({ posts, loading }: ExploreFeedProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-0 md:px-4 py-6">
        {/* Masonry-ish Grid (css columns) */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-4"
              onClick={() => setSelectedPost(post)}
            >
              <Image
                src={post.image_url}
                alt={post.caption || "Event photo"}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium truncate">@{post.student_name || post.posted_by}</p>
                {post.hashtags && (
                   <div className="text-xs text-white/80 truncate mt-1">
                      {(() => {
                        try {
                          const tags = JSON.parse(post.hashtags);
                          return Array.isArray(tags) ? tags.map((tag: string) => `#${tag} `) : "";
                        } catch {
                            return "";
                        }
                      })()}
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                <p>No posts found. Be the first to share a moment!</p>
            </div>
        )}
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-black md:bg-white md:dark:bg-neutral-900 md:rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
               <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full md:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="flex-1 bg-black flex items-center justify-center relative min-h-[50vh]">
                <Image
                  src={selectedPost.image_url}
                  alt={selectedPost.caption || "Event detail"}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Details Side (Desktop) / Bottom Sheet (Mobile - simplified here as just bottom section) */}
              <div className="w-full md:w-[350px] flex-shrink-0 bg-white dark:bg-neutral-900 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                            {(selectedPost.student_name || selectedPost.posted_by || "A").charAt(0)}
                        </div>
                        <span className="font-semibold text-sm">{selectedPost.student_name || selectedPost.posted_by}</span>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-neutral-500" />
                </div>

                {/* Comments / Caption Area */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                        <div className="text-sm">
                            <span className="font-semibold mr-2">{selectedPost.student_name || selectedPost.posted_by}</span>
                             <span className="text-neutral-600 dark:text-neutral-300">
                                {(() => {
                                    try {
                                        const tags = JSON.parse(selectedPost.hashtags);
                                        return Array.isArray(tags) ? tags.map((tag: string) => (
                                            <span key={tag} className="text-blue-500 mr-1">#{tag}</span>
                                        )) : null;
                                    } catch {
                                        return null;
                                    }
                                })()}
                            </span>
                        </div>
                        
                        {/* Mock Comments */}
                        <div className="text-sm text-neutral-500 space-y-2 pt-4">
                            <p><span className="font-semibold text-neutral-900 dark:text-neutral-200">alex_design</span> Amazing shot! 🔥</p>
                            <p><span className="font-semibold text-neutral-900 dark:text-neutral-200">srm_vibes</span> Can&apos;t wait for the next event.</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <button className="hover:text-red-500 transition-colors"><Heart className="w-6 h-6" /></button>
                            <button className="hover:text-blue-500 transition-colors"><MessageCircle className="w-6 h-6" /></button>
                            <button className="hover:text-green-500 transition-colors"><Share2 className="w-6 h-6" /></button>
                        </div>
                    </div>
                    <div className="text-xs text-neutral-400 uppercase font-medium">
                        {new Date(selectedPost.created_at).toLocaleDateString()}
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}