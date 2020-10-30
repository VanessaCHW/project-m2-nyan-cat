class Engine {

  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.enemies = [];
    this.leftenemies = []; //New array for enemies coming from the left
    this.items = []; // New array for items that will pop randomly
    addBackground(this.root);    
  }

 
  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();

    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    /**  Update position for enemies coming left*/
    this.leftenemies.forEach((enemy) => {
      enemy.updateLeftEnemies(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    /**  Remove destroyed enemies coming left*/
    this.leftenemies = this.leftenemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    /** Create enemies from the left. Settings (x,y)
     *  are different from regular enemies.
     */
    while(this.leftenemies.length < MAX_LEFT_ENEMIES){
      const spot = nextLeftEnemySpot(this.leftenemies);
      let leftEn = new Enemy(this.root, spot);
      leftEn.x = -PLAYER_HEIGHT;
      leftEn.y = spot * PLAYER_HEIGHT+15;
      leftEn.domElement.style.left = `${leftEn.x}px`;
      leftEn.domElement.style.top = `${leftEn.y}px`;
      this.leftenemies.push(leftEn);
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      stopScoreboard();
      clearInterval(startLevelCount);
      document.getElementById('restartPrompt').style.display = 'block';
      backgroundMusic.stop();
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);

    //************************** */
    // ITEMS
    //************************** */
    timeForItem+=1;
    if(timeForItem>delayItem){
      //Destroy previous item
      if(this.items.length>0){
        this.items[0].removeItem(this.root);
        this.items.pop();
      }
      timeForItem =0;
      // Create new item
      let x = (Math.floor(Math.random()*11))*PLAYER_WIDTH;
      let y = (Math.floor(Math.random()*8))*PLAYER_HEIGHT;
      let itemNum = (Math.floor(Math.random()*2)==0)? 'mug':'man';
      let newItem = new item(gameEngine.root,itemNum,x,y);
      this.items.push(newItem);
      //set new random delay
      delayItem =  Math.floor(Math.random()*200)+155;
    }
    if(this.items.length >0){
      this.items[0].itemSelected();
    }

  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let isDead = false;
    let thePlayer = this.player;
    this.enemies.forEach(enemy =>{
      
      // if they didn't collide yet 
      // and are in the same column
      if(enemy.collided == false && thePlayer.x == enemy.x)
      {
        if((enemy.y+ENEMY_HEIGHT) > thePlayer.y 
        && (enemy.y+ENEMY_HEIGHT)< (thePlayer.y+PLAYER_HEIGHT)
        || (enemy.y < (thePlayer.y+PLAYER_HEIGHT) 
          && thePlayer.y<(enemy.y+ENEMY_HEIGHT)))
        {
          enemy.collided = true;
          enemy.domElement.style.display = 'none';
          isDead = thePlayer.health ==1? true:false;
          thePlayer.health -=1;
  
          //update health
          document.getElementById('livesRemaining').innerText = `HEALTH: ${thePlayer.health} / ${PLAYER_MAX_HEALTH}`;

          toggleAnimation();
          collisionSound.play();
        }
      }
    });

    this.leftenemies.forEach(enemy =>{
      
      // if they didn't collide yet 
      // and are in the same column
      if(enemy.collided == false && thePlayer.y == enemy.y)
      {
        if((enemy.x+LEFT_ENEMY_WIDTH) > thePlayer.x 
        && (enemy.x+LEFT_ENEMY_WIDTH)< (thePlayer.x+PLAYER_WIDTH)
        || (enemy.x > thePlayer.x 
          && thePlayer.x+PLAYER_WIDTH>enemy.x))
        {
          enemy.collided = true;
          enemy.domElement.style.display = 'none';
          isDead = thePlayer.health ==1? true:false;
          thePlayer.health -=1;
  
          //update health
          document.getElementById('livesRemaining').innerText = `HEALTH: ${thePlayer.health} / ${PLAYER_MAX_HEALTH}`;

          toggleAnimation();
          collisionSound.play();
        }
      }
    });

    return isDead;
  };
}
