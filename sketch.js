//GameStates
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, fruit, fruitGroup, enemyGroup;
var swordImage, monstermage, fruit1, fruit2, fruit3, fruit4, gameoverImage;

var sound , sound1;


function preload(){
 //Loading Animations 
 swordImage = loadImage("sword.png");
 monsterImage = loadAnimation("alien1.png","alien2.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 gameoverImage = loadImage("gameover.png");
  
 
 sound = loadSound("knifeSwooshSound.mp3");
 sound1 = loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(400,400);
  
  //Creating Sword
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.5;
  sword.debug = false;
  sword.setCollider("rectangle",0,0,50,50);
  
  //Groups.
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  score = 0;

}

function draw(){
  background("lightblue");
  
  //GameState Play.
  if (gameState === PLAY){
    fruits();
    enemy();
    
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score + 1
      sound.play();
      
      
    }
    
    //GameState END.
    else if (enemyGroup.isTouching(sword)){
     gameState = END;
     
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     
     sound1.play();
      
     sword.addImage(gameoverImage);
     sword.x = 200;
     sword.y = 200;
   }
      
        
  
    
  }
  drawSprites();
  
  text("Score: "+ score,300,30);
}

//Fruit function
function fruits(){
    if(World.frameCount%80===0){
      position = Math.round(random(1,2));
  
    fruit = createSprite(400,200,20,20);
      console.log(position);
      fruit.scale = 0.2;
     
     if(position == 1)
      {
      fruit.x = 600;
       fruit.velocityX  = -(7 + (score/4));
      
      }
      else
      {
        if(position == 2){
          fruit.x = 0;
          fruit.velocityX = (7 +(score/4));
        }
        }   
        
       fruit.scale = 0.2;
       fruit.debug = false;
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50,340));
    //fruit.setLifetime = 100;
    //fruit.velocityX = -4;
    fruitGroup.add(fruit)
  
}
}

//enemy function.
function enemy(){
  if(World.frameCount %200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    monster.velocityX=-(8+(score/10));
    
    enemyGroup.add(monster);
  }
}
    
    
    
    
    
    
    
    
    
      
    
    
  
