'use strict';

// const path = require('path');
const csvToJSON = require('csvtojson');
// const fs = require('fs');

const DataService = require('./transformation-service');

const pathToData = `${__dirname}/../fatal-police-shootings-data.csv`;


const getDataFromCsv = () =>
  new Promise((resolve, reject) => {
    const data = [];

    csvToJSON()
      .fromFile(pathToData)
      .on('json', (rowObj) => {
        // Transform the data
        const transformedRow = DataService.transformRow(rowObj);
        data.push(transformedRow);
      })
      .on('done', (err) => {
        if (err) {
          return reject(err);
        }

        const transformed = {
          updated_at: new Date().toISOString(),
          raw: data,
          body_camera: DataService.getBodyCameraData(data),
          race: DataService.getRaceData(data),
          age: DataService.getAgeData(data),
          gender: DataService.getGenderData(data),
          mental_illness: DataService.getMentalIllnessData(data)
        };

        return resolve(transformed);
      });
  });

module.exports = getDataFromCsv;
