LastEscape.loginState = function(game) {

}

LastEscape.loginState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoMenu');
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        game.add.tileSprite(379, 280, 522, 320, 'login');
        inicio = game.add.button(805, 520, 'delante', botonInicio, this, 1, 0);
    },

    update: function() {

    },
}

function botonInicio () {
    game.state.start('menuState');
}