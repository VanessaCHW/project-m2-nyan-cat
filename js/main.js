// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById('app'));
startMenu(gameEngine.root);

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartClicked');

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {

  if (event.code === 'ArrowLeft') {
    gameEngine.player.moveLeft();
  }

  if (event.code === 'ArrowRight') {
    gameEngine.player.moveRight();
  }

  if (event.code === 'ArrowUp') {
    gameEngine.player.moveUp();
  }
  if (event.code === 'ArrowDown') {
    gameEngine.player.moveDown();
  }

};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', keydownHandler);

//Sound effects
let collisionSound = new sound('arrow');
let mugSound = new sound('drinking');
mugSound.domElement.volume = 1;
let manSound = new sound('bells');
manSound.domElement.volume = 0.4;

//Start game
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);
