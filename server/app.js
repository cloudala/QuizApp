const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs')
const https = require('https')
const mqtt = require('mqtt');
const facts = require('./data/facts');

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

const privateKey = fs.readFileSync('./ssl/mykey.key', 'utf8');
const certificate = fs.readFileSync('./ssl/mycertificate.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Creating an HTTPS server
const httpsServer = https.createServer(credentials, app);

// MQTT setup
const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on("connect", () => {
  console.log("Connected to HiveMQ Broker from app.js")
  mqttClient.subscribe('random-fact')
});

// Publishing a random fact every 24 hours over MQTT
mqttClient.on('message', (topic, message) => {
  const messageContent = JSON.parse(message.toString())
  if (topic === 'random-fact' && messageContent === 'ready') {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    mqttClient.publish('random-fact', JSON.stringify(randomFact));
  }
})

// Starting the Express server
const port = process.env.PORT || 4000;
httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});