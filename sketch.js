var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlockGroup = new Group();

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  ghost = createSprite (200, 200);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = .3;

  spookySound.loop();



  
}


function doors() {
if(frameCount % 180 == 0){

door = createSprite(200, 50);

doorsGroup.add(door);
door.addImage("door", doorImg);
door.velocityY = 3;

door.x = Math.round(random(120, 400));

door.lifetime = 800;


climber = createSprite(200, 120);

climbersGroup.add(climber);
climber.addImage("climber", climberImg);
climber.velocityY = 3;

climber.x = door.x;

climber.lifetime = 800;


invisibleBlock = createSprite (200, 120);
invisibleBlock.x = climber.x
invisibleBlock.width = climber.width
invisibleBlock.height = 2;
invisibleBlock.velocityY = 3;
invisibleBlockGroup.add(invisibleBlock);

ghost.depth = door.depth;
ghost.depth += 1;


}
}

function draw() {
  background(200);
  if(gameState == "play"){


  
  
  if(tower.y > 400){
      tower.y = 300
    }


    if(keyDown("space")){
      ghost.velocityY = -5;
      



    }
    ghost.velocityY = ghost.velocityY + 0.5

    if(keyDown("right")){
    ghost.x = ghost.x + 3
  

    }
  if(keyDown("left")){
      ghost.x = ghost.x - 3
    
  
      }
    

    if(ghost.isTouching(climbersGroup)){
  ghost.velocityY = 0;


    }

    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600){
  ghost.destroy();
  gameState = "end";


    }
  
    doors();

    drawSprites();
  }
  if(gameState == "end"){
    textSize(30);
    fill ("red");
text ("game over", 230, 250);



  }
  }
