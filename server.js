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
  res.sendFile(path.join(__dirname, 'views', 'announcement.html'));
});

app.get('/announcement-display', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'announcement-display.html'));
});

// Handle submission
app.post('/submit-announcement', (req, res) => {
  const { content } = req.body;
  const announcement = {
    content,
    time: new Date().toLocaleString()
  };

  const filePath = path.join(__dirname, 'public', 'announcement-data.json');

  fs.writeFile(filePath, JSON.stringify(announcement, null, 2), (err) => {
    if (err) return res.status(500).send('Error saving announcement');
    res.redirect('/announcement-display');
  });
});

// Serve announcement data
app.get('/get-announcement', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'announcement-data.json');
  fs.readFile(filePath, (err, data) => {
    if (err) return res.status(500).send('Error reading announcement');
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
