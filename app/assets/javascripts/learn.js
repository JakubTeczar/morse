//= require rails-ujs
let click =0;
console.log("inicjacja", click);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".learn-card").addEventListener("click",function(){
        ++click;
        if(click%2==0){
            Rails.ajax({
            type: 'GET',
            url: '/letters/learn',
            dataType: 'script',
            success: function(data) {
                console.log('Success:', data);
            },
            error: function() {
                console.log('Error: Unable to refresh letter.');
            }
            });
        }else{
            this.classList.toggle("flip");
        }g
    })
});
  