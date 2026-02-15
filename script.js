const container = document.getElementById("coins-container");
const fullscreenZone = document.getElementById("fullscreen-zone");

/* ========= CREAR MONEDAS ========= */

function createCoin(x, y) {
    const coin = document.createElement("div");
    coin.classList.add("coin");

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    /* CLICK PC = borrar */
    coin.addEventListener("click", () => {
        coin.remove();
    });

    /* TOUCH CELULAR = borrar SOLO si es TAP (no slide) */
    let touchMoved = false;

    coin.addEventListener("touchstart", () => {
        touchMoved = false;
    });

    coin.addEventListener("touchmove", () => {
        touchMoved = true;
    });

    coin.addEventListener("touchend", () => {
        if (!touchMoved) {
            coin.remove();
        }
    });

    container.appendChild(coin);
}

/* ========= CLICK PARA CREAR ========= */

document.addEventListener("click", (e) => {
    createCoin(e.clientX - 45, e.clientY - 45);
});

/* ========= TOUCH PARA CREAR ========= */

document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    createCoin(touch.clientX - 45, touch.clientY - 45);
});

/* ========= FULLSCREEN DOBLE CLICK ESQUINA ========= */

fullscreenZone.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});