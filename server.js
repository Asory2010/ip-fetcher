const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const DATA_FILE = path.join(__dirname, 'ips.json');

// Helper to read stored entries
function readEntries() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to save entries
function saveEntries(entries) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

// POST /ip - add new IP + deviceType
app.post('/ip', (req, res) => {
  const { ip, deviceType } = req.body;
  if (!ip) {
    return res.status(400).json({ error: 'IP is required' });
  }

  const entries = readEntries();

  // Check if IP already exists
  const exists = entries.some(e => e.ip === ip);

  if (!exists) {
    entries.push({
      ip,
      deviceType: deviceType || 'Unknown',
    });
    saveEntries(entries);
    console.log(`Added new entry: ${ip} - ${deviceType || 'Unknown'}`);
  } else {
    console.log(`Duplicate IP ignored: ${ip}`);
  }

  res.sendStatus(200);
});

// GET /ips - return all stored entries
app.get('/ips', (req, res) => {
  const entries = readEntries();
  res.json(entries);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
