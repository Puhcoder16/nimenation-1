import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { Star, Trash2 } from 'lucide-react';
import { type User } from 'firebase/auth';
import { onAuthChange, subscribeToReviews, addReview, deleteReview, type Review } from '../api/firebase';
import ReviewsIcon from '../components/icons/ReviewsIcon';

// Komponen untuk Form Review
const ReviewForm = ({ user, onSubmit }) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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
      await onSubmit(newReviewText, newReviewRating);
      setNewReviewText('');
      setNewReviewRating(0);
      setError('');
    } catch (err) {
      setError('Gagal mengirim review. Coba lagi nanti.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4">Bagikan Pengalamanmu</h3>
      <div className="flex items-center gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-all duration-200 ${newReviewRating >= star ? 'text-yellow-400 scale-110' : 'text-gray-600 hover:text-gray-400'}`}
            onClick={() => setNewReviewRating(star)}
            fill={newReviewRating >= star ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      <textarea
        className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
        rows={4}
        placeholder={user ? "Tulis ulasanmu di sini..." : "Login untuk menulis ulasan..."}
        value={newReviewText}
        onChange={(e) => setNewReviewText(e.target.value)}
        disabled={!user}
      ></textarea>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      <div className="text-right mt-4">
        <ShinyButton type="submit">
          <span>Kirim Ulasan</span>
        </ShinyButton>
      </div>
    </form>
  );
};

// Komponen untuk Statistik Rating
const RatingStats = ({ reviews }) => {
  const theme = useTheme();
  const { averageRating, totalReviews, ratingDistribution } = useMemo(() => {
    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avg = total / reviews.length;

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });

    return {
      averageRating: parseFloat(avg.toFixed(1)),
      totalReviews: reviews.length,
      ratingDistribution: distribution
    };
  }, [reviews]);

  return (
    <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 mb-12 ${theme.sections.borders.subtle}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="text-gray-300">Rating Keseluruhan</p>
          <p className="text-5xl font-bold text-white my-1">{averageRating}<span className="text-3xl text-gray-400">/5</span></p>
          <div className="flex justify-center md:justify-start items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} fill={i < Math.round(averageRating) ? 'currentColor' : 'none'}/>
            ))}
          </div>
          <p className="text-gray-400 mt-2">Berdasarkan {totalReviews} ulasan</p>
        </div>
        <div className="w-full md:w-2/3">
          {Object.keys(ratingDistribution).reverse().map(star => {
            const count = ratingDistribution[star];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">{star} Bintang</span>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="text-gray-400 w-10 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Halaman Utama Review
const ReviewsPage = () => {
  const theme = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthChange(setUser);
    const unsubscribeReviews = subscribeToReviews((reviewsData) => {
      setReviews(reviewsData);
      setLoading(false);
    });
    return () => {
      unsubscribeAuth();
      unsubscribeReviews();
    };
  }, []);

  const handleAddReview = (text: string, rating: number) => {
    if (!user) return;
    return addReview(user, text, rating);
  };

  const handleDeleteReview = (reviewId: string) => {
    return deleteReview(reviewId);
  };
  
  const formatDate = (timestamp: { seconds: number } | null) => {
    if (!timestamp) return 'Baru saja';
    return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20 text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4">
                <ReviewsIcon className="w-10 h-10 text-orange-400" />
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

        <RatingStats reviews={reviews} />
        
        <div className="flex flex-col-reverse md:flex-row gap-12">
            <div className="w-full">
                <h2 className="text-3xl font-bold text-white mb-6">Semua Ulasan ({reviews.length})</h2>
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
                                <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill={i < review.rating ? 'currentColor' : 'none'}/>
                            ))}
                            </div>
                        </div>
                        <p className="mt-4 text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">{review.text}</p>
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
            
            <div className="md:w-2/3 lg:w-1/2 md:sticky top-24 h-fit">
               <ReviewForm user={user} onSubmit={handleAddReview} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;