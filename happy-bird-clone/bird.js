const birdElem = document.querySelector("[data-bird]")
const BIRD_SPEED = .30
let timeSinceLastJump = 1000
const JUMP_DURATION =300

export function setUpBird(){
    setTop(window.innerHeight / 2 )
    document.removeEventListener("keydown",handleJump)
    document.addEventListener("keydown", handleJump)
    console.log("left" + birdElem.getBoundingClientRect().left)
    console.log("reight" + birdElem.getBoundingClientRect().right)
}
export function updateBird(delta){
    if(timeSinceLastJump > JUMP_DURATION){
        // go down
        setTop(getTop() + BIRD_SPEED * delta)
    }else{
        //go up
        setTop(getTop() - BIRD_SPEED * delta) 
    }
    timeSinceLastJump += delta 
    
    // console.log(getTop())
}

function setTop(top){
    birdElem.style.setProperty("--bird-top",top)
}

function getTop(){
    return parseFloat(getComputedStyle(birdElem).
                getPropertyValue("--bird-top"))
}

function handleJump(e){
    if(e.code != "Space") return
    timeSinceLastJump = 0
}

export function getBirdRect(){
    return birdElem.getBoundingClientRect()
}
