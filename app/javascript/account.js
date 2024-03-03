const myChart1 = document.querySelector("#myChart1");
const stat= JSON.parse(myChart1.dataset.stat);
const type= myChart1.dataset.type;
const mode= myChart1.dataset.mode;

let labels = [];
let yes = [];
let no = [];
let learned_letters = [];
let dataPieChart;
let data1;

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

if(type=="progress"){
  data1 =[{
    name: "Yes",
    data: learned_letters
  }];
}else{
  data1 =[{
    name: "Yes",
    data: yes
    },
    {
      name: "No",
      data: no
    }
  ];  
}


const options1 = {
  series: data1,
  chart: {
  height: 350,
  type: 'line',
  zoom: {
    enabled: false
  }, toolbar: {
    show: false
  }
  },  
colors: ['#3c9ebc','#E91E63'],
dataLabels: {
  enabled: true
},
stroke: {
  curve: 'straight'
},
grid: {
  row: {
    colors: ['#f3f3f3', 'transparent'], 
    opacity: 0.5
  },
},
xaxis: {
  categories: labels,
}
};

var chart1 = new ApexCharts(myChart1, options1);
chart1.render()
let png;
let svg;

