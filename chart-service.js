'use strict';

(function () {
  const Chart = window.Chart;
  const coloursArray = [
    '#36a2eb',
    '#ff6384',
    '#ff9f40',
    '#4bc0c0',
    '#ffcd56',
    '#c8c8c8',
    '#7a56ff'
  ];


  /**
   * TODO: Provide a way to randomize colours,
   * especially for smaller datasets (boolean)
   */


  const getChartColoursForData = (data) => (
    data.map((item, index) => coloursArray[index % coloursArray.length])
  );


  const getTransparentColoursForData = (data, alpha) => (
    getChartColoursForData(data)
      .map((colour) => (
        Chart.helpers.color(colour).alpha(alpha).rgbString()
      ))
  );


  window.ChartService = {
    getChartColoursForData,
    getTransparentColoursForData
  };

})()

