let gameSeq = [];
let playerSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

let btns = ["yellow", "blue", "green", "red"];

document.addEventListener("click", function() {
    if (!started) {
        started = true;
        console.log("Game Started");
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 1000);
}

function levelUp() {
    level++;
    h2.innerText = "Level " + level;
    let randomNum = Math.floor(Math.random() * 3);
    console.log(randomNum);
    let randomColor = btns[randomNum];
    let randomColorBtn = document.querySelector("#" + randomColor);
    console.log(randomColorBtn);
    btnFlash(randomColorBtn);
    
}