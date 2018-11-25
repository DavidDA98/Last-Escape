LastEscape.preloadState = function(game) {

}

var carga;

LastEscape.preloadState.prototype = {

    preload: function() {
        game.load.spritesheet('ajustes', '/assets/images/boton_ajustes.png', 80, 80);
        game.load.spritesheet('ayuda', '/assets/images/boton_como_jugar.png', 320, 80);
        game.load.spritesheet('creditos', '/assets/images/boton_creditos.png', 320, 80);
        game.load.spritesheet('nuevaPartida', '/assets/images/boton_nueva_partida.png', 320, 80);
        game.load.spritesheet('perfil', '/assets/images/boton_perfil.png', 80, 80);
        game.load.image('fondoMenu', '/assets/images/fondo_con_logo.png');
        game.load.image('pantallaCreditos', '/assets/images/creditos.png');
        game.load.image('fondoDesenfocado', '/assets/images/fondo_desenfocado.png');
        game.load.image('comoJugar1', '/assets/images/como_jugar_1.png');
        game.load.image('comoJugar2', '/assets/images/como_jugar_2.png');
        game.load.image('comoJugar3', '/assets/images/como_jugar_3.png');
        game.load.image('comoJugar4', '/assets/images/como_jugar_4.png');
        game.load.image('profile', '/assets/images/perfil.png');
        game.load.image('selec_escenario', '/assets/images/selec_escenario.png');
        game.load.image('edificio', '/assets/images/icono_edificio.png');
        game.load.image('carcel', '/assets/images/icono_carcel.png');
        game.load.image('hospital', '/assets/images/icono_hospital.png');
        game.load.image('cerrar', '/assets/images/boton_cerrar.png');
        game.load.image('delante', '/assets/images/boton_flecha.png');
        game.load.image('atras', '/assets/images/boton_atras.png');
        game.load.spritesheet('boton_sonido', '/assets/images/boton_sonido.png', 59, 59);
        game.load.image('tabla_personaje', '/assets/images/tabla_personaje.png');
        game.load.image('selec_personaje', '/assets/images/selec_personaje.png');
        game.load.image('pj1parado', '/assets/images/PJ1_parado.png');
        game.load.image('pj2parado', '/assets/images/PJ2_parado.png');
        game.load.image('pj3parado', '/assets/images/PJ3_parado.png');
        game.load.image('pj4parado', '/assets/images/PJ4_parado.png');
        game.load.image('login', '/assets/images/inicio_sesion.png');
    },

    create: function() {
        carga = game.add.sprite(40, 610, 'loading', 0);
        carga.animations.add('carga');
        carga2 = carga.animations.getAnimation('carga');
        carga2.play('carga', true);
        var mute = false;
        game.state.start('titleState');
    },

    update: function() {

    }
}