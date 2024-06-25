const port = document.querySelector(".port");
const gnu = document.getElementById("gnu-mascot");

gnu.addEventListener("click", (e) => {
    let style = port.style.display;
    if (style === "flex") {
        port.style.display = "none";
    } else if (style === "none") {
        port.style.display = "flex";
    } else {
        port.style.display = "flex";
    }
});
