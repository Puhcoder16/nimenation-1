import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import GoogleIcon from '../components/icons/GoogleIcon';
import { loginWithGoogle } from '../api/firebase';
import { FirebaseError } from 'firebase/app';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      if (err instanceof FirebaseError && err.code === 'auth/popup-closed-by-user') {
        setError('Login dibatalkan. Silakan coba lagi.');
      } else {
        setError('Gagal login dengan Google. Coba lagi nanti.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 md:p-12 text-center ${theme.sections.borders.subtle}`}>
          <h1 className="text-4xl font-bold text-white mb-4">Gabung Sekarang!</h1>
          <p className="text-gray-300 text-lg mb-8">Gunakan akun Google-mu untuk masuk atau mendaftar ke Nimenation dengan satu klik.</p>
          
          {error && <p className="text-red-400 mb-6">{error}</p>}
          
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <GoogleIcon />
            {loading ? 'Membuka Pop-up...' : 'Lanjutkan dengan Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;