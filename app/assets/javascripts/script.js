//= require rails-ujs

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".learn-card").addEventListener("click",function(){
        this.classList.toggle("flip");
    })
    const refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', function() {
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
    });
});
  