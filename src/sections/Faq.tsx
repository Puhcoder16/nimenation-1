import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const faqData = [
  { question: 'Event Nime tiap hari apa saja sih, min?', answer: 'Tiap hari Jumat/Sabtu/Minggu, jangan lupa mampir ya!' },
  { question: 'Kak, kalau mau ngasih saran event ke siapa ya?', answer: 'Bisa langsung ke feedback channel. Kalau nggak, bisa hubungi salah satu Grand Duke ya!' },
  { question: 'Kalau mau nyari temen mabar di channel mana sih, kak?', answer: 'Kamu bisa nyari temen mabar di channel All Game Chat. Kalau nggak, juga bisa mampir ke post yang sudah disediakan tuh!' },
  { question: 'Apa sih maksud NCP?', answer: 'NCP itu Need Couple, biasa dipake buat temen-temen nyari couple profile atau nggak nyari pasangan hidup hehe.' },
  { question: 'Gimana sih cara join Nimenation Staff?', answer: 'Tunggu aja ya, setiap 3 bulan sekali pasti ada open recruitment tuh. Langsung aja daftar jika kamu berminat.' },
  { question: 'Cara buat level up gimana sih, kak?', answer: 'Kamu bisa sering-sering join voice dan juga chatting di lobby dan channel chat manapun ya. Otomatis level dan juga EXP kamu akan naik kok. Sering-sering nimbrung aja, guys!' },
  { question: 'Kok chatku sering otomatis kehapus ya? Kok aku tiba-tiba kena timeout ya?', answer: 'Itu berarti kamu melanggar peraturan yang sudah kami tetapkan, dan mungkin menggunakan kata-kata yang kami banned.' },
  { question: 'Kak, kalau misal ada member yang nyebelin aku, lapor ke siapa ya?', answer: 'Ke admin mana pun dan pasti akan langsung kami tindak lanjuti.' },
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