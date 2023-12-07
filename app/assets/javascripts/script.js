//= require rails-ujs
let click =0;
let timeouts = [];
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
            document.querySelector(".learn-card .morse-code .bulb").classList.remove("bulb-on");
            //clear timeouts
            // for (let i = 0; i < timeouts.length; i++) {
            //     clearTimeout(timeouts[i]);
            // }
            // timeouts = [];
        }else{
            const morseCode = document.querySelector(".learn-card .morse-code");
            const bulb = document.querySelector(".learn-card .morse-code .bulb");
            const backdrop = document.querySelector(".backdrop");
            const code = morseCode.dataset.code.split('')
            this.classList.toggle("flip");
            console.log(morseCode.dataset.mode);
            switch(morseCode.dataset.mode){
                case "text":{
                    morseCode.textContent = morseCode.dataset.code;
                    break;
                }
                case "light":{
                    document.querySelector(".speaker").style.display = "none";
                    backdrop.style.display = "block";
                    let sum = 200; // start delay
                    const pipL = 300; //signal length
                    code.forEach((char,index) => {
                        console.log(char, index);
                        if(char === "."){
                            setTimeout(()=>{
                                bulb.classList.add("bulb-on");
                            }, sum )
                            setTimeout(()=>{
                                bulb.classList.remove("bulb-on");
                            }, sum + pipL)
                            sum+= pipL*2;
                        }else{
                            setTimeout(()=>{
                                bulb.classList.add("bulb-on");
                            }, sum )
                            setTimeout(()=>{
                                bulb.classList.remove("bulb-on");
                            }, sum + pipL*3)
                            sum+= pipL*4;
                        }
                    });  
                    setTimeout(()=>{
                        backdrop.style.display = "none";
                    }, sum )
                    break;
                }
                case "sound":{
                    document.querySelector(".light").style.display = "none";
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

                    function playSound(frequency, duration) {
                    const oscillator = audioContext.createOscillator();
                    oscillator.connect(audioContext.destination);
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                    oscillator.start();
                    setTimeout(() => { oscillator.stop(); }, duration);
                    }
                    backdrop.style.display = "block";

                    let sum = 200; // start delay
                    const pipL = 300; //signal length
                    code.forEach((char,index) => {
                        console.log(char, index);
                        if(char === "."){
                            setTimeout(()=>{
                                playSound(500, pipL);
                            }, sum )
                            sum+= pipL*2;
                        }else{
                            setTimeout(()=>{
                                playSound(500, pipL*3);
                            }, sum )
                            sum+= pipL*4;
                        }
                    });  
                    setTimeout(()=>{
                        backdrop.style.display = "none";
                    }, sum )
                    break;
                }
            }
        }
    })
});





// if(char === "."){
//     const timer1 = setTimeout(()=>{
//         bulb.classList.add("bulb-on");
//     }, sum )
//     const timer2 = setTimeout(()=>{
//         bulb.classList.remove("bulb-on");
//     }, sum + pipL)
//     sum+= pipL*2;
//     timeouts.push(timer1,timer2)
// }else{
//     const timer1 =setTimeout(()=>{
//         bulb.classList.add("bulb-on");
//     }, sum )
//     const timer2 =setTimeout(()=>{
//         bulb.classList.remove("bulb-on");
//     }, sum + pipL*3)
//     sum+= pipL*4;
//     timeouts.push(timer1,timer2)
// }