  // Pobranie elementu canvas i jego kontekstu
let canvas = document.getElementById("myCanvas");
let tutorCanvas = document.getElementById("tutor");

let ctx = canvas.getContext("2d");
let toutorCtx = canvas.getContext("2d");

let learningWord = "ale to dobrze dziala";


class Square {
    constructor(canvas,color,player=true) {
        this.canvas = player ? canvas : tutorCanvas;
        this.ctx = player ? canvas.getContext("2d") : tutorCanvas.getContext("2d");
        this.size = 7; // Rozmiar kwadratu
        this.color = color; 
        this.player = player; 
        this.x = player ? 500 : 0; // Początkowa pozycja X (lewa krawędź)
        this.y = player ? (canvas.height - this.size)/2 : (canvas.height - this.size)/4; // Losowa pozycja Y
        this.speed = 4; // Losowa prędkość przesunięcia w prawo
        this.draw(); // Narysowanie kwadratu przy utworzeniu obiektu
        this.creating
    }

    draw() {
     
        this.ctx.fillStyle = this.color;
        if(this.color == "white"){
            this.ctx.fillRect(this.x, this.y - 3, 10, 17);
        }else{
            this.ctx.fillRect(this.x, this.y , 7, 10);
        }
  
    }

    update() {
        this.x += this.speed; // Przesunięcie kwadratu w prawo
        if (this.x > this.canvas) {
            // Usunięcie kwadratu, jeśli przekroczył prawą krawędź
            this.remove();
        } else {
            // Narysowanie kwadratu w nowej pozycji
            this.draw();
        }
    }

    remove() {
        // Usunięcie kwadratu z tablicy
        if(this.player){
            squares.splice(squares.indexOf(this), 1);
        }else{
            console.log("usuniecie tutora");
            tutorSquares.splice(tutorSquares.indexOf(this), 1);
        }
       
    }
}

// Tablica przechowująca obiekty Square
let squares = [];
let tutorSquares= [];



// Funkcja tworząca i dodająca nowe kwadraty do tablicy
function createSquare(color,player) {
    if(player){
        squares.push(new Square(canvas,color,player));
    }else{
        tutorSquares.push(new Square(tutorCanvas,color,player));
    }

}

// Funkcja animująca i aktualizująca kwadraty
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Wyczyszczenie canvasu

    // Aktualizacja każdego kwadratu w tablicy
    squares.forEach(function(square) {
        square.update();
    });
    tutorSquares.forEach(function(square) {
        square.update();
    });
}

// Rozpoczęcie animacji
const signalLen = 200

animate();
let block = false;
let start,end,intervalId;
let signalsLen = [];
let signalDecode =[];
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const letters = JSON.parse(canvas.dataset.letters);
const guessingLetter = document.querySelector(".blur");
const clearStat = ()=>{
    document.querySelector("#signals").textContent ="";
    document.querySelector("#codes").textContent = '';
    document.querySelector(".letters").textContent = '';
    document.querySelector(".blur").textContent = "";
}

const detectLetter = () =>{
    shortSignal = signalLen + signalLen*.5;//+ granica błędu
    signalDecode =[];
    signalsLen.forEach(el => {
        console.log(el);
        if(el <= shortSignal){
            signalDecode.push(".");
        }else{
            signalDecode.push("-")
        }
    });
    
    let text ="";
    console.log(signalDecode);
    signalDecode.forEach((el)=>{
        text += el;
    });
    currentCode = text;
    document.querySelector("#codes").textContent = currentCode;
    
    let matchingLetter = letters.filter(function(el) {
        return el.morse_code == currentCode;
    });
    if(matchingLetter){
        console.log(matchingLetter);
        document.querySelector(".blur").textContent = matchingLetter[0].letter;
        document.querySelector(".blur").style.filter = "blur(3px)";
    }
}
function startPainting(player,color){
    if(!player){
        createSquare(color,player);
    }else{
        createSquare("#0d6efd",player);
        block = true;
        oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        const frequency = 450;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        oscillator.start();
        start = Date.now();
        intervalId = setInterval(()=>{
            document.querySelector("#sygnalTime").textContent = Date.now() - start;
        },30);
    }

}
function endPainting(player,color){
    if(!player){
        createSquare(color,player);
    }else{
        createSquare("white",player);
        block = false;
        oscillator.stop();
        end = Date.now();
        signalsLen.push(end - start);
        text ='';
        signalsLen.forEach((len)=>{
            text += len + " "; 
        })
        document.querySelector("#signals").textContent = text;
        clearInterval(intervalId);
        document.querySelector("#sygnalTime").textContent = 0;
        detectLetter();
    }
  
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && block == false) {
        startPainting(true);
    }
    if(event.key === "l"){
        clearStat();
        
    }
    if(event.key === "k"){
        signalsLen = [];
    }

});

intervalId = setInterval(()=>{
   if(Date.now() - end > signalLen*5 && Date.now() - start > signalLen*5 ){
    if(signalsLen.length > 0){
        document.querySelector(".letters").textContent += document.querySelector(".blur").textContent;
    }
    signalsLen = [];
    document.querySelector(".blur").textContent = "";
   }
},300)

document.addEventListener("keyup", function(event) {
    console.log("pusciles");
    if (block == true) {
        endPainting(true);
    }
});

//run tutor path



const decodeWord = (word)=>{
    let code = "";
    let instructions = [];

    word.split("").forEach((letter)=>{
        matchingCode = letters.filter(function(el) {
            return el.letter == letter;
        });
        code += (code === "" ? "" : " ") + matchingCode[0].morse_code;
    });

    code.split("").forEach((char) => {
        if(char === " "){
            instructions.push([signalLen*8,"white"]);
        }else{
            const signal = char === "." ? signalLen : signalLen*3;
            instructions.push([signal,"black"],[signalLen*1.4,"white"]);
        }
  
    }); 
    return instructions;
}

processInstructions(0,decodeWord("morsecode"));

function processInstructions(index, instructions) {
    if (index < instructions.length) {
      const currentInstruction = instructions[index];
  
      executeInstruction(currentInstruction).then(() => {
        processInstructions(index + 1, instructions);
      });
    }
}


function executeInstruction([time, color]) {
    console.log(time, color);
    return new Promise((resolve) => {
        startPainting(false,color);
        setTimeoutID = setTimeout(() => {
            endPainting(false,color);
        resolve();
        }, time);
    });

}