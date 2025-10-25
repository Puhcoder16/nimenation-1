import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider, useTheme } from './components/ThemeContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import EventsPage from './pages/EventsPage';

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
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
