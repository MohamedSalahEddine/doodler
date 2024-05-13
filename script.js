const grid = document.querySelector('.grid')
const NBR_PLATFORMS = 6;
let doodle_from_left = 50
let doodle_from_bottom = 100
let plateform_from_left = 50
let rand_x = Math.round(Math.random() * 280);
let plateforms = []



class Plateform{
    constructor(plateform_bottom){
        this.bottom = plateform_bottom
        this.left = Math.round(Math.random() * 280);
        this.the_div = document.createElement('div')

        const the_div  = this.the_div
        the_div.classList.add('plateform') 
        the_div.style.bottom = this.bottom+"px";
        the_div.style.left = this.left+"px";
        grid.appendChild(the_div)
    }
}




// create doodle
const doodle = document.createElement('div')
doodle.classList.add('doodle')
grid.appendChild(doodle)



window.setInterval(()=>{
    drop_platforms()
}, 20)

updateDoodlerPosition(doodle_from_left, doodle_from_bottom)


window.addEventListener('keydown', (e)=>{
    switch(e.key){
        case "ArrowLeft":
            if(doodle_from_left >20){
                doodle_from_left -= 5 
            }
            break;
        case "ArrowRight":
            if(doodle_from_left < 300){
                doodle_from_left+=5;
            }
            break;
        default:
            ;
    }
    updateDoodlerPosition()
})

function updateDoodlerPosition(){
    doodle.style.left = doodle_from_left+"px"
    doodle.style.bottom = doodle_from_bottom+"px"
}

function create_platforms(){
    const PLATFORMS_VERTICAL_INTERVAL = 600/NBR_PLATFORMS
    for(let i=1; i<=NBR_PLATFORMS; i++){
        plateforms.push(new Plateform(i*PLATFORMS_VERTICAL_INTERVAL ))
    }
}


create_platforms()


function drop_platforms(){
    plateforms.forEach(platform=>{
        platform.bottom -= 5
        let the_div = platform.the_div
        the_div.style.bottom = platform.bottom+"px"
        if(platform.bottom < 0){
            plateforms[0].the_div.classList.remove("plateform")
            plateforms.shift()
            plateforms.push(new Plateform(708))
        }
    })
}

