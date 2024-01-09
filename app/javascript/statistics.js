// const myChart = document.getElementById("myChart");

// const myChartData = {
//     labels: [
//         "Yes",
//         "No",
//     ],
//     datasets: [
//     {
//     data: [ myChart.dataset.yes, myChart.dataset.no],
//     backgroundColor: [
//         "#4bc0c0",
//         "#ff5579",
//     ]
//     }]
// };

// const pieChart = new Chart(myChart, {
//   type: 'pie',
//   data: myChartData
// });

const ctx3 = document.getElementById('myChart3');
const stat= JSON.parse(ctx3.dataset.stat);
const type= ctx3.dataset.type;
const mode= ctx3.dataset.mode;
console.log(stat);

let labels = [];
let yes = [];
let no = [];
let learned_letters = [];
let dataPieChart;

stat.forEach(el => {
  const daysOfWeekPolish = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
  const dayOfWeekNamePolish = daysOfWeekPolish[new Date(el.date).getDay()];
  if(mode=="week"){
    labels.push(dayOfWeekNamePolish.substring(0, 3))
  }else{
    labels.push(el.date.substring(5, 10))
  }
  if(type== "progress"){
    learned_letters.push(el.learned_letters)
  }else{
    yes.push(el.yes)
    no.push(el.no)
  }
});

let dataFromServer;
if(type== "progress"){
  dataFromServer  = [{ label: 'Learned letters', data: learned_letters,fill: true,borderColor: '#36A2EB',tension: .2}];
  console.log(dataFromServer);
}else{
  dataFromServer  = [{
    label: 'Yes',
    data: yes,
    fill: false,
    borderColor: '#36A2EB',
    tension: 0.1
},{
    label: 'No',
    data: no,
    fill: false,
    borderColor: 'red',
    tension: 0.1
}]
}

const myChart2 = document.getElementById("myChart2");


if(type == "responses"){
  dataPieChart={
    datasets: [
      {
        data: [ myChart2.dataset.yes, myChart2.dataset.no],
        backgroundColor: [
          "#36A2EB", //green
          "#FF546B", //red
        ]
      }]
    };
}else{
  dataPieChart={
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
}

Chart.defaults.global.defaultFontSize = 18;
const pieChart2 = new Chart(myChart2, {
  type: 'doughnut',
  data: dataPieChart,
  options: {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontSize: 800
        }
      }
    }
}});

// Chart.defaults.global.defaultFontSize = 20;

const data = {
    labels: labels,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
    },
    datasets: dataFromServer,
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