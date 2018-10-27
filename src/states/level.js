LastEscape.levelState = function(game) {

}
//Variables disparo
var bullets;
var cargador = 10;
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
var spriteObjeto;
var spriteCuadro;
var inventarioAbierto = false;
var listaObjetos = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
    'fusible', 'fusible', 'fusible', 'fusible', 'botiquin', 'botiquin', 'botiquin', 'botiquin', 'botiquin', 'botiquin', 
    'identificacion1', 'identificacion2', 'identificacion3', 'identificacion4', 'identificacion5', 'identificacion6',
    'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina', 'medicina',
    'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'pilas', 'bala_pistola', 'bala_pistola', 'bala_pistola',
    'bala_pistola', 'bala_pistola', 'bala_pistola', 'bala_pistola', 'bala_pistola', undefined, undefined,
    undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined
];

LastEscape.levelState.prototype = {

    preload: function() {
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
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
        fireButton = game.input.mousePointer;
        
        //Vision
        paredesBMP = game.make.bitmapData(2920, 1920);
		paredesBMP.draw("paredesBMP");
        paredesBMP.update();
        mascaraVision = this.game.add.graphics(0, 0);
        bgClaro = game.add.sprite(0, 0, 'bgClaro');
        bgClaro.mask = mascaraVision;

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
        player1 = game.add.sprite(640, 360, 'pj1andar', 0);
        player1.scale.setTo(0.4, 0.4);
        player1.anchor.setTo(0.47,0.5);
        game.physics.enable(player1, Phaser.Physics.ARCADE);
        player1.armas = new Array(2);
        player1.items = new Array(4);

        game.camera.follow(player1, 0.5, 0.5);

        //Interfaz
        inventarioUI = game.add.sprite(820, 540, 'inventario');
        inventarioUI.fixedToCamera = true;

        player1.armas[0] = 'cuchillo';
        spriteArma[0] = game.add.sprite(1149, 635, 'cuchillo');
        spriteArma[0].fixedToCamera = true;

        mapaInventarios = game.add.tilemap('posInventarios', 20, 20);
        mapaInventarios.forEach(generarInventarios, this, 0, 0, 146, 96);
        llenarInventarios();
    },

    update: function() {
        playerMovement();

        game.physics.arcade.collide(player1, capa);
        game.physics.arcade.collide(bullets, capa, function(bullets){bullets.kill();});
        game.physics.arcade.overlap(player1, inventarios, colisionInventario);

        if (cargador > 0 && fireButton.isDown) {
            fireBullet();
        }
        if (rKey.isDown && cargador == 0) {
            recargar();
        }

        calcularVision();

        if (inventarioAbierto) {
            controlesInventario();
        }
    }
}

function playerMovement () {
    player1.body.velocity.x = 0;
    player1.body.velocity.y = 0;

    if (wKey.isDown) {
        player1.body.velocity.y = -100 - vel;
    }
    else if (sKey.isDown) {
        player1.body.velocity.y = 100 + vel;
    }

    if (aKey.isDown) {
        player1.body.velocity.x = -100 - vel;
    }
    else if (dKey.isDown) {
        player1.body.velocity.x = 100 + vel;
    }
    if (shiftKey.isDown){
        vel = 50;
    }
    else {
        vel = 0;
    }

    player1.rotation = game.physics.arcade.angleToPointer(player1);
}

function crearParedes () {
    pared = game.add.sprite(0, 0, 'pared');
    pared.scale.setTo(6, 240);
    game.physics.enable(pared, Phaser.Physics.ARCADE);
    pared.body.immovable = true;

}


function fireBullet() {
    if(game.time.now > bulletTime) {
        bullet = bullets.getFirstExists(false);
        if(bullet) {
            bullet.reset(player1.x , player1.y);
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
}

function calcularVision() {
    var anguloRaton = Math.atan2(player1.y-game.input.worldY,player1.x-game.input.worldX);
    mascaraVision.clear();
    mascaraVision.lineStyle(2, 0xffffff, 1);
    mascaraVision.beginFill(0xffff00);
    mascaraVision.moveTo(player1.x,player1.y);
    for(var i = 0; i<rayos; i++){	
        var anguloEntreRayos = anguloRaton-(FOV/2)+(FOV/rayos)*i
        var xFinal = player1.x;
        var yFinal = player1.y;
        for(var j= 1; j<=longitudRayos; j += 1){
            var xActual = Math.round(player1.x-(2*j)*Math.cos(anguloEntreRayos));
            var yActual = Math.round(player1.y-(2*j)*Math.sin(anguloEntreRayos));
            if(paredesBMP.getPixel32(xActual,yActual) == 0){
                xFinal = xActual;
                yFinal = yActual;
            }
            else{
                mascaraVision.lineTo(xFinal,yFinal);
                break;
            }
        }
        mascaraVision.lineTo(xFinal,yFinal);
    }
    mascaraVision.lineTo(player1.x,player1.y); 
    mascaraVision.endFill();
}

function renderInventario() {
    for (var i = 0; i < 4; i++) {
        objeto = player1.items[i];
        if (spriteItem[i] !== undefined) {
            spriteItem[i].kill();
        }
        if (objeto !== undefined) {
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

function generarInventarios(tile) {
    if(tile.index === 0) {
        inv = game.add.sprite(tile.worldX, tile.worldY, 'colisionBox');
        game.physics.enable(inv, Phaser.Physics.ARCADE);
        inv.contenido;
        inventarios[index] = inv;
        index++;
    }
}

function llenarInventarios() {
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});
    listaObjetos.sort(function(a, b){return 0.5 - Math.random()});

    for (var i = 0; i < 64; i++) {
        inventarios[i].contenido = i;
    }
}

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

function controlesInventario() {
    
}

function mostrarInventario(modo, indice, pos) {
    if(modo === 0) {
        console.log(listaObjetos[indice]);
        if (!inventarioAbierto) {
            spriteCuadro = game.add.sprite(609, 329, 'cuadroInv');
            spriteCuadro.fixedToCamera = true;

            if (listaObjetos[indice] !== undefined) {
                spriteObjeto = game.add.sprite(609, 329, listaObjetos[indice]);
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
        if(player1.items[pos] === undefined) {
            player1.items[pos] = spriteObjeto.key;
            listaObjetos[indice] = undefined;
            mostrarInventario(0);
            renderInventario();
        } else {
            if (listaObjetos[indice] !== undefined) {
                listaObjetos[indice] = player1.items[pos];
                player1.items[pos] = spriteObjeto.key;
                spriteObjeto.kill();
                spriteObjeto.key = undefined;
            } else {
                listaObjetos[indice] = player1.items[pos];
                player1.items[pos] = undefined;
            }
            spriteObjeto = game.add.sprite(609, 329, listaObjetos[indice]);
            spriteObjeto.scale.setTo(0.3, 0.3);
            spriteObjeto.fixedToCamera = true;
            renderInventario();
        }
    }
}