const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const filePath = path.join(process.cwd(), 'announcement-data.json');

    const announcement = {
      text: content,
      timestamp: new Date().toISOString(),
    };

    let existing = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath);
      existing = JSON.parse(raw);
    }

    existing.push(announcement);

    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
