import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, resendVerificationEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import ShinyButton from './ShinyButton';
import { LogIn, AlertTriangle, Send } from 'lucide-react';

const VerificationGate = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage('');
    try {
      await resendVerificationEmail();
      setMessage('Email verifikasi baru telah dikirim! Cek inbox/spam Anda.');
    } catch (error) {
      setMessage('Gagal mengirim ulang email. Coba lagi beberapa saat.');
    }
    setIsResending(false);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>Memuat sesi pengguna...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <LogIn className="w-12 h-12 text-orange-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Akses Terbatas</h3>
        <p className="text-gray-300 mb-6">Anda harus masuk untuk dapat memberikan ulasan.</p>
        <ShinyButton onClick={() => navigate('/login')}>
          <span>Masuk / Daftar</span>
        </ShinyButton>
      </div>
    );
  }

  if (!user.emailVerified) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Verifikasi Email Anda</h3>
        <p className="text-gray-300 mb-6">
          Satu langkah lagi! Silakan periksa inbox (dan folder spam) Anda untuk link verifikasi yang telah kami kirim.
        </p>
        <ShinyButton onClick={handleResendEmail} disabled={isResending}>
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            <span>{isResending ? 'Mengirim...' : 'Kirim Ulang Email'}</span>
          </div>
        </ShinyButton>
        {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
      </div>
    );
  }

  return children;
};

export default VerificationGate;