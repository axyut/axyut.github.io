const port = document.querySelector(".port");
const gnu = document.getElementById("gnu-mascot");
const axyut = document.getElementById("text_parallax");

gnu.addEventListener("click", (e) => {
    let style = port.style.display;
    if (style === "flex") {
        port.style.display = "none";
        axyut.style.display = "inline-block";
    } else if (style === "none") {
        port.style.display = "flex";
        axyut.style.display = "none";
    } else {
        port.style.display = "flex";
        axyut.style.display = "none";
    }
});

gnu.onmousemove = (e) => {
    axyut.textContent = "*BONK* me! >:(";
};

gnu.onmouseout = (e) => {
    axyut.textContent = "@axyut";
};

axyut.onmouseenter = (e) => {
    axyut.textContent = "💫*BONK* that mascot >:(";
};

axyut.onmouseleave = (e) => {
    axyut.textContent = "@axyut";
};

axyut.addEventListener("click", (e) => {
    let style = port.style.display;
    if (style === "flex") {
        port.style.display = "none";
        axyut.style.display = "inline-block";
    } else if (style === "none") {
        port.style.display = "flex";
        axyut.style.display = "none";
    } else {
        port.style.display = "flex";
        axyut.style.display = "none";
    }
});
