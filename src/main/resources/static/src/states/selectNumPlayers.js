LastEscape.selectNumPlayersState = function(game) {

}

LastEscape.selectNumPlayersState.prototype = {

    preload: function() {
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoDesenfocado');
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    },

    update: function() {
    	if (key2.isDown){
            game.jugadoresNecesarios = 2;
            game.state.start('selectCharacterState');
        }

        if (key3.isDown){
        	game.jugadoresNecesarios = 3;
            game.state.start('selectCharacterState');
        }

        if (key4.isDown){
        	game.jugadoresNecesarios = 4;
            game.state.start('selectCharacterState');
        }
    }
}
