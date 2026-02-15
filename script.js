const container = document.getElementById("coins-container");
const fullscreenZone = document.getElementById("fullscreen-zone");

let coins = [];
let lastTap = 0;

/* CREAR MONEDA */
function createCoin(x, y) {
    const coin = document.createElement("div");
    coin.classList.add("coin");

    const size = window.innerWidth * 0.22;

    coin.style.left = (x - size/2) + "px";
    coin.style.top = (y - size/2) + "px";

    container.appendChild(coin);
    coins.push(coin);
}

/* TAP CREAR MONEDA */
document.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    createCoin(touch.clientX, touch.clientY);
});

/* DESLIZAR BORRAR */
document.addEventListener("touchmove", e => {
    const touch = e.touches[0];

    coins.forEach((coin, i) => {
        const rect = coin.getBoundingClientRect();

        if (
            touch.clientX > rect.left &&
            touch.clientX < rect.right &&
            touch.clientY > rect.top &&
            touch.clientY < rect.bottom
        ) {
            coin.remove();
            coins.splice(i, 1);
        }
    });
});

/* DOBLE TAP FULLSCREEN */
fullscreenZone.addEventListener("touchend", () => {
    const now = Date.now();

    if (now - lastTap < 300) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    lastTap = now;
});