import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import GhostIcon from '../components/icons/halloween/GhostIcon';
import BatIcon from '../components/icons/halloween/BatIcon';
import { PartyPopper } from 'lucide-react';

const eventData = [
  {
    title: 'Tặng Quà Cho Khách Hàng May Mắn',
    description: 'Mỗi tuần sẽ có quay số tặng *Acc Premium* miễn phí cho 1 khách may mắn. Chỉ cần bạn đã từng mua hàng tại shop là tự động tham gia!',
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
                Sự Kiện{' '}
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                  Người tiêu dùng Shop Minecraft
                </span>
              </h1>
            </div>
            <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
              Sale – Quà – Sự Kiện Giải Trí! Đây là thời điểm tuyệt vời nhất để sở hữu tài khoản Minecraft giá rẻ và tham gia những hoạt động có thưởng hấp dẫn.
            </p>
          </div>
