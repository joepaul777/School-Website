import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('myAnnouncementDB');
      const collection = db.collection('announcements');
      const data = await collection.find().sort({ timestamp: -1 }).toArray();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error reading from database');
    } finally {
      await client.close();
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

