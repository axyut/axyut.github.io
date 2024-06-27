const bannerStar = document.querySelector(".banner");
const canvasStar = document.getElementById("starsCanvas");
const ctxStar = canvasStar.getContext("2d");
canvasStar.width = bannerStar.offsetWidth;
canvasStar.height = bannerStar.offsetHeight;

const numStars = 1700;
const stars = [];
let shootingStar = null;
let shootingStarTimeout = null; // Global variable for shooting star timeout

const createStars = () => {
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvasStar.width;
        const y = Math.random() * canvasStar.height;
        const size = Math.random() * 1.1;
        const opacity = Math.random();
        const twinkleSpeed = Math.random() * 4 + 1;
        const scale = 1;
        const angle = 120;
        stars.push({ x, y, size, opacity, twinkleSpeed, scale, angle });
    }
};

const drawStars = () => {
    ctxStar.clearRect(0, 0, canvasStar.width, canvasStar.height);
    stars.forEach((star) => {
        ctxStar.save();
        ctxStar.globalAlpha = star.opacity;
        ctxStar.translate(star.x, star.y);
        ctxStar.rotate(star.angle); // Rotate to star's angle
        ctxStar.scale(star.scale, star.scale);
        ctxStar.beginPath();
        ctxStar.arc(0, 0, star.size, 0, Math.PI * 2);
        ctxStar.fillStyle = `rgba(255, 255, 255, 1)`;
        ctxStar.shadowBlur = star.size * 2;
        ctxStar.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctxStar.fill();
        ctxStar.restore();
    });
    if (shootingStar) {
        drawShootingStar();
    }
};

const twinkleStars = () => {
    stars.forEach((star) => {
        const prevOpacity = star.opacity;
        const prevScale = star.scale;

        // Twinkle main star
        star.opacity += (Math.random() * 0.02 - 0.01) * star.twinkleSpeed;
        if (star.opacity > 1) star.opacity = 1;
        if (star.opacity < 0) star.opacity = 0;

        star.scale += (Math.random() * 0.02 - 0.01) * star.twinkleSpeed;
        if (star.scale > 1.3) star.scale = 1.3;
        if (star.scale < 0.7) star.scale = 0.7;

        // Influence surrounding stars
        const influenceRadius = 50;
        stars.forEach((otherStar) => {
            if (star !== otherStar) {
                const distance = Math.sqrt(
                    (star.x - otherStar.x) ** 2 + (star.y - otherStar.y) ** 2
                );
                if (distance < influenceRadius) {
                    const influenceFactor =
                        (influenceRadius - distance) / influenceRadius;
                    otherStar.opacity +=
                        (star.opacity - prevOpacity) * 0.1 * influenceFactor;
                    if (otherStar.opacity > 1) otherStar.opacity = 1;
                    if (otherStar.opacity < 0) otherStar.opacity = 0;

                    otherStar.scale +=
                        (star.scale - prevScale) * 0.1 * influenceFactor;
                    if (otherStar.scale > 1.3) otherStar.scale = 1.3;
                    if (otherStar.scale < 0.7) otherStar.scale = 0.7;
                }
            }
        });
    });
};

const animateStars = () => {
    drawStars();
    twinkleStars();
    requestAnimationFrame(animateStars);
};

const selectShootingStar = () => {
    const topHalfStars = stars.filter((star) => star.y < canvasStar.height / 2);
    const randomIndex = Math.floor(Math.random() * topHalfStars.length);
    const selectedStar = topHalfStars[randomIndex];
    selectedStar.isShooting = true;
    shootingStar = {
        ...selectedStar,
        progress: 0,
        scale: 1.5,
        size: 1.5,
    };
    shootingStarTimeout = setTimeout(selectShootingStar, Math.random() * 5000); // Randomly select next shooting star
};

const drawShootingStar = () => {
    const { size, x, y, angle, progress } = shootingStar;
    const shootingDistance = canvasStar.height + size; // Move beyond canvas height

    ctxStar.save();
    ctxStar.globalAlpha = shootingStar.opacity;
    ctxStar.translate(
        x + Math.cos(angle) * progress,
        y + Math.sin(angle) * progress
    ); // Move in direction of angle

    // Calculate scale based on progress
    const maxScale = 2; // Maximum scale factor
    const minScale = 0.7; // Minimum scale factor
    const distanceScaleFactor = 0.01; // Adjust this factor as needed
    const currentScale =
        minScale +
        (maxScale - minScale) * (progress / shootingDistance) +
        distanceScaleFactor;

    ctxStar.scale(currentScale, currentScale);
    ctxStar.beginPath();
    ctxStar.arc(0, 0, size, 0, Math.PI * 2);
    ctxStar.fillStyle = `rgba(255, 255, 255, 1)`;
    ctxStar.shadowBlur = 500;
    ctxStar.shadowColor = `rgba(255, 255, 0, 1)`;
    ctxStar.boxShadow = "0 0 100px yellow";
    ctxStar.fill();
    ctxStar.restore();

    //box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
    // Add twinkling effect for shooting star
    shootingStar.opacity +=
        (Math.random() * 0.02 - 0.01) * shootingStar.twinkleSpeed;
    if (shootingStar.opacity > 1) shootingStar.opacity = 1;
    if (shootingStar.opacity < 0) shootingStar.opacity = 0;

    if (shootingStar.progress > shootingDistance) {
        shootingStar = null;
        return;
    }

    shootingStar.progress += 9; // Adjust speed here
};
// Animate stars opacity individually
// const animateStarOpacity = () => {
//     stars.forEach((star, i) => {
//         gsap.to(star, {
//             opacity: Math.random(), // Random final opacity
//             duration: 2,
//             delay: Math.random() * 2, // Random delay for each star
//             ease: "power3.out",
//             // onUpdate: () => {
//             //     // Force redraw on each update
//             //     drawStars();
//             // },
//         });
//     });
// };
createStars();
animateStars();
animateStarOpacity();
selectShootingStar();

window.addEventListener("resize", () => {
    canvasStar.width = main.offsetWidth;
    canvasStar.height = main.offsetHeight;
    stars.length = 0; // Clear the stars array
    createStars(); // Recreate stars
    drawStars(); // Redraw stars
    animateStarOpacity(); // Reapply animation
});

// timeline.from("#starsCanvas", {
//     duration: 2,
//     opacity: 0,
//     ease: "power3.out",
// });
