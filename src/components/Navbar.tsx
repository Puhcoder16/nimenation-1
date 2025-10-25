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
      ],
    },
  ];

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleCommunityClick = () => setIsCommunityOpen(!isCommunityOpen);

export default Navbar;
