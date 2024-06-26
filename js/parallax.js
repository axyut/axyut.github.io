const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let timeline = gsap.timeline();

// loading animation at the beginning with gasp
Array.from(parallax_el)
    .filter((el) => !el.classList.contains("text"))
    .forEach((el) => {
        timeline.from(
            el,
            {
                top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
                duration: 3,
                ease: "power3.out",
            },
            "0"
        );
    });

timeline
    // .from(
    //     "#text_parallax",
    //     {
    //         y:
    //             window.innerHeight -
    //             document.querySelector("#text_parallax").getBoundingClientRect()
    //                 .top +
    //             400,
    //         duration: 1.4,
    //     },
    //     "1.8"
    // )
    .from(
        "#text_parallax",
        {
            y: -150,
            opacity: 0,
            duration: 1.5,
        },
        "1.5"
    )
    .from(
        ".hide",
        {
            opacity: 0,
            duration: 1.5,
        },
        "2"
    );

// window.addEventListener("mousemove", (e) => {
//     xValue = e.clientX - window.innerWidth / 2;
//     yValue = e.clientY - window.innerHeight / 2;
//     // console.log(xValue, yValue);
//     parallax_el.forEach((el) => {
//         let speedx = el.dataset.speedx;
//         let speedy = el.dataset.speedy;
//         let speedz = el.dataset.speedz;

//         let isInLeft =
//             parseFloat(getComputedStyle(el).left) < window.innerWidth / 2
//                 ? 1
//                 : -1;
//         let zValue =
//             (e.clientX - parseFloat(getComputedStyle(el).left)) *
//             isInLeft *
//             0.1;

//         el.style.transform = `translateX(calc( -50% + ${
//             xValue * speedx
//         }px)) translateY(calc( -50% + ${yValue * speedy}px))
//       perspective(2300px) translateZ(${zValue * speedz}px)
//       `;
//     });
// });
