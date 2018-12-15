LastEscape.preloadLevelState = function(game) {

}

LastEscape.preloadLevelState.prototype = {
		
    preload: function() {
    	//PJs
        game.load.spritesheet('pj1', '/assets/animations/PJ1_andar.png', 140, 140);
        game.load.spritesheet('pj2', '/assets/animations/PJ2_andar.png', 140, 140);
        game.load.spritesheet('pj3', '/assets/animations/PJ3_andar.png', 140, 140);
        game.load.spritesheet('pj4', '/assets/animations/PJ4_andar.png', 140, 140);
        
        game.load.spritesheet('pj1pistola', '/assets/animations/PJ1_pistola.png', 160, 140);
        game.load.spritesheet('pj2pistola', '/assets/animations/PJ2_pistola.png', 160, 140);
        game.load.spritesheet('pj3pistola', '/assets/animations/PJ3_pistola.png', 160, 140);
        game.load.spritesheet('pj4pistola', '/assets/animations/PJ4_pistola.png', 160, 140);
        
        game.load.spritesheet('pj1ballesta', '/assets/animations/PJ1_ballesta.png', 175, 140);
        game.load.spritesheet('pj2ballesta', '/assets/animations/PJ2_ballesta.png', 175, 140);
        game.load.spritesheet('pj3ballesta', '/assets/animations/PJ3_ballesta.png', 175, 140);
        game.load.spritesheet('pj4ballesta', '/assets/animations/PJ4_ballesta.png', 175, 140);
        
        game.load.spritesheet('pj1fusil', '/assets/animations/PJ1_fusil.png', 200, 140);
        game.load.spritesheet('pj2fusil', '/assets/animations/PJ2_fusil.png', 200, 140);
        game.load.spritesheet('pj3fusil', '/assets/animations/PJ3_fusil.png', 200, 140);
        game.load.spritesheet('pj4fusil', '/assets/animations/PJ4_fusil.png', 200, 140);
        
        game.load.spritesheet('pj1subfusil', '/assets/animations/PJ1_subfusil.png', 175, 140);
        game.load.spritesheet('pj2subfusil', '/assets/animations/PJ2_subfusil.png', 175, 140);
        game.load.spritesheet('pj3subfusil', '/assets/animations/PJ3_subfusil.png', 175, 140);
        game.load.spritesheet('pj4subfusil', '/assets/animations/PJ4_subfusil.png', 175, 140);
        
        //Mundo
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
        game.load.image('ballesta', '/assets/images/armas/ballesta.png');
        game.load.image('fusil', '/assets/images/armas/fusil.png');
        game.load.image('subfusil', '/assets/images/armas/subfusil.png');

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

        game.load.image('test', '/assets/images/test.png');
    },

    create: function() {
        carga = game.add.sprite(40, 610, 'loading');
		carga.animations.add('loading');
		carga.animations.play('loading', 10, true);
		game.state.start('levelState');
    },

    update: function() {

    }
}