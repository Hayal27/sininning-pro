import { useState } from 'react';
import type { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';
import MagicalBackground from './components/common/MagicalBackground';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Tour from './pages/Tour';
import Manufacturing from './pages/Manufacturing';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import News from './pages/News';
import Careers from './pages/Careers';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />

        {/* Preloader */}
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Magical Background */}
        <MagicalBackground />

        <div className="min-h-screen flex flex-col relative z-10">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/industrial" element={<Products />} />
              <Route path="/products/architectural" element={<Products />} />
              <Route path="/products/specialty" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/tour" element={<Tour />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/news" element={<News />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
