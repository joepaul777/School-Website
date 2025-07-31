// server.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Serve static files from 'public'
app.use(express.static('public'));
app.use(bodyParser.json());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'websiteanonymus@gmail.com',
    pass: 'htmw qbnt exzw pjgm' // App password
  }
});

// POST endpoint to send email
app.post('/send-report', (req, res) => {
  const { to, message } = req.body;

  const mailOptions = {
    from: 'websiteanonymus@gmail.com',
    to: to,
    subject: 'New Report Submission',
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      // Return JSON on error
      res.status(500).json({
        success: false,
        error: error.message
      });
    } else {
      console.log('✅ Email sent:', info.response);
      // Return JSON on success
      res.status(200).json({
        success: true,
        message: 'Email sent successfully!'
      });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
