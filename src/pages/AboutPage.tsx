import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import AboutIcon from '../components/icons/AboutIcon';
import ShinyButton from '../components/ShinyButton';

const AboutPage = () => {
  const theme = useTheme();

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <AboutIcon className="w-10 h-10 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Tentang{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Nimenation
              </span>
            </h1>
          </div>
        </div>

        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 md:p-12 space-y-6 text-gray-300 text-lg leading-relaxed ${theme.sections.borders.subtle}`}>
          <p>
            <strong>Nimenation</strong> adalah server Discord yang didedikasikan untuk para pecinta anime dan manga, tak hanya dari Indonesia tapi juga dari berbagai belahan dunia. Di Nimenation, kami memegang teguh konsep inklusivitas. Di sini adalah tempat yang ramah dan terbuka di mana kalian bisa mencari teman baru, kenalan, atau bahkan seperti keluarga.
          </p>
          <p>
            Dengan suasana yang hangat, kami menyambut setiap individu yang tertarik untuk berdiskusi, berbagi rekomendasi, dan membentuk hubungan dengan sesama penggemar.
          </p>

          <h2 className="text-2xl font-bold text-white pt-4 !mt-10">Visi & Misi</h2>
          <p>
            Menjadi sebuah komunitas pencinta anime yang aktif, aman, dan nyaman, serta sebagai wadah terpercaya bagi para Nimetizen untuk mengeksplorasi dan mengembangkan minat serta hobinya dalam dunia anime.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Memperluas Nimenation ke platform media sosial lainnya.</li>
            <li>Mengadakan acara dan kegiatan secara berkala.</li>
            <li>Membuat aturan jelas untuk memastikan setiap anggota aman.</li>
            <li>Memberdayakan diskusi sehat mengenai anime dan pop-culture.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white pt-4 !mt-10">Sejarah Singkat</h2>
          <p>
            Awalnya dikenal sebagai Anime/Wibu Couple Nation pada 16 Februari 2022 di Openchat LINE, komunitas kami berkembang pesat hingga mencapai lebih dari 1.000 member. Ketika fitur Openchat dihapus, Nimenation beralih ke Discord sebagai basis utama pada 08 April 2022 dan dibuka untuk publik sejak 1 Januari 2023.
          </p>
        </div>

        <div className="text-center mt-12">
          <ShinyButton to="/" text="Kembali ke Beranda" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;