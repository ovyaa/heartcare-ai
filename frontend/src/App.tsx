import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import { PredictionProvider } from '@/context/PredictionContext';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import History from '@/pages/History';
import PredictionForm from '@/components/PredictionForm';
import Result from '@/components/Result';

function App() {
  return (
    <BrowserRouter>
      <PredictionProvider>
        <div className="flex min-h-screen flex-col">
          <Disclaimer variant="banner" />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prediction" element={<PredictionForm />} />
              <Route path="/result" element={<Result />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PredictionProvider>
    </BrowserRouter>
  );
}

export default App;
