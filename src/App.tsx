import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Mascot from './sections/Mascot';
import Features from './sections/Features';
import Faq from './sections/Faq';
import Sponsor from './sections/Sponsor';
import { ThemeProvider, useTheme } from './components/ThemeContext';

const MainLayout = () => {
  const theme = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme.sections.background}`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Mascot />
        <Features />
        <Faq />
        <Sponsor />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="overflow-hidden">
          <MainLayout />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;