'use strict';

const _ = require('lodash');


const raceMap = {
  W  : 'White',
  B  : 'Black',
  H  : 'Hispanic',
  A  : 'Asian',
  N  : 'Native American',
  O  : 'Other',
  '' : 'Unknown'
};


const transformRow = (rowObj) => (
  Object.assign({}, rowObj, {
      id                      : Number(rowObj.id),
      age                     : Number(rowObj.age),
      race                    : raceMap[rowObj.race || ''],
      signs_of_mental_illness : eval(rowObj.signs_of_mental_illness.toLowerCase()),
      body_camera             : eval(rowObj.body_camera.toLowerCase()),
    })
);


/**
 * Finds the percentage value for the provided data
 * @param {Array} data
 * @param {Number} pos
 */
const getPercentages = (data, total) => {
  const percentages = [];

  data.forEach((row, index) => {
    const percentage = ((data[index] / total) * 100).toFixed(1);
    percentages.push(percentage);
  });

  return percentages;
};



/**
 * Gets numbers by race
 * @return { data, labels }
 */
const getRaceData = (data) => {
  const raceCountMap = {};

  data.forEach((row) => {
    const race = row.race;

    if (!raceCountMap[race]) {
      raceCountMap[race] = 0;
    }

    raceCountMap[race] += 1;
  });

  const values = _.values(raceCountMap);
  const percentages = getPercentages(values, data.length);
  const labels = _.keys(raceCountMap).map((label, index) => label += ` (${percentages[index]}%)`)

  return {
    data   : values,
    labels : labels
  };
};


const getBodyCameraData = (data) => {
  const hadBodyCameraOn = data.filter((row) => !!row.body_camera).length;
  const hadBodyCameraOff = data.length - hadBodyCameraOn;
  const percentages = getPercentages([ hadBodyCameraOn, hadBodyCameraOff], data.length)

  return {
    data: [ hadBodyCameraOn, hadBodyCameraOff ],
    labels: [ `On (${percentages[0]}%)`, `Off (${percentages[1]}%)` ]
  };
};


module.exports = {
  getRaceData,
  transformRow,
  getBodyCameraData
};
