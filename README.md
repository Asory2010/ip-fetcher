# IP Fetcher

A simple web app to fetch and store public IP addresses. Designed to collect VM IPs for easy reference when SSHing into them later.

---

## Features

- Fetch your current public IP address via a button click
- Store unique IP addresses on the server (no duplicates)
- View all stored IP addresses on a web page

---

## Technologies Used

- Node.js with Express for the backend API and storage
- Plain HTML, CSS, and JavaScript for the frontend
- JSON file storage (`ips.json`) on the server

---

## Installation & Usage

1. Clone the repository or download the source code.

2. Install dependencies:

   ```bash
   npm install
Create an empty ips.json file in the root directory:

bash
Copy
Edit
echo "[]" > ips.json
Run the server:

bash
Copy
Edit
node server.js
Open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
Click "Fetch & Store My IP" to get your current public IP and save it to the server.

View all stored IP addresses listed below the button.

API Endpoints
POST /ip - Submit a JSON payload { "ip": "your.ip.address" } to store an IP (duplicates ignored).

GET /ips - Retrieve the list of stored IPs as a JSON array.

Notes
The app only stores unique IPs.

Data is persisted in ips.json in the server directory.

Designed for local or private network use. For production, consider adding security and authentication.

License
This project is open-source and free to use.

yaml
Copy
Edit

---

If you want it in a different style or with more sections, just say!
