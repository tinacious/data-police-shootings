(function () {
  'use strict';

  const Chart = window.Chart;
  const ChartService = window.ChartService;

  // Global chart settings
  Chart.defaults.global.defaultFontFamily = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif';

  window.onload = function () {

    // Call the API
    window.fetch('/data', {
      method: 'get'
    })
    .then((response) => response.json())
    .then((json) => {
      // Init all the charts


      initPieChart(json.race, 'race'); // Race chart
      initPieChart(json.body_camera, 'bodyCamera'); // Body camera chart
      initBarChart(json.age, 'age'); // Age chart
      initPieChart(json.mental_illness, 'mentalIllness'); // Mental illness camera chart
      initPieChart(json.gender, 'gender'); // Mental illness chart

      console.log(json)

    });
  };


  /**
   * Initialize the race chart
   * TODO: Pass in the data
   */
  function initPieChart(responseData, elementId, randomizeColours) {
    const chartElement = document.getElementById(elementId);
    const ctx = chartElement.getContext('2d');
    const colours = ChartService.getTransparentColoursForData(responseData.data, 0.7);
    if (randomizeColours) {
      // TODO: something
    }

    const data = {
      datasets: [
        {
          data: responseData.data,
          backgroundColor: colours,
          borderColor: ChartService.getChartColoursForData(responseData.data),
          borderWidth: 1,
          label: chartElement.dataset.label
        }
      ],
      labels: responseData.labels
    };

    // Create the race chart
    window.raceChart = new Chart(ctx, {
      type: 'pie',
      data
    });
  }


  function initBarChart(responseData, elementId) {
    const chartElement = document.getElementById(elementId);
    const ctx = chartElement.getContext('2d');

    const data = {
      datasets: [
        {
          data: responseData.data,
          backgroundColor: ChartService.getTransparentColoursForData(responseData.data, 0.7),
          borderColor: ChartService.getChartColoursForData(responseData.data),
          borderWidth: 1,
          label: chartElement.dataset.label
        }
      ],
      labels: responseData.labels
    };

    // Create the race chart
    window.raceChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        legend: { display: false }
      }
    });
  }

})();


