///////////////////////////////////////////////////////////////////////////////////////////////////
//Este archivo contiene las funciones que se encargan de mostrar distintos elementos por pantalla//
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////
//				LINTERNA				 //
///////////////////////////////////////////

//Proyecta rayos desde el jugador hasta que colisionen con las paredes, despues los une para crear una máscara
function calcularVision() {
    testP2 = true;
    testP3 = true;
    testP4 = true;

    game.player2.visible = false;
    
    if (game.jugadoresOnline > 2) {
    	game.player3.visible = false;
    }
    
    if (game.jugadoresOnline > 3) {
    	game.player4.visible = false;
    }

    longitudRayos = 120 + 5 * player1.bateria;

    mascaraVision.x = player1.x;
    mascaraVision.y = player1.y;
    anguloRaton = Math.atan2(player1.y-game.input.worldY,player1.x-game.input.worldX);

    mascaraVision.clear();
    mascaraVision.lineStyle(2, 0xffffff, 1);
    mascaraVision.beginFill(0xffff00);
    mascaraVision.moveTo(0,0);
    for(var i = 0; i<rayos; i++){	
        var anguloEntreRayos = anguloRaton-(FOV/2)+(FOV/rayos)*i
        var xFinal = player1.x;
        var yFinal = player1.y;
        for(var j= 1; j<=longitudRayos; j += 1){
            var xActual = Math.round(player1.x-(2*j)*Math.cos(anguloEntreRayos));
            var yActual = Math.round(player1.y-(2*j)*Math.sin(anguloEntreRayos));
            testPlayers(xActual, yActual);
            if(paredesBMP.getPixel32(xActual,yActual) == 0){
                xFinal = xActual;
                yFinal = yActual;
            }
            else{
                mascaraVision.lineTo(xFinal - player1.x,yFinal - player1.y);
                break;
            }
        }
        mascaraVision.lineTo(xFinal - player1.x,yFinal - player1.y);
    }
    mascaraVision.lineTo(0,0); 
    mascaraVision.endFill();
}

//Para cada punto de la mascara de la linterna, comprueba si hay un jugador enemigo. 
//Si lo hay, lo muestra y deja de comprobar ese jugador hasta ek siguiente frame.
function testPlayers(x, y) {
    if (testP2 == true && game.jugador2.muerto == 0) {
        if (x >= game.player2.x - 31 && x < game.player2.x + 36 && y >= game.player2.y - 28 && y < game.player2.y + 29) {
        	game.player2.visible = true;
            testP2 = false;
        }
    }

    if (testP3 == true && game.jugadoresOnline > 2 && game.jugador3.muerto == 0) {
        if (x >= game.player3.x - 31 && x < game.player3.x + 36 && y >= game.player3.y - 28 && y < game.player3.y + 29) {
        	game.player3.visible = true;
            testP3 = false;
        }
    }

    if (testP4 == true && game.jugadoresOnline > 3 && game.jugador4.muerto == 0) {
        if (x >= game.player4.x - 31 && x < game.player4.x + 36 && y >= game.player4.y - 28 && y < game.player4.y + 29) {
        	game.player4.visible = true;
            testP4 = false;
        }
    }
}

///////////////////////////////////////////
//					UI					 //
///////////////////////////////////////////

//Lee los datos del inventario del jugador y los muestra por pantalla
function renderInventario() {
    for (var i = 0; i < 4; i++) {
        objeto = player1.items[i];
        if (spriteItem[i] !== undefined) {
            spriteItem[i].kill();
        }
        if (objeto !== 'vacio') {
            spriteItem[i] = game.add.sprite(829 + 80*i, 648, objeto);
            spriteItem[i].scale.setTo(0.3, 0.3);
            spriteItem[i].fixedToCamera = true;
        }
    }
}

//Lee los datos de armas del jugador y las muestra por pantalla
function renderArmas() {
    arma = player1.armas[0];
    if (spriteArma[0] !== undefined) {
        spriteArma[0].kill();
    }
    if (arma !== 'vacio') {
        spriteArma[0] = game.add.sprite(1144, 602, arma);
        spriteArma[0].scale.setTo(0.6, 0.6);
        spriteArma[0].fixedToCamera = true;
    }

    arma = player1.armas[1];
    if (spriteArma[1] !== undefined) {
        spriteArma[1].kill();
    }
    if (arma !== 'vacio') {
        spriteArma[1] = game.add.sprite(1205, 547, arma);
        spriteArma[1].scale.setTo(0.3, 0.3);
        spriteArma[1].fixedToCamera = true;
    }
    
    player1.loadTexture(game.skin + player1.armas[0]);
	game.jugador1.skin = player1.key;
}

//Funcion que controla la barra de vida
function actualizarVida() {
    if (player1.vida < 10) {
        barraVida.frame = 0;
    }
    if (player1.vida >= 10 && player1.vida < 20) {
        barraVida.frame = 1;
    }
    if (player1.vida >= 20 && player1.vida < 30) {
        barraVida.frame = 2;
    }
    if (player1.vida >= 30 && player1.vida < 40) {
        barraVida.frame = 3;
    }
    if (player1.vida >= 40 && player1.vida < 50) {
        barraVida.frame = 4;
    }
    if (player1.vida >= 50 && player1.vida < 60) {
        barraVida.frame = 5;
    }
    if (player1.vida >= 60 && player1.vida < 70) {
        barraVida.frame = 6;
    }
    if (player1.vida >= 70 && player1.vida < 80) {
        barraVida.frame = 7;
    }
    if (player1.vida >= 80 && player1.vida < 90) {
        barraVida.frame = 8;
    }
    if (player1.vida >= 90 && player1.vida < 100) {
        barraVida.frame = 9;
    }
    if (player1.vida === 100) {
        barraVida.frame = 10;
    }
}

//Esta funcion controla la logica de los inventarios
//El modo 0 abre o cierra el inventario, dependiendo de como este este, no requiere el parametro pos
//El modo 1 intercambia el objeto del inventario del jugador en la posicion pos con el objeto mostrado, requiere de todos los parametros
function mostrarInventario(modo, indice, pos) {
  if(modo === 0) {
      if (!inventarioAbierto) {
          spriteCuadro = game.add.sprite(609, 329, 'cuadroInv');
          spriteCuadro.fixedToCamera = true;

          if (game.listaObjetos[indice] !== 'vacio') {
              spriteObjeto = game.add.sprite(618, 338, game.listaObjetos[indice]);
              spriteObjeto.scale.setTo(0.3, 0.3);
              spriteObjeto.fixedToCamera = true;
          }

          inventarioAbierto = true;
      } else {
      	if (spriteObjeto !== undefined) {
              spriteObjeto.kill();
              spriteObjeto.key = undefined;
      	}
          spriteCuadro.kill();
          inventarioAbierto = false;
      }
  }
  
  if(modo === 1) {
  	if (listaArmas.includes(game.listaObjetos[indice])) {
  		if(player1.armas[pos] === 'vacio') {
  			player1.armas[pos] = game.listaObjetos[indice];
  			game.listaObjetos[indice] = 'vacio';
  			mostrarInventario(0);
  			renderArmas();
          } else {
          	game.listaObjetos[indice] = player1.armas[pos];
              player1.armas[pos] = spriteObjeto.key;
              spriteObjeto.kill();
              spriteObjeto.key = undefined;
              
              spriteObjeto = game.add.sprite(618, 338, game.listaObjetos[indice]);
              spriteObjeto.scale.setTo(0.3, 0.3);
              spriteObjeto.fixedToCamera = true;
              renderArmas();
          }
  	} else {
  		if(player1.items[pos] === 'vacio') {
              player1.items[pos] = game.listaObjetos[indice];
              game.listaObjetos[indice] = 'vacio';
              mostrarInventario(0);
              renderInventario();
          } else {
              if (game.listaObjetos[indice] !== 'vacio') {
                  game.listaObjetos[indice] = player1.items[pos];
                  player1.items[pos] = spriteObjeto.key;
                  spriteObjeto.kill();
                  spriteObjeto.key = undefined;
              } else {
                  game.listaObjetos[indice] = player1.items[pos];
                  player1.items[pos] = 'vacio';
              }
              spriteObjeto = game.add.sprite(618, 338, game.listaObjetos[indice]);
              spriteObjeto.scale.setTo(0.3, 0.3);
              spriteObjeto.fixedToCamera = true;
              renderInventario();
          }
  	}
  	
  	putItem(indice);
  }
}