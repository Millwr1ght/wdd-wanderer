

//tile map data and functionality

/* tile key
 * 0 - nothing
 * 1 - house L
 * 2 - house R
 * 3 - boulder
 * 4 - tree
 * 5 - cave L
 * 6 - cave R
 * 7 - mountain
 * 8 - cactus
 * 9 - castle L
 * 10 - castle R
 * 11 - temple/shrine
 */
// tiles = [
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0
// ];

// to get array index from coords (col,row), col + row*num_cols
// in a 8col by 6row grid: (7,0) would be array[7], (3,4) would be 3 + 4*8: array[35]

// no i will not be implementing density mapping for procedural generation. 
// i spent too long looking it up and i do not have the time to figure it out by the 6th

export default class tileMap {
    constructor(cols, rows, tileSize) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.tiles = new Array(this.cols * this.rows).fill(0); //empty field
    }
    
    getTile(col, row) {
        //from col,row coords, get array index
        return this.tiles[row * tileMap.cols + col];
    };
    getCol(x) {
        //convert canvas x to tileMap col
        return Math.floor(x / this.tileSize);
    };
    getRow(y) {
        //convert canvas y to tileMap row
        return Math.floor(y / this.tileSize);
    };
    getX(col) {
        //convert tileMap col to canvas x
        return col * this.tileSize;
    };
    getY(row) {
        //convert tileMap row to canvas y
        return row * this.tileSize;
    };

    //generate new board
    generateNewField(){
        this.tiles.map(element => {
            
        });
    }
    _rollNewTile(){
        let roll2d10 = Math.floor(Math.random() * 100); //roll 2 10-sided dice, get 0-99
        console.log(roll2d10)
        let element = 0;
        switch (true) {
            case roll2d10 > 90:
                element = 8; //cactus
                break;
            case roll2d10 > 75:
                element = 7; //mountain
                break;
            case roll2d10 > 70:
                element = 5; //cave
                break;
            case roll2d10 > 50:
                element = 4; //tree
                break;
            case roll2d10 > 45:
                element = 3; //boulder
                break;
            case roll2d10 > 40:
                element = 1; //house
                break;
            default:
                break;
        }
        return element;
    }
};

