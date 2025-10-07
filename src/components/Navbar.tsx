import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* INI BAGIAN YANG DIPERBAIKI: Logo Vite diganti teks */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">
              Nime
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.hero.gradientText}`}>
                nation
              </span>
            </h1>
          </Link>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-lg"
              >
                {link.label}
              </a>
            ))}
             <a
              href="https://discord.gg/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block bg-gradient-to-r text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition-all duration-200 transform hover:scale-105 ${theme.hero.button.gradient}`}
            >
              Join
            </a>
          </nav>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="md:hidden bg-neutral-900 px-4 pt-2 pb-4 space-y-2">
           {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors duration-200 py-2 text-lg"
              >
                {link.label}
              </a>
            ))}
             <a
              href="https://discord.gg/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              className={`block text-center mt-2 bg-gradient-to-r text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-200 ${theme.hero.button.gradient}`}
            >
              Join
            </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;