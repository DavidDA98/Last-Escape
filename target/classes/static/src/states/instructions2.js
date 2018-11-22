LastEscape.instructions2State = function(game) {

}


LastEscape.instructions2State.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 118, 720, 483, 'comoJugar2');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
        delante2 = game.add.button(965, 570, 'delante', botonDelante2, this, 1, 0);
        atras = game.add.button(255, 570, 'atras', botonAtras, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function botonDelante2 () {
    game.state.start('instructions3State');
}

function botonAtras () {
    game.state.start('instructionsState');
}