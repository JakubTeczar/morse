//= require rails-ujs
const myChart = document.getElementById("myChart");

Chart.defaults.global.defaultFontSize = 26;
const myChartData = {
    labels: [
        "No",
        "Yes",
    ],
    datasets: [
        {
            data: [133.3, 86.2],
            backgroundColor: [
                "#F44336",
                "#00BA00",
            ]
        }]
};

const pieChart = new Chart(myChart, {
  type: 'pie',
  data: myChartData
});