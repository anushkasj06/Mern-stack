let btn = document.createElement("button");
let input1 = document.createElement("input");

btn.innerText="Click Me!"

document.querySelector("body").append(btn);
document.querySelector("body").append(input1);

btn.setAttribute("id", "btn");
input1.setAttribute("placeholder", "username");

let btn1 = document.querySelector("#btn");
btn1.classList.add("btn");

let h1 = document.createElement('h1');
document.querySelector('body').append(h1);
h1.innerHTML='Hello World';
let h2 = document.querySelector('h1');

h2.classList.add('h1');

let p = document.createElement('p');
p.innerHTML='Apna College <b>Delta</b> Practice';
document.querySelector('body').append(p);