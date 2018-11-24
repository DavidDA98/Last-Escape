LastEscape.matchmakingState = function(game) {
	
}

LastEscape.matchmakingState.prototype = {
		
	init: function() {
		getNumPlayers(function (numPlayers) {
			if (numPlayers.length > 1) {
				console.log ('==========================================================');
				console.log ('= El servidor está lleno. Vuelve a intentarlo más tarde. =');
				console.log ('==========================================================');
				game.state.start('selectCharacterState');
			}
		});
	},

    preload: function() {
		game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
		game.add.image(287, 360, 'esperando_jugador');
		carga = game.add.sprite(604, 440, 'loading_circle');
		carga.animations.add('loading_circle');
		carga.animations.play('loading_circle', 10, true);
    },

    create: function() {
    	createPlayer();
    },

    update: function() {
    	getNumPlayers(function (numPlayers) {
			if (numPlayers.length === 2) {
				console.log ('##### COMIENZA EL JUEGO #####');
				game.state.start('preloadLevelState');
			}
		});
    },
}

function getNumPlayers(callback) {
	var url = window.location.href + '/LastEscape';
	$.ajax({
		url: url,
	}).done(function (data) {
		callback(data);
	})
}

function createPlayer() {
	var url = window.location.href + '/LastEscape';
	$.ajax({
		method: "POST",
		url: url,
		processData: false,
		headers: {
			"Content-Type": "application/json"
		},
	}).done(function (data) {
		console.log("Player create: " + JSON.stringify(data));
		game.jugador1 = data;
	})
}
