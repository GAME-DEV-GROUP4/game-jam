var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('bossLevel', demo.bossLevel);
game.state.start('bossLevel');