game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', LastEscape.bootState)
game.state.add('preloadState', LastEscape.preloadState)
game.state.add('menuState', LastEscape.menuState)
game.state.add('creditsState', LastEscape.creditsState)
game.state.add('instructionsState', LastEscape.instructionsState)
game.state.add('instructions2State', LastEscape.instructions2State)
game.state.add('instructions3State', LastEscape.instructions3State)
game.state.add('instructions4State', LastEscape.instructions4State)
game.state.add('profileState', LastEscape.profileState)
game.state.add('settingsState', LastEscape.settingsState)
game.state.add('selectMapState', LastEscape.selectMapState)
game.state.add('selectCharacterState', LastEscape.selectCharacterState)
game.state.add('preloadLevelState', LastEscape.preloadLevelState)
game.state.add('levelState', LastEscape.levelState)
game.state.add('resultsState', LastEscape.resultsState)
  
game.state.start('bootState')