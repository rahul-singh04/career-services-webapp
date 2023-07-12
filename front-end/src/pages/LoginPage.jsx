import React, { useState, useEffect } from 'react';
import RoleDropdown from '../components/RoleDropdown';
import { handleSignup, handleSignin } from '../api/authApi';


const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'login' ? 'signup' : 'login');
    setPassword('');
    setConfirmPassword('');
    setPasswordMatch(true);
  };

  const handleEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleuserNameChange = e => {
    const value = e.target.value;
    setUsername(value);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    {
      mode === login ? signInDetails = {
        username: 'abc',
        email: email,
        password: password,
      } : signUpdetails = {
        username: 'abc',
        email: email,
        password: password,
      };
    }

    { mode === login ? handleSignin(signInDetails, handleSigninCallback) : handleSignup(signUpdetails, handleSignupCallback) }

  };

  const handleSignupCallback = (result) => {
    if (result === 'Success') {
      console.log('Signup successful');
    } else {
      console.error('Signup failed');
    }
  };

  const handleSigninCallback = (result) => {
    if (result === 'Success') {
      console.log('Signup successful');
    } else {
      console.error('Signup failed');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        <form>
        <div className="mb-4">
            <label htmlFor="userName" className="block text-gray-700 font-semibold mb-2">UserName</label>
            <input type="userName" id="email"
              value={username}
              onChange={handleuserNameChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>
       {  mode === 'login' ? '' : <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
          </div>}
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
