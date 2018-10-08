game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', LastEscape.bootState)
  
game.state.start('bootState')
