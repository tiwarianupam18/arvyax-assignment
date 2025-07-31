// Dashboard.jsx content goes here
import React from "react";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axios.get("/my-sessions");
      setSessions(res.data);
    } catch (err) {
      toast.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/editor")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Session
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="text-gray-600">No sessions found.</p>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div key={session._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">
                {session.title || "(No Title)"}
              </h2>
              <p className="text-sm text-gray-500">Status: {session.status}</p>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm">Tags: {session.tags.join(", ")}</p>
                <button
                  onClick={() => navigate(`/editor/${session._id}`)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
