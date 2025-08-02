const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.get('/announcement', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'announcement.html'));
});

app.get('/announcement-display', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'announcement-display.html'));
});

// Handle announcement submission
// Handle announcement submission (append to list)
app.post('/submit-announcement', (req, res) => {
  const { content } = req.body;
  const newAnnouncement = {
    text: content,
    timestamp: new Date().toISOString()
  };

  const filePath = path.join(__dirname, 'announcement-data.json');

  // Read existing data
  fs.readFile(filePath, 'utf8', (err, data) => {
    let announcements = [];

    if (!err && data) {
      try {
        announcements = JSON.parse(data);
        if (!Array.isArray(announcements)) announcements = [];
      } catch (e) {
        announcements = [];
      }
    }

    // Append new announcement
    announcements.push(newAnnouncement);

    // Write back to file
    fs.writeFile(filePath, JSON.stringify(announcements, null, 2), (err) => {
      if (err) {
        console.error('Error saving announcement:', err);
        return res.status(500).json({ success: false, message: 'Error saving announcement' });
      }
      res.json({ success: true, message: 'Announcement saved successfully!' });
    });
  });
});


// Serve saved announcement
app.get('/get-announcement', (req, res) => {
  const filePath = path.join(__dirname, 'announcement-data.json');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading announcement:', err);
      return res.status(500).send('Error reading announcement');
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
