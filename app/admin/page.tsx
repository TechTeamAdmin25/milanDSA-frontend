'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  LogOut,
  Eye,
  X,
  Filter,
  BarChart3,
  Users,
  ImageIcon
} from 'lucide-react';

interface Post {
  id: string;
  image_url: string;
  posted_by: string;
  hashtags: string[];
  upload_status: 'pending' | 'approved' | 'denied';
  created_at: string;
}

interface Stats {
  pending: number;
  approved: number;
  denied: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, denied: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [updatingPost, setUpdatingPost] = useState<string | null>(null);

  const fetchPosts = useCallback(async (filter?: string) => {
    try {
      setLoading(true);

      const url = filter && filter !== 'all'
        ? `/api/admin/posts?status=${filter}`
        : '/api/admin/posts';

      const response = await fetch(url);

      if (response.status === 401) {
        localStorage.removeItem('isAdmin');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        setPosts(data.posts);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Check authentication
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin !== 'true') {
      router.push('/admin/login');
      return;
    }
    fetchPosts();
  }, [router, fetchPosts]);

  const updatePostStatus = async (postId: string, status: 'pending' | 'approved' | 'denied') => {
    try {
      setUpdatingPost(postId);
      const token = localStorage.getItem('adminToken');

      const response = await fetch('/api/admin/posts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, status }),
      });

      if (response.status === 401) {
        localStorage.removeItem('isAdmin');
        router.push('/admin/login');
        return;
      }

      const data = await response.json();

      if (data.success) {
        // Update local state
        setPosts(posts.map(post =>
          post.id === postId ? { ...post, upload_status: status } : post
        ));

        // Update stats
        const newStats = { ...stats };
        // Decrease old status count
        newStats[posts.find(p => p.id === postId)?.upload_status as keyof Stats]--;
        // Increase new status count
        newStats[status]++;
        setStats(newStats);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setUpdatingPost(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  const getStatusBadge = useCallback((status: string) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle, label: 'Approved' },
      denied: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Denied' },
    };

    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  }, []);

  const filteredPosts = useMemo(() => {
    return selectedFilter === 'all'
      ? posts
      : posts.filter(post => post.upload_status === selectedFilter);
  }, [posts, selectedFilter]);

  return (
    <div className="min-h-screen bg-[#e9e9e9] text-black" data-admin-page>
      {/* Header */}
      <header className="bg-white border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#171717] rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage explore page posts</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-300 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.denied}</p>
                <p className="text-sm text-gray-600">Denied</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">{stats.pending + stats.approved + stats.denied}</p>
                <p className="text-sm text-gray-600">Total Posts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-black">Filter Posts</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Posts', count: stats.pending + stats.approved + stats.denied },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'approved', label: 'Approved', count: stats.approved },
              { key: 'denied', label: 'Denied', count: stats.denied },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.key
                    ? 'bg-[#171717] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-black mb-4">
            Posts ({filteredPosts.length})
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-[#171717] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={post.image_url}
                      alt={`Post by ${post.posted_by}`}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setSelectedPost(post)}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      quality={75}
                    />
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {/* Status Badge */}
                    <div className="flex justify-between items-start">
                      {getStatusBadge(post.upload_status)}
                      <span className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Posted by */}
                    <div>
                      <p className="text-sm font-medium text-black">{post.posted_by}</p>
                    </div>

                    {/* Hashtags */}
                    <div className="flex flex-wrap gap-1">
                      {post.hashtags.map((hashtag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
                        >
                          #{hashtag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                      {post.upload_status !== 'approved' && (
                        <button
                          onClick={() => updatePostStatus(post.id, 'approved')}
                          disabled={updatingPost === post.id}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                        >
                          {updatingPost === post.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <CheckCircle className="w-3 h-3" />
                          )}
                          Approve
                        </button>
                      )}

                      {post.upload_status !== 'denied' && (
                        <button
                          onClick={() => updatePostStatus(post.id, 'denied')}
                          disabled={updatingPost === post.id}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                        >
                          {updatingPost === post.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          Deny
                        </button>
                      )}

                      {post.upload_status !== 'pending' && (
                        <button
                          onClick={() => updatePostStatus(post.id, 'pending')}
                          disabled={updatingPost === post.id}
                          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
                        >
                          {updatingPost === post.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <RefreshCw className="w-3 h-3" />
                          )}
                          Undo
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Image */}
              <div className="relative aspect-square">
                <Image
                  src={selectedPost.image_url}
                  alt={`Post by ${selectedPost.posted_by}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">{selectedPost.posted_by}</h3>
                  {getStatusBadge(selectedPost.upload_status)}
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedPost.hashtags.map((hashtag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600">
                  Posted on {new Date(selectedPost.created_at).toLocaleDateString()} at{' '}
                  {new Date(selectedPost.created_at).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
