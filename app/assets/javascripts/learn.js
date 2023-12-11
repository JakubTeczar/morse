let click =0;
let setTimeoutID;
let instructions = [];
let oscillator;
let soundPlay =false;

function executeInstruction([time, action]) {
    return new Promise((resolve) => {
        const bulb = document.querySelector(".learn-card .morse-code .bulb");
    
        if(action == "light"){
            bulb.classList.add("bulb-on");
        }else if(action=="sound"){
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            oscillator = audioContext.createOscillator();
            oscillator.connect(audioContext.destination);
            const frequency = 800;
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            soundPlay= true;
            oscillator.start();
        }
        setTimeoutID = setTimeout(() => {
            if(action==="light"){
                bulb.classList.remove("bulb-on");
            }else if(action==="sound"){
                oscillator.stop();
                soundPlay =false;
            }
        resolve();
        }, time);
    });

}

function processInstructions(index, instructions) {
    if (index < instructions.length) {
      const currentInstruction = instructions[index];
  
      executeInstruction(currentInstruction).then(() => {
        processInstructions(index + 1, instructions);
      });
    }
}

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

            const bulb =document.querySelector(".learn-card .morse-code .bulb");
            bulb && bulb.classList.remove("bulb-on");
    
            clearTimeout(setTimeoutID);
            soundPlay && oscillator.stop();
            instructions=[];

        }else{
            const morseCode = document.querySelector(".learn-card .morse-code");
            const code = morseCode.dataset.code.split('')
            const mode = morseCode.dataset.mode;
            this.classList.toggle("flip");

            let delay = 200; // start delay
            const signalLen = 300; //signal length

            if(mode === "text"){
                morseCode.textContent = morseCode.dataset.code;
            }else{
                document.querySelector(mode === "light" ? ".speaker" : ".light").style.display = "none";
                instructions.push([delay,"break"]);

                code.forEach((char) => {
                    const signal = char === "." ? signalLen : signalLen*3;
                    instructions.push([signal,mode],[signalLen,"break"]);
                }); 
                console.log(code,instructions);

                instructions.pop();
                processInstructions(0, instructions);
            }
        }
    })
});

