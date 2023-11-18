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
    }
  });

  //Toggle theme
  const themeBtn = document.querySelector(".theme-btn");
  themeBtn.addEventListener("click", () => {
    let element = document.body;
    element.classList.toggle("light-mode");
  });
}

PageTransitions();
