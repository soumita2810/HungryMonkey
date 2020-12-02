var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey , monkey_running , monkey_stop , ground, backGround;
var banana ,bananaImage, obstacle, obstacleImage, bgImage;
var FoodGroup, obstacleGroup;

var survivalTime;
var score;

function preload()
{
  
  monkey_running =   loadAnimation("monkey_1.png","monkey_2.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  monkey_stop = loadAnimation("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
  bgImage = loadImage("jungal.jpg");
}

function setup() 
{
  
  createCanvas(600,600);
  
  survivalTime = 0;
  score = 0;
  
  backGround = createSprite(0,0,600,600);
  backGround.addImage(bgImage);
  backGround.scale = 0.5;
  
  ground = createSprite(0,500,2000,10);
  ground.velocityX = ground.width/2;
  ground.shapeColor = "black";

  monkey = createSprite(50,450,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
  monkey.scale = 0.20;
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.hight);
  //monkey.debug = true;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
  
}


function draw()
{  
  
 // console.log(monkey.y)
  
  if(gameState===PLAY)
  {    
    //call the functions
    spawnBanana();
    spawnObstacles();

    //moving ground
    if(ground.x < 0)
    {
      ground.x = ground.width/2;
    }  

    ground.velocityX = -(4 +(score/20));
    
    //if space key is pressed the monkey should jump
    if(monkey.y >=433 && keyDown("space"))
    {
      monkey.velocityY = -18;
    }  

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;  
        
    //if the monkey touches any banana then score will increase
    if(monkey.isTouching(FoodGroup))
    {
      banana.destroy();
      score++;
    }  
    if(monkey.isTouching(obstacleGroup))
    {
      gameState = END;
    }  
    
  }  
  else if(gameState===END)
  {
    monkey.changeAnimation("stop",monkey_stop);
    //stop the monkey and the ground
    monkey.velocityY = 0;
    ground.velocityX = 0;
    //stop the obstacles and the bananas
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    //set lifetime of objects so that they are never destroyed
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }  
  
  //collide the monkey 
  monkey.collide(ground);  
  
  drawSprites();
  
  //text the score
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : "+score,450,50);
  //text the servival time
  survivalTime = Math.ceil(frameCount/frameRate());
  stroke("white");
  textSize(20);
  fill("white");
  text("SURVIVAL TIME : "+survivalTime,10,50);
  
}

function spawnBanana()
{
  //if frame count is 80 make a sprite for banana
  if(World.frameCount % 100 === 0)
  {
    //create a sprite for banana
    banana = createSprite(600,250,10,10);
    
    //give it random y position
    banana.y = Math.round(random(180,300));
    //give it image and scale
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    //give it velocity and lifetime
    banana.velocityX = -(6+(score/10));
    banana.lifetime = 100;
    //add in the group
    FoodGroup.add(banana);
  }  
}

function spawnObstacles()
{
  //if frame count is 300 create a sprite of obstacles
  if(World.frameCount % 300 === 0)
  {
    //if frame count is 300 make a sprite for obstacles
    obstacle = createSprite(600,450,10,10);
    //set collider
    obstacle.setCollider("circle",0,0);
    //give it image and scale
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.20;
    //give it velocity and lifetime
    obstacle.velocityX = -(6+(score/20));
    obstacle.lifetime = 100;
    //add in the group
    obstacleGroup.add(obstacle);
  }  
}