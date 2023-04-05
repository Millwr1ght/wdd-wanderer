export default class Player {
    //the player character class

    constructor(mapHandler, x, y, sprite) {
        //location data
        this.x = x;
        this.y = y;
        this.map = mapHandler; //to access tilemap methods

        //visual data
        this.width = this.map.targetSize;
        this.height = this.map.targetSize;
        this.sprite = sprite;

        //stat data
        this.MOVE_SPEED = 200;
    }

    
    move(delta, dx, dy) {
        //movement logic
        this.x += dx * this.MOVE_SPEED * delta;
        this.y += dy * this.MOVE_SPEED * delta;
        
        //can you go to that spot?
        //this._detectCollision(dx, dy)
        //did you walk off the map?
        let walkedOffMap = this._detectScreenEdge(dx, dy);

        return walkedOffMap;
    }

    //collision detection
    _getLocalTiles(){
        let row, col;

        //get coords of current and adjacent tiles
        row = this.map.getRow(this.y)
        col = this.map.getCol(this.x)

        const LEFT = this.map.getCol(this.x - this.width);
        const RIGHT = this.map.getCol(this.x + this.width);
        const UP = this.map.getRow(this.y - this.height);
        const DOWN = this.map.getRow(this.y + this.height);

        return {row, col, LEFT, RIGHT, UP, DOWN}
    }

    _detectScreenEdge(dx, dy){
        let local = this._getLocalTiles();
        let walkedOffMap;
        
        //determine if off map; if so fix it
        switch (true) {
            case local.LEFT < -1 && dx < 0:
                this.x = this.width * (this.map.cols - 1);
                walkedOffMap = true;
                break;
            case local.RIGHT > this.map.cols - 1 && dx > 0:
                this.x = 0;
                walkedOffMap = true;
                break;
            case local.UP < -1 && dy < 0:
                this.y = this.width * (this.map.rows - 1);
                walkedOffMap = true;
                break;
            case local.DOWN > this.map.rows - 1 && dy > 0:
                this.y = 0;
                walkedOffMap = true;
                break;
            default:
                walkedOffMap = false;
                break;
        }
        return walkedOffMap;
    }
    
    _detectCollision(dx, dy) {
        let local = this._getLocalTiles();
        
        //determine if area ocupado
        const collision = 
            this.map.isWallAtColRow(local.LEFT, local.row) ||
            this.map.isWallAtColRow(local.RIGHT, local.row) ||
            this.map.isWallAtColRow(local.col, local.UP) ||
            this.map.isWallAtColRow(local.col, local.DOWN);
        if(!collision){return;}
    }
}