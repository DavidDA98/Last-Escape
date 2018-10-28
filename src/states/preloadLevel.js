LastEscape.preloadLevelState = function(game) {

}

LastEscape.preloadLevelState.prototype = {

    preload: function() {
        game.load.spritesheet('pj1andar', '/assets/animations/PJ1_andar.png', 139, 140);
        game.load.image('bgClaro', '/assets/images/escenario_edificio.png', 2920, 1920);
        game.load.image('colisionBox', '/assets/images/colision.png');
        game.load.image('bala_pistola', '/assets/images/balas/bala_pistola.png');
        game.load.image('paredesBMP', '/assets/images/escenario_colision_luz.png');
        game.load.image('bgOscuro', '/assets/images/escenario_edificio_oscuro.png');
        game.load.audio('sonido_pistola', '/assets/audio/sonido_pistola.mp3');
        game.load.audio('sonido_recargar_pistola', '/assets/audio/sonido_recargar_pistola.mp3');
        game.load.image('cuadroInv', '/assets/images/cuadro_objeto.png');

        //Armas
        game.load.image('cuchillo', '/assets/images/armas/cuchillo.png');
        game.load.image('pistola', '/assets/images/armas/pistola.png');
        /*game.load.image('ballesta', '/assets/images/armas/ballesta.png');
        game.load.image('fusil', '/assets/images/armas/fusil.png');
        game.load.image('subfusil', '/assets/images/armas/subfusil.png');*/

        //Objetos
        game.load.image('botiquin', '/assets/images/objetos/obj_botiquin.png');
        game.load.image('fusible', '/assets/images/objetos/obj_fusible.png');
        game.load.image('tarjeta', '/assets/images/objetos/obj_tarjeta.png');
        game.load.image('medicina', '/assets/images/objetos/obj_medicina.png');
        game.load.image('pilas', '/assets/images/objetos/obj_pilas.png');
        game.load.image('identificacion1', '/assets/images/objetos/obj_id_azul.png');
        game.load.image('identificacion2', '/assets/images/objetos/obj_id_amarilla.png');
        game.load.image('identificacion3', '/assets/images/objetos/obj_id_naranja.png');
        game.load.image('identificacion4', '/assets/images/objetos/obj_id_roja.png');
        game.load.image('identificacion5', '/assets/images/objetos/obj_id_rosa.png');
        game.load.image('identificacion6', '/assets/images/objetos/obj_id_verde.png');
        game.load.image('balas', '/assets/images/objetos/balas.png');

        //Tilemaps
        game.load.tilemap('mapa', 'assets/tilemaps/CollisionMap.csv', null, Phaser.Tilemap.CSV);
        game.load.tilemap('posInventarios', 'assets/tilemaps/inventarios.csv', null, Phaser.Tilemap.CSV);

        //UI
        game.load.image('inventario', '/assets/images/inventario.png');
        game.load.spritesheet('barraVida', '/assets/animations/salud.png', 464, 45);
        game.load.spritesheet('barraBateria', '/assets/animations/linterna.png', 356, 45);

        //Gameflow
        game.load.image('luzGenerador', '/assets/images/luz_verde_generador.png');
        game.load.image('luzSala', '/assets/images/luz_verde_control.png');
    },

    create: function() {
        carga = game.add.sprite(40, 610, 'loading', 0);
        carga.animations.add('carga');
        carga2 = carga.animations.getAnimation('carga');
        carga2.play('carga', true);
        game.state.start('levelState');
    },

    update: function() {

    }
}