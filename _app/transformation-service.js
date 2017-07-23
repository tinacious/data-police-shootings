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

  return {
    data   : _.values(raceCountMap),
    labels : _.keys(raceCountMap)
  };
};


module.exports = {
  getRaceData,
  transformRow
};
