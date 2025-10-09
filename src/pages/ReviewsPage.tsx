import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, subscribeToReviews, addReview, deleteReview, type Review } from '../api/firebase';
import VerificationGate from '../components/VerificationGate';

const ReviewsPage = () => {
  const theme = useTheme();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToReviews((reviewsData) => {
        setReviews(reviewsData.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)));
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const { averageRating, totalReviews, ratingDistribution } = useMemo(() => {
    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return {
      averageRating: parseFloat((total / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
      ratingDistribution: distribution,
    };
  }, [reviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (newReviewText.trim() === '' || newReviewRating === 0) {
      setError('Rating dan isi review tidak boleh kosong.');
      return;
    }
    
    try {
      await addReview(user, newReviewText, newReviewRating);
      setNewReviewText('');
      setNewReviewRating(0);
      setError('');
    } catch (err) {
      setError('Gagal mengirim review. Pastikan email Anda sudah terverifikasi.');
    }
  };
  
  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) return;
    try {
      await deleteReview(reviewId);
    } catch (err) {
      setError('Gagal menghapus review.');
    }
  };

  const formatDate = (timestamp: { seconds: number } | null) => {
    if (!timestamp) return 'Baru saja';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4">
                <MessageSquare className="w-10 h-10 text-orange-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">Ulasan <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>Komunitas</span></h1>
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Lihat apa kata para Nimetizen tentang server kami!</p>
        </div>

        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 mb-12 ${theme.sections.borders.subtle}`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-center">
              <p className="text-6xl font-bold text-white">{averageRating}</p>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-7 h-7 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} />
                ))}
              </div>
              <p className="text-gray-400">berdasarkan {totalReviews} ulasan</p>
            </div>
            <div className="w-full flex-1">
              {Object.entries(ratingDistribution).reverse().map(([star, count]) => (
                <div key={star} className="flex items-center gap-3 text-sm">
                  <span>{star} <span className="text-gray-400">bintang</span></span>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%` }}></div>
                  </div>
                  <span className="font-semibold w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 mb-12 ${theme.sections.borders.subtle}`}>
          <VerificationGate>
              <form onSubmit={handleSubmitReview}>
                  <h3 className="text-2xl font-bold text-white mb-4">Bagikan Pendapatmu</h3>
                  <div className="flex items-center gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-8 h-8 cursor-pointer transition-colors ${newReviewRating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`} onClick={() => setNewReviewRating(star)}/>
                      ))}
                  </div>
                  <textarea className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500" rows={4} placeholder="Tulis ulasanmu di sini..." value={newReviewText} onChange={(e) => setNewReviewText(e.target.value)}></textarea>
                  {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  <div className="text-right mt-4">
                      <ShinyButton type="submit"><span>Kirim Ulasan</span></ShinyButton>
                  </div>
              </form>
          </VerificationGate>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Semua Ulasan ({totalReviews})</h2>
          {loading ? <p className="text-center text-gray-400">Memuat ulasan...</p> : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className={`bg-gray-800/20 p-6 rounded-xl border ${theme.sections.borders.subtle}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <img src={review.authorPhotoURL} alt={review.authorName} className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-bold text-white text-lg">{review.authorName}</p>
                        <p className="text-sm text-gray-400">{formatDate(review.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />))}</div>
                  </div>
                  <p className="mt-4 text-gray-300 text-lg leading-relaxed">{review.text}</p>
                  {user && user.uid === review.authorUid && ( <button onClick={() => handleDeleteReview(review.id)} className="text-gray-500 hover:text-red-400 transition-colors mt-4 flex items-center gap-2 text-sm"><Trash2 className="w-4 h-4" /> Hapus</button>)}
                </div>
              ))}
            </div>
          ) : ( <p className="text-center text-gray-400 py-10">Belum ada ulasan. Jadilah yang pertama!</p> )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;