import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';

import About from './components/About';
import TrustBanner from './components/TrustBanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const Home = () => (
  <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
    <Navbar />
    <Hero />
    <TrustBanner />
    <About />
    <Services />
    <Projects />
    <Testimonials />
    <ContactForm />
    <Footer />
  </main>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
