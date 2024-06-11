const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.fillStyle = 'black'
context.fillRect(0, 0, canvas.width, canvas.height)

class Player {
    constructor({ position, velocity }) {
        this.position = position // {x, y}
        this.velocity = velocity
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, 100, 100)
    }
}

const player = new Player({
    position: { x: canvas.width / 2, y: canvas.height / 2 },
    velocity: { x: 0, y: 0 },
})

player.draw()
