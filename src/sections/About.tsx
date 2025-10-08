import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../components/ThemeContext';
import AboutIcon from '../components/icons/AboutIcon';
import ShinyButton from '../components/ShinyButton';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useTheme();

  return (
    <section id="about" ref={ref} className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <AboutIcon className="w-10 h-10 text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Tentang{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Nimenation
              </span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Nimenation adalah server Discord yang didedikasikan untuk para pecinta anime dan manga dari seluruh dunia. Kami adalah tempat yang ramah dan terbuka di mana kamu bisa mencari teman baru, berbagi rekomendasi, dan merasakan kehangatan dari sebuah komunitas yang penuh semangat.
          </p>
          <ShinyButton href="#about-page" text="Lebih Lanjut" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;