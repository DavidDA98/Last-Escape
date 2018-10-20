game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', LastEscape.bootState)
game.state.add('preloadState', LastEscape.preloadState)
game.state.add('menuState', LastEscape.menuState)
game.state.add('preloadLevelState', LastEscape.preloadLevelState)
game.state.add('levelState', LastEscape.levelState)
  
game.state.start('bootState')