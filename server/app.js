const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('./db/connection');

app.use(cors());
app.use(express.json());
app.use(require("./routes/routes"));

// Start the Express server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});