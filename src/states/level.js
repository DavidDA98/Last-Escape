LastEscape.levelState = function(game) {

}

LastEscape.levelState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.world.setBounds(0, 0, 2920, 1920);
        game.add.tileSprite(0, 0, 2920, 1920, 'background');

        crearParedes();

        player1 = game.add.sprite(640, 360, 'pj1andar', 0);
        player1.scale.setTo(0.4, 0.4);
        player1.anchor.setTo(0.47,0.5);
        game.physics.enable(player1, Phaser.Physics.ARCADE);
        player1.body.bounce.setTo(1, 1);

        game.camera.follow(player1);

        wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    },

    update: function() {
        playerMovement();
        game.physics.arcade.collide(player1, pared);
    }
}

function playerMovement () {
    player1.body.velocity.x = 0;
    player1.body.velocity.y = 0;

    if (wKey.isDown) {
        player1.body.velocity.y = -100;
    }
    else if (sKey.isDown) {
        player1.body.velocity.y = 100;
    }

    if (aKey.isDown) {
        player1.body.velocity.x = -100;
    }
    else if (dKey.isDown) {
        player1.body.velocity.x = 100;
    }

    player1.rotation = game.physics.arcade.angleToPointer(player1);
}

function crearParedes () {
    pared = game.add.sprite(0, 0, 'pared');
    pared.scale.setTo(6, 240);
    game.physics.enable(pared, Phaser.Physics.ARCADE);
    pared.body.immovable = true;

}