const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./model/Feedback');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

// POST route
app.post('/api/feedback', async (req, res) => {
  const { name, message } = req.body;
  const fb = new Feedback({ name, message });
  await fb.save();
  res.json({ success: true, msg: "Feedback saved!" });
});

// GET route
app.get('/api/feedback', async (req, res) => {
  const allFeedback = await Feedback.find();
  res.json(allFeedback);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
