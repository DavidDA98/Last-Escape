LastEscape.selectCharacterState = function(game) {

}

LastEscape.selectCharacterState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 90, 720, 120, 'selec_personaje');
        atras4 = game.add.button(1050, 120, 'atras', botonAtras4, this, 1, 0);
        tb1 = game.add.button(120, 250, 'tabla_personaje', botonPersonaje1, this, 1, 0);
        tb2 = game.add.button(400, 250, 'tabla_personaje', botonPersonaje2, this, 1, 0);
        tb3 = game.add.button(670, 250, 'tabla_personaje', botonPersonaje3, this, 1, 0);
        tb4 = game.add.button(950, 250, 'tabla_personaje', botonPersonaje4, this, 1, 0);
        game.add.tileSprite(140, 280, 139, 140, 'pj1parado');
        game.add.tileSprite(425, 280, 133, 140, 'pj2parado');
        game.add.tileSprite(690, 280, 139, 140, 'pj3parado');
        game.add.tileSprite(975, 280, 133, 140, 'pj4parado');

    },

    update: function() {

    }
}

function botonAtras4 () {
    game.state.start('selectMapState');
}

function botonPersonaje1 () {
    game.state.start('preloadLevelState');
}

function botonPersonaje2 () {
    game.state.start('preloadLevelState');
}

function botonPersonaje3 () {
    game.state.start('preloadLevelState');
}

function botonPersonaje4 () {
    game.state.start('preloadLevelState');
}
