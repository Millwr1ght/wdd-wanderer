export default class Keyboard {
    LEFT = 37;
    RIGHT = 39;
    UP = 38;
    DOWN = 40;
    _keys = {};

    //methods
    listenForEvents = (keys) => {
        window.addEventListener('keydown', this._onKeyDown.bind(this));
        window.addEventListener('keyup', this._onKeyUp.bind(this));

        keys.forEach(function (key) {
            this._keys[key] = false;
        }.bind(this));
    }

    _onKeyDown(event) {
        //if key down, change the _keys obj to reflect this 
        var keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = true;
        }
    }
    _onKeyUp(event) {
        //if key released, change the _keys obj to reflect this
        var keyCode = event.keyCode;
        if (keyCode in this._keys) {
            event.preventDefault();
            this._keys[keyCode] = false;
        }
    }

    isDown(keyCode) {
        //check if a key is held
        if(!keyCode in this._keys) {
            throw new Error('Not listening for Keycode' + keyCode)
        }
        return this._keys[keyCode]; //bool
    }
};