import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import Mascot from './sections/Mascot';
import Faq from './sections/Faq';
import Sponsor from './sections/Sponsor';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';

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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;