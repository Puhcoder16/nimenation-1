import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';

const Hero = () => {
  const theme = useTheme();

  return (
    <section
      id="home"
      className="relative flex h-[85vh] min-h-[600px] max-h-[850px] items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/hero.webp')` }}
    >
      <div className="absolute inset-0 z-0 bg-black/50"></div>
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
        >
          <a
            href="https://discord.gg/nimenation"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block transform rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 ${theme.hero.button.gradient} ${theme.hero.button.shadow}`}
          >
            Gabung Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;