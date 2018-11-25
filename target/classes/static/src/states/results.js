LastEscape.resultsState = function(game) {

}

LastEscape.resultsState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        game.add.tileSprite(279, 120, 721, 479, 'resultados');
        cerrar = game.add.button(955, 125, 'cerrar', botonCerrar, this, 1, 0);
        if (game.jugador2.salida == 1) {
        	borrarJugadores();
        }
    },

    update: function() {

    }
}

function botonCerrar () {
    game.state.start('menuState');
}

function borrarJugadores() {
	$.ajax({
		method: "POST",
		url: window.location.href + '/finpartida',
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
	}).done(function (data) {
		
	})
}
