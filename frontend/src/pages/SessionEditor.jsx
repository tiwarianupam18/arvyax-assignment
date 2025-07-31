// SessionEditor.jsx content goes here
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SessionEditor = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/my-sessions/${id}`)
        .then((res) => {
          const s = res.data;
          setTitle(s.title || "");
          setTags(s.tags.join(", "));
          setJsonUrl(s.json_file_url || "");
          setSessionId(s._id);
        })
        .catch(() => toast.error("Failed to load session"));
    }
  }, [id]);

  const autoSave = () => {
    saveDraft(true);
  };

  const handleChange = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(autoSave, 5000);
  };

  useEffect(() => {
    intervalRef.current = setInterval(autoSave, 30000);
    return () => clearInterval(intervalRef.current);
  }, [title, tags, jsonUrl]);

  const saveDraft = async (silent = false) => {
    try {
      const res = await axios.post("/my-sessions/save-draft", {
        sessionId,
        title,
        tags: tags.split(",").map((t) => t.trim()),
        json_file_url: jsonUrl,
      });
      if (!silent) toast.success("Draft saved!");
      setSessionId(res.data._id);
      setLastSaved(new Date().toLocaleTimeString());
    } catch (err) {
      if (!silent) toast.error("Save failed");
    }
  };

  const publishSession = async () => {
    try {
      if (!sessionId) return toast.error("Draft not saved yet.");
      await axios.post("/my-sessions/publish", { sessionId });
      toast.success("Session published!");
      navigate("/");
    } catch {
      toast.error("Publish failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Session Editor</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleChange();
          }}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
            handleChange();
          }}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="JSON File URL"
          value={jsonUrl}
          onChange={(e) => {
            setJsonUrl(e.target.value);
            handleChange();
          }}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <button
            onClick={() => saveDraft(false)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Save Draft
          </button>
          <button
            onClick={publishSession}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publish
          </button>
        </div>
        {lastSaved && (
          <p className="text-sm text-gray-500">Auto-saved at: {lastSaved}</p>
        )}
      </div>
    </div>
  );
};

export default SessionEditor;
