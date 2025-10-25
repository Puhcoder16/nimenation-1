import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { PartyPopper, GhostIcon, BatIcon } from '../components/icons/ShopIcons'; // sửa đường dẫn nếu icon bạn khác

const eventData = [
  {
    title: '🎉 Giảm Giá Cuối Tuần',
    description: 'Tất cả Acc Premium giảm tới 10% vào Thứ 7 & Chủ Nhật! Cơ hội vàng để sở hữu tài khoản xịn với giá siêu mềm!',
  },
  {
    title: '🎁 Quay Thưởng Khách Hàng May Mắn',
    description: 'Mỗi tháng shop quay số tặng 1 Acc Premium miễn phí cho khách đã từng mua hàng. Không cần đăng ký, auto tham gia!',
  },
  {
    title: '⚡ Flash Sale Theo Giờ',
    description: 'Các khung giờ bất ngờ giảm giá mạnh. Ai nhanh người được, số lượng cực giới hạn!',
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
      }}>
      <BatIcon className="w-full h-full" />
    </motion.div>
  );
};

const EventsPage = () => {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const [bats, setBats] = useState([]);

  useEffect(() => {
    const createBats = () =>
      setBats(
        Array.from({ length: 15 }).map(() => ({
          initialTop: Math.random() * 100,
          initialLeft: Math.random() * 100,
          speed: 1 + Math.random() * 1.5,
          size: 20 + Math.random() * 30,
        }))
      );
    createBats();
  }, []);

  return (
    <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: `url('/hero.webp')` }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="fixed inset-0 z-10 overflow-hidden pointer-events-none">
        {bats.map((bat, i) => (
          <FlyingBat key={i} scrollYProgress={scrollYProgress} {...bat} />
        ))}
      </div>

      <div className="relative z-20 pt-24 sm:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative">

          <motion.div className="absolute -top-10 left-10 text-orange-400/50"
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <GhostIcon className="w-16 h-16 opacity-50" />
          </motion.div>

          <motion.div className="absolute -top-16 right-10 text-orange-400/50"
            animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
            <GhostIcon className="w-20 h-20 opacity-40" />
          </motion.div>

          <div className="flex justify-center items-center gap-4">
            <PartyPopper className="w-10 h-10 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Sự Kiện Từ{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Shop Minecraft Chính Chủ
              </span>
            </h1>
          </div>

          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Đừng bỏ lỡ các chương trình khuyến mãi – quà tặng – ưu đãi đặc biệt dành riêng cho khách hàng của shop!
          </p>
        </div>

        <div className="space-y-8 max-w-3xl mx-auto">
          {eventData.map((event, i) => (
            <div key={i} className={`bg-gray-800/30 backdrop-blur-sm border rounded-xl p-6 ${theme.sections.borders.subtle}`}>
              <h3 className="text-2xl font-bold text-orange-400">{event.title}</h3>
              <p className="text-gray-300 mt-2">{event.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <ShinyButton to="/buy">
            <span>Mua Ngay Để Tham Gia Sự Kiện</span>
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
