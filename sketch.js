var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX =-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
   obstacleGroup = createGroup();
  foodGroup = createGroup();

  survivalTime = 0
}


function draw() {
  background("lightBlue")
  text("Survival Time: "+ survivalTime, 500,50);
  
  
  if ( gameState === PLAY){
    
     survivalTime =Math.ceil(frameCount/frameRate())
    
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     banana()
    obstacle()
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
    survivalTime = 0
  }
  
  monkey.collide(ground);
 
 drawSprites();
}

function banana(){
 if(frameCount % 80 === 0){
   var food = createSprite(600,165,10,10)
   food.y = Math.round(random(120,200));
   food.addImage(bananaImage)
   food.velocityX = -4;
   food.setLifetime= 200;
   food.scale=0.1;
   foodGroup.add(food)
 }  
}

function obstacle(){
   if(frameCount % 100 === 0){
   var stone = createSprite(600,310,10,10)
   stone.addImage(obstacleImage)
   stone.velocityX = -4;
   stone.setLifetime= 200;
   stone.scale=0.2;
   obstacleGroup.add(stone)
 }  
}



