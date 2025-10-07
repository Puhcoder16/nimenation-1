import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../components/ThemeContext';

const Mascot = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const mascots = [
    {
      name: 'Nime-chan',
      imageSrc: '/nimechan.webp',
      description: 'Maskot Nimenation yang pertama kali direncanakan, dikarenakan menjadikan seorang cewe 2D sebagai icon dari sebuah komunitas anime adalah hal yang wajib. Nime-chan adalah adik perempuan dari Nime-kun, yang tidak seperti kakaknya, Nime-chan memiliki sifat yang hiperaktif, penyayang, dan suka berinteraksi dengan banyak orang, dia sering menjadi incaran banyak lelaki. Nime-chan sendiri terinsipirasi dari mayoritas member Nimenation bergender cewek.',
      imagePosition: 'left',
    },
    {
      name: 'Nime-kun',
      imageSrc: '/nimekun.webp',
      description: 'Salah satu dari maskot Nimenation community, dia adalah kakak dari Nime-chan. Memiliki sifat yang dingin dan tidak terlalu suka bersosialisasi, dan tidak selalu beruntung dalam mencari jodoh, namun dia mendapatkan banyak teman dari bermain game online seperti FPS games dan Moba. Nime-kun sendiri terinsipirasi dari mayoritas member Nimenation yang bergender lelaki.',
      imagePosition: 'right',
    },
  ];

  return (
    <section id="mascot" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Maskot{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
              Komunitas
            </span>
          </h2>
        </motion.div>

        <div className="space-y-12 md:space-y-20">
          {mascots.map((mascot, index) => (
            <div
              key={mascot.name}
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${
                mascot.imagePosition === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: mascot.imagePosition === 'left' ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                className="hidden md:block w-full md:w-5/12 flex-shrink-0"
              >
                <img
                  src={mascot.imageSrc}
                  alt={`Maskot ${mascot.name}`}
                  className="w-full h-auto max-h-[450px] object-contain [filter:drop-shadow(0_10px_15px_rgba(234,88,12,0.3))]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: mascot.imagePosition === 'left' ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="w-full md:w-7/12"
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {mascot.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base">
                    {mascot.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mascot;