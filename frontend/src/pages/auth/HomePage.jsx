import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useAuth } from '../../hooks/useAuth'

import EnhancedNavbar from '../../components/EnhancedNavbar'
import HeroSection from '../../components/HeroSection'
import FeaturesSection from '../../components/FeaturesSection'
import StatsSection from '../../components/StatsSection'
import TestimonialsSection from '../../components/TestimonialsSection'
import CTASection from '../../components/CTASection'
import PremiumFooter from '../../components/PremiumFooter'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [showVideos, setShowVideos] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    // Fetch videos only when user explicitly clicks "See all videos"
    const handleShowVideos = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/food/public`)
            setVideos(response.data.fooditems || response.data.foods || [])
        } catch (err) {
            // ignore — will show empty message
        }
        setLoading(false)
        setShowVideos(true)
    }

    // Handlers for like/save (UI update only)
    const likeVideo = async (item) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/food/like`,
                { foodId: item._id },
                { withCredentials: true }
            )
            if (response.data.like) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v))
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount || 0) - 1, 0) } : v))
            }
        } catch (err) { /* ignore */ }
    }

    const saveVideo = async (item) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/food/save`,
                { foodId: item._id },
                { withCredentials: true }
            )
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v))
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) } : v))
            }
        } catch (err) { /* ignore */ }
    }

    // Show ReelFeed when user clicked "See all videos" — fullscreen, no navbar
    if (showVideos) {
        return (
            <div className="fixed inset-0 bg-black z-40">
                {/* Floating back button top-left — small and unobtrusive */}
                <button
                    onClick={() => setShowVideos(false)}
                    className="absolute top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-black/70 transition"
                >
                    ← Back
                </button>
                <ReelFeed
                    items={videos}
                    onLike={likeVideo}
                    onSave={saveVideo}
                    emptyMessage="No videos available."
                />
            </div>
        )
    }

    // Default: Full premium landing page
    return (
        <div className="min-h-screen bg-black">
            {/* Premium sticky navbar with scroll effect */}
            <EnhancedNavbar user={user} />

            {/* Hero with animated cards and CTAs */}
            <HeroSection user={user} navigate={navigate} onShowVideos={handleShowVideos} />

            {/* Features grid */}
            <FeaturesSection />

            {/* Animated stats counter */}
            <StatsSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* CTA for users & partners */}
            <CTASection />

            {/* "See all videos" — only for logged-in users */}
            {user && (
                <div className="py-16 text-center bg-gradient-to-b from-gray-900 to-black">
                    <p className="text-gray-400 mb-6 text-lg">Ready to explore food videos?</p>
                    <button
                        onClick={handleShowVideos}
                        disabled={loading}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin">⏳</span> Loading...
                            </>
                        ) : (
                            <>
                                <span>🎬</span> See All Videos
                            </>
                        )}
                    </button>
                </div>
            )}

            {/* Premium footer */}
            <PremiumFooter />
        </div>
    )
}

export default Home