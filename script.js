let foodSound = new Audio('sound/eat.mp3')
let musicSound = new Audio('sound/music.mp3')
let turnSound = new Audio('sound/turn.wav')
let gameOverSound = new Audio('sound/gameover.wav')
let speed = 200
let lastPainTime = 0
let inputDir ={x:0 ,y:0}
let foodArr = {x:5,y:10}
let snakeArr = [{x:13,y:14}]
let score = 0
let highScore = 0
let backgroundMusic = true

let storageHigeScore = JSON.parse(localStorage.getItem('SnackHighScore'))
if(storageHigeScore!==null){
    highScore = storageHigeScore
}
// ====================================================================
function isColide(){
    //snake  bump in yourself
    for(let i = 1; i<snakeArr.length; i++){ if(snakeArr[i].x==snakeArr[0].x && snakeArr[i].y==snakeArr[0].y){return true;}}
    //snake colide on wall
    if(snakeArr[0].x<0 || snakeArr[0].x>20 || snakeArr[0].y<0 || snakeArr[0].y>20){return true}
}
// ====================================================================
let board = document.getElementById("container")
let Score = document.getElementById("Score")
let HighScore = document.getElementById("HighScore")
let body = document.querySelector("body")
let music = document.getElementById("music")
let musicIcon = document.querySelector("#music i")
// background music on/off
music.addEventListener('click',()=>{
    backgroundMusic = !backgroundMusic
    if(backgroundMusic){
        musicIcon.classList.remove('fa-volume-xmark')
        musicIcon.classList.add('fa-volume-high')
    }else{
        musicIcon.classList.remove('fa-volume-high')
        musicIcon.classList.add('fa-volume-xmark')
    }
})
//speed mode display/hide
let speedMode = document.getElementById("SpeedMode")
let speeddiv = document.querySelector("#SpeedMode div")
speedMode.addEventListener('click',()=>{
    speeddiv.classList.toggle('d-none') 
})
function gameEngine(){

    // set snack speed
    let radio = document.querySelector('input[type="radio"]:checked')

    if(radio.value=='slow'){
        speed=250
    }else if(radio.value=='normal'){
        speed = 200
    }else if(radio.value=='fast'){
        speed=100
    }else if(radio.value=='faster'){
        speed=50
    }


    //background music play
    if(inputDir.x!=0 || inputDir.y!=0){
        speeddiv.classList.add('d-none')
        if(backgroundMusic){
            musicSound.play()
        }else{
            musicSound.pause()
        }
    }

    //if snake colide
    if(isColide()){
        musicSound.pause()
        gameOverSound.play()
        inputDir={x:0,y:0}
        snakeArr=[{x:13,y:14}]
        score = 0
        localStorage.setItem('SnackHighScore',JSON.stringify(highScore))

    }
    
    // update snake arr after eaten food and aslo food arr 
    if(snakeArr[0].x==foodArr.x && snakeArr[0].y==foodArr.y){
        foodSound.play()
        snakeArr.unshift({x:snakeArr[0].x,y:snakeArr[0].y})
        foodArr.x=Math.floor(Math.random()*10+Math.random()*10)
        foodArr.y=Math.floor(Math.random()*10+Math.random()*10)
        if(score>=highScore){
            highScore=highScore+1
        }
        score=score+1
    }
    // moving snake element
    for(let i=snakeArr.length -1; i>0; i--){
        snakeArr[i]={...snakeArr[i-1]}
    }
    snakeArr[0].x = snakeArr[0].x + inputDir.x
    snakeArr[0].y = snakeArr[0].y + inputDir.y
    // create snake element
    board.innerHTML = ""
    Score.innerHTML = "Score: "+score
    HighScore.innerHTML = "HighScore: "+highScore
    snakeArr.forEach((e,i)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRow = e.y;
        snakeElement.style.gridColumn = e.x
        if(i==0){
            snakeElement.classList.add('snakehead')
        }else{
            snakeElement.classList.add('snakebody')
        }
        board.appendChild(snakeElement)

    })
    // create snake food element
    foodElement = document.createElement('div')
    foodElement.style.gridRow = foodArr.y;
    foodElement.style.gridColumn = foodArr.x
    foodElement.classList.add('snakefood')
    board.appendChild(foodElement)

    
    
}

// ==================================================================
window.addEventListener('keydown',(e)=>{
    switch (e.key) {
        case 'ArrowUp':
            turnSound.play();
            inputDir.x = 0
            inputDir.y = -1
            break;
        case 'ArrowDown':
            turnSound.play();
            inputDir.x = 0
            inputDir.y = 1
            break;
        case 'ArrowLeft':
            turnSound.play();
            inputDir.x = -1
            inputDir.y = 0
            break;
        case 'ArrowRight':
            turnSound.play();
            inputDir.x = 1
            inputDir.y = 0
            break;
        default:
            inputDir.x = 0
            inputDir.y = 0
            break;
    }
})
// ===================================================================
let ArUp = document.getElementById('ArUp')
let ArLeft = document.getElementById('ArLeft')
let ArRight = document.getElementById('ArRight')
let ArDown = document.getElementById('ArDown')
ArUp.addEventListener('click',()=>{
    turnSound.play();
    inputDir.x = 0
    inputDir.y = -1
})
ArDown.addEventListener('click',()=>{
    turnSound.play();
    inputDir.x = 0
    inputDir.y = 1
})
ArLeft.addEventListener('click',()=>{
    turnSound.play();
    inputDir.x = -1
    inputDir.y = 0
})
ArRight.addEventListener('click',()=>{
    turnSound.play();
    inputDir.x = 1
    inputDir.y = 0
})
// ===================================================================
function main(ctime){
    window.requestAnimationFrame(main) 
    if(lastPainTime == Math.ceil(ctime/speed)){
        return;
    }
    lastPainTime=Math.ceil(ctime/speed)
    gameEngine()
    
}
window.requestAnimationFrame(main)