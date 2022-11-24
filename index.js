const express = require('express');

const { PORT = 3000 } = process.env;

const router = require('./routes/index');

const app = express();

// Parsers
app.use(express.json());

// Routes
app.use(router);

// Listening
app.listen(PORT, () => {
  console.log(`App listen port ${PORT}`);
});
