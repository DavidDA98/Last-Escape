LastEscape.matchmakingState = function(game) {
	
}

LastEscape.matchmakingState.prototype = {
		
	init: function() {
		game.connection.onmessage = function(msg) {
			data = JSON.parse(msg.data);
			if (data.metodo == "getNumPlayers") {
				if (data.longitud == 2 && game.jugador1 !== undefined) {
					console.log ('##### COMIENZA EL JUEGO #####');
					playerCreated = false;
					game.state.start('preloadLevelState');
				}
			}
			
			if (data.metodo == "createPlayer") {
				game.jugador1 = data.jugador;
				game.jugador1.muerto = 0;
				game.jugador1.salida = 0;
			}
		}
	},

    preload: function() {
		game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
		game.add.image(287, 360, 'esperando_jugador');
		carga = game.add.sprite(604, 440, 'loading_circle');
		carga.animations.add('loading_circle');
		carga.animations.play('loading_circle', 10, true);
    },

    create: function() {
    	var msg = {metodo: "createPlayer"};
    	game.connection.send(JSON.stringify(msg));
    },

    update: function() {
    	var msg = {metodo: "getNumPlayers"};
		game.connection.send(JSON.stringify(msg));
    },
}
