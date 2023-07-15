import './App.css';
import NavigationBar from './components/NavigationBar';
import { Route, Routes, HashRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import ApplicationCandidate from './pages/ApplicationCandidate';
import AddJobs from './pages/AddJobs';
import Candidates from './pages/Candidates';

function App() {

  return (
    <div className="flex flex-col h-screen flex w-screen overflow-y-auto">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signin" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobsSearch" element={<Jobs />} />
        <Route path="/applications" element={<ApplicationCandidate />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/addjob" element={<AddJobs />} />
      </Routes>
    </div>

  );
}

export default App;
