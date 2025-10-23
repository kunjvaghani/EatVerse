import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoURL, setVideoURL] = useState('');
    const [fileError, setFileError] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    // Create or revoke the video URL when the file changes
    useEffect(() => {
        if (!videoFile) {
            setVideoURL('');
            return;
        }
        const url = URL.createObjectURL(videoFile);
        setVideoURL(url);
        return () => URL.revokeObjectURL(url);
    }, [videoFile]);
    
    // --- File Handling Logic (Unchanged) ---
    const handleFileChange = (files) => {
        const file = files && files[0];
        if (!file) {
            setVideoFile(null);
            setFileError('');
            return;
        }
        if (!file.type.startsWith('video/')) {
            setFileError('Please select a valid video file (MP4, WebM, MOV).');
            return;
        }
        if (file.size > 100 * 1024 * 1024) { // 100MB limit
             setFileError('File is too large. Please select a video under 100MB.');
             return;
        }
        setFileError('');
        setVideoFile(file);
    };

    const onFileSelect = (e) => handleFileChange(e.target.files);
    const onDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFileChange(e.dataTransfer?.files);
    };
    const onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
     const onDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    
    const openFileDialog = () => fileInputRef.current?.click();

    // --- Form Submission Logic (Unchanged) ---
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!videoFile || !name.trim()) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('video', videoFile);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/food`, formData, {
                withCredentials: true,
            });
            console.log('Food item created:', response.data);
            navigate("/"); // Redirect on success
        } catch (error) {
            console.error("Error creating food item:", error);
            // Optionally, set an error state to show in the UI
        }
    };

    const isSubmitDisabled = useMemo(() => !name.trim() || !videoFile, [name, videoFile]);

    return (
        <div className="min-h-screen font-sans bg-gray-900 text-white">
            {/* Consistent Navbar */}
            <header className="bg-black/60 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">zomato</Link>
                    <nav className="space-x-4 text-gray-200 text-sm">
                        <Link to="/" className="hover:text-white transition-colors">Back to Feed</Link>
                    </nav>
                </div>
            </header>

            {/* Main Form Content */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-gray-700">
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-white">Add a New Dish</h1>
                        <p className="text-gray-400 mt-2">Showcase your best dishes with a short video.</p>
                    </header>

                    <form className="space-y-8" onSubmit={onSubmit}>
                        {/* Video Uploader */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Food Video</label>
                            <input
                                id="foodVideo"
                                ref={fileInputRef}
                                className="hidden"
                                type="file"
                                accept="video/mp4,video/webm,video/quicktime"
                                onChange={onFileSelect}
                            />
                            {videoURL ? (
                                // --- Video Preview State ---
                                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative group">
                                    <video className="w-full h-full object-cover" src={videoURL} controls playsInline preload="metadata" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={openFileDialog} className="bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-white/30 transition">Change Video</button>
                                        <button type="button" onClick={() => setVideoFile(null)} className="bg-red-600/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm hover:bg-red-600/70 transition">Remove</button>
                                    </div>
                                </div>
                            ) : (
                                // --- Initial Dropzone State ---
                                <div
                                    className={`relative w-full aspect-video border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-red-500 hover:bg-gray-800 transition-all ${isDragging ? 'border-red-500 bg-gray-800' : ''}`}
                                    onClick={openFileDialog}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    onDragLeave={onDragLeave}
                                >
                                    <div className="p-4">
                                        <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        <p className="mt-2 font-semibold text-red-500">Tap to upload or drag & drop</p>
                                        <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV (Max 100MB)</p>
                                    </div>
                                </div>
                            )}
                             {fileError && <p className="text-red-500 text-sm mt-2" role="alert">{fileError}</p>}
                        </div>

                        {/* Name Input */}
                        <div>
                            <label htmlFor="foodName" className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                            <input
                                id="foodName"
                                type="text"
                                placeholder="e.g., Spicy Paneer Wrap"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Description Textarea */}
                        <div>
                            <label htmlFor="foodDesc" className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                            <textarea
                                id="foodDesc"
                                rows={4}
                                placeholder="Write a short, enticing description: ingredients, taste, spice level, etc."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4">
                            <Link to="/" className="px-6 py-3 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700/50 transition">Cancel</Link>
                            <button 
                                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed" 
                                type="submit" 
                                disabled={isSubmitDisabled}
                            >
                                Save Food
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateFood;
