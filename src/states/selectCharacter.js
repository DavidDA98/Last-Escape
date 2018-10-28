LastEscape.selectCharacterState = function(game) {

}

LastEscape.selectCharacterState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(280, 90, 720, 120, 'selec_personaje');
        atras4 = game.add.button(1050, 120, 'atras', botonAtras4, this, 1, 0);
        pj1 = game.add.button(120, 250, 'tabla_personaje', botonPersonaje1, this, 1, 0);
        pj2 = game.add.button(400, 250, 'tabla_personaje', botonPersonaje2, this, 1, 0);
        pj3 = game.add.button(670, 250, 'tabla_personaje', botonPersonaje3, this, 1, 0);
        pj4 = game.add.button(950, 250, 'tabla_personaje', botonPersonaje4, this, 1, 0);
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
