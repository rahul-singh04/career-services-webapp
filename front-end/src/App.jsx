import './App.css';
import NavigationBar from './components/NavigationBar';
import { Route, Routes, HashRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="flex flex-col h-screen flex w-screen overflow-y-auto">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signin" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

  );
}

export default App;
