import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import ShinyButton from './ShinyButton';
import { motion } from 'framer-motion';

import { User } from 'firebase/auth';
import { onAuthChange, logout } from '../api/firebase';

import HomeIcon from './icons/HomeIcon';
import AboutIcon from './icons/AboutIcon';
import SponsorIcon from './icons/SponsorIcon';
import CommunityIcon from './icons/CommunityIcon';
import FeaturesIcon from './icons/FeaturesIcon';
import RulesIcon from './icons/RulesIcon';
import RecruitmentIcon from './icons/RecruitmentIcon';
import EventsIcon from './icons/EventsIcon';
import ReviewsIcon from './icons/ReviewsIcon';

import { Menu, X, ChevronDown, LogIn, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthChange(setUser);
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/about', label: 'About', icon: AboutIcon },
    { to: '/events', label: 'Events', icon: EventsIcon },
    {
      label: 'Community',
      icon: CommunityIcon,
      subLinks: [
        { to: '/features', label: 'Features', icon: FeaturesIcon },
        { to: '/rules', label: 'Rules', icon: RulesIcon },
        { to: '/reviews', label: 'Reviews', icon: ReviewsIcon },
      ],
    },
    { to: '/sponsor', label: 'Sponsor', icon: SponsorIcon },
  ];

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleCommunityClick = () => setIsCommunityOpen(!isCommunityOpen);

  const handleLoginRedirect = () => {
    handleLinkClick();
    navigate('/login');
  };

  const handleLogout = async () => {
    await logout();
    handleLinkClick();
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="flex-shrink-0">
              <img src="/avatar.webp" alt="Nimenation Logo" className="h-14 w-14 rounded-full object-cover" />
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="text-white p-2">
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <nav className={`fixed top-0 right-0 h-full w-4/5 max-w-xs shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} ${theme.sections.background}`}>
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {user ? (
              <div className="flex items-center gap-3">
                <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email}&background=random`} alt={user.displayName || ''} className="h-10 w-10 rounded-full object-cover" />
                <span className="font-semibold text-white text-base truncate">{user.displayName || user.email}</span>
              </div>
            ) : (
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3">
                <img src="/avatar.webp" alt="Nimenation Logo" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-bold text-white text-lg">RENX STORE</span>
              </Link>
            )}
            <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col flex-grow overflow-y-auto">
            {/* Bagian Atas: Tombol Aksi */}
            <div className="p-6 space-y-4">
              {user ? (
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-gray-300 hover:text-white bg-gray-700/50 hover:bg-gray-700/80 p-3 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" /><span>...</span>
                </button>
              ) : (
                <ShinyButton onClick={handleLoginRedirect} className="w-full">
                  <LogIn className="w-5 h-5" /><span>...</span>
                </ShinyButton>
              )}
              <ShinyButton to="/recruitment" onClick={handleLinkClick} className="w-full">
                <RecruitmentIcon className="w-5 h-5" /><span>Recruitment</span>
              </ShinyButton>
            </div>

            <hr className="border-white/10 mx-6" />

            {/* Bagian Bawah: Navigasi Utama */}
            <div className="p-6 space-y-2">
              {navLinks.map((link) => link.subLinks ? (
                  <div key={link.label}>
                    <button onClick={handleCommunityClick} className="w-full flex items-center justify-between gap-4 text-gray-200 hover:text-white transition-colors duration-200 text-xl font-semibold p-3 rounded-lg hover:bg-white/5">
                      <div className="flex items-center gap-4"><link.icon className="w-6 h-6" /><span>{link.label}</span></div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isCommunityOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <motion.div initial={false} animate={{ height: isCommunityOpen ? 'auto' : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden ml-6 border-l border-white/10">
                      <div className="flex flex-col space-y-1 pt-2">
                        {link.subLinks.map((subLink) => (
                          <NavLink key={subLink.label} to={subLink.to} onClick={handleLinkClick} className={({ isActive }) => `flex items-center gap-3 pl-5 py-2 rounded-r-lg text-lg font-medium transition-colors duration-200 ${isActive ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            <subLink.icon className="w-5 h-5" /><span>{subLink.label}</span>
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <NavLink key={link.label} to={link.to} onClick={handleLinkClick} className={({ isActive }) => `flex items-center gap-4 transition-colors duration-200 text-xl font-semibold p-3 rounded-lg ${isActive ? 'bg-orange-500/20 text-orange-400' : 'text-gray-200 hover:text-white hover:bg-white/5'}`}>
                    <link.icon className="w-6 h-6" /><span>{link.label}</span>
                  </NavLink>
                )
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
