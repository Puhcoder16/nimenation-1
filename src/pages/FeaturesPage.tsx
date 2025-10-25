import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import FeaturesIcon from '../components/icons/FeaturesIcon';

const featureData = [
  {
    category: 'Thông Tin & Hỗ Trợ',
    items: [
      { name: 'Hướng Dẫn Mua Hàng', description: 'Giải thích chi tiết cách mua tài khoản Minecraft tại shop: chọn loại acc, thanh toán, và nhận hàng tự động.' },
      { name: 'Chính Sách Bảo Hành', description: 'Shop cam kết bảo hành theo từng loại acc. Mất acc do lỗi shop → Đổi mới 100%.' },
      { name: 'Cách Đổi Skin / Nickname', description: 'Hướng dẫn tùy chỉnh skin và đổi IGN cho tài khoản Premium / Full Access.' },
      { name: 'Nạp Tiền Shop', description: 'Hỗ trợ nạp qua MoMo, MB Bank, Vietcombank, thẻ cào & Ví Quốc Tế.' },
    ],
  },
  {
    category: 'Sản Phẩm Tài Khoản',
    items: [
      { name: 'Minecraft Java + Bedrock Edition', description: 'Một tài khoản – chơi được cả PC lẫn Mobile (PE/Xbox/PS4/Switch).' },
    ],
  },
  {
    category: 'Dịch Vụ & Tiện Ích',
    items: [
      { name: 'Thiết Kế Logo / Banner Server', description: 'Tăng độ chuyên nghiệp cho server của bạn với thiết kế đẹp, phong cách.' },
      { name: 'Quảng Bá Server', description: 'Hỗ trợ PR server Minecraft của bạn để thu hút người chơi mới (không spam).' },
      { name: 'Nhiều dịch vụ khác', description: 'Discord, thiết kế thumbnail, avatar,v.v' },
    ],
  },
  {
    category: 'Cộng Đồng Khách Hàng',
    items: [
      { name: 'Group Chat Khách Mua', description: 'Cộng đồng thân thiện, chia sẻ tip chơi game, skin đẹp, seed map hay.' },
      { name: 'Mời Chơi Chung', description: 'Tìm bạn cùng chơi Minecraft, lập team, mở server chung cực vui.' },
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
              Tính Năng Dịch Vụ{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Shop Minecraft
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
          <ShinyButton to="/">
            <span>Quay lại Trang Chủ</span>
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
