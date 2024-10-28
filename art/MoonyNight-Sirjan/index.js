/*
@title: MoonyNight
@author: Sirjan
@snapshot: Moonie.png
*/

// Set up canvas dimensions
const width = 3000;
const height = 2000;

setDocDimensions(width, height);

const finalLines = []; // All lines will be stored here

// Function to add a line defined by its endpoints
function addLine(x1, y1, x2, y2) {
  // Flip y-coordinates to adjust for upside-down drawing
  finalLines.push([[x1, height - y1], [x2, height - y2]]);
}

/* Full Moon with Detailed Shadow and Craters */
const moonCenterX = width * 0.8;
const moonCenterY = height * 0.2;
const moonRadius = 150;

// Draw the illuminated part of the moon
for (let i = -90; i <= 90; i++) {
  const angle1 = (i * Math.PI) / 180;
  const angle2 = ((i + 1) * Math.PI) / 180;
  const x1 = moonCenterX + moonRadius * Math.cos(angle1);
  const y1 = moonCenterY + moonRadius * Math.sin(angle1);
  const x2 = moonCenterX + moonRadius * Math.cos(angle2);
  const y2 = moonCenterY + moonRadius * Math.sin(angle2);
  addLine(x1, y1, x2, y2);
}

// Draw the shadowed part of the moon with lines closer together
for (let i = 91; i <= 269; i++) {
  const angle1 = (i * Math.PI) / 180;
  const angle2 = ((i + 1) * Math.PI) / 180;
  const x1 = moonCenterX + moonRadius * Math.cos(angle1);
  const y1 = moonCenterY + moonRadius * Math.sin(angle1);
  const x2 = moonCenterX + moonRadius * Math.cos(angle2);
  const y2 = moonCenterY + moonRadius * Math.sin(angle2);
  for (let offset = 0; offset < 5; offset++) {
    const xOffset = offset * 0.2;
    addLine(x1 + xOffset, y1, x2 + xOffset, y2);
  }
}

// Draw craters on the moon
function drawOutlinedCircle(x, y, radius) {
  const angleIncrement = 5;
  for (let i = 0; i < 360; i += angleIncrement) {
    const angle1 = (i * Math.PI) / 180;
    const angle2 = ((i + angleIncrement) * Math.PI) / 180;
    const x1 = x + radius * Math.cos(angle1);
    const y1 = y + radius * Math.sin(angle1);
    const x2 = x + radius * Math.cos(angle2);
    const y2 = y + radius * Math.sin(angle2);
    addLine(x1, y1, x2, y2);
  }
}

// Draw craters
drawOutlinedCircle(moonCenterX - 40, moonCenterY - 20, 30);
drawOutlinedCircle(moonCenterX + 30, moonCenterY + 10, 20);
drawOutlinedCircle(moonCenterX - 70, moonCenterY + 50, 15);
drawOutlinedCircle(moonCenterX + 40, moonCenterY - 50, 25);
drawOutlinedCircle(moonCenterX + 10, moonCenterY + 60, 10);
drawOutlinedCircle(moonCenterX - 20, moonCenterY + 70, 8);
drawOutlinedCircle(moonCenterX + 60, moonCenterY - 10, 12);
drawOutlinedCircle(moonCenterX - 10, moonCenterY - 50, 12);
drawOutlinedCircle(moonCenterX + 55, moonCenterY + 30, 5);
drawOutlinedCircle(moonCenterX - 50, moonCenterY - 30, 7);
drawOutlinedCircle(moonCenterX + 20, moonCenterY - 40, 6);
drawOutlinedCircle(moonCenterX - 30, moonCenterY + 35, 4);

/* Stars - small lines across the upper sky area */
function distanceFromMoonCenter(x, y) {
  return Math.sqrt(Math.pow(x - moonCenterX, 2) + Math.pow(y - moonCenterY, 2));
}

for (let i = 0; i < 200; i++) {
  let x, y;
  do {
    x = Math.random() * width;
    y = Math.random() * height * 0.3;
  } while (distanceFromMoonCenter(x, y) < moonRadius);
  const length = Math.random() * 2 + 1;
  addLine(x, y, x + length, y + length);
}

/* Background Mountains - low amplitude, soft wave */
for (let i = 0; i < width; i += 5) {
  const x1 = i;
  const y1 = height * 0.65 - 60 * Math.sin(i * 0.002);
  const x2 = i + 5;
  const y2 = height * 0.65 - 60 * Math.sin((i + 5) * 0.002);
  addLine(x1, y1, x2, y2);
}

/* Midground Mountains - higher amplitude, more detail */
for (let i = 0; i < width; i += 5) {
  const x1 = i;
  const y1 = height * 0.75 - 100 * Math.sin(i * 0.003) * Math.cos(i * 0.0005);
  const x2 = i + 5;
  const y2 = height * 0.75 - 100 * Math.sin((i + 5) * 0.003) * Math.cos((i + 5) * 0.0005);
  addLine(x1, y1, x2, y2);
}

/* Foreground Mountains - tallest peaks with wider spacing */
for (let i = 0; i < width; i += 5) {
  const x1 = i;
  const y1 = height * 0.85 - 150 * (Math.sin(i * 0.0015) + 0.5 * Math.sin(i * 0.005) * Math.cos(i * 0.0008));
  const x2 = i + 5;
  const y2 = height * 0.85 - 150 * (Math.sin((i + 5) * 0.0015) + 0.5 * Math.sin((i + 5) * 0.005) * Math.cos((i + 5) * 0.0008));
  addLine(x1, y1, x2, y2);
}

/* Lake Reflection - horizontal wave lines to simulate water ripples */
for (let j = 0; j < 10; j++) {
  const yOffset = height * 0.9 + j * 8;
  for (let i = 0; i < width; i += 5) {
    const x1 = i;
    const y1 = yOffset + 5 * Math.sin(i * 0.02 + j);
    const x2 = i + 5;
    const y2 = yOffset + 5 * Math.sin((i + 5) * 0.02 + j);
    addLine(x1, y1, x2, y2);
  }
}

/* Moon Reflection on Lake */
for (let i = 0; i < 100; i++) {
  const x = moonCenterX + (Math.random() - 0.5) * 100;
  const y1 = height * 0.9 + Math.random() * 100;
  const y2 = y1 + Math.random() * 50;
  addLine(x, y1, x, y2);
}

drawLines(finalLines);
