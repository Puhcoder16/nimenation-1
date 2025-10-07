import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Mascot from './sections/Mascot';
import { ThemeProvider, useTheme } from './components/ThemeContext';

// Komponen baru untuk manage layout utama
const MainLayout = () => {
  const theme = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme.sections.background}`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Mascot />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout />
      </Router>
    </ThemeProvider>
  );
}

export default App;