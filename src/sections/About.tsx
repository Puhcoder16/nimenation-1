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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-4">
            <AboutIcon className="hidden sm:block w-10 h-10 text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Tentang{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Shop Minecraft Premium legit
              </span>
            </h2>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`max-w-4xl mx-auto text-center bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 md:p-12 ${theme.sections.borders.subtle}`}
        >
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Shop Minecraft Premium legit
            </p>
            <ShinyButton to="/about">
              <span>RENX Shop</span>
            </ShinyButton>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
