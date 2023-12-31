const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");
const screenWidth = window.screen.width;
const sec3 = document.querySelector(".sec3");

function PageTransitions() {
  // if screenWidth is less than 520px then show portfolio section
  if (screenWidth < 520) {
    const element = document.getElementById("portfolio");
    element.classList.add("active");

    const btn = document.querySelector(".control-3");
    btn.classList.add("active-btn");

    sectBtns.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
  } else {
    const btn = document.querySelector(".control-1");
    btn.classList.add("active-btn");
  }

  //Button click active class
  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace(
        "active-btn",
        ""
      );
      this.className += " active-btn";
    });
  }

  //Sctions Active
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //resmove selected from the other btns
      sectBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      //hide other sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      const element = document.getElementById(id);
      element.classList.add("active");
      checkActive();
    }
  });
}

PageTransitions();

// if any of the sections has class active then not fire event
// parallax mouse movement code
let xValue = 0;
let yValue = 0;
let oneDoes = false;

function checkActive() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    oneDoes = section.classList.contains("active");
    // console.log(oneDoes);
    if (oneDoes) {
      break;
    }
  }
  return;
}
checkActive();
// console.log(oneDoes);

// not working rn, idk why
if (!oneDoes) {
  window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;
    // console.log(xValue, yValue);
    parallax_el.forEach((el) => {
      let speedx = el.dataset.speedx;
      let speedy = el.dataset.speedy;
      let speedz = el.dataset.speedz;

      let isInLeft =
        parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
      let zValue =
        (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

      el.style.transform = `translateX(calc( -50% + ${
        xValue * speedx
      }px)) translateY(calc( -50% + ${yValue * speedy}px))
        perspective(2300px) translateZ(${zValue * speedz}px)
        `;
    });
  });
}
