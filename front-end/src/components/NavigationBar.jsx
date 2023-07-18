import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { getCurrentUser, logout } from "../api/authApi";
import { useNavigate, useLocation } from 'react-router-dom';
import AuthVerify from "../api/AuthVerify";
import logo from '../assets/CU.jpg'


export default function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const [currentUserRole, setcurrentUserRole] = useState('')

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
    checkIfloggedIn();
  }, [loggedin, location]);

  function handleSignOut() {
    if (getCurrentUser() != null) {
      logout();
      setloggedin(false);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  }

  function checkIfloggedIn() {
    if (getCurrentUser() != null) {
      setloggedin(true);
      setcurrentUserRole(getCurrentUser().roles[0]);
    }
  }


  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {(loggedin && currentUserRole.includes('CANDIDATE')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/profile">
            Profile
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('CANDIDATE')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/jobsSearch">
            Jobs
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('CANDIDATE')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/applications">
            Applications
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('EMPLOYER')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/candidates">
            Candidates
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('EMPLOYER')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/addjob">
            <p className="whitespace-nowrap">Add Jobs</p>
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('EMPLOYER')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/jobsAdded">
            <p className="whitespace-nowrap">Jobs Added</p>
          </Link>
        </Typography>}
      {(loggedin && currentUserRole.includes('EMPLOYER')) &&
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5 font-large"
          variant="h6" color="blue" textGradient
        >
          <Link to="/employerProfile">
            <p className="whitespace-nowrap">Profile</p>
          </Link>
        </Typography>}
    </ul>
  );

  return (
    <>
      <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4  lg:px-8 lg:py-4" key={loggedin}>
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <div className="flex items-center">
              <img src={logo} alt="CU Career Services Logo" className="w-12 h-12 mr-2 rounded-lg object-cover" />
              <span className="mr-4 cursor-pointer py-1.5 text-2xl font-bold text-red-700">
                CU Career Services
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {loggedin ?
              <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleSignOut}>
                <span>Sign out</span>
              </Button>
              :
              <Link to="/Signin">
                <Button variant="outlined" size="sm" fullWidth className="mb-2">
                  <span>Sign in</span>
                </Button>
              </Link>
            }
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          {loggedin ?
            <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={handleSignOut}>
              <span>Sign out</span>
            </Button>
            :
            <Link to="/Signin">
              <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <span>Sign in</span>
              </Button>
            </Link>
          }
        </Collapse>
        <AuthVerify logout={handleSignOut} />
      </Navbar>
    </>
  );
}