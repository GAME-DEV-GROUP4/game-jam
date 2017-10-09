//boss does not currently call any attack besides charge
var demo = {};
demo.bossLevel = function(){};

var player;
var bossman;
var bossActing;
var suits;
var playerx, playery;
var bossx=650;
var bossy=50;
var hitTime;
var cursors;
var testAttackButton;
var testAttackButton2;
var testAttackButton3;

demo.bossLevel.prototype=
{
    preload: function() {
    game.load.image('warningdeadline', 'assets/deadline-warning.png');
    game.load.image('deadline', 'assets/deadline.png');
    game.load.spritesheet('bossman', 'assets/boss-man-2-68x120.png', 68, 120);
    game.load.spritesheet('dude', 'assets/dude.png', 28, 48);
    game.load.image('floor', 'assets/floor.png');
    game.load.image('background', 'assets/bg.png');
    
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor='#ccc';
        game.world.setBounds(200, 0, 800, 600);

        //controls
        cursors = game.input.keyboard.createCursorKeys();
        testAttackButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        testAttackButton2 = this.input.keyboard.addKey(Phaser.KeyCode.BACKSPACE);
        testAttackButton3 = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);

        //floor
        background = game.add.sprite(0, 0, 'background');
        floor = game.add.sprite(0, 580, 'floor');
        game.physics.arcade.enable(floor);
        floor.body.immovable = true;
        
        //boss
        bossman = game.add.sprite(650, 50, 'bossman');
        bossman.scale.setTo(1.5, 1.5);
        game.physics.arcade.enable(bossman);
        bossman.body.collideWorldBounds = true;
        bossActing = false;
        
        bossman.animations.add('idle', [0, 0, 1, 1], true);
        bossman.animations.play('idle', 8, true);
        
        //player
        player = game.add.sprite(100, 500, 'dude');
        player.scale.setTo(1.5, 1.5);
        game.physics.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        
        player.animations.add('left', [0, 1, 0, 1], 5, true);
        player.animations.add('right', [2, 3, 2, 3], 5, true);
        
        //projectiles
        suits = game.add.group();
        game.physics.arcade.enable(suits);
        
    },
    
    update: function(){
        playerMove();
        
        //handle collisions
        var hitBullet = game.physics.arcade.overlap(player, suits, hitSuit, null, this);
        var bossOverlapX = game.physics.arcade.Overlap
        game.physics.arcade.collide(player, floor);
        
        if(this.game.time.totalElapsedSeconds()-hitTime <1){
            playerx = 75;
            playery = 175;
        }
        else{
            playerx = 150;
            playery=350;
        }
        
        if(testAttackButton.isDown){
            suitAttack();
        }
        if(testAttackButton2.isDown){
            deadlinehorizontal(player);
        }
        if(testAttackButton3.isDown){
            deadlinevertical(player);
        }
    }
};

function deadlinehorizontal(player){
    var deadlinetime = game.time.now + 3000;
    var ypos = player.y+24;
    var predeadline = attackSprites.create(0, ypos, 'warningdeadline');
    predeadline.width = 800;
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    
    
    if (game.time.now > deadlinetime){
        var deadline = attackSprites.create(0, ypos, 'deadline');
        game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    }
}

function deadlinevertical(player){
    var deadlinetime = game.time.now + 3000;
    var xpos = player.x+16;
    var predeadline = attackSprites.create(0, xpos, 'warningdeadlinevert');
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    
    
    if (game.time.now > deadlinetime){
        var deadline = attackSprites.create(0, xpos, 'deadlinevert');
        game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    }
}
function suitAttack(){
    var suit = suits.create(bossman.x, bossman.y, 'star');
    game.physics.enable(suit);
    game.physics.arcade.moveToObject(suit, player);
}
function hitSuit(player, suit)
{
    suit.kill();
    hitTime = this.game.time.totalElapsedSeconds();
}

function playerMove()
{
    //set player movement
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = 0-playerx;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = playerx;
        player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = 0-playery;
    }
    else 
    {
        player.animations.stop();
        player.frame = 2;
    }
        
        
}