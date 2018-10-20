LastEscape.preloadLevelState = function(game) {

}

LastEscape.preloadLevelState.prototype = {

    preload: function() {
        game.load.spritesheet('ajustes', '/assets/images/PJ1_andar.png', 139, 140);
    },

    create: function() {
        game.state.start('levelState');
    },

    update: function() {

    }
}