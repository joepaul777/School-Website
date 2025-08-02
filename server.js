const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// API to get the latest announcement
app.get('/get-announcement', (req, res) => {
  fs.readFile('announcements.json', 'utf-8', (err, data) => {
    if (err || !data) {
      return res.json([]);
    }

    try {
      const announcements = JSON.parse(data);
      res.json(announcements);
    } catch (e) {
      res.json([]);
    }
  });
});

// API to post a new announcement
// API to post a new announcement
app.post('/post-announcement', (req, res) => {
  const content = req.body.content;
  const newAnnouncement = {
    content: content,
    time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  fs.readFile('announcements.json', 'utf-8', (err, data) => {
    let announcements = [];
    if (!err && data) {
      try {
        announcements = JSON.parse(data);
        if (!Array.isArray(announcements)) announcements = [];
      } catch (e) {
        announcements = [];
      }
    }

    announcements.unshift(newAnnouncement); // add to beginning

    fs.writeFile('announcements.json', JSON.stringify(announcements, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Unable to write' });
      res.json({ success: true });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
