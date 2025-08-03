import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const client = await clientPromise;
    const db = client.db('myAnnouncementDB');
    const collection = db.collection('announcements');

    const announcements = await collection.find().sort({ timestamp: -1 }).toArray();
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ success: false, message: 'Error reading from database' });
  }
}
