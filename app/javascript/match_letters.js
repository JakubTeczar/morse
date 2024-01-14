const codes = document.querySelectorAll(".code");
const answearBoxes = document.querySelectorAll(".answear-box");
const codesBox = document.querySelector(".codes");
const checkAnswear = document.querySelector("#check-answear");

checkAnswear.addEventListener("click",()=>{
    let counter=0;
    const answear = JSON.parse(checkAnswear.dataset.answear);

    for([index, box] of answearBoxes.entries()){
        if(box.textContent == answear[index]){
            counter++;
            box.classList.remove("wrong");
            box.classList.add("correct");
        }else{
            box.classList.add("wrong");
            box.classList.remove("correct");
        }
    }
    if (counter==answearBoxes.length){
        console.log("wooo");
    }else{
        console.log("Not correct");
    }
});

let selected;
for(morse of codes){
    morse.addEventListener("dragstart",function(e){
        selected = e.target;
    })
}
for(box of answearBoxes){
    box.addEventListener("dragstart",function(e){
        this.classList.remove("correct");
        this.classList.remove("wrong");
        selected = e.target;
    })
    box.addEventListener("dragover",function(e){
        e.preventDefault();
    });
    box.addEventListener("drop",function(e){
        this.classList.remove("correct");
        this.classList.remove("wrong");
        this.innerHTML = "";
        this.appendChild(selected);
        selected = null;
    });
}
codesBox.addEventListener("dragover",function(e){
    e.preventDefault();
});
codesBox.addEventListener("drop",function(e){
    this.appendChild(selected);
    selected = null;
});
