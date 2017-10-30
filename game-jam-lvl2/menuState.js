var test = {};
var music;
test.menuState = function () {};
test.menuState.prototype = {
    preload: function(){
        game.load.image('background', 'assets/menuBackground.png');
        game.load.image('enter', 'assets/enter.png');
        game.load.audio('menuMusic', 'assets/audio/sample2.mp3');
    },
    
    create: function(){
        game.add.sprite(0,0, 'background');
        game.add.sprite(175,400, 'enter');
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        music = game.add.audio('menuMusic');
        music.play();
        
    },
    update: function(){
        if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            console.log('level1');
            music.pause();
            game.state.start('lvl1');
        }
    }
};
