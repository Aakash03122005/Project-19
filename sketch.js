
var PLAY=1;
var END=0;
var gameState=1;

var car,car_Img ;
var petrol ,petrolImage;
var obstacleImage,obstacle2;

var score;

var survivalTime;

var restart, restartImage;
var gameOver,gameOverimg;
var lose,loseimg;


function preload()
{
  
  car_Img = loadImage("car.png");
  
  petrolImage = loadImage("petrolcan.png");
  
  obstacleImage = loadImage("stone.png");
  
  restartImage=loadImage("restart.png")
  
  gameOverimg=loadImage("gameover.png");

  loseimg=loadImage("youlose.png");

  
  score=0;
}



function setup()
 {
  createCanvas(700,500);

  car=createSprite(80,450,20,20);
  car.addImage(car_Img);
  car.scale=0.3;

 
  ground=createSprite(350,480,700,40);
  ground.velocityX=-6;

 
  restart=createSprite(350,400,20,20);
  restart.addImage(restartImage);
  restart.scale=0.05;

  petrolGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver=createSprite(350,250,20,20);
  gameOver.addImage(gameOverimg);
  gameOver.scale=0.1;
  
  lose=createSprite(350,150,20,20);
  lose.addImage(loseimg);
  lose.scale=0.4;

}


function draw() 
{

  background("lightblue");

  ground.x = ground.width /2;
  ground.visible=true;
  ground.shapeColor="green";
  console.log(ground.x)
  
  if(gameState===PLAY)
  {
   survivalTime=Math.ceil(frameCount/frameRate())
    
    restart.visible=false;
    gameOver.visible=false;
    lose.visible=false

    car.collide(ground)
  
    car.setCollider("rectangle",-30,20,450,200);
    car.debug = false;
  
    if(keyDown("space")&& car.y>=290)
    {
    car.velocityY=-13;
    }

    car.velocityY=car.velocityY+0.8
  
    spawnpetrolcans();
    spawnobstacle();

  if(car.isTouching(petrolGroup))
  {
    score=score+1;
    petrolGroup.destroyEach();
  }

  if(obstacleGroup.isTouching(car))
  {

   gameState=END;
    
  }

  }else

  if(gameState===END)
    {

      textSize(24);
      fill("black");
      text("Crash!!",320,320);
      text("Click Here to Restart the Game",200,350);
  
    
      restart.visible=true;
      gameOver.visible=true;
      car.visible=false;
      lose.visible=true;

      ground.velocityX=0;
      car.velocityY=0;

      petrolGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);

      petrolGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);

      petrolGroup.destroyEach();
      obstacleGroup.destroyEach();

      
    }
  
  
  if(mousePressedOver(restart))
  {
    reset();
  }

  stroke("black");
  textSize(20);
  fill("black");
  text("CANS COLLECTED:"+score,450,50);

  stroke("black");
  textSize(20);
  fill("black");
  text("SURVIVALTIME:"+survivalTime,50,50);
  
  drawSprites();
  
}

function spawnpetrolcans()
{

  if(frameCount % 80===0)
  {
    petrol = createSprite(600,200,20,20);
    petrol.addImage(petrolImage);
    petrol.scale=0.2;
    petrol.y = Math.round(random(120,200));
    petrolGroup.add(petrol);
    petrolGroup.setVelocityXEach(-8);
    // memory leak..
    petrolGroup.setLifetimeEach(70);
    
  }
}

function spawnobstacle()
{
  
  if(frameCount % 300===0){
    
    obstacle2 = createSprite(600,430,20,20);
    obstacle2.addImage("obstacle",obstacleImage);
    obstacle2.velocityX=-9;
    obstacle2.scale=0.2;
    obstacleGroup.add(obstacle2);
    obstacle2.setCollider("circle",0,0,250)
  }
}

function reset()
{
  gameState=PLAY;
  car.visible=true;
  obstacleGroup.destroyEach();
  petrolGroup.destroyEach();
  survivalTime=0;
  score=0;
}







