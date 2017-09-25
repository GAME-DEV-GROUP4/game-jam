var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('lvl2', test.lvl2);
game.state.start('lvl2')