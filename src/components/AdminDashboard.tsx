import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Calendar, 
  User, 
  Phone, 
  Plus, 
  Trash2, 
  Star, 
  Lock, 
  Mail, 
  Loader2,
  Edit2,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newImage, setNewImage] = useState({ src: '', title: '', published: true });
  const [newVideo, setNewVideo] = useState({ url: '', title: '', published: true });
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '', published: true });
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showSmtpPass, setShowSmtpPass] = useState(false);
  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: 587,
    user: '',
    pass: '',
    secure: false
  });
  const [smtpMessage, setSmtpMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'gallery' | 'videos' | 'reviews' | 'settings'>('bookings');
  const [passMessage, setPassMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, galleryRes, videosRes, reviewsRes, smtpRes] = await Promise.all([
        fetch('/api/admin/bookings'),
        fetch('/api/admin/gallery'),
        fetch('/api/admin/videos'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/smtp-settings')
      ]);
      const bookingsData = await bookingsRes.json();
      const galleryData = await galleryRes.json();
      const videosData = await videosRes.json();
      const reviewsData = await reviewsRes.json();
      const smtpData = await smtpRes.json();
      
      setBookings(bookingsData);
      setGallery(galleryData);
      setVideos(videosData);
      setReviews(reviewsData);
      setSmtpSettings({
        host: smtpData.host || '',
        port: smtpData.port || 587,
        user: smtpData.auth?.user || '',
        pass: '', // Don't show password for security
        secure: smtpData.secure || false
      });
    } catch (error) {
      console.error("Failed to fetch admin data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
      return null;
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    let src = newImage.src;
    
    if (selectedFile) {
      const uploadedUrl = await uploadFile(selectedFile);
      if (uploadedUrl) src = uploadedUrl;
      else return alert("Failed to upload image");
    }

    if (!src) return alert("Please provide an image URL or select a file");

    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newImage, src, published: newImage.published ? 1 : 0 })
      });
      if (res.ok) {
        setNewImage({ src: '', title: '', published: true });
        setSelectedFile(null);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add image", error);
    }
  };

  const handleToggleGalleryPublish = async (id: number, currentStatus: number) => {
    try {
      const res = await fetch(`/api/admin/gallery/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to toggle image visibility", error);
    }
  };

  const handleUpdateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;
    try {
      const res = await fetch(`/api/admin/gallery/${editingImage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingImage)
      });
      if (res.ok) {
        setEditingImage(null);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update image", error);
    }
  };

  const handleDeleteImage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = newVideo.url;

    if (selectedFile) {
      const uploadedUrl = await uploadFile(selectedFile);
      if (uploadedUrl) url = uploadedUrl;
      else return alert("Failed to upload video");
    }

    if (!url) return alert("Please provide a video URL or select a file");

    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newVideo, url, published: newVideo.published ? 1 : 0 })
      });
      if (res.ok) {
        setNewVideo({ url: '', title: '', published: true });
        setSelectedFile(null);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add video", error);
    }
  };

  const handleToggleVideoPublish = async (id: number, currentStatus: number) => {
    try {
      const res = await fetch(`/api/admin/videos/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to toggle video visibility", error);
    }
  };

  const handleUpdateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    try {
      const res = await fetch(`/api/admin/videos/${editingVideo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingVideo)
      });
      if (res.ok) {
        setEditingVideo(null);
        fetchData();
      }
    } catch (error) {
      console.error("Failed to update video", error);
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`/api/admin/videos/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to delete video", error);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        setNewReview({ name: '', rating: 5, comment: '', published: true });
        fetchData();
      }
    } catch (error) {
      console.error("Failed to add review", error);
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: number) => {
    try {
      const res = await fetch(`/api/admin/reviews/${id}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to toggle publish status", error);
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });
      if (res.ok) {
        setPassMessage({ text: 'Password updated successfully!', type: 'success' });
        setNewPassword('');
      } else {
        setPassMessage({ text: 'Failed to update password.', type: 'error' });
      }
    } catch (error) {
      setPassMessage({ text: 'An error occurred.', type: 'error' });
    }
  };

  const handleUpdateSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/admin/smtp-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpSettings)
      });
      if (res.ok) {
        setSmtpMessage({ text: 'SMTP settings updated successfully!', type: 'success' });
        setSmtpSettings(prev => ({ ...prev, pass: '' }));
      } else {
        setSmtpMessage({ text: 'Failed to update SMTP settings.', type: 'error' });
      }
    } catch (error) {
      setSmtpMessage({ text: 'An error occurred.', type: 'error' });
    }
  };

  const handleTestEmail = async () => {
    setSmtpMessage({ text: 'Sending test email...', type: 'info' });
    try {
      const res = await fetch('/api/admin/test-email', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setSmtpMessage({ text: 'Test email sent successfully! Check your inbox.', type: 'success' });
      } else {
        setSmtpMessage({ text: `Test failed: ${data.error}`, type: 'error' });
      }
    } catch (error) {
      setSmtpMessage({ text: 'An error occurred during test.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold gold-text-gradient">Admin Dashboard</h1>
            <p className="text-white/50">Manage your bookings and website content</p>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 border-b border-white/10">
          {[
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'gallery', label: `Gallery (${gallery.length})` },
            { id: 'videos', label: `Videos (${videos.length})` },
            { id: 'reviews', label: `Reviews (${reviews.length})` },
            { id: 'settings', label: 'Settings' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-2 font-bold uppercase tracking-widest text-xs transition-all ${activeTab === tab.id ? 'text-gold border-b-2 border-gold' : 'text-white/40 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-gold animate-spin w-10 h-10" />
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-white/5">
                <Calendar className="mx-auto text-white/20 mb-4" size={48} />
                <p className="text-white/40">No bookings yet</p>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl hover:border-gold/20 transition-all">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-gold" />
                        <h3 className="font-bold text-lg">{booking.name}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Phone size={14} />
                          {booking.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {booking.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-white/30 text-right">
                      {new Date(booking.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-black/40 rounded-xl text-white/80 text-sm italic">
                    "{booking.message}"
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === 'gallery' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {editingImage ? (
                <div className="bg-zinc-900/50 border border-gold/30 p-6 rounded-3xl sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Edit2 size={20} className="text-gold" />
                      Edit Image
                    </h3>
                    <button onClick={() => setEditingImage(null)} className="text-white/40 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateImage} className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
                      <img src={editingImage.src} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Title</label>
                      <input 
                        type="text" 
                        required
                        value={editingImage.title}
                        onChange={e => setEditingImage({...editingImage, title: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        id="edit-img-published"
                        checked={editingImage.published}
                        onChange={e => setEditingImage({...editingImage, published: e.target.checked})}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor="edit-img-published" className="text-xs uppercase tracking-widest text-white/60">Show on website</label>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setEditingImage(null)}
                        className="flex-1 bg-zinc-800 py-3 rounded-xl text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="flex-[2] gold-gradient py-3 rounded-xl text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all"
                      >
                        Update Image
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl sticky top-24">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-gold" />
                    Add Image
                  </h3>
                  <form onSubmit={handleAddImage} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Upload from Device</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none file:bg-gold/10 file:text-gold file:border-none file:rounded-lg file:px-3 file:py-1 file:mr-4 file:text-xs file:font-bold file:uppercase"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-zinc-900 px-2 text-white/20">Or use URL</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Image URL</label>
                      <input 
                        type="url" 
                        value={newImage.src}
                        onChange={e => setNewImage({...newImage, src: e.target.value})}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Title</label>
                      <input 
                        type="text" 
                        required
                        value={newImage.title}
                        onChange={e => setNewImage({...newImage, title: e.target.value})}
                        placeholder="e.g. Wedding Party"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        id="img-published"
                        checked={newImage.published}
                        onChange={e => setNewImage({...newImage, published: e.target.checked})}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor="img-published" className="text-xs uppercase tracking-widest text-white/60">Show on website</label>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="w-full gold-gradient py-3 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isUploading ? 'Uploading...' : 'Save to Gallery'}
                    </button>
                  </form>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-video border border-white/5">
                  <img src={img.src} alt={img.title} className={`w-full h-full object-cover ${!img.published ? 'opacity-30 grayscale' : ''}`} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleToggleGalleryPublish(img.id, img.published)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${img.published ? 'bg-gold text-black' : 'bg-zinc-800 text-white/50'}`}
                        >
                          {img.published ? 'Visible' : 'Hidden'}
                        </button>
                        <button 
                          onClick={() => setEditingImage(img)}
                          className="bg-zinc-800 p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => handleDeleteImage(img.id)}
                        className="bg-red-500 p-2 rounded-full text-white hover:scale-110 transition-transform"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-white font-bold text-sm uppercase tracking-widest">{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'videos' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              {editingVideo ? (
                <div className="bg-zinc-900/50 border border-gold/30 p-6 rounded-3xl sticky top-24">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Edit2 size={20} className="text-gold" />
                      Edit Video
                    </h3>
                    <button onClick={() => setEditingVideo(null)} className="text-white/40 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateVideo} className="space-y-4">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-white/10 bg-black">
                      {editingVideo.url.includes('youtube.com') || editingVideo.url.includes('youtu.be') ? (
                        <iframe 
                          src={`https://www.youtube.com/embed/${editingVideo.url.split('v=')[1] || editingVideo.url.split('/').pop()}`}
                          className="w-full h-full"
                          frameBorder="0"
                        />
                      ) : (
                        <video src={editingVideo.url} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Title</label>
                      <input 
                        type="text" 
                        required
                        value={editingVideo.title}
                        onChange={e => setEditingVideo({...editingVideo, title: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        id="edit-vid-published"
                        checked={editingVideo.published}
                        onChange={e => setEditingVideo({...editingVideo, published: e.target.checked})}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor="edit-vid-published" className="text-xs uppercase tracking-widest text-white/60">Show on website</label>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        type="button"
                        onClick={() => setEditingVideo(null)}
                        className="flex-1 bg-zinc-800 py-3 rounded-xl text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="flex-[2] gold-gradient py-3 rounded-xl text-black font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-all"
                      >
                        Update Video
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl sticky top-24">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-gold" />
                    Add Video
                  </h3>
                  <form onSubmit={handleAddVideo} className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Upload from Device</label>
                      <input 
                        type="file" 
                        accept="video/*"
                        onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none file:bg-gold/10 file:text-gold file:border-none file:rounded-lg file:px-3 file:py-1 file:mr-4 file:text-xs file:font-bold file:uppercase"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/5"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-zinc-900 px-2 text-white/20">Or use URL</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Video URL (YouTube/Direct)</label>
                      <input 
                        type="url" 
                        value={newVideo.url}
                        onChange={e => setNewVideo({...newVideo, url: e.target.value})}
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Title</label>
                      <input 
                        type="text" 
                        required
                        value={newVideo.title}
                        onChange={e => setNewVideo({...newVideo, title: e.target.value})}
                        placeholder="e.g. Wedding Highlights"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-3 py-2">
                      <input 
                        type="checkbox" 
                        id="vid-published"
                        checked={newVideo.published}
                        onChange={e => setNewVideo({...newVideo, published: e.target.checked})}
                        className="w-4 h-4 accent-gold"
                      />
                      <label htmlFor="vid-published" className="text-xs uppercase tracking-widest text-white/60">Show on website</label>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="w-full gold-gradient py-3 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                      {isUploading ? 'Uploading...' : 'Add Video'}
                    </button>
                  </form>
                </div>
              )}
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {videos.map((vid) => (
                <div key={vid.id} className={`bg-zinc-900/50 border border-white/5 p-4 rounded-3xl ${!vid.published ? 'opacity-50 grayscale' : ''}`}>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 relative">
                    {vid.url.includes('youtube.com') || vid.url.includes('youtu.be') ? (
                      <iframe 
                        src={`https://www.youtube.com/embed/${vid.url.split('v=')[1] || vid.url.split('/').pop()}`}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                      />
                    ) : (
                      <video src={vid.url} controls className="w-full h-full object-cover" />
                    )}
                    {!vid.published && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="bg-zinc-900 text-white/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Hidden</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-bold text-sm uppercase tracking-widest">{vid.title}</p>
                      <div className="flex gap-3 mt-1">
                        <button 
                          onClick={() => handleToggleVideoPublish(vid.id, vid.published)}
                          className={`text-[10px] font-bold uppercase tracking-widest transition-all ${vid.published ? 'text-gold' : 'text-white/30'}`}
                        >
                          {vid.published ? 'Visible' : 'Hidden'}
                        </button>
                        <button 
                          onClick={() => setEditingVideo(vid)}
                          className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-gold transition-all"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteVideo(vid.id)}
                      className="text-red-500 hover:text-red-400 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'reviews' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl sticky top-24">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-gold" />
                  Add Review
                </h3>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Client Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={e => setNewReview({...newReview, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Rating (1-5)</label>
                    <select 
                      value={newReview.rating}
                      onChange={e => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    >
                      {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Comment</label>
                    <textarea 
                      required
                      value={newReview.comment}
                      onChange={e => setNewReview({...newReview, comment: e.target.value})}
                      placeholder="What did the client say?"
                      rows={4}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-3 py-2">
                    <input 
                      type="checkbox" 
                      id="rev-published"
                      checked={newReview.published}
                      onChange={e => setNewReview({...newReview, published: e.target.checked})}
                      className="w-4 h-4 accent-gold"
                    />
                    <label htmlFor="rev-published" className="text-xs uppercase tracking-widest text-white/60">Publish immediately</label>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full gold-gradient py-3 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all"
                  >
                    Add Review
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className={`bg-zinc-900/50 border border-white/5 p-6 rounded-3xl transition-all ${!review.published ? 'opacity-60' : ''}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{review.name}</h3>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? "fill-gold text-gold" : "text-white/10"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm italic mb-4">"{review.comment}"</p>
                      <p className="text-xs text-white/30">{new Date(review.created_at).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleTogglePublish(review.id, review.published)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${review.published ? 'bg-gold text-black' : 'bg-zinc-800 text-white/50 hover:text-white'}`}
                      >
                        {review.published ? 'Published' : 'Draft'}
                      </button>
                      <button 
                        onClick={() => handleDeleteReview(review.id)}
                        className="bg-red-500/10 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Lock size={20} className="text-gold" />
                Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">New Password</label>
                  <div className="relative">
                    <input 
                      type={showNewPass ? "text" : "password"} 
                      required
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm focus:border-gold outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors"
                    >
                      {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                {passMessage.text && (
                  <p className={`text-xs text-center ${passMessage.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {passMessage.text}
                  </p>
                )}
                <button type="submit" className="w-full gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all">
                  Update Password
                </button>
              </form>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Mail size={20} className="text-gold" />
                Mail Settings (SMTP)
              </h3>
              <form onSubmit={handleUpdateSmtp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">SMTP Host</label>
                    <input 
                      type="text" 
                      value={smtpSettings.host}
                      onChange={e => setSmtpSettings({...smtpSettings, host: e.target.value})}
                      placeholder="smtp.gmail.com"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">SMTP Port</label>
                    <input 
                      type="number" 
                      value={smtpSettings.port}
                      onChange={e => setSmtpSettings({...smtpSettings, port: parseInt(e.target.value)})}
                      placeholder="587"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">SMTP User (Email)</label>
                  <input 
                    type="email" 
                    value={smtpSettings.user}
                    onChange={e => setSmtpSettings({...smtpSettings, user: e.target.value})}
                    placeholder="your-email@gmail.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">SMTP Password (App Password)</label>
                  <div className="relative">
                    <input 
                      type={showSmtpPass ? "text" : "password"} 
                      value={smtpSettings.pass}
                      onChange={e => setSmtpSettings({...smtpSettings, pass: e.target.value})}
                      placeholder="Leave empty to keep current"
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:border-gold outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSmtpPass(!showSmtpPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold transition-colors"
                    >
                      {showSmtpPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <input 
                    type="checkbox" 
                    id="smtp-secure"
                    checked={smtpSettings.secure}
                    onChange={e => setSmtpSettings({...smtpSettings, secure: e.target.checked})}
                    className="w-4 h-4 accent-gold"
                  />
                  <label htmlFor="smtp-secure" className="text-xs uppercase tracking-widest text-white/60">Use SSL/TLS (Secure)</label>
                </div>
                {smtpMessage.text && (
                  <p className={`text-xs text-center ${smtpMessage.type === 'success' ? 'text-green-500' : smtpMessage.type === 'error' ? 'text-red-500' : 'text-gold'}`}>
                    {smtpMessage.text}
                  </p>
                )}
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 gold-gradient py-4 rounded-xl text-black font-bold uppercase tracking-widest text-sm hover:scale-[1.02] transition-all">
                    Update Mail Settings
                  </button>
                  <button 
                    type="button"
                    onClick={handleTestEmail}
                    className="px-6 bg-zinc-800 border border-white/10 rounded-xl text-white font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-700 transition-all"
                  >
                    Test
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
