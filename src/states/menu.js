LastEscape.menuState = function(game) {

}

LastEscape.menuState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoMenu');

        nuevaPartida = game.add.button(480, 280, 'nuevaPartida', botonNuevaPartida, this, 1, 0);
        ayuda = game.add.button(480, 400, 'ayuda', botonAyuda, this, 1, 0);
        creditos = game.add.button(480, 520, 'creditos', botonCreditos, this, 1, 0);
        perfil = game.add.button(20, 520, 'perfil', botonPerfil, this, 1, 0);
        ajustes = game.add.button(20, 620, 'ajustes', botonAjustes, this, 1, 0);
    },

    update: function() {
        
    },
}

function botonNuevaPartida () {
    game.state.start('preloadLevelState');
}

function botonAyuda () {

}

function botonCreditos () {

}

function botonPerfil () {

}

function botonAjustes () {

}