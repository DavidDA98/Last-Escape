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
        game.load.image('atras', '/assets/images/boton_flecha_izq.png');
        game.load.spritesheet('boton_sonido', '/assets/images/boton_sonido.png', 59, 59);
    },

    create: function() {
        game.state.start('menuState');
    },

    update: function() {

    }
}