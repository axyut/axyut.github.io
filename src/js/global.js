document.addEventListener("DOMContentLoaded", () => {
  const resumeButton = document.getElementById("manpage-activator")
  const manualContainer = document.getElementById("container")
  const topSection = document.getElementById("top-section")
  const matrixer = document.getElementById("matrixer")
  const svg_background = document.getElementById("svg-background")
  svg_background.classList.add("hidden")

  if (!manualContainer.classList.contains("hidden")) {
    manualContainer.classList.add("hidden")
  }

  // if the url contain #manpage, show the manual
  if (window.location.hash === "#manpage") {
    topSection.classList.add("hidden")
    manualContainer.classList.remove("hidden")
    manualContainer.classList.add("show")
  }

  resumeButton.addEventListener("click", (e) => {
    e.preventDefault()

    topSection.classList.add("hidden")
    manualContainer.classList.remove("hidden")
    manualContainer.classList.add("show")
  })

  matrixer.addEventListener("click", (e) => {
    if (svg_background.classList.contains("hidden")) {
      svg_background.classList.remove("hidden")
      matrixer.innerHTML = "matrix!"
      return
    } else {
      svg_background.classList.add("hidden")
      matrixer.innerHTML = "matrix?"
      return
    }
  })
})
