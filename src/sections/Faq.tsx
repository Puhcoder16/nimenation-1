import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const faqData = [
{ question: 'Shop có event giảm giá vào ngày nào vậy ad?', answer: 'Shop giảm giá mạnh vào Thứ 6 - Thứ 7 - Chủ Nhật nha! Nhớ vào check kẻo lỡ deal ngon! 🔥' },
{ question: 'Nếu em muốn đề xuất tính năng/mong muốn hỗ trợ thêm thì gửi ở đâu ạ?', answer: 'Em có thể gửi trực tiếp tại kênh góp ý hoặc inbox ad. Shop luôn lắng nghe khách hàng 💛' },
{ question: 'Muốn tìm người mabar Minecraft thì vô đâu vậy shop?', answer: 'Vô kênh trò chuyện hoặc Discord cộng đồng của shop nha, đảm bảo có người ghép team liền 😎' },
{ question: 'Acc Premium ở shop có bảo hành không ạ?', answer: 'Có nha! Tất cả acc đều bảo hành lâu dài. Nếu lỗi cứ liên hệ shop hỗ trợ liền 💯' },
{ question: 'Tại sao tin nhắn em bị xoá hoặc bị mute vậy ad?', answer: 'Có thể em vô tình dùng từ nằm trong danh sách hạn chế hệ thống. Không sao đâu, chỉ cần chú ý là ok 😄' },
{ question: 'Nếu có người toxic/chửi nhau phải làm sao?', answer: 'Báo admin hoặc mod shop. Bên mình xử lý nhanh, bảo vệ cộng đồng là ưu tiên hàng đầu 👍' },
];

const AccordionItem = ({ item, isOpen, onClick }) => {
  const theme = useTheme();
  return (
    <div className={`border-b ${theme.sections.borders.subtle}`}>
      <button onClick={onClick} className="w-full flex justify-between items-center text-left py-5 px-6">
        <span className="text-lg font-medium text-white">{item.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${isOpen ? theme.sections.colors.primary : 'text-gray-400'}`} />
        </motion.div>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
        <div className="pb-5 px-6">
          <p className="text-gray-300 leading-relaxed">{item.answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const theme = useTheme();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={ref} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }} className="hidden md:block w-full md:w-5/12">
            <img src="/faq.webp" alt="FAQ Illustration" className="w-full h-auto object-contain [filter:drop-shadow(0_10px_15px_rgba(234,88,12,0.2))]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="w-full md:w-7/12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center md:text-left">
              Frequently Asked{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Question
              </span>
            </h2>
            <div className={`bg-gray-800/50 backdrop-blur-sm border rounded-2xl ${theme.sections.borders.subtle}`}>
              {faqData.map((item, index) => (
                <AccordionItem key={index} item={item} isOpen={openIndex === index} onClick={() => handleToggle(index)} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
