

let click =0;
let setTimeoutID;
let instructions = [];
let oscillator;
let soundPlay =false;
let reverse;
let audioContext;
let firstClick = true;
let mode;

function executeInstruction([time, action]) {
    return new Promise((resolve) => {
        const bulb = document.querySelector(".learn-card .morse-code .bulb");
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if(audioContext.state=="suspended"){
            console.log("dupa");
        }
        console.log(audioContext);
        if(action == "light"){
            bulb.classList.add("bulb-on");
        }else if(action=="sound"){
            oscillator = audioContext.createOscillator();
            oscillator.connect(audioContext.destination);
            const frequency = time === 300 ? 570 : 450;
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
    let mode = morseCode.dataset.mode;
    !reverse && document.querySelector(".learn-card").classList.toggle("flip");

    let delay = 200; // start delay
    const signalLen = 300; //signal length

    if(mode === "text"){
        if(click % 2 === 0){
            morseCode.textContent = reverse ? morseCode.dataset.code :morseCode.dataset.letter;
        }else{
            morseCode.textContent = reverse ? morseCode.dataset.letter :morseCode.dataset.code;
        }
    }
    mode= "sound"
    instructions.push([delay,"break"]);

    code.forEach((char) => {
        const signal = char === "." ? signalLen : signalLen*3;
        instructions.push([signal,mode],[signalLen,"break"]);
    }); 
    console.log(code,instructions);

    instructions.pop();
    processInstructions(0, instructions);
    
}
function loadNewLetter(){
    Rails.ajax({
    type: 'GET',
    url: '/letters/learn',
    dataType: 'script',
    success: function(data) {
        console.log('Success:', data);
        if(reverse){
            createInstruction();
        }else{
            restart();
        }
        document.querySelector(".learn-card").classList.toggle("flip");
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
    const noBtn = document.querySelector("#no");
    const yesBtn = document.querySelector("#yes");
    const flipBtn = document.querySelector("#flip");
    const controls = document.querySelector(".controls")

    reverse= document.querySelector(".learn-card .morse-code").dataset.reverse;
    reverse = reverse =="true" ? true : false;
    mode = document.querySelector(".learn-card .morse-code").dataset.mode;

    if(mode != 'text' && click===0 && reverse){
        flipBtn.textContent = "Start";
    }

    flipBtn.addEventListener("click",()=>{
        if(mode != 'text' && click===0 && reverse){
            createInstruction(); 
            ++click; 
            flipBtn.textContent = "Flip card";
        }else{
            if(mode !== "text" && click === 1 && firstClick && reverse){
                firstClick = false;
            }else{
                ++click;
            }
            if(click%2==0){
                // loadNewLetter();
            }else{
                controls.classList.add("show-con");
                if(mode === "text"){
                    createInstruction();
                }else{
                    if(reverse){
                        restart();
                    }else{
                        createInstruction();
                    }
                }
            }
        }
    });
    
    function checkAnswear(answear){
        ++click;
        Rails.ajax({
            url: "/users/update_log",
            type: "PATCH",
            contentType: "application/json",
            data: answear ? "data=yes" : "data=no",
            success: function() {
                console.log(answear ? "+1 yes" : "+1 no");
                loadNewLetter();
                controls.classList.remove("show-con");
            },
            error: function() {
                console.log("adding yes error");
            }
          });
    }
    yesBtn.addEventListener("click",()=>{
        checkAnswear(true);
    });
    noBtn.addEventListener("click",()=>{
        checkAnswear(false);
    });
});
