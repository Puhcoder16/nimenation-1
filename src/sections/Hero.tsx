// src/sections/Hero.tsx
import { motion } from 'framer-motion';
import { Ghost, Sparkles } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const Hero = () => {
  const theme = useTheme();

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center pt-16 ${theme.backgrounds.hero}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <Ghost className={`w-24 h-24 ${theme.colors.primary}`} />
              <Sparkles className="w-6 h-6 text-purple-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Selamat datang di{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.colors.gradientText}`}>
              Nimenation
            </span>
            !
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Sebuah komunitas hangat dengan vibes spooky, tempat kamu bisa ngobrol,
            bermain, dan berteman.
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
              className={`inline-block bg-gradient-to-r text-white text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${theme.buttons.gradient} ${theme.buttons.shadow}`}
            >
              Gabung Sekarang
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;