const myChart1 = document.querySelector("#myChart1");
const myChart2 = document.querySelector("#myChart2");
const stat= JSON.parse(myChart1.dataset.stat);
const type= myChart1.dataset.type;
const mode= myChart1.dataset.mode;

let labels = [];
let yes = [];
let no = [];
let learned_letters = [];
let dataPieChart;
let data1;
let data2;
let labels2 = [];

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
  data2 = [ parseInt(myChart2.dataset.inporgress),parseInt(myChart2.dataset.learned),parseInt(myChart2.dataset.new)];
  labels2= ["Inporgress","Learned","New"];
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
  data2 = [ parseInt(myChart2.dataset.yes),parseInt(myChart2.dataset.no)];
  labels2= ["Yes","No"];
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
colors: ['#37de4e','#E91E63'],
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
const options2 = {
  series: data2,
  labels: labels2,
  colors: ['#4287f5','#37de4e','#bdbebf'],
  chart: {
    width: 450,
    type: 'donut',
    zoom: {
      enabled: false
    }, toolbar: {
      show: false
    }
    },  
}

var chart1 = new ApexCharts(myChart1, options1);
var chart2 = new ApexCharts(myChart2, options2);
chart1.render()
chart2.render()
let png;
let svg;

setTimeout(()=>{
  svg = chart1.paper().svg();
  downloadPNG()
},1000);

async function downloadPNG() {
  const base64 = await chart1.dataURI();
  png= base64.imgURI;
  svg = chart1.paper().svg();
}

document.querySelector(".export_to_pdf").addEventListener("click", function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image_data',png);
  Rails.ajax({
    type: 'POST',
    url: '/users/export_to_pdf',
    data: formData,
    dataType: 'json',
    success: function(response) {
      console.log('Success:', response);

      const pdfData = response.pdf_data;
      const filename = response.filename;

      const pdfBlob = b64toBlob(pdfData, 'application/pdf');

      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = filename;

      link.click();
    },
    error: function() {
      console.log('Error: Unable to refresh letter.');
    }
  });
});

// Function to convert Base64 to Blob
function b64toBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
