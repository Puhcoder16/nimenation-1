import { Ghost, Instagram, Youtube, Twitch } from 'lucide-react';
import { useTheme } from './ThemeContext';

const TikTokIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12 20a8.5 8.5 0 0 1-7.8-4.7A8.38 8.38 0 0 1 3 11.5a8.38 8.38 0 0 1 .9-3.8A8.5 8.5 0 0 1 12 4a8.5 8.5 0 0 1 7.8 4.7A8.38 8.38 0 0 1 21 11.5z" />
    <path d="M12 4v8" />
    <path d="M15.5 10.5a3.5 3.5 0 1 0-3.5 3.5V8" />
  </svg>
);

const DiscordIcon = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.46v19.08c0 1.356-1.104 2.46-2.46 2.46H4.46C3.104 24 2 22.896 2 21.54V2.46C2 1.104 3.104 0 4.46 0h15.08zM9.5 14.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm5 0c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
    </svg>
);


const Footer = () => {
  const theme = useTheme();

  const socialLinks = [
    { name: 'Discord', href: 'https://discord.gg/nimenation', icon: DiscordIcon },
    { name: 'Instagram', href: 'https://instagram.com/nimenation', icon: Instagram },
    { name: 'TikTok', href: 'https://tiktok.com/@nimenation', icon: TikTokIcon },
    { name: 'YouTube', href: 'https://youtube.com/@nimenation', icon: Youtube },
  ];

  return (
    <footer className="bg-nime-orange text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex items-center space-x-2">
            <Ghost className="w-7 h-7" />
            <span className="text-xl font-bold">Nimenation</span>
          </div>

          <div className="flex items-center justify-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label={link.name}
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <div className="text-sm">
            © {new Date().getFullYear()} Nimenation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;