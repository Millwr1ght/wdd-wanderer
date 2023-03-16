import { qs } from "./utils.js"

export function draw(selector) {
    const canvas = qs(selector);

    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
              ctx.fillStyle = `rgb(0, ${Math.floor(255 - 31.875 * i)}, ${Math.floor(
                255 - 31.875 * j
              )})`;
              ctx.fillRect(j * 25, i * 25, 25, 25);
            }
        }
    } else {
        //drawing is unsupported, thus
    }
};


// drawing utilities
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
}