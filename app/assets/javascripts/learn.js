let click =0;
let setTimeoutID;
let instructions = [];
let oscillator;
let soundPlay =false;
let reverse;
let audioContext;
function executeInstruction([time, action]) {
    return new Promise((resolve) => {
        const bulb = document.querySelector(".learn-card .morse-code .bulb");
    
        if(action == "light"){
            bulb.classList.add("bulb-on");
        }else if(action=="sound"){

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

function createInstruction(){
    const morseCode = document.querySelector(".learn-card .morse-code");
    const code = morseCode.dataset.code.split('')
    const mode = morseCode.dataset.mode;
    !reverse && document.querySelector(".learn-card").classList.toggle("flip");

    let delay = 200; // start delay
    const signalLen = 300; //signal length

    if(mode === "text"){
        morseCode.textContent = morseCode.dataset.code;
    }else{
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
function loadNewLetter(){
    Rails.ajax({
    type: 'GET',
    url: '/letters/learn',
    dataType: 'script',
    success: function(data) {
        console.log('Success:', data);
        if(reverse){
            document.querySelector(".learn-card").classList.toggle("flip");
            createInstruction();
        }else{
             restart();
        }
    },
    error: function() {
        console.log('Error: Unable to refresh letter.');
    }
    });
}

function restart(){
    document.querySelector(".learn-card").classList.toggle("flip");
    const bulb =document.querySelector(".learn-card .morse-code .bulb");
    bulb && bulb.classList.remove("bulb-on");

    clearTimeout(setTimeoutID);
    soundPlay && oscillator.stop();
    instructions=[];
}
document.addEventListener('DOMContentLoaded', function() {

    reverse= document.querySelector(".learn-card .morse-code").dataset.reverse;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if(reverse=="true"){
        console.log(audioContext,reverse);
        createInstruction();
    }
    document.querySelector(".learn-card").addEventListener("click",function(){
        ++click;
        if(click%2==0){
            loadNewLetter();
        }else{
            if(reverse=="true"){
                restart();
            }else{
                createInstruction();
            }

        }
    })
});

