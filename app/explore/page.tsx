"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Search, TrendingUp, X } from "lucide-react";
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
  // const [totalPosts, setTotalPosts] = useState(0);
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
        // setTotalPosts(postsData.total_count);
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
    <div className="min-h-screen bg-[#F5F5F7] text-neutral-900 pb-20 selection:bg-purple-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100/40 via-transparent to-transparent" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100/40 via-transparent to-transparent" />
      </div>

      {/* Header Section */}
      <div className="relative pt-32 pb-6 px-4 mb-4 flex flex-col items-center z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mb-6 inline-block"
            >
                <span className="px-4 py-2 rounded-full border border-neutral-200 bg-white/50 backdrop-blur text-sm font-medium tracking-wide uppercase text-neutral-500 inline-flex items-center gap-2 shadow-sm">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Discover More
                </span>
            </motion.div>

             <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 mb-6">
                Explore<span className="text-purple-500">.</span>
            </h1>
            <p className="text-xl text-neutral-500 font-light">
                Discover the latest buzz, trends, and moments from Milan &apos;26
            </p>
        </motion.div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative group z-20">
             <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <form onSubmit={handleSearch} className="relative flex items-center">
                <Search className="absolute left-6 w-5 h-5 text-neutral-400 group-focus-within:text-purple-600 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search for hashtags, events, or people..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-12 py-5 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg text-lg placeholder:text-neutral-400 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 outline-none transition-all"
                />
                {searchQuery && (
                    <button type="button" onClick={clearSearch} className="absolute right-6 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </form>
        </div>

        {/* Desktop Trending Tags */}
        <div className="hidden md:flex items-center gap-3 mt-6">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-neutral-500 mr-2">Trending:</span>
            {trendingHashtags.slice(0, 4).map(tag => (
                <button 
                    key={tag.hashtag}
                    onClick={() => { setSearchQuery(tag.hashtag); fetchPosts(tag.hashtag) }}
                    className="px-3 py-1 bg-white/50 border border-neutral-200 rounded-full text-xs font-medium text-neutral-600 hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all"
                >
                    #{tag.hashtag}
                </button>
            ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Mobile Trending Toggle */}
         <div className="md:hidden mb-6 flex justify-center">
            <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full text-sm font-medium text-purple-600 border border-purple-100"
                onClick={() => setMobileTrendingOpen(!mobileTrendingOpen)}
            >
                <TrendingUp className="w-4 h-4" /> 
                <span>Trending Topics</span>
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