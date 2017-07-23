(function () {
  'use strict';

  const Chart = window.Chart;
  const ChartService = window.ChartService;


  window.onload = function () {

    // Call the API
    window.fetch('/data', {
      method: 'get'
    })
    .then((response) => response.json())
    .then((json) => {
      // Init all the charts
      initRaceChart(json.race, 'race');
    });
  };


  /**
   * Initialize the race chart
   * TODO: Pass in the data
   */
  function initRaceChart(raceData, elementId) {
    const raceChartElement = document.getElementById(elementId);
    const ctx = raceChartElement.getContext('2d');

    const data = {
      datasets: [
        {
          data: raceData.data,
          backgroundColor: ChartService.getChartColoursForData(raceData.data),
          label: raceChartElement.dataset.label
        }
      ],
      labels: raceData.labels
    };

    // Create the race chart
    window.raceChart = new Chart(ctx, {
      type: 'pie',
      data,
      options: ChartService.defaultChartOptions()
    });
  }

})();


