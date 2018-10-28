LastEscape.settingsState = function(game) {

}

LastEscape.settingsState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
        sonido = game.add.button(581, 330, 'boton_sonido', botonSonido, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function botonSonido () {
}
