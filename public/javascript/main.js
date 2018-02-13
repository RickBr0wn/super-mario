import SpriteSheet from './spritesheet.js';
import {loadImage, loadLevel} from './loaders.js';

function drawBackground(background, context, sprites){
    background.ranges.forEach(([x1, x2, y1, y2]) =>{
        for(let x = x1; x < x2; x++){
            for(let y = y1; y < y2; y++){
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    });
}

function loadMarioSprite(){
    return loadImage('/img/characters.gif')
        .then(image =>{
            const sprites = new SpriteSheet(image, 16, 16);
            sprites.define('idle', 276, 44, 16, 16);
            return sprites;
    });
}

function loadBackgroundSprites(){
    return loadImage('/img/tiles.png').then(function(image){
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([marioSprite, sprites, level]) =>{
    console.log('Level loaded: ', level);
    level.backgrounds.forEach(background =>{
        drawBackground(background, context, sprites);
    });

    marioSprite.draw('idle', context, 64, 64);
});
