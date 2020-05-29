// Checkbox
const Checkbox = function (id, checked, w) {
    this.id = 'checkbox_'+id;
    this.x = null, this.y = null;
    this.img = null;
    this.checked = checked || false;
    this.imgSrc = null;
    this.cImgSrc = './assets/graphics/checked.png';
    this.uImgSrc = './assets/graphics/unchecked.png';
    if(this.checked == true) {
        this.imgSrc = this.cImgSrc;
    } else {
        this.imgSrc = this.uImgSrc;
    }
    this.width = w; this.height = w;
    this.spriteWidth = 200; this.spriteHeight = 200;
};
Checkbox.prototype = {

    setPositions: function(x, y) {

        this.x = x;
        this.y = y;
    },

    setDimensions: function(w) {

        this.width = w;
        this.height = w;
    }

};
