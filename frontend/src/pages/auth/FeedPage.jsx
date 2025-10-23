import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import '../../styles/reels.css'

const FeedPage = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/food/public`)
      .then(response => {
        setVideos(response.data.fooditems || [])
      })
      .catch(() => {})
  }, [])

  async function likeVideo(item) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/food/like`, { foodId: item._id }, { withCredentials: true })
      if (response.data.like) {
        setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: (v.likeCount || 0) + 1 } : v))
      } else {
        setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: Math.max((v.likeCount || 0) - 1, 0) } : v))
      }
    } catch (err) { }
  }

  async function saveVideo(item) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/food/save`, { foodId: item._id }, { withCredentials: true })
      if (response.data.save) {
        setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: (v.savesCount || 0) + 1 } : v))
      } else {
        setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max((v.savesCount || 0) - 1, 0) } : v))
      }
    } catch (err) { }
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

export default FeedPage
