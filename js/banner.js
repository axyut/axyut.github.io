document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector(".banner");

    if (window.innerWidth > 520) {
        window.addEventListener("mousemove", (e) => {
            const xValue =
                (e.clientX - window.innerWidth / 2) / window.innerWidth;
            const yValue =
                (e.clientY - window.innerHeight / 2) / window.innerHeight;

            const speedX = 0.3; // Adjust speed as needed
            const speedY = 0.1; // Adjust speed as needed

            // Calculate the new positions
            const translateX = xValue * speedX * 100;
            const translateY = yValue * speedY * 100;

            // Apply the transform to the banner
            banner.style.transform = `translate(${translateX}%, ${translateY}%)`;
        });
    }
});
