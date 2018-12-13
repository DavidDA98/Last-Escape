LastEscape.matchmakingState = function(game) {
	
}

LastEscape.matchmakingState.prototype = {

    preload: function() {
		game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
		game.add.image(287, 360, 'esperando_jugador');
		carga = game.add.sprite(604, 440, 'loading_circle');
		carga.animations.add('loading_circle');
		carga.animations.play('loading_circle', 10, true);
    },

    create: function() {
    	var msg = {metodo: "createPlayer", skin: game.skin};
    	game.connection.send(JSON.stringify(msg));
    },

    update: function() {
    	var msg = {metodo: "getMatchmakingState"};
		game.connection.send(JSON.stringify(msg));

		if (game.jugador1 !== undefined) {
			if (game.gameState == 1) {
				var msg = {metodo: "getGameState", id: game.jugador1.id};
				game.connection.send(JSON.stringify(msg));
				game.state.start('preloadLevelState');
			}
			
			if (game.jugadoresOnline == game.jugadoresNecesarios) {
				var msg = {metodo: "comenzarJuego"};
		    	game.connection.send(JSON.stringify(msg));
			}
		}
    },
}
