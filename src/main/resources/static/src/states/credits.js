LastEscape.creditsState = function(game) {

}

LastEscape.creditsState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 118, 720, 483, 'pantallaCreditos');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}
