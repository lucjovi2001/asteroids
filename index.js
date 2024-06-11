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

class Projectile {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        context.closePath()
        context.fillStyle = 'white'
        context.fill()
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
const FRICTION = 0.95
const PROJECTILE_SPEED = 7

const projectiles = []

function animate() {
    window.requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.update()

    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update()
    }

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
        case 'Space':
            console.log('Key "space" pressed')
            projectiles.push(new Projectile({
                position: {
                    x: player.position.x + Math.cos(player.rotation) * 30,
                    y: player.position.y + Math.sin(player.rotation) * 30,
                },
                velocity: {
                    x: Math.cos(player.rotation) * PROJECTILE_SPEED,
                    y: Math.sin(player.rotation) * PROJECTILE_SPEED,
                }
            }))
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
