import { Link } from 'react-router-dom';
import React from 'react';

// Tipe props dibuat lebih fleksibel
type ShinyButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ({ to: string; href?: never; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; } | { to?: never; href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; } | { to?: never; href?: never; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; });

const ShinyButton = ({ children, to, href, onClick, className = '' }: ShinyButtonProps) => {
  const commonClasses = `bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6 text-white inline-block ${className}`;

  const content = (
    <>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(249,115,22,0.6)_0%,rgba(249,115,22,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center justify-center z-10 rounded-full bg-zinc-950 py-2.5 px-6 ring-1 ring-white/10">
        {children}
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-orange-400/0 via-orange-400/90 to-orange-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={commonClasses} onClick={onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses} onClick={onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}>
        {content}
      </a>
    );
  }

  return (
    <button className={commonClasses} onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}>
      {content}
    </button>
  );
};

export default ShinyButton;