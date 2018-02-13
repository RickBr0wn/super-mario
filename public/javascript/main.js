function loadImage(url){
    return new Promise(function(resolve){
        const image = new Image();
        image.addEventListener('load', function(){
            resolve(image);
        });
        image.src = url;
    });
}

class SpriteSheet{
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        buffer.getContext('2d').drawImage(this.image,
            x*this.width, 
            y*this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
        this.tiles.set(name, buffer);
    }
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

loadImage('/img/tiles.png').then(function(image){
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 45, 62);

    context.drawImage(image, 
        0, 0, 
        16, 16, 
        0, 0, 
        16, 16); 
});