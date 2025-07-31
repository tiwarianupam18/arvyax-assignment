const express = require("express");
const protect = require("../middleware/authMiddleware");
const Session = require("../models/Session");

const router = express.Router();

// GET /sessions – public published
router.get("/sessions", async (req, res) => {
  const sessions = await Session.find({ status: "published" });
  res.json(sessions);
});

// GET /my-sessions – user-specific
router.get("/my-sessions", protect, async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
});

// GET /my-sessions/:id
router.get("/my-sessions/:id", protect, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  res.json(session);
});

// POST /my-sessions/save-draft
router.post("/my-sessions/save-draft", protect, async (req, res) => {
  const { sessionId, title, tags, json_file_url } = req.body;

  let session;
  if (sessionId) {
    session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: req.user.id },
      { title, tags, json_file_url, updated_at: new Date() },
      { new: true }
    );
  } else {
    session = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
    });
    await session.save();
  }

  res.json(session);
});

// POST /my-sessions/publish
router.post("/my-sessions/publish", protect, async (req, res) => {
  const { sessionId } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: sessionId, user_id: req.user.id },
    { status: "published", updated_at: new Date() },
    { new: true }
  );
  res.json(session);
});

module.exports = router;
