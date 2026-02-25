import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchMoods();
    }
  }, [navigate]);

  const fetchMoods = async () => {
    const token = localStorage.getItem("token");

    const { data } = await API.get("/moods", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMoods(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await API.post(
      "/moods",
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");
    fetchMoods();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getMoodColor = (mood) => {
    if (mood === "Positive") return "bg-green-100 text-green-600";
    if (mood === "Negative") return "bg-red-100 text-red-600";
    return "bg-gray-200 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-indigo-600">
          Mood Dashboard
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-10 py-10">

        {/* Mood Input Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
          <h3 className="text-lg font-semibold mb-4">
            How are you feeling today?
          </h3>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your thoughts..."
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Analyze
            </button>
          </form>
        </div>

        {/* Mood History */}
        <h3 className="text-xl font-semibold mb-6">
          Your Mood History
        </h3>

        <div className="space-y-4">
          {moods.map((mood) => (
            <div
              key={mood._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <p className="text-gray-700 mb-2">
                {mood.text}
              </p>

              <div className="flex justify-between items-center text-sm">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${getMoodColor(
                    mood.mood
                  )}`}
                >
                  {mood.mood}
                </span>

                <span className="text-gray-500">
                  Confidence: {(mood.confidence * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
