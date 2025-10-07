interface HeroStyles {
  gradientText: string;
  button: {
    gradient: string;
    shadow: string;
  };
}

interface SectionStyles {
  background: string;
  colors: {
    primary: string;
  };
  borders: {
    subtle: string;
    hover: string;
  };
}

interface AppTheme {
  hero: HeroStyles;
  sections: SectionStyles;
}

export const currentTheme = {
  hero: {
    gradientText: 'from-yellow-400 to-orange-500',
    button: {
      gradient: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      shadow: 'hover:shadow-orange-500/50',
    },
  },
  sections: {
    background: 'bg-gradient-to-br from-orange-950 via-orange-600 to-amber-500',
    colors: {
      primary: 'text-orange-500',
    },
    borders: {
      subtle: 'border-orange-500/30',
      hover: 'hover:border-orange-500/60',
    },
  },
};