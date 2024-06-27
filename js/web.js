let banner = document.querySelector(".banner");
let canvas = document.getElementById("dotsCanvas");
canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;
const ctx = canvas.getContext("2d");
const dots = [];
const arrayColors = ["#545454", "#5F6A6A", "#A6ACAF", "#2C3E50"];
let mouse = { x: 0, y: 0 }; // Mouse coordinates

const numDots = 300;
const autoLineWdith = 0.2;
const mouseLineWidth = 0.6;

canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;

// Adjust the banner's bounding box offsets
const getBannerOffset = () => {
    const rect = banner.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
};
// Function to create dots
const createDots = () => {
    for (let index = 0; index < numDots; index++) {
        let color = arrayColors[Math.floor(Math.random() * 5)];
        let size = Math.random() * 1 + 1;
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: size,
            originalSize: size, // Store original size
            color: color,
            originalColor: color, // Store original color
            isHovered: false, // Track hover state
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

// Function to draw connection lines between dots
const drawDotLines = () => {
    for (let i = 0; i < dots.length; i++) {
        let closeDots = [];

        for (let j = 0; j < dots.length; j++) {
            if (i !== j) {
                let distance = Math.sqrt(
                    (dots[i].x - dots[j].x) ** 2 + (dots[i].y - dots[j].y) ** 2
                );

                if (distance < 100) {
                    // Change distance threshold to 100
                    closeDots.push({ dot: dots[j], distance });
                }
            }
        }

        // Sort by distance and take up to the closest 2 dots
        closeDots.sort((a, b) => a.distance - b.distance);
        closeDots.slice(0, 2).forEach((closeDot) => {
            // Limit to closest 2 dots
            ctx.strokeStyle = dots[i].color;
            ctx.lineWidth = autoLineWdith; // Set line width to 0.5
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(closeDot.dot.x, closeDot.dot.y);
            ctx.stroke();
        });
    }
};

// Function to draw connection lines from mouse to dots
const drawMouseLines = () => {
    if (mouse.x === null || mouse.y === null) return; // If mouse is not over the banner, do nothing

    dots.forEach((dot) => {
        let distance = Math.sqrt(
            (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );
        if (distance < 200) {
            // Keep mouse connection distance to 200
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = mouseLineWidth;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
};

// Function to handle hover effects on white dots
const handleHoverEffects = () => {
    let hoveredDot = null;

    dots.forEach((dot) => {
        let distance = Math.sqrt(
            (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
        );

        if (dot.color === dot.originalColor && distance < 50) {
            dot.size = 5;
            dot.isHovered = true;
            hoveredDot = dot;
        } else if (dot.isHovered && distance >= 50) {
            // Reset to original size and color if mouse moves out of range
            dot.size = dot.originalSize;
            dot.color = dot.originalColor;
            dot.isHovered = false;
        }
    });

    // if (hoveredDot) {
    //     // Create and position the portfolio label inside the enlarged white dot
    //     let label = document.createElement("div");
    //     label.className = "portfolio-label";
    //     label.textContent = "Portfolio";
    //     label.style.left = `${hoveredDot.x}px`; // Center the label horizontally
    //     label.style.top = `${hoveredDot.y}px`; // Center the label vertically
    //     banner.appendChild(label);
    // } else {
    //     // Remove any existing portfolio labels
    //     document
    //         .querySelectorAll(".portfolio-label")
    //         .forEach((label) => label.remove());
    // }
};

// Function to animate the dots
const animateDots = () => {
    updateDots();
    drawDots();
    drawDotLines(); // Draw lines between dots
    drawMouseLines(); // Draw lines from mouse to dots
    handleHoverEffects(); // Handle hover effects on white dots
    requestAnimationFrame(animateDots);
};

// Event listeners for mouse interaction
banner.addEventListener("mousemove", (e) => {
    const bannerOffset = getBannerOffset();
    mouse.x = e.pageX - bannerOffset.left;
    mouse.y = e.pageY - bannerOffset.top;
});

banner.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
    drawDots();
    document
        .querySelectorAll(".portfolio-label")
        .forEach((label) => label.remove()); // Remove the portfolio label when mouse is out
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
