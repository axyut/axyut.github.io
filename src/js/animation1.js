const canvas = document.createElement("canvas")
document.getElementById("container").appendChild(canvas)
const ctx = canvas.getContext("2d")

const CELL_SIZE = 3 // px
const DISPLAY_CELL_SIZE = CELL_SIZE + 1 // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#000000"
const radius = 12 // Radius of the circle
const width = 200 // Width of the 2D array
const height = 200 // Height of the 2D array
const speed = 1 // Speed of movement
canvas.height = DISPLAY_CELL_SIZE * height
canvas.width = DISPLAY_CELL_SIZE * width
const centerX = canvas.width / DISPLAY_CELL_SIZE / 2
const centerY = canvas.height / DISPLAY_CELL_SIZE / 2
let x = centerX
let y = centerY
let dx = Math.random() * 2
let dy = Math.random() * 2

// Create a 2D array and initialize it
const circleArray = new Array(width * height)

const getIndex = (row, column) => row * width + column

function calculate() {
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Calculate the distance from the current point to the center of the circle
      const distance = Math.sqrt((col - x) ** 2 + (row - y) ** 2)
      const idx = getIndex(row, col)
      // Check if the distance is less than or equal to the radius to determine if it's inside the circle
      circleArray[idx] = distance <= radius ? 1 : 0
    }
  }
}
const drawGrid = () => {
  ctx.beginPath()
  ctx.strokeStyle = GRID_COLOR

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * DISPLAY_CELL_SIZE + 1, 0)
    ctx.lineTo(i * DISPLAY_CELL_SIZE + 1, DISPLAY_CELL_SIZE * height + 1)
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * DISPLAY_CELL_SIZE + 1)
    ctx.lineTo(DISPLAY_CELL_SIZE * width + 1, j * DISPLAY_CELL_SIZE + 1)
  }

  ctx.stroke()
}

function draw() {
  ctx.beginPath()
  // Loop through the 2D array and draw each cell
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // Set the fill style based on the cell value (inside or outside the circle)
      const idx = getIndex(row, col)

      ctx.fillStyle = circleArray[idx] === 0 ? DEAD_COLOR : ALIVE_COLOR

      ctx.fillRect(
        col * DISPLAY_CELL_SIZE + 1,
        row * DISPLAY_CELL_SIZE + 1,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }
  ctx.stroke()
}

function update() {
  x += dx
  y += dy

  if (x + radius >= canvas.width / DISPLAY_CELL_SIZE || x - radius <= 0) {
    dx = -dx // Bounce horizontally
  }

  if (y + radius >= canvas.height / DISPLAY_CELL_SIZE || y - radius <= 0) {
    dy = -dy // Bounce vertically
  }

  calculate()
  draw()
  requestAnimationFrame(update)
}

drawGrid()
update()
