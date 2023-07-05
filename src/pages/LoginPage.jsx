import React, { useState  , useEffect} from 'react';
import RoleDropdown from '../components/RoleDropdown';

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordMatch(confirmPassword === value);
  };

  const handleConfirmPasswordChange = e => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const handleSelectRole = (role) => {
    setRole(role);
  };

  const handleSubmit = () => {
    console.log(password + '' + confirmPassword + '' + role);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full px-4 py-2 border ${passwordMatch ? 'border-gray-300' : 'border-red-500'} rounded focus:outline-none focus:border-blue-500`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>}
              <div className='pt-4'>
              <RoleDropdown onSelectRole={handleSelectRole} />
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700" 
          onClick={handleSubmit}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4"> 
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button className="text-blue-500 font-semibold border border-indigo-600" onClick={toggleMode}>
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
