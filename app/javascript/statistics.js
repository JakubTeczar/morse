const myChart = document.getElementById("myChart");

Chart.defaults.global.defaultFontSize = 26;
const myChartData = {
    labels: [
        "Yes",
        "No",
    ],
    datasets: [
        {
            data: [ myChart.dataset.yes, myChart.dataset.no],
            backgroundColor: [
                "#00BA00",
                "#F44336",
            ]
        }]
};

const pieChart = new Chart(myChart, {
  type: 'pie',
  data: myChartData
});