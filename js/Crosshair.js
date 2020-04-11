// Crosshair
const Crosshair = function () {
    this.id = 'crosshair';
    this.x = null, this.y = null;
    this.img = null;
    this.imgSrc = './assets/graphics/Crosshair8_small_transparent.png';
    this.width = 50; this.height = 50;
    this.spriteWidth = 600; this.spriteHeight = 600;
};
Crosshair.prototype = {

    updateMousePosition: function(x, y) {
        this.x = x - this.width / 2; // centrovanie
        this.y = y - this.height / 2;
    }

};
