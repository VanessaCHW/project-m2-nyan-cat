// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {

    this.health = PLAYER_MAX_HEALTH;
    this.x = 5 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.score = 0;
    this.level = 1;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/purple.gif';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';

    this.domElement.id = 'player';

    root.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  /**MOVE UP */
  moveUp(){
    if(this.y > PLAYER_HEIGHT ){
      this.y -= PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }

  /**MOVE DOWN */
  moveDown(){
    if(this.y < (GAME_HEIGHT-2*PLAYER_HEIGHT) ){
      this.y += PLAYER_HEIGHT;
    }
    this.domElement.style.top = `${this.y}px`;
  }

  /**RESET PLAYER */
  resetPlayer(){
    this.health = PLAYER_MAX_HEALTH;
    this.x = 5 * PLAYER_WIDTH;
    this.y = 390;//GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.score = 0;

    //Level reset
    this.level = 1;
    MAX_ENEMIES = 3;
    MAX_LEFT_ENEMIES = 2;
    speedIncrement = 0.1;
    document.getElementById('level').innerText = `LEVEL : ${this.level}`;

    document.getElementById('score').innerText = `SCORE: ${this.score}`;
    document.getElementById('livesRemaining').innerText = `HEALTH: ${PLAYER_MAX_HEALTH} / ${PLAYER_MAX_HEALTH}`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.left = `${this.x}px`;
  }

  resetLevel(){
    this.level = 1;
    MAX_ENEMIES = 3;
    MAX_LEFT_ENEMIES = 2;
    speedIncrement = 0.1;
    document.getElementById('level').innerText = `LEVEL : ${this.level}`;
  }

  increaseLevel(){
    if(this.level <=8){
      this.level +=1;
    }else{
      speedIncrement += 0.05;
      MAX_ENEMIES +=1;
      MAX_LEFT_ENEMIES +=1;
    }
    
    switch (this.level) {
      case 1:
        speedIncrement = 0.11;
        break;
      case 2:
        MAX_ENEMIES = 3;
        MAX_LEFT_ENEMIES = 3;
        speedIncrement = 0.12;
        break;
      case 3:
        speedIncrement = 0.15;
        break;
      case 4:
        MAX_ENEMIES = 4;
        speedIncrement = 0.17;
        break;
      case 5:
        speedIncrement = 0.20;
        break;
      case 6:
        MAX_LEFT_ENEMIES = 4;
        speedIncrement = 0.23;
        break;
      case 7:
        speedIncrement = 0.25;
        break; 
        case 8:
          speedIncrement = 0.28;
          break; 
      default:
        break;
    } 

    document.getElementById('level').innerText = `LEVEL : ${this.level}`;
  }
}
