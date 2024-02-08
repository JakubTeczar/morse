var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var radius = 20;
var x = -radius;

function animate() {
    // Czyszczenie canvasa na początku każdego cyklu animacji
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie prostokąta
    context.beginPath();
    context.fillStyle = "red";
    context.rect(x++, 20,200, radius * 2);
    context.fill();

    // Przesuwanie prostokąta w prawo
    if (x >= canvas.width + radius) {
        x = -radius;
    }

    // Wywołanie funkcji animate() za pomocą requestAnimationFrame()
    requestAnimationFrame(animate);
}

function logOnSpacePress(event) {
    if (event.code === "Space") {
        animate(); // Wywołanie funkcji animate() po naciśnięciu spacji
    }
}

// Nasłuchiwanie na zdarzenie kliknięcia spacji
document.addEventListener("keydown", logOnSpacePress);

// Rozpoczęcie animacji
animate();