// Config
const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const color = "green"
const words = ["HELLO", "WORLD", "MATRIX", "ANIMATION", "JAVASCRIPT", "SVG"] // Words to animate
const getRandomNumber = (min, max) => () =>
  Math.floor(Math.random() * (max - min) + min)
const getAnimationDuration = getRandomNumber(3, 8) // Range of animation durations (in seconds)
const getFontSize = getRandomNumber(10, 40) // Range of font sizes (in pixels)
const getX = getRandomNumber(0, windowWidth)
const getWordIndex = getRandomNumber(0, words.length - 1)
const getTimeout = getRandomNumber(50, 500)
let theMatrix = []

// Create an SVG element
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
svg.setAttribute("width", "100%")
svg.setAttribute("height", "100%")
document.getElementById("matrix-container").appendChild(svg)

function getRandomCharacter() {
  return String.fromCharCode(Math.random() * 94 + 33)
}

function shiftArray(arr, val) {
  return [val, ...arr].slice(0, -1)
}

function unmountSvg(arr) {
  arr.forEach((text) => svg.removeChild(text))
}

function createMatrix() {
  const fragment = document.createDocumentFragment()
  const matrix = []
  const fontSize = getFontSize()
  const slots = Array(Math.floor(windowHeight / fontSize)).fill("")
  const x = getX()
  for (let i = 0; i < slots.length; i++) {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
    text.setAttribute("x", x)
    text.setAttribute("y", i * fontSize)
    text.setAttribute("fill", color)
    text.setAttribute("fill-opacity", fontSize / 40)
    text.textContent = getRandomCharacter()
    text.setAttribute("font-size", `${fontSize}px`)
    matrix[i] = text
    fragment.appendChild(text)
  }
  svg.appendChild(fragment)
  return {
    textToAppend: words[getWordIndex()],
    slots,
    matrix,
    finish: false,
  }
}

// Animation loop
function animate(time) {
  theMatrix = theMatrix.reduce((prev, val) => {
    val.finish = !val.textToAppend && val.slots.every((val1) => !val1)
    if (!val.finish) {
      val.slots = shiftArray(
        val.slots,
        val.textToAppend.charAt(val.textToAppend.length - 1)
      )
      val.textToAppend = val.textToAppend.slice(0, -1)
      val.matrix.forEach((text, i) => (text.textContent = val.slots[i]))
      return [...prev, val]
    } else {
      setTimeout(unmountSvg.bind(null, val.matrix), 100)
      return prev
    }
  }, [])
  // theMatrix.forEach((val) => {
  //     if (!val.finish) {
  //         val.slots = shiftArray(val.slots, val.textToAppend.charAt(val.textToAppend.length - 1));
  //         val.textToAppend = val.textToAppend.slice(0, -1);
  //     } else {
  //         garbageCollector.push([...val.matrix]);
  //     }
  //     val.matrix.forEach((text, i) => text.textContent = val.slots[i]);
  // });
  // theMatrix = theMatrix.filter(val => {
  //     if (val.finish) {
  //         val.matrix.forEach(text => svg.removeChild(text));
  //     }
  //     return !val.finish;
  // });

  requestAnimationFrame(animate)
}

function pushMatrix(val) {
  theMatrix.push(val)
  // setTimeout(pushMatrix.bind(null, createMatrix()), getTimeout());
}

// Start the animation
theMatrix.push(createMatrix())
animate()

setInterval(() => {
  pushMatrix(createMatrix())
}, 100)

// setTimeout(pushMatrix.bind(null, createMatrix()), getTimeout());
