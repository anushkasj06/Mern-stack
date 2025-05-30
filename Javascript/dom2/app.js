let btn = document.querySelector("button");

btn.addEventListener("click", function(){
    let h3 = document.querySelector("h3");
    let randomColor = generateColor();
    h3.innerText = randomColor;
    let box = document.querySelector("div");
    box.style.backgroundColor = randomColor;

})

function generateColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = `rgb(${red},${green},${blue})`;
    return color;
}
