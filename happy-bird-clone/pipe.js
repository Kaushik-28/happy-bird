const HOLE_HEIGHT = 200
const PIPE_WIDTH = 50
let pipes = []
const PIPE_SPEED = .5
const PIPE_INTERVAL = 1500
let timeSinceLastPipe=0
let passedPipeCount

export function setUpPipes(){
    document.documentElement.style.setProperty("--pipe-width",PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height",HOLE_HEIGHT)
    timeSinceLastPipe=0
    passedPipeCount=0
    
    pipes.forEach(pipe => pipe.remove())
}

export function updatePipes(delta){
   if(timeSinceLastPipe > PIPE_INTERVAL){
         createPipe()
         timeSinceLastPipe = 0
   }else{
         timeSinceLastPipe += delta
   }

    pipes.forEach(pipe =>{
        if (pipe.left + PIPE_WIDTH < 0 ){
            passedPipeCount ++
            return pipe.remove()
        }
        pipe.left = pipe.left - delta * PIPE_SPEED
    })
}

export function getPassedPipeCount(){
    return passedPipeCount
}

export function getPipeRects(){
    return pipes.flatMap(pipe => pipe.rects())
}

export function createPipe(){
    const pipeElem = document.createElement("div")
    pipeElem.classList.add("pipe")
    const top = createPipeSegment("top");
    const bottom = createPipeSegment("bottom")
    pipeElem.appendChild(top)
    pipeElem.appendChild(bottom)
    pipeElem.style.setProperty("--hole-top",generateRandom(window.innerHeight - HOLE_HEIGHT, HOLE_HEIGHT * 1.5))
    pipeElem.style.setProperty("--hole-height",HOLE_HEIGHT)
    // pipeElem.style.setProperty("--pipe-left",window.innerWidth - PIPE_WIDTH)
    pipeElem.style.setProperty("--pipe-width",PIPE_WIDTH)

    const pipe = {
        get left(){
            return parseFloat(getComputedStyle(pipeElem).getPropertyValue("--pipe-left"))
        },

        set left(value) {
            pipeElem.style.setProperty("--pipe-left",value)
        },

        remove(){
            // console.log("remove")
            pipes = pipes.filter(p => p != pipe)
            pipeElem.remove();
        },
        rects(){
            return [
                top.getBoundingClientRect(),
                bottom.getBoundingClientRect()
            ]
        }

    }
    pipe.left = window.innerWidth
    document.body.append(pipeElem)
    pipes.push(pipe)
}

function generateRandom(max,min){
    return Math.floor(Math.random()*(max -min + 1) + min)
}

function createPipeSegment(position){
    const segment = document.createElement("div")
    segment.classList.add("segment",position)
    return segment
}