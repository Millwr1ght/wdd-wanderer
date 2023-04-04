import Keyboard from "./Keyboard.mjs";

export default class Game {
    //constructor(){}

    //methods
    init(){
        const keyboard = new Keyboard();
        keyboard.listenForEvent([keyboard.UP, keyboard.DOWN, keyboard.LEFT, keyboard.RIGHT]);

    }

    /* auxilliary */
    run(context) {
        //game start!
        this.ctx = context; //get game window
        this._previousElasped = 0; //starting tick

    }
    tick(elapsed){
        //run the following on next tick (thus every tick)
        window.requestAnimationFrame(this.tick);

        //clearDisplay
        this.ctx.clearRect

        //compute and return tickspeed (in ms)
        var delta = (elapsed - this._previousElasped) / 1000.0;
        this._previousElasped = elapsed;
        delta = Math.min(delta, 0.25) //tickspeed no slower than 250ms

        this.update(delta);
        this.draw();
    }

    /* main */
    preload(){
        //before game starts
    }

    create(){
        //when game starts
    }
    
    update(delta){
        //logic stuff that changes each tick (or so)
    }

    draw(){
        //visual stuff that changes
    }
   
}