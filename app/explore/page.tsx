// app/explore/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Plus, Sparkles, Search, TrendingUp, X } from "lucide-react";
import { ExploreFeed, Post } from "@/components/explore/explore-feed";
import { UploadModal } from "@/components/explore/upload-modal";
import { AIGeneratorModal } from "@/components/explore/ai-generator-modal";

interface TrendingHashtag {
  hashtag: string;
  count: number;
}

export default function ExplorePage() {
  const [student] = useState<{ full_name: string } | null>(() => {
    if (typeof window === "undefined") return null;
    
    const storedName = localStorage.getItem("studentName");
    const studentEmail = localStorage.getItem("studentEmail");

    if (storedName) {
      return { full_name: storedName };
    } else if (studentEmail) {
      const nameFromEmail = studentEmail
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .split(" ")
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
      return { full_name: nameFromEmail || "Student" };
    }

    // Guest Mode for Explore Page Demo
    return { full_name: "Guest Explorer" };
  });
  
  // Data State
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [trendingHashtags, setTrendingHashtags] = useState<TrendingHashtag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [mobileTrendingOpen, setMobileTrendingOpen] = useState(false);



  // Fetch posts
  const fetchPosts = useCallback(async (query: string = "") => {
    try {
      setLoading(true);
      const url = query 
        ? `/api/explore/posts?hashtag=${encodeURIComponent(query)}`
        : "/api/explore/posts";
      
      const postsResponse = await fetch(url);
      const postsData = await postsResponse.json();

      if (postsData.success) {
        setPosts(postsData.posts);
        setTotalPosts(postsData.total_count);
      }

      // Only fetch trending once or if needed
      if (!query) {
        const trendingResponse = await fetch("/api/explore/trending?limit=5");
        const trendingData = await trendingResponse.json();
        if (trendingData.success) {
            setTrendingHashtags(trendingData.trending);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Use setTimeout to avoid 'setState synchronously within an effect' warning
    // This pushes the state update to the next tick after mount
    const timer = setTimeout(() => {
      fetchPosts("");
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchPosts]); // fetchPosts is stable now


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    fetchPosts("");
  };

  const handleUpload = async (file: File, hashtags: string[]) => {
    if (!student) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("hashtags", JSON.stringify(hashtags));
    formData.append("posted_by", student.full_name);

    const response = await fetch("/api/explore/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      fetchPosts(); 
    } else {
      throw new Error(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-neutral-900 dark:text-neutral-100 pt-20 pb-20">
      
      {/* Top Bar for Mobile / Desktop Filters */}
      <div className="sticky top-20 z-40 bg-gray-50/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 px-4 py-3 mb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-purple-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search hashtags, events..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-sm"
                />
                {searchQuery && (
                    <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </form>

            {/* Trending Tags (Desktop) */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto no-scrollbar">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                {trendingHashtags.slice(0, 4).map(tag => (
                    <button 
                        key={tag.hashtag}
                        onClick={() => { setSearchQuery(tag.hashtag); fetchPosts(tag.hashtag) }}
                        className="px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs hover:border-purple-500 hover:text-purple-500 transition-colors whitespace-nowrap"
                    >
                        #{tag.hashtag}
                    </button>
                ))}
            </div>

            {/* Mobile Trending Toggle */}
             <button 
                className="md:hidden self-start text-xs font-medium text-purple-500 flex items-center gap-1"
                onClick={() => setMobileTrendingOpen(!mobileTrendingOpen)}
            >
                <TrendingUp className="w-3 h-3" /> Trending
            </button>
        </div>
        
        {/* Mobile Trending Expanded */}
        <AnimatePresence>
            {mobileTrendingOpen && (
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="md:hidden mt-3 overflow-hidden"
                >
                     <div className="flex flex-wrap gap-2 pb-2">
                        {trendingHashtags.map(tag => (
                            <button 
                                key={tag.hashtag}
                                onClick={() => { setSearchQuery(tag.hashtag); fetchPosts(tag.hashtag); setMobileTrendingOpen(false) }}
                                className="px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 text-xs"
                            >
                                #{tag.hashtag}
                            </button>
                        ))}
                     </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Main Feed */}
      <ExploreFeed posts={posts} loading={loading} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        {/* AI Gen Button */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAiModalOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="sr-only">AI Generate</span>
        </motion.button>

        {/* Upload Button */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setUploadModalOpen(true)}
            className="w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center"
        >
            <Plus className="w-7 h-7" />
             <span className="sr-only">Upload</span>
        </motion.button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {uploadModalOpen && (
            <UploadModal 
                isOpen={uploadModalOpen} 
                onClose={() => setUploadModalOpen(false)} 
                onUpload={handleUpload}
                studentName={student?.full_name}
            />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aiModalOpen && (
            <AIGeneratorModal 
                isOpen={aiModalOpen} 
                onClose={() => setAiModalOpen(false)}
            />
        )}
      </AnimatePresence>
    </div>
  );
}

