
const canvas = document.getElementById('snakeGame');
const startButton = document.getElementById('startButton');
const ctx = canvas.getContext('2d');
const box = 35; 
const gridSize = 17; 
const canvasSize = gridSize * box;
canvas.width = canvasSize;
canvas.height = canvasSize;

canvas.style.position = 'absolute';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
canvas.style.border = '3px solid rgba(255, 0, 0, 0.5)'; 

let snake = [{ x: 8 * box, y: 8 * box }]; 
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * gridSize) * box,
    y: Math.floor(Math.random() * gridSize) * box
};
let speed = 200; 
let score = 0;
let game;

const snakeHeadImage = new Image();
snakeHeadImage.src = 'poze/sarpe.png';

const foodImages = [
  'poze/ron.png',
  'poze/harry.png',
  'poze/ginny.png',
  'poze/lockhart.png',
  'poze/pasare.png',
  'poze/doamnaprofesoara.png',
  
  
];
let currentFoodImage = new Image();
currentFoodImage.src = foodImages[Math.floor(Math.random() * foodImages.length)];

let bodyImages = [];

function getRandomFoodImage() {
    return foodImages[Math.floor(Math.random() * foodImages.length)];
}

window.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.keyCode;

    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (key === 38 && direction !== 'DOWN') direction = 'UP';
    else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
            ctx.drawImage(snakeHeadImage, snake[i].x, snake[i].y, box, box);
        } else {
            const bodyImage = bodyImages[i - 1] || currentFoodImage; 
            ctx.drawImage(bodyImage, snake[i].x, snake[i].y, box, box);
        }
    }

    ctx.drawImage(currentFoodImage, food.x, food.y, box, box);

    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX < 0 || snakeY < 0 || snakeX > canvasSize || snakeY > canvasSize || collision(snakeX, snakeY, snake)) {
        clearInterval(game);
        alert('Game Over! Scorul tău: ' + score);
        location.reload();
    }

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        speed = Math.max(100, speed -5); 
        clearInterval(game);
        game = setInterval(draw, speed);

        bodyImages.push(currentFoodImage);

        food = {
            x: Math.floor(Math.random() * gridSize) * box,
            y: Math.floor(Math.random() * gridSize) * box
        };
        currentFoodImage = new Image();
        currentFoodImage.src = getRandomFoodImage();
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);
}

function collision(headX, headY, snake) {
    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            return true;
        }
    }
    return false;
}

startButton.addEventListener('click', function () {
    if (game) clearInterval(game); 
    snake = [{ x: 8 * box, y: 8 * box }]; 
    direction = 'RIGHT'; 
    speed = 260; 
    bodyImages = []; 
    food = {
        x: Math.floor(Math.random() * gridSize) * box,
        y: Math.floor(Math.random() * gridSize) * box
    };
    currentFoodImage.src = getRandomFoodImage();
    score = 0; 
    game = setInterval(draw, speed);
});
