import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import RulesIcon from '../components/icons/RulesIcon';

const rulesData = {
  general: [
    'Dilarang membahas atau menyebarkan konten negatif (SARA, 18+).',
    'Dilarang membahas topik sensitif (politik, masalah pribadi, dll).',
    'Dilarang membuat keributan. Selesaikan masalah pribadi secara personal.',
    'Jangan asik sendiri dengan circle, libatkan member lain dalam percakapan.',
    'Dilarang melakukan tindakan yang mengganggu kenyamanan member lain.',
    'Dilarang SPAM dalam bentuk apapun (kata, GIF, emoji, stiker).',
    'Dilarang HODE. Ambil role "Rather Not to Say" jika tidak ingin memilih gender.',
    'Gunakan foto profil dan username yang wajar (tidak mengandung 18+/SARA).',
    'Gunakan setiap channel dan bot yang tersedia dengan benar.',
    'Dilarang keluar-masuk server secara berlebihan (maksimal 3x) tanpa alasan jelas.',
    'Diperbolehkan menggunakan bahasa Inggris, tapi jangan berlebihan dan eksklusif.',
  ],
  punishment: [
    'Pelanggaran pertama akan diberikan peringatan (warn).',
    'Pelanggaran kedua akan diberikan timeout minimal 1 hari.',
    'Pelanggaran ketiga akan dipertimbangkan untuk di-banned.',
  ],
  automod: [
    'Jika terkena timeout (TO) karena perilaku toxic, jangan menghapus TO-nya.',
    'Jika dalam 1 hari terkena 3x warn, akan diberikan TO selama 1 hari.',
    'Setelah TO, jumlah warn akan di-reset. Pelanggaran berulang akan meningkatkan durasi TO (7 hari).',
    'Jangan memplesetkan kata yang masuk daftar ban untuk menghindari automod.',
  ],
  voice: [
    'Pembahasan di voice tidak boleh dibawa ke ruang publik seperti lobby.',
    'Jangan masuk ke voice channel yang dikunci (lock) oleh orang lain.',
    'Penggunaan kata-kata toxic di voice diperbolehkan selama tidak menyinggung atau merugikan orang lain.',
  ],
};

const Card = ({ title, rules }) => {
  const theme = useTheme();
  return (
    <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <ul className="list-decimal list-inside space-y-3 text-gray-300 text-lg leading-relaxed">
        {rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

const RulesPage = () => {
  const theme = useTheme();

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <RulesIcon className="hidden sm:block w-10 h-10 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Peraturan{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Server
              </span>
            </h1>
          </div>
        </div>

        <div className="space-y-10">
          <Card title="Peraturan Umum" rules={rulesData.general} />
          <Card title="Sanksi (Punishment)" rules={rulesData.punishment} />
          <Card title="Ban Word & Automod" rules={rulesData.automod} />
          <Card title="Peraturan Voice Channel" rules={rulesData.voice} />
        </div>

        <div className="text-center mt-12">
          <ShinyButton to="/">
            <span>Kembali ke Beranda</span>
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;