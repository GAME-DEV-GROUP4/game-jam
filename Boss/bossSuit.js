//requires WeaponManager plugin
demo.test = function(){};

var platforms;
var player;
var cursors;
var boss;
var bossWeapon; //weapon manager
var hitTime; //last time player was hit
var playerx = 150; //default x velocity for player
var playery = 350; //default y velocity for player

demo.test.prototype =
{
    preload: function(){
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');


    },
        
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
    
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        boss = game.add.sprite(768, game.world.height - 150, 'baddie');
        game.physics.arcade.enable(boss);
        boss.body.collideWorldBounds = true;
        
        //create WeaponManager for boss with a limit of 1 bullet on screen and a speed of 200
        bossWeapon = game.add.weapon(1, 'star');
        bossWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        bossWeapon.bulletSpeed = 200;
        weapon.trackSprite(boss, 0, 0, true);
        
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    update: function(){
    
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        var hitBullet = game.physics.arcade.collide(player, bullets);
	
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
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            player.body.velocity.y = 0-playery;
        }
        
        //when hit by bullet get the time of being hit and for 1 second half player velocity otherwise return it to default values
        if(hitBullet){
            hitTime = this.game.time.totalElapsedSeconds();
        }
        if(this.game.time.totalElapsedSeconds()-hitTime <1){
            playerx = 75;
            playery = 175;
        }
        else{
            playerx = 150;
            playery=350;
        }
    }
};