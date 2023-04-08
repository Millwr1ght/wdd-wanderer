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
        this._detectCollision(dx, dy);
                
        //did you walk off the map?
        let walkedOffMap = this._detectScreenEdge(dx, dy);

        return walkedOffMap;
    }

    //collision detection
    _getAdjacentTiles(){
        //x,y is top left corner
        const LEFT = this.map.getCol(this.x - this.width); //subtract one because last pixel in width has index [width - 1], bc indices start at 0
        const RIGHT = this.map.getCol(this.x + this.width);
        const UP = this.map.getRow(this.y - this.height);
        const DOWN = this.map.getRow(this.y + this.height);

        return {LEFT, RIGHT, UP, DOWN}
    }

    _detectScreenEdge(dx, dy){
        let local = this._getAdjacentTiles();
        let walkedOffMap;
        
        //determine if off map; if so fix it
        switch (true) {
            case local.LEFT < -1 && dx < 0:
                this.x = this.width * (this.map.cols - 1);
                walkedOffMap = true;
                break;aw
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

    _getCorners(){
        //x,y is top left corner
        const LEFT = this.map.getCol(this.x); 
        const RIGHT = this.map.getCol(this.x + this.width -1);//subtract one because last pixel in width has index [width - 1], bc indices start at 0
        const UP = this.map.getRow(this.y);
        const DOWN = this.map.getRow(this.y + this.height -1);

        return {row:UP, col:LEFT, LEFT, RIGHT, UP, DOWN}
    }

    _detectCollision(dx, dy) {
        let local = this._getCorners();
        
        //if no walls at corners, return
        if(!(this.map.isWallAtColRow(local.RIGHT, local.UP) ||
            this.map.isWallAtColRow(local.RIGHT, local.DOWN) ||
            this.map.isWallAtColRow(local.LEFT, local.UP) ||
            this.map.isWallAtColRow(local.LEFT, local.DOWN)
        )){ return; }

        //there are walls, go back one space
        switch (true) {
            case dx > 0:
                this.x = this.map.getX(local.RIGHT) - this.width;
                break;
            case dx < 0:
                this.x = this.map.getX(local.LEFT + 1); 
                break;
            case dy > 0:
                this.y = this.map.getY(local.DOWN) - this.height;
                break;
            case dy < 0:
                this.y = this.map.getY(local.UP + 1);
                break;
            default:
                break;
        }
    }
}