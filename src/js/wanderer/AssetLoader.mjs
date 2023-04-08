//asset loader from MDN tutorials, finally understand what .bind() does
export default class AssetLoader {
    images = {};

    //methods
    loadImage(key, src) {
        var img = new Image();

        var findImg = new Promise(function (resolve, reject){
            img.onload = function() {
                this.images[key] = img;
                resolve(img);
            }.bind(this); //bring the this out a level

            img.onerror = function() {
                reject("Could not load image: " + src);
            };
        }.bind(this)); //bring the this to the class level

        img.src = src;
        return findImg;
    };

    getImage(key) {
        return (key in this.images) ? this.images[key] : null;
    };
};