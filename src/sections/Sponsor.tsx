import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import { Handshake, Heart, Link as LinkIcon } from 'lucide-react';
import ShinyButton from '../components/ShinyButton';

const Sponsor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useTheme();

  return (
    <section id="sponsor" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center md:text-left">
              Dukung{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Nimenation
              </span>
            </h2>

            <div className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
              <div className="space-y-8">
                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <Heart className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Donasi
                  </h3>
                  <p className="text-gray-300">
                    Dukung kami untuk terus berkembang dan mengadakan event seru. Donasi bisa melalui Trakteer, Saweria, atau transfer langsung. Para donatur akan mendapatkan role spesial sebagai bentuk terima kasih kami.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <ShinyButton href="https://trakteer.id/nimenation">
                      <span>Trakteer</span>
                    </ShinyButton>
                    <ShinyButton href="https://saweria.co/nimenation">
                      <span>Saweria</span>
                    </ShinyButton>
                  </div>
                </div>
                
                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <Handshake className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Sponsorship
                  </h3>
                  <p className="text-gray-300">
                    Buka kesempatan untuk bisnis atau usahamu berkolaborasi dengan kami. Dapatkan benefit promosi, role khusus, dan *special thanks* di setiap event.
                  </p>
                   <div className="flex flex-wrap gap-3 mt-4">
                    <ShinyButton href="https://drive.google.com/file/d/1S3S2vxfO9q-fSL-sMPW0jPB_iJ3mPHYd/view?usp=sharing">
                      <span>Lihat Detail</span>
                    </ShinyButton>
                  </div>
                </div>

                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <LinkIcon className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Partnership
                  </h3>
                  <p className="text-gray-300">
                    Kami terbuka untuk partnership dengan server lain yang aktif, memiliki minimal 500 member, dan mematuhi TOS Discord. Hubungi kami untuk info lebih lanjut.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-full md:w-5/12"
          >
            <img
              src="/sponsor.webp"
              alt="Sponsorship Illustration"
              className="w-full h-auto object-contain [filter:drop-shadow(0_10px_15px_rgba(234,88,12,0.2))]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Sponsor;