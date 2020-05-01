// Score
const Score = function (buffer, context) {
    this.context = context;
    this.buffer = buffer;
    this.id = 'score';
    this.x = null, this.y = null; // nepouziva sa, pozicia sa vypocita pre kazdu cifru zvlast
    this.img = null;
    this.imgSrc = './assets/graphics/numbers/numbers_vertical.png';
    this.width = this.context.canvas.width / 10; this.height = this.context.canvas.height / 4;
    this.spriteWidth = 64; this.spriteHeight = 82;
    this.points = 0;
    this.ciphers = [];
    this.ciphersRev = [];
};
Score.prototype = {

    updateScore: function(points) {

        this.points += points;

        var spl = (""+this.points).split("");

        if(typeof spl === 'undefined') { spl = [0]; }

        // poradie cisel prevratime, budeme vykreslovat od posledneho zprava dolava
        this.ciphersRev = spl.reverse();

        return false;
    },

    initScore: function() {
        this.points = 0;
        this.updateScore(0);
    }

};
