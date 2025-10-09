import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    // Tampilkan loading screen atau spinner di sini
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (!user) {
    // Jika user tidak login, redirect ke halaman login
    // Simpan lokasi saat ini agar bisa kembali setelah login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;