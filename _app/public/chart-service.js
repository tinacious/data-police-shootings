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

  // const defaultChartOptions = () => ({ responsive: true });

  const getChartColoursForData = (data) => {
    return data.map((item, index) => {
      return coloursArray[index % coloursArray.length]
    })
  };

  const getTransparentColoursForData = (data, alpha) => (
    getChartColoursForData(data)
      .map((colour) => (
        Chart.helpers.color(colour).alpha(alpha).rgbString()
      ))
  );


  window.ChartService = {
    // defaultChartOptions,
    getChartColoursForData,
    getTransparentColoursForData
  };

})()

