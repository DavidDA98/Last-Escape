LastEscape.titleState = function(game) {

}

LastEscape.titleState.prototype = {

    preload: function() {
        
    },

    create: function() {
        game.add.tileSprite(0, 0, 1280, 720, 'fondoMenu');
        enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        fireButton = game.input.mousePointer;
        start = game.add.text(350, 400, "Pulsa ENTER para continuar", {
            font: "45px Arial",
            fill: "#ffffff",
            align: "center"
        });
    },

    update: function() {
        if (enterKey.isDown || fireButton.isDown) {
            game.state.start('loginState');
        }
    },
}
