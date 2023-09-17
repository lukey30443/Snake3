const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

// Adjust the game speed to 1 second (1000 milliseconds)
const gameSpeed = 1000;
const gameInterval = setInterval(gameLoop, gameSpeed);

// Adjust the snake's speed by changing the grid units moved per interval
const snakeSpeed = 1; // Move 1 grid unit per second
let framesSinceLastMove = 0;

function drawSnake() {
    ctx.fillStyle = "#00f";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function moveSnake() {
    framesSinceLastMove++;

    // Move the snake only when the appropriate number of frames have passed
    if (framesSinceLastMove >= (gameSpeed / 1000) * snakeSpeed) {
        framesSinceLastMove = 0;
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            generateFood();
        } else {
            snake.pop();
        }
    }
}

function generateFood() {
    const maxX =
