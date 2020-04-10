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


/**
 * Transform the row to be the way we want it,
 * e.g. age should be a nothing but a number,
 * race should be a word, and other values should be booleans
 * @param {Object} rowObj
 * @return {Object}
 */
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
 * @param {Array}
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
 * Transforms the provided data into an object that the charts like,
 * including `data` and `labels` properties
 * @param {Object} data
 * @param {String} prop
 * @return {Object}
 */
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

const getRaceData = (data) => {
  return getDataForProperty(data, 'race');
};

const getBodyCameraData = (data) => {
  return getBooleanDataForKey(data, 'body_camera', ['On', 'Off']);
};

const getGenderData = (data) => {
  return getDataForProperty(data, 'gender');
};



/**
 * Transforms the provided data into an object that the charts like,
 * but for boolean data. These properties include `data` and `labels`
 * @param {Object} data
 * @param {String} prop
 * @return {Object}
 */
const getBooleanDataForKey = (data, key, labels) => {
  const yes = data.filter((row) => !!row[key]).length;
  const no = data.length - yes;
  const percentages = getPercentages([ yes, no ], data.length);

  return {
    data: [ yes, no ],
    labels: labels.map((label, index) => `${label} (${percentages[index]}%)`)
  }
};

const getMentalIllnessData = (data) => {
  return getBooleanDataForKey(data, 'signs_of_mental_illness', ['Signs of mental illness', 'No signs of mental illness']);
};


module.exports = {
  getRaceData,
  getAgeData,
  transformRow,
  getBodyCameraData,
  getMentalIllnessData,
  getGenderData,
};
