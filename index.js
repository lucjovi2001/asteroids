const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
    constructor({ position, velocity }) {
        this.position = position // {x, y}
        this.velocity = velocity
        this.rotation = 0
    }

    draw() {
        context.save()

        context.translate(this.position.x, this.position.y)
        context.rotate(this.rotation)
        context.translate(-this.position.x, -this.position.y)
        // context.fillStyle = 'red'
        // context.fillRect(this.position.x, this.position.y, 100, 100)
        context.beginPath()
        context.moveTo(this.position.x + 30, this.position.y)
        context.lineTo(this.position.x - 10, this.position.y - 10)
        context.lineTo(this.position.x - 10, this.position.y + 10)
        context.closePath()

        context.strokeStyle = 'white'
        context.stroke()

        context.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

const player = new Player({
    position: { x: canvas.width / 2, y: canvas.height / 2 },
    velocity: { x: 0, y: 0 },
})

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const SPEED = 5
const ROTATIONAL_SPEED = 0.075
const FRICTION = 0.97

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    if (keys.w.pressed) {
        player.velocity.x = Math.cos(player.rotation) * SPEED
        player.velocity.y = Math.sin(player.rotation) * SPEED
    } else if (!keys.w.pressed) {
        player.velocity.x *= FRICTION
        player.velocity.y *= FRICTION
    }
    
    if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
    else if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            console.log('Key "w" pressed')
            keys.w.pressed = true
            break
        case 'KeyA':
            console.log('Key "a" pressed')
            keys.a.pressed = true
            break
        case 'KeyD':
            console.log('Key "d" pressed')
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            console.log('Key "w" released')
            keys.w.pressed = false
            break
        case 'KeyA':
            console.log('Key "a" released')
            keys.a.pressed = false
            break
        case 'KeyD':
            console.log('Key "d" released')
            keys.d.pressed = false
            break
    }
})
