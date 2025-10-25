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
              Giới Thiệu{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                Shop Minecraft
              </span>
            </h1>
          </div>
        </div>

        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 md:p-12 space-y-6 text-gray-300 text-lg leading-relaxed ${theme.sections.borders.subtle}`}>
          <p>
            <strong>Shop Minecraft</strong> là nơi chuyên cung cấp tài khoản Minecraft bản quyền, key game, tăng cấp, hỗ trợ – uy tín lâu năm, khách hàng trải dài khắp nơi.
          </p>
          <p>
            Chúng tôi luôn cam kết mang đến trải nghiệm mua hàng **nhanh chóng – an toàn – hỗ trợ nhiệt tình 24/7**, đảm bảo người chơi có thể vào game ngay sau khi thanh toán.
          </p>

          <h2 className="text-2xl font-bold text-white pt-4 !mt-10">Tầm Nhìn & Sứ Mệnh</h2>
          <p>
            Trở thành một trong những shop tài khoản game uy tín nhất Việt Nam, giúp game thủ tiếp cận Minecraft bản quyền với giá hợp lý, bảo mật cao, và hỗ trợ trọn đời.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Cung cấp tài khoản Minecraft đa dạng & giá tốt.</li>
            <li>Hỗ trợ kỹ thuật nhanh – tận tâm – rõ ràng.</li>
            <li>Bảo hành đổi mới nếu lỗi đăng nhập.</li>
            <li>Tạo môi trường cộng đồng giao lưu – chơi cùng nhau.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white pt-4 !mt-10">Câu Chuyện Hình Thành</h2>
          <p>
            Shop được thành lập từ năm 2024 với mục tiêu mang đến tài khoản Minecraft rẻ – chất lượng – minh bạch. Đến nay, shop đã phục vụ hơn <strong>1000+ khách hàng</strong> và nhận được hàng trăm feedback tích cực mỗi ngày.
          </p>
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

export default AboutPage;
