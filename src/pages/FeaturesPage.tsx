import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import FeaturesIcon from '../components/icons/FeaturesIcon';

const featureData = [
  {
    category: 'Informasi & Pengumuman',
    items: [
      { name: 'Aturan & Verifikasi', description: 'Temukan semua aturan server dan lakukan verifikasi mandiri di channel ini.' },
      { name: 'Pengumuman Resmi', description: 'Jangan sampai ketinggalan berita terbaru, event, dan semua pengumuman penting dari kami.' },
      { name: 'Info Role', description: 'Pelajari fungsi setiap role yang ada di server dan cara untuk mendapatkannya.' },
      { name: 'Dukungan Server', description: 'Informasi bagi kamu yang ingin memberikan dukungan untuk perkembangan server.' },
    ],
  },
  {
    category: 'Aktivitas Komunitas',
    items: [
      { name: 'Lobby Utama', description: 'Tempat utama untuk mengobrol santai setiap hari dengan semua Nimetizen.' },
      { name: 'Cari Pasangan', description: 'Channel khusus bagi yang ingin mencari pasangan atau teman couple dengan kriteria masing-masing.' },
      { name: 'Diskusi Anime & Manga', description: 'Wadah untuk membahas, berteori, dan berbagi rekomendasi seputar anime, manga, dan novel.' },
      { name: 'Giveaway', description: 'Ikuti berbagai event giveaway dengan hadiah menarik yang kami adakan secara berkala.' },
    ],
  },
  {
    category: 'Ekspresi & Kreativitas',
    items: [
      { name: 'Galeri Foto', description: 'Bagikan momen atau gambar random yang menarik untuk dilihat bersama.' },
      { name: 'Pojok Seni', description: 'Pamerkan karya senimu, baik itu gambar, desain, atau karakter orisinal buatanmu.' },
      { name: 'Info Event Jejepangan', description: 'Dapatkan dan bagikan info seputar event Jejepangan dan dunia cosplay.' },
      { name: 'Zona Musik & Film', description: 'Berbagi playlist favorit atau diskusikan film dan series terbaru.' },
      { name: 'Promosi Karya', description: 'Tempat untuk mempromosikan produk atau karyamu kepada sesama member (dilarang promosi server lain).' },
    ],
  },
  {
    category: 'Game Corner',
    items: [
      { name: 'Diskusi Game', description: 'Tempat untuk membahas semua jenis game, baik mobile maupun PC.' },
      { name: 'Cari Teman Mabar', description: 'Gunakan forum interaktif kami untuk mencari teman main bareng sesuai game favoritmu.' },
    ],
  },
];

const Card = ({ title, items }) => {
  const theme = useTheme();
  return (
    <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-orange-400 text-xl">{item.name}</h3>
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturesPage = () => {
  const theme = useTheme();

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <FeaturesIcon className="hidden sm:block w-10 h-10 text-orange-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Fitur Lengkap{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Nimenation
              </span>
            </h1>
          </div>
        </div>

        <div className="space-y-10">
          {featureData.map((categoryData) => (
            <Card key={categoryData.category} title={categoryData.category} items={categoryData.items} />
          ))}
        </div>

        <div className="text-center mt-12">
          <ShinyButton to="/" text="Kembali ke Beranda" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;