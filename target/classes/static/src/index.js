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
			console.log(data.jugador.id);
			game.jugador1 = data.jugador;
			game.jugador1.skin = game.skin;
			break;
			
		case "getGameState":
			
			switch (game.jugador1.id) {
			case 1:
				game.jugador1 = data.jugador1;
				
				game.jugador2 = data.jugador2;
				if (data.disparo2.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo2.x, data.disparo2.y);
				}
				
				if (game.jugadoresOnline > 2) {
					game.jugador3 = data.jugador3;
					if (data.disparo3.hayDisparo == 1) {
						fireBulletOtherPlayer(data.disparo3.x, data.disparo3.y);
					}
				}
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
					if (data.disparo4.hayDisparo == 1) {
						fireBulletOtherPlayer(data.disparo4.x, data.disparo4.y);
					}
				}
				break;
			case 2:
				game.jugador1 = data.jugador2;
				
				game.jugador2 = data.jugador1;
				if (data.disparo1.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo1.x, data.disparo1.y);
				}
				
				if (game.jugadoresOnline > 2) {
					game.jugador3 = data.jugador3;
					if (data.disparo3.hayDisparo == 1) {
						fireBulletOtherPlayer(data.disparo3.x, data.disparo3.y);
					}
				}
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
					if (data.disparo4.hayDisparo == 1) {
						fireBulletOtherPlayer(data.disparo4.x, data.disparo4.y);
					}
				}
				break;
			case 3:
				game.jugador1 = data.jugador3;
				
				game.jugador2 = data.jugador2;
				if (data.disparo2.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo2.x, data.disparo2.y);
				}
				
				game.jugador3 = data.jugador1;
				if (data.disparo1.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo1.x, data.disparo1.y);
				}
				
				if (game.jugadoresOnline > 3) {
					game.jugador4 = data.jugador4;
					if (data.disparo4.hayDisparo == 1) {
						fireBulletOtherPlayer(data.disparo4.x, data.disparo4.y);
					}
				}
				break;
			case 4:
				game.jugador1 = data.jugador4;
				
				game.jugador2 = data.jugador2;
				if (data.disparo2.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo2.x, data.disparo2.y);
				}
				
				game.jugador3 = data.jugador3;
				if (data.disparo3.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo3.x, data.disparo3.y);
				}
				
				game.jugador4 = data.jugador1;
				if (data.disparo1.hayDisparo == 1) {
					fireBulletOtherPlayer(data.disparo1.x, data.disparo1.y);
				}
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
	}
}

game.state.start('bootState')