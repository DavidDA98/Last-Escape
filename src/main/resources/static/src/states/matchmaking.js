LastEscape.matchmakingState = function(game) {
	
}

LastEscape.matchmakingState.prototype = {
		
	init: function() {
		game.connection.onerror = function(e) {
			console.log("WS error: " + e);
		}
		game.connection.onmessage = function(msg) {
			console.log(msg.data);
			data = JSON.parse(msg.data);
			console.log(data.metodo);
			if (data.metodo == "getNumPlayers") {
				if (data.longitud > 1 && game.jugador1 === null) {
					console.log ('==========================================================');
					console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
					console.log ('==========================================================');
					game.state.start('selectCharacterState');
				}
				
				if (data.longitud == 2 && game.jugador1 !== null) {
					console.log ('##### COMIENZA EL JUEGO #####');
					game.state.start('preloadLevelState');
				}
			}
			
			if (data.metodo == "createPlayer") {
				game.jugador1 = data.jugador;
				console.log(game.jugador1);
			}
		}
		
		var msg = {metodo: "getNumPlayers"};
		game.connection.send(JSON.stringify(msg));
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
