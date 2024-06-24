const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let timeline = gsap.timeline();

Array.from(parallax_el)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
        timeline.from(
            el,
            {
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 2.2,
                ease: "power3.out",
            },
            "1"
        );
    });

timeline
    .from(
        ".text h1",
        {
            y:
                window.innerHeight -
                document.querySelector(".text h1").getBoundingClientRect().top +
                400,
            duration: 1.4,
        },
        "1.8"
    )
    .from(
        ".text h2",
        {
            y: -150,
            opacity: 0,
            duration: 1.2,
        },
        "1.9"
    )
    .from(
        ".hide",
        {
            opacity: 0,
            duration: 1.4,
        },
        "1.8"
    );

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    // console.log(xValue, yValue);
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;

        let isInLeft =
            parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
                ? 1
                : -1;
        let zValue =
            (e.clientX - parseFloat(getComputedStyle(el).left)) *
            isInLeft *
            0.1;

        el.style.transform = `translateX(calc( -50% + ${
            xValue * speedx
        }px)) translateY(calc( -50% + ${yValue * speedy}px))
      perspective(2300px) translateZ(${zValue * speedz}px)
      `;
    });
});
