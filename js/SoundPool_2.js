
// SoundPool
const SoundPool = function () {
    this.overlaying = {};
    this.sounds = {
        menu: {
            src: './assets/sounds/Menu.mp3',
            loop: true,
            volume: 0.5
        },
        level_1: {
            src: './assets/sounds/Level_1.mp3',
            loop: true,
            volume: 0.5
        },
        reload: {
            src: './assets/sounds/Reload_muniction.mp3',
            loop: false,
            volume: 0.9
        },
        shoot: {
            src: './assets/sounds/Shot.mp3',
            loop: false,
            volume: 0.2
        },
        game_over: {
            src: './assets/sounds/Game_over.mp3',
            loop: false,
            volume: 0.5,
            played: false
        }
    };
};
SoundPool.prototype = {

    init: function() {
        var self = this;
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            this.sounds[soundName].snd = new Audio(sound.src);
            if(sound.loop === true) {
                this.sounds[soundName].snd.loop = true;
                if(typeof sound.volume !== 'undefined') {
                    this.sounds[soundName].snd.volume = sound.volume;
                }
            }
        }
        // game over
        this.sounds.game_over.ele = document.createElement("audio");
        this.sounds.game_over.ele.src = this.sounds.game_over.src;
        this.sounds.game_over.ele.setAttribute("preload", "auto");
        this.sounds.game_over.ele.setAttribute("controls", "none");
        this.sounds.game_over.ele.style.display = "none";
        document.body.appendChild(this.sounds.game_over.ele);
    },

    playMenu: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'level_1' || soundName == 'game_over') {
                sound.snd.pause();
                sound.snd.currentTime = 0;
            }
        }
        this.sounds.menu.snd.play();
    },

    playLevel_1: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'menu' || soundName == 'game_over') {
                sound.snd.pause();
                sound.snd.currentTime = 0;
            }
        }
        this.sounds.level_1.snd.play();
    },

    playGameOver: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'menu' || soundName == 'level_1') {
                sound.snd.pause();
                sound.snd.currentTime = 0;
            }
        }
        // this.sounds.game_over.snd.play();
        if(this.sounds.game_over.played == false) {
            this.sounds.game_over.ele.play();
            this.sounds.game_over.played = true;
        }
    },

    playShoot: function() {
        var id = this.makeid(100);
        this.overlaying[id] = this.sounds.shoot;
        this.overlaying[id].snd = new Audio(this.sounds.shoot.src);
        this.overlaying[id].snd.volume = this.sounds.shoot.volume;
        this.overlaying[id].snd.onend = function() {
            self.overlaying[id] = null;
            delete self.overlaying[id];
        };
        this.overlaying[id].snd.play();
    },

    playReload: function() {
        var id = this.makeid(100);
        this.overlaying[id] = this.sounds.reload;
        this.overlaying[id].snd = new Audio(this.sounds.reload.src);
        this.overlaying[id].snd.volume = this.sounds.reload.volume;
        this.overlaying[id].snd.onend = function() {
            self.overlaying[id] = null;
            delete self.overlaying[id];
        };
        this.overlaying[id].snd.play();
    },

    makeid: function(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

};
