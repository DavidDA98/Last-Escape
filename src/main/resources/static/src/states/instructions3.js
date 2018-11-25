LastEscape.instructions3State = function(game) {

}


LastEscape.instructions3State.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 118, 720, 483, 'comoJugar3');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
        delante3 = game.add.button(965, 570, 'delante', botonDelante3, this, 1, 0);
        atras2 = game.add.button(255, 570, 'atras', botonAtras2, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function botonDelante3 () {
    game.state.start('instructions4State');
}

function botonAtras2 () {
    game.state.start('instructions2State');
}