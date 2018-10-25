LastEscape.preloadLevelState = function(game) {

}

LastEscape.preloadLevelState.prototype = {

    preload: function() {
        game.load.spritesheet('pj1andar', '/assets/animations/PJ1_andar.png', 139, 140);
        game.load.image('bgClaro', '/assets/images/escenario_edificio.png', 2920, 1920);
        game.load.tilemap('mapa', 'assets/tilemaps/CollisionMap.csv', null, Phaser.Tilemap.CSV);
        game.load.image('pared', '/assets/images/colision.png');
        game.load.image('bala_pistola', '/assets/images/bala_pistola.png');
        game.load.image('paredesBMP', '/assets/images/escenario_colision_luz.png');
        game.load.image('bgOscuro', '/assets/images/escenario_edificio_oscuro.png');
    },

    create: function() {
        game.state.start('levelState');
    },

    update: function() {

    }
}