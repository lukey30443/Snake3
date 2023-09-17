const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

const gameSpeed = 10000; // 10 seconds per block
let lastMoveTime = 0;

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
    const currentTime = Date.now();
    
    // Move the snake every 10 seconds
    if (currentTime - lastMoveTime >= gameSpeed) {
        lastMoveTime = currentTime;

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
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
    document.location.reload();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();
    drawSnake();
    drawFood();
    collisionDetection();
    document.getElementById("score").textContent = score;
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
const gameInterval = setInterval(gameLoop, 100); // Update the game every 100 milliseconds
