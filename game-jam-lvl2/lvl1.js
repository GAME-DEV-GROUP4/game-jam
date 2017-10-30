var player;
var platforms;
var cursors;
var stars;
var baddies;
var score = 0;
var scoreText;

test.lvl1 = function(){};
test.lvl1.prototype = 

{
    preload: function()
    {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.spritesheet('dude', 'assets/dude.png', 28, 48);
    

 },
    create: function()
    {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    
    platforms = game.add.group();
    
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');

    ground.scale.setTo(2, 2);

    ground.body.immovable = true;
    
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    
    player.animations.add('left', [0, 1, 0, 1], 5, true);
    player.animations.add('right', [2, 3, 2, 3], 5, true);
    
    stars = game.add.group();
    
    stars.enableBody = true;
    
    baddies = game.add.group();
    
    baddies.enableBody = true;
    
    for (var i = 0; i < 3; i++)
    {
        var star = stars.create(i * 100, 300, 'star');

        star.body.gravity.y = Math.random() * 500;
        
        star.body.bounce.y = 0.7 + Math.random() * 0.4;
        
        star.body.velocity.x = Math.random() * 500
        
        star.body.bounce.x = 0.7 + Math.random() * 0.4
        
        star.body.collideWorldBounds = true
    }
        
    for (var i = 0; i < 3; i++)
    {
        var star = stars.create(i * 160, 300, 'star');

        star.body.gravity.y = Math.random() * 500;
        
        star.body.bounce.y = 0.7 + Math.random() * 0.4;
        
        star.body.velocity.x = -(Math.random() * 500)
        
        star.body.bounce.x = 0.7 + Math.random() * 0.4
        
        star.body.collideWorldBounds = true
    }
    
    for (var i = 0; i < 3; i++)
    {
        var baddie = baddies.create(i * 250, 0, 'baddie', );
        
        baddie.frame = 1
        
        baddie.body.gravity.y = Math.random() * 900;
        
        baddie.body.bounce.y = 0.7 + Math.random() * 0.4;
        
        baddie.body.velocity.x = Math.random() * 500
        
        baddie.body.bounce.x = 0.7 + Math.random() * 0.4
        
        baddie.body.collideWorldBounds = true
    }
        
    for (var i = 0; i < 3; i++)
    {
        var baddie = baddies.create(i * 250, 0, 'baddie', );
        
        baddie.frame = 1
        
        baddie.body.gravity.y = Math.random() * 900;
        
        baddie.body.bounce.y = 0.7 + Math.random() * 0.4;
        
        baddie.body.velocity.x = Math.random() * 500
        
        baddie.body.bounce.x = 0.7 + Math.random() * 0.4
        
        baddie.body.collideWorldBounds = true
    }
    
    cursors = game.input.keyboard.createCursorKeys();
    
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    },
    update: function()
    {

    player.body.velocity.x = 0;
    
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(baddies, platforms);
    
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, baddies, collectBaddie, null, this);
    
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        player.animations.stop();

        player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    
}
};
    
function collectStar (player, star) {
    
    star.kill();

    score += 10;
    
    if (score == 100)
        {
            game.state.start('lvl2')
        }

}
    
function collectBaddie (player, baddie) {
    
    game.state.start('gameOver');
    
}