let canvas = document.getElementById("myCanvas");
let playButton = document.querySelector(".play-button");
let tutorCanvas = document.getElementById("tutor");
let command = document.querySelector(".command");

let ctx = canvas.getContext("2d");
let toutorCtx = canvas.getContext("2d");

let learningList = [];
let learningIndexList = 0;
let currentTime= [];
let currentElemnt;
let squareCounter = 0;
let squareCounterPlayer = 0;
let firstClick = true;
let level = Number(canvas.dataset.level);
let start,end,intervalId;

const signalLen = 210;
let changeRectColor = true;

let canvasParameters = {speed: 4, height: 10,fillSpeed: 4 ,extraTime:false}

class Square {
    constructor(canvas,color,player=true,time,id=-1,end=false) {
        this.id =id;
        this.time = time;
        this.end = end;
        this.canvas = player ? canvas : tutorCanvas;
        this.ctx = player ? canvas.getContext("2d") : tutorCanvas.getContext("2d");
        this.size = 7; // Rozmiar kwadratu
        this.color = color; 
        this.player = player; 
        this.x = player ? (canvas.width/2) : 0; // Początkowa pozycja X (lewa krawędź)
        this.y = player ? (canvas.height - this.size)/2 : (canvas.height - this.size)/4; // Losowa pozycja Y
        this.speed = canvasParameters.speed; 
        this.draw(); 
        this.creating
        this.notTraced = true;
    }

    draw() {
    
        this.ctx.fillStyle = this.color;
        if(this.color == "white"){
            this.ctx.fillRect(this.x, this.y - 3, 10, canvasParameters.height + 12);
        }else{
            this.ctx.fillRect(this.x, this.y , 7, canvasParameters.height);
        }

    }

    update() {
        this.x += this.speed; // Przesunięcie kwadratu w prawo

        if( this.x > ( canvas.width /2 - (canvas.width/5) ) && !this.player && this.notTraced && this.color == "black" && !this.end){
            this.notTraced = false;
            currentTime.push({id:this.id,time:this.time});
        }
        if( this.x > (  canvas.width /2 + (canvas.width/5) ) && !this.player && this.notTraced && this.color == "black" && this.end){
            this.notTraced = false;
            let index = currentTime.findIndex(obj => obj.id === this.id);
            if(index !== -1){
                currentTime.splice(index, 1);
            }
        }
        if(this.player && this.notTraced) {
            // console.log(this.end);
            this.notTraced = false;

            ++squareCounterPlayer;
            if(!this.end){
                currentElemnt= [Date.now(),currentTime,this];
            }else{
                const duration = Date.now() - currentElemnt[0];
                if(currentElemnt[1][0] !== undefined){
                    let opctions = currentElemnt[1][0];
                    if(duration < (opctions.time + opctions.time/2) && duration > (opctions.time - opctions.time/2)){
                        let index = currentTime.findIndex(obj => obj.id === opctions.id);
                        if(index !== -1){
                            currentTime.splice(index, 1);
                        }
                        currentElemnt[2].color = changeRectColor ? '#28a745' : currentElemnt[2].color;
                        this.fillSquare(duration,'#28a745');
                    }else{
                        currentElemnt[2].color = changeRectColor ? 'red' : currentElemnt[2].color;
                        this.fillSquare(duration,'red');
                    }
                }else{
                    currentElemnt[2].color = changeRectColor ? 'red' : currentElemnt[2].color;;
                    this.fillSquare(duration,'red');
                }
        
            }
    
        }


        if (this.x > (canvas.width + 500)) {
            this.remove();
        } else {
            this.draw();
        }
    }

    fillSquare(duration,color){
        if(changeRectColor){
            canvas.getContext("2d").fillStyle = color;
            canvas.getContext("2d").fillRect(( ((canvas.width/2)+this.speed) + (duration/(this.speed*100))),this.y,(duration/(canvasParameters.fillSpeed)),canvasParameters.height );
        }
    }

    remove() {
        if(this.player){
            squares.splice(squares.indexOf(this), 1);
        }else{
            tutorSquares.splice(tutorSquares.indexOf(this), 1);
        }
    }
}

let squares = [];
let tutorSquares= [];

function createSquare(color,player,time,id,end) {
    if(player){
        squares.push(new Square(canvas,color,player,0,0,end));
    }else{
        tutorSquares.push(new Square(tutorCanvas,color,player,time,id,end));
    }

}

const mediaQuery = window.matchMedia("(min-width: 1000px)");

function adjustCanvas(viewSize) {
  
    if (viewSize.matches) { 
        canvas.width = 900;
        tutorCanvas.width = 900;
        canvas.height = 220;
        tutorCanvas.height = 220;
        console.log("rooobie");
        canvasParameters.speed = 6;
        canvasParameters.height = 14;
        canvasParameters.fillSpeed = 6*.4105;
        canvasParameters.extraTime = true;
    }else{
        canvas.width = 400;
        tutorCanvas.width = 400;
        canvas.height = 120;
        tutorCanvas.height = 120;
        canvasParameters.speed = 4;
        canvasParameters.height = 10;
        canvasParameters.fillSpeed = 4;
        canvasParameters.extraTime = false;
    }
}

adjustCanvas(mediaQuery);

mediaQuery.addEventListener("change", function(size) {
    adjustCanvas(size);
});


function animate() {
    requestAnimationFrame(animate);

    squares.forEach(function(square) {
        square.update();
    });
    tutorSquares.forEach(function(square) {
        square.update();
    });
}

function startPainting(player,color,time,id){
if(!player){
    createSquare(color,player,time,id);
}else{
    createSquare("black",player);
    block = true;
    oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    const frequency = 450;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    oscillator.start();
    start = Date.now();
    intervalId = setInterval(()=>{
        //   document.querySelector("#sygnalTime").textContent = Date.now() - start;
    },30);
}

}

function endPainting(player,color,id){
if(!player){
    createSquare(color,player,0,id,true);
}else{
    createSquare("white",player,0,0,true);
    block = false;
    oscillator.stop();
    end = Date.now();
    signalsLen.push(end - start);
    text ='';
    signalsLen.forEach((len)=>{
        text += len + " "; 
    })
    clearInterval(intervalId);
    detectLetter();
}

}

animate();

intervalId = setInterval(()=>{
    if(Date.now() - end > signalLen*13 && Date.now() - start > signalLen*13 ){
        if(transmitLetter.textContent[transmitLetter.textContent.length -1] != " "){
            transmitLetter.textContent += " ";
        }
    }
    if(Date.now() - end > signalLen*5 && Date.now() - start > signalLen*5 ){
        if(signalsLen.length > 0){
            console.log("Teraz dodano",guessingLetter.textContent);
            transmitLetter.textContent += guessingLetter.textContent;
        }
        signalsLen = [];
        guessingLetter.textContent = "";
     }
},300)