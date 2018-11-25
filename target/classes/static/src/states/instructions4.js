LastEscape.instructions4State = function(game) {

}


LastEscape.instructions4State.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 118, 720, 483, 'comoJugar4');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
        atras3 = game.add.button(255, 570, 'atras', botonAtras3, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function botonAtras3 () {
    game.state.start('instructions3State');
}