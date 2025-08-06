import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Main from './components/main';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="App">
      <Analytics />
      <SpeedInsights />
      <Header />
      <Main />
    </div>
  );
}

export default App;
