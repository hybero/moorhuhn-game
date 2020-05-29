// MoorhuhnFlying
const MoorhuhnFlying = function (id, d, ccw, cch, imgSrc, imgDeadSrc, img, imgDead) { // ccw - context.canvas.width, cch - context.canvas.height
    this.id = id || null;
    this.aspectRatio = 1;
    this.ccw = ccw; this.cch = cch;
    this.minWidth = this.ccw / 30; this.maxWidth = this.ccw / 12; this.widthDif = this.maxWidth - this.minWidth; // min a max pre nahodne zvolenie velkosti - kvoli pouzitiu context hodnot, treba vytvarat novych mooorhuhnov az ked mame context!
    this.width = getRandomInt(this.minWidth, this.maxWidth); this.height = this.width / this.aspectRatio;
    this.d = d;
    this.x = this.d > 0 ? 0 - this.width : this.ccw, this.y = getRandomInt(30, cch - 30 - this.height);
    this.vx = 0.1; this.vy = 0.1; // velocity x & velocity y - asi nepouzijeme
    this.spriteNo = 1; // cislo spritu v animacii
    this.lastSprite = 0;
    this.flyingSpriteAmount = 13; // moorhuhn
    this.dyingSpriteAmount = 8;
    this.spriteAmount = this.flyingSpriteAmount;
    // this.spriteAmount = 8;  // flappy
    this.spriteOriginalWidth = 140; // moorhuhn & flappy
    this.spriteOriginalHeight = 152; // moorhuhn
    // this.spriteOriginalHeight = 136; // flappy
    this.spriteWidth = this.spriteOriginalWidth;
    this.spriteHeight = this.spriteOriginalHeight;
    this.spriteX = 0; // toto upravuje updateAnimation()
    this.spriteY = 0;
    this.animationRunning = false;
    this.animationSpeedF = 1000; // 1000 | 1025 debug
    this.animationSpeedMin = 992;
    this.animationSpeedMax = 997;
    this.flyingAnimationSpeed = getRandomInt(this.animationSpeedMin, this.animationSpeedMax); // 0-1000 | 900 default
    this.dyingAnimationSpeed = 995;
    this.animationSpeed = this.flyingAnimationSpeed;
    this.animationK = 0;
    this.useAnimation = 'flying'; // flying | dying
    this.animationActive = true;
    this.isDead = false;
    this.speedK = 0.04; // 0.02
    this.minSpeed = 20; // 20
    this.maxSpeed = 40; // 30
    this.speed = getRandomInt(this.minSpeed, this.maxSpeed); // bude sa generovat nahodne podla dvihania obtiaznosti
    this.movingActive = true;
    this.moorhuhnHit = false;
    this.img = img || null; this.imgSrc = imgSrc;
    this.imgDead = imgDead || null; this.imgDeadSrc = imgDeadSrc;
    this.useImg = this.img;
    this.pointsLow = 10;
    this.pointsMed = 15;
    this.pointsHigh = 25;
    this.points = this.pointsLow;
    // podla velkosti moorhuna sa mu prida bodova hodnota
    if(this.width <= this.maxWidth - this.widthDif / 2) {
        this.points = this.pointsMed;
    }
    if(this.width <= this.maxWidth - this.widthDif / 1.5) {
        this.points = this.pointsHigh;
    }
};
MoorhuhnFlying.prototype = {

    updatePosition: function() {

        if(this.movingActive == false) { return false; }

        this.x += this.speed * this.speedK * this.d; // menime poziciu x

        // Tu ideme zmazat moorhuhna ak prejde za okraj
        // vieme z tohto if else urobit len if
        if(this.d == -1 && this.x + this.width <= 0) { // ak ide dolava a pravy okraj prekryje poziciu 0
            // console.log('[ Mazem moorhuhna ' + this.id + ' ]');
            delete moorhuhns[this.id];
        } else if(this.d == 1 && this.x >= this.ccw) { // ak ide doprava a lavy okraj prekryje poziciu context width
            // console.log('[ Mazem moorhuhna ' + this.id + ' ]');
            delete moorhuhns[this.id];
        }

        this.updateSpeed();

        return false;
    },

    updateAnimation: function() {

        if(this.animationActive == false) { return false; }

        // tu sa pocita rychlost vykreslovania.. sprite sa meni podla rychlost animacie a koeficientu rychlosti animacie
        this.animationK += 1;
        if(this.animationK <= this.animationSpeedF - this.animationSpeed) {
            return false;
        }
        this.animationK = 0;
        // OSTATNE AZ TU aby nedoslo k desynchronizacii animacii

        switch (this.useAnimation) {
            case 'flying':
                this.animationSpeed = this.flyingAnimationSpeed;
                this.useImg = this.img;
                break;
            case 'dying':
                this.animationSpeed = this.dyingAnimationSpeed;
                this.spriteAmount = this.dyingSpriteAmount;
                this.useImg = this.imgDead;
                break;
            default:
                break;
        }

        if(this.spriteNo < this.spriteAmount) {
            this.spriteNo += 1;
        } else {
            if(this.useAnimation == 'dying') {
                // moorhuhn je mrtvy po skonceni umierajucej animacie
                this.isDead = true;
            }
            this.spriteNo = 1;
        }

        this.spriteY = (this.spriteHeight * this.spriteNo) - this.spriteHeight;

        return false;
    },

    updateSpeed: function() {

        this.minSpeed += this.speedK;
        this.maxSpeed += this.speedK;

        return false;
    },

    pause: function() {

        this.movingActive = false;
        this.animationActive = false;

        return false;
    },

    resume: function() {

        this.movingActive = true;
        this.animationActive = true;

        return false;
    },

    moorhuhnShot: function() {

        this.movingActive = false;
        this.moorhuhnHit = true;
        this.spriteNo = 1;
        this.useAnimation = 'dying';

    }

};
