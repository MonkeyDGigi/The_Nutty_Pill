import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SetupScreen from './components/SetupScreen';
import GamesPage from './pages/GamesPage';
import WalletPage from './pages/WalletPage';
import FriendsPage from './pages/FriendsPage';
import ProfilePage from './pages/ProfilePage';

// App content component that handles navigation and setup
function AppContent() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('games');
  const navigate = useNavigate();
  const location = useLocation();

  // Load user data from localStorage on mount
  useEffect(() => {
    const username = localStorage.getItem('username');
    const mintUrl = localStorage.getItem('mintUrl');
    const privacy = localStorage.getItem('privacy') || 'public';

    if (username && mintUrl) {
      setUser({ username, mintUrl, privacy });
    }
  }, []);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/games') setActiveTab('games');
    else if (path === '/wallet') setActiveTab('wallet');
    else if (path === '/friends') setActiveTab('friends');
    else if (path === '/profile') setActiveTab('profile');
  }, [location]);

  // Handle setup completion
  const handleSetupComplete = (userData) => {
    setUser(userData);
    // Save to localStorage
    localStorage.setItem('username', userData.username);
    localStorage.setItem('mintUrl', userData.mintUrl);
    localStorage.setItem('privacy', userData.privacy);
    // Navigate to games page
    navigate('/games');
  };

  // Handle navigation
  const handleTabChange = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  // Show setup screen if no user data
  if (!user) {
    return <SetupScreen onComplete={handleSetupComplete} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title retro-title">CASHU ARCADE</h1>
        <nav className="app-nav">
          <button
            className={`nav-tab ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => handleTabChange('wallet', '/wallet')}
          >
            💰 WALLET
          </button>
          <button
            className={`nav-tab ${activeTab === 'games' ? 'active' : ''}`}
            onClick={() => handleTabChange('games', '/games')}
          >
            🎮 GAMES
          </button>
          <button
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile', '/profile')}
          >
            ⚙️ PROFILE
          </button>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/games" element={<GamesPage />} />
          <Route path="/wallet" element={<WalletPage user={user} />} />
          <Route path="/friends" element={<FriendsPage user={user} />} />
          <Route path="/profile" element={<ProfilePage user={user} onUserUpdate={setUser} />} />
          <Route path="/" element={<GamesPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Main App component with Router
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </Router>
  );
}

export default App;
