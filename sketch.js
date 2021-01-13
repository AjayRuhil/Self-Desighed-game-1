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
var bulletGroup1,enemyGroup1
var soldierStanding

function preload() {
  groundImg=loadImage("Images/ground.png")
  soldierImg=loadAnimation("Images/1.jpg","Images/2.png","Images/3.png","Images/4.png","Images/5.png","Images/6.png")
  cabinImg=loadImage("Images/cabin1.png")
  enemyImg=loadImage("Images/images.png")
  backgroundImg=loadImage("Images/Background.png")
  soldierBending=loadAnimation("Images/soldierBending(4).png")
  soldierDying=loadAnimation("Images/soldierDying(9).png")
  background2Img=loadImage("Images/background2.png")
  bulletImg=loadImage("Images/bullets.png")
soldierStanding=loadImage("Images/soldierBending(1).png")
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

bulletGroup1=new Group()
enemyGroup1=new Group()


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
    console.log(soldier.y)

   
   // ground.visible=true
    if(ground.x<0){
    ground.x=ground.width/2
    
    }
    cabin.visible=true
   
    if(touches.length>0||keyDown("space")&&soldier.y>=400){
      cabin.destroy()
      soldier.visible=true
      //soldier.velocityX=10
      soldier.velocityY=-15
      touches=[]
      
    }
    
    soldier.collide(ground)
    //soldier.collide(invisible)
    //soldier.velocityX=soldier.velocityX-0.5  
    soldier.velocityY=soldier.velocityY+0.5
    if(frameCount%300===0){
      var enemy=createSprite(width,height-100,20,20)
      enemy.addImage("enemy",enemyImg)
    
      enemy.scale=1.5
      enemy.velocityX=-2
      var bullets =createSprite(12,12,30,30)
      bullets.debug=true
      bullets.setCollider("rectangle",0,0,150,50)

      bullets.addImage("bullet",bulletImg)
      bullets.x=enemy.x
      bullets.y=random(460,512)
      bullets.velocityX=Math.round(random(-10,-20))
      bullets.velocityY=(random(-1,-3))
      bulletGroup.add(bullets)
      enemyGroup.add(enemy)
      console.log(bullets.velocityX)


    }
    if(enemyGroup.isTouching(soldier)){
      enemyGroup.destroyEach()
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
    if(keyDown("space")&&soldier.y>=400){
     
      soldier.velocityY=-15
      
    }
    distance=distance+1
    fill("white")
    textSize(30)
    text(distance,1000,50)
    if(distance>=600){
      enemyGroup.destroyEach()
      bulletGroup.destroyEach()
      soldier.addAnimation("soldier",soldierStanding)
      text("You have escaped from jail",200,100)
      if(keyDown("R")){
        gameState="level2"
      }
      
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
    soldier.velocityX=0
    soldier.velocityY=0
  }
  if(gameState==="level2"){
    background(background2Img)
    soldier.collide(ground)
    enemyGroup.destroyEach()
    if(frameCount%200===0){
      soldier.addAnimation("soldier",soldierImg)
      var enemy=createSprite(width,height-100,20,20)
      enemy.addImage("enemy",enemyImg)
    
      enemy.scale=1 
      enemy.velocityX=-2
      var bullets =createSprite(12,12,30,30)
      bullets.debug=true
      bullets.setCollider("rectangle",0,0,150,50)
      bullets.scale=0.5
      bullets.addImage("bullet",bulletImg)
      bullets.x=enemy.x
      bullets.y=random(460,512)
      bullets.velocityX=Math.round(random(-10,-20))
      bullets.velocityY=(random(-1,-3))
      bulletGroup1.add(bullets)
      enemyGroup1.add(enemy)
      console.log(bullets.velocityX)


    }
    if(enemyGroup1.isTouching(soldier)){
      enemyGroup1.destroyEach()
    }
    if(bulletGroup1.isTouching(soldier)){
      gameState="level2End"
      
      enemyGroup1.destroyEach()
      bulletGroup1.destroyEach()

    }
    if(gameState==="level2End"){
      background(background2Img)  
      soldier.addAnimation("soldier",soldierDying)
      bulletGroup1.setVelocityXEach(0)
      enemyGroup1.setVelocityXEach(0)
      soldier.collide(ground)
      soldier.velocityX=0
      soldier.velocityY=0
      
    }


  }
  
  
  drawSprites();
}