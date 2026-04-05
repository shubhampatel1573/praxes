import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/authManager';
import Layout from './components/Layout';
import CurtainPage from './components/CurtainPage';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const hasSeenIntro = localStorage.getItem('praxes_intro_seen') === 'true';
  const [showCurtain, setShowCurtain] = useState(!hasSeenIntro);

  const handleCurtainDone = () => {
    localStorage.setItem('praxes_intro_seen', 'true');
    setShowCurtain(false);
  };

  const handleReplayIntro = () => {
    setShowCurtain(true);
  };

  if (showCurtain) {
    return <CurtainPage onEnter={handleCurtainDone} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home onReplayIntro={handleReplayIntro} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
