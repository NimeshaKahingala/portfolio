import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';
import Header from './components/header';
import Main from './components/main';

function App() {
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
