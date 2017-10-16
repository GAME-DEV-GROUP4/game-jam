var music;
test.gameOver = function () {};
test.gameOver.prototype = {
    preload: function(){
        game.load.image('enter', 'assets/gameOver.png');
        game.load.audio('gameOverMusic', 'assets/audio/loser.mp3');
    },
    
    create: function(){
        game.stage.backgroundColor = "#000000"
        game.add.sprite(175,200, 'enter');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        music = game.add.audio('gameOverMusic');
        music.play();
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            console.log('menu');
            music.pause();
            game.state.start('menuState');
        }
    }
};
