////////////////////////////////////////////////////////////////
//Este archivo contiene las funciones que controlan al jugador//
////////////////////////////////////////////////////////////////

//Funcion que desplaza al jugador
function playerMovement () {
    player1.body.velocity.x = 0;
    player1.body.velocity.y = 0;

    if (shiftKey.isDown){
        vel = 50;
    }
    else {
        vel = 0;
    }

    if (wKey.isDown) {
        player1.body.velocity.y = -100 - vel;
        if(!walk.isPlaying){
            walk.play(10, true);
        }
    }
    else if (sKey.isDown) {
        player1.body.velocity.y = 100 + vel;
        if(!walk.isPlaying){
            walk.play(10, true);
        }
    }

    if (aKey.isDown) {
        player1.body.velocity.x = -100 - vel;
        if(!walk.isPlaying){
            walk.play(10, true);
        }
    }
    else if (dKey.isDown) {
        player1.body.velocity.x = 100 + vel;
        if(!walk.isPlaying){
            walk.play(10, true);
        }
    }

    if(!wKey.isDown && !sKey.isDown && !aKey.isDown && !dKey.isDown) {
        walk.stop(true);
    }

    player1.rotation = game.physics.arcade.angleToPointer(player1);
}

//Dispara una bala y establece el tiempo de espera hasta la siguiente
function fireBullet() {
    if(game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);
        if(bullet) {
            bullet.reset(player1.x, player1.y);
            bullet.rotation = game.physics.arcade.angleToPointer(bullet);
            cargador = cargador -1;
            
            switch(player1.armas[0]) {
	            case "pistola":
	            	velocidad = 300;
	            	bulletTime = game.time.now + 600;
	            	bullet.daño = 40;
	                balaPistola.play();
	            	break;
	            case "subfusil":
	            	velocidad = 400;
	            	bulletTime = game.time.now + 100;
	            	bullet.daño = 10;
	            	balaSubfusil.play();
	            	break;
	            case "fusil":
	            	velocidad = 400;
	            	bulletTime = game.time.now + 200;
	            	bullet.daño = 20;
	            	balaFusil.play();
	            	break;
	            case "ballesta":
	            	velocidad = 200;
	            	bulletTime = game.time.now + 6000;
	            	bullet.daño = 100;
	            	balaBallesta.play();
	            	break;
            }
            
            game.physics.arcade.moveToPointer(bullet, velocidad);
            
            putDisparo(game.input.worldX, game.input.worldY, bullet.daño, velocidad);
        }
    }
}

//Recarga el arma
function recargar() {
    cargador = cargador +10;
    cargadores = cargadores - 1;
    
    switch(player1.armas[0]) {
        case "pistola":
            recargarPistola.play();
        	break;
        case "subfusil":
        	recargarSubfusil.play();
        	break;
        case "fusil":
        	recargarFusil.play();
        	break;
        case "ballesta":
        	recargarBallesta.play();
        	break;
    }
}

//Intercambia la posicion de las dos armas del jugador
function cambiarArma() {
	if (player1.armas[0] !== 'vacio' && player1.armas[1] !== 'vacio') {
		var temp = player1.armas[0];
		player1.armas[0] = player1.armas[1];
		player1.armas[1] = temp;
		renderArmas();
	}
}

//Controles para interaccionar con los inventarios repartidos por el mapa
function colisionInventario(player, inventario) {
    if (eKey.isDown){
        if (!esperarE) {
            mostrarInventario(0, inventario.contenido);
            esperarE = true;
        }
    }

    if (key1.isDown && inventarioAbierto){
        if (!esperar1) {
            mostrarInventario(1, inventario.contenido, 0);
            esperar1 = true;
        }
    }

    if (key2.isDown && inventarioAbierto){
        if (!esperar2) {
            mostrarInventario(1, inventario.contenido, 1);
            esperar2 = true;
        }
    }

    if (!listaArmas.includes(game.listaObjetos[inventario.contenido])) {
    	if (key3.isDown && inventarioAbierto){
            if (!esperar3) {
                mostrarInventario(1, inventario.contenido, 2);
                esperar3 = true;
            }
        }

        if (key4.isDown && inventarioAbierto){
            if (!esperar4) {
                mostrarInventario(1, inventario.contenido, 3);
                esperar4 = true;
            }
        }
    }

    if (eKey.isUp) {
        esperarE = false;
    }

    if (key1.isUp) {
        esperar1 = false;
    }

    if (key2.isUp) {
        esperar2 = false;
    }

    if (key3.isUp) {
        esperar3 = false;
    }

    if (key4.isUp) {
        esperar4 = false;
    }
}

//Controles del inventario del jugador
function controlesInventario() {
    if (key1.isDown && player1.items[0] !== 'vacio'){
        if (!esperar1) {
            usarItem(0);
        }
    }

    if (key2.isDown && player1.items[1] !== 'vacio'){
        if (!esperar2) {
            usarItem(1);
        }
    }

    if (key3.isDown && player1.items[2] !== 'vacio'){
        if (!esperar3) {
            usarItem(2);
        }
    }

    if (key4.isDown && player1.items[3] !== 'vacio'){
        if (!esperar4) {
            usarItem(3);
        }
    }

    if (key1.isUp) {
        esperar1 = false;
    }

    if (key2.isUp) {
        esperar2 = false;
    }

    if (key3.isUp) {
        esperar3 = false;
    }

    if (key4.isUp) {
        esperar4 = false;
    }
}

//Esta función consume el objeto en la posicion "pos" del jugador y realiza sus efectos
function usarItem(pos) {
    switch(player1.items[pos]) {
        case 'medicina':
            if (player1.vida > 50) {
                player1.vida = 100;
            } else {
                player1.vida += 50;
            }
            actualizarVida()
            player1.items[pos] = 'vacio';
            break;
        case 'botiquin':
            player1.vida = 100;
            actualizarVida()
            player1.items[pos] = 'vacio';
            break;
        case 'pilas':
            player1.bateria = 9;
            barraBateria.frame = 9;
            tiempoBateria = game.time.now + 6666;
            player1.items[pos] = 'vacio';
            break;
        case 'balas':
            cargadores = cargadores + 1;
            player1.items[pos] = 'vacio';
            break;
    }
    renderInventario();
}