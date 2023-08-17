import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Importa i componenti delle pagine
import Sign from './pages/Sign';
import CreatePoll from './pages/Createpoll';
import Poll from './pages/Poll';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/createpoll" element={<CreatePoll />} />
        <Route path="/poll/:pollId" element={<Poll />} />
      </Routes>
    </Router>
  );
}

export default App;
