import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ShinyButton from './ShinyButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#sponsor', label: 'Sponsor' },
  ];

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <a href="#home" className="flex-shrink-0">
              <img src="/avatar.webp" alt="Nimenation Logo" className="h-14 w-14 rounded-full object-cover border-2 border-orange-500/50" />
            </a>

            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-200 hover:text-white transition-colors duration-200 text-lg font-medium">
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

      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
        
        <nav className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-neutral-800/95 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-end p-4">
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <X size={30} />
            </button>
          </div>
          
          <div className="flex flex-col items-start p-8 space-y-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white transition-colors duration-200 text-2xl font-semibold">
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto p-8">
            <ShinyButton href="#recruitment" text="Recruitment" className="w-full text-center block" />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;