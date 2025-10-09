import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import GoogleIcon from '../components/icons/GoogleIcon';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  loginWithGoogle,
  resetPassword
} from '../api/firebase';
import { FirebaseError } from 'firebase/app';

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password harus minimal 8 karakter.';
    if (!/[A-Z]/.test(pass)) return 'Password harus mengandung minimal satu huruf besar.';
    if (!/\d/.test(pass)) return 'Password harus mengandung minimal satu angka.';
    return '';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    if (isSignIn) {
      try {
        await signInWithEmail(email, password);
        navigate('/');
      } catch (err) {
        if (err instanceof FirebaseError && (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential')) {
          setError('Email atau password salah.');
        } else {
          setError('Gagal masuk. Silakan coba lagi.');
        }
      }
    } else {
      if (password !== confirmPassword) {
        setError('Konfirmasi password tidak cocok.');
        setLoading(false);
        return;
      }
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        setLoading(false);
        return;
      }
      try {
        await signUpWithEmail(fullName, email, password);
        setSuccessMessage('Pendaftaran berhasil! Cek email Anda untuk verifikasi. Mungkin ada di folder Spam.');
        setTimeout(() => {
          setIsSignIn(true);
          setSuccessMessage('');
          setFullName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }, 5000);
      } catch (err) {
        if (err instanceof FirebaseError && err.code === 'auth/email-already-in-use') {
          setError('Email ini sudah terdaftar.');
        } else {
          setError('Gagal mendaftar. Silakan coba lagi.');
        }
      }
    }
    setLoading(false);
  };
  
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Gagal login dengan Google. Silakan coba lagi.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Masukkan email Anda terlebih dahulu untuk reset password.');
      return;
    }
    try {
      await resetPassword(email);
      setSuccessMessage(`Email reset password telah dikirim ke ${email}. Cek juga folder Spam.`);
      setError('');
    } catch (err) {
      setError('Gagal mengirim email reset password.');
    }
  };

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 md:p-10 ${theme.sections.borders.subtle}`}>
          <div className="flex mb-8 border-b border-gray-700">
            <button
              onClick={() => { setIsSignIn(true); setError(''); setSuccessMessage(''); }}
              className={`w-1/2 pb-3 text-xl font-bold transition-colors ${isSignIn ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}
            >
              Masuk
            </button>
            <button
              onClick={() => { setIsSignIn(false); setError(''); setSuccessMessage(''); }}
              className={`w-1/2 pb-3 text-xl font-bold transition-colors ${!isSignIn ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {!isSignIn && (
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
            />
            {!isSignIn && (
              <input
                type="password"
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-gray-900/50 rounded-lg p-4 text-lg border border-gray-700 focus:ring-2 focus:ring-orange-500"
              />
            )}

            {error && <p className="text-red-400 text-center">{error}</p>}
            {successMessage && <p className="text-green-400 text-center">{successMessage}</p>}

            <ShinyButton type="submit" className="w-full" disabled={loading}>
              <span>{loading ? 'Memproses...' : (isSignIn ? 'Masuk Sekarang' : 'Daftar Sekarang')}</span>
            </ShinyButton>
            
            {isSignIn && (
               <div className="text-center">
                  <button type="button" onClick={handlePasswordReset} className="text-sm text-orange-400 hover:underline">
                    Lupa Password?
                  </button>
                </div>
            )}
          </form>

          <div className="flex items-center my-6">
            <hr className="w-full border-gray-700" />
            <span className="px-4 text-gray-400">ATAU</span>
            <hr className="w-full border-gray-700" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <GoogleIcon />
            Lanjutkan dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;