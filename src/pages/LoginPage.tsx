import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';
import ShinyButton from '../components/ShinyButton';
import { loginWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '../api/firebase';
import { LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/reviews');
    } catch (err) {
      setError('Gagal login dengan Google.');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isSignIn) {
        await signInWithEmail(email, password);
        navigate('/reviews');
      } else {
        await signUpWithEmail(name, email, password);
        navigate('/reviews');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    }
  };

  const handlePasswordReset = async () => {
      if (!email) {
          setError('Masukkan email Anda untuk reset password.');
          return;
      }
      try {
          await resetPassword(email);
          setMessage('Link reset password telah dikirim ke email Anda.');
      } catch (err) {
          setError('Gagal mengirim link reset password.');
      }
  }

  return (
    <div className="pt-24 sm:pt-32 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className={`bg-gray-800/20 backdrop-blur-sm border rounded-2xl p-8 ${theme.sections.borders.subtle}`}>
          <div className="flex border-b border-gray-700 mb-6">
            <button onClick={() => setIsSignIn(true)} className={`w-1/2 pb-3 text-lg font-semibold ${isSignIn ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}>
              Masuk
            </button>
            <button onClick={() => setIsSignIn(false)} className={`w-1/2 pb-3 text-lg font-semibold ${!isSignIn ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400'}`}>
              Daftar
            </button>
          </div>
          
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {!isSignIn && (
              <input type="text" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-900/50 rounded-lg p-3 border border-gray-700 focus:ring-1 focus:ring-orange-500" />
            )}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-900/50 rounded-lg p-3 border border-gray-700 focus:ring-1 focus:ring-orange-500" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-900/50 rounded-lg p-3 border border-gray-700 focus:ring-1 focus:ring-orange-500" required />
            
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}

            <ShinyButton type="submit" className="w-full">
                <div className="flex items-center justify-center gap-2">
                    {isSignIn ? <LogIn className="w-5 h-5"/> : <UserPlus className="w-5 h-5"/>}
                    <span>{isSignIn ? 'Masuk' : 'Daftar Sekarang'}</span>
                </div>
            </ShinyButton>
          </form>

          {isSignIn && (
              <div className="text-center mt-4">
                  <button onClick={handlePasswordReset} className="text-sm text-gray-400 hover:text-orange-400">Lupa Password?</button>
              </div>
          )}

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-700" />
            <span className="mx-4 text-gray-500 text-sm">ATAU</span>
            <hr className="flex-grow border-gray-700" />
          </div>

          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-700/80 p-3 rounded-lg transition-colors font-semibold">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
            Lanjutkan dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;