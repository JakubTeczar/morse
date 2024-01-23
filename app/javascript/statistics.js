
var options = {
  series: [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
}],
  chart: {
  height: 350,
  type: 'line',
  zoom: {
    enabled: false
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'straight'
},
grid: {
  row: {
    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
    opacity: 0.5
  },
},
xaxis: {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
}
};

var chart = new ApexCharts(document.querySelector("#myChart3"), options);
chart.render()
let png;
let svg;

// chart.render().then(() => {
//   svg = chart.paper().svg();
//   downloadPNG()
// });

setTimeout(()=>{
  svg = chart.paper().svg();
  downloadPNG()
},1000);

async function downloadPNG() {
  const base64 = await chart.dataURI();
  // console.log("base 64", base64.imgURI);
  png= base64.imgURI;
  svg = chart.paper().svg();
}

document.querySelector(".export_to_pdf").addEventListener("click", function(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append('image_data',png);
  Rails.ajax({
    type: 'POST',
    // url: '/users/test_PDF',
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
