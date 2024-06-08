let banner = document.querySelector(".banner");
let canvas = document.getElementById("dotsCanvas");
canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;
const ctx = canvas.getContext("2d");
const dots = [];
const arrayColors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];
let mouse = { x: null, y: null }; // Mouse coordinates

// Function to create dots
const createDots = () => {
    for (let index = 0; index < 50; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 5,
            color: arrayColors[Math.floor(Math.random() * 5)],
            vx: (Math.random() - 0.5) * 0.5, // x velocity
            vy: (Math.random() - 0.5) * 0.5, // y velocity
        });
    }
};

// Function to draw dots
const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((dot) => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
};

// Function to update dot positions
const updateDots = () => {
    dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce dots off the edges of the canvas
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
    });
};

// Function to draw connection lines
const drawLines = () => {
    if (mouse.x === null || mouse.y === null) return; // If mouse is not over the banner, do nothing

    dots.forEach((dot) => {
        let distance = Math.sqrt(
            (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
};

// Function to animate the dots
const animateDots = () => {
    updateDots();
    drawDots();
    drawLines(); // Draw lines after drawing dots
    requestAnimationFrame(animateDots);
};

// Event listeners for mouse interaction
banner.addEventListener("mousemove", (event) => {
    mouse.x = event.pageX - banner.getBoundingClientRect().left;
    mouse.y = event.pageY - banner.getBoundingClientRect().top;
});

banner.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
    drawDots();
});

window.addEventListener("resize", () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;
    dots.length = 0; // Clear the dots array
    createDots(); // Recreate dots
    drawDots(); // Redraw dots
});

// Initialize dots and start animation
createDots();
drawDots();
animateDots();
