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
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.fooditems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

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