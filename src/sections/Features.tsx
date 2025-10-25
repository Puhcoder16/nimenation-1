import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { Gamepad2, MessageSquare, Music, PartyPopper } from 'lucide-react';
import FeaturesIcon from '../components/icons/FeaturesIcon';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useTheme();

  const featureList = [
{
  icon: MessageSquare,
  title: 'Khu Chat Chung',
  description: 'Nơi trò chuyện mỗi ngày, chia sẻ câu chuyện, tâm sự và giao lưu với mọi người trong cộng đồng.',
},
{
  icon: Gamepad2,
  title: 'Giá thành',
  description: 'Giá rẻ, chât lưởng, bảo hành 1 đổi 1.',
},
{
  icon: PartyPopper,
  title: 'Sự Kiện & Hoạt Động',
  description: 'Tham gia mini-game, giveaway, event đặc biệt và nhận nhiều quà tặng hấp dẫn.',
},
{
  icon: Music,
  title: 'Kênh Voice & Music Bot',
  description: 'Tạo phòng voice riêng và nghe nhạc chung với bạn bè bằng bot nhạc chất lượng.',
},

  ];

  return (
    <section id="features" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <FeaturesIcon className="w-10 h-10 text-orange-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Fitur{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Unggulan
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featureList.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`bg-gray-800/50 backdrop-blur-sm border rounded-lg p-6 text-left h-full flex flex-col ${theme.sections.borders.subtle}`}
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10`}>
                  <Icon className={`w-7 h-7 ${theme.sections.colors.primary}`} />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-base flex-grow">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
        >
            <ShinyButton to="/features">
              <span>Dịch Vụ RenX Store</span>
            </ShinyButton>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;
