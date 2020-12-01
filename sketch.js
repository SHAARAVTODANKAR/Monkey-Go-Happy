
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var survivaltime = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
//createCanvas(600,600)
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.2;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
background("lightblue");
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  spawnfood();
  spawnobstacles();
  drawSprites();
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  
  stroke(0);
  textSize(20);
  fill(0);
  text("Score : "+score,10,50);
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime = Math.ceil(frameCount/frameRate());
  text("Survival Time : "+survivaltime,100,50);
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    survivaltime = 0;
    foodGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
  }
}
function spawnfood(){
  if(frameCount % 60 === 0){
     banana = createSprite(600,250,50,10);
    banana.y = random(120,200);
    banana.velocityX = -5;
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnobstacles(){
  if(frameCount % 60 === 0){
     obstacle = createSprite(600,320,50,10);
    
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}



