'use strict';

const path      = require('path');
const express   = require('express');
const csvToJSON = require('csvtojson');

const DataService = require('./transformation-service');

const app  = express();
const port = process.env.PORT || 2508;


let server       = null;
const pathToData = `${__dirname}/../fatal-police-shootings-data.csv`;
const data       = [];


csvToJSON()
  .fromFile(pathToData)
  .on('json', (rowObj) => {
    // Transform the data
    const transformedRow = DataService.transformRow(rowObj);
    data.push(transformedRow);
  })
  .on('done', (err) => {
    if (err) throw err;

    /**
     * Routes
     */
    // GET /data
    app.get('/data', (req, res) => {
      const response = {
        raw: data,
        body_camera: DataService.getBodyCameraData(data),
        race: DataService.getRaceData(data),
        age: DataService.getAgeData(data),
      };

      return res.json(response);
    });

    // GET / – Public directory served from root
    const publicPath = path.join(__dirname, 'public');
    app.use('/', express.static(publicPath));

    // Start the server
    server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`); // eslint-disable-line no-console
    });
  });


module.exports = server;
