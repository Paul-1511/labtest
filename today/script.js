const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawFlower(x, y) {
    // Randomly select a flower type
    const flowerTypes = ["circle", "star", "tulip", "daisy", "sunflower"];
    const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    
    // Basic flower parameters - increased size ranges
    const petals = Math.floor(Math.random() * 5) + 5;
    const radius = Math.random() * 25 + 20; // Increased from 15+10 to 25+20
    const colors = ["yellow", "gold", "pantone"];
    const petalColor = colors[Math.floor(Math.random() * colors.length)];
    const centerColor = "gold";
    
    switch(flowerType) {
        case "circle":
            drawCircleFlower(x, y, petals, radius, petalColor, centerColor);
            break;
        case "star":
            drawStarFlower(x, y, petals, radius, petalColor, centerColor);
            break;
        case "tulip":
            drawTulipFlower(x, y, radius, petalColor);
            break;
        case "daisy":
            drawDaisyFlower(x, y, petals, radius, petalColor, centerColor);
            break;
        case "sunflower":
            drawSunflowerFlower(x, y, petals, radius, petalColor, centerColor);
            break;
    }
}

// Your original flower design - now bigger
function drawCircleFlower(x, y, petals, radius, petalColor, centerColor) {
    for (let i = 0; i < petals; i++) {
        let angle = (i * 2 * Math.PI) / petals;
        let px = x + Math.cos(angle) * radius;
        let py = y + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(px, py, radius / 2, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();
}

// Star-shaped flower with pointed petals
function drawStarFlower(x, y, petals, radius, petalColor, centerColor) {
    ctx.beginPath();
    for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        const innerRadius = radius / 3;
        
        // Outer point
        let outerX = x + Math.cos(angle) * radius * 1.2; // Made slightly bigger
        let outerY = y + Math.sin(angle) * radius * 1.2;
        
        // Inner point (between petals)
        let innerAngle = angle + Math.PI / petals;
        let innerX = x + Math.cos(innerAngle) * innerRadius;
        let innerY = y + Math.sin(innerAngle) * innerRadius;
        
        if (i === 0) {
            ctx.moveTo(outerX, outerY);
        } else {
            ctx.lineTo(outerX, outerY);
        }
        
        ctx.lineTo(innerX, innerY);
    }
    
    ctx.closePath();
    ctx.fillStyle = petalColor;
    ctx.fill();
    
    // Center
    ctx.beginPath();
    ctx.arc(x, y, radius / 4, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();
}

// Simple tulip-like flower - now bigger
function drawTulipFlower(x, y, radius, petalColor) {
    // Draw stem
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + radius * 3);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3; // Thicker stem
    ctx.stroke();
    
    // Draw flower petals - increased size
    ctx.beginPath();
    ctx.moveTo(x, y - radius * 0.3); // Moved starting point up a bit
    ctx.bezierCurveTo(
        x - radius * 1.2, y + radius / 2, // Wider curve
        x - radius * 1.2, y + radius * 2,
        x, y + radius
    );
    ctx.bezierCurveTo(
        x + radius * 1.2, y + radius * 2, // Wider curve
        x + radius * 1.2, y + radius / 2,
        x, y - radius * 0.3 // Matched starting point
    );
    ctx.fillStyle = petalColor;
    ctx.fill();
}

// Daisy-like flower with thin petals - now bigger
function drawDaisyFlower(x, y, petals, radius, petalColor, centerColor) {
    radius = radius * 1.3; // Increase overall size
    
    for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        
        ctx.beginPath();
        ctx.ellipse(
            x, y, 
            radius, radius / 5, 
            angle, 
            0, Math.PI * 2
        );
        ctx.fillStyle = petalColor;
        ctx.fill();
    }
    
    // Center
    ctx.beginPath();
    ctx.arc(x, y, radius / 3, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();
}

// Sunflower with distinct petals - now bigger
function drawSunflowerFlower(x, y, petals, radius, petalColor, centerColor) {
    radius = radius * 1.2; // Increase overall size
    
    // Draw petals
    for (let i = 0; i < petals; i++) {
        const angle = (i * 2 * Math.PI) / petals;
        const petalLength = radius * 1.5; // Longer petals
        const petalWidth = radius / 3;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Draw petal
        ctx.beginPath();
        ctx.ellipse(petalLength / 2, 0, petalLength / 2, petalWidth, 0, 0, Math.PI * 2);
        ctx.fillStyle = petalColor;
        ctx.fill();
        
        ctx.restore();
    }
    
    // Draw center with pattern
    ctx.beginPath();
    ctx.arc(x, y, radius / 2, 0, Math.PI * 2);
    ctx.fillStyle = "brown";
    ctx.fill();
    
    // Draw seed pattern
    const seedRadius = radius / 12;
    const seedCount = 25; // More seeds
    const spirals = 5;
    
    for (let i = 0; i < seedCount; i++) {
        const seedAngle = i * (Math.PI * 2 * spirals / seedCount);
        const seedDistance = (radius / 2) * Math.sqrt(i / seedCount);
        const seedX = x + Math.cos(seedAngle) * seedDistance;
        const seedY = y + Math.sin(seedAngle) * seedDistance;
        
        ctx.beginPath();
        ctx.arc(seedX, seedY, seedRadius, 0, Math.PI * 2);
        ctx.fillStyle = centerColor;
        ctx.fill();
    }
}

canvas.addEventListener("click", (event) => {
    drawFlower(event.clientX, event.clientY);
});

// Optional: Add mousemove for drawing while dragging
let isDrawing = false;
canvas.addEventListener("mousedown", () => {
    isDrawing = true;
});

canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        drawFlower(event.clientX, event.clientY);
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});