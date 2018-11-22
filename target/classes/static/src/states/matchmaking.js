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
    	var text = "- MatchMaking -\n Esperando otro jugador \n para iniciar partida.";
        var style = { font: "45px Arial", fill: "#0040FF", align: "center" };
        var t = game.add.text(game.world.centerX - 200, 0, text, style);
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