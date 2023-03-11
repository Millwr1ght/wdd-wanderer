import { qs } from "./utils.js"

export function draw(selector) {
    const canvas = qs(selector);

    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.fillRect(25, 25, 100, 100);
        ctx.clearRect(45, 45, 60, 60);
        ctx.strokeRect(50, 50, 50, 50);
    } else {
        //drawing is unsupported, thus
    }
};