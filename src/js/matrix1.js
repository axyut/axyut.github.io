const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
svg.setAttribute("width", "100%")
svg.setAttribute("height", "100%")
document.getElementById("container").appendChild(svg)

const DEFAULT_WORD_COUNT = 300
const MIN_DURATION = 2
const MAX_DURATION = 10
const MIN_FONTSIZE = 10
const MAX_FONTSIZE = 60
const getRandomNumber = (min, max) => () =>
  Math.floor(Math.random() * (max - min) + min)
const windowHeight = window.innerHeight
const windowWidth = window.innerWidth
const numRows = 30 // Number of rows in animation
const getNewWordLen = getRandomNumber(6, 10)
const getAnimationDuration = getRandomNumber(MIN_DURATION, MAX_DURATION) // Range of animation durations (in seconds)
const getFontSize = getRandomNumber(MIN_FONTSIZE, MAX_FONTSIZE) // Range of font sizes (in pixels)
const getX = getRandomNumber(0, windowWidth)

function pick(...args) {
  return args[getRandomNumber(0, args.length - 1)()]
}

function getChar() {
  return String.fromCharCode(
    pick(
      0x0030,
      0x0031,
      getRandomNumber(0x2000, 0x206f)(),
      getRandomNumber(0x0020, 0x003f)()
    )
  )
}

function createElementNS(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name)
}

function createTextElem(x, y, character, fontSize, color) {
  const textElement = createElementNS("text")
  textElement.textContent = character
  textElement.setAttribute("x", x)
  textElement.setAttribute("y", y)
  textElement.setAttribute("fill", color)
  textElement.setAttribute("fill-opacity", fontSize / MAX_FONTSIZE)
  textElement.setAttribute("font-size", fontSize)
  return textElement
}

function createAnimationElem(startX, endX, startY, endY) {
  const animationDuration = getAnimationDuration()
  const animateElement = createElementNS("animateTransform")
  animateElement.setAttribute("attributeName", "transform")
  animateElement.setAttribute("attributeType", "XML")
  animateElement.setAttribute("type", "translate")
  animateElement.setAttribute("values", `${startX} ${startY}; ${endX} ${endY}`)
  animateElement.setAttribute("dur", `${animationDuration}s`)
  animateElement.setAttribute("repeatCount", "indefinite")
  return animateElement
}

function createWordElem(x, word) {
  const len = word.length
  const fontSize = getFontSize()
  const wordHeight = fontSize * len

  const wordContainer = createElementNS("g")
  wordContainer.setAttribute(
    "transform",
    `translate(${x}, ${Math.random() * -wordHeight})`
  )

  for (let i = 0; i < len; i++) {
    const character = word[i]
    const textElement = createTextElem(
      x,
      i * fontSize,
      character,
      fontSize,
      `hsl(136, 100%, ${(85 / len) * (i + 1)}%)`
    )
    wordContainer.appendChild(textElement)
  }

  const animateElement = createAnimationElem(x, x, -wordHeight, windowHeight)
  wordContainer.appendChild(animateElement)

  return wordContainer
}

const createNewVal = () => {
  const len = getNewWordLen()
  const word = [...new Array(len)].map(() => getChar())
  return {
    word,
    x: getX(),
  }
}

function pushMatrix(val) {
  const word = createWordElem(val.x, val.word)
  svg.appendChild(word)
}

for (let i = 0; i < DEFAULT_WORD_COUNT; i++) {
  pushMatrix(createNewVal())
}
