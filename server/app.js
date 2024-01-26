const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
const https = require('https')

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

const privateKey = fs.readFileSync('./ssl/mykey.key', 'utf8');
const certificate = fs.readFileSync('./ssl/mycertificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Creating an HTTPS server
const httpsServer = https.createServer(credentials, app);

// Starting the Express server
const port = process.env.PORT || 4000;
httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});