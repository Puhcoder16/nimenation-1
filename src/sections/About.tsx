import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Gamepad2, Heart, MessageCircle } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Users,
      title: 'Komunitas Ramah',
      description: 'Bertemu dengan orang-orang baru yang memiliki minat yang sama',
    },
    {
      icon: Gamepad2,
      title: 'Gaming Session',
      description: 'Main game bareng, dari yang horror sampai yang casual',
    },
    {
      icon: MessageCircle,
      title: 'Obrolan Santai',
      description: 'Ngobrol tentang anime, game, horor, atau apapun yang kamu suka',
    },
    {
      icon: Heart,
      title: 'Vibes Positif',
      description: 'Suasana yang nyaman dengan sentuhan spooky yang fun',
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tentang{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              Nimenation
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nimenation adalah komunitas Discord untuk para penggemar game, anime, horor,
            dan obrolan santai. Kami menciptakan ruang yang nyaman dengan vibes spooky
            yang menyenangkan, di mana setiap orang bisa menjadi diri mereka sendiri,
            berbagi minat, dan membangun persahabatan yang lasting.
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
                className="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-lg p-6 hover:border-orange-500/50 hover:transform hover:scale-105 transition-all duration-200"
              >
                <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/30 rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-gray-300 text-lg mb-6">
              Siap untuk bergabung dengan petualangan spooky kami?
            </p>
            <a
              href="https://discord.gg/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-orange-500/50 transition-all duration-200 transform hover:scale-105"
            >
              Join Discord Server
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
