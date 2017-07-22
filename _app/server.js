'use strict';

const express   = require('express');
const csvToJSON = require('csvtojson');

const app  = express();
const port = process.env.PORT || 2508;


let server       = null;
const pathToData = `${__dirname}/../fatal-police-shootings-data.csv`;
const data       = [];
const raceMap = {
  W  : 'White',
  B  : 'Black',
  H  : 'Hispanic',
  A  : 'Asian',
  N  : 'Native American',
  O  : 'Other',
  '' : 'Unknown'
};

csvToJSON()
  .fromFile(pathToData)
  .on('json', (rowObj) => {
    // Transform the data
    const transformedRow = Object.assign({}, rowObj, {
      id                      : Number(rowObj.id),
      age                     : Number(rowObj.age),
      race                    : raceMap[rowObj.race || ''],
      signs_of_mental_illness : eval(rowObj.signs_of_mental_illness.toLowerCase()),
      body_camera             : eval(rowObj.body_camera.toLowerCase()),
    });

    data.push(transformedRow);
  })
  .on('done', (err) => {
    if (err) throw err;

    // console.log(data)

    // GET /data
    app.get('/data', (req, res) => res.json({ data }));

    // Start the server
    server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  });


module.exports = server;
