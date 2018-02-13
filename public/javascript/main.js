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