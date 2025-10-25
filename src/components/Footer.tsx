import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import TiktokIcon from './icons/TiktokIcon';
import YoutubeIcon from './icons/YoutubeIcon';
import GhostIcon from './icons/halloween/GhostIcon';

const Footer = () => {
  const socialLinks = [
    { name: 'Discord', href: 'https://discord.gg/RDsv8KHunh', icon: DiscordIcon },
    { name: 'Instagram', href: 'https://www.instagram.com/made_in_tieukhu7', icon: InstagramIcon },
    { name: 'TikTok', href: 'https://www.tiktok.com/@renxog146', icon: TiktokIcon },
    { name: 'YouTube', href: 'https://www.youtube.com/@RenxOG146', icon: YoutubeIcon },
  ];

  return (
    <footer className="bg-nime-orange text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex items-center space-x-2">
            <GhostIcon className="w-7 h-7" />
            <span className="text-xl font-bold">RENX STORE</span>
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
            © {new Date().getFullYear()} renx store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
