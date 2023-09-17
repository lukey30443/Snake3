const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

// Adjust the game speed to 10 seconds (10000 milliseconds)
const gameSpeed = 10000;
const snakeSpeed = 1; // Move 1 grid unit per 10 seconds
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

    // Move the snake only when 10 seconds have passed
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
    const maxX = canvas.width / gridSize;
    const maxY = canvas.height / gridSize;

    food = {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
}

function collisionDetection() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width / gridSize ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height / gridSize
    ) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    alert("Game Over! Your score: " + score);
    document.location.reload();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawSnake();
    drawFood();
    collisionDetection();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (dy === 0) {
                dx = 0;
                dy = -1;
            }
            break;
        case "ArrowDown":
            if (dy === 0) {
                dx = 0;
                dy = 1;
            }
            break;
        case "ArrowLeft":
            if (dx === 0) {
                dx = -1;
                dy = 0;
            }
            break;
        case "ArrowRight":
            if (dx === 0) {
                dx = 1;
                dy = 0;
            }
            break;
    }
});

generateFood();
const gameInterval = setInterval(gameLoop, 1000); // Start the game loop with a 1-second interval