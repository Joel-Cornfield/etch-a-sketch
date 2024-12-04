const DEFAULT_COLOUR = '#000000';
const DEFAULT_MODE = 'colour';
const DEFAULT_SIZE = 16;

let currentColour = DEFAULT_COLOUR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById('color-picker');
const gridContainer = document.getElementById('grid-container');
const resizeSlider = document.getElementById('resize');
const sizeDisplay = document.getElementById('size');
const colourButton = document.getElementById('colour-button');
const randomColourButton = document.getElementById('random-colour-button');
const eraserButton = document.getElementById('eraser-button');
const resetButton = document.getElementById('reset-button');

let isMouseDown = false;

// Event listeners for mouse actions
document.body.addEventListener('mousedown', () => (isMouseDown = true));
document.body.addEventListener('mouseup', () => (isMouseDown = false));

// Generate the grid
function generateGrid(size) {
    gridContainer.innerHTML = ''; // Clear existing grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mouseover', changeColour);
        cell.addEventListener('mousedown', changeColour);
        gridContainer.appendChild(cell);
    }
}

// Change the color of a cell
function changeColour(e) {
    if (e.type === 'mouseover' && !isMouseDown) return;

    if (currentMode === 'random') {
        e.target.style.backgroundColor = generateRandomColour();
    } else if (currentMode === 'colour') {
        e.target.style.backgroundColor = currentColour;
    } else {
        e.target.style.backgroundColor = '#ffffff'; // Eraser mode
    }
}

// Generate a random color
function generateRandomColour() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Update the grid size
function updateGridSize(size) {
    currentSize = size;
    sizeDisplay.textContent = `Grid Size: ${size} x ${size}`;
    generateGrid(size);
}

function resetGrid() {
    generateGrid(currentSize);
}

function highlightModeButton(button) {
    // Remove the selected class from all buttons
    colourButton.classList.remove('selected');
    randomColourButton.classList.remove('selected');
    eraserButton.classList.remove('selected');

    // Add the selected class to the clicked button
    button.classList.add('selected');
}

// Update the current color
colorPicker.addEventListener('input', (e) => {
    currentColour = e.target.value;
    currentMode = 'colour';
});

// Mode selection buttons
colourButton.addEventListener('click', () => {
    currentMode = 'colour';
    highlightModeButton(colourButton); // Highlight the Colour Mode button
});

randomColourButton.addEventListener('click', () => {
    currentMode = 'random';
    highlightModeButton(randomColourButton); // Highlight the Random Colours button
});

eraserButton.addEventListener('click', () => {
    currentMode = 'eraser';
    highlightModeButton(eraserButton); // Highlight the Eraser button
});
resetButton.addEventListener('click', resetGrid);

// Resize grid with slider
resizeSlider.addEventListener('input', (e) => {
    const newSize = e.target.value;
    updateGridSize(newSize);
});

// Initialize with default settings
updateGridSize(DEFAULT_SIZE);
