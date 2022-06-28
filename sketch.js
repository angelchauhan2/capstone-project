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
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  doorsGroup= new Group()
  climbersGroup= new Group()
  invisibleBlockGroup= new Group()
}

function draw() {
  background(200);
  if(gameState==="play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3
    }

    if(keyDown("right_arrow")){
      ghost.x=ghost.x+3
    }

    if(keyDown("space")){
      ghost.velocityY=-5
    }

    ghost.velocityY=ghost.velocityY+0.8;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy()
      gameState="end"
    }
    

    spawnDoors()
    drawSprites()
  }
  if(gameState==="end"){
    stroke("purple")
    fill("purple")
    textSize(30)
    text("GAME OVER",230,270)
  }
}
function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,-50);

    var climber=createSprite(200,10);
    climber.addImage(climberImg);

    var invisibleBlock= createSprite(200,50);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;


    door.addImage(doorImg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;

    climber.x=door.x
    climber.velocityY=1;

    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;

    door.lifetime=800;
    climber.lifetime=800;

    ghost.depth=door.depth;
    ghost.depth+=1;

    doorsGroup.add(door)
    climbersGroup.add(climber)

    invisibleBlock.debug=true
    invisibleBlockGroup.add(invisibleBlock)

    


  }
}
