'use strict';

const path      = require('path');
const express   = require('express');
const app  = express();


// GET / – Public directory served from root
const publicPath = path.join(__dirname, '../public');
app.use('/', express.static(publicPath));

// Start the server
const port = process.env.PORT || 3003;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); // eslint-disable-line no-console
});

module.exports = server;
