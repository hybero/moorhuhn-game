
const Game = function () {

    this.context = null;
    this.buffer = null;

    this.loop_i = 0;

    this.landscape1 = null;

    this.level1 = null;

    this.gamePage = 'menu';

    this.aspectRatio = 1.777;

    this.crosshair = null;

};

Game.prototype = {

    start: function() {
        // ziskanie contextu a bufferu
        this.context = document.querySelector("canvas").getContext("2d");
        this.buffer  = document.createElement("canvas").getContext("2d"); // zasobnik, najprv vykreslujeme tam, az potom do canvasu
        console.log(':::: context a buffer mame ::::');

        this.landscape1 = new Landscape1();

        this.menu = new Menu(this.buffer, this.context);

        this.level1 = new Level1(this.buffer, this.context);

        this.crosshair = new Crosshair();
        // console.log(this.crosshair);

        this.gamePage = 'level_1'; // menu | level_1 | game_over

        var self = this;

        // zachytavanie pozicie mysi
        this.context.canvas.addEventListener('mousemove', function(event) {
            self.crosshair.updateMousePosition(event.clientX, event.clientY);
        });

        // zachytavanie clicku mysi
        this.context.canvas.addEventListener('mousedown', function(event) {
            self.level1.shoot(event.clientX, event.clientY);
        });

        // zistime vysku sirku podla clienta (prehliadaca)
        this.height = document.documentElement.clientHeight;
        this.width = document.documentElement.clientWidth;

        // vypnute | zapnute automaticke vyhladzovanie obrazkov
        this.buffer.imageSmoothingEnabled = true;
        this.context.imageSmoothingEnabled = true;

        this.loop_i = 0; // pocitame iteracie v hernom loope

        this.pointer = { down:false, x:0, y:0 }; // cursor mysi

        // starting game loop
        // window.requestAnimationFrame(this.gameLoop);

        this.gameLoop();
    },

    gameLoop: function() {

        // v pripade zmeny rozlisenia, sa zmena detekuje v gameLoope a zmeni sa rozmer canvasu
        this.width = document.documentElement.clientWidth;

        // tu urcime velkost vysky podla landscape1 aspect ratio
        this.height = this.width / this.landscape1.aspectRatio;

        // buffer
        this.buffer.canvas.height = this.height;
        this.buffer.canvas.width = this.width;

        // context
        this.context.canvas.height = this.height;
        this.context.canvas.width = this.width;

        switch (this.gamePage) {
            case 'menu':
                if(this.level1.stopped !== true) {
                    this.level1.stop();
                }
                this.buffer = this.menu.update(this.buffer, this.context);
                break;
            case 'level_1':
                if(this.menu.stopped !== true) {
                    this.menu.stop();
                }
                this.buffer = this.level1.update(this.buffer, this.context);
                break;
            default:
                break;
        };

        // pred vykreslenim noveho framu vycistime plochu
        this.clear();

        // vykreslujeme buffer do canvasu
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);

        // spusti sa znovu - vytvara nam loop
        window.requestAnimationFrame(this.gameLoop);
    },

    clear: function() {
        this.buffer.clearRect(0, 0, this.width, this.height);
        this.context.clearRect(0, 0, this.width, this.height);

        return false;
    }

};
