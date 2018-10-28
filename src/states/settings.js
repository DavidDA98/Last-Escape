LastEscape.settingsState = function(game) {

}

var mute = false;

LastEscape.settingsState.prototype = {

    preload: function() {
        
    },

    create: function() {
        
        game.add.tileSprite(0, 0, 1280, 720, 'fondoMenu');
        nuevaPartida = game.add.button(480, 280, 'nuevaPartida', botonNuevaPartida, this, 1, 0);
        ayuda = game.add.button(480, 400, 'ayuda', botonAyuda, this, 1, 0);
        creditos = game.add.button(480, 520, 'creditos', botonCreditos, this, 1, 0);
        perfil = game.add.button(20, 520, 'perfil', botonPerfil, this, 1, 0);
        sonido = game.add.button(30, 630, 'boton_sonido', botonSonido, this, 1, 0);
    },

    update: function() {

    }
}

function botonNuevaPartida () {
    game.state.start('selectMapState');
}

function botonAyuda () {
    game.state.start('instructionsState');
}

function botonCreditos () {
    game.state.start('creditsState');
}

function botonPerfil () {
    game.state.start('profileState');
}

function botonSonido () {
    mute = true;
    game.state.start('menuState');
}
