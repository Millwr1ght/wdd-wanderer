import { qs } from "./utils.mjs"

export function draw(selector) {
    const canvas = qs(selector);

    if(canvas.getContext) {
        const ctx = canvas.getContext("2d");
        
        //set variables

        //clear the board if there is anything there all ready
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        //draw stuff
        
        
        
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

//colorGradient(ctx, canvas.width, canvas.height, 20, 20);
function colorGradient(ctx, ctx_width, ctx_height, section_width, section_height, clear=0) {
    //get number of sections in each direction
    const num_section_width = ctx_width / section_width
    const num_section_height = ctx_height / section_height

    //if clear, clear
    if(clear) {
        ctx.clearRect(0, 0, ctx.width, ctx.height);
    }

    for (let i = 0; i < num_section_height; i++) {
        for (let j = 0; j < num_section_width; j++) {
          ctx.fillStyle = `rgb(${Math.floor(255 - (255 / num_section_height) * i)}, ${Math.floor(
            255 - (255 / num_section_width) * j
          )}, 0)`;
          ctx.fillRect(j * section_width, i * section_height, section_width, section_height);
        }
    }
}