const myChart = document.getElementById("myChart");

const myChartData = {
    labels: [
        "Yes",
        "No",
    ],
    datasets: [
    {
    data: [ myChart.dataset.yes, myChart.dataset.no],
    backgroundColor: [
        "#4bc0c0",
        "#ff5579",
    ]
    }]
};

const pieChart = new Chart(myChart, {
  type: 'pie',
  data: myChartData
});

const myChart2 = document.getElementById("myChart2");

const myChartData2 = {
    labels: [
        "Inporgress",
        "Learned",
        "New",
    ],
    datasets: [
        {
            data: [ myChart2.dataset.inporgress, myChart2.dataset.learned, myChart2.dataset.new],
            backgroundColor: [
                "#36A2EB",
                "#ffcd56",
                "#c9cbcf",
            ]
        }]
};

const pieChart2 = new Chart(myChart2, {
  type: 'doughnut',
  data: myChartData2
});



Chart.defaults.global.defaultFontSize = 25;
const ctx3 = document.getElementById('myChart3');
const stat= JSON.parse(ctx3.dataset.stat);
console.log(stat);

let labels = [];
let yes = [];
let no = [];

stat.forEach(el => {
    const daysOfWeekPolish = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const dayOfWeekNamePolish = daysOfWeekPolish[new Date(el.date).getDay()];
    labels.push(dayOfWeekNamePolish)
    yes.push(el.yes)
    no.push(el.no)
});

const data = {
    labels: labels,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
    },
    datasets: [{
        label: 'My First Dataset',
        data: yes,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    },{
        label: 'My First 2',
        data: no,
        fill: false,
        borderColor: 'rgb(0, 192, 0)',
        tension: 0.1
    }],
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }
};

const config = {
    type: 'line',
    data: data,
};

const myChart3 = new Chart(ctx3, config);