import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getCurrentUser, logout } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";
import AuthVerify from "../api/AuthVerify";
import logo from "../assets/CU.jpg";
import { MdOutlineNotificationsActive } from "react-icons/md";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { Notifications } from "./Notifications";

export default function NavigationBar() {
  const [openNav, setOpenNav] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const [currentUserRole, setcurrentUserRole] = useState("");

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
        navigate("/");
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
      {loggedin && currentUserRole.includes("CANDIDATE") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/jobsSearch" className="text-indigo-800">
            Jobs
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("CANDIDATE") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/applications" className="text-indigo-800">
            Applications
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("CANDIDATE") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large  ">
          <Link to="/profile" className="text-indigo-800 ">
            <p className="font-bold">Profile</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("EMPLOYER") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/candidates">
            {" "}
            <p className="font-bold text-indigo-800">Candidates</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("EMPLOYER") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/addjob">
            <p className="whitespace-nowrap text-indigo-800">Add Jobs</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("EMPLOYER") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/jobsAdded">
            <p className="whitespace-nowrap text-indigo-800">Jobs Added</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("EMPLOYER") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/employerProfile">
            <p className="whitespace-nowrap text-indigo-800 ">Profile</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("ADMIN") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/jobs-admin">
            <p className="whitespace-nowrap text-indigo-800 ">Jobs</p>
          </Link>
        </li>
      )}

      {loggedin && currentUserRole.includes("ADMIN") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/applications-admin">
            <p className="whitespace-nowrap text-indigo-800 ">Applications</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("ADMIN") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/users-admin">
            <p className="whitespace-nowrap text-indigo-800 ">Users</p>
          </Link>
        </li>
      )}
      {loggedin && currentUserRole.includes("ADMIN") && (
        <li className="mr-4 cursor-pointer py-1.5 font-large ">
          <Link to="/dashboard-admin">
            <p className="whitespace-nowrap text-indigo-800 ">Dashboard</p>
          </Link>
        </li>
      )}
    </ul>
  );

  return (
    <>
      <Popover>
        <Navbar
          className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 "
          key={loggedin}
        >
          <div className="flex items-center justify-between ">
            <Link to="/">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="CU Career Services Logo"
                  className="w-12 h-12 mr-2 rounded-lg object-cover"
                />
                <span className="mr-4 cursor-pointer py-1.5 md:text-2xl  text-indigo-800 ">
                  CU Career Services
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              {currentUserRole.includes("CANDIDATE") && (
                <PopoverHandler>
                  <button className="bg-white  border-none  ">
                    <MdOutlineNotificationsActive size={24} color="red" />
                  </button>
                </PopoverHandler>
              )}
              <PopoverContent className="bg-white">
                <Notifications />
              </PopoverContent>
              <div className="hidden md:block">
                {loggedin ? (
                  <Button
                    variant="gradient"
                    color="indigo"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <span>Sign out</span>
                  </Button>
                ) : (
                  <Link to="/Signin">
                    <Button variant="outlined" size="sm" color="indigo">
                      <span>Sign in</span>
                    </Button>
                  </Link>
                )}
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-black"
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
            {loggedin ? (
              <Button
                variant="gradient"
                size="sm"
                fullWidth
                className="mb-2"
                onClick={handleSignOut}
              >
                <span>Sign out</span>
              </Button>
            ) : (
              <Link to="/Signin">
                <Button variant="gradient" size="sm" fullWidth className="mb-2">
                  <span>Sign in</span>
                </Button>
              </Link>
            )}
          </Collapse>
          <AuthVerify logout={handleSignOut} />
        </Navbar>
      </Popover>
    </>
  );
}
