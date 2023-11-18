import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UpcomingEvents from "../components/UpcomingEvents";

const HomePage = () => {
  const navigate = useNavigate();

  const authToken = JSON.parse(localStorage.getItem("user"));

  const ref = useRef(null);
  const handleClick = () => {
    if (!authToken) {
      toast.error("Please Login first");
      navigate("/Signin");
    } else {
      if (authToken.roles[0] === "ROLE_CANDIDATE") {
        navigate("/jobsSearch");
      } else if (authToken.roles[0] === "ROLE_ADMIN") {
        navigate("/users-admin");
      } else if (authToken.roles[0] === "ROLE_EMPLOYER") {
        navigate("/candidates");
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://careerservices-backend.onrender.com/")
      .then((response) => {
        //   console.log(response.data.message);
        callback(response.data.message);
      })
      .catch((error) => {
        // console.error(error.response.data.message);
      });
  }, []);

  return (
    <div className="bg-white w-full">
      <section className="flex flex-col lg:flex-row bg-white justify-center p-2 md:p-8 gap-16 ">
        <div className=" p-4 md:p-8 rounded-lg flex flex-col gap-2 md:gap-4 lg:w-1/2">
          <h1 className=" text-xl md:text-3xl font-bold text-blue-500">
            Welcome to your professional community
          </h1>
          <div className="mt-2">
            <button
              onClick={handleClick}
              className="bg-blue-500 text-white text-base md:text-xl p-2 md:px-6 md:py-3 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Explore More
            </button>
          </div>
          <p className="md:text-lg mt-4">
            Helping you Prepare, For the World of Work.
          </p>
          <div className="max-w-3xl mx-auto ">
            <div className="bg-white p-8 rounded-lg shadow-[0px_0px_12px_11px_rgba(0,0,0,0.05)]">
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <h2 className=" text-xl md:text-2xl font-bold text-blue-500">
                    Services Include
                  </h2>
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm ">
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Job Postings
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    On-Campus Jobs
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Internship Opportunities
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Career Fairs
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Career Coaching
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Resume, Cover Letter, and Interview Advising
                  </div>
                  <div
                    className="border border-gray-300 p-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleClick}
                  >
                    Employment and Career Workshops
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 h-[30rem] w-full md:w-[30rem]">
          <img src="/images/login-hero.svg" alt="" className="mt-4" />
        </div>
      </section>
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default HomePage;
