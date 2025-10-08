import { useState } from 'react';
import { useTheme } from './ThemeContext';
import ShinyButton from './ShinyButton';
import HomeIcon from './icons/HomeIcon';
import AboutIcon from './icons/AboutIcon';
import SponsorIcon from './icons/SponsorIcon';
import RecruitmentIcon from './icons/RecruitmentIcon';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const navLinks = [
    { href: '#home', label: 'Home', icon: HomeIcon },
    { href: '#about', label: 'About', icon: AboutIcon },
    { href: '#sponsor', label: 'Sponsor', icon: SponsorIcon },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <a href="#home" className="flex-shrink-0">
              <img
                src="/avatar.webp"
                alt="Nimenation Logo"
                className="h-14 w-14 rounded-full object-cover"
              />
            </a>

            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-200 hover:text-white transition-colors duration-200 text-lg font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <ShinyButton href="#recruitment" text="Recruitment" />
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)} className="text-white p-2">
                <Menu size={30} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        <nav
          className={`fixed top-0 right-0 h-full w-4/5 max-w-xs shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } ${theme.sections.background}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
             <a href="#home" className="flex items-center gap-3">
              <img src="/avatar.webp" alt="Nimenation Logo" className="h-10 w-10 rounded-full object-cover"/>
              <span className="font-bold text-white text-lg">Nimenation</span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white p-2"
            >
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-gray-200 hover:text-white transition-colors duration-200 text-xl font-semibold p-3 rounded-lg hover:bg-white/5"
              >
                <link.icon className="w-6 h-6" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-auto p-6 border-t border-white/10">
            <ShinyButton
              href="#recruitment"
              text="Recruitment"
              className="w-full text-center block"
            />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;