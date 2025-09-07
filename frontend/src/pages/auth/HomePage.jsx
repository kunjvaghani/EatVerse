// import React, { useRef } from 'react'
// import { Link  , useNavigate} from 'react-router-dom'
// import axios from 'axios'

// const videos = [
//   {
//     id: 1,
//     src: 'https://ik.imagekit.io/bnycasdu0/14c4c036-31ae-46d5-bef5-85efcf08f4f6_4TgjIoSIb',
//     desc: 'Hot and spicy chicken wings with secret house sauce — order now and get 20% off!',
//     store: '/store/1'
//   },
//   {
//     id: 2,
//     src: 'https://ik.imagekit.io/bnycasdu0/085c1090-7cc5-47eb-93b5-ec0ff406a1ba_QxxQd_KIE',
//     desc: 'Freshly baked sourdough pizzas with melted cheese and basil — limited time offer.',
//     store: '/store/2'
//   },
//   {
//     id: 3,
//     src: 'https://ik.imagekit.io/bnycasdu0/3f170d86-2f55-4d39-b2ca-855004d4adf1_kI677I89NF',
//     desc: 'Cold brew coffee & artisan pastries — perfect combo for your morning!',
//     store: '/store/3'
//   }
// ]

// const HomePage = () => {
//   const containerRef = useRef(null)

//   return (
//     <div className="min-h-screen font-sans bg-gray-900 text-white">
//       {/* Navbar */}
//       <header className="bg-black/60 backdrop-blur sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//           <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">zomato</Link>
//           <nav className="space-x-4 text-gray-200 text-sm">
//             <Link to="/user/login" className="hover:text-white">Login</Link>
//             <Link to="/user/register" className="hover:text-white">Sign Up</Link>
//             <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
//           </nav>
//         </div>
//       </header>

//       {/* Reels section: full-screen vertical videos with snapping */}
//       <main ref={containerRef} className="h-[calc(100vh-56px)] overflow-y-auto snap-y snap-mandatory touch-pan-y">
//         {videos.map(video => (
//           <section key={video.id} className="relative snap-start h-screen w-full bg-black flex items-center justify-center">
//             {/* Video element */}
//             <video
//               className="absolute inset-0 w-full h-full object-cover"
//               src={video.src}
//               playsInline
//               muted
//               loop
//               autoPlay
//             />

//             {/* Bottom gradient overlay with safe-area padding for mobile */}
//             <div className="absolute bottom-0 left-0 right-0 z-20">
//               <div className="bg-gradient-to-t from-black/70 to-transparent px-4 py-4"
//                    style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
//                 <div className="mx-auto max-w-3xl text-white">
//                   <div
//                     className="text-sm leading-5"
//                     style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
//                   >
//                     {video.desc}
//                   </div>

//                   <div>
//                     <Link to={video.store} className="inline-block bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-md shadow">Visit store</Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         ))}
//       </main>
//     </div>
//   )
// }

// export default HomePage
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
        const [ videos, setVideos ] = useState([])
        const [ showVideos, setShowVideos ] = useState(false)

        // fetch available videos (public endpoint)
        useEffect(() => {
                axios.get("http://localhost:3000/api/food/public")
                        .then(response => {
                                // API expected shape: { fooditems: [...] }
                                setVideos(response.data.fooditems || [])
                        })
                        .catch(() => { /* noop: optionally handle error */ })
        }, [])

        // Handlers for like/save (UI update only)
        async function likeVideo(item) {
                try{
                        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })
                        if(response.data.like){
                                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount||0) + 1 } : v))
                        }else{
                                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount||0) - 1, 0) } : v))
                        }
                }catch(err){ /* ignore */ }
        }

        async function saveVideo(item) {
                try{
                        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
                        if(response.data.save){
                                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount||0) + 1 } : v))
                        }else{
                                setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max((v.savesCount||0) - 1, 0) } : v))
                        }
                }catch(err){ /* ignore */ }
        }

        // Initial UI shown before videos: navbar, hero and features (from commented code)
        if(!showVideos){
                return (
                        <div className="min-h-screen font-sans bg-gray-900 text-white">
                            {/* Navbar */}
                            <header className="bg-black/60 backdrop-blur sticky top-0 z-50">
                                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                                    <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">zomato</Link>
                                    <nav className="space-x-4 text-gray-200 text-sm">
                                        <Link to="/user/login" className="hover:text-white">Login</Link>
                                        <Link to="/user/register" className="hover:text-white">Sign Up</Link>
                                        <Link to="/food-partner/login" className="hover:text-white">Partner</Link>
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

                            {/* CTA to show videos */}
                            <div className="max-w-6xl mx-auto px-6 pb-20 text-center">
                                <button
                                    onClick={() => setShowVideos(true)}
                                    className="mt-6 inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-md hover:bg-red-700"
                                >
                                    See all videos
                                </button>
                            </div>
                        </div>
                )
        }

        // When showVideos is true, render the ReelFeed
        return (
                <ReelFeed
                        items={videos}
                        onLike={likeVideo}
                        onSave={saveVideo}
                        emptyMessage="No videos available."
                />
        )
}

export default Home