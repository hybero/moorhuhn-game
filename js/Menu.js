
const Menu = function(buffer, context) {

    this.stopped = false;

};

Menu.prototype = {

    stop: function() {

        this.stopped = true;

    }

};
