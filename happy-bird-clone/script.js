import { setUpBird, updateBird,getBirdRect } from "./bird.js"; 
import { setUpPipes, updatePipes, getPassedPipeCount, getPipeRects } from "./pipe.js";

document.addEventListener("keypress", handleStart, { once : true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

function handleStart(){
    // console.log("started")
    setUpBird()
    setUpPipes()
    title.classList.add("hide");
    lastTime = null
    
    window.requestAnimationFrame(updateLoop);
    
}
let lastTime
function updateLoop(time){

    if(lastTime == null){
        lastTime = time
        window.requestAnimationFrame(updateLoop)
        return
    }
     const delta = time -lastTime 
     lastTime = time
    //  console.log(delta)
    updateBird(delta)
    updatePipes(delta)
    if(checkLose()) return handleLose()
    window.requestAnimationFrame(updateLoop);
}

function isCollision(rect1,rect2){
    return (rect1.left < rect2.right
        && rect1.right > rect2.left
        && rect1.bottom > rect2.top
        && rect1.top < rect2.bottom)
}

function checkLose(){
    const birdRect = getBirdRect();   
    const insidePipe= getPipeRects().some(rect => isCollision(birdRect,rect))
    const outsideInnerWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight 
    return outsideInnerWorld || insidePipe
}

function handleLose(){
    setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = getPassedPipeCount()  + " pipes"
    document.addEventListener("keypress", handleStart, { once : true })
    }, 100)
}