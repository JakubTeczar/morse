  // Pobranie elementu canvas i jego kontekstu
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  myCanvas.offscreenCanvas = document.createElement("myCanvas");
  myCanvas.offscreenCanvas.width = myCanvas.width;
  myCanvas.offscreenCanvas.height = myCanvas.height;


class Square {
    constructor(canvas,color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.size = 7; // Rozmiar kwadratu
        this.color = color; // Losowy kolor w formacie szesnastkowym
        this.x = 0; // Początkowa pozycja X (lewa krawędź)
        this.y = (canvas.height - this.size)/2; // Losowa pozycja Y
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
        if (this.x > this.canvas.width+20) {
            // Usunięcie kwadratu, jeśli przekroczył prawą krawędź
            this.remove();
        } else {
            // Narysowanie kwadratu w nowej pozycji
            this.draw();
        }
    }

    remove() {
        // Usunięcie kwadratu z tablicy
        squares.splice(squares.indexOf(this), 1);
    }
}

// Tablica przechowująca obiekty Square
var squares = [];



// Funkcja tworząca i dodająca nowe kwadraty do tablicy
function createSquare(color) {
    squares.push(new Square(canvas,color));
}

// Funkcja animująca i aktualizująca kwadraty
function animate() {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // Wyczyszczenie canvasu

    // Aktualizacja każdego kwadratu w tablicy
    squares.forEach(function(square) {
        square.update();
    });
}

// Rozpoczęcie animacji
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
    shortSignal = 130+60;//+ granica błędu
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

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && block == false) {
        createSquare("#0d6efd");
        console.log("wcisnaoles");
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
    if(event.key === "l"){
        clearStat();
        
    }
    if(event.key === "k"){
        signalsLen = [];
    }

});

intervalId = setInterval(()=>{
   if(Date.now() - end > 520 && Date.now() - start > 520){
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
        createSquare("white");
        console.log("pusciles");
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
});


// Przykładowe użycie funkc
