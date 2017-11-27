var centerX = 400, centerY = 300;
var player;
var cursors;
var platforms, stench;
var bounds;
var doors;
var friends;
var beers;
var bullies;
var hp = 300, hpText;
var hGet = false, dGet = false;
var enterTime;
var drunkTime;

test.college = function(){};
test.college.prototype = 
{
    preload: function()
    {
        game.load.image('sketch', 'assets/level-plan-sketch.jpg');
        game.load.spritesheet('dude', 'assets/dude.png', 28, 48);
        game.load.image('platform', 'assets/platform.png');
        game.load.image('stench', 'assets/badland.png');
        game.load.image('mover', 'assets/mover.png');
        game.load.image('friend', 'assets/firstaid.png');
        game.load.image('beer', 'assets/beer.png');
        game.load.spritesheet('bully', 'assets/baddie.png', 32, 32);
        game.load.image('bound', 'assets/bound.png');
        game.load.image('door', 'assets/door.png');
    },
    create: function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor='#ccc';
        game.world.setBounds(0, 0, 2400, 1200);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        
        //var sketch = game.add.sprite(0, 0, 'sketch');
        
        //make obstacle group
        obstacles = game.add.group();
        obstacles.enableBody = true;
        
        //make platforms group that will include stairs and floor
        platforms = game.add.group();
        platforms.enableBody = true;
        
        var platform = platforms.create(0,1200-(32*2), 'platform');
        platform.scale.setTo(1,2);
        platform.body.immovable=true;
        
        //bounds group
        bounds = game.add.group();
        bounds.enableBody= true;
        
        var bound = bounds.create(750,1200-(32*3),'bound');
            bound.scale.setTo(2,3);
            bound.body.immovable = true;
        var bound = bounds.create(1500+32, 1200-(32*3), 'bound');
            bound.scale.setTo(0.5,2);
            bound.body.immovable=true;
        
        //door group
        doors = game.add.group();
        doors.enableBody = true;
        
        var door = doors.create(50, 1200-(32*4), 'door');
        
        //beer group
        beers = game.add.group();
        beers.enableBody = true;
        
        var beer = beers.create(50+(32*3), 1200-(32*3), 'beer');
        var beer = beers.create(600+32, 1200-(32*8), 'beer');
        var beer = beers.create(1600 +32, 1200-(32*15), 'beer');
        var beer = beers.create(2000, 1200-(32*11),'beer');
        var beer = beers.create(2200+32, 1200-(32*9), 'beer');
        
        //make ledges& bounds
        var ledge = platforms.create(450, 1200 -(32*6), 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(600, 1200-(32*7), 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(900, 1200-(32*10),'platform');
            ledge.scale.setTo(1, 0.5);
            ledge.body.immovable = true;
        var ledge = platforms.create(750, 1200-(32*2), 'platform');
            ledge.scale.setTo(2,4);
            ledge.body.immovable = true;
        var ledge = platforms.create(1400, 1200-(32*14), 'platform');
            ledge.scale.setTo(0.75, 0.75);
            ledge.body.immovable = true;
        var ledge = platforms.create(1700,1200-(32*10), 'platform');
            ledge.scale.setTo(1, 0.25);
            ledge.body.immovable = true;
        var ledge = platforms.create(1800, 1200-(32*5), 'platform');
            ledge.scale.setTo(0.5, 0.25);
            ledge.body.immovable = true;
        var ledge = platforms.create(2200, 1200-(32*8), 'platform');
            ledge.scale.setTo(0.25,0.25);
            ledge.body.immovable = true;
        var ledge = platforms.create(2200, 1200-(32*2), 'platform');
            ledge.scale.setTo(0.5, 3);
            ledge.body.immovable = true;
        var door = doors.create(104, 96, 'door');
        var door = doors.create(2400-32, 1200-(32*4), 'door');

        
        friends = game.add.group();
        friends.enableBody = true;
        
        var friend = friends.create(1900, 1200-(32*7)+(32*.5), 'friend');
            friend.body.immovable = true;
            
        
        
        //make bullies group
        bullies = game.add.group();
        bullies.enableBody = true;
        
        //make bully objects
        var bully = bullies.create(1000, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -150;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1200, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 150;
            bully.body.bounce.x = 1;
        
        //make the player
        player = game.add.sprite(104, 1200-(32*5), 'dude');
        //player physics
        game.physics.arcade.enable(player);
        player.body.gravity.y = 2000;
        player.body.collideWorldBounds = true;
        //game camera settings
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(200, 150, 400, 300);
        //player walking animations
        player.animations.add('left', [0, 1, 0, 1], 5, true);
        player.animations.add('right', [2, 3, 2, 3], 5, true);
        
        //make hp text
        hpText = game.add.text(16, 16, 'HP: ' +game.global.hp, { fontFamily:'Courier', fontSize:'32px', fill:'#000'});
        hpText.fixedToCamera = true;
        hpText.cameraOffset.setTo(16, 16);
        
        //controls
        cursors = game.input.keyboard.createCursorKeys();
        
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
        
        game.time.events.loop(Phaser.Timer.SECOND, healthLoss, this);
    },
    update: function()
    {
        //collide everything with platforms, obstacles, movers
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitObstacle = game.physics.arcade.collide(player, obstacles);
        var hitBad = game.physics.arcade.collide(player, bullies, touchBully, null, this);
        var hitBullet = game.physics.arcade.overlap(player, beers, touchBeer, null, this);
        var hitFriend = game.physics.arcade.overlap(player, friends, touchFriend, null, this);
        game.physics.arcade.collide(bullies, bounds);
        game.physics.arcade.collide(bullies, platforms);
        var touchDoor = game.physics.arcade.overlap(player,doors);
        
        //collect things if u touch them
        if(touchDoor&& player.x >2000){
            game.state.start('boss');
        }
        //set player movement
        player.body.velocity.x = 0;
        var direction = 1;
        if(this.game.time.totalElapsedSeconds() - 2 < drunkTime){
                direction = -1;
            }
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -400 * direction;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 400*direction;
            player.animations.play('right');
        }
        else 
        {
            player.animations.stop();
            player.frame = 2;
        }
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -800;
        }
        if(cursors.down.isDown && !player.body.touching.down){
            player.body.velocity.y += 50;
        }
        if (hp<=0)
        {
            //go to game over/menu state
            game.state.start('gameOver');
        }
        if(player.y > 1200-50)
        {
            game.state.start('gameOver');
        }
        
        //if (reach door, hGet & dGet both true)
        // {go to next stage}
    }
};
    
function touchBully(player, bully)
{
    game.global.hp -= 50;
    hpText.text = 'HP: ' + game.global.hp;
    bully.kill();
}

function touchBeer (player, beer){
    beer.kill();
    drunkTime = this.game.time.totalElapsedSeconds();
}

function touchFriend(player, friend)
{
    game.global.hp += 50;
    hpText.text = 'HP: ' + game.global.hp;
    friend.kill();
}
function healthLoss(){
    game.global.hp -= 10;
    hpText.text = "HP: " + game.global.hp;
}