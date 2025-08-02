import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;

    try {
      await client.connect();
      const db = client.db('myAnnouncementDB');
      const collection = db.collection('announcements');

      await collection.insertOne({ text: content, timestamp: new Date() });
      res.status(200).json({ success: true, message: 'Announcement saved successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to save announcement' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
