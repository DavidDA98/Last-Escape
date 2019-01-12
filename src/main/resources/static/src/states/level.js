LastEscape.levelState = function(game) {

}
//Variables disparo
var bullets;
var cargador = 10;
var cargadores = 0;
var bulletTime = 0;
var fireButton;

//Variables mapa
var mapa;
var capa;

//Variables vision
var FOV = Math.PI/3;
var rayos = 30;
var longitudRayos = 120;
var paredesBMP;
var tiempoBateria;
var anguloRaton;
var grupoJugadores;
var testP2 = true;
var testP3 = true;
var testP4 = true;

//Variables correr
var vel = 0;

//Variables inventario
var spriteItem = new Array(4);
var spriteArma = new Array(2);
var inventarios = new Array(64);
var index = 0;
var esperarE = false;
var esperarQ = false;
var esperar1 = false;
var esperar2 = false;
var esperar3 = false;
var esperar4 = false;
var esperarSpace = false;
var spriteObjeto;
var spriteCuadro;
var inventarioAbierto = false;
var listaArmas = ['fusil', 'pistola', 'ballesta', 'subfusil'];

//Variables cadaveres
var grupoCadaveres;

//Variables interfaz
var barraVida;
var barraBateria;

//Game Flow
var generador;
var generadorEncendido = false;
var fusiblesRestantes = 4;
var salaDeControl;
var idCorrecta;
var bloqueoPuertas = new Array(2);
var salida = new Array(2);
var esperarF = false;

var spawnX;
var spawnY;

var jugadorVivo = true;
var respawnTime;

LastEscape.levelState.prototype = {
		
	init: function() {
		getID();
	},

    preload: function() {
        game.load.image('resultados', '/assets/images/resultados.png');
    },

    create: function() {
        game.world.setBounds(0, 0, 2920, 1920);
        game.add.sprite(0, 0, 'bgOscuro');

        mapa = game.add.tilemap('mapa', 20, 20);
        mapa.addTilesetImage('colisionBox');
        capa = mapa.createLayer(0);
        capa.resizeWorld();
        mapa.setCollision(0);

        //Input
        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        lKey = game.input.keyboard.addKey(Phaser.Keyboard.L);
        rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
        qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        fireButton = game.input.mousePointer;
        
        //Vision
        paredesBMP = game.make.bitmapData(2920, 1920);
		paredesBMP.draw("paredesBMP");
        paredesBMP.update();
        mascaraVision = this.game.add.graphics(0, 0);
        bgClaro = game.add.sprite(0, 0, 'bgClaro');
        bgClaro.mask = mascaraVision;
        game.physics.arcade.enable(mascaraVision);

        //Disparo
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(40,'bala_pistola');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        //Sonido disparo
        balaPistola = game.add.audio('sonido_pistola',0.05);
        balaSubfusil = game.add.audio('sonido_subfusil',0.05);
        balaFusil = game.add.audio('sonido_fusil',0.05);
        balaBallesta = game.add.audio('sonido_ballesta',0.05);
        recargarPistola = game.add.audio('sonido_recargar_pistola',0.05);
        recargarSubfusil = game.add.audio('sonido_recargar_subfusil',0.05);
        recargarFusil = game.add.audio('sonido_recargar_fusil',0.05);
        recargarBallesta = game.add.audio('sonido_recargar_ballesta',0.05);

        //Cadaveres
        grupoCadaveres = game.add.group();
        
        //Jugadores
        grupoJugadores = game.add.group();
        spawnX = game.jugador1.x;
        spawnY = game.jugador1.y;
        player1 = game.add.sprite(game.jugador1.x, game.jugador1.y, game.jugador1.skin, 0);
        player1.scale.setTo(0.4, 0.4);
        player1.anchor.setTo(0.47,0.5);
        walk = player1.animations.add('walk');
        game.physics.enable(player1, Phaser.Physics.ARCADE);
        player1.armas = new Array(2);
        player1.items = new Array(4);
        player1.vida = 100;
        player1.bateria = 0;
        player1.puedeSalir = false;
        
        player1.items[0] = 'vacio';
        player1.items[1] = 'vacio';
        player1.items[2] = 'vacio';
        player1.items[3] = 'vacio';
        
        player1.armas[0] = 'pistola';
        player1.armas[1] = 'vacio';
        
    	game.player2 = game.add.sprite(game.jugador2.x, game.jugador2.y, game.jugador2.skin, 0);
    	game.player2.scale.setTo(0.4, 0.4);
    	game.player2.anchor.setTo(0.47,0.5);
        game.physics.enable(game.player2, Phaser.Physics.ARCADE);
        game.player2.visible = false;
        grupoJugadores.add(game.player2);
        
        if (game.jugadoresOnline > 2) {
        	game.player3 = game.add.sprite(game.jugador3.x, game.jugador3.y, game.jugador3.skin, 0);
        	game.player3.scale.setTo(0.4, 0.4);
        	game.player3.anchor.setTo(0.47,0.5);
            game.physics.enable(game.player3, Phaser.Physics.ARCADE);
            game.player3.visible = false;
            grupoJugadores.add(game.player3);
        }

        if (game.jugadoresOnline > 3) {
        	game.player4 = game.add.sprite(game.jugador4.x, game.jugador4.y, game.jugador4.skin, 0);
        	game.player4.scale.setTo(0.4, 0.4);
        	game.player4.anchor.setTo(0.47,0.5);
            game.physics.enable(game.player4, Phaser.Physics.ARCADE);
            game.player4.visible = false;
            grupoJugadores.add(game.player4);
        }

        game.camera.follow(player1, 0.5, 0.5);

        hit = game.add.sprite(0, 0, 'colisionBox');
        hit.scale.setTo(5, 5);
        game.physics.enable(hit, Phaser.Physics.ARCADE);
        hit.kill();

        //Interfaz
        inventarioUI = game.add.sprite(820, 540, 'inventario');
        inventarioUI.fixedToCamera = true;

        renderArmas();

        barraVida = game.add.sprite(20, 650, 'barraVida', 10);
        barraVida.fixedToCamera = true;
        barraVida.animations.add('vida');
        barraVida = barraVida.animations.getAnimation('vida');

        barraBateria = game.add.sprite(20, 590, 'barraBateria', 0);
        barraBateria.fixedToCamera = true;
        barraBateria.animations.add('bateria');
        barraBateria = barraBateria.animations.getAnimation('bateria');

        mapaInventarios = game.add.tilemap('posInventarios', 20, 20);
        index = 0;
        mapaInventarios.forEach(generarInventarios, this, 0, 0, 146, 96);
        llenarInventarios();

        //Gameflow
        generador = game.add.sprite(560, 1330, 'colisionBox');
        game.physics.enable(generador, Phaser.Physics.ARCADE);
        salaDeControl = game.add.sprite(1430, 1000, 'colisionBox');
        game.physics.enable(salaDeControl, Phaser.Physics.ARCADE);
        salaDeControl.scale.setTo(5, 1);

        bloqueoPuertas[0] = game.add.sprite(440, 20, 'colisionBox');
        bloqueoPuertas[1] = game.add.sprite(1740, 1890, 'colisionBox');
        bloqueoPuertas[0].scale.setTo(2, 1);
        bloqueoPuertas[1].scale.setTo(2, 1);
        game.physics.enable(bloqueoPuertas[0], Phaser.Physics.ARCADE);
        game.physics.enable(bloqueoPuertas[1], Phaser.Physics.ARCADE);
        bloqueoPuertas[0].body.immovable = true;
        bloqueoPuertas[1].body.immovable = true;

        salida[0] = game.add.sprite(440, 0, 'colisionBox');
        salida[1] = game.add.sprite(1740, 1900, 'colisionBox');
        salida[0].scale.setTo(2, 1);
        salida[1].scale.setTo(2, 1);
        game.physics.enable(salida[0], Phaser.Physics.ARCADE);
        game.physics.enable(salida[1], Phaser.Physics.ARCADE);
    },

    update: function() {
    	//Movimiento
    	if (jugadorVivo) {
    		playerMovement();
    	}

        //Golpe melee
        if (spaceKey.isDown) {
            if (!esperarSpace) {
                hit.revive();
                hit.x = player1.x - 50;
                hit.y = player1.y - 50;
                esperarSpace = true;
            }
        }

        if (spaceKey.isUp && esperarSpace) {
            hit.kill();
            esperarSpace = false;
        }
        
        //Cambiar de arma
        if (qKey.isDown) {
            if (!esperarQ) {
            	cambiarArma();
                esperarQ = true;
            }
        }

        if (qKey.isUp && esperarQ) {
            esperarQ = false;
        }

        //Colisiones
        checkCollisions();

        //Arma
        if (cargador > 0 && fireButton.isDown && jugadorVivo) {
            fireBullet();
        }
        if (rKey.isDown && cargador == 0 && cargadores != 0) {
            recargar();
        }
        
        //Vision de linterna
        calcularVision();
        
        //Si no está interactuando con un inventario, permitir al jugador usar sus objetos
        if (!inventarioAbierto) {
            controlesInventario();
        }
        
        //Controlador de las pilas
        if (player1.bateria > 0 && game.time.now > tiempoBateria) {
            player1.bateria -= 1;
            tiempoBateria += 6666;
            barraBateria.previous(1);
        }

        if (player1.vida <= 0) {
            jugadorMuerto();
        }

        if (!generadorEncendido) {
        	if (fusiblesRestantes === 0) {
                generadorEncendido = true;
                game.add.sprite(544, 1324, 'luzGenerador');
                game.add.sprite(1309, 911, 'luzSala');
            }
        }
        
        //Subimos nuestro jugador y actualizamos el estado del juego
        putPlayer();
        getGameState();
        
        updateOtherPlayers();
    }
}

function checkCollisions() {
	game.physics.arcade.collide(player1, capa);
    game.physics.arcade.collide(bullets, capa, function(bullets){
        bullets.kill();
    });
    game.physics.arcade.collide(bullets, player1, function(p, bullets){
        player1.vida -= bullets.daño;
        actualizarVida();
        bullets.kill();
    });
    game.physics.arcade.collide(bullets, grupoJugadores, function(bullets){
        bullets.kill();
    });
    game.physics.arcade.overlap(player1, salida, acabarPartida);
    game.physics.arcade.overlap(player1, inventarios, colisionInventario);
    game.physics.arcade.overlap(player1, generador, controladorGenerador);
    game.physics.arcade.overlap(player1, salaDeControl, controladorSala);
    game.physics.arcade.overlap(hit, grupoJugadores, function(p1, p2){
        p2.vida -= 10;
    });
    game.physics.arcade.overlap(player1, grupoCadaveres, controladorCadaveres);

    if (!game.physics.arcade.overlap(player1, inventarios, colisionInventario) && inventarioAbierto) {
        mostrarInventario(0);
    }
    
    if (player1.puedeSalir === false) {
        game.physics.arcade.collide(player1, bloqueoPuertas);
    }
}

function updateOtherPlayers() {
	game.player2.x = game.jugador2.x;
	game.player2.y = game.jugador2.y;
	game.player2.rotation = game.jugador2.rotacion;
	game.player2.loadTexture(game.jugador2.skin);
    
    if (game.jugador2.salida == 1) {
    	acabarPartida();
    }
	
	if (game.jugadoresOnline > 2) {
		game.player3.x = game.jugador3.x;
		game.player3.y = game.jugador3.y;
		game.player3.rotation = game.jugador3.rotacion;
		game.player3.loadTexture(game.jugador3.skin);
	    
	    if (game.jugador3.salida == 1) {
	    	acabarPartida();
	    }
    }
	
    if (game.jugadoresOnline > 3) {
    	game.player4.x = game.jugador4.x;
    	game.player4.y = game.jugador4.y;
    	game.player4.rotation = game.jugador4.rotacion;
    	game.player4.loadTexture(game.jugador4.skin);
        
        if (game.jugador4.salida == 1) {
        	acabarPartida();
        }
    }
}

function fireBulletOtherPlayer(balaX, balaY, jugX, jugY, daño, velocidad) {
	bullet = bullets.getFirstExists(false);
	if(bullet) {
        bullet.reset(jugX, jugY);
        bullet.rotation = game.physics.arcade.angleToXY(bullet, balaX, balaY);
        bullet.daño = daño;
        game.physics.arcade.moveToXY(bullet, balaX, balaY, velocidad);
        switch (daño) {
	        case 40:
	        	balaPistola.play();
	        	break;
	        case 10:
	        	balaSubfusil.play();
	        	break;
	        case 20:
	        	balaFusil.play();
	        	break;
	        case 100:
	        	balaBallesta.play();
	        	break;
        }
    }
}

//Coloca todos los inventario que contienen objetos por el mapa
function generarInventarios(tile) {
    if(tile.index === 0) {
        inv = game.add.sprite(tile.worldX, tile.worldY, 'colisionBox');
        game.physics.enable(inv, Phaser.Physics.ARCADE);
        inv.contenido;
        inventarios[index] = inv;
        index++;
    }
}

//Rellena los inventarios anteriormente generados
function llenarInventarios() {
    for (var i = 0; i < 64; i++) {
        inventarios[i].contenido = i;
    }
}

//Funcion que controla el progreso del generador
function controladorGenerador() {
    if (eKey.isDown){
        if (!esperarE) {
            for (var i = 0; i < 4; i++) {
                if(player1.items[i] === 'fusible') {
                    player1.items[i] = 'vacio';
                    --fusiblesRestantes;
                    putFusibles();
                }
            }
            renderInventario();
            esperarE = true;
        }
    }

    if (eKey.isUp) {
        esperarE = false;
    }
}

//Funcion que comprueba la tarjeta valida
function controladorSala() {
    if (eKey.isDown){
        if (!esperarE) {
            if (generadorEncendido === true) {
                if (player1.items[0] === idCorrecta || player1.items[1] === idCorrecta || 
                    player1.items[2] === idCorrecta || player1.items[3] === idCorrecta) {
                    tarjeta = game.add.sprite(20, 0, 'tarjeta');
                    tarjeta.scale.setTo(0.5, 0.5);
                    tarjeta.fixedToCamera = true;
                    player1.puedeSalir = true;
                }
            }
            esperarE = true;
        }
    }

    if (eKey.isUp) {
        esperarE = false;
    }
}

//Funcion que hace reaparecer al jugador
function jugadorMuerto() {
    if (jugadorVivo) {
    	crearCadaver(player1.x, player1.y, player1.items);
    	sendCadaver(player1.x, player1.y, player1.items);
    	player1.items[0] = 'vacio';
    	player1.items[1] = 'vacio';
    	player1.items[2] = 'vacio';
    	player1.items[3] = 'vacio';
    	renderInventario();
        player1.kill();
        jugadorVivo = false;
        respawnTime = game.time.now + 5000;
    }

    if (game.time.now > respawnTime) {
        player1.vida = 100;
        actualizarVida();
        player1.revive();
        player1.x = spawnX;
        player1.y = spawnY;
        jugadorVivo = true;
    }

}

function crearCadaver(x, y, items) {
	if (items[0] !== 'vacio') {
		var cad = game.add.sprite(x - 15, y - 15, items[0]);
		cad.scale.setTo(0.2, 0.2);
		game.physics.enable(cad, Phaser.Physics.ARCADE);
		grupoCadaveres.add(cad);
	}
	
	if (items[1] !== 'vacio') {
		var cad = game.add.sprite(x + 15, y - 15, items[1]);
		cad.scale.setTo(0.2, 0.2);
		game.physics.enable(cad, Phaser.Physics.ARCADE);
		grupoCadaveres.add(cad);
	}

	if (items[2] !== 'vacio') {
		var cad = game.add.sprite(x - 15, y + 15, items[2]);
		cad.scale.setTo(0.2, 0.2);
		game.physics.enable(cad, Phaser.Physics.ARCADE);
		grupoCadaveres.add(cad);
	}
	
	if (items[3] !== 'vacio') {
		var cad = game.add.sprite(x + 15, y + 15, items[3]);
		cad.scale.setTo(0.2, 0.2);
		game.physics.enable(cad, Phaser.Physics.ARCADE);
		grupoCadaveres.add(cad);
	}
}

function controladorCadaveres(p, cadaver) {
    if (eKey.isDown){
        if (!esperarE) {
        	if (player1.items[0] === 'vacio') {
        		cadaverDestruido(cadaver.x, cadaver.y, cadaver.key);
        		player1.items[0] = cadaver.key;
        		renderInventario();
            	cadaver.destroy();
        	} else if (player1.items[1] === 'vacio') {
        		cadaverDestruido(cadaver.x, cadaver.y, cadaver.key);
        		player1.items[1] = cadaver.key;
        		renderInventario();
            	cadaver.destroy();
        	} else if (player1.items[2] === 'vacio') {
        		cadaverDestruido(cadaver.x, cadaver.y, cadaver.key);
        		player1.items[2] = cadaver.key;
        		renderInventario();
            	cadaver.destroy();
        	} else if (player1.items[3] === 'vacio') {
        		cadaverDestruido(cadaver.x, cadaver.y, cadaver.key);
        		player1.items[3] = cadaver.key;
        		renderInventario();
            	cadaver.destroy();
        	}
        }
    }

    if (eKey.isUp) {
        esperarE = false;
    }
}

function destruirCadaver(cadaver, x, y, item) {
	if (cadaver.x == x && cadaver.y == y && cadaver.key == item) {
		cadaver.destroy();
	}
}

//Funcion que se llama al salir por la puerta
function acabarPartida () {
	game.jugador1.salida = 1;
	putPlayer();
    game.state.start('resultsState');
}