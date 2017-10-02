var rage;
var door;
var boss;
var attackSprites;
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
      predeadlineHorizontal();
      fireball();
  }
  }


}
function predeadlineHorizontal(){
    var predeadline = attackSprites.create(playerx, playery, 'warningdeadline');
    predeadline.scale(screenWidth, height);
    game.time.events.add(PHASER.TIMER.SECOND*1.5, deadlineHorizontal, this, predeadline, predeadlinex, predeadliney);
}

function deadlineVertical(predeadline){
    predeadline.kill();
    var deadline = attackSprites.create(predeadlineX, predeadlineY, "deadline");
    game.time.events.add(PHASER.TIMER.SECOND*0.5, deadline.kill(), this);
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