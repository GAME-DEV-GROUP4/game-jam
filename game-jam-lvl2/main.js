var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('menuState', test.menuState);
game.state.add('lvl1', test.lvl1);
game.state.add('lvl2', test.lvl2);
game.state.add('gameOver', test.gameOver);
game.state.start('menuState');