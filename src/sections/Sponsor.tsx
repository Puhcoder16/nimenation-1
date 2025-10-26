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
          
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center md:text-left">
              Hỗ Trợ{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Shop Minecraft
              </span>
            </h2>

            <div className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
              <div className="space-y-8">

                {/* DONATE */}
                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <Heart className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Ủng Hộ Shop
                  </h3>
                  <p className="text-gray-300">
                    Bạn có thể ủng hộ để giúp shop duy trì hoạt động, cập nhật acc mới mỗi ngày và tổ chức giveaway free acc Minecraft. 
                    Người ủng hộ sẽ nhận <strong>role đặc biệt</strong> + <strong>ưu tiên hỗ trợ</strong>.
                  </p>
                </div>

                {/* SPONSORSHIP */}
                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <Handshake className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Tài Trợ / Quảng Bá
                  </h3>
                  <p className="text-gray-300">
                    Shop mở cơ hội hợp tác cho các bạn bán dịch vụ game hoặc creator. 
                    Nhận <strong>slot banner</strong>, giới thiệu kênh, và quảng bá ngay trên web / server shop.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <ShinyButton href="https://discord.com/invite/renx-store-860-luot-ban-road-to-3k-members-1345213854828728422">
                      <span>Săp cập nhật</span>
                    </ShinyButton>
                  </div>
                </div>

                {/* PARTNERSHIP */}
                <div>
                  <h3 className="flex items-center text-2xl font-semibold text-white mb-3">
                    <LinkIcon className={`w-6 h-6 mr-3 ${theme.sections.colors.primary}`} />
                    Đối Tác / Liên Kết
                  </h3>
                  <p className="text-gray-300">
                    Shop sẵn sàng hợp tác với YouTuber, Streamer, Server Minecraft hoặc cộng đồng ≥ 3000 thành viên. 
                    Cùng phát triển, cùng có lợi.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="hidden md:block w-full md:w-5/12"
          >
            <img
              src="/sponsor.webp"
              alt="Sponsor Illustration"
              className="w-full h-auto object-contain [filter:drop-shadow(0_10px_15px_rgba(234,88,12,0.2))]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Sponsor;

