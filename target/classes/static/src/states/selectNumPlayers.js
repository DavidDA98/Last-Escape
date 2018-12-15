LastEscape.selectNumPlayersState = function(game) {

}

LastEscape.selectNumPlayersState.prototype = {

    preload: function() {
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.button(150, 250, 'boton2jugadores', boton2Jugadores, this, 1, 0);
        game.add.button(515, 250, 'boton3jugadores', boton3Jugadores, this, 1, 0);
        game.add.button(880, 250, 'boton4jugadores', boton4Jugadores, this, 1, 0);
        game.add.button(1075, 150, 'atras', botonAtras, this, 1, 0);
    },

    update: function() {
    }
}

function boton2Jugadores () {
    game.jugadoresNecesarios = 2;
    game.state.start('selectCharacterState');
}

function boton3Jugadores () {
    game.jugadoresNecesarios = 3;
    game.state.start('selectCharacterState');
}

function boton4Jugadores () {
    game.jugadoresNecesarios = 4;
    game.state.start('selectCharacterState');
}

function botonAtras () {
    game.state.start('selectMapState');
}
