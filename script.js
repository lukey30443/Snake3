const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

const moveInterval = 2000; // 2 seconds per block
let lastMoveTime = 0;

function drawSnake() {
    ctx.fillStyle = "#00f";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize
