app.get('/get-announcement', async (req, res) => {
  try {
    const data = await Announcement.find().sort({ _id: -1 }); // newest first
    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Error reading from database');
  }
});
