//////////////////////////////////////////////////////////////////////////////
//Este archivo contiene las funciones que se encargan de manejar la conexion//
//////////////////////////////////////////////////////////////////////////////

//Creacion de la conexion
game.connection = new WebSocket('ws://' + window.location.hostname + ':8085/game');

//Funcion onError
game.connection.onerror = function(e) {
	console.log("WS error: " + e);
}

//Funcion que maneja los mensajes recibidos por el servidor
game.connection.onmessage = function(msg) {
	data = JSON.parse(msg.data);
	switch (data.metodo) {
		//Devuelve los jugadores buscando partida y si hay una partida en curso
		case "getMatchmakingState":
			game.jugadoresOnline = data.jugadores;
			game.gameState = data.gameState;
			break;
		//Devuelve los datos del juegador creado en el servidor
		case "createPlayer":
			game.jugador1 = data.jugador;
			game.jugador1.skin = game.skin;
			break;
		//Devuelve todos los datos del estado actual del juego	
		case "getGameState":
			//Dependiendo de que jugador seas se almacenan los datos en el resto de jugadores
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
			
			game.listaObjetos = data.items;
			fusiblesRestantes = data.fusiblesRestantes;
			break;
		//Devuelve la identificacion que abre la puerta
		case "getId":
			idCorrecta = data.id;
			break;
		//Devuelve el disparo que realiza un jugador	
		case "putDisparo":
			if (data.id != game.jugador1.id) {
				if (data.id == game.jugador2.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador2.x, game.jugador2.y, data.disparo.daño, data.disparo.velocidad);
				} else if (data.id == game.jugador3.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador3.x, game.jugador3.y, data.disparo.daño, data.disparo.velocidad);
				} else if (data.id == game.jugador4.id) {
					fireBulletOtherPlayer(data.disparo.x, data.disparo.y, game.jugador4.x, game.jugador4.y, data.disparo.daño, data.disparo.velocidad);
				}
			}
			
			break;
		//Devuelve el cadaver creado
		case "sendCadaver":
			crearCadaver(data.x, data.y, data.items);
			break;
		//Devuelve el cadaver destruido	
		case "cadaverDestruido":
			grupoCadaveres.forEach(destruirCadaver, this, true, data.x, data.y, data.item);
			break;
	}
}

///////////////////////////////////////////
//		MENSAJES PARA EL SERVIDOR		 //
///////////////////////////////////////////

//Pide el estado del juego
function getGameState() {
	var msg = {metodo: "getGameState"};
	game.connection.send(JSON.stringify(msg));
}

//Sube los datos de tu jugador
function putPlayer() {
	game.jugador1.x = player1.x;
	game.jugador1.y = player1.y;
	game.jugador1.rotacion = player1.rotation;
	if (player1.vida > 0) {
		game.jugador1.muerto = 0;
	} else {
		game.jugador1.muerto = 1;
	}
	
	var msg = {metodo: "putPlayer", jugador: game.jugador1};
	game.connection.send(JSON.stringify(msg));
}

//Sube los datos del inventario editado
function putItem(index) {
	var msg = {metodo: "putItem", indice: index, item: game.listaObjetos[index]};
	game.connection.send(JSON.stringify(msg));
}

//Sube los datos del disparo realizado
function putDisparo(x, y, daño, velocidad) {
    game.disparo = {x: x, y: y, daño: daño, velocidad: velocidad};
    var msg = {metodo: "putDisparo", id: game.jugador1.id, disparo: game.disparo};
    game.connection.send(JSON.stringify(msg));
}

//Pide la identificacion necesaria para abrir la puerta al servidor
function getID() {
	var msg = {metodo: "getId"};
	game.connection.send(JSON.stringify(msg));
}

//Sube los fusibles restantes para activar el generador
function putFusibles() {
	var msg = {metodo: "putFusibles", fusiblesRestantes: fusiblesRestantes};
	game.connection.send(JSON.stringify(msg));
}

//Sube el cadaver del jugador cuando muere
function sendCadaver(x, y, items) {
	var msg = {metodo: "sendCadaver", x: x, y: y, items: items};
	game.connection.send(JSON.stringify(msg));
}

//Sube los datos necesarios del objeto recogido del suelo
function cadaverDestruido(x, y, item) {
	var msg = {metodo: "cadaverDestruido", x: x, y: y, item: item};
	game.connection.send(JSON.stringify(msg));
}