
const Level1 = function(buffer, context) {

    var self = this;

    this.buffer = buffer;
    this.context = context;

    this.moorhuhns = {}; // mooorhuhny na vykreslenie
    this.moorhuhnsSorted = []; // moorhuhny usporiadane podla velkosti na spravne vykreslenie prekryvania
    this.moorhuhnAmountMax = 1; // maximum povolenych moorhuhnov na vykreslenie v dany moment v case, toto sa meni s beziacim casom
    this.moorhuhnMax = 15; // maximum moorhuhnov na vykreslenie - toto je absolutny max, ktory sa neprekroci
    this.moorhuhnK = 60; // do K si budeme ukladat koeficient pre zvysovanie poctu moorhuhnov exponencialne
    this.id_log = 0; // log posledneho id moorhuhna
    this.imagesLoaded = false;
    this.stopAnimations = false; // pouziva sa pri game over // nebude sa pouzivat - kazdy objekt bude mat vlastny stav stopovania movementu a animacie

    this.stopped = false;

    // vytvorime po jednom objekte z kazdeho typu pre jednorazove loadnutie obrazkov
    this.landscape =  new Landscape1(0, 0);

    this.moorhuhnFlyLeft = new MoorhuhnFlying('mfl', -1, this.context.canvas.width, this.context.canvas.height, './assets/graphics/Moorhuhn_L.png', './assets/graphics/Moorhuhn_L_zasah.png');

    this.moorhuhnFlyRight = new MoorhuhnFlying('mfr', 1, this.context.canvas.width, this.context.canvas.height, './assets/graphics/Moorhuhn_P.png', './assets/graphics/Moorhuhn_P_zasah.png');

    this.moorhuhnTypes = [this.moorhuhnFlyLeft, this.moorhuhnFlyRight];

    this.crosshair = new Crosshair(this.buffer, this.context);

    this.ammo = new Ammo(this.buffer, this.context);

    this.countdown = new Countdown(this.buffer, this.context);
    this.countdown.initTime();

    this.score = new Score(this.buffer, this.context);
    this.score.initScore();

    // objekty za sebou v liste
    this.objects = [this.landscape, this.moorhuhnFlyLeft, this.moorhuhnFlyRight, this.crosshair, this.countdown, this.score, this.ammo];

    this.imagesLoader = new ImagesLoader();

    this.luo = {};
    // loadnutie obrazkov pre vsetky objekty naraz
    Promise
        .all(this.objects.map(i => this.imagesLoader.loadImage(i)))
        .then((objects) => { // objects je identifier, nie konkretny objekt
            objects.forEach((obj) => { // pre kazdy objekt
                self.luo[obj.id] = obj;
            });
            return self;
            for(let i=0; i < objects.length; i++) {
                let object = objects[i];
                this.luo[object.id] = object;
            }
        }).catch((err) => {
            console.error(err);
        });

    // this.luo = this.imagesLoader.loadAllImages(this.objects); // loaded unique objects - objekt vsetkych unikatnych objektov s loadnutymi obrazkami

    // this.luo.then(function() {
    //     return this;
    // });

    // this.luo.then(function() {
    //     // teraz spustame gameLoop
    //     console.log('--- Spustame Herny Loop ---');
    //     this.levelLoop();
    // });

};

Level1.prototype = {

    generateMoorhuhns: function() {
        // zvysujeme pocet povolenych moorhuhnov na vykreslenie postupne s ubudajucim casom
        this.moorhuhnAmountMax = (this.moorhuhnAmountMax + 0.1) * (1 + this.moorhuhnK / 10000);
        if(this.moorhuhnAmountMax > this.moorhuhnMax) { this.moorhuhnAmountMax = this.moorhuhnMax; } // mame limit pre maximalny pocet moorhuhnov

        // zistime ci mame pridat na vykreslenie dalsieho moorhuhna
        if(Math.trunc(this.moorhuhnAmountMax) - _.size(this.moorhuhns) >= 1) {
            // nahodne vyber typ moorhuhna a vygeneruj noveho ako kopiu
            var rm = this.moorhuhnTypes[Math.floor(Math.random() * this.moorhuhnTypes.length)]; // rm - random moorhuhn
            var luoM = this.luo[rm.id];
            // nove id
            this.id_log += 1; var m_id = this.id_log;
            var newMoorhuhnFlying = new MoorhuhnFlying(m_id, luoM.d, this.context.canvas.width, this.context.canvas.height, luoM.imgSrc, luoM.imgDeadSrc, luoM.img, luoM.imgDead); // uz vygenerovane obrazky len posunieme novemu moorhuhnovi
            this.moorhuhns[m_id] = newMoorhuhnFlying;
        }
    },

    // Pozadie
    drawLandscape: function() {
        console.log(this.luo);
        var keys = Object.keys(this.luo);
        console.log(keys);
        for(var key in this.luo) {
            console.log(key);
        }
        this.buffer.drawImage(this.luo.landscape1.img, 0, 0, this.luo.landscape1.width, this.luo.landscape1.height, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    },

    deleteMoorhuhns: function() {

        var toDelete = {};

        for(var id in this.moorhuhns) {
            var moorhuhn = this.moorhuhns[id];
            if(moorhuhn.isDead === true) {
                toDelete[id] = id;
            }
        }

        for(var id in toDelete) {
            delete this.moorhuhns[id];
        }

        return false;
    },

    // Moorhuhni
    drawMoorhuhns: function() {

        // vymaz vsetkych moorhuhnov co cakaju na vymazanie
        this.deleteMoorhuhns();

        // usporiadame moorhuhnov v objekte podla ich velkosti, aby sa vzdy vykreslil mensi morhuhn za vacsim
        var moorhuhnsV = Object.values(this.moorhuhns);
        moorhuhnsSorted = moorhuhnsV.sort( compare ); // 'compare' je callback funkcie ktoru sme definovali uplne hore medzi pomocnymi funkciami

        // po usporiadani ich po jednom vykreslime
        moorhuhnsSorted.forEach(function (item, index) {
            // console.log(item, index);
            var moorhuhnS = moorhuhnsSorted[index];
            var moorhuhn = this.moorhuhns[moorhuhnS.id];

            if(typeof moorhuhn !== 'undefined') {
                var res = moorhuhn.updatePosition(); // pohyb moorhuhna
                var res2 = moorhuhn.updateAnimation();

                if(moorhuhn.isDead == false) {
                    // vykreslenie moorhuhna
                    this.buffer.drawImage(moorhuhn.useImg, moorhuhn.spriteX, moorhuhn.spriteY, moorhuhn.spriteWidth, moorhuhn.spriteHeight, moorhuhn.x, moorhuhn.y, moorhuhn.width, moorhuhn.height);
                }
            }
        });
    },

    // zastavime vsetkych moorhuhnov
    stopMoorhuhns: function() {
        for(var i in this.moorhuhns) {
            var moorhuhn = this.moorhuhns[i];
            moorhuhn.stop();
        }
    },

    // Zastavime dianie v leveli
    stopLevel: function() {
        this.stopMoorhuhns();
    },

    shoot: function(x, y) {
        // ak mame prazdny zasobnik, nerob nic
        if(this.ammo.isMagazineEmpty()) { return false; }

        // odober naboj zo zasobnika
        this.ammo.updateMagazine(-1);

        // zorad moorhuhnov descending podla velkosti, aby trafeny bol vzdy moorhuhn vykresleny blizsie ak su v zakryte
        var mDesc = this.moorhuhnsSorted;
        mDesc.sort(function(a, b){return b-a});

        // prejdi vsetkych vykreslenych moorhuhnov a zisti ci bolo kliknute na poziciu niektoreho z nich
        for (i = 0; i < mDesc.length; i++) {
            var moorhuhn = this.moorhuhns[mDesc[i].id];
            if(moorhuhn.x <= x && x <= moorhuhn.x + moorhuhn.width && moorhuhn.y <= y && y <= moorhuhn.y + moorhuhn.height) {
                if(moorhuhn.moorhuhnHit === true) { return false; } // ak uz moorhuhn zomiera, nerob nic
                this.moorhuhn.moorhuhnShot();
                this.score.updateScore(moorhuhn.points);
                return false; // zasiahli sme moorhuhna, ukonci hladanie trafeneho
            }
        };
    },

    // Timer
    drawCountdown: function() {
        // vykresli minuty
        this.buffer.drawImage(this.countdown.img, this.countdown.min.spriteX, this.countdown.min.spriteY, this.countdown.spriteWidth, this.countdown.spriteHeight, this.countdown.min.x, this.countdown.min.y, this.countdown.width, this.countdown.height);

        // vykresli sekundy desiatky
        this.buffer.drawImage(this.countdown.img, this.countdown.secT.spriteX, this.countdown.secT.spriteY, this.countdown.spriteWidth, this.countdown.spriteHeight, this.countdown.secT.x, this.countdown.secT.y, this.countdown.width, this.countdown.height);

        // vykresli sekundy jednotky
        this.buffer.drawImage(this.countdown.img, this.countdown.sec.spriteX, this.countdown.sec.spriteY, this.countdown.spriteWidth, this.countdown.spriteHeight, this.countdown.sec.x, this.countdown.sec.y, this.countdown.width, this.countdown.height);
    },

    // Score
    drawScore: function() {
        // vykresli kazdu cifru score od posledneho zprava dolava
        this.score.ciphersRev.forEach(function (item, index) {
            var cipher = item;

            var spriteX = 0;

            var spriteY = item * this.score.spriteHeight;

            var x = this.width - 20 - (index * this.score.width + this.score.width);

            var y = 20;

            // vykreslujeme
            this.buffer.drawImage(this.score.img, spriteX, spriteY, this.score.spriteWidth, this.score.spriteHeight, x, y, this.score.width, this.score.height);
        });
    },

    // Ammo
    drawAmmo: function() {

        // mame len jeden sprite, pozicie x a y su 0
        var spriteX = 0;
        var spriteY = 0;

        // var y = context.canvas.width - 20 - context.canvas.height;
        var y = this.context.canvas.height - 20 - this.ammo.height;

        // vykresli kazdy naboj v zasobniku
        for(var i = 1; i <= this.ammo.magazine; i++) { // for mozeme robit aj odpocitavanim, co je lepsie pre performance

            var x = width - 20 - (i * this.ammo.width);

            if(i > 0) { x += -5 * i; } // 5 // okrem prveho cisla zprava, kazdemu dalsiemu pridaj medzeru // bez medzery to vyzera lepsie

            buffer.drawImage(this.ammo.img, spriteX, spriteY, this.ammo.spriteWidth, this.ammo.spriteHeight, x, y, this.ammo.width, this.ammo.height);
        }
    },

    // HUD (Heads-Up Display)
    drawHud: function() {
        // timer
        this.drawCountdown();

        // score
        this.drawScore();

        // ammo
        this.drawAmmo();
    },

    // Mieridlo
    drawCrosshair: function () {
        this.buffer.drawImage(this.crosshair.img, this.crosshair.x, this.crosshair.y, this.crosshair.width, this.crosshair.height);
    },

    // funkcia na odpocitavanie casu
    runTimer: function() {
        if(this.countdown.active == true) { return false; } // ak uz bezi, nespusti ho znovu
        this.countdown.active = true;

        var self = this;

        var timerInterval = window.setInterval( function() {
            // kazdu sekundu pregeneruj moorhuhnov na zobrazenie
            self.generateMoorhuhns();
            if(self.countdown.time > 0) { self.countdown.updateTime(-1); }
        }, 1000);

        if(this.countdown.time <= 0) { clearInterval(timerInterval); }
    },

    // Herny loop
    update: function(context, buffer) { // tu sa deje vsetko

        // this.clear(); // vycistime canvas aj buffer
        this.buffer = buffer;
        this.context = context;

        // spustime odpocitavanie
        this.runTimer();

        // poistka pri developmente - ak dosiahne zadanu iteraciu, herny loop sa zastavi
        // ak je kod zle navrhnuty, moze pretiect pamatovy zasobnik a zhodime hru / prehliadac
        this.loop_i += 1; // pocitame iteracie herneho loopu
        if(this.loop_i == 10000) {  // zastavenie loopu na testovanie pocas developmentu
            // return false; // po returne sa funkcia ukonci, loop sa zastavi
        }

        // vykresli pozadie
        this.drawLandscape();

        // vykresli moorhuhnov
        this.drawMoorhuhns();

        // vykresli HUD
        this.drawHud();

        // vykresli Crosshair
        this.drawCrosshair();

        if(this.countdown.time <= 0) { // casomiera skoncila

            // zastav cele diane v leveli
            this.stopLevel();

            // vykresli Game Over overlay nad vsetko ostatne
            this.drawGameOver();

            console.log('--- Cas vyprsal ---');
        }

        return this.buffer; // vraciame zasobnik s vykreslenymi objektami pre dany frame

        // // vykreslujeme buffer do canvasu
        // this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    },

    stop: function() {

        this.stopped = true;

    }

}
