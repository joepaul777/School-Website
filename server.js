const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const filePath = path.join(__dirname, 'announcements.json');

// GET all announcements
app.get('/get-announcement', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err || !data) {
      return res.json([]);
    }
    try {
      const announcements = JSON.parse(data);
      res.json(Array.isArray(announcements) ? announcements : []);
    } catch (e) {
      res.json([]);
    }
  });
});

// POST new announcement (append)
app.post('/post-announcement', (req, res) => {
  const content = req.body.content;
  const newAnnouncement = {
    content: content,
    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  fs.readFile(filePath, 'utf-8', (err, data) => {
    let announcements = [];
    if (!err && data) {
      try {
        announcements = JSON.parse(data);
        if (!Array.isArray(announcements)) announcements = [];
      } catch (e) {
        announcements = [];
      }
    }

    announcements.unshift(newAnnouncement); // newest on top

    fs.writeFile(filePath, JSON.stringify(announcements, null, 2), err => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
