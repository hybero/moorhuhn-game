
const ImagesLoader = function() {};

ImagesLoader.prototype = {

    // funkcia na loadnutie obrazka/obrazkov pre jeden objekt
    loadImage: function(obj) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.addEventListener("load", () => {
                obj.img = img;
                if (obj.hasOwnProperty('imgDeadSrc')) {
                    let imgDead = new Image();
                    imgDead.addEventListener("load", () => {
                        obj.imgDead = imgDead;
                        resolve(obj);
                    });
                    imgDead.addEventListener("error", (err) => {
                        reject(err);
                    });
                    imgDead.src = obj.imgDeadSrc;
                }
                resolve(obj);
            });
            img.addEventListener("error", (err) => {
                reject(err);
            });
            img.src = obj.imgSrc;
        });
    },

    loadAllImages: function(objects) {
        var luo = {};
        // loadnutie obrazkov pre vsetky objekty naraz
        Promise
            .all(objects.map(i => this.loadImage(i)))
            .then((objects) => {
                objects.forEach((obj) => { // pre kazdy objekt
                    luo[obj.id] = obj;
                });
                return luo;
            }).catch((err) => {
                console.error(err);
            });
    }

}
