LastEscape.preloadLevelState = function(game) {

}

LastEscape.preloadLevelState.prototype = {

    preload: function() {
        game.load.spritesheet('pj1andar', '/assets/animations/PJ1_andar.png', 139, 140);
        game.load.image('background', '/assets/images/escenario_edificio.png', 2920, 1920);
        game.load.image('pared', '/assets/images/colision.png', 8, 8);
        game.load.image('bala_pistola', '/assets/images/bala_pistola.png');
    },

    create: function() {
        game.state.start('levelState');
    },

    update: function() {

    }
}