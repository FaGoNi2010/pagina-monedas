const container = document.getElementById("coins-container");
let coins = [];

function createCoin(x, y) {
const coin = document.createElement("div");
coin.classList.add("coin");

coin.style.left = x - 20 + "px";
coin.style.top = y - 20 + "px";

container.appendChild(coin);
coins.push(coin);
}

document.addEventListener("click", (e) => {
createCoin(e.clientX, e.clientY);
});

document.addEventListener("mousemove", (e) => {
if (e.buttons === 1) {
coins.forEach(c => c.remove());
coins = [];
}
});