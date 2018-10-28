LastEscape.profileState = function(game) {

}

LastEscape.profileState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(250, 110, 780, 501, 'profile');
        cerrar = game.add.button(985, 133, 'cerrar', botonCerrar, this, 1, 0);
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}
