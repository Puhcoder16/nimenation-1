import { Ghost } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-orange-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Ghost className="w-6 h-6 text-orange-500" />
            <span className="text-white font-semibold">Nimenation</span>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://discord.gg/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              Discord
            </a>
            <a
              href="https://instagram.com/nimenation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              Instagram
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            © 2025 Nimenation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
