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
var esperar1 = false;
var esperar2 = false;
var esperar3 = false;
var esperar4 = false;
var esperarSpace = false;
var spriteObjeto;
var spriteCuadro;
var inventarioAbierto = false;
var listaObjetos = [
    'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio',
    'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 
    'fusible', 'fusible', 'fusible', 'fusible', 'botiquin', 'botiquin', 'botiquin', 'botiquin', 'botiquin', 'botiquin',
    'identificacion1', 'identificacion2', 'identificacion3', 'identificacion4', 'identificacion5', 'identificacion6',
    'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina',
    'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'balas', 'balas', 'balas', 'balas', 'balas',
    'balas', 'balas', 'balas'
];

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

var listaIDs = [
    'identificacion1', 'identificacion2', 'identificacion3', 'identificacion4', 'identificacion5', 'identificacion6'
]
var spawnsX = [480, 2750, 2560, 260];
var spawnsY = [370, 170, 1750, 1770];
var randomIndice = [0, 1, 2, 3];

var jugadorVivo = true;
var respawnTime;

LastEscape.levelState.prototype = {
		
	init: function() {
		if (game.jugador1.id == 1) {
			game.jugador2 = {id: 2}
		} else {
			game.jugador2 = {id: 1}
		}
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
        fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
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
        bulletSound = game.add.audio('sonido_pistola',0.05);
        reloadSound = game.add.audio('sonido_recargar_pistola',0.05);

        //Jugador
        randomIndice.sort(function(a, b){return 0.5 - Math.random()});
        player1 = game.add.sprite(game.jugador1.x, game.jugador1.y, 'pj1pistola', 0);
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
        
        getPlayer(function (player2Data) {
        	game.jugador2 = JSON.parse(JSON.stringify(player2Data));
        	game.player2 = game.add.sprite(game.jugador2.x, game.jugador2.y, 'pj2pistola', 0);
        	game.player2.scale.setTo(0.4, 0.4);
        	game.player2.anchor.setTo(0.47,0.5);
            game.physics.enable(game.player2, Phaser.Physics.ARCADE);
            game.player2.visible = false;
            grupoJugadores = game.add.group();
            grupoJugadores.add(game.player2);
            console.log("Termine");
        })
        
        

        /*player3 = game.add.sprite(spawnsX[randomIndice[2]], spawnsY[randomIndice[2]], 'pj3pistola', 0);
        player3.scale.setTo(0.4, 0.4);
        player3.anchor.setTo(0.47,0.5);
        game.physics.enable(player3, Phaser.Physics.ARCADE);
        player3.visible = false;

        player4 = game.add.sprite(spawnsX[randomIndice[3]], spawnsY[randomIndice[3]], 'pj4pistola', 0);
        player4.scale.setTo(0.4, 0.4);
        player4.anchor.setTo(0.47,0.5);
        game.physics.enable(player4, Phaser.Physics.ARCADE);
        player4.visible = false;*/
        
        
        //grupoJugadores.add(player3);
        //grupoJugadores.add(player4);

        game.camera.follow(player1, 0.5, 0.5);

        hit = game.add.sprite(0, 0, 'colisionBox');
        hit.scale.setTo(5, 5);
        game.physics.enable(hit, Phaser.Physics.ARCADE);
        hit.kill();

        //Interfaz
        inventarioUI = game.add.sprite(820, 540, 'inventario');
        inventarioUI.fixedToCamera = true;

        player1.armas[0] = 'pistola';
        spriteArma[0] = game.add.sprite(1110, 570, 'pistola');
        spriteArma[0].fixedToCamera = true;

        player1.armas[1] = 'cuchillo';
        spriteArma[1] = game.add.sprite(1205, 563, 'cuchillo');
        spriteArma[1].scale.setTo(0.6, 0.6);
        spriteArma[1].fixedToCamera = true;

        barraVida = game.add.sprite(20, 650, 'barraVida', 10);
        barraVida.fixedToCamera = true;
        barraVida.animations.add('vida');
        barraVida = barraVida.animations.getAnimation('vida');

        barraBateria = game.add.sprite(20, 590, 'barraBateria', 0);
        barraBateria.fixedToCamera = true;
        barraBateria.animations.add('bateria');
        barraBateria = barraBateria.animations.getAnimation('bateria');

        mapaInventarios = game.add.tilemap('posInventarios', 20, 20);
        mapaInventarios.forEach(generarInventarios, this, 0, 0, 146, 96);
        llenarInventarios();

        //Gameflow
        listaIDs.sort(function(a, b){return 0.5 - Math.random()});
        idCorrecta = listaIDs[0];
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
        playerMovement();

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

        //Colisiones
        game.physics.arcade.collide(player1, capa);
        game.physics.arcade.collide(bullets, capa, function(bullets){
            bullets.kill();
        });
        game.physics.arcade.collide(bullets, grupoJugadores, function(bullets){
            bullets.kill();
        });
        game.physics.arcade.overlap(player1, inventarios, colisionInventario);
        game.physics.arcade.overlap(player1, generador, controladorGenerador);
        game.physics.arcade.overlap(player1, salaDeControl, controladorSala);
        game.physics.arcade.overlap(player1, salida, acabarPartida);
        game.physics.arcade.overlap(hit, grupoJugadores, function(p1, p2){
            p2.vida -= 10;
        });

        if (!game.physics.arcade.overlap(player1, inventarios, colisionInventario) && inventarioAbierto) {
            mostrarInventario(0);
        }
        
        if (game.player2) {
        	game.player2.visible = false;
        }
        //player3.visible = false;
        //player4.visible = false;

        //Arma
        if (cargador > 0 && fireButton.isDown) {
            fireBullet();
        }
        if (rKey.isDown && cargador == 0 && cargadores != 0) {
            recargar();
        }

        calcularVision();

        if (!inventarioAbierto) {
            controlesInventario();
        }

        if (fKey.isDown) {
            if (!esperarF) {
                player1.vida -= 10;
                actualizarVida();
                esperarF = true;
            }
        }

        if (fKey.isUp) {
            esperarF = false;
        }

        if (player1.bateria > 0 && game.time.now > tiempoBateria) {
            player1.bateria -= 1;
            tiempoBateria += 6666;
            barraBateria.previous(1);
        }

        if (player1.puedeSalir === false) {
            game.physics.arcade.collide(player1, bloqueoPuertas);
        }

        if (player1.vida <= 0) {
            jugadorMuerto();
        }
        
        putPlayer();
        getPlayer( function (updatePlayer2) {
        	game.jugador2 = JSON.parse(JSON.stringify(updatePlayer2));
        	game.player2.x = game.jugador2.x;
        	game.player2.y = game.jugador2.y;
        	game.player2.rotation = game.jugador2.rotacion;
        })
    }
}

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
            game.physics.arcade.moveToPointer(bullet, 400);
            bulletTime = game.time.now + 200;
            cargador = cargador -1;
            bulletSound.play();
        }
    }
}

function recargar() {
        cargador = cargador +10;
        reloadSound.play();
        cargadores = cargadores - 1;
}

//Proyecta rayos desde el jugador hasta que colisionen con las paredes, despues los une para crear una máscara
function calcularVision() {
    
    if (jugadorVivo) {
        anguloRaton = Math.atan2(player1.y-game.input.worldY,player1.x-game.input.worldX);
    }

    testP2 = true;
    testP3 = true;
    testP4 = true;

    longitudRayos = 120 + 5 * player1.bateria;

    mascaraVision.x = player1.x;
    mascaraVision.y = player1.y;

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

function testPlayers(x, y) {
    if (testP2 == true) {
        if (x >= game.player2.x - 31 && x < game.player2.x + 36 && y >= game.player2.y - 28 && y < game.player2.y + 29) {
        	game.player2.visible = true;
            testP2 = false;
        }
    }

    /*if (testP3 == true) {
        if (x >= player3.x - 31 && x < player3.x + 36 && y >= player3.y - 28 && y < player3.y + 29) {
            player3.visible = true;
            testP3 = false;
        }
    }

    if (testP4 == true) {
        if (x >= player4.x - 31 && x < player4.x + 36 && y >= player4.y - 28 && y < player4.y + 29) {
            player4.visible = true;
            testP4 = false;
        }
    }*/
}

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

/*function renderArmas() {
    arma = player1.armas[0];
    if (spriteArma[0] !== undefined) {
        spriteArma[0].kill();
    }
    if (arma !== undefined) {
        spriteArma[0] = game.add.sprite(1149, 608, arma);
        spriteArma[0].scale.setTo(0.3, 0.3);
        spriteArma[0].fixedToCamera = true;
    }

    arma = player1.armas[1];
    if (spriteArma[1] !== undefined) {
        spriteArma[1].kill();
    }
    if (arma !== undefined) {
        spriteArma[1] = game.add.sprite(1205, 547, arma);
        spriteArma[1].scale.setTo(0.3, 0.3);
        spriteArma[1].fixedToCamera = true;
    }
}*/

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
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});

    for (var i = 0; i < 64; i++) {
        inventarios[i].contenido = i;
    }
}

//Controles para interaccionar con los inventarios
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

//Esta funcion controla la logica de los inventarios
//El modo 0 abre o cierra el inventario, dependiendo de como este este, no requiere el parametro pos
//El modo 1 intercambia el objeto del inventario del jugador en la posicion pos con el objeto mostrado, requiere de todos los parametros
function mostrarInventario(modo, indice, pos) {
    if(modo === 0) {
        if (!inventarioAbierto) {
            spriteCuadro = game.add.sprite(609, 329, 'cuadroInv');
            spriteCuadro.fixedToCamera = true;

            if (listaObjetos[indice] !== 'vacio') {
                spriteObjeto = game.add.sprite(618, 338, listaObjetos[indice]);
                spriteObjeto.scale.setTo(0.3, 0.3);
                spriteObjeto.fixedToCamera = true;
            }

            inventarioAbierto = true;
        } else {
            spriteCuadro.kill();
            spriteObjeto.kill();
            spriteObjeto.key = undefined;
            inventarioAbierto = false;
        }
    }
    
    if(modo === 1) {
        if(player1.items[pos] === 'vacio') {
            player1.items[pos] = listaObjetos[indice];
            listaObjetos[indice] = 'vacio';
            mostrarInventario(0);
            renderInventario();
        } else {
            if (listaObjetos[indice] !== 'vacio') {
                listaObjetos[indice] = player1.items[pos];
                player1.items[pos] = spriteObjeto.key;
                spriteObjeto.kill();
                spriteObjeto.key = undefined;
            } else {
                listaObjetos[indice] = player1.items[pos];
                player1.items[pos] = 'vacio';
            }
            spriteObjeto = game.add.sprite(618, 338, listaObjetos[indice]);
            spriteObjeto.scale.setTo(0.3, 0.3);
            spriteObjeto.fixedToCamera = true;
            renderInventario();
        }
    }
}

//Esta función consume los objetos y realiza sus efectos
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

//Funcion que controla el progreso del generador
function controladorGenerador() {
    if (eKey.isDown){
        if (!esperarE) {
            for (var i = 0; i < 4; i++) {
                if(player1.items[i] === 'fusible') {
                    player1.items[i] = 'vacio';
                    --fusiblesRestantes;
                }
            }
            if (fusiblesRestantes === 0) {
                generadorEncendido = true;
                game.add.sprite(544, 1324, 'luzGenerador');
                game.add.sprite(1309, 911, 'luzSala');
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
        player1.kill();
        jugadorVivo = false;
        respawnTime = game.time.now + 5000;
    }

    if (game.time.now > respawnTime) {
        player1.vida = 100;
        actualizarVida();
        player1.revive();
        player1.x = spawnsX[randomIndice[0]];
        player1.y = spawnsY[randomIndice[0]];
        jugadorVivo = true;
    }

}

//Funcion que se llama al salir por la puerta
function acabarPartida () {
    game.state.start('resultsState');
}

function getPlayer(callback) {
    $.ajax({
        method: "GET",
        url: window.location.href + 'LastEscape/' + game.jugador2.id,
        async: false,
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
        game.jugador2 = JSON.parse(JSON.stringify(data));
        callback(data);
    })
}

function putPlayer() {
	game.jugador1.x = player1.x;
	game.jugador1.y = player1.y;
	game.jugador1.rotacion = player1.rotation;
	if (player1.vida >= 0) {
		game.jugador1.muerto = 1;
	} else {
		game.jugador1.muerto = 0;
	}
    $.ajax({
        method: "PUT",
        url: window.location.href + 'LastEscape/' + game.jugador1.id,
        data: JSON.stringify(game.jugador1),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (data) {
    	
    })
}



