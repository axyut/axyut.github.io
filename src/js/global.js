document.addEventListener("DOMContentLoaded", () => {
  const resumeButton = document.getElementById("manpage-activator")
  const manualContainer = document.getElementById("container")
  const topSection = document.getElementById("top-section")

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
})