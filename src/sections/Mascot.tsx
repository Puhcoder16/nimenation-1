import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../components/ThemeContext';

const Mascot = () => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Data untuk setiap maskot, biar lebih rapi
  const mascots = [
    {
      name: 'Nime-chan',
      imageSrc: '/nimechan.webp',
      description: 'Maskot Nimenation yang pertama kali direncanakan, dikarenakan menjadikan seorang cewe 2D sebagai icon dari sebuah komunitas anime adalah hal yang wajib. Nime-chan adalah adik perempuan dari Nime-kun, yang tidak seperti kakaknya, Nime-chan memiliki sifat yang hiperaktif, penyayang, dan suka berinteraksi dengan banyak orang, dia sering menjadi incaran banyak lelaki. Nime-chan sendiri terinsipirasi dari mayoritas member Nimenation bergender cewek.',
      imagePosition: 'left', // 'left' atau 'right' untuk layout zigzag
    },
    {
      name: 'Nime-kun',
      imageSrc: '/nimekun.webp',
      description: 'Salah satu dari maskot Nimenation community, dia adalah kakak dari Nime-chan. Memiliki sifat yang dingin dan tidak terlalu suka bersosialisasi, dan tidak selalu beruntung dalam mencari jodoh, namun dia mendapatkan banyak teman dari bermain game online seperti FPS games dan Moba. Nime-kun sendiri terinspirasi dari mayoritas member Nimenation yang bergender lelaki.',
      imagePosition: 'right',
    },
  ];

  return (
    <section id="mascot" ref={ref} className={`py-20 overflow-hidden ${theme.sections.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Section */}
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

        {/* Konten Maskot */}
        <div className="space-y-20">
          {mascots.map((mascot, index) => (
            <div
              key={mascot.name}
              // NOTE: Layout zigzag diatur di sini. 'lg:flex-row-reverse' untuk gambar di kanan
              className={`flex flex-col lg:flex-row items-center gap-10 ${
                mascot.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Kolom Gambar */}
              <motion.div
                initial={{ opacity: 0, x: mascot.imagePosition === 'left' ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                className="lg:w-1/2 w-full flex-shrink-0"
              >
                <img
                  src={mascot.imageSrc}
                  alt={`Maskot ${mascot.name}`}
                  className="rounded-2xl object-cover w-full h-auto max-h-[500px] shadow-2xl shadow-orange-500/10"
                />
              </motion.div>

              {/* Kolom Teks (Card) */}
              <motion.div
                initial={{ opacity: 0, x: mascot.imagePosition === 'left' ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="lg:w-1/2 w-full"
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {mascot.name}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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