
function loadLevel(){
    let copy = [];
    const unLock = JSON.parse(document.querySelector(".letters-box").dataset.unLock);
    unLock.forEach((el)=>{
        copy.push(el.letter);
    });
    document.querySelectorAll(".letter-box").forEach((el)=>{
        const letter = el.querySelector("p").textContent;
        if (copy.includes(letter)){
            el.classList.add("un-lock-letter");
        }else{
            el.classList.add("lock-letter");
        }
    });
}
loadLevel()