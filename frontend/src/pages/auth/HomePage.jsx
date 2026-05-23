import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useAuth } from '../../hooks/useAuth'
import UserProfile from '../../components/UserProfile'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [showVideos, setShowVideos] = useState(false)
    const navigate = useNavigate()
    const { user } = useAuth()

    // Only fetch videos when the user explicitly clicks "See all videos"
    const handleShowVideos = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/food/public`)
            .then(response => {
                setVideos(response.data.fooditems || response.data.foods || [])
                setShowVideos(true)
            })
            .catch(() => {
                setShowVideos(true) // show reel feed even on error (will show empty message)
            })
    }

    // Handlers for like/save (UI update only)
    async function likeVideo(item) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/food/like`, { foodId: item._id }, { withCredentials: true })
            if (response.data.like) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v))
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount || 0) - 1, 0) } : v))
            }
        } catch (err) { /* ignore */ }
    }

    async function saveVideo(item) {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/food/save`, { foodId: item._id }, { withCredentials: true })
            if (response.data.save) {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v))
            } else {
                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) } : v))
            }
        } catch (err) { /* ignore */ }
    }

    // When logged-in user clicked "See all videos", show the ReelFeed
    if (showVideos) {
        return (
            <div className="min-h-screen bg-gray-900">
                {/* Navbar */}
                <header className="bg-black/60 backdrop-blur sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                        <button onClick={() => setShowVideos(false)} className="text-2xl font-extrabold text-red-500 tracking-tight">
                            zomato
                        </button>
                        <nav className="flex items-center space-x-4 text-gray-200 text-sm">
                            {user ? (
                                <>
                                    <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
                                    <UserProfile />
                                </>
                            ) : (
                                <>
                                    <Link to="/user/login" className="hover:text-white">Login</Link>
                                    <Link to="/user/register" className="hover:text-white">Sign Up</Link>
                                    <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
                <ReelFeed
                    items={videos}
                    onLike={likeVideo}
                    onSave={saveVideo}
                    emptyMessage="No videos available."
                />
            </div>
        )
    }

    // Default: Landing page — always shown first
    return (
        <div className="min-h-screen font-sans bg-gray-900 text-white">
            {/* Navbar */}
            <header className="bg-black/60 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">zomato</Link>
                    <nav className="flex items-center space-x-4 text-gray-200 text-sm">
                        {user ? (
                            <>
                                <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
                                <UserProfile />
                            </>
                        ) : (
                            <>
                                <Link to="/user/login" className="hover:text-white">Login</Link>
                                <Link to="/user/register" className="hover:text-white">Sign Up</Link>
                                <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-4xl mx-auto px-6 py-32 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Discover the best food & drinks in your city
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                        Explore top restaurants, cafes, and bars with Zomato Clone.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link to="/user/register" className="px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition">
                            Get Started
                        </Link>
                        <Link to="/food-partner/register" className="px-8 py-4 bg-white text-red-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition">
                            Become a Partner
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-black">
                    <h3 className="text-xl font-bold mb-4">🍴 Explore Restaurants</h3>
                    <p className="text-gray-600">Find the most popular and trending places to eat in your area.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-black">
                    <h3 className="text-xl font-bold mb-4">🚚 Order Online</h3>
                    <p className="text-gray-600">Get your favorite meals delivered to your doorstep with ease.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition text-black">
                    <h3 className="text-xl font-bold mb-4">🤝 Partner With Us</h3>
                    <p className="text-gray-600">Grow your business by reaching millions of hungry customers.</p>
                </div>
            </section>

            {/* "See all videos" — only shown to logged-in users */}
            {user && (
                <div className="max-w-6xl mx-auto px-6 pb-20 text-center">
                    <button
                        onClick={handleShowVideos}
                        className="mt-6 inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700 transition"
                    >
                        See all videos
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home