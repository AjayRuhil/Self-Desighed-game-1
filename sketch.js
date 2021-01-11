var gameState
var ground,groundImg,soldier,soldierImg
var cabin,cabinImg
var invisible,enemyImg
var backgroundImg,background
var bulletGroup,enemyGroup
var soldierBending,soldierDying
var distance=0
var background2Img
var bulletImg

function preload() {
  groundImg=loadImage("Images/ground.png")
  soldierImg=loadAnimation("Images/1.jpg","Images/2.png","Images/3.png","Images/4.png","Images/5.png","Images/6.png")
  cabinImg=loadImage("Images/download.png")
  enemyImg=loadImage("Images/images.png")
  backgroundImg=loadImage("Images/Background.png")
  soldierBending=loadAnimation("Images/soldierBending(4).png")
  soldierDying=loadAnimation("Images/SoldierDying(9).png")
  background2Img=loadImage("Images/background2.png")
  bulletImg=loadImage("Images/bullets.png")

}

function setup() {
createCanvas(windowWidth,windowHeight);
gameState="Start"

soldier = createSprite(70, height-200,20,50);
soldier.addAnimation("soldier", soldierImg);
soldier.visible=false
soldier.scale=0.5

ground = createSprite(width/2,height+40,width,10);
ground.addImage("ground",groundImg);
ground.x = width/2
ground.visible=false

cabin=createSprite(70,height-200,20,20)
cabin.addImage("cabin",cabinImg)
cabin.visible=false

invisible=createSprite(0,height-200,20,50)
invisible.visible=false

bulletGroup=new Group()
enemyGroup=new Group()

}

function draw() {
  background(backgroundImg);
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
   // background("green")
    ground.velocityX = -(2);
   
   // ground.visible=true
    if(ground.x<0){
    ground.x=ground.width/2
    
    }
    cabin.visible=true
   
    if(keyDown("space")){
      cabin.destroy()
      soldier.visible=true
      //soldier.velocityX=10
      soldier.velocityY=-15
      
    }
    
    soldier.collide(ground)
    //soldier.collide(invisible)
    //soldier.velocityX=soldier.velocityX-0.5  
    soldier.velocityY=soldier.velocityY+0.5
    if(frameCount%300===0){
      var enemy=createSprite(width,height-100,20,20)
      enemy.addImage("enemy",enemyImg)
      bullets.addImage("bullet",bulletImg)
      enemy.scale=1.5
      enemy.velocityX=-2
      var bullets =createSprite(12,12,30,30)
      bullets.x=enemy.x
      bullets.y=random(460,512)
      bullets.velocityX=Math.round(random(-10,-20))
      bullets.velocityY=(random(-1,-3))
      bulletGroup.add(bullets)
      enemyGroup.add(enemy)
     console.log(bullets.velocityX)

    }
    if(bulletGroup.isTouching(soldier)){
      gameState="level1End"
      
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()

    }
    if(keyWentDown("DOWN_ARROW")){
      soldier.addAnimation("soldier",soldierBending)
      soldier.scale=0.2
    }
    if(keyWentUp("DOWN_ARROW")){
      soldier.addAnimation("soldier",soldierImg)
      soldier.scale=0.5
    }
    if(keyDown("space")){
     
      soldier.velocityY=-15
      
    }
    distance=distance+1
    text(distance,1000,50)
    if(distance===2000){
      gameState="level2"
    }
    if(distance>500){
      bulletGroup.setVelocityXEach(-50)
      enemyGroup.setVelocityXEach(-10)
     // console.log(bullet.velocityX)
    }
  }
  if(gameState==="level1End"){
    soldier.addAnimation("soldier",soldierDying)
    bulletGroup.setVelocityXEach(0)
    enemyGroup.setVelocityXEach(0)
    soldier.collide(ground)
  }
  if(gameState==="level2"){
    background(background2Img)
  }
  
  drawSprites();
}