const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// === Replace this with your actual MongoDB URI ===
const uri = 'mongodb+srv://kghss12345:r9cIJGSZKIWJe0Gf@cluster0.tj9scpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
let announcementsCollection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db('myAnnouncementDB');
    announcementsCollection = db.collection('announcements');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
connectDB();

// Serve HTML Pages
app.get('/announcement', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'announcement.html'));
});

app.get('/announcement-display', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'announcement-display.html'));
});

// Submit announcement to DB
app.post('/submit-announcement', async (req, res) => {
  const { content } = req.body;

  const newAnnouncement = {
    text: content,
    timestamp: new Date()
  };

  try {
    await announcementsCollection.insertOne(newAnnouncement);
    res.json({ success: true, message: 'Announcement saved successfully!' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ success: false, message: 'Error saving announcement' });
  }
});

// Fetch announcements from DB
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await announcementsCollection.find().sort({ timestamp: -1 }).toArray();
    res.json(announcements);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Error loading announcements');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
