// src/sections/Hero.tsx
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';

const Hero = () => {
  const theme = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/hero.webp')` }}
    >
      {/* Overlay gelap untuk membuat teks lebih terbaca */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Konten diletakkan di atas overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Selamat datang di{' '}
            {/* Gradasi teks dikontrol dari theme.ts */}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
              Nimenation
            </span>
            !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Sebuah komunitas hangat, tempat kamu bisa ngobrol, bermain, dan berteman.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="https://discord.gg/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              // Warna tombol dikontrol dari theme.ts
              className={`inline-block bg-gradient-to-r text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${theme.hero.button.gradient} ${theme.hero.button.shadow}`}
            >
              Gabung Sekarang
            </a>
          </motion.div>
      </div>
    </section>
  );
};

export default Hero;