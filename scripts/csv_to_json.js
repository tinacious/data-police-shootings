'use strict';

const path = require('path');
const csvToJSON = require('csvtojson');
const fs = require('fs');

const DataService = require('./transformation-service');

const pathToData = `${__dirname}/../fatal-police-shootings-data.csv`;
const data = [];

csvToJSON()
  .fromFile(pathToData)
  .on('json', (rowObj) => {
    // Transform the data
    const transformedRow = DataService.transformRow(rowObj);
    data.push(transformedRow);
  })
  .on('done', (err) => {
    if (err) throw err;

    const response = {
      raw: data,
      body_camera: DataService.getBodyCameraData(data),
      race: DataService.getRaceData(data),
      age: DataService.getAgeData(data),
      gender: DataService.getGenderData(data),
      mental_illness: DataService.getMentalIllnessData(data)
    };

    const output = JSON.stringify(response);
    const destinationPath = path.join(__dirname, '../public', 'data.json');

    fs.writeFile(destinationPath, output, 'utf8', (err) => {
      if (err) throw err;
      console.log('Updated ./public/data.json');
    });
  });
