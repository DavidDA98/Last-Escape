LastEscape.selectMapState = function(game) {

}

LastEscape.selectMapState.prototype = {

    preload: function() {
        game.load.image('tabla_personaje', '/assets/images/tabla_personaje.png');
        game.load.image('selec_personaje', '/assets/images/selec_personaje.png');
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 90, 720, 120, 'selec_escenario');
        cerrar = game.add.button(1050, 110, 'cerrar', botonCerrar, this, 1, 0);
        edificio = game.add.button(210, 250, 'edificio', botonEdificio, this, 1, 0);
        game.add.tileSprite(875, 250, 200, 233, 'hospital');
        game.add.tileSprite(545, 250, 200, 233, 'carcel');
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function botonEdificio () {
    game.state.start('selectCharacterState');
}
