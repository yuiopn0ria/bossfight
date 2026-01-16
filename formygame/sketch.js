
var restartbutton,restartbutton_image;
var healing, healing_image;;
var obstacle;
var gamestate = "wait";
var invisible_floor;
var floor;
var hp = 100;
var score = 0;
var player, player_image,player_lost;
var boss, boss_images;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;



function preload(){
player_image = loadImage("player.png",);
player_lost = loadImage("playerlost.png");
boss_images = loadAnimation("boss1.png","boss2.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
restartbutton_image = loadImage("restartbutton.png");
healing_image = loadImage("healing.png");

}


function setup(){
createCanvas(1600,720);
player = createSprite(800,500);
player.addImage("normal",player_image);
player.addImage("lost",player_lost);
player.scale = 0.5;
invisible_floor = createSprite(800,730,1600,10);
invisible_floor.visible = false;
floor = createSprite(800,700,1600,40);
restartbutton = createSprite(600,600);
restartbutton.addImage("restart",restartbutton_image);
restartbutton.scale = 0.5;
restartbutton.visible = false;

boss = createSprite(850,200);
boss.addAnimation("lockedin",boss_images);
boss.scale = 1.5;

obstacles = new Group();
healing = new Group();



}








function draw(){
background("lightblue");







if(gamestate == "wait"){

textSize(30);
fill("black");
text("reach the score of 10000 to make the boss tired and defeated!", 300,600);
text("tap on the player(red soul) to start!!!", 500,400);
fill("red");
text("your the red soul", 500,450);
if(mousePressedOver(player)){
    gamestate = "play";



}
}


if(gamestate == "play"){

    textSize(25);
    fill("black");
    text("press space to jump and use arrow keys to move left or right", 400,600);

    score+= 1;
    player.velocityY += 0.8;


if(score > 500 && score < 650){
    textSize(30);
    fill("red");
    text("boss: alright kid your actually pretty good...",600,500);
}
if(score > 1000 && score < 1150){
    textSize(30);
    fill("red");
    text("boss: you think you can defeat me that easily?",600,500);
}

 if(score > 1500 && score < 1650){
    textSize(30);
    fill("red");
    text("boss: alright your getting in my nerves now...",600,500);

    // spawn your funcions here 
    


 }


if(hp == 0){
    gamestate = "lost";
    player.changeImage("lost",player_lost);
}
if(score == 10000){
    gamestate = "victory";

}


 if(score > 2300 && score < 2450){
    textSize(30);
    fill("red");
    text("boss: I will defeat you once and for all!",600,500);
 }

if(score > 4500 && score < 4560){
    textSize(30);
    fill("red");
    text("i feel tired.....",600,500);
}


if(score > 9700  && score < 9850){
    textSize(30);
    fill("red");
    text("boss: nooo! how could a mere human defeat me...",600,500);
}

 if(score > 2300){
    spawn_obstacle5();
 }
    if(score > 1000){
        spawn_obstacle4();
    }



 if(score > 1650){
    spawn_obstacle3();
 } 
 
if(keyDown("RIGHT_ARROW") && player.x < 1550){
    player.x += 15;
}
if(keyDown("LEFT_ARROW") && player.x > 50){
    player.x -= 15;
}

if(keyDown("SPACE") && player.y >= 600){
    player.velocityY = -20;
}

spawn_obstacle1();
spawn_obstacle2();
if(score > 675){
    spawn_healing_item();
}
maxHP();

}


player.debug = false;
player.setCollider("rectangle",0,0,200,175);




// player colliding with floor
player.collide(invisible_floor);


textSize(20);
fill("red");
text("player HP: " + hp, 50,50);
text("Score: " + score, 1400,50);

player.overlap(obstacles, function(player,obstacle1_attack){
    hp -= 5;
    obstacle1_attack.remove();

})
player.overlap(healing, function(player,healing_item){
    
    hp += 10;
    healing_item.remove();
});



if(gamestate == "lost"){
    textSize(50);
    fill("black");
    text("you lost the game!!!, restart?",600,400);
    restartbutton.visible = true;
    if(mousePressedOver(restartbutton)){
        gamestate = "play";
        hp = 100;
        score = 0;
        player.x = 800;
        player.y = 500;
        player.changeImage("normal",player_image);
        restartbutton.visible = false;
        
    }
    maxHP();
}       



if(gamestate == "victory"){
    textSize(50);
    fill("black");
    text("you defeated the boss!!!",600,400);
    restartbutton.visible = true;
    if(mousePressedOver(restartbutton)){
        gamestate = "play";
        hp = 100;
        score = 0;
        restartbutton.visible = false;
    }

}




















drawSprites();

















}








function spawn_obstacle1(){
remainder = frameCount % 15;
if(remainder == 0){
    var obstacle1_attack = createSprite(random(50,1550), -50);
    obstacle1_attack.velocityY = 15;
    obstacle1_attack.addImage("obstacle1",obstacle1);
    obstacle1_attack.scale = 0.3;
    obstacle1_attack.lifetime = 200;
    obstacles.add(obstacle1_attack);
    obstacle1_attack.debug = false;
    obstacle1_attack.setCollider("rectangle",0,0,50,50);
}

}





function spawn_obstacle2(){
    remainder = frameCount % 100;
    if(remainder == 0){
        var obstacle2_attack = createSprite(1700,600);
        obstacle2_attack.velocityX = -random(10,20);
        obstacle2_attack.addImage("obstacle2",obstacle2);
        obstacle2_attack.scale = 0.7;
        obstacle2_attack.lifetime = 200;
        obstacles.add(obstacle2_attack);
        obstacle2_attack.debug = false;
        obstacle2_attack.setCollider("rectangle",0,0,150,150);

    }






}


function spawn_obstacle3(){
    remainder = frameCount % 150;
    if(remainder == 0){
        var obstacle3_attack = createSprite(random(50,1550), 50);
        obstacle3_attack.velocityY = 10;
        obstacle3_attack.addImage("obstacle3",obstacle3);
        obstacle3_attack.scale = 2;
        obstacle3_attack.lifetime = 200;
        obstacles.add(obstacle3_attack); 
        obstacle3_attack.debug = false;
        obstacle3_attack.setCollider("rectangle",0,0,100,400);
       }
}


function spawn_obstacle4(){
    remainder = frameCount % 65;
    if(remainder == 0){
        var obstacle4_attack = createSprite(random(50,1550),800);
        obstacle4_attack.velocityY = -12;
        obstacle4_attack.addImage("obstacle4",obstacle4);
        obstacle4_attack.scale = 0.2
        obstacle4_attack.lifetime = 200;
        obstacles.add(obstacle4_attack);
        obstacle4_attack.debug = false;

    }
}

function spawn_obstacle5(){
    remainder = frameCount % 75;
    if(remainder == 0){
        var obstacle5_attack = createSprite(-100,600);
        obstacle5_attack.velocityX = random(10,20);
        obstacle5_attack.addImage("obstacle5",obstacle5);
        obstacle5_attack.scale = 0.7
        obstacle5_attack.lifetime = 200;
        obstacles.add(obstacle5_attack);
        obstacle5_attack.debug = false;
        obstacle5_attack.setCollider("rectangle",0,0,200,150);
    }

}


function spawn_healing_item(){
    remainder = frameCount % 450;
    if(remainder == 0){
        var healing_item = createSprite(random(50,1550), -50);
        healing_item.velocityY = 10;
        healing_item.addImage("healing",healing_image);
        healing_item.scale = 0.3;
        healing_item.lifetime = 200;
        healing.add(healing_item);
        healing_item.debug = false;
        healing_item.setCollider("rectangle",0,0,50,50);
        
    }
}

function maxHP(){
    if(hp > 100){
        hp = 100;
    }
    if(hp < 0){
        hp = 0;
    }
}