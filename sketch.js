var gameState
var ground,groundImg,soldier,soldierImg
var cabin,cabinImg
var invisible,enemyImg


function preload() {
  groundImg=loadImage("Images/ground.png")
  soldierImg=loadAnimation("Images/1.jpg","Images/2.png","Images/3.png","Images/4.png","Images/5.png","Images/6.png")
  cabinImg=loadImage("Images/download.png")
  enemyImg=loadImage("Images/images.png")
}

function setup() {
createCanvas(windowWidth,windowHeight);
gameState="Start"

soldier = createSprite(70, height-200,20,50);
soldier.addAnimation("soldier", soldierImg);
soldier.visible=false
soldier.scale=0.8

ground = createSprite(width/2,height+40,width,10);
ground.addImage("ground",groundImg);
ground.x = width/2
ground.visible=false

cabin=createSprite(70,height-200,20,20)
cabin.addImage("cabin",cabinImg)
cabin.visible=false

invisible=createSprite(0,height-200,20,50)
invisible.visible=false

}

function draw() {
  background("red");
  if(gameState==="Start"){
    textSize(20)
    text("Welcome!You have entered the game.This game is about",windowWidth/2-300,250)
    text("an soldier has to escape from Pakistan after completing the misson",windowWidth/2-300,270)
    text("but now Pakistani soldier are trying to stop him.You have to avoid",windowWidth/2-300,290)
    text("the bullets by pressing up and down arrow.Reach level 3 to complete the game",windowWidth/2-300,310)
    if(keyDown("Enter")){
      gameState="Level 1"
      
    }
  }  
  if(gameState==="Level 1"){
    background("green")
    ground.velocityX = -(2);
   
    ground.visible=true
    if(ground.x<0){
    ground.x=ground.width/2
    
    }
    cabin.visible=true
   
    if(keyDown("space")){
      cabin.destroy()
      soldier.visible=true
      soldier.velocityX=10
      soldier.velocityY=-10
      
    }
    
    soldier.collide(ground)
    soldier.collide(invisible)
    soldier.velocityX=soldier.velocityX-0.5  
    soldier.velocityY=soldier.velocityY+0.5
    if(frameCount%100===0){
      var enemy=createSprite(width,height-100,20,20)
      enemy.addImage("enemy",enemyImg)
      enemy.velocityX=-2

    }
  }
  
  drawSprites();
}