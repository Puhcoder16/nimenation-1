import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Komponen Inti
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, useTheme } from './components/ThemeContext';

// Section untuk Halaman Utama
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import Mascot from './sections/Mascot';
import Faq from './sections/Faq';
import Sponsor from './sections/Sponsor';

// Halaman Lain
import AboutPage from './pages/AboutPage';

// Komponen Halaman Utama (didefinisikan di sini)
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Mascot />
      <Faq />
      <Sponsor />
    </>
  );
};

// Komponen Layout Pembungkus
const Layout = ({ children }) => {
  const theme = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme.sections.background} overflow-hidden`}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

// Fungsi App utama sebagai Router
function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Nanti route untuk halaman lain ditambah di sini */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;