// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'ips.json');

app.use(express.json());
app.use(express.static('public'));

// Initialize ips.json if missing
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// POST IP endpoint
app.post('/ip', (req, res) => {
  const ip = req.body.ip;
  if (!ip) return res.status(400).send('IP required');

  const ips = JSON.parse(fs.readFileSync(DATA_FILE));

  if (!ips.includes(ip)) {
    ips.push(ip);
    fs.writeFileSync(DATA_FILE, JSON.stringify(ips, null, 2));
    console.log(`Added new IP: ${ip}`);
  } else {
    console.log(`Duplicate IP ignored: ${ip}`);
  }

  res.sendStatus(200);
});

// GET all stored IPs
app.get('/ips', (req, res) => {
  const ips = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(ips);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
