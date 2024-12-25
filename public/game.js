// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up the grid size and block size
const gridSize = 7;
const blockSize = canvas.width / gridSize;

// Initialize block position
let blockPosition = { x: 3, y: 3 }; // Start at the center of the grid
let targetPosition = { ...blockPosition }; // Target position for smooth movement

// Animation speed
const animationSpeed = 5; // Pixels per frame
let animationFrame;
let arrowButtons = null;

// Function to draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#cccccc';

    for (let i = 0; i <= gridSize; i++) {
        // Draw vertical lines
        ctx.beginPath();
        ctx.moveTo(i * blockSize, 0);
        ctx.lineTo(i * blockSize, canvas.height);
        ctx.stroke();

        // Draw horizontal lines
        ctx.beginPath();
        ctx.moveTo(0, i * blockSize);
        ctx.lineTo(canvas.width, i * blockSize);
        ctx.stroke();
    }
}

// Function to draw the block
function drawBlock(position) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(
        position.x * blockSize,
        position.y * blockSize,
        blockSize,
        blockSize
    );
}

// Function to smoothly move the block
function smoothMove() {
    const currentX = blockPosition.x * blockSize;
    const currentY = blockPosition.y * blockSize;
    const targetX = targetPosition.x * blockSize;
    const targetY = targetPosition.y * blockSize;

    const deltaX = targetX - currentX;
    const deltaY = targetY - currentY;

    if (Math.abs(deltaX) < animationSpeed && Math.abs(deltaY) < animationSpeed) {
        blockPosition = { ...targetPosition };
        animationFrame = null; // Reset animationFrame to allow further movement
        drawGrid();
        drawBlock(blockPosition);
        showArrowButtons(blockPosition);
        return;
    }

    const moveX = Math.sign(deltaX) * Math.min(animationSpeed, Math.abs(deltaX));
    const moveY = Math.sign(deltaY) * Math.min(animationSpeed, Math.abs(deltaY));

    blockPosition = {
        x: blockPosition.x + moveX / blockSize,
        y: blockPosition.y + moveY / blockSize
    };

    drawGrid();
    drawBlock(blockPosition);
    animationFrame = requestAnimationFrame(smoothMove);
}

// Function to handle block click
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const clickedBlockX = Math.floor(clickX / blockSize);
    const clickedBlockY = Math.floor(clickY / blockSize);

    if (clickedBlockX === blockPosition.x && clickedBlockY === blockPosition.y) {
        showArrowButtons(blockPosition);
    } else {
        hideArrowButtons();
    }
});

// Function to show arrow buttons
function showArrowButtons(position) {
    if (!arrowButtons) {
        arrowButtons = {};

        // Create up button
        arrowButtons.up = createArrowButton('▲', position.x, position.y - 1, 'ArrowUp');
        // Create down button
        arrowButtons.down = createArrowButton('▼', position.x, position.y + 1, 'ArrowDown');
        // Create left button
        arrowButtons.left = createArrowButton('◀', position.x - 1, position.y, 'ArrowLeft');
        // Create right button
        arrowButtons.right = createArrowButton('▶', position.x + 1, position.y, 'ArrowRight');
    }
}

// Function to hide arrow buttons
function hideArrowButtons() {
    if (arrowButtons) {
        Object.values(arrowButtons).forEach((button) => {
            document.body.removeChild(button);
        });
        arrowButtons = null;
    }
}

// Function to create an arrow button
function createArrowButton(symbol, gridX, gridY, direction) {
    if (gridX < 0 || gridY < 0 || gridX >= gridSize || gridY >= gridSize) return null;

    const button = document.createElement('button');
    button.textContent = symbol;
    button.style.position = 'absolute';
    button.style.left = `${gridX * blockSize + canvas.offsetLeft + blockSize / 4}px`;
    button.style.top = `${gridY * blockSize + canvas.offsetTop + blockSize / 4}px`;
    button.style.width = `${blockSize / 2}px`;
    button.style.height = `${blockSize / 2}px`;
    button.style.zIndex = '10';

    button.addEventListener('click', () => {
        moveBlock(direction);
        hideArrowButtons();
    });

    document.body.appendChild(button);
    return button;
}

// Function to handle key press and set target position
function moveBlock(direction) {
    if (animationFrame) return; // Prevent multiple movements during animation

    switch (direction) {
        case 'ArrowUp':
            if (targetPosition.y > 0) targetPosition.y--;
            break;
        case 'ArrowDown':
            if (targetPosition.y < gridSize - 1) targetPosition.y++;
            break;
        case 'ArrowLeft':
            if (targetPosition.x > 0) targetPosition.x--;
            break;
        case 'ArrowRight':
            if (targetPosition.x < gridSize - 1) targetPosition.x++;
            break;
    }
    animationFrame = requestAnimationFrame(smoothMove);
}

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    moveBlock(event.key);
});

// Initial drawing of the grid and block
drawGrid();
drawBlock(blockPosition);
