
var rage;
var door;
var boss;
var attackSprites;

function preload(){
    game.load.image('warningdeadline');
    game.load.image('deadline');
}

if(rage >= 100){
    door = true;
    
}
function create(){
    attackSprites = game.add.group();
    game.time.events.loop(PHASER.Timer.SECOND*20, bossAttack, this);
}
var fx;
function bossAttack(){
  min = Math.ceil(2);
  max = Math.floor(1);
  rand = Math.floor(Math.random() * (max - min + 1)) + min;
  if(rand = 1){
      fx.play('audioqueueA');
      predeadlineHorizontal();
      predeadlineVertical();
      fireball();
  }
  }

function deadlinehorizontal(player){
    var deadlinetime = game.time.now + 3000;
    var ypos = player.y;
    var predeadline = attackSprites.create(0, ypos, 'warningdeadlinehort');
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    
    
    if (game.time.now > deadlinetime){
        var deadline = attackSprites.create(0, ypos, 'deadlinehort');
        game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    }
}

function deadlinevertical(player){
    var deadlinetime = game.time.now + 3000;
    var xpos = player.x;
    var predeadline = attackSprites.create(0, xpos, 'warningdeadlinevert');
    game.add.tween(predeadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    
    
    if (game.time.now > deadlinetime){
        var deadline = attackSprites.create(0, xpos, 'deadlinevert');
        game.add.tween(deadline).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
    }
}

function fireball(fireballSpeed){
    var fireball = attackSprites.create(bossX, bossY, 'fireball');
    fireballx = (playerx - fireballx)/fireballSpeed;
    firebally = (playery- firebally)/fireballSpeed;
    fireball.x += fireballx;
    fireball.y += firebally;
    fireball.checkWorldBounds=true;
    fireball.events.onOutOfBounds.add(fireball.kill(),this());
}

function charge(){
    
}
function suit(){
    
}