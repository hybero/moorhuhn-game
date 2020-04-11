// Ammo
const Ammo = function () {
    this.id = 'ammo';
    this.x = null, this.y = null;
    this.img = null;
    this.imgSrc = './assets/graphics/Ammunition_cropped.png';
    this.width = 18; this.height = 60;
    this.spriteWidth = 253; this.spriteHeight = 746;
    this.magazineMax = 5;
    this.magazine = this.magazineMax;
};
Ammo.prototype = {

    updateMagazine: function(amount) {

        this.magazine += amount;

        if(this.magazine > this.magazineMax) { this.magazine = this.magazineMax; }

        if(this.magazine < 0) { this.magazine = 0; }

        return false;
    },

    isMagazineEmpty: function() {

        if(this.magazine <= 0) {
            return true;
        } else {
            return false;
        }
    },

    reloadMagazine: function() {

        this.magazine = this.magazineMax;
    }

};
