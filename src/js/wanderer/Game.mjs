import Keyboard from "./Keyboard.mjs";
import AssetLoader from "./AssetLoader.mjs";
import tileMap from "./TileMap.mjs";
import Player from "./Player.mjs";
import { qs } from "../utils.mjs";

export default class Game {

    //methods
    /* auxilliary */
    run(canvasSelector) {
        //game start!
        const canvas = qs(canvasSelector);
        if(canvas.getContext) {
            this.ctx = canvas.getContext("2d"); //get game window
            this._previousElasped = 0; //starting tick

            var pAssets = this.load();
            Promise.all(pAssets).then(function(loadedAssets) {
                this.init(); //init game
                window.requestAnimationFrame((t) => this.tick(t)); //begin animation
            }.bind(this));
        } else {
            //drawing is unsupported
            console.log("The Canvas API is unsupported.")
        }
    }

    init(){
        //listeners
        this.keyboard = new Keyboard();
        this.keyboard.listenForEvent([this.keyboard.UP, this.keyboard.DOWN, this.keyboard.LEFT, this.keyboard.RIGHT]);
        
        this.tileAtlas = this.Loader.getImage("tiles_large");
        this.mapHandler = new tileMap(8, 6, 100);

        //create game objects
        this.player = new Player(this.mapHandler, 300, 200, this.Loader.getImage("player_large"));
    }

    tick(elapsed){
        //clearDisplay
        this.ctx.clearRect(0, 0, 800, 600);

        //compute and return tickspeed (in ms)
        var delta = (elapsed - this._previousElasped) / 1000.0;
        this._previousElasped = elapsed;
        delta = Math.min(delta, 0.25) //tickspeed no higher than 250ms

        this.update(delta);
        this.draw();

        //run the following on next tick
        window.requestAnimationFrame((t) => this.tick(t));
    }

    /* main */
    load(){
        //before game starts, get assets
        this.Loader = new AssetLoader();
        return [
            this.Loader.loadImage("tiles_large", "/images/tilemap_400x300.png"),
            this.Loader.loadImage("player_large", "/images/spritesheet_100x100.png")
        ]
    }
    
    update(delta){
        //logic stuff that changes each tick (or so)

        let dx = 0;
        let dy = 0;
        if (this.keyboard.isDown(this.keyboard.UP)) {dy = -1;}
        else if (this.keyboard.isDown(this.keyboard.DOWN)) {dy = 1;}
        else if (this.keyboard.isDown(this.keyboard.LEFT)) {dx = -1;}
        else if (this.keyboard.isDown(this.keyboard.RIGHT)) {dx = 1;}
        
        this.player.move(dx, dy);
    }

    draw(){
        //render playing field
        this._drawTiles();

        //render player
        const player = this.Loader.getImage("player_large")
        this.ctx.drawImage(player, 0, 0, 100, 100, 0, 0, 100, 100)
    }
   
    /* helper */
    _drawTiles(){
        for (let c = 0; c < this.mapHandler.cols; c++) {
            for (let r = 0; r < this.mapHandler.rows; r++) {
                const tileToDraw = this.mapHandler.getTile(c, r);
                if (tileToDraw !== 0) {
                    const canvasX = c * this.mapHandler.tileSize;
                    const canvasY = r * this.mapHandler.tileSize;
                    const sourceCoords = this.mapHandler.getCoords(tileToDraw);
                    
                    this.ctx.drawImage(
                        this.tileAtlas, //source img
                        sourceCoords.col, //source x
                        sourceCoords.row, //source y
                        this.mapHandler.tileSize, //source width
                        this.mapHandler.tileSize, //source height
                        canvasX, //target x
                        canvasY, //target y
                        this.mapHandler.targetSize, //target width
                        this.mapHandler.tileSize, //target height
                    )
                }
            }
        }
    }

}