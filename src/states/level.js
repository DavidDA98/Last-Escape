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

LastEscape.levelState.prototype = {

    preload: function() {
    },

    create: function() {
        game.world.setBounds(0, 0, 2920, 1920);
        game.add.sprite(0, 0, 'bgOscuro');

        mapa = game.add.tilemap('mapa', 20, 20);
        mapa.addTilesetImage('pared');
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

        //Sonido disparo
        bulletSound = game.add.audio('sonido_bala_pistola',0.05);
        reloadSound = game.add.audio('sonido_recargar_pistola',0.05);

        //Jugador
        player1 = game.add.sprite(640, 360, 'pj1andar', 0);
        player1.scale.setTo(0.4, 0.4);
        player1.anchor.setTo(0.47,0.5);
        game.physics.enable(player1, Phaser.Physics.ARCADE);

        game.camera.follow(player1, 0.5, 0.5);
    },

    update: function() {
        playerMovement();
        game.physics.arcade.collide(player1, capa);
        game.physics.arcade.collide(bullets, capa, function(bullets, capa){bullets.kill();});
        if (cargador > 0 && fireButton.isDown) {
            fireBullet();
        }
        if (lKey.isDown) {
            bullets.createMultiple(10,'bala_pistola');
            bullets.setAll('anchor.x', 0.5);
            bullets.setAll('outOfBoundsKill', true);
            bullets.setAll('checkWorldBounds', true);
        }
        if (rKey.isDown && cargador == 0) {
            recargar();
        }

        calcularVision();
    }
}

function playerMovement () {
    player1.body.velocity.x = 0;
    player1.body.velocity.y = 0;

    if (wKey.isDown) {
        player1.body.velocity.y = -120;
    }
    else if (sKey.isDown) {
        player1.body.velocity.y = 120;
    }

    if (aKey.isDown) {
        player1.body.velocity.x = -120;
    }
    else if (dKey.isDown) {
        player1.body.velocity.x = 120;
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