import { useEffect } from "react";

const steps2FA = [
  "Truy cập website https://www.minecraft.net",
  "Đăng nhập tài khoản Minecraft / Microsoft của bạn.",
  "Vào phần **Account Security** hoặc **Advanced Security Options**.",
  "Chọn **Two-Factor Authentication (2FA)**.",
  "Chọn ứng dụng xác thực: **Google Authenticator**, **Authy**, hoặc Microsoft Authenticator.",
  "Quét mã QR và nhập mã xác nhận để kích hoạt.",
];

const stepsRecovery = [
  "Sau khi bật 2FA, bạn sẽ thấy tùy chọn **Recovery Codes**.",
  "Nhấn **Generate New Codes**.",
  "Lưu các mã vào nơi an toàn: Google Drive, Notion, hoặc giấy ghi chép.",
  "Tuyệt đối **không chia sẻ** cho người khác.",
  "Nếu mất điện thoại hoặc 2FA hỏng → dùng Recovery Codes để đăng nhập.",
];

const tipList = [
  "Không chia sẻ username / email cho người lạ.",
  "Không đăng nhập vào website mod / hack lạ.",
  "Luôn kiểm tra URL phải là *.microsoft.com hoặc *.minecraft.net.",
  "Không tắt 2FA trừ khi thật sự cần thiết.",
];

const MinecraftSecurityGuide = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen py-16 px-6 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold text-center mb-10">
        Hướng Dẫn Bảo Mật Tài Khoản Minecraft
      </h1>

      {/* 2FA Section */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-blue-400">
          1) Kích Hoạt Xác Thực 2 Lớp (2FA)
        </h2>
        <p className="text-white/80 mb-6">
          2FA giúp bảo vệ tài khoản của bạn khỏi việc bị đánh cắp ngay cả khi người khác biết mật khẩu.
        </p>

        <ol className="space-y-4 list-decimal list-inside text-white/90">
          {steps2FA.map((step, index) => (
            <li key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Recovery Codes Section */}
      <section className="mb-14">
        <h2 className="text-3xl font-semibold mb-6 text-green-400">
          2) Tạo và Lưu Recovery Codes
        </h2>
        <p className="text-white/80 mb-6">
          Khi mất quyền truy cập vào ứng dụng 2FA, Recovery Codes sẽ là chìa khóa giúp bạn lấy lại tài khoản.
        </p>

        <ol className="space-y-4 list-decimal list-inside text-white/90">
          {stepsRecovery.map((step, index) => (
            <li key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Tips */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
          ⚠️ Lưu Ý Quan Trọng
        </h2>
        <ul className="list-disc list-inside space-y-3 text-white/80">
          {tipList.map((tip, index) => (
            <li key={index} className="p-2 bg-white/5 rounded-lg border border-white/10">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Join Button */}
      <div className="text-center">
        <a
          href="https://account.microsoft.com/security"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg font-medium"
        >
          Mở Trang Bảo Mật Microsoft
        </a>
      </div>
    </div>
  );
};

export default MinecraftSecurityGuide;
