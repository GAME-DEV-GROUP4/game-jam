//boss does not currently call any attack besides charge
var demo = {};
demo.bossLevel = function(){};

var player;
var bossman;
var bossActing;
var suits;
var lasers;
var playerx, playery;
var bossx=650;
var bossy=50;
var hitTime;
var cursors;
var attackSprites;
var hpText;
var hp = 500;
var invincible = false;


demo.bossLevel.prototype=
{
    preload: function() {
    game.load.image('warningdeadline', 'assets/deadline-warning.png');
    game.load.image('deadline', 'assets/deadline.png');
    game.load.spritesheet('bossman', 'assets/boss-man-2-68x120.png', 68, 120);
    game.load.spritesheet('dude', 'assets/big-dude.png', 41, 78);
    game.load.image('floor', 'assets/floor.png');
    game.load.image('background', 'assets/bg.png');
    game.load.image('fireball', 'assets/projectile.png')
    
    },
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor='#ccc';
        game.world.setBounds(200, 0, 800, 600);

        //controls
        cursors = game.input.keyboard.createCursorKeys();

        //floor
        background = game.add.sprite(0, 0, 'background');
        floor = game.add.sprite(200, 580, 'floor');
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
        
        game.time.events.loop(Phaser.Timer.SECOND * game.rnd.realInRange(2.5, 5), predeadlinehorizontal, this, player);
        game.time.events.loop(Phaser.Timer.SECOND * game.rnd.realInRange(2.5, 5), predeadlinevertical, this, player);
        game.time.events.loop(Phaser.Timer.SECOND * game.rnd.realInRange(2.5, 5), suitAttack, this);
        
        //player
        player = game.add.sprite(200, 450, 'dude');
//        player.scale.setTo(1.5, 1.5);
        game.physics.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //projectiles
        suits = game.add.group();
        game.physics.arcade.enable(suits);
        attackSprites = game.add.group();
        
        //lasers
        lasers = game.add.group();
        game.physics.arcade.enable(lasers);
        
        //make hp text
        hpText = game.add.text(16, 16, 'HP: 500', { fontFamily:'Courier', fontSize:'32px', fill:'#000'});
        hpText.fixedToCamera = true;
        hpText.cameraOffset.setTo(16, 16);

        
    },
    
    update: function(){
        
        //handle collisions
        var hitBullet = game.physics.arcade.overlap(player, suits, hitSuit, null, this);
        var hitLaser = game.physics.arcade.overlap(player, lasers, hitLaser, null, this);
        var bossOverlapX = game.physics.arcade.Overlap
        game.physics.arcade.collide(player, floor);
        
        playerMove();
        
        if(this.game.time.totalElapsedSeconds()-hitTime <1){
            playerx = 200;
            playery = 400;
        }
        else{
            playerx = 500;
            playery = 400;
        }
    }
};

function predeadlinehorizontal(player){
    var ypos = player.y + 24;
    var predeadline = attackSprites.create(200, ypos, 'warningdeadline');
    predeadline.width = 800;
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    game.time.events.add(1000, deadlinehorizontal, this, player, ypos);
}
    
function deadlinehorizontal(player, ypos){
    var deadline = lasers.create(200, ypos, 'deadline');
    game.physics.enable(deadline);
    deadline.width = 800;
    game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
}

function predeadlinevertical(player){
    var xpos = player.x + 16;
    var predeadline = attackSprites.create(xpos, 0, 'warningdeadline');
    predeadline.width = 600;
    predeadline.angle = 90;
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    game.time.events.add(1000, deadlinevertical, this, player, xpos);
}
    
function deadlinevertical(player, xpos){
    var deadline = lasers.create(xpos, 0, 'deadline');
    game.physics.enable(deadline)
    deadline.width = 600;
    deadline.angle = 90;
    game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
}

function suitAttack(){
    var suit = suits.create(bossman.x, bossman.y, 'fireball');
    game.physics.enable(suit);
    game.physics.arcade.moveToObject(suit, player, 300);

}

function hitSuit(player, suit)
{
    suit.kill();
    hitTime = this.game.time.totalElapsedSeconds();
    if (!invincible)
        {
            hp -= 50;
            hpText.text = 'HP: ' + hp;
            invincibility();
        }
}

function hitLaser(player, laser)
{
    if (!invincible)
        {
            hp = -100;
            hpText.text = 'HP: ' + hp;
            invincibility();
        }
}

function invincibility()
{
    toggleInvincible();
    game.time.events.add(2000, toggleInvincible, this);
    var dmgTween = game.add.tween(player).from( { alpha: 0 }, 200, "Linear", true, 0, 5, true);
}

function toggleInvincible()
{
    invincible = !invincible;
}

function playerMove()
{
    //set player movement
    player.body.velocity.x = 0;
    
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
    else 
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = 0-playery;
    }
        
        
}