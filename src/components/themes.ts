// src/components/theme.ts

// Tipe data untuk gaya hero (elemen di atas gambar)
interface HeroStyles {
  gradientText: string;
  button: {
    gradient: string;
    shadow: string;
  };
}

// Tipe data untuk gaya section lain (About, dll)
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

// Tipe data untuk keseluruhan tema
interface AppTheme {
  hero: HeroStyles;
  sections: SectionStyles;
}

// --- PUSAT KENDALI TEMA ---
export const currentTheme: AppTheme = {
  // Pengaturan untuk elemen di dalam Hero.tsx (di atas gambar)
  hero: {
    gradientText: 'from-orange-500 to-purple-500', // Warna gradasi teks "Nimenation"
    button: {
      gradient: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700', // Warna tombol
      shadow: 'hover:shadow-orange-500/50', // Bayangan tombol saat hover
    },
  },

  // Pengaturan untuk section lain (About.tsx, Footer.tsx, etc.)
  sections: {
    background: 'bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900', // Latar belakang section About, dll.
    colors: {
      primary: 'text-orange-500', // Warna utama untuk icon, dll.
    },
    borders: {
      subtle: 'border-orange-500/20', // Warna border kartu
      hover: 'hover:border-orange-500/50', // Warna border kartu saat hover
    },
  },
};