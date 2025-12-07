let board = document.querySelector(".board")
let blocksWidth = 30;
let blocksHeight = 30;
let cols = Math.floor(board.clientWidth /blocksWidth)
let rows = Math.floor(board.clientHeight / blocksHeight)
let restarts = document.querySelector("#restart")
let blocks = []
let direction = "left"
let interval = null
let snake = [{x:1 ,y:3},]
let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
let start = document.querySelector("#starts")
let modal = document.querySelector(".modal")
let gameover = document.querySelector(".game-over")
let stratgame = document.querySelector(".start-game")
let scoreElem = document.querySelector("#score")
let highscoreElem = document.querySelector("#highScore")
let timerElem = document.querySelector("#timer")
let score = 0 ; 
let highscore = 0;
let timer = "00-00" ;
let intervalId = null;
let mainhighscore = localStorage.getItem("highscore") || 0
highscoreElem.innerText = mainhighscore
    for(let row = 0 ; row<rows ; row++){
        for(let col = 0 ; col<cols ;col++){
    let block = document.createElement("div")
    block.classList.add("block")
    board.appendChild(block)
    blocks[`${row} - ${col}`] = block
         }
    }
function render(){

let head = null ; 
    blocks[`${food.x} - ${food.y}`].classList.add("read")

if(direction === "left"){
head = {x : snake[0].x , y:snake[0].y-1}

}
else if(direction === "right"){
head = {x : snake[0].x , y:snake[0].y+1}
}
else if(direction === "bottom"){
head = {x : snake[0].x+1 , y:snake[0].y}

}
else if(direction === "top"){
head = {x : snake[0].x-1 , y:snake[0].y}

}
    if(head.x<0 || head.y<0 || head.x>=rows || head.y>=cols){
clearInterval(interval)    
gameover.style.display = "flex"
modal.style.display = "flex"
stratgame.style.display = "none"
}

if(head.x == food.x && head.y == food.y){
    blocks[`${food.x} - ${food.y}`].classList.remove("read")
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
    snake.unshift(head)
    score +=10
    scoreElem.innerText = score
    if(score>highscore){
        highscore = score
        localStorage.setItem("highscore" , highscore.toString())
    }
    
}




       snake.forEach(function(segment){
    blocks[`${segment.x} - ${segment.y}`].classList.remove("fill")


    })

snake.unshift(head)
snake.pop()


        snake.forEach(function(segment){
    blocks[`${segment.x} - ${segment.y}`].classList.add("fill")




    })
}
     start.addEventListener("click",function(){
    modal.style.display = "none";
    intervalId = setInterval(function(){
   let [min ,sec] = timer.split("-").map(Number)
   if(sec == 59){
    min+=1;
    sec = 0
    clearInterval(intervalId)

  
   }
   else{
    sec += 1;
    

   }
  timer = `${min} - ${sec}`
  timerElem.innerText = timer
},1000)
     interval = setInterval(function(){

render()


    },400)

 })

 restarts.addEventListener("click",restart)

    

    function restart(sec){
     score = 0;
     sec+=1;
     scoreElem.innerText = score
    modal.style.display = "none"
    blocks[`${food.x} - ${food.y}`].classList.remove("read") 
    snake = [{x:1 ,y:3},]
    food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
       interval = setInterval(function(){
        render()
    },400)

}


    addEventListener("keydown" ,function(e){
       if(e.code==="ArrowUp"){
        direction = "top"
       }
       else if(e.code==="ArrowDown"){
        direction = "bottom"

       }
       else if(e.code==="ArrowLeft"){
        direction = "left"

       }
       else if(e.code==="ArrowRight"){
        direction = "right"

       }
    })
