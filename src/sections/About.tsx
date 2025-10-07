import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Gamepad2, Heart, MessageCircle } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useTheme();

  const features = [
    { icon: Users, title: 'Komunitas Ramah' },
    { icon: Gamepad2, title: 'Gaming Session' },
    { icon: MessageCircle, title: 'Obrolan Santai' },
    { icon: Heart, title: 'Vibes Positif' },
  ];

  return (
    <section id="about" ref={ref} className="flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
              Nimenation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nimenation adalah komunitas Discord untuk para penggemar game, anime, horor, dan obrolan santai.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg p-6 hover:transform hover:scale-105 transition-all duration-200 ${theme.sections.borders.subtle} ${theme.sections.borders.hover}`}
              >
                <div className={`bg-gradient-to-br from-orange-500/20 to-orange-600/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${theme.sections.colors.primary}`} />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {feature.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;