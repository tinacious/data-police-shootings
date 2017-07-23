'use strict';

const coloursArray = [
  '#ff6384',
  '#36a2eb',
  '#ff9f40',
  '#4bc0c0',
  '#ffcd56',
  '#c8c8c8',
  '#7a56ff'
];

const defaultChartOptions = () => ({ responsive: true });

const getChartColoursForData = (data) => {
  return data.map((item, index) => {
    return coloursArray[index % coloursArray.length]
  })
};


window.ChartService = {
  defaultChartOptions,
  getChartColoursForData
};
