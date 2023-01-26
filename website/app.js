const scoreEl = document.getElementById("scoreEl")
const canvas = document.getElementById("canvasid")
const modalEl = document.getElementById("modalEl")
const modalScoreEl = document.getElementById("modalScoreEl")
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height =window.innerHeight
class Player {
    constructor(x,y, radius, color){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }


    draw() {
        c.beginPath()
        c.arc(this.x,this.y ,this.
        radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
}   

class Projectile{
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color 
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x,this.y ,this.
        radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
    
    update(){
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y 
    }
}
class Enemy{
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color 
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x,this.y ,this.
        radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
    
    update(){
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y 
    }
}

class Particle{
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color 
        this.velocity = velocity
    }
    draw() {
        c.beginPath()
        c.arc(this.x,this.y ,this.
        radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
    
    update(){
        this.draw()
        this.x = this.x + this.velocity.x 
        this.y = this.y + this.velocity.y 
    }
}


const x = canvas.width / 2
const y = canvas.height / 2

const player =  new Player(x,y, 15, 'white')
const projectiles = [];
const enemies =[]
const Particles=[]

function spawnEnemies(){
    setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4
   

    let x
    let y
    if (Math.random() < 0.5){
    x = Math.random() <0.5 ? 0 - radius : canvas.width + radius
    y = Math.random() * canvas.height
    //y = Math.random() <0.5 ? 0 - radius : canvas.width + radius
    } else{
    x = Math.random() * canvas.width
    y = Math.random() <0.5 ? 0 - radius : canvas.width + radius    
    }


    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    
    const angle = Math.atan2(canvas.height / 2 - y, 
    canvas.width / 2- x
)
    const velocity = {
        x: Math.cos(angle) * 1.3, 
        y: Math.sin(angle) * 1.3

    }
    
    enemies.push(new Enemy(x, y, radius, color, 
        velocity))
   
    }, 1000)
}

let animationId
let score = 0
function animate(){
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    Particles.forEach(particle =>{
        particle.update
    })
    projectiles.forEach((projectile, index)=> {
        projectile.update()

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height
            ){
            {setTimeout(() => {
                projectiles.splice(index, 1)
             }, 0)
            }
        }    
        
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(player.x - enemy.x,
            player.y - enemy.y)
            if (dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId)
            modalEl.style.visibility = 'visible'
            modalScoreEl.innerHTML = score
        }
            

        projectiles.forEach((projectile, projectileIndex) => {
        const dist = Math.hypot(projectile.x - enemy.x,
             projectile.y - enemy.y)

             if (dist - enemy.radius - projectile.radius < 1)
             {
                for (let i = 0; i < 8; i++){
                    Particles.push(new Particle(projectile.x,
                        projectile.y, 3, 
                        enemy.color, {
                        x: Math.random() - 0.5,
                        y: Math.random() - 0.5
                    })
                    )
                }
             
             
        
             {
                
             if (enemy.radius - 10 > 10) {
                score += 100
                scoreEl.innerHTML = score
                enemy.radius -= 10
                setTimeout(() => {
                    
                    projectiles.splice(projectileIndex, 1)
                 }, 0)
             }   
             else{
                score += 150
                scoreEl.innerHTML = score
             setTimeout(() => {
                enemies.splice(index, 1)
                projectiles.splice(projectileIndex, 1)
             }, 0)

            }
             }
            }   
        })
    })
}

addEventListener('click', (event) =>
{   
    
    const angle = Math.atan2(event.
        offsetY - canvas.height / 2,
        event.offsetX - canvas.width / 2
)
    const velocity = {
        x: Math.cos(angle) * 5, 
        y: Math.sin(angle) * 5
    }
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2,
         5, 'white', velocity)
    
  
    )

  })
animate()
spawnEnemies()
    