import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { MessageSquare, Star, Trash2, LogIn } from 'lucide-react';
import { type User } from 'firebase/auth';

// Impor semua logic dari file firebase.ts
import { 
    onAuthChange, 
    loginWithGoogle, 
    logout, 
    subscribeToReviews,
    addReview,
    deleteReview,
    type Review 
} from '../api/firebase';

const ReviewsPage = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Efek untuk memantau status otentikasi user
  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  // Efek untuk mengambil data review
  useEffect(() => {
    const unsubscribe = subscribeToReviews((reviewsData) => {
        setReviews(reviewsData);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Error signing in: ", err);
      setError('Gagal untuk login. Silakan coba lagi.');
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || newReviewText.trim() === '' || newReviewRating === 0) {
      setError('Rating dan isi review tidak boleh kosong.');
      return;
    }
    
    try {
      await addReview(user, newReviewText, newReviewRating);
      setNewReviewText('');
      setNewReviewRating(0);
      setError('');
    } catch (err) {
      console.error("Error adding review: ", err);
      setError('Gagal mengirim review. Coba lagi nanti.');
    }
  };
  
  const handleDeleteReview = async (reviewId: string) => {
    try {
      await deleteReview(reviewId);
    } catch (err) {
      console.error("Error deleting review: ", err);
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
    <div className="pt-24 sm:pt-32 pb-20 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4">
                <MessageSquare className="w-10 h-10 text-orange-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                Ulasan{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                    Komunitas
                </span>
                </h1>
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                Lihat apa kata para Nimetizen tentang server kami!
            </p>
        </div>

        {/* --- Bagian Login/Logout & Form Review --- */}
        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 mb-12 ${theme.sections.borders.subtle}`}>
          {user ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="text-lg font-semibold">Login sebagai {user.displayName}</p>
                    <p className="text-sm text-gray-400">Bagikan pengalamanmu di server!</p>
                  </div>
                </div>
                <button onClick={logout} className="text-gray-400 hover:text-white transition-colors">Logout</button>
              </div>
              <form onSubmit={handleSubmitReview}>
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-colors ${newReviewRating >= star ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-400'}`}
                      onClick={() => setNewReviewRating(star)}
                    />
                  ))}
                </div>
                <textarea
                  className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  rows={4}
                  placeholder="Tulis ulasanmu di sini..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                ></textarea>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                <div className="text-right mt-4">
                  <ShinyButton type="submit">
                    <span>Kirim Ulasan</span>
                  </ShinyButton>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Ingin Memberi Ulasan?</h2>
              <p className="text-gray-300 mb-6">Silakan login terlebih dahulu untuk membagikan pendapatmu.</p>
              <ShinyButton onClick={handleLogin}>
                <div className="flex items-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Login dengan Google</span>
                </div>
              </ShinyButton>
            </div>
          )}
        </div>

        {/* --- Daftar Review --- */}
        <div>
          {loading ? (
            <p className="text-center text-gray-400">Memuat ulasan...</p>
          ) : reviews.length > 0 ? (
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
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300 text-lg leading-relaxed">{review.text}</p>
                  {user && user.uid === review.authorUid && (
                     <button 
                       onClick={() => handleDeleteReview(review.id)}
                       className="text-gray-500 hover:text-red-400 transition-colors mt-4 flex items-center gap-2 text-sm"
                     >
                       <Trash2 className="w-4 h-4" /> Hapus
                     </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-10">Belum ada ulasan. Jadilah yang pertama!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;