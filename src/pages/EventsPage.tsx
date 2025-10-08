import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import GhostIcon from '../components/icons/halloween/GhostIcon';
import BatIcon from '../components/icons/halloween/BatIcon';
import { PartyPopper } from 'lucide-react';

const eventData = [
  {
    title: 'Kontes Kostum Spektakuler',
    description: 'Pamerkan kreativitasmu! Gunakan kostum Halloween terbaikmu, baik itu cosplay karakter seram atau avatar digital yang unik. Pemenang dengan kostum paling menyeramkan dan kreatif akan mendapatkan hadiah spesial!',
  },
  {
    title: 'Nonton Bareng Film Horor',
    description: 'Siapkan cemilan dan selimutmu! Kita akan mengadakan sesi nonton bareng film-film horor pilihan yang siap membuat bulu kuduk berdiri. Jadwal film akan diumumkan di channel pengumuman.',
  },
  {
    title: 'Sesi Cerita Malam Jumat',
    description: 'Punya cerita seram atau pengalaman mistis yang tak terlupakan? Bagikan ceritamu di voice channel khusus dalam sesi cerita hantu. Yang paling seram ceritanya akan dapat role eksklusif!',
  },
  {
    title: 'Turnamen Game Edisi Halloween',
    description: 'Asah skill gaming-mu dalam turnamen game spesial bertema Halloween! Ikuti kompetisi di game-game populer dengan map atau mode edisi Halloween. Buktikan kamulah sang juara malam ini!',
  },
];

const FlyingBat = ({ scrollYProgress, initialTop, initialLeft, speed, size }) => {
  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', `${100 * speed}vh`]);

  return (
    <motion.div
      className="absolute text-white/40"
      style={{
        y,
        top: `${initialTop}%`,
        left: `${initialLeft}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ rotate: Math.random() * 20 - 10 }}
    >
      <BatIcon className="w-full h-full" />
    </motion.div>
  );
};

const EventsPage = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const [bats, setBats] = useState([]);

  useEffect(() => {
    const generateBats = () => {
      const newBats = Array.from({ length: 15 }).map(() => ({
        initialTop: Math.random() * 100,
        initialLeft: Math.random() * 100,
        speed: 1 + Math.random() * 1.5,
        size: 20 + Math.random() * 30,
      }));
      setBats(newBats);
    };
    generateBats();
  }, []);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url('/hero.webp')` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Lapisan khusus untuk kelelawar */}
      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {bats.map((bat, i) => (
          <FlyingBat key={i} scrollYProgress={scrollYProgress} {...bat} />
        ))}
      </div>
      
      <div className="relative z-20 pt-24 sm:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative">
            
            <motion.div 
              className="absolute -top-10 left-10 md:left-20 text-orange-400/50"
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GhostIcon className="w-16 h-16 opacity-50" />
            </motion.div>
            
            <motion.div 
              className="absolute -top-16 right-10 md:right-20 text-orange-400/50"
              animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <GhostIcon className="w-20 h-20 opacity-40" />
            </motion.div>

            <div className="flex justify-center items-center gap-4">
              <PartyPopper className="w-10 h-10 text-orange-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Nimenation{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                  Halloween Party!
                </span>
              </h1>
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Bersiaplah untuk malam penuh misteri dan keseruan! Ikuti rangkaian event spesial Halloween kami dan menangkan hadiah menarik.
            </p>
          </div>

          <div className="space-y-8">
            {eventData.map((event, index) => (
              <motion.div
                key={index}
                className={`bg-gray-900/40 backdrop-blur-md border rounded-2xl p-8 ${theme.sections.borders.subtle} shadow-lg shadow-orange-500/5`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h2 className="text-3xl font-bold text-white mb-3">{event.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed">{event.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <ShinyButton to="/">
              <span>Kembali ke Beranda</span>
            </ShinyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;