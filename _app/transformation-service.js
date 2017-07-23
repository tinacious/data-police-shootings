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



const getDataForProperty = (data, prop) => {
  const kvMap = {};

  data.forEach((row) => {
    const key = row[prop];
    if (!kvMap[key]) {
      kvMap[key] = 0;
    }

    kvMap[key] += 1;
  });

  const values = _.values(kvMap);
  const percentages = getPercentages(values, data.length);
  const labels = _.keys(kvMap).map((label, index) => label += ` (${percentages[index]}%)`)

  return {
    data   : values,
    labels : labels
  };
};


const getAgeData = (data) => {
  const reordered = _.orderBy(data, 'age').filter((o) => o.age > 0);
  return getDataForProperty(reordered, 'age');
};


const getBooleanDataForKey = (data, key, labels) => {
  const yes = data.filter((row) => !!row[key]).length;
  const no = data.length - yes;
  const percentages = getPercentages([ yes, no ], data.length);

  return {
    data: [ yes, no ],
    labels: labels.map((label, index) => `${label} (${percentages[index]}%)`)
  }
}


const getBodyCameraData = (data) => {
  return getBooleanDataForKey(data, 'body_camera', ['On', 'Off']);
};


const getMentalIllnessData = (data) => {
  return getBooleanDataForKey(data, 'signs_of_mental_illness', ['Signs of mental illness', 'No signs of mental illness']);
};


const getGenderData = (data) => {
  return getDataForProperty(data, 'gender');
};



module.exports = {
  getRaceData: (data) => getDataForProperty(data, 'race'),
  getAgeData,
  transformRow,
  getBodyCameraData,
  getMentalIllnessData,
  getGenderData,
};
