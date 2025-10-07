// src/components/themes.ts

interface Theme {
  name: string;
  bannerImage: string;
  colors: {
    primary: string;
    primaryHex: string;
    secondary: string;
    gradientText: string;
  };
  backgrounds: {
    hero: string;
    about: string;
  };
  borders: {
    subtle: string;
    hover: string;
  };
  buttons: {
    gradient: string;
    shadow: string;
  };
}

type ThemeCollection = {
  [key: string]: Theme;
};

export const themes: ThemeCollection = {
  halloween: {
    name: 'Halloween',
    bannerImage: 'https://i.imgur.com/75I7rjW.jpeg',
    colors: {
      primary: 'text-orange-500',
      primaryHex: '#F97316',
      secondary: 'text-purple-500',
      gradientText: 'from-orange-500 to-purple-500',
    },
    backgrounds: {
      hero: 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-orange-900/20',
      about: 'bg-gradient-to-br from-gray-900 to-gray-800',
    },
    borders: {
      subtle: 'border-orange-500/20',
      hover: 'hover:border-orange-500/50',
    },
    buttons: {
      gradient: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      shadow: 'hover:shadow-orange-500/50',
    },
  },
  newYear: {
    name: 'New Year',
    bannerImage: 'URL_BANNER_NEW_YEAR.jpg',
    colors: {
      primary: 'text-yellow-400',
      primaryHex: '#FBBF24',
      secondary: 'text-gray-300',
      gradientText: 'from-yellow-400 to-white',
    },
    backgrounds: {
      hero: 'bg-gradient-to-br from-gray-900 via-blue-900/30 to-black',
      about: 'bg-gradient-to-br from-gray-900 to-gray-800',
    },
    borders: {
      subtle: 'border-yellow-400/20',
      hover: 'hover:border-yellow-400/50',
    },
    buttons: {
      gradient: 'from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600',
      shadow: 'hover:shadow-yellow-400/50',
    },
  },
};

export const currentTheme: Theme = themes.halloween;