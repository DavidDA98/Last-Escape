game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', LastEscape.bootState)
game.state.add('titleState', LastEscape.titleState)
game.state.add('loginState', LastEscape.loginState)
game.state.add('preloadState', LastEscape.preloadState)
game.state.add('menuState', LastEscape.menuState)
game.state.add('creditsState', LastEscape.creditsState)
game.state.add('instructionsState', LastEscape.instructionsState)
game.state.add('instructions2State', LastEscape.instructions2State)
game.state.add('instructions3State', LastEscape.instructions3State)
game.state.add('instructions4State', LastEscape.instructions4State)
game.state.add('profileState', LastEscape.profileState)
game.state.add('settingsState', LastEscape.settingsState)
game.state.add('selectMapState', LastEscape.selectMapState)
game.state.add('selectNumPlayersState', LastEscape.selectNumPlayersState)
game.state.add('selectCharacterState', LastEscape.selectCharacterState)
game.state.add('matchmakingState', LastEscape.matchmakingState)
game.state.add('preloadLevelState', LastEscape.preloadLevelState)
game.state.add('levelState', LastEscape.levelState)
game.state.add('resultsState', LastEscape.resultsState)

game.connection = new WebSocket('ws://' + window.location.hostname + ':8085/game');

game.connection.onerror = function(e) {
	console.log("WS error: " + e);
}

game.connection.onmessage = function(msg) {
	data = JSON.parse(msg.data);
	switch (data.metodo) {
		case "getMatchmakingState":
			game.jugadoresOnline = data.jugadores;
			game.gameState = data.gameState;
			break;
			
		case "createPlayer":
			game.jugador1 = data.jugador;
			game.jugador1.skin = game.skin;
			break;
			
		case "getGameState":
			
			switch (game.jugador1.id) {
			case 1:
				game.jugador1 = data.jugador1;
				game.jugador2 = data.jugador2;
				
				if (game.jugadoresOnline > 2) {
					game.jugador3 = data.jugador3;
				}
				
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
				}
				
				break;
			case 2:
				game.jugador1 = data.jugador2;
				game.jugador2 = data.jugador1;
				
				if (game.jugadoresOnline > 2) {
					game.jugador3 = data.jugador3;
				}
			
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
				}
				
				break;
			case 3:
				game.jugador1 = data.jugador3;
				game.jugador2 = data.jugador2;
				game.jugador3 = data.jugador1;
				
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
				}
				
				break;
			case 4:
				game.jugador1 = data.jugador4;
				game.jugador2 = data.jugador2;
				game.jugador3 = data.jugador3;
				game.jugador4 = data.jugador1;
				break;
			}
			
			listaObjetos = data.items;
			fusiblesRestantes = data.fusiblesRestantes;
			break;
			
		case "getId":
			idCorrecta = data.id;
			break;
			
		case "getSkin":
			if (data.id == game.jugador2.id){
				game.jugador2.skin = data.skin;
			}
			break;
			
		case "putDisparo":
			if (data.id != game.jugador1.id) {
				if (data.id == game.jugador2.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador2.x, game.jugador2.y);
				} else if (data.id == game.jugador3.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador3.x, game.jugador3.y);
				} else if (data.id == game.jugador4.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador4.x, game.jugador4.y);
				}
			}
			
			break;
		case "sendCadaver":
			crearCadaver(data.x, data.y, data.items);
			break;
			
		case "cadaverDestruido":
			grupoCadaveres.forEach(destruirCadaver, this, true, data.x, data.y, data.item);
			break;
	}
}

game.state.start('bootState')