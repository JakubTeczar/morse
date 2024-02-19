  // Pobranie elementu canvas i jego kontekstu
  // Pobranie elementu canvas i jego kontekstu
  let canvas = document.getElementById("myCanvas");
  let playButton = document.querySelector(".button-67");
  let tutorCanvas = document.getElementById("tutor");
  let command = document.getElementById("command");

  
  let ctx = canvas.getContext("2d");
  let toutorCtx = canvas.getContext("2d");
  
  let learningList = [];
  let currentTime= [];
  let currentElemnt;
  let squareCounter = 0;
  let squareCounterPlayer = 0;
  let firstClick = true;
  
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
          this.speed = 4; 
          this.draw(); 
          this.creating
          this.notTraced = true;
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
  
          if( this.x > ( canvas.width /2 - (canvas.width/10) ) && !this.player && this.notTraced && this.color == "black" && !this.end){
              this.notTraced = false;
              currentTime.push({id:this.id,time:this.time});
          }
          if( this.x > (  canvas.width /2 + (canvas.width/10) ) && !this.player && this.notTraced && this.color == "black" && this.end){
              this.notTraced = false;
              let index = currentTime.findIndex(obj => obj.id === this.id);
              if(index !== -1){
                  currentTime.splice(index, 1);
              }
          }
          if(this.player && this.notTraced) {
              console.log(this.end);
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
                          currentElemnt[2].color = '#28a745';
                          this.fillSquare(duration,'#28a745');
                     }else{
                          currentElemnt[2].color = 'red';
                          this.fillSquare(duration,'red');
                     }
                  }else{
                      currentElemnt[2].color = 'red';
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
          canvas.getContext("2d").fillStyle = color;
          canvas.getContext("2d").fillRect(( ((canvas.width/2)+this.speed) + (duration/(this.speed*10))),this.y,(duration/this.speed),10);
      }
      remove() {
          // Usunięcie kwadratu z tablicy
          if(this.player){
              squares.splice(squares.indexOf(this), 1);
          }else{
              tutorSquares.splice(tutorSquares.indexOf(this), 1);
          }
         
      }
  }
  
  // Tablica przechowująca obiekty Square
  let squares = [];
  let tutorSquares= [];
  
  
  
  // Funkcja tworząca i dodająca nowe kwadraty do tablicy
  function createSquare(color,player,time,id,end) {
      if(player){
          squares.push(new Square(canvas,color,player,0,0,end));
      }else{
          tutorSquares.push(new Square(tutorCanvas,color,player,time,id,end));
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
  const signalLen = 210
  
  animate();
  let block = false;
  let start,end,intervalId;
  let signalsLen = [];
  let signalDecode =[];
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const letters = JSON.parse(canvas.dataset.letters);
  const generatedPool = JSON.parse(canvas.dataset.generatedPool);

  generatedPool.forEach((el)=>{
    learningList.push({letters:el.letter,level:el.level});
  });

  

  const guessingLetter = document.querySelector(".blur");
  const clearStat = ()=>{
    //   document.querySelector("#signals").textContent ="";
    //   document.querySelector("#codes").textContent = '';
    //   document.querySelector(".letters").textContent = '';
    //   document.querySelector(".blur").textContent = "";
  }
  
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
          document.querySelector(".blur").textContent = matchingLetter[0].letter;
          document.querySelector(".blur").style.filter = "blur(3px)";
      }
  }

  function startPainting(player,color,time,id){
      if(!player){
          createSquare(color,player,time,id);
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
        //   document.querySelector("#signals").textContent = text;
          clearInterval(intervalId);
        //   document.querySelector("#sygnalTime").textContent = 0;
          detectLetter();
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
    if(event.key === "l"){
        clearStat();
    }
    if(event.key === "k"){
        signalsLen = [];
    }

});

function startLearn(){
    firstClick = false;
    playButton.textContent = "Play";
    processLearn(0,learningList);
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

  
  intervalId = setInterval(()=>{
      if(Date.now() - end > signalLen*13 && Date.now() - start > signalLen*13 ){
          document.querySelector(".letters").textContent += " ";
      }
     if(Date.now() - end > signalLen*5 && Date.now() - start > signalLen*5 ){
          if(signalsLen.length > 0){
              document.querySelector(".letters").textContent += document.querySelector(".blur").textContent;
          }
          signalsLen = [];
          document.querySelector(".blur").textContent = "";
     }
  },300)
  
  playButton.addEventListener("pointerup", function(event) {
        if (block == true) {
            endPainting(true);
            playButton.classList.remove("button-click");
        }
    }); 

  document.addEventListener("keyup", function(event) {
      // console.log("pusciles");
      if (block == true) {
          endPainting(true);
          playButton.classList.remove("button-click");
      }
  });
  
  //run tutor path
  
  let instructions = [];
  
  const decodeWord = (words)=>{
      let code = "";
      console.log(words);
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
     
      })
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
      // console.log(time, color);
      ++squareCounter;
      return new Promise((resolve) => {
          startPainting(false,color,time,squareCounter);
          setTimeoutID = setTimeout(() => {
              endPainting(false,color,squareCounter);
          resolve();
          }, time);
      });
  
  }

  
  function processLearn(index, letters) {
      if (index < letters.length) {
        const currentInstruction = letters[index];
        executeLearn(currentInstruction).then(() => {
            const letter = document.querySelector(".letters");
            console.log(currentInstruction);
            if(guessingLetter.textContent.trim() == currentInstruction ){
                console.log("zgadza sie");
            }else{
                console.log("nie zdagdza sie");
            }
            setTimeout(()=>{
                letter.textContent = "";
                console.log("wywolanie");
                processLearn(index + 1, letters);
            },signalLen*2);
        });
      }
  }
  
  function executeLearn(learningWord) {
    console.log(learningWord.level);
    instructions = [];
    return new Promise((resolve) => {
        const [instructions,time] = decodeWord( Array(learningWord.letters));
        console.log(instructions,time);
        processInstructions(0,instructions);
        setTimeout(()=>{
            resolve();
        },(time+signalLen*7));
    });

  }