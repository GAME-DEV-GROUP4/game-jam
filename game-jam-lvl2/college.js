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
        
        //make obstacle ground
        var stench = obstacles.create(1400, 1200-(32*4), 'stench');
            stench.scale.setTo(2.5, 4);
            stench.body.immovable = true;
        
        //make platforms group that will include stairs and floor
        platforms = game.add.group();
        platforms.enableBody = true;
        
        //bounds group
        bounds = game.add.group();
        bounds.enableBody = true;
        
        //door group
        doors = game.add.group();
        doors.enableBody = true;
        
        //beer group
        beers = game.add.group();
        beers.enableBody = true;
        
        var beer = beers.create(70, 126, 'beer');
        //make ledges& bounds
        var ledge = platforms.create(70, 160, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var door = doors.create(104, 96, 'door');
            door.body.immovable = true;
        var ledge = platforms.create(300, 250, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(550 , 350, 'platform');
            ledge.scale.setTo(0.5, 1);
            ledge.body.immovable = true;
        var bound = bounds.create(540, 286, 'bound');
            bound.body.immovable = true;
        var bound = bounds.create(750, 286, 'bound');
            bound.body.immovable = true;
        var ledge = platforms.create(0, game.world.height/2 - 32, 'platform');
            ledge.scale.setTo(4.5, 2);
            ledge.body.immovable = true;
        var ledge = platforms.create(2120, 150, 'platform');
            ledge.scale.setTo(0.5, 1);
            ledge.body.immovable = true;
        var bound = bounds.create(2110, 118-32, 'bound');
            bound.body.immovable = true;
        var bound = bounds.create(2320, 118-32, 'bound');
            bound.body.immovable = true;
        var ledge = platforms.create(1920, 260, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(2120, 390, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(1920, 550, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(2120, 700, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(1920, 930, 'platform');
            ledge.scale.setTo(0.5, 1);
            ledge.body.immovable = true;
        var bound = bounds.create(1910, 930-64, 'bound');
            bound.body.immovable = true;
        var bound = bounds.create(2120, 930-64, 'bound');
            bound.body.immovable = true;
        var ledge = platforms.create(1680, 820, 'platform');
            ledge.scale.setTo(0.5, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(1560, 930, 'platform');
            ledge.scale.setTo(0.25, 1);
            ledge.body.immovable = true;
        var ledge = platforms.create(0, 1200-(32*6), 'platform');
            ledge.scale.setTo(1, 6);
            ledge.body.immovable = true;
        var door = doors.create(104, 1200-(32*8), 'door');
            door.body.immovable = true;
        var ledge = platforms.create(400, 1200-(32*2), 'platform');
            ledge.scale.setTo(2, 2);
            ledge.body.immovable = true;
        var ledge = platforms.create(1200, 1200-(32*6), 'platform');
            ledge.scale.setTo(0.75, 6);
            ledge.body.immovable = true;
        
        //make stairs & bounds
        var stair = platforms.create(800, game.world.height/2 - (32+50), 'platform');
            stair.scale.setTo(2.5, 2);
            stair.body.immovable = true;
        var stair = platforms.create(850, game.world.height/2 - (32+100), 'platform');
            stair.scale.setTo(1.25, 2);
            stair.body.immovable = true;
        var stair = platforms.create(900, game.world.height/2 - (32+150), 'platform');
            stair.scale.setTo(1.125, 2);
            stair.body.immovable = true;
        var stair = platforms.create(950, game.world.height/2 - (32+200), 'platform');
            stair.scale.setTo(1, 2);
            stair.body.immovable = true;
        var bound = bounds.create(940, game.world.height/2-(64+200), 'bound');
            bound.body.immovable = true;
        var bound = bounds.create(1350, game.world.height/2-(64+200), 'bound');
            bound.body.immovable = true;
        var stair = platforms.create(1500, game.world.height/2 - (32+200), 'platform');
            stair.scale.setTo(0.75, 7);
            stair.body.immovable = true;
        var bound = platforms.create(1490, game.world.height/2-(64+200), 'bound');
            bound.body.immovable = true;
        var bound = bounds.create(1800, game.world.height/2-(64+200), 'bound');
            bound.body.immovable = true;
        
        //make movable objects group
        movers = game.add.group();
        movers.enableBody = true;
        
        //make mover
        var mover = movers.create(1700, 748, 'mover');
            mover.scale.setTo(3, 1);
            mover.body.collideWorldBounds = true;
            mover.body.gravity.y = 600;
            mover.body.drag = 1000;
        
        //make bullies group
        bullies = game.add.group();
        bullies.enableBody = true;
        
        //make bully objects
        var bully = bullies.create(200, 505, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(300, 505, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1030, 302, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1100, 302, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(600, 286, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1510, 302, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1790, 302, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(2130, 118-32, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(2020, 930-64, 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(410, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(1100, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(600, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = -200;
            bully.body.bounce.x = 1;
        var bully = bullies.create(800, 1200-(32*4), 'bully');
            bully.body.collideWorldBounds = true;
            bully.scale.setTo(2, 2);
            bully.body.velocity.x = 200;
            bully.body.bounce.x = 1;
        
        
        //make the player
        player = game.add.sprite(104, 96, 'dude');
        //player physics
        game.physics.arcade.enable(player);
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
        //game camera settings
        game.camera.follow(player);
        game.camera.deadzone = new Phaser.Rectangle(200, 150, 400, 300);
        //player walking animations
        player.animations.add('left', [0, 1, 0, 1], 5, true);
        player.animations.add('right', [2, 3, 2, 3], 5, true);
        
        //make hp text
        hpText = game.add.text(16, 16, 'HP: 300', { fontFamily:'Courier', fontSize:'32px', fill:'#000'});
        hpText.fixedToCamera = true;
        hpText.cameraOffset.setTo(16, 16);
        
        //controls
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function()
    {
        //collide everything with platforms, obstacles, movers
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitObstacle = game.physics.arcade.collide(player, obstacles);
        var hitBully = game.physics.arcade.collide(player, bullies);
        var hitDoor = game.physics.arcade.collide(player, doors);
        var hitBullet = game.physics.arcade.overlap(player, beers, touchBeer, null, this);
        game.physics.arcade.collide(bullies, bounds);
        game.physics.arcade.collide(bullies, platforms);
        game.physics.arcade.collide(player, movers);
        game.physics.arcade.collide(movers, platforms);
        game.physics.arcade.collide(movers, obstacles);
        
        //collect things if u touch them
        
        if(hitDoor&& player.y >200){
            game.state.start('boss');
        }
        
        //bullies and obstacles hurt u if u touch them
        if (hitBully)
        {
            touchBully(player, bullies);
        }
        if (hitObstacle)
        {
            touchBully(player, obstacles);
        }
        //set player movement
        player.body.velocity.x = 0;
        var direction = 1;
        if(this.game.time.totalElapsedSeconds() - 10 < drunkTime){
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
            player.body.velocity.y = -450;
        }
        
        if (hp<=0)
        {
            //go to game over/menu state
            game.state.start('gameOver');
        }
        
        //if (reach door, hGet & dGet both true)
        // {go to next stage}
    }
};
    
function touchBully (player, baddie)
{
    hp -= 10;
    hpText.text = 'HP: ' + hp;
}

function touchBeer (player, beer){
    beer.kill();
    drunkTime = this.game.time.totalElapsedSeconds();
}
