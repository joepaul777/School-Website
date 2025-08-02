app.post('/submit-announcement', async (req, res) => {
  const { content } = req.body;
  const newAnn = new Announcement({
    content,
    time: new Date().toLocaleString()
  });

  try {
    await newAnn.save();
    res.json({ success: true, message: 'Announcement saved successfully!' });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ success: false, message: 'Database save failed' });
  }
});