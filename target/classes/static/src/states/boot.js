var LastEscape = {}

LastEscape.bootState = function(game) {

}

LastEscape.bootState.prototype = {

    preload: function() {
        game.load.spritesheet('loading', '/assets/animations/carga.png', 291, 84);
        game.load.spritesheet('loading_circle', '/assets/animations/circulo_carga.png', 71, 70);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.connection = new WebSocket('ws://' + window.location.hostname + ':8085/game');
        game.state.start('preloadState');
    },

    update: function() {

    }
}