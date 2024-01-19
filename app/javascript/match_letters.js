

const codes = document.querySelectorAll(".code");
const answearBoxes = document.querySelectorAll(".answear-box");
const codesBox = document.querySelector(".codes");
const checkAnswear = document.querySelector("#check-answear");
// const reload = document.querySelector("#reload");

let selected;
let selectedParent;

// reload.addEventListener("click",()=>{
//     Rails.ajax({
//         type: 'GET',
//         url: '/words/match_letters',
//         dataType: 'script',
//         success: function(data) {
//             console.log('Success:',data);
//         },
//         error: function() {
//             console.log('Error: Unable to refresh letter.');
//         }
//     });
// });


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


for(morse of codes){
    morse.addEventListener("dragstart",function(e){
        selected = e.target;
        selectedParent = e.target.parentNode;
    })
}
for(box of answearBoxes){
    box.addEventListener("dragstart",function(e){
        this.classList.remove("correct");
        this.classList.remove("wrong");
    })
    box.addEventListener("dragover",function(e){
        e.preventDefault();
    });
    box.addEventListener("drop",function(e){
        this.classList.remove("correct");
        this.classList.remove("wrong");
        if(selectedParent != this){
            if(this.textContent != ""){
                const temp =this.textContent
                this.querySelector("div").textContent = selected.textContent;
                selected.textContent = temp;
                console.log("podmianka tekstu", this);
            }else{
                this.appendChild(selected);
            }
        }

    });
}
codesBox.addEventListener("dragover",function(e){
    e.preventDefault();
});
codesBox.addEventListener("drop",function(e){
    if(selected.textContent != ""){
        this.appendChild(selected);
        selected = null;
        selectedParent = null;
    }
});




// import { Controller } from "stimulus"

// export default class extends Controller {
//   connect() {
//     console.log('Connected to YourController');
//   }

//   yourTurboEvent() {
//     console.log('Your Turbo Event');
//   }
// }

// document.addEventListener('turbo:submit-end', function() {
//   console.log('Ajax request completed');
// });

// document.addEventListener('turbo:load', function() {
//   console.log('Turbo loaded');
// });
