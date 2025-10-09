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
import RulesPage from './pages/RulesPage';
import EventsPage from './pages/EventsPage';
import ReviewsPage from './pages/ReviewsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Features />
    <Mascot />
    <Faq />
    <Sponsor />
  </>
);

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
            {/* Rute Publik */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Rute Terlindungi */}
            <Route 
              path="/reviews" 
              element={
                <ProtectedRoute>
                  <ReviewsPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;