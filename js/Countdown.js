// Countdown
const Countdown = function (buffer, context) {
    this.context = context;
    this.buffer = buffer;
    this.id = 'countdown';
    this.x = null, this.y = null;
    this.img = null;
    this.imgSrc = './assets/graphics/numbers/numbers_vertical.png';
    this.width = this.context.canvas.width / 10; this.height = this.context.canvas.height / 4;
    this.spriteWidth = 64; this.spriteHeight = 82;
    this.timeConverted = { minutes: 0, seconds: 0 };
    this.timeStart = 3; // 180 sec - 3 min
    this.time = this.timeStart;
    this.active = false;
    this.min = { val: 0, x: this.context.canvas.width / 16, y: 20, spriteX: 0, spriteY: 0 }; // pozicia cifry na canvase, pozicia spritu danej cifry
    this.secT = { val: 0, x: this.context.canvas.width / 4, y: 20, spriteX: 0, spriteY: 0 };
    this.sec = { val: 0, x: this.context.canvas.width / 2.8, y: 20, spriteX: 0, spriteY: 0 };
};
Countdown.prototype = {

    updateTime: function(seconds) {

        this.time += seconds;
        this.timeConverted = secondsToMinutes(this.time);

        // rozdelujeme prekonvertovany cas na cifry
        this.min.val = this.timeConverted.minutes;
        var spl = this.timeConverted.seconds+''.split('');

        if(typeof spl[1] == 'undefined') {
            this.secT.val = 0;
            this.sec.val = spl[0];
        } else {
            this.secT.val = spl[0];
            this.sec.val = spl[1];
        }

        // tu updatneme pozicie spritov cifier
        // minuty
        this.min.spriteY = this.min.val * this.spriteHeight;

        // desiatky sekund
        this.secT.spriteY = this.secT.val * this.spriteHeight;

        // jednotky sekund
        this.sec.spriteY = this.sec.val * this.spriteHeight;

        return false;
    },

    initTime: function() {
        this.time = this.timeStart;
        this.updateTime(0);
    }

};
