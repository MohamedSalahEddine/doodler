const grid = document.querySelector('.grid')
const NBR_PLATFORMS = 10;
let doodle_from_left
let doodle_from_bottom = 200
let starting_point_y = doodle_from_bottom
let plateform_from_left = 50
let plateforms = []
let is_jumping  = false
let is_game_over = false
let is_going_left  = false
let is_going_right = false
let score = 0
let doodle
let drop_doodler_timer_id
let jump_doodler_timer_id
let going_left_doodler_timer_id
let going_right_doodler_timer_id



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


function create_doodler(){
    doodle = document.createElement('div')
    doodle.classList.add('doodle')
    doodle.style.left = `${doodle_from_left}px`
    doodle.style.bottom = `${doodle_from_bottom}px`
    grid.appendChild(doodle)
}


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
        case "ArrowUp":
            jump()
            break;
        
    }
})




function create_platforms(){
    const PLATFORMS_VERTICAL_INTERVAL = 600/NBR_PLATFORMS
    // for(let i=1; i<=NBR_PLATFORMS; i++){
    //     plateforms.push(new Plateform(i*PLATFORMS_VERTICAL_INTERVAL ))
    // }
    //     
    plateforms.push(new Plateform(100 ))
    plateforms.push(new Plateform(500 ))
    doodle_from_left = plateforms[0].left + 25
    doodle_from_bottom = plateforms[0].bottom +30
}


function drop_platforms(){
    plateforms.forEach(platform=>{
        platform.bottom -= 5
        let the_div = platform.the_div
        the_div.style.bottom = platform.bottom+"px"
        if(platform.bottom < 0){
            plateforms[0].the_div.classList.remove("plateform")
            plateforms.shift()
            plateforms.push(new Plateform(600))
        }
    })
}

function jump(){
    clearInterval(drop_doodler_timer_id)
    is_jumping = true
    jump_doodler_timer_id = setInterval(() => {
        doodle_from_bottom += 3
        doodle.style.bottom = doodle_from_bottom +"px"
        if(doodle_from_bottom > starting_point_y +40){
            clearInterval(jump_doodler_timer_id)
            drop_doodler()
        }
    }, 5);
}

function drop_doodler(){
    clearInterval(jump_doodler_timer_id)
    drop_doodler_timer_id = setInterval(()=>{
        if(!is_game_over ){
            doodle_from_bottom -= 3
            doodle.style.bottom = doodle_from_bottom+"px"
            if(doodle_from_bottom < 0){
                clearInterval(drop_doodler_timer_id)
            }
            for(let plateform of plateforms){
                if(plateform.bottom+30 == doodle_from_bottom){
                    
                    clearInterval(drop_doodler_timer_id)
                    jump()
                }
            }
        }
    }, 5)
}



function start_game(){
    create_platforms()
    create_doodler();
    // drop_doodler()
    // jump()
}

start_game()