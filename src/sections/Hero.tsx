import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import GhostIcon from '../components/icons/halloween/GhostIcon'; // Impor ikon hantu
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Review } from '../api/firebase';

const Hero = ({ reviews, loading }: { reviews: Review[], loading: boolean }) => {
  const theme = useTheme();

  const { averageRating, totalReviews } = useMemo(() => {
    if (loading || !reviews || reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return {
      averageRating: parseFloat((total / reviews.length).toFixed(1)),
      totalReviews: reviews.length,
    };
  }, [reviews, loading]);

  // Data untuk animasi hantu (lebih besar dan lebih banyak)
  const ghosts = [
    { top: '15%', left: '10%', size: 90, duration: 12, delay: 0 },
    { top: '25%', left: '85%', size: 120, duration: 10, delay: 1.5 },
    { top: '70%', left: '5%', size: 75, duration: 11, delay: 2 },
    { top: '80%', left: '90%', size: 105, duration: 13, delay: 0.5 },
    { top: '50%', left: '50%', size: 85, duration: 9, delay: 2.5 },
    { top: '5%', left: '40%', size: 100, duration: 14, delay: 3 },
  ];

  return (
    <section
      id="home"
      className="relative flex h-[85vh] min-h-[600px] max-h-[850px] items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/hero.webp')` }}
    >
      <div className="absolute inset-0 z-0 bg-black/50"></div>

      {/* Animasi Hantu di Latar Belakang */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {ghosts.map((ghost, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{ top: ghost.top, left: ghost.left, width: ghost.size, height: ghost.size }}
            animate={{ y: [0, -20, 0], x: [0, 10, -10, 0] }}
            transition={{
              duration: ghost.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ghost.delay,
            }}
          >
            <GhostIcon />
          </motion.div>
        ))}
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-bold text-white md:text-7xl"
        >
          Selamat datang di{' '}
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
            Nimenation
          </span>
          !
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 max-w-3xl text-xl text-gray-200 md:text-2xl"
        >
          Sebuah komunitas hangat, tempat kamu bisa ngobrol, bermain, dan berteman.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ShinyButton href="https://discord.gg/nimenation">
            <span>Gabung Sekarang</span>
          </ShinyButton>
          <ShinyButton to="/login" variant="secondary">
            <span>Login / Tulis Ulasan</span>
          </ShinyButton>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
        >
            <Link to="/reviews" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                </div>
                <span className="font-semibold">{loading ? 'Memuat...' : `${averageRating} dari ${totalReviews} ulasan`}</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;