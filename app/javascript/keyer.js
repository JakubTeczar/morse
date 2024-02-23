

let block = false;
let isWord = false;

let signalsLen = [];
let signalDecode =[];


let unLock =[];


const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let letters = JSON.parse(canvas.dataset.letters);

let generatedPool = JSON.parse(canvas.dataset.generatedPool);
if(typeof generatedPool[0].word != "undefined"){
    document.querySelector(".line").style.width = "100%";
    let copy= [{
        letter: generatedPool[0].word.toLowerCase(),
        morse_code: generatedPool[0].morse_code,
        level: 10
    }];
    isWord = true;
    generatedPool = copy;
}

const transmitLetter = document.querySelector(".letters");
const guessingLetter = document.querySelector(".blur");

const detectLetter = () =>{
    shortSignal = signalLen + signalLen*.5;//+ granica błędu
    signalDecode =[];
    signalsLen.forEach(el => {
        // console.log(el);
        if(el > (signalLen - signalLen*0.5)){
            if(el <= shortSignal){
                signalDecode.push(".");
            }else{
                signalDecode.push("-")
            }
        }else{
            signalDecode.push("");
        }
    
    });
    
    let text ="";
    // console.log(signalDecode);
    signalDecode.forEach((el)=>{
        text += el;
    });
    currentCode = text;
    document.querySelector("#codes").textContent = currentCode;
    
    let matchingLetter = letters.filter(function(el) {
        return el.morse_code == currentCode;
    });
    if(matchingLetter && matchingLetter[0] != undefined){
        // console.log(matchingLetter);
        guessingLetter.textContent = matchingLetter[0].letter;
        guessingLetter.style.filter = "blur(3px)";
    }
}




  
document.addEventListener("keydown", function(event) {
    if(!firstClick){
    if (event.code === "Space" && block == false) {
        startPainting(true);
        playButton.classList.add("button-click");
    }
    }else{
        startLearn();
    }

});

function loadLevel(){
    let stat = [];
    if(firstClick){
        unLock = JSON.parse(canvas.dataset.unLock);
    }else{
        unLock = JSON.parse(canvas.dataset.unLock.replace(/&quot;/g, '"'));
    }
    let len =unLock.length;
    for(let i = 0; i < 8 ; i++){
        let divider;
        if(i == 0){
            divider = 2;
        }else if(i < 6){
            divider = 4;
        }else{
            divider = 5;
        }

        if( (len / divider) >= 1){
            stat.push("100%");
            len-=divider;
        }else{
            if((len / divider) > 0){
                stat.push(`${(len/divider)*100}%`);
                len-=divider
            }else{
                stat.push(`0%`);
            }
        }
    }
    console.log(stat);
}

loadLevel();

function startLearn(){
    loadLevel()
    learningList = [];
    learningIndexList = 0;
    if(!firstClick){
        generatedPool = JSON.parse(canvas.dataset.generatedPool.replace(/&quot;/g, '"'));
    }
   
    if(typeof generatedPool[0].word != "undefined"){
        document.querySelector(".line").style.width = "100%";
        let copy= [{
            letter: generatedPool[0].word.toLowerCase(),
            morse_code: generatedPool[0].morse_code,
            level: 10
        }];
        isWord = true;
        generatedPool = copy;
    }else{
        if(firstClick){
            if(typeof generatedPool[0].letter == "undefined"){
                generatedPool = [...generatedPool[0]];
            }
            if(typeof generatedPool[0].letter == "undefined"){
                generatedPool = [...generatedPool[0]];
            }
        }else{
            generatedPool = JSON.parse(canvas.dataset.generatedPool.replace(/&quot;/g, '"'));
        }
    }
    generatedPool.forEach((el)=>{
      learningList.push({letters:el.letter,level:el.level});
    });
    firstClick = false;
    playButton.textContent = "Play";
    processLearn(learningIndexList,learningList);
}


playButton.addEventListener("pointerdown", function(event) {
    if(!firstClick){
        if (block == false) {
            startPainting(true);
            playButton.classList.add("button-click");
        }
    }else{
        startLearn();
    }
});

playButton.addEventListener("pointerup", function(event) {
    if (block == true) {
        endPainting(true);
        playButton.classList.remove("button-click");
    }
}); 

document.addEventListener("keyup", function(event) {
    if (block == true) {
        endPainting(true);
        playButton.classList.remove("button-click");
    }
});
  
  
let instructions = [];

const decodeWord = (words)=>{
    let code = "";
    words.forEach((word,index)=>{
        word.split("").forEach((letter)=>{
            matchingCode = letters.filter(function(el) {
                return el.letter == letter;
            });
            code += (code === "" ? "" : " ") + matchingCode[0].morse_code;
        });

        if(index !== words.length -1){
            code += "  ";
        }
     
    });
    time = 0;

    code.split("").forEach((char) => {
        if(char === " "){ 
            instructions.push([signalLen*8,"white"]);
            time += signalLen*8;
        }else{
            const signal = char === "." ? signalLen : signalLen*3;
            time += signal+signalLen*1.4;
            instructions.push([signal,"black"],[signalLen*1.4,"white"]);
        }

    }); 
    return [instructions,time];
}
  
  
  
function processInstructions(index, instructions) {
    if (index < instructions.length) {
        const currentInstruction = instructions[index];
    
    executeInstruction(currentInstruction).then(() => {
        processInstructions(index + 1, instructions);
    });
    }
}
  

function executeInstruction([time, color]) {
    ++squareCounter;
    return new Promise((resolve) => {
        startPainting(false,color,time,squareCounter);
        setTimeoutID = setTimeout(() => {
            endPainting(false,color,squareCounter);
        resolve();
        }, time);
    });
  
}
function checkAnswear(answear){
    let httpLevelMode =window.location.href.split("=")[window.location.href.split("=").length-1];
    httpLevelMode = httpLevelMode == "auto" ? "a" : httpLevelMode
    Rails.ajax({
    url: isWord ? "/users/update_log_words" :"/users/update_log",
    type: "PATCH",
    contentType: "application/json",
    data: `data=${httpLevelMode}${answear}`,
        success: function() {
            console.log("Odp" ,answear);
        },
        error: function() {
            console.log("adding answear error");
        }
    });
}

function loadNewLetter(){
    const httpLevelMode =window.location.href.split("=")[window.location.href.split("=").length-1];
    Rails.ajax({
    type: 'GET',
    url: '/keyer/index?level='+httpLevelMode,
    dataType: 'script',
    success: function(data) {
        console.log('Success:', data);
        startLearn();
    },
    error: function() {
        console.log('Error: Unable to refresh letter.');
    }
    });
}

function processLearn(index, letters,forceTutor=false) {
    //length of progress bar
    if(generatedPool.length > 1){
        document.querySelector(".line").style.width = (Math.ceil(generatedPool.length -letters.length + index)*(100/generatedPool.length)).toString() + "%";
    }
      
    if (index < letters.length) {
        const currentInstruction = letters[index];
        executeLearn(currentInstruction,forceTutor).then(() => {
            // console.log("Wywołanie" ,forceTutor,currentInstruction);
            if((transmitLetter.textContent.trim() == currentInstruction.letters.trim()) && !forceTutor ){
                checkAnswear("yes");
                transmitLetter.style.color = "green";
                ++learningIndexList; 
            }else{ 

                if(forceTutor){
                    checkAnswear("no");
                    
                    if(transmitLetter.textContent.trim() == currentInstruction.letters.trim()){
                        transmitLetter.style.color = "green";
                    }else{
                        transmitLetter.style.color = "red";
                    }
                    forceTutor = false;
                    ++learningIndexList; 
                }else{
                    transmitLetter.style.color = "red";
                    if(currentInstruction.level > 4 && !forceTutor){
                        forceTutor = true;
                    }
                   
                }

            }
       
            setTimeout(()=>{
                transmitLetter.style.color = "#0d6efd";
                transmitLetter.textContent = "";
                guessingLetter.textContent = "";
                processLearn(learningIndexList, letters,forceTutor);
            },signalLen*6);
        });
      }else{
        loadNewLetter();
      }
}


  
function executeLearn(learningWord,forceTutor) {
    instructions = [];
    return new Promise((resolve) => {
        if(learningWord.level > 4 && !forceTutor){
            command.textContent = "Transmit Letter: " + learningWord.letters;
            changeRectColor = false;
        }else{
            command.textContent = "Follow The Path: " + learningWord.letters;
            changeRectColor = true;
        }
        transmitLetter.textContent = "";
        setTimeout(()=>{
            if(learningWord.level > 4 && !forceTutor){
                setInterval(()=>{
                    if( transmitLetter.textContent.trim() != undefined){
                        for(let i = 0 ; i < transmitLetter.textContent.trim().length; i++){
                            if(learningWord.letters[i].trim() != transmitLetter.textContent.trim()[i]){
                                setTimeout(()=>{
                                    resolve();
                                },(signalLen*3));
                            }
                        }
                    }
                    if(transmitLetter.textContent.trim() !== "" && learningWord.letters.length <= transmitLetter.textContent.trim().length){
                        setTimeout(()=>{
                            resolve();
                        },(signalLen*3));
                    }
                },300)
            }else{
                const [instructions,time] = decodeWord( Array(learningWord.letters));
                processInstructions(0,instructions);
                setTimeout(()=>{
                    resolve();
                },(time+signalLen*10));
            }
        },signalLen*2);
    });

}