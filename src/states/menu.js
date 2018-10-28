LastEscape.menuState = function(game) {

}

LastEscape.menuState.prototype = {

    preload: function() {
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
        game.add.tileSprite(0, 0, 1280, 720, 'fondoMenu');

        nuevaPartida = game.add.button(480, 280, 'nuevaPartida', botonNuevaPartida, this, 1, 0);
        ayuda = game.add.button(480, 400, 'ayuda', botonAyuda, this, 1, 0);
        creditos = game.add.button(480, 520, 'creditos', botonCreditos, this, 1, 0);
        perfil = game.add.button(20, 520, 'perfil', botonPerfil, this, 1, 0);
        ajustes = game.add.button(20, 620, 'ajustes', botonAjustes, this, 1, 0);
    },

    update: function() {
        
    },
}

function botonNuevaPartida () {
    game.state.start('selectMapState');
}

function botonAyuda () {
    game.state.start('instructionsState');
}

function botonCreditos () {
    game.state.start('creditsState');
}

function botonPerfil () {
    game.state.start('profileState');
}

function botonAjustes () {
    game.state.start('settingsState');
}