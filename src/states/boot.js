var LastEscape = {}

LastEscape.bootState = function(game) {

}

LastEscape.bootState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.state.start('preloadState');
    },

    update: function() {

    }
}