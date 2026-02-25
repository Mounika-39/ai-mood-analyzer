import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Left Info Section */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Welcome Back
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Continue tracking your emotional journey with AI-powered
            insights and secure mood analytics.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="p-10">

          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Sign in to MoodSense
          </h2>

          {error && (
            <div className="mb-6 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-600 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Sign In
            </button>

          </form>

          <p className="text-sm text-gray-600 mt-8">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Create one
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
