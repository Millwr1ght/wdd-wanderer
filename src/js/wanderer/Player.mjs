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
        this.MOVE_SPEED = this.map.targetSize;
    }

    
    move(delta, dx, dy) {
        //movement logic
        this.x += dx;
        this.y += dy;

        //can you go to that spot?
        //this._detectCollision(dx, dy)
        //did you walk off the map?
        this._detectScreenEdge(dx, dy)
    }

    //collision detection
    //_detectCollision(dx, dy) {}

    _detectScreenEdge(dx, dy) {
        let row, col;
    }
    
    
}