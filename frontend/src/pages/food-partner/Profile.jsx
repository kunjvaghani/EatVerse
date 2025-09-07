import React, { useState, useEffect, use } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import image from '../../styles/vk.jpg'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
                setIsFollowing(!!response.data.foodPartner.isFollowing)
            })
    }, [id])

    const toggleFollow = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/api/food-partner/${id}/follow`, {}, { withCredentials: true })
            setIsFollowing(!!res.data.isFollowing)
        } catch (err) {
            console.error('Follow error', err)
            // could show toast
        }
    }


    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    <img className="profile-avatar" src={image} alt="Business avatar" />

                    <div className="profile-info">
                        <div className="profile-field">
                            <span className="profile-label">Business Name:</span>
                            <span className="profile-value">{profile?.name}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">Address:</span>
                            <span className="profile-value">{profile?.address}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">Contact Name:</span>
                            <span className="profile-value">{profile?.contactname}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">Phone:</span>
                            <span className="profile-value">{profile?.phone}</span>
                        </div>

                        <div className="profile-field">
                            <span className="profile-label">Email:</span>
                            <span className="profile-value">{profile?.email}</span>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <button
                                onClick={toggleFollow}
                                className={`btn ${isFollowing ? 'btn--muted' : 'btn--primary'}`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    </div>
                </div>


                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{videos.length}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        {/* <span className="profile-stat-value">{profile?.customersServed || 100}</span> */}
                        <span className="profile-stat-value">{isFollowing.length || 100}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v._id ?? v.id} className="profile-grid-item">
                        {/* Placeholder tile; replace with <video> or <img> as needed */}


                        {v.video ? (
                            <video
                                className="profile-grid-video"
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                src={v.video} muted />
                        ) : (
                            <div className="profile-grid-empty">No preview</div>
                        )}


                    </div>
                ))}
            </section>
        </main>
    )
}

export default Profile