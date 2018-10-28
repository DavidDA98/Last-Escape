var LastEscape = {}

LastEscape.bootState = function(game) {

}

LastEscape.bootState.prototype = {

    preload: function() {
        game.load.spritesheet('loading', '/assets/animations/carga.png', 291, 84);
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('preloadState');
    },

    update: function() {

    }
}