'use strict';

const path = require('path');
const getDataFromCsv = require('../lib/data-from-csv')
const fs = require('fs');


getDataFromCsv()
  .then((data) => {
    const output = JSON.stringify(data);
    const destinationPath = path.join(__dirname, '../public', 'data.json');

    fs.writeFile(destinationPath, output, 'utf8', (err) => {
      if (err) throw err;
      console.log('🚀  Updated ./public/data.json');
    });
  });
