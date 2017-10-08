test.charge = function(){};

var bossman;
var player;
var chargeTimer;
var chargeText;
var chargeNum = 0;

test.charge.prototype = 
{
    preload: function()
    {
        game.load.spritesheet('bossman', 'assets/boss-man-2-68x120.png', 68, 120);
        game.load.spritesheet('dude', 'assets/dude.png', 28, 48);
        game.load.image('floor', 'assets/floor.png');
        game.load.image('background', 'assets/bg.png');
    },
    
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor='#ccc';
        game.world.setBounds(200, 0, 800, 600);

        //controls
        cursors = game.input.keyboard.createCursorKeys();
        
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
        
        chargeMove();
    },
    
    update: function()
    {
        playerMove();
       
        var caught = game.physics.arcade.collide(player, bossman);
        game.physics.arcade.collide(player, floor);
        
        if(caught)
            {
                stopCharge();
            }
        
    }
};

function chargeMove()
{
    //run the charge function like 5 times
    this.chargeTimer = game.time.events.repeat(Phaser.Timer.SECOND * 2, 3, charge, this);

    //text to keep track of if the charge thing is working    
    chargeText = game.add.text(216, 16, 'Charges: 0', { fontFamily:'Courier', fontSize:'32px', fill:'#000'});
}
function charge()
{    
    bossman.body.velocity.x = 0;
    bossman.body.velocity.y = 0;
    game.physics.arcade.accelerateToObject(bossman, player, 2000, 1000, 1000);
    chargeNum += 1;
    chargeText.text = 'Charges: ' + chargeNum;
}

function stopCharge()
{
    game.physics.arcade.moveToXY(bossman, 650, 50, 1000);
}

function playerMove()
{
    //set player movement
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -400;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 400;
        player.animations.play('right');
    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -400;
    }
    else 
    {
        player.animations.stop();
        player.frame = 2;
    }
        
        
}