let canvas = document.getElementById('canvasID')
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
this.Images = [];
let score = 0

const sound = new Audio("assets/smash.mp3")

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null
    let sources = ["mole.png"]
    let scope = this;
    let loaded = 0;
    for (let i = 0; i < sources.length; i++)
    {
        let img = new Image();

        img.onload(function () {
            loaded++; 
            if (loaded == sources.length)
            {
                sources.length == hole
            }
        })
        img.src = sources[i];
        this.Images.push(img);
    }

   

    
}
run()

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})

    