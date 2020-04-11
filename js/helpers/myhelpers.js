// Pomocne funkcie

// vrati nahodne cislo v rozmedzi min a max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// zo sekund na minuty a sekundy
function secondsToMinutes(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return { minutes: minutes, seconds: seconds };
}

// sortovanie ascending
function compare( a, b ) { // objs.sort( compare );
    if ( a.width < b.width ){
        return -1;
    }
    if ( a.width > b.width ){
        return 1;
    }
    return 0;
}
