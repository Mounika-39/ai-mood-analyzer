import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">
          MoodSense AI
        </h1>

        <div className="space-x-6 text-sm font-medium">
          <a href="#about" className="hover:text-indigo-600 transition">
            About
          </a>
          <Link to="/login" className="hover:text-indigo-600 transition">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 max-w-7xl mx-auto">
        
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            AI-Powered Mood
            <span className="text-indigo-600"> Intelligence</span>
          </h2>

          <p className="text-lg text-gray-600">
            Analyze your emotions using advanced sentiment models.
            Track your emotional patterns and gain insights
            into your mental well-being.
          </p>

          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Start Free
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
            alt="AI analytics"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20 px-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold">
            About MoodSense AI
          </h3>

          <p className="text-gray-600 text-lg">
            MoodSense AI is a full-stack AI application built using
            MERN stack and HuggingFace sentiment models.
            It securely stores mood entries and provides
            data-driven emotional insights.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;
