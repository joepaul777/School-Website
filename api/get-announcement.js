const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'announcement-data.json');

  if (!fs.existsSync(filePath)) {
    return res.status(200).json([]);
  }

  try {
    const data = fs.readFileSync(filePath);
    const announcements = JSON.parse(data);
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: 'Failed to read announcement file' });
  }
}
