LastEscape.preloadState = function(game) {

}

LastEscape.preloadState.prototype = {

    preload: function() {
        game.load.spritesheet('ajustes', '/assets/images/boton_ajustes.png', 80, 80);
        game.load.spritesheet('ayuda', '/assets/images/boton_como_jugar.png', 320, 80);
        game.load.spritesheet('creditos', '/assets/images/boton_creditos.png', 320, 80);
        game.load.spritesheet('nuevaPartida', '/assets/images/boton_nueva_partida.png', 320, 80);
        game.load.spritesheet('perfil', '/assets/images/boton_perfil.png', 80, 80);
        game.load.image('fondoMenu', '/assets/images/fondo_con_logo.png');
    },

    create: function() {
        game.state.start('menuState');
    },

    update: function() {

    }
}