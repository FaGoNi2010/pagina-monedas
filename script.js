const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let coins = [];

/* ===== CREAR MONEDA ===== */
function createCoin(x, y) {
    coins.push({
        x: x,
        y: y,
        size: 70 + Math.random() * 20, // grandes para celular
        rotation: Math.random() * Math.PI
    });
}

/* ===== DIBUJAR ===== */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    coins.forEach(c => {

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);

        // borde plateado
        ctx.beginPath();
        ctx.arc(0, 0, c.size, 0, Math.PI * 2);
        ctx.fillStyle = "#c0c0c0";
        ctx.fill();

        // centro
        ctx.beginPath();
        ctx.arc(0, 0, c.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#e0e0e0";
        ctx.fill();

        // aro interior
        ctx.beginPath();
        ctx.arc(0, 0, c.size * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();

        c.rotation += 0.02;
    });

    requestAnimationFrame(draw);
}
draw();

/* ===== TAP = CREAR ===== */
canvas.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    createCoin(touch.clientX, touch.clientY);
});

/* ===== DESLIZAR = BORRAR SOLO UNA ===== */
canvas.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // buscar moneda tocada
    for (let i = coins.length - 1; i >= 0; i--) {
        let c = coins[i];
        let dx = x - c.x;
        let dy = y - c.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < c.size) {
            coins.splice(i, 1);
            break;
        }
    }
});