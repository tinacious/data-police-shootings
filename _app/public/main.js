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

      // Race chart
      initPieChart(json.race, 'race');

      // Body camera chart
      initPieChart(json.body_camera, 'bodyCamera');

      initBarChart(json.age, 'age');

      console.log(json)

    });
  };


  /**
   * Initialize the race chart
   * TODO: Pass in the data
   */
  function initPieChart(responseData, elementId) {
    const chartElement = document.getElementById(elementId);
    const ctx = chartElement.getContext('2d');

    const data = {
      datasets: [
        {
          data: responseData.data,
          backgroundColor: ChartService.getChartColoursForData(responseData.data),
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
          backgroundColor: ChartService.getChartColoursForData(responseData.data),
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


