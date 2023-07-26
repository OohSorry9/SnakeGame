const canvas = document.getElementById('canvas')
const scoreElement = document.getElementById('score')
ctx = canvas.getContext('2d')

//Initialzing Controls

const up = document.getElementById('up')
const down = document.getElementById('down')
const left = document.getElementById('left')
const right = document.getElementById('right')

let boxSize = 30

canvas.width = innerWidth - 50
canvas.height = innerHeight - 50

window.addEventListener('resize' , () => {

  canvas.width = innerWidth - 50
  canvas.height = innerHeight - 50

})



//ENVIRONMENT VARIABLES


const moveSpeed = 30
let gameOver = false
let snakeBody = []

let score = 0 
//

class Snake {
  constructor(){
    this.position = {
      x: 50,
      y: 50
    }
    this.width = 30
    this.height = 30
    this.velocity = {
      x: 0,
      y: 0,
    }
  }

  

  draw(){
    ctx.fillStyle = 'green'
    ctx.fillRect(this.position.x, this.position.y, this.width,this.height)
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.draw()
  }

  moveUp() {
    if (!this.isMovingDown) {
      this.velocity.x = 0;
      this.velocity.y = -moveSpeed;
      this.isMovingUp = true;
      this.isMovingDown = false;
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }
  }

  moveDown() {
    if (!this.isMovingUp) {
      this.velocity.x = 0;
      this.velocity.y = moveSpeed;
      this.isMovingUp = false;
      this.isMovingDown = true;
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }
  }

  moveLeft() {
    if (!this.isMovingRight) {
      this.velocity.x = -moveSpeed;
      this.velocity.y = 0;
      this.isMovingUp = false;
      this.isMovingDown = false;
      this.isMovingLeft = true;
      this.isMovingRight = false;
    }
  }

  moveRight() {
    if (!this.isMovingLeft) {
      this.velocity.x = moveSpeed;
      this.velocity.y = 0;
      this.isMovingUp = false;
      this.isMovingDown = false;
      this.isMovingLeft = false;
      this.isMovingRight = true;
    }
  
  
}
}


const snake = new Snake();


class Food {
  constructor(){

    this.position = {
      x: undefined, 
      y: undefined 
    }
    this.width = 30
    this.height = 30

  }

  draw(){
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, this.width,this.height)
  }
}

const food = new Food()


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Game Over Conditions
  if (
    snake.position.x < 0 ||
    snake.position.x >= canvas.width ||
    snake.position.y < 0 ||
    snake.position.y >= canvas.height
  ) {
    gameOver = true;
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snake.position.x === snakeBody[i][0] &&
      snake.position.y === snakeBody[i][1]
    ) {
      gameOver = true;
    }
  }

  if(gameOver){
    score = 0
    tryAgain()
    return
  }

  if (snake.position.x === food.position.x && snake.position.y === food.position.y) {
    snakeBody.push([food.position.x, food.position.y]);
    score++
    scoreElement.innerText = score
    foodPos();
  }

  food.draw();
  snake.update();
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], snake.width, snake.height);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snake.position.x, snake.position.y];
  }
}



// MOVEMENT


// addEventListener('click', () => {
//   snake.width += 30
// })

window.addEventListener('keyup', (key) => {



  switch (key.keyCode) {
    case 87:
      // UP
      snake.moveUp()
      break;
    case 65:
    snake.moveLeft()
      
      break;
    case 83:
      snake.moveDown()
  
      break;
    case 68:
      // RIGHT
      snake.moveRight()
      break;
  }
});


function foodPos() {
  x = Math.floor(Math.random () * canvas.width / boxSize) * boxSize -100
  y = Math.floor(Math.random () * canvas.height / boxSize) * boxSize -100
  // console.log(x,y)

  
  if(x < 700 && x> 0 && y > 0 && y < 700){
  food.position.x = x;
  food.position.y = y
  }
  else{
    foodPos()
   }

   for (let i = 0; i < snakeBody.length; i++) {
    if (x == snakeBody[i][0] && y == snakeBody[i][1]){
       foodPos()
     }
   
    }
}

function tryAgain(){
  ctx.clearRect(0,0, canvas.width, canvas.height)
  ctx.fillStyle = "RED"
  ctx.font = '60px Arial'
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER", canvas.width/ 2, canvas.height /2, 300);


  ctx.fillStyle = 'white'
  ctx.font = "20px Sans-serif"
  ctx.textAlign = "center"
  ctx.fillText('Refresh the page or click anywhere to Play again.', canvas.width/2, canvas.height /2 + 100, 300)

  window.addEventListener('click', () => {
    location.reload()
  })
}

window.onload = foodPos()


setInterval(animate, 1000/10)


up.addEventListener('click', () => {
  snake.moveUp()
})

down.addEventListener('click', () => {

  snake.moveDown()
})

left.addEventListener('click', () => {
  snake.moveLeft()
})

right.addEventListener('click', () => {
  snake.moveRight()
})