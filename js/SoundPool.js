
// SoundPool
const SoundPool = function () {
    this.overlaying = {};
    this.sounds = {
        menu: {
            src: './assets/sounds/Menu.mp3',
            loop: true
        },
        level_1: {
            src: './assets/sounds/Level_1.mp3',
            loop: true
        },
        reload: {
            src: './assets/sounds/Reload_muniction.mp3',
            loop: false
        },
        shoot: {
            src: './assets/sounds/Shot.mp3',
            loop: false
        },
        game_over: {
            src: './assets/sounds/Game_over.mp3',
            loop: true
        }
    };
};
SoundPool.prototype = {

    init: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            this.sounds[soundName].ele = document.createElement("audio");
            this.sounds[soundName].ele.src = sound.src;
            if(sound.loop === true) {
                this.sounds[soundName].loop = true;
            }
            this.sounds[soundName].ele.setAttribute("preload", "auto");
            this.sounds[soundName].ele.setAttribute("controls", "none");
            this.sounds[soundName].ele.style.display = "none";
            document.body.appendChild(this.sounds[soundName].ele);
        }
    },

    playMenu: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'level_1' || soundName == 'game_over') {
                // sound.ele.stop();
                sound.ele.pause();
            }
        }
        this.sounds.menu.ele.play();
    },

    playLevel_1: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'menu' || soundName == 'game_over') {
                // sound.ele.stop();
                sound.ele.pause();
            }
        }
        this.sounds.level_1.ele.play();
    },

    playGameOver: function() {
        for(var soundName in this.sounds) {
            var sound = this.sounds[soundName];
            if(soundName == 'menu' || soundName == 'level_1') {
                // sound.ele.stop();
                sound.ele.pause();
            }
        }
        this.sounds.game_over.ele.play();
    },

    playShoot: function() {
        var id = this.makeid(100);
        this.overlaying[id] = this.sounds.shoot;
        this.overlaying[id].ele.id = id;
        var self = this;
        this.overlaying[id].ele.onended = function() {
            self.overlaying[id] = null;
            delete self.overlaying[id];
            self.removeElement(id);
        };
        document.body.appendChild(this.sounds.shoot.ele);
        // this.overlaying[id].ele = document.createElement("audio");
        this.overlaying[id].ele.play();
        // this.sounds.shoot.ele.play();
    },

    playReload: function() {
        this.sounds.reload.ele.play();
    },

    makeid: function(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    removeElement: function(id) {
        var elem = document.getElementById(id);
        return elem.parentNode.removeChild(elem);
    }

};
